#!/usr/bin/env node
// Calibrates the Slop Score: how often hand-made sites land in the "generic"
// band (false alarms) and how often AI-built pages do (catch rate).
//
//   node bench/slop-calibrate.mjs            read every site, then score
//   node bench/slop-calibrate.mjs --rescore  score the cached reads again (after tuning weights)

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { extractDesignLanguage } from '../src/index.js';
import { scoreGeneric, unreadable } from '../src/slop/index.js';

const here = new URL('.', import.meta.url).pathname;
const sites = JSON.parse(readFileSync(join(here, 'slop-sites.json'), 'utf8'));
const cacheDir = join(here, '.slop-cache');
mkdirSync(cacheDir, { recursive: true });
const rescore = process.argv.includes('--rescore');
const date = new Date().toISOString().slice(0, 10);

const keyOf = (url) => url.replace(/^https?:\/\//, '').replace(/[^a-z0-9.-]+/gi, '_').slice(0, 120);

async function read(url) {
  const file = join(cacheDir, keyOf(url) + '.json');
  if (existsSync(file)) return JSON.parse(readFileSync(file, 'utf8'));
  if (rescore) return null;
  try {
    const d = await extractDesignLanguage(url, { wait: 1500 });
    // Keep only what the detectors read, so the cache stays small.
    const slim = {
      meta: d.meta, colors: { primary: d.colors?.primary, secondary: d.colors?.secondary, accent: d.colors?.accent, all: (d.colors?.all || []).slice(0, 40) },
      typography: { families: d.typography?.families }, gradients: d.gradients, shadows: { values: d.shadows?.values },
      borders: d.borders, sectionRoles: d.sectionRoles, voice: { sampleHeadings: d.voice?.sampleHeadings }, layout: { gridColumns: d.layout?.gridColumns },
      surface: d.surface, componentAnatomy: d.componentAnatomy, spacing: { base: d.spacing?.base },
    };
    writeFileSync(file, JSON.stringify(slim));
    return slim;
  } catch (err) {
    return { error: err.message.split('\n')[0] };
  }
}

async function pool(items, n, fn) {
  const out = new Array(items.length);
  let i = 0;
  await Promise.all(Array.from({ length: n }, async () => {
    while (i < items.length) { const k = i++; out[k] = await fn(items[k]); }
  }));
  return out;
}

async function scoreSet(urls, label) {
  return pool(urls, 3, async (url) => {
    const d = await read(url);
    if (!d) return { url, skipped: 'not cached' };
    if (d.error) { console.error(`  ${label} ${url}: ${d.error}`); return { url, skipped: 'read failed' }; }
    const blocked = unreadable(d);
    if (blocked) return { url, skipped: blocked.reason };
    const r = scoreGeneric(d);
    console.error(`  ${label} ${String(r.score).padStart(3)} ${r.band.padEnd(8)} ${url}  ${r.flags.map((f) => f.id).join(' ')}`);
    return { url, score: r.score, band: r.band, flags: r.flags.map((f) => f.id) };
  });
}

const human = await scoreSet(sites.human, 'human');
const ai = await scoreSet(sites.ai.map((s) => (typeof s === 'string' ? s : s.url)), 'ai   ');
const scored = (rows) => rows.filter((r) => typeof r.score === 'number');
const h = scored(human);
const a = scored(ai);
const falseAlarmRate = h.length ? h.filter((r) => r.band === 'generic').length / h.length : 0;
const catchRate = a.length ? a.filter((r) => r.band === 'generic').length / a.length : 0;
const flaggedRate = a.length ? a.filter((r) => r.band !== 'distinct').length / a.length : 0;
const result = { date, human, ai, falseAlarmRate, catchRate, flaggedRate, n: { human: h.length, ai: a.length } };
writeFileSync(join(here, 'results', `slop-${date}.json`), JSON.stringify(result, null, 2) + '\n');

const pct = (x) => `${Math.round(x * 100)}%`;
const rows = (list) => list.map((r) => `| ${r.url} | ${r.score ?? '—'} | ${r.band ?? r.skipped} | ${(r.flags || []).join(', ')} |`).join('\n');
writeFileSync(join(here, 'results', `slop-${date}.md`), `# Slop Score calibration, ${date}

- Hand-made sites in the generic band (false alarms): **${pct(falseAlarmRate)}** of ${h.length} (bar: 5% or less)
- AI-built pages in the generic band (caught): **${pct(catchRate)}** of ${a.length}
- AI-built pages in the mixed or generic band: **${pct(flaggedRate)}**

Reproduce: \`node bench/slop-calibrate.mjs\`

## Hand-made

| site | score | band | tells |
|---|---|---|---|
${rows(human)}

## AI-built

| page | score | band | tells |
|---|---|---|---|
${rows(ai)}
`);
console.log(JSON.stringify({ falseAlarmRate, catchRate, flaggedRate, n: result.n }));
