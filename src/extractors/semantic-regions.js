// Classify page sections: nav/hero/features/pricing/testimonials/cta/footer/sidebar/content.

const KW = {
  pricing: /\b(\$\s*\d|per\s?month|\/mo\b|pricing|free|billed)/i,
  testimonials: /(customer|review|testimonial|said|"|")/i,
  features: /(feature|benefit|why|what you get)/i,
  cta: /(get started|sign up|try free|start now|request demo|contact sales)/i,
};

function classify(s) {
  const role = (s.role || '').toLowerCase();
  const tag = (s.tag || '').toLowerCase();
  if (tag === 'nav' || role === 'navigation') return 'nav';
  if (tag === 'header' || role === 'banner') return 'nav';
  if (tag === 'footer' || role === 'contentinfo') return 'footer';
  if (tag === 'aside' || role === 'complementary') return 'sidebar';

  const cls = (s.className || '').toLowerCase();
  const id = (s.id || '').toLowerCase();
  const blob = `${cls} ${id}`;
  const text = s.text || '';
  const headings = s.headings || [];

  if (/hero/.test(blob)) return 'hero';
  if (/pricing/.test(blob) || KW.pricing.test(text)) return 'pricing';
  if (/testimonial|review/.test(blob) || KW.testimonials.test(text)) return 'testimonials';
  if (/features?|grid/.test(blob) && s.cardCount >= 3) return 'features';
  if (KW.features.test(text) && s.cardCount >= 3) return 'features';
  if (s.buttonCount <= 2 && headings.length && text.length < 400 && KW.cta.test(text)) return 'cta';
  if (headings.length === 1 && s.buttonCount >= 1 && s.bounds && s.bounds.h > 300) return 'hero';
  return 'content';
}

export function extractSemanticRegions(sections = []) {
  return sections.map(s => ({
    role: classify(s),
    tag: s.tag,
    bounds: s.bounds,
    heading: (s.headings && s.headings[0]) || null,
    buttonCount: s.buttonCount || 0,
    cardCount: s.cardCount || 0,
    className: s.className || null,
  }));
}
