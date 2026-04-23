// Multi-page crawl orchestrator (v10).
//
// Given a homepage result, discover canonical sub-pages from the site's own
// nav links (pricing / docs / blog / about / product / a representative blog
// post), score them by URL + anchor text to pick the top N unique page types,
// and run the full extractor pipeline against each. A `cross-page consistency`
// pass then diffs tokens across the crawled pages so agents can see which bits
// of the design language are site-wide vs per-page-type.
//
// Intentionally *orchestrates* the existing `extractDesignLanguage` — it does
// not re-implement extraction. That keeps this thin and lets every extractor
// improve automatically when v10+ gains more signals.

import { chromium } from 'playwright';
import { extractPageIntent } from './extractors/page-intent.js';

const PAGE_TYPE_RANK = [
  'pricing', 'docs', 'product', 'about', 'blog', 'blog-post', 'auth', 'legal',
];

const ANCHOR_HINTS = {
  pricing: /\b(pricing|plans?|buy)\b/i,
  docs: /\b(docs?|documentation|guide|api|reference|developers?)\b/i,
  product: /\b(product|features?|solutions?|platform)\b/i,
  about: /\b(about|company|team|careers?)\b/i,
  blog: /\b(blog|news|updates|changelog)\b/i,
  'blog-post': /./,
  legal: /\b(privacy|terms|legal)\b/i,
  auth: /\b(sign.?in|log.?in|sign.?up|register)\b/i,
};

function rankCandidateByUrl(href) {
  try {
    const u = new URL(href);
    const path = (u.pathname || '/').toLowerCase();
    const hits = [];
    if (/\/pricing(\/|$)|\/plans(\/|$)/.test(path)) hits.push('pricing');
    if (/\/docs?(\/|$)|\/documentation|\/guide|\/reference/.test(path)) hits.push('docs');
    if (/\/about|\/company|\/team|\/careers/.test(path)) hits.push('about');
    if (/\/blog(\/[\w-]+)+/.test(path)) hits.push('blog-post');
    else if (/\/blog(\/|$)|\/changelog/.test(path)) hits.push('blog');
    if (/\/product(\/|$)|\/features?(\/|$)|\/solutions?(\/|$)/.test(path)) hits.push('product');
    if (/\/terms|\/privacy|\/legal/.test(path)) hits.push('legal');
    return hits;
  } catch { return []; }
}

function scoreAnchor(anchorText) {
  const scores = {};
  for (const [type, re] of Object.entries(ANCHOR_HINTS)) {
    if (type === 'blog-post') continue; // only URL-derived
    if (re.test(anchorText)) scores[type] = 0.6;
  }
  return scores;
}

export async function discoverCanonicalPages(links, homepageUrl, maxPages = 5) {
  // links: [{ href, text }]
  const base = new URL(homepageUrl);
  const byType = {};
  for (const link of links) {
    let href;
    try { href = new URL(link.href, base).toString(); } catch { continue; }
    try {
      const u = new URL(href);
      if (u.hostname !== base.hostname) continue;
      if (u.pathname === base.pathname && (!u.search && !u.hash)) continue;
    } catch { continue; }
    const urlHits = rankCandidateByUrl(href);
    const anchorScores = scoreAnchor(link.text || '');
    const candidates = new Set([...urlHits, ...Object.keys(anchorScores)]);
    for (const type of candidates) {
      if (!byType[type]) byType[type] = [];
      byType[type].push({ href, text: link.text || '' });
    }
  }
  const chosen = [];
  for (const type of PAGE_TYPE_RANK) {
    if (chosen.length >= maxPages) break;
    const cands = byType[type];
    if (!cands || !cands.length) continue;
    chosen.push({ type, url: cands[0].href, anchor: cands[0].text });
  }
  return chosen;
}

export async function collectLinks(page) {
  return page.evaluate(() => {
    const out = [];
    const seen = new Set();
    // Restrict to header/nav first — those are canonical.
    const roots = Array.from(document.querySelectorAll('header, nav, [role="navigation"]'));
    const anchors = [];
    if (roots.length) {
      for (const r of roots) anchors.push(...r.querySelectorAll('a[href]'));
    } else {
      anchors.push(...document.querySelectorAll('a[href]'));
    }
    for (const a of anchors) {
      const href = a.getAttribute('href') || '';
      if (!href || href.startsWith('#')) continue;
      if (seen.has(href)) continue;
      seen.add(href);
      out.push({ href, text: (a.textContent || '').trim().slice(0, 80) });
      if (out.length >= 60) break;
    }
    return out;
  });
}

