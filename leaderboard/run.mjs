#!/usr/bin/env node
// Runs the AI Design Leaderboard: every model builds every screen for every
// fictional brand; each page is rendered in a real browser, read with
// designlang and scored for brand fidelity and generic look.
//
//   ATLAS_API_KEY=... node leaderboard/run.mjs [--cap 25] [--models id,id] [--limit N]
//   ATLAS_API_KEY=... node leaderboard/run.mjs --retry-failed results/<date>.json [--cap 5]
// A reply with no usage at all is the provider giving up (a gateway timeout),
// recorded as "no-response"; --retry-failed runs only the failed runs again.

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { createServer } from 'node:http';
import { join } from 'node:path';
import { extractDesignLanguage } from '../src/index.js';
import { parseBrand } from '../src/slop/brand.js';
import { createBudget, BudgetExceeded, costOf } from './cost.js';
import { classifyOutput, scoreRun, buildTable, mergeRetries } from './core.js';

const here = new URL('.', import.meta.url).pathname;
const arg = (n, d) => { const i = process.argv.indexOf(n); return i > -1 ? process.argv[i + 1] : d; };
const cap = Number(arg('--cap', 25));
const limit = Number(arg('--limit', Infinity));
const key = process.env.ATLAS_API_KEY;
if (!key) { console.error('Set ATLAS_API_KEY'); process.exit(2); }
const base = process.env.ATLAS_BASE_URL || 'https://api.atlascloud.ai/v1';

let models = JSON.parse(readFileSync(join(here, 'models.json'), 'utf8'));
if (arg('--models')) models = models.filter((m) => arg('--models').split(',').includes(m.id));
const prompts = JSON.parse(readFileSync(join(here, 'prompts.json'), 'utf8'));
const briefs = readdirSync(join(here, 'briefs')).filter((f) => f.endsWith('.md')).map((f) => {
  const text = readFileSync(join(here, 'briefs', f), 'utf8');
  return { id: f.replace(/\.md$/, ''), text, brand: parseBrand(text, f) };
});

const date = new Date().toISOString().slice(0, 10);
const outDir = join(here, 'output', date);
mkdirSync(outDir, { recursive: true });
const budget = createBudget({ capUsd: cap });

// Serve generated pages over http so the browser reads them like any site.
const pages = new Map();
const server = createServer((req, res) => {
  const html = pages.get(req.url);
  if (!html) { res.statusCode = 404; return res.end(); }
  res.setHeader('content-type', 'text/html; charset=utf-8');
  // Model-written pages are untrusted: no scripts, no network beyond Google Fonts.
  res.setHeader('content-security-policy', "default-src 'none'; style-src 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src data:; script-src 'none'; connect-src 'none'; frame-src 'none'; form-action 'none'");
  res.end(html);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const origin = `http://127.0.0.1:${server.address().port}`;

const SYSTEM = 'You are a senior product designer and front-end engineer. Reply with one complete, self-contained HTML file (inline CSS, fonts from Google Fonts allowed, no external images, no JavaScript frameworks) inside a single ```html code block, and nothing else.';

async function generate(model, brief, prompt) {
  const res = await fetch(`${base}/chat/completions`, {
    method: 'POST',
    headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      model: model.id,
      max_tokens: 32000,
      messages: [
        { role: 'system', content: SYSTEM },
        { role: 'user', content: `Here is the brand you are designing for. Follow it exactly.\n\n${brief.text}\n\nTask: ${prompt.prompt}` },
      ],
    }),
    signal: AbortSignal.timeout(600_000),
  });
  const body = await res.json().catch(() => ({}));
  if (body.usage) budget.charge(body.usage, model.id);
  if (!res.ok) throw new Error(body?.error?.message || `HTTP ${res.status}`);
  return { text: body.choices?.[0]?.message?.content || '', usage: body.usage };
}

const retryFile = arg('--retry-failed');
const previous = retryFile ? JSON.parse(readFileSync(join(here, retryFile.replace(/^leaderboard\//, '')), 'utf8')) : null;
const jobs = [];
for (const model of models) for (const brief of briefs) for (const prompt of prompts) {
  if (previous && !previous.runs.some((r) => !r.ok && r.model === model.id && r.brief === brief.id && r.prompt === prompt.id)) continue;
  jobs.push({ model, brief, prompt });
}
const runs = [];
let next = 0;
let stopped = false;

async function worker() {
  while (!stopped && next < Math.min(jobs.length, limit)) {
    const { model, brief, prompt } = jobs[next++];
    const run = { model: model.id, brief: brief.id, prompt: prompt.id };
    try {
      budget.check();
      const { text, usage } = await generate(model, brief, prompt);
      run.costUsd = Math.round(costOf(usage, model.id) * 10000) / 10000;
      const out = !usage && !text ? { ok: false, failure: 'no-response' } : classifyOutput(text);
      if (!out.ok) {
        Object.assign(run, out);
      } else {
        const path = `/${model.id.replace(/\W+/g, '_')}/${brief.id}-${prompt.id}.html`;
        pages.set(path, out.html);
        mkdirSync(join(outDir, model.id.replace(/\W+/g, '_')), { recursive: true });
        writeFileSync(join(outDir, path), out.html);
        Object.assign(run, await scoreRun({ html: out.html, brand: brief.brand, read: () => extractDesignLanguage(origin + path, { wait: 1500 }) }));
      }
    } catch (err) {
      if (err instanceof BudgetExceeded) { stopped = true; console.error(`  stopped: ${err.message}`); break; }
      Object.assign(run, { ok: false, failure: /abort|timeout/i.test(err.message) ? 'timeout' : 'api-error', error: err.message.slice(0, 160) });
    }
    runs.push(run);
    console.error(`  ${run.ok ? 'ok  ' : 'FAIL'} ${model.label.padEnd(16)} ${brief.id.padEnd(10)} ${prompt.id.padEnd(9)} ${run.ok ? `brand ${run.onBrand} generic ${run.generic}` : run.failure}  $${budget.spent().toFixed(2)}`);
  }
}
await Promise.all(Array.from({ length: 4 }, worker));
server.close();

const allRuns = previous ? mergeRetries(previous.runs, runs) : runs;
const spentUsd = Math.round(((previous?.spentUsd || 0) + budget.spent()) * 100) / 100;
const result = { date: previous?.date || date, retriedAt: previous ? date : undefined, cap, spentUsd, models, briefs: briefs.map((b) => ({ id: b.id, brand: b.brand })), prompts, runs: allRuns, table: buildTable(allRuns, models) };
writeFileSync(join(here, 'results', `${result.date}.json`), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result.table, null, 1));
console.log(`spent $${result.spentUsd}`);
