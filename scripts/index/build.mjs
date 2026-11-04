#!/usr/bin/env node
// Builds the Design Index: index-data/<domain>.json for every candidate in
// sites.txt that allows it, plus index-data/_list.json. Run locally, never on
// the server. Safe to re-run: existing fresh entries are kept, and anything
// now refused (robots, ai.txt, TDMRep, opt-out) is deleted.
//
//   node scripts/index/build.mjs [--limit N] [--refresh] [--concurrency 3]

import { readFileSync, writeFileSync, mkdirSync, existsSync, unlinkSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { extractDesignLanguage } from '../../src/index.js';
import { unreadable } from '../../src/slop/index.js';
import { toIndexEntry, allowedToIndex } from './schema.js';

const root = new URL('../../', import.meta.url).pathname;
const here = new URL('.', import.meta.url).pathname;
const out = join(root, 'index-data');
mkdirSync(out, { recursive: true });

const arg = (name, dflt) => {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : dflt;
};
const limit = Number(arg('--limit', Infinity));
const concurrency = Number(arg('--concurrency', 3));
const refresh = process.argv.includes('--refresh');
const FRESH_MS = 30 * 24 * 3600 * 1000;

const lines = (file) => readFileSync(join(here, file), 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
const candidates = lines('sites.txt').slice(0, limit);
const optout = lines('optout.txt');
const fileOf = (domain) => join(out, `${domain}.json`);

async function text(url) {
  try {
    const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(8000), headers: { 'user-agent': 'designlang-index (+https://designlang.app/index)' } });
    if (!res.ok) return { body: '', headers: res.headers };
    return { body: await res.text(), headers: res.headers };
  } catch {
    return { body: '', headers: new Headers() };
  }
}

async function policy(domain) {
  const base = `https://${domain}`;
  const [robots, ai, tdm, home] = await Promise.all([
    text(`${base}/robots.txt`), text(`${base}/ai.txt`), text(`${base}/.well-known/tdmrep.json`), text(base),
  ]);
  let tdmrep = null;
  try { tdmrep = tdm.body ? JSON.parse(tdm.body) : null; } catch { tdmrep = null; }
  const header = home.headers.get('tdm-reservation');
  if (header === '1') tdmrep = { 'tdm-reservation': 1 };
  // ai.txt files that are really HTML error pages carry no rules.
  const aiTxt = /<html/i.test(ai.body) ? '' : ai.body;
  const robotsTxt = /<html/i.test(robots.body) ? '' : robots.body;
  return allowedToIndex({ robotsTxt, aiTxt, tdmrep, domain, optout });
}

const stats = { added: 0, kept: 0, refused: 0, removed: 0, failed: 0, unreadable: 0 };

async function one(domain) {
  const allowed = await policy(domain);
  if (!allowed.ok) {
    stats.refused++;
    if (existsSync(fileOf(domain))) { unlinkSync(fileOf(domain)); stats.removed++; }
    console.error(`  refused   ${domain}: ${allowed.reason}`);
    return;
  }
  if (!refresh && existsSync(fileOf(domain)) && Date.now() - statSync(fileOf(domain)).mtimeMs < FRESH_MS) { stats.kept++; return; }
  try {
    const design = await extractDesignLanguage(`https://${domain}`, { wait: 1000 });
    const blocked = unreadable(design);
    if (blocked || (design.meta?.elementCount || 0) < 30) {
      stats.unreadable++;
      console.error(`  skipped   ${domain}: ${blocked?.reason || 'too little on the page'}`);
      return;
    }
    const entry = toIndexEntry(design, { domain, readAt: new Date().toISOString().slice(0, 10) });
    if (!entry.colors.primary && !entry.fonts.length) { stats.unreadable++; return; }
    writeFileSync(fileOf(domain), JSON.stringify(entry, null, 2) + '\n');
    stats.added++;
    console.error(`  indexed   ${domain}  ${entry.colors.primary || '—'}  ${entry.fonts[0] || '—'}  ${entry.slop.band}`);
  } catch (err) {
    stats.failed++;
    console.error(`  failed    ${domain}: ${String(err.message).split('\n')[0].slice(0, 100)}`);
  }
}

let next = 0;
await Promise.all(Array.from({ length: concurrency }, async () => {
  while (next < candidates.length) await one(candidates[next++]);
}));

// Opted-out domains go even if they're no longer candidates.
for (const domain of optout) if (existsSync(fileOf(domain))) { unlinkSync(fileOf(domain)); stats.removed++; }

const list = readdirSync(out)
  .filter((f) => f.endsWith('.json') && !f.startsWith('_'))
  .map((f) => JSON.parse(readFileSync(join(out, f), 'utf8')))
  .map((e) => ({ domain: e.domain, primary: e.colors.primary, band: e.slop.band }))
  .sort((a, b) => a.domain.localeCompare(b.domain));
writeFileSync(join(out, '_list.json'), JSON.stringify(list) + '\n');
console.log(JSON.stringify({ ...stats, total: list.length }));
