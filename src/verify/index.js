// `verifyDesign(url)` — the fidelity loop.
//
// extract → for each target component: capture the real crop + its computed
// styles → re-style a clone using ONLY the extracted tokens → render → pixel-
// diff against the real crop → fidelity %. Aggregate to a site score, with
// per-token-family attribution so the number is explained, not asserted.

import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { extractDesignLanguage } from '../index.js';
import { tokensFromDesign } from './tokens.js';
import { restyleComponent } from './restyle.js';
import { renderComponent } from './render.js';
import { diffPngBuffers, ratioToFidelity } from './diff.js';

const SELECTORS = {
  button: 'button:not(:empty), a[role="button"]:not(:empty), [class*="btn"]:not(:empty)',
  card: '[class*="card"]:not(:empty)',
  input: 'input[type="text"], input[type="email"], input[type="search"], textarea',
  nav: 'nav, [role="navigation"]',
};

// The computed-style slice restyle.js needs — read once, in-page. Passed as a
// real function to Playwright's evaluate (no eval/string-compile).
function captureInPage(el) {
  const cs = getComputedStyle(el);
  const r = el.getBoundingClientRect();
  const pick = ['backgroundColor', 'color', 'borderTopColor', 'borderTopWidth', 'borderTopStyle', 'borderTopLeftRadius', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'boxShadow'];
  const computed = {};
  for (const p of pick) computed[p] = cs[p];
  return { computed, outerHTML: el.outerHTML.slice(0, 20000), box: { w: r.width, h: r.height } };
}

async function pickRepresentative(page, selector) {
  const handles = await page.$$(selector);
  for (const h of handles) {
    const ok = await h.evaluate((el) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return r.width >= 24 && r.height >= 12 && r.width <= window.innerWidth &&
        cs.visibility !== 'hidden' && cs.display !== 'none' && parseFloat(cs.opacity) >= 0.5;
    }).catch(() => false);
    if (ok) return h;
  }
  return null;
}

function attribution(deltas) {
  const byFamily = {};
  for (const d of deltas) {
    const f = (byFamily[d.family] ||= { family: d.family, moves: 0, unmapped: 0 });
    if (d.mapped === false) f.unmapped += 1;
    else if ((d.family === 'color' && d.distance > 6) || (d.distance || 0) > 2) f.moves += 1;
  }
  return Object.values(byFamily)
    .filter((f) => f.moves || f.unmapped)
    .sort((a, b) => (b.unmapped * 3 + b.moves) - (a.unmapped * 3 + a.moves));
}

export async function verifyDesign(url, opts = {}) {
  const components = opts.components?.length ? opts.components : ['button', 'card'];
  const width = opts.width || 1280;
  const height = opts.height || 800;
  const outDir = opts.out ? join(opts.out) : null;
  if (outDir) for (const d of ['original', 'rebuilt', 'diff']) mkdirSync(join(outDir, 'verify', d), { recursive: true });

  const design = opts.design || await extractDesignLanguage(url, opts.browserOpts || {});
  const tokens = tokensFromDesign(design);

  const browser = await chromium.launch({ headless: true, ...(opts.channel && { channel: opts.channel }) });
  const results = [];
  try {
    const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 2, colorScheme: 'light' });
    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.evaluate(() => document.fonts.ready).catch(() => {});

    for (const kind of components) {
      const sel = SELECTORS[kind];
      if (!sel) { results.push({ component: kind, status: 'n/a', reason: 'unknown component' }); continue; }
      const handle = await pickRepresentative(page, sel);
      if (!handle) { results.push({ component: kind, status: 'n/a', reason: 'not found on page' }); continue; }

      try {
        const originalBuf = await handle.screenshot({ type: 'png' });
        const cap = await handle.evaluate(captureInPage);
        const { styled, deltas } = restyleComponent(cap.computed, tokens);
        const rebuiltBuf = await renderComponent(browser, { outerHTML: cap.outerHTML, box: cap.box, dpr: 2, styled }, tokens);
        const { ratio, heatmap, diffPixels } = diffPngBuffers(originalBuf, rebuiltBuf);
        const fidelity = ratioToFidelity(ratio);

        if (outDir) {
          writeFileSync(join(outDir, 'verify', 'original', `${kind}.png`), originalBuf);
          writeFileSync(join(outDir, 'verify', 'rebuilt', `${kind}.png`), rebuiltBuf);
          writeFileSync(join(outDir, 'verify', 'diff', `${kind}.png`), heatmap);
        }
        results.push({ component: kind, status: 'ok', fidelity, diffPixels, attribution: attribution(deltas), deltas });
      } catch (err) {
        results.push({ component: kind, status: 'error', reason: err?.message || 'render failed' });
      }
    }
  } finally {
    await browser.close();
  }

  const scored = results.filter((r) => r.status === 'ok');
  const fidelity = scored.length ? Math.round(scored.reduce((s, r) => s + r.fidelity, 0) / scored.length) : null;

  return {
    url,
    host: (() => { try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return url; } })(),
    generatedAt: new Date().toISOString(),
    fidelity,
    components: results,
    tokenCounts: {
      palette: tokens.palette.length, radii: tokens.radii.length, spacing: tokens.spacing.length,
      fontSizes: tokens.fontSizes.length, shadows: tokens.shadows.length,
    },
  };
}