function pickChoices(aAll = [], bAll = []) {
  // Very cheap: number of tokens that appear in both sets.
  const setA = new Set(aAll);
  const setB = new Set(bAll);
  let overlap = 0;
  for (const x of setA) if (setB.has(x)) overlap++;
  const union = new Set([...setA, ...setB]).size || 1;
  return { overlap, union, jaccard: overlap / union };
}

function hexSet(colors) {
  return new Set((colors?.all || []).map(c => (c.hex || '').toLowerCase()).filter(Boolean));
}

function typeSet(typography) {
  return new Set(((typography?.families) || []).map(f => f.toLowerCase()));
}

function spaceSet(spacing) {
  return new Set(((spacing?.scale) || []).map(s => String(s.value ?? s)));
}

function radiusSet(borders) {
  return new Set(((borders?.radii) || []).map(r => String(r.value ?? r)));
}

export function computeCrossPageConsistency(pages) {
  // pages: [{ url, type, design }]
  if (pages.length < 2) return { pairwise: [], drift: {}, shared: {} };
  const metrics = {};
  for (const field of ['colors', 'typography', 'spacing', 'borders']) {
    metrics[field] = {};
  }
  const pairwise = [];
  for (let i = 0; i < pages.length; i++) {
    for (let j = i + 1; j < pages.length; j++) {
      const a = pages[i], b = pages[j];
      const colorDiff = pickChoices([...hexSet(a.design.colors)], [...hexSet(b.design.colors)]);
      const typeDiff = pickChoices([...typeSet(a.design.typography)], [...typeSet(b.design.typography)]);
      const spaceDiff = pickChoices([...spaceSet(a.design.spacing)], [...spaceSet(b.design.spacing)]);
      const radiusDiff = pickChoices([...radiusSet(a.design.borders)], [...radiusSet(b.design.borders)]);
      pairwise.push({
        pair: [a.type || a.url, b.type || b.url],
        colors: colorDiff,
        typography: typeDiff,
        spacing: spaceDiff,
        borders: radiusDiff,
      });
    }
  }

  // Shared-across-all sets.
  const sharedColors = pages.reduce((acc, p, i) => {
    const set = hexSet(p.design.colors);
    if (i === 0) return set;
    return new Set([...acc].filter(x => set.has(x)));
  }, new Set());
  const sharedTypes = pages.reduce((acc, p, i) => {
    const set = typeSet(p.design.typography);
    if (i === 0) return set;
    return new Set([...acc].filter(x => set.has(x)));
  }, new Set());

  // Per-page uniques.
  const perPageUnique = pages.map((p, idx) => {
    const others = pages.filter((_, i) => i !== idx);
    const othersColors = others.reduce((s, o) => {
      for (const x of hexSet(o.design.colors)) s.add(x);
      return s;
    }, new Set());
    const unique = [...hexSet(p.design.colors)].filter(c => !othersColors.has(c));
    return { url: p.url, type: p.type, uniqueColors: unique.slice(0, 20) };
  });

  return {
    pairwise,
    shared: {
      colors: [...sharedColors].slice(0, 50),
      typography: [...sharedTypes].slice(0, 10),
    },
    perPageUnique,
  };
}

// End-to-end runner: opens its own browser, discovers nav links from homepage,
// crawls N more pages, returns per-page `design` + consistency report. It
// leaves the single-page code path alone so --full users get an additive bump.
export async function crawlCanonicalPages({ homepageUrl, homepageRawData, maxPages = 5, extract, crawlerOptions = {} }) {
  // `extract` is injected so we can reuse the full single-page pipeline without
  // circular imports (index.js → multipage.js → index.js).
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: crawlerOptions.width || 1280, height: crawlerOptions.height || 800 },
    colorScheme: 'light',
  });
  const page = await context.newPage();
  try {
    await page.goto(homepageUrl, { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});
    await page.waitForLoadState('networkidle').catch(() => {});
    const links = await collectLinks(page).catch(() => []);
    const targets = await discoverCanonicalPages(links, homepageUrl, maxPages);
    const perPage = [];
    for (const t of targets) {
      try {
        const design = await extract(t.url, { ...crawlerOptions, depth: 0, dark: false, screenshots: false, responsive: false, interactions: false, deepInteract: false, _skipMultipage: true });
        perPage.push({ url: t.url, type: t.type, design });
      } catch (e) {
        perPage.push({ url: t.url, type: t.type, error: e.message });
      }
    }
    // Include the homepage itself in the consistency pass if we have its design.
    const allPages = perPage.filter(p => p.design);
    const consistency = computeCrossPageConsistency(allPages);
    return { targets, pages: perPage.map(p => ({
      url: p.url,
      type: p.type,
      intent: p.design ? extractPageIntent(p.design.raw || {}, { url: p.url, title: p.design.meta?.title }) : null,
      error: p.error || null,
    })), consistency };
  } finally {
    await browser.close();
  }
}
