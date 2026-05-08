// designlang visual-diff <before> <after>
// Captures screenshots for two URLs (or re-snapshots one URL across a time delta)
// and emits a side-by-side HTML diff with token deltas and file-size/dimension signals.

import { crawlPage } from './crawler.js';
import { extractDesignLanguage } from './index.js';
import { diffDesigns } from './diff.js';
import { nameFromUrl } from './utils.js';
import { statSync, existsSync, readFileSync } from 'fs';
import { basename } from 'path';

function fileKb(p) {
  try { return Math.round(statSync(p).size / 1024); } catch { return 0; }
}

function toDataUri(p) {
  try {
    const buf = readFileSync(p);
    return 'data:image/png;base64,' + buf.toString('base64');
  } catch { return ''; }
}

async function captureFor(url, options = {}) {
  const raw = await crawlPage(url, { ...options, screenshots: true });
  let design;
  try {
    design = await extractDesignLanguage(url, { ...options, screenshots: true });
  } catch (err) {
    throw new Error(`Extraction failed for ${url}: ${err.message}`);
  }
  return { raw, design };
}

export async function visualDiff({ beforeUrl, afterUrl, options = {} } = {}) {
  const before = await captureFor(beforeUrl, options);
  const after = await captureFor(afterUrl, options);
  const tokenDelta = diffDesigns(before.design, after.design);

  const shotsBefore = before.raw.componentScreenshots || {};
  const shotsAfter = after.raw.componentScreenshots || {};
  const keys = [...new Set([...Object.keys(shotsBefore), ...Object.keys(shotsAfter)])];

  const pairs = keys.map(k => {
    const a = shotsBefore[k];
    const b = shotsAfter[k];
    return {
      key: k,
      before: a && existsSync(a) ? { path: a, sizeKb: fileKb(a) } : null,
      after: b && existsSync(b) ? { path: b, sizeKb: fileKb(b) } : null,
    };
  });

  return { pairs, tokenDelta, before: before.design, after: after.design };
}

export function formatVisualDiffHtml(result, { beforeLabel, afterLabel } = {}) {
  const { pairs, tokenDelta, before, after } = result;
  const bL = beforeLabel || nameFromUrl(before.meta.url);
  const aL = afterLabel || nameFromUrl(after.meta.url);

  const pairHtml = pairs.map(p => {
    const deltaKb = (p.after?.sizeKb || 0) - (p.before?.sizeKb || 0);
    const tag = deltaKb === 0 ? 'identical-size' : Math.abs(deltaKb) > 50 ? 'major-delta' : 'minor-delta';
    return `
      <section class="pair" data-status="${tag}">
        <header>
          <h3>${p.key}</h3>
          <span class="delta">${deltaKb >= 0 ? '+' : ''}${deltaKb} KB</span>
        </header>
        <div class="frames">
          <figure><figcaption>${bL}</figcaption>${p.before ? `<img src="${toDataUri(p.before.path)}" alt="${p.key} before">` : '<div class="missing">missing</div>'}</figure>
          <figure><figcaption>${aL}</figcaption>${p.after ? `<img src="${toDataUri(p.after.path)}" alt="${p.key} after">` : '<div class="missing">missing</div>'}</figure>
        </div>
      </section>`;
  }).join('');

  const changedColors = (tokenDelta.colors?.changed || []).slice(0, 20);
  const tokenRows = changedColors.map(c => `<tr><td>${c.token || c.key || ''}</td><td style="background:${c.before};">${c.before}</td><td style="background:${c.after};">${c.after}</td></tr>`).join('');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>designlang · visual-diff · ${bL} → ${aL}</title>
<style>
  :root { --ink: #0A0908; --paper: #F3F1EA; --accent: #FF4800; }
  * { box-sizing: border-box; }
  body { margin: 0; font: 14px/1.5 ui-sans-serif, system-ui; background: var(--paper); color: var(--ink); }
  header.top { padding: 32px 40px; border-bottom: 1px solid var(--ink); display: flex; justify-content: space-between; align-items: baseline; }
  header.top h1 { font-size: 28px; margin: 0; letter-spacing: -0.02em; }
  header.top .meta { font-variant-numeric: tabular-nums; opacity: 0.7; }
  main { padding: 32px 40px; max-width: 1400px; margin: 0 auto; }
  .pair { margin-bottom: 48px; border: 1px solid var(--ink); background: white; }
  .pair header { display: flex; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid var(--ink); }
  .pair[data-status="major-delta"] header { background: var(--accent); color: white; }
  .pair[data-status="identical-size"] .delta::after { content: " — identical"; opacity: 0.6; }
  .pair h3 { margin: 0; text-transform: uppercase; letter-spacing: 0.04em; }
  .frames { display: grid; grid-template-columns: 1fr 1fr; }
  figure { margin: 0; padding: 16px; border-right: 1px solid var(--ink); }
  figure:last-child { border-right: 0; }
  figcaption { font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; opacity: 0.6; margin-bottom: 8px; }
  figure img { max-width: 100%; display: block; border: 1px solid #ddd; }
  .missing { padding: 40px; text-align: center; opacity: 0.4; font-style: italic; border: 1px dashed #999; }
  table { width: 100%; border-collapse: collapse; font-variant-numeric: tabular-nums; }
  th, td { text-align: left; padding: 8px 12px; border-bottom: 1px solid var(--ink); }
  h2 { margin-top: 48px; font-size: 20px; }
</style>
</head>
<body>
  <header class="top">
    <h1>visual-diff</h1>
    <div class="meta">${bL} → ${aL} · ${pairs.length} components</div>
  </header>
  <main>
    <h2>Component snapshots</h2>
    ${pairHtml || '<p>No component screenshots captured.</p>'}
    ${changedColors.length ? `<h2>Color token changes</h2><table><thead><tr><th>token</th><th>before</th><th>after</th></tr></thead><tbody>${tokenRows}</tbody></table>` : ''}
  </main>
</body>
</html>`;
}
