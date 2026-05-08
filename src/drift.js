// designlang drift <url> --tokens <file>
// Compares local project tokens against the live site and reports what's drifted.
// Designed for CI/CD: exits non-zero when drift exceeds the tolerance budget.

import { readFileSync } from 'fs';
import { extname } from 'path';
import { extractDesignLanguage } from './index.js';

function flattenDtcg(obj, prefix = '', out = {}) {
  for (const [k, v] of Object.entries(obj || {})) {
    if (k.startsWith('$')) continue;
    if (v && typeof v === 'object') {
      if ('$value' in v) {
        out[prefix ? `${prefix}.${k}` : k] = v.$value;
      } else {
        flattenDtcg(v, prefix ? `${prefix}.${k}` : k, out);
      }
    }
  }
  return out;
}

function loadLocalTokens(file) {
  const raw = readFileSync(file, 'utf8');
  const ext = extname(file);
  if (ext === '.json') {
    const j = JSON.parse(raw);
    const flat = flattenDtcg(j);
    if (Object.keys(flat).length) return flat;
    const out = {};
    for (const [group, entries] of Object.entries(j)) {
      if (!entries || typeof entries !== 'object') continue;
      for (const [k, v] of Object.entries(entries)) out[`${group}.${k}`] = String(v);
    }
    return out;
  }
  if (ext === '.css') {
    const out = {};
    for (const m of raw.matchAll(/--([\w-]+):\s*([^;]+);/g)) out[m[1]] = m[2].trim();
    return out;
  }
  throw new Error(`Unsupported token file: ${ext}`);
}

function hexToRgb(h) {
  const m = h.replace('#', '').match(/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : null;
}

function colorDistance(a, b) {
  const ra = hexToRgb(a), rb = hexToRgb(b);
  if (!ra || !rb) return Infinity;
  return Math.sqrt(ra.reduce((s, v, i) => s + (v - rb[i]) ** 2, 0));
}

function findNearest(value, palette) {
  if (!/^#[\da-f]{6}$/i.test(value)) return null;
  let best = { distance: Infinity, token: null };
  for (const p of palette) {
    if (!/^#[\da-f]{6}$/i.test(p.hex || '')) continue;
    const d = colorDistance(value, p.hex);
    if (d < best.distance) best = { distance: d, token: p };
  }
  return best;
}

export async function checkDrift(url, { tokens: tokensFile, tolerance = 8, options = {} } = {}) {
  const local = loadLocalTokens(tokensFile);
  let design;
  try {
    design = await extractDesignLanguage(url, options);
  } catch (err) {
    throw new Error(`Extraction failed for ${url}: ${err.message}`);
  }
  const livePalette = design.colors?.all || [];

  const drifted = [];
  const matched = [];
  const unknown = [];

  for (const [name, value] of Object.entries(local)) {
    if (!/^#[\da-f]{3,8}$/i.test(String(value))) continue; // only color tokens for now
    const hex = value.length === 4 ? '#' + value.slice(1).split('').map(c => c + c).join('') : value;
    const nearest = findNearest(hex, livePalette);
    if (!nearest || nearest.distance === Infinity) { unknown.push({ name, value: hex }); continue; }
    if (nearest.distance > tolerance) {
      drifted.push({
        token: name,
        local: hex,
        nearestLive: nearest.token.hex,
        distance: Math.round(nearest.distance),
        role: nearest.token.role || 'unknown',
      });
    } else {
      matched.push({ token: name, local: hex, liveMatch: nearest.token.hex, distance: Math.round(nearest.distance) });
    }
  }

  const driftRatio = drifted.length / Math.max(1, drifted.length + matched.length);
  const verdict = driftRatio === 0 ? 'in-sync' : driftRatio < 0.15 ? 'minor-drift' : driftRatio < 0.4 ? 'notable-drift' : 'major-drift';

  return {
    url,
    tokensFile,
    tolerance,
    verdict,
    driftRatio: +driftRatio.toFixed(3),
    drifted,
    matched,
    unknown,
    summary: {
      total: drifted.length + matched.length,
      drifted: drifted.length,
      matched: matched.length,
      unknown: unknown.length,
    },
  };
}

export function formatDriftMarkdown(r) {
  const lines = [
    `# designlang drift report`,
    ``,
    `**Live site:** ${r.url}`,
    `**Local tokens:** ${r.tokensFile}`,
    `**Verdict:** ${r.verdict} (drift ratio: ${r.driftRatio})`,
    ``,
    `| metric | count |`,
    `|---|---|`,
    `| total color tokens | ${r.summary.total} |`,
    `| matched | ${r.summary.matched} |`,
    `| drifted | ${r.summary.drifted} |`,
    `| unknown | ${r.summary.unknown} |`,
    ``,
  ];
  if (r.drifted.length) {
    lines.push(`## Drifted tokens`, ``, `| token | local | nearest live | Δ |`, `|---|---|---|---|`);
    for (const d of r.drifted) lines.push(`| \`${d.token}\` | \`${d.local}\` | \`${d.nearestLive}\` (${d.role}) | ${d.distance} |`);
    lines.push('');
  }
  return lines.join('\n');
}
