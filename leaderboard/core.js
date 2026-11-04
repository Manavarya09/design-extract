// Pure parts of the leaderboard: what counts as usable output, how a run is
// scored, and how runs roll up into the table. A failed run is never dropped:
// it counts against its model.

import { scoreGeneric, scoreOnBrand, unreadable } from '../src/slop/index.js';

export function classifyOutput(text) {
  const raw = String(text || '').trim();
  if (!raw) return { ok: false, failure: 'empty' };
  const fence = raw.match(/```(?:html)?\s*\n([\s\S]*?)```/i);
  // An unclosed fence means the reply was cut off; strip the opener and let
  // the completeness check below reject it.
  const html = (fence ? fence[1] : raw.replace(/^```(?:html)?\s*\n/i, '')).trim();
  if (!/<html[\s>]|<!doctype html|<body[\s>]/i.test(html)) return { ok: false, failure: 'not-html' };
  if (!/<\/(html|body)>\s*$/i.test(html)) return { ok: false, failure: 'not-html' };
  return { ok: true, html };
}

// read(html) renders the page and returns a designlang extraction.
export async function scoreRun({ html, brand, read }) {
  let design;
  try {
    design = await read(html);
  } catch (err) {
    const timeout = err?.name === 'TimeoutError' || /Timeout \d+ms exceeded/.test(err?.message || '');
    return { ok: false, failure: timeout ? 'timeout' : 'render-error' };
  }
  if (!design || unreadable(design)?.reason === 'blank') return { ok: false, failure: 'render-error' };
  return { ok: true, onBrand: scoreOnBrand(design, brand).score, generic: scoreGeneric(design).score };
}

const mean = (xs) => (xs.length ? Math.round(xs.reduce((a, b) => a + b, 0) / xs.length) : null);

export function buildTable(runs, models) {
  return models
    .map((m) => {
      const mine = runs.filter((r) => r.model === m.id);
      const good = mine.filter((r) => r.ok);
      return {
        model: m.id,
        label: m.label,
        vendor: m.vendor,
        onBrand: mean(good.map((r) => r.onBrand)),
        generic: mean(good.map((r) => r.generic)),
        failures: mine.length - good.length,
        n: mine.length,
      };
    })
    .sort((a, b) => (b.onBrand ?? -1) - (a.onBrand ?? -1));
}
