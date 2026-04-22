// Classify a crawled URL into a canonical page type. Heuristic-only by default
// (zero deps, deterministic). Returns { type, confidence, signals, alternates }.
// Consumers can fall back to the optional --smart LLM pass when confidence is low.

const TYPES = [
  'landing', 'pricing', 'docs', 'blog', 'blog-post',
  'product', 'about', 'dashboard', 'auth', 'legal', 'unknown',
];

const URL_RULES = [
  { re: /\/pricing(\/|$)/i, type: 'pricing', weight: 0.9 },
  { re: /\/plans?(\/|$)/i, type: 'pricing', weight: 0.75 },
  { re: /\/docs?(\/|$)|\/documentation|\/guide/i, type: 'docs', weight: 0.9 },
  { re: /\/api-reference|\/reference(\/|$)/i, type: 'docs', weight: 0.85 },
  { re: /\/blog(\/[\w-]+)+/i, type: 'blog-post', weight: 0.9 },
  { re: /\/blog(\/|$)/i, type: 'blog', weight: 0.85 },
  { re: /\/changelog(\/|$)/i, type: 'blog', weight: 0.6 },
  { re: /\/about(\/|$)|\/company|\/team/i, type: 'about', weight: 0.85 },
  { re: /\/product(\/|$)|\/products\//i, type: 'product', weight: 0.75 },
  { re: /\/features?(\/|$)|\/solutions?(\/|$)/i, type: 'product', weight: 0.7 },
  { re: /\/login|\/signin|\/sign-in|\/signup|\/sign-up|\/register/i, type: 'auth', weight: 0.95 },
  { re: /\/terms|\/privacy|\/legal|\/cookie-policy/i, type: 'legal', weight: 0.95 },
  { re: /\/app(\/|$)|\/dashboard|\/console|\/admin/i, type: 'dashboard', weight: 0.8 },
];

const PRICING_TEXT = /(\$\s?\d|€\s?\d|£\s?\d|₹\s?\d)|\b(per\s?(month|user|seat)|\/mo\b|\/month|\/year|\/yr|billed (annually|monthly)|free (forever|plan|tier)|start (free|trial))\b/i;
const DOCS_TEXT = /\b(installation|getting started|api reference|parameters|return value|npm install|yarn add|pnpm add|`npx |import \{|quickstart)\b/i;
const BLOG_POST_TEXT = /\b(by\s+[A-Z][a-z]+\s+[A-Z][a-z]+|posted on|published (on|in)|min read|\d+\s+min read)\b/i;
const LEGAL_TEXT = /\b(privacy policy|terms of service|terms of use|cookie policy|data protection|gdpr|ccpa|effective date|last updated)\b/i;
const AUTH_TEXT = /\b(sign in|log in|create (an )?account|forgot password|email address|password)\b/i;

function rootPath(url) {
  try {
    const u = new URL(url);
    return (u.pathname || '/').replace(/\/+$/, '') || '/';
  } catch { return '/'; }
}

function countFormFields(sections) {
  // sections text doesn't include input tags, so we approximate via headings + text.
  return sections.reduce((n, s) => n + (s.buttonCount || 0), 0);
}

function detectDocsLayout(sections) {
  // Docs pages often have a sidebar nav + long-form article.
  const hasSidebar = sections.some(s =>
    (s.tag === 'aside') || /sidebar|toc|nav-?docs|left-?nav/i.test(s.className || '')
  );
  const longArticle = sections.find(s => s.tag === 'main' || s.tag === 'section');
  const articleLen = longArticle ? (longArticle.text || '').length : 0;
  return { hasSidebar, articleLen };
}

function detectPricingLayout(sections) {
  // 2-4 similarly-sized cards with currency signals = pricing table.
  for (const s of sections) {
    if (!PRICING_TEXT.test(s.text || '')) continue;
    if ((s.cardCount || 0) >= 2 && (s.cardCount || 0) <= 6) return true;
  }
  return false;
}

export function extractPageIntent(rawData = {}, opts = {}) {
  const url = opts.url || rawData.url || '';
  const path = rootPath(url);
  const title = (opts.title || rawData.title || '').toLowerCase();
  const sections = (rawData.light && rawData.light.sections) || rawData.sections || [];
  const metas = ((rawData.light && rawData.light.stack && rawData.light.stack.metas) || []).map(m => ({
    name: (m.name || '').toLowerCase(),
    content: (m.content || ''),
  }));
  const description = (metas.find(m => m.name === 'description') || {}).content || '';
  const ogType = (metas.find(m => m.name === 'og:type') || {}).content || '';

  const scores = Object.fromEntries(TYPES.map(t => [t, 0]));
  const signals = [];

  // 1) URL rules (strongest signal).
  for (const rule of URL_RULES) {
    if (rule.re.test(path)) {
      scores[rule.type] += rule.weight;
      signals.push({ kind: 'url', type: rule.type, weight: rule.weight });
    }
  }

  // 2) og:type.
  if (ogType === 'article') {
    scores['blog-post'] += 0.6;
    signals.push({ kind: 'meta', type: 'blog-post', weight: 0.6, detail: 'og:type=article' });
  }

  // 3) Title keywords.
  if (/\bpricing\b|\bplans?\b/.test(title)) { scores.pricing += 0.4; signals.push({ kind: 'title', type: 'pricing', weight: 0.4 }); }
  if (/\bdocs?\b|documentation|guide/.test(title)) { scores.docs += 0.4; signals.push({ kind: 'title', type: 'docs', weight: 0.4 }); }
  if (/\bblog\b/.test(title)) { scores.blog += 0.3; signals.push({ kind: 'title', type: 'blog', weight: 0.3 }); }
  if (/\bprivacy|\bterms\b/.test(title)) { scores.legal += 0.5; signals.push({ kind: 'title', type: 'legal', weight: 0.5 }); }
  if (/\bsign.?in|\blog.?in|\bsign.?up\b/.test(title)) { scores.auth += 0.5; signals.push({ kind: 'title', type: 'auth', weight: 0.5 }); }

  // 4) DOM text signals.
  const bigText = sections.map(s => s.text || '').join('\n').slice(0, 8000);
  if (PRICING_TEXT.test(bigText) && detectPricingLayout(sections)) {
    scores.pricing += 0.6;
    signals.push({ kind: 'dom', type: 'pricing', weight: 0.6, detail: 'currency+card-grid' });
  }
  if (DOCS_TEXT.test(bigText)) {
    const { hasSidebar, articleLen } = detectDocsLayout(sections);
    const w = 0.3 + (hasSidebar ? 0.25 : 0) + (articleLen > 1500 ? 0.15 : 0);
    scores.docs += w;
    signals.push({ kind: 'dom', type: 'docs', weight: w, detail: `sidebar=${hasSidebar} article=${articleLen}` });
  }
  if (BLOG_POST_TEXT.test(bigText)) {
    scores['blog-post'] += 0.35;
    signals.push({ kind: 'dom', type: 'blog-post', weight: 0.35, detail: 'byline|min-read' });
  }
  if (LEGAL_TEXT.test(bigText)) {
    scores.legal += 0.4;
    signals.push({ kind: 'dom', type: 'legal', weight: 0.4 });
  }
  if (AUTH_TEXT.test(bigText) && countFormFields(sections) < 8 && bigText.length < 3000) {
    scores.auth += 0.35;
    signals.push({ kind: 'dom', type: 'auth', weight: 0.35, detail: 'auth-form-shape' });
  }

  // 5) Path="/" fallback → landing (weak prior).
  if (path === '/' || path === '') {
    scores.landing += 0.45;
    signals.push({ kind: 'url', type: 'landing', weight: 0.45, detail: 'root-path' });
  }

  // 6) Generic "has hero + features + cta" shape → landing.
  const roles = new Set();
  for (const s of sections) {
    const blob = `${s.className || ''} ${s.id || ''}`.toLowerCase();
    if (/hero/.test(blob)) roles.add('hero');
    if ((s.cardCount || 0) >= 3) roles.add('features');
    if (/cta|get-?started/.test(blob)) roles.add('cta');
    if (s.tag === 'footer') roles.add('footer');
  }
  if (roles.has('hero') && (roles.has('features') || roles.has('cta'))) {
    scores.landing += 0.3;
    signals.push({ kind: 'shape', type: 'landing', weight: 0.3, detail: [...roles].join('+') });
  }

  // Pick winner.
  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [winType, winScore] = ranked[0];
  const [, secondScore] = ranked[1] || ['unknown', 0];
  const margin = winScore - secondScore;
  let confidence = 0;
  if (winScore > 0) {
    confidence = Math.min(1, winScore * 0.6 + margin * 0.4);
  }
  const type = winScore === 0 ? 'unknown' : winType;

  const alternates = ranked
    .filter(([, s]) => s > 0 && s !== winScore)
    .slice(0, 3)
    .map(([t, s]) => ({ type: t, score: Number(s.toFixed(3)) }));

  return {
    type,
    confidence: Number(confidence.toFixed(3)),
    path,
    title: opts.title || rawData.title || '',
    description: description.slice(0, 200),
    signals: signals.slice(0, 20),
    alternates,
    needsSmart: confidence < 0.6,
  };
}

export const PAGE_TYPES = TYPES;
