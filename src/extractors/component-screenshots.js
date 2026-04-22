// v10.1 — Component Screenshots
//
// Given a Playwright Page, crop PNG screenshots for each detected component
// cluster. We re-query the DOM using the same candidate selector the crawler
// uses, group matches by `kind + variantHint + sizeHint`, and capture up to
// three representatives per group at 2× retina. Writes into a `screenshots/`
// subdirectory under the output root and returns an index the bin emits as
// `*-screenshots.json`.

import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { join } from 'path';

const CANDIDATE_SELECTOR = 'button, a[role="button"], .btn, [class*="button"], input[type="text"], input[type="email"], input[type="search"], textarea, [class*="card"]';

const FALLBACK_GROUPS = [
  { slug: 'button', selector: 'button:not(:empty), a[role="button"], [class*="btn"]:not(:empty)' },
  { slug: 'card', selector: '[class*="card"]:not(:empty)' },
  { slug: 'input', selector: 'input[type="text"], input[type="email"], input[type="search"], textarea' },
  { slug: 'nav', selector: 'nav, [role="navigation"]' },
  { slug: 'hero', selector: '[class*="hero"], section:first-of-type' },
];

function slugify(s) {
  return (s || 'component')
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'component';
}

async function collectClusteredHandles(page) {
  // In-page classification mirrors what the crawler does for candidates but
  // returns enough to screenshot (unique index so we can re-find handles).
  const groups = await page.evaluate((sel) => {
    const out = {};
    let ix = 0;
    for (const el of document.querySelectorAll(sel)) {
      const r = el.getBoundingClientRect();
      if (r.width < 20 || r.height < 10) continue;
      if (r.width > window.innerWidth || r.height > window.innerHeight * 2) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none' || parseFloat(cs.opacity) < 0.1) continue;

      const tag = el.tagName.toLowerCase();
      const cls = typeof el.className === 'string' ? el.className.toLowerCase() : '';
      let kind = 'other';
      if (tag === 'button' || el.getAttribute('role') === 'button' || /\bbtn\b|button/.test(cls)) kind = 'button';
      else if (tag === 'input' || tag === 'textarea') kind = 'input';
      else if (/card/.test(cls)) kind = 'card';
      else if (tag === 'a') kind = 'link';

      const variant = ((cls.match(/\b(primary|secondary|tertiary|ghost|outline|solid|destructive|danger|success|warning|subtle)\b/) || [])[1]) || 'default';
      const size = ((cls.match(/\b(xs|sm|md|lg|xl|small|medium|large)\b/) || [])[1]) || '';

      const key = [kind, variant, size].filter(Boolean).join('--');
      if (!out[key]) out[key] = [];
      el.setAttribute('data-dl-shot', String(ix));
      out[key].push({ ix, w: Math.round(r.width), h: Math.round(r.height), kind, variant, size });
      ix++;
    }
    return out;
  }, CANDIDATE_SELECTOR);
  return groups;
}

async function captureGroup(page, key, entries, screenshotDir, maxPerGroup = 3) {
  const out = [];
  const slug = slugify(key);
  let variant = 0;
  for (const info of entries.slice(0, maxPerGroup)) {
    const handle = await page.$(`[data-dl-shot="${info.ix}"]`);
    if (!handle) continue;
    const file = `${slug}-${variant}.png`;
    const path = join(screenshotDir, file);
    try {
      await handle.screenshot({ path, omitBackground: false });
    } catch { continue; }
    out.push({
      cluster: key,
      variant,
      path: `screenshots/${file}`,
      bounds: { w: info.w, h: info.h },
      kind: info.kind,
      variantHint: info.variant,
      sizeHint: info.size,
      retina: true,
    });
    variant++;
  }
  return out;
}

async function captureFallbacks(page, screenshotDir) {
  const out = [];
  for (const g of FALLBACK_GROUPS) {
    try {
      const handles = await page.$$(g.selector);
      for (const h of handles.slice(0, 2)) {
        const box = await h.boundingBox();
        if (!box || box.width < 20 || box.height < 10) continue;
        const path = join(screenshotDir, `${g.slug}-${out.filter(x => x.cluster === g.slug).length}.png`);
        await h.screenshot({ path });
        out.push({
          cluster: g.slug,
          variant: out.filter(x => x.cluster === g.slug).length,
          path: `screenshots/${path.split('screenshots/')[1]}`,
          bounds: { w: Math.round(box.width), h: Math.round(box.height) },
          retina: true,
          fallback: true,
        });
      }
    } catch { /* skip */ }
  }
  return out;
}

// Public entry. Launches a fresh Playwright context at deviceScaleFactor: 2
// so captures are crisp on retina displays without a second full run.
export async function captureComponentScreenshotsV10(url, outDir, { width = 1280, height = 800, channel } = {}) {
  const screenshotDir = join(outDir, 'screenshots');
  mkdirSync(screenshotDir, { recursive: true });

  const browser = await chromium.launch({ headless: true, ...(channel && { channel }) });
  try {
    const context = await browser.newContext({
      viewport: { width, height },
      deviceScaleFactor: 2,
      colorScheme: 'light',
    });
    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.evaluate(() => document.fonts.ready).catch(() => {});

    const groups = await collectClusteredHandles(page);
    let components = [];
    for (const [key, entries] of Object.entries(groups)) {
      if (!entries.length) continue;
      const rows = await captureGroup(page, key, entries, screenshotDir);
      components.push(...rows);
    }

    // If clustering produced nothing (auth / docs pages often do), fall back
    // to the v9 hardcoded selector list so users still get something.
    if (!components.length) {
      components = await captureFallbacks(page, screenshotDir);
    }

    let fullPage = null;
    try {
      const p = join(screenshotDir, 'full-page.png');
      await page.screenshot({ path: p, fullPage: true });
      fullPage = { path: 'screenshots/full-page.png', retina: true };
    } catch { /* non-fatal */ }

    return { components, fullPage, count: components.length };
  } finally {
    await browser.close();
  }
}
