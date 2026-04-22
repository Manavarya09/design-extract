// Pull the site's logo from the page. Uses a Playwright Page handle because we
// need the inline SVG source (or the <img> pixels) — computed-styles alone
// can't recover them. Writes the asset to disk and returns metadata.
//
// Strategy:
//   1) Candidate selectors, in priority order:
//      a. header/nav [aria-label*="logo"] | [class*="logo"] | [id*="logo"]
//      b. header a[href="/"] svg | header a[href="/"] img
//      c. first <svg> in <header>|<nav> with width 16-240 and height 16-120
//      d. first <img> in <header>|<nav> with alt matching site name
//   2) For SVG: capture `outerHTML`, save as .svg.
//   3) For <img>: save the bytes via page.request (handles CORS), fallback to
//      element.screenshot() if fetch fails.
//   4) Compute clearspace by sampling 8 directions from the bounding box and
//      stopping at the first non-whitespace pixel within 80px (very cheap).

import { writeFileSync } from 'fs';
import { join } from 'path';

const CANDIDATES = [
  'header a[href="/"] svg, header [href="/"] svg, nav a[href="/"] svg',
  'header a[href="/"] img, nav a[href="/"] img',
  'header [class*="logo" i] svg, nav [class*="logo" i] svg, [id*="logo" i] svg',
  'header [class*="logo" i] img, nav [class*="logo" i] img, [id*="logo" i] img',
  'header svg, nav svg',
  'header img, nav img',
];

async function findLogoHandle(page) {
  for (const sel of CANDIDATES) {
    try {
      const handles = await page.$$(sel);
      for (const h of handles) {
        const info = await h.evaluate((el) => {
          const r = el.getBoundingClientRect();
          const tag = el.tagName.toLowerCase();
          const w = r.width, hh = r.height;
          if (tag === 'svg') {
            if (w < 16 || w > 260 || hh < 12 || hh > 120) return null;
            return { tag, w, hh, x: r.x, y: r.y, outer: el.outerHTML };
          }
          if (tag === 'img') {
            if (w < 20 || w > 320 || hh < 12 || hh > 120) return null;
            return { tag, w, hh, x: r.x, y: r.y, src: el.currentSrc || el.src, alt: el.getAttribute('alt') || '' };
          }
          return null;
        });
        if (info) return { handle: h, info };
      }
    } catch { /* selector not found, keep looking */ }
  }
  return null;
}

async function fetchImgBytes(page, url) {
  try {
    const resp = await page.request.get(url, { timeout: 10000 });
    if (!resp.ok()) return null;
    const buf = await resp.body();
    return buf;
  } catch { return null; }
}

function guessExt(url) {
  const m = (url || '').toLowerCase().match(/\.(png|jpe?g|webp|gif|svg|ico|avif)(?:$|\?)/);
  return m ? (m[1] === 'jpeg' ? 'jpg' : m[1]) : 'png';
}

export async function extractLogo(page, outDir, prefix) {
  const found = await findLogoHandle(page);
  if (!found) {
    return { found: false };
  }
  const { handle, info } = found;

  let savedPath = null;
  let ext = null;

  if (info.tag === 'svg') {
    ext = 'svg';
    savedPath = join(outDir, `${prefix}-logo.svg`);
    writeFileSync(savedPath, info.outer, 'utf-8');
  } else {
    ext = guessExt(info.src);
    savedPath = join(outDir, `${prefix}-logo.${ext}`);
    const bytes = await fetchImgBytes(page, info.src);
    if (bytes) {
      writeFileSync(savedPath, bytes);
    } else {
      // Fallback: screenshot the element.
      try {
        await handle.screenshot({ path: savedPath });
        ext = 'png';
        savedPath = savedPath.replace(/\.(jpe?g|webp|gif|ico|avif)$/i, '.png');
      } catch {
        return { found: true, saved: false, info };
      }
    }
  }

  // Cheap clearspace: sample the bounding box + 80px margin for document
  // background continuity. Implemented in-page so we don't pull pixels back.
  const clearspace = await page.evaluate(({ x, y, w, h }) => {
    const body = document.body;
    const bg = getComputedStyle(body).backgroundColor;
    // Count how many pixels of margin we have before hitting another element.
    const margin = { top: 0, right: 0, bottom: 0, left: 0 };
    const probe = (dx, dy, max) => {
      for (let d = 2; d <= max; d += 4) {
        const el = document.elementFromPoint(x + dx(d), y + dy(d));
        if (!el) return d;
        // If we're still inside the logo itself, keep going.
        if (el.closest('svg, img, [class*="logo" i]')) continue;
        const r = el.getBoundingClientRect();
        if (r.width < 8 && r.height < 8) continue;
        // If it's the page/body, we hit open space.
        if (el === body || el.tagName === 'HEADER' || el.tagName === 'NAV') return d;
        return d;
      }
      return max;
    };
    margin.top = probe(() => w / 2, d => -d, 80);
    margin.bottom = probe(() => w / 2, d => h + d, 80);
    margin.left = probe(d => -d, () => h / 2, 80);
    margin.right = probe(d => w + d, () => h / 2, 80);
    return { backgroundColor: bg, margin };
  }, info).catch(() => null);

  return {
    found: true,
    saved: true,
    path: savedPath,
    file: `${prefix}-logo.${ext}`,
    kind: info.tag,
    width: Number(info.w.toFixed(1)),
    height: Number(info.hh.toFixed(1)),
    aspect: Number((info.w / Math.max(1, info.hh)).toFixed(3)),
    src: info.src || null,
    alt: info.alt || null,
    clearspace,
  };
}
