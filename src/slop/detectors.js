// The known tells of AI-generated web design, as deterministic checks over a
// designlang extraction. Each one says what it measured and where, so a flag
// can always be explained. No model is involved.

import { toHex, deltaE, hexToHsl } from './color.js';

export const DEFAULT_FACES = ['inter', 'system-ui', '-apple-system', 'blinkmacsystemfont', 'segoe ui', 'roboto', 'arial', 'helvetica', 'helvetica neue', 'sans-serif', 'ui-sans-serif'];

// Tailwind's default 500/600 swatches: what a generator reaches for when no
// brand was given.
export const DEFAULT_SWATCHES = {
  'indigo-500': '#6366f1', 'indigo-600': '#4f46e5', 'violet-500': '#8b5cf6', 'violet-600': '#7c3aed',
  'purple-500': '#a855f7', 'purple-600': '#9333ea', 'blue-500': '#3b82f6', 'blue-600': '#2563eb',
  'emerald-500': '#10b981', 'sky-500': '#0ea5e9', 'pink-500': '#ec4899', 'fuchsia-500': '#d946ef',
};

export const STOCK_PHRASES = [
  /\bbuild faster\b/i, /\bsupercharge (your|the)\b/i, /\ball[- ]in[- ]one\b/i, /\bunlock the power\b/i,
  /\bseamless(ly)?\b/i, /\brevolutioni[sz]e\b/i, /\bnext[- ]generation\b/i, /\bstreamline your\b/i,
  /\belevate your\b/i, /\bempower(s|ing)? (your|teams)\b/i, /\bunleash\b/i, /\btake .{1,20} to the next level\b/i,
  /\bat lightning speed\b/i, /\bgame[- ]chang(er|ing)\b/i,
];

const EMOJI = /\p{Extended_Pictographic}/u;

function isIndigo(hex) {
  const { h, s, l } = hexToHsl(hex);
  return h >= 230 && h <= 280 && s >= 45 && l > 15 && l < 85;
}

