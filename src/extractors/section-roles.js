// Attach richer semantic roles to the sections that semantic-regions.js already
// found. v9 labels were coarse (hero/features/pricing/testimonials/cta/footer/nav);
// v10 adds logo-wall, stats, faq, comparison, steps, gallery, bento, blog-grid.
// Input: enriched sections (from crawler) + existing `regions` array. Output: a
// parallel array with { role, subrole, confidence, slots }.

const CTA_RE = /\b(get started|sign ?up|try (free|it|now)|start (free|trial|now)|book a demo|request demo|contact sales|talk to sales|learn more|watch demo)\b/i;
const STATS_RE = /\b(\d[\d,.]*[+%]|\d+x\b|\$\d+[MBK]\b)/i;
const FAQ_RE = /\b(frequently asked|faq|common questions|questions & answers)\b/i;
const STEPS_RE = /\b(step\s?\d|how it works|\d\s*\.\s+[A-Z])/i;
const COMPARE_RE = /\b(vs\.?|compared to|free vs|basic vs|enterprise vs)\b/i;
const TESTIMONIAL_RE = /(".{20,}"|".{20,}"|—\s?[A-Z][a-z]+\s+[A-Z][a-z]+|ceo|founder|head of)/i;
const PRICING_RE = /(\$\s?\d|€\s?\d|£\s?\d|per\s?(month|user|seat)|\/mo\b|\/month|billed)/i;

function blob(s) {
  return `${s.className || ''} ${s.id || ''}`.toLowerCase();
}

function detectLogoWall(s) {
  // Logo walls: many small images in one row, minimal text.
  // The enriched sections don't carry image counts directly — we proxy via
  // cardCount with very short text.
  if ((s.cardCount || 0) >= 5 && (s.text || '').length < 300 &&
      /(trusted by|used by|customers|as seen in|logos?|partners|clients)/i.test(s.text || '' + ' ' + blob(s))) {
    return true;
  }
  return false;
}

function detectBento(s) {
  const b = blob(s);
  if (/bento/.test(b)) return true;
  // Bento hint: 4-8 cards with irregular sizes — we can't measure layout grid
  // here, so fall back to class name + cardCount heuristic.
  return false;
}

function classifyRole(s, existingRole, pageType) {
  const text = (s.text || '').slice(0, 2000);
  const b = blob(s);
  const headings = s.headings || [];
  const h1 = (headings[0] || '').toLowerCase();

  // Landmarks come first.
  if (s.tag === 'footer') return { role: 'footer', confidence: 0.95 };
  if (s.tag === 'nav' || /^nav|header-nav|top-?bar/.test(b)) return { role: 'nav', confidence: 0.9 };

  // Strong class-based hints.
  if (/logo-?(wall|cloud|grid|strip)|trusted-?by/.test(b) || detectLogoWall(s)) {
    return { role: 'logo-wall', confidence: 0.85 };
  }
  if (/bento/.test(b) || detectBento(s)) return { role: 'bento', subrole: 'features', confidence: 0.75 };
  if (/gallery|carousel|slider/.test(b)) return { role: 'gallery', confidence: 0.7 };
  if (/stat(s|istic)|metric|number/.test(b) && STATS_RE.test(text)) return { role: 'stats', confidence: 0.85 };
  if (FAQ_RE.test(text) || /\bfaq\b/.test(b)) return { role: 'faq', confidence: 0.85 };
  if (STEPS_RE.test(text) && (s.cardCount || 0) >= 3) return { role: 'steps', confidence: 0.75 };
  if (COMPARE_RE.test(text) && (s.cardCount || 0) >= 2) return { role: 'comparison', confidence: 0.7 };
  if (PRICING_RE.test(text) && (s.cardCount || 0) >= 2) return { role: 'pricing-table', confidence: 0.9 };

  // Testimonials vs hero vs features — existing classifier handled most of these;
  // re-run with tighter signals.
  if (TESTIMONIAL_RE.test(text) || /testimonial|review|quote/.test(b)) {
    return { role: 'testimonial', confidence: 0.8 };
  }
  if (/hero/.test(b) || (headings.length === 1 && (s.buttonCount || 0) >= 1 && s.bounds && s.bounds.h > 300 && s.bounds.y < 400)) {
    return { role: 'hero', confidence: 0.85 };
  }
  if ((s.cardCount || 0) >= 3 && (/(feature|benefit|what you get|why )/i.test(text) || /feature|grid/.test(b))) {
    return { role: 'feature-grid', confidence: 0.8 };
  }
  if (CTA_RE.test(text) && (s.buttonCount || 0) >= 1 && text.length < 600) {
    return { role: 'cta', confidence: 0.75 };
  }
  if (pageType === 'blog' && (s.cardCount || 0) >= 3) {
    return { role: 'blog-grid', confidence: 0.75 };
  }

  // Fall back to the coarse existing label if we have one.
  if (existingRole && existingRole !== 'content') {
    return { role: existingRole, confidence: 0.4 };
  }
  return { role: 'content', confidence: 0.3 };
}

function extractSlots(s) {
  // Lightweight slot detection from headings + button count. Real DOM-walking
  // slot extraction happens in component-anatomy.js — here we just record
  // rendered copy so prompts can quote the actual words.
  const slots = {};
  if ((s.headings || []).length) slots.heading = s.headings[0];
  if ((s.headings || []).length > 1) slots.subheadings = s.headings.slice(1);
  if (s.buttonCount > 0) slots.ctaCount = s.buttonCount;
  const text = s.text || '';
  const firstPara = text.split(/\n{2,}/)[0];
  if (firstPara && firstPara.length < 400 && firstPara !== slots.heading) {
    slots.lede = firstPara.trim();
  }
  return slots;
}

export function extractSectionRoles(sections = [], regions = [], pageIntent = null) {
  const pageType = pageIntent && pageIntent.type;
  const labeled = sections.map((s, i) => {
    const existing = regions[i] ? regions[i].role : null;
    const classified = classifyRole(s, existing, pageType);
    return {
      index: i,
      tag: s.tag,
      role: classified.role,
      subrole: classified.subrole || null,
      confidence: Number((classified.confidence || 0).toFixed(3)),
      heading: (s.headings && s.headings[0]) || null,
      bounds: s.bounds,
      buttonCount: s.buttonCount || 0,
      cardCount: s.cardCount || 0,
      slots: extractSlots(s),
      needsSmart: (classified.confidence || 0) < 0.5,
    };
  });

  // Reading-order + emphasis summary.
  const byRole = {};
  for (const r of labeled) {
    byRole[r.role] = (byRole[r.role] || 0) + 1;
  }

  return {
    sections: labeled,
    counts: byRole,
    readingOrder: labeled
      .filter(r => r.bounds)
      .sort((a, b) => (a.bounds?.y || 0) - (b.bounds?.y || 0))
      .map(r => r.role),
  };
}