// next/font renames families ("__Inter_d65c78", "__Inter_Fallback_d65c78").
export function plainFamily(name) {
  return String(name || '').replace(/["']/g, '').replace(/^__(.+?)(_Fallback)?_[0-9a-f]{4,}$/i, '$1').replace(/_/g, ' ').replace(/\s+(variable|fallback)$/i, '').trim();
}

function bodyFamilies(design) {
  return (design.typography?.families || []).filter((f) => f.usage !== 'mono' && f.name).map((f) => ({ ...f, name: plainFamily(f.name) }));
}

function headings(design) {
  const out = new Set(design.voice?.sampleHeadings || []);
  for (const s of design.sectionRoles?.sections || []) {
    if (s.heading) out.add(s.heading);
    for (const h of s.slots?.subheadings || []) out.add(h);
  }
  return [...out].filter(Boolean);
}

function radiusCounts(design) {
  return (design.borders?.radii || []).filter((r) => r.value > 0 && r.value < 100);
}

export const DETECTORS = [
  {
    id: 'indigo-gradient',
    label: 'Indigo or violet gradient',
    weight: 3,
    why: 'Default indigo-to-purple gradients are the most common look of generated pages.',
    test(design) {
      const evidence = [];
      (design.gradients?.gradients || []).forEach((g, i) => {
        const hits = (g.stops || []).map((s) => toHex(s.color)).filter((h) => h && isIndigo(h));
        if (hits.length) evidence.push({ where: `gradient ${i + 1}`, value: g.raw || hits.join(', ') });
      });
      return { hit: evidence.length > 0, evidence };
    },
  },
  {
    id: 'default-face-only',
    label: 'Only a default typeface',
    weight: 2,
    why: 'Every text style uses Inter or the system font, with no type of its own.',
    test(design) {
      const fams = bodyFamilies(design);
      const hit = fams.length > 0 && fams.every((f) => DEFAULT_FACES.includes(f.name.toLowerCase()));
      return { hit, evidence: hit ? fams.map((f) => ({ where: `font family (${f.usage || 'text'})`, value: f.name })) : [] };
    },
  },
  {
    id: 'hero-three-cards',
    label: 'Hero, then three equal cards',
    weight: 2,
    why: 'A centred hero followed by a row of three identical feature cards is the default generated layout.',
    test(design) {
      // Navigation bars and banners often come first, so the hero only has to
      // open the content; the card row has to follow it closely.
      const sections = (design.sectionRoles?.sections || []).filter((s) => s.role !== 'nav');
      const heroAt = sections.findIndex((s) => s.role === 'hero');
      if (heroAt < 0 || heroAt > 2) return { hit: false, evidence: [] };
      const next = sections.slice(heroAt + 1, heroAt + 4).find((s) => s.cardCount === 3 || s.cardCount === 6);
      const threeCols = (design.layout?.gridColumns || []).some((g) => g.columns === 3);
      const hit = !!next && threeCols;
      return {
        hit,
        evidence: hit ? [
          { where: `section ${heroAt + 1} (hero)`, value: sections[heroAt].heading || 'hero' },
          { where: `section ${next.index + 1}`, value: `${next.cardCount} cards in a 3-column grid${next.heading ? `: ${next.heading}` : ''}` },
        ] : [],
      };
    },
  },
  {
    id: 'glow-shadows',
    label: 'Coloured glow shadows',
    weight: 2,
    why: 'Zero-offset, wide-blur coloured shadows ("glows") are a generator favourite.',
    test(design) {
      const evidence = (design.shadows?.values || [])
        .filter((s) => !s.inset && Math.abs(s.offsetX || 0) <= 2 && Math.abs(s.offsetY || 0) <= 4 && (s.blur || 0) >= 16 && s.tint?.kind === 'colored')
        .map((s) => ({ where: `shadow used ${s.count || 1}×`, value: s.raw }));
      return { hit: evidence.length > 0, evidence };
    },
  },
  {
    id: 'left-border-accent',
    label: 'Coloured side-border accents',
    weight: 2,
    why: 'Cards with a thick coloured bar down one side are a common generated decoration.',
    test(design) {
      const accents = design.surface?.accents || [];
      const hit = (design.surface?.accentCount || 0) >= 2;
      const groups = new Map();
      for (const a of accents) {
        const where = `${a.tag}${a.className ? '.' + a.className.split(' ')[0] : ''} (${a.side} border)`;
        const key = `${where}|${a.width}|${a.color}`;
        groups.set(key, { where, value: `${a.width}px ${a.color}`, n: (groups.get(key)?.n || 0) + 1 });
      }
      const evidence = [...groups.values()].slice(0, 3).map((g) => ({ where: g.n > 1 ? `${g.where}, ${g.n}×` : g.where, value: g.value }));
      return { hit, evidence: hit ? evidence : [] };
    },
  },
  {
    id: 'emoji-icons',
    label: 'Emoji used as icons',
    weight: 2,
    why: 'Emoji standing in for icons at the top of feature cards.',
    test(design) {
      const seen = new Map();
      const scan = (text, where) => {
        for (const line of String(text || '').split('\n')) {
          const t = line.trim();
          // An emoji that opens a line or stands alone is acting as an icon.
          if (t && EMOJI.test([...t][0]) && !seen.has(t)) seen.set(t, where);
        }
      };
      for (const s of design.sectionRoles?.sections || []) {
        scan(s.slots?.lede, `section ${s.index + 1}`);
        scan(s.heading, `section ${s.index + 1} heading`);
      }
      for (const h of design.voice?.sampleHeadings || []) scan(h, 'heading');
      (Array.isArray(design.componentAnatomy) ? design.componentAnatomy : []).forEach((c) => {
        for (const v of c.variants || []) for (const t of v.sampleText || []) scan(t, c.kind || c.name || 'component');
      });
      const evidence = [...seen].slice(0, 4).map(([value, where]) => ({ where, value: [...value][0] }));
      return { hit: seen.size >= 2, evidence: seen.size >= 2 ? evidence : [] };
    },
  },
  {
    id: 'uniform-radius',
    label: 'One radius on everything',
    weight: 1,
    why: 'The same rounded corner on buttons, cards and inputs, regardless of hierarchy.',
    test(design) {
      const radii = radiusCounts(design);
      const total = radii.reduce((n, r) => n + (r.count || 1), 0);
      const top = [...radii].sort((a, b) => (b.count || 1) - (a.count || 1))[0];
      const hit = !!top && total >= 5 && (top.count || 1) / total >= 0.8 && top.value >= 6 && top.value <= 24;
      return { hit, evidence: hit ? [{ where: `${top.count} of ${total} rounded elements`, value: `${top.value}px` }] : [] };
    },
  },
  {
    id: 'stock-copy',
    label: 'Stock marketing copy',
    weight: 2,
    why: 'Headlines built from stock phrases such as "Supercharge your" or "Seamless".',
    test(design) {
      const evidence = headings(design)
        .filter((h) => STOCK_PHRASES.some((re) => re.test(h)))
        .slice(0, 4)
        .map((h) => ({ where: 'heading', value: h }));
      return { hit: evidence.length >= 2, evidence: evidence.length >= 2 ? evidence : [] };
    },
  },
  {
    id: 'default-palette',
    label: 'Framework default colours',
    weight: 2,
    why: 'The brand colours are stock framework swatches (Tailwind indigo-500 and friends), not chosen ones.',
    test(design) {
      const evidence = [];
      for (const role of ['primary', 'secondary', 'accent']) {
        const hex = toHex(design.colors?.[role]);
        if (!hex) continue;
        for (const [name, swatch] of Object.entries(DEFAULT_SWATCHES)) {
          if (deltaE(hex, swatch) <= 3) { evidence.push({ where: `${role} colour`, value: `${hex} (${name})` }); break; }
        }
      }
      return { hit: evidence.length > 0, evidence };
    },
  },
  {
    id: 'centered-everything',
    label: 'Everything centred',
    weight: 1,
    why: 'Nearly all text on the page is centred, section after section.',
    test(design) {
      const share = design.surface?.centredTextShare;
      const hit = typeof share === 'number' && share >= 0.7;
      return { hit, evidence: hit ? [{ where: 'text blocks', value: `${Math.round(share * 100)}% of text area centred` }] : [] };
    },
  },
];
