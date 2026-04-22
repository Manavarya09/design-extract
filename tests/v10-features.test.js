import { describe, it } from 'node:test';
import assert from 'node:assert';

import { extractPageIntent } from '../src/extractors/page-intent.js';
import { extractSectionRoles } from '../src/extractors/section-roles.js';
import { extractComponentLibrary } from '../src/extractors/component-library.js';
import { extractMaterialLanguage } from '../src/extractors/material-language.js';
import { extractImageryStyle } from '../src/extractors/imagery-style.js';
import { discoverCanonicalPages, computeCrossPageConsistency } from '../src/multipage.js';
import { buildPromptPack, formatV0Prompt } from '../src/formatters/prompt-pack.js';

describe('v10: page intent', () => {
  it('classifies /pricing as pricing with high confidence', () => {
    const raw = {
      url: 'https://example.com/pricing',
      title: 'Pricing — Example',
      light: {
        sections: [
          {
            tag: 'section', className: 'pricing-grid', headings: ['Plans'],
            text: 'Starter $19/mo · Pro $49/mo · Team $99/mo · billed annually',
            buttonCount: 3, cardCount: 3, bounds: { y: 200, h: 600 },
          },
        ],
        stack: { metas: [] },
      },
    };
    const r = extractPageIntent(raw, { url: raw.url, title: raw.title });
    assert.equal(r.type, 'pricing');
    assert.ok(r.confidence > 0.6, `expected confidence > 0.6, got ${r.confidence}`);
  });

  it('classifies / with hero+features as landing', () => {
    const raw = {
      url: 'https://example.com/',
      title: 'Example',
      light: {
        sections: [
          { tag: 'section', className: 'hero', headings: ['Build better'], text: 'Ship products faster.', buttonCount: 2, cardCount: 0, bounds: { y: 0, h: 500 } },
          { tag: 'section', className: 'features', headings: ['Why us'], text: 'Fast. Reliable. Secure.', buttonCount: 0, cardCount: 4, bounds: { y: 500, h: 400 } },
        ],
        stack: { metas: [] },
      },
    };
    const r = extractPageIntent(raw, { url: raw.url, title: raw.title });
    assert.equal(r.type, 'landing');
  });

  it('classifies docs URL as docs', () => {
    const raw = {
      url: 'https://example.com/docs/getting-started',
      title: 'Docs',
      light: {
        sections: [
          { tag: 'aside', className: 'sidebar', headings: [], text: 'Guide...', buttonCount: 0, cardCount: 0, bounds: { y: 0, h: 800 } },
          { tag: 'main', className: 'article', headings: ['Getting Started'], text: 'npm install foo. import { bar } from foo;', buttonCount: 0, cardCount: 0, bounds: { y: 0, h: 1200 } },
        ],
        stack: { metas: [] },
      },
    };
    const r = extractPageIntent(raw, { url: raw.url, title: raw.title });
    assert.equal(r.type, 'docs');
  });
});

describe('v10: section roles', () => {
  it('labels hero/features/pricing/footer', () => {
    const sections = [
      { tag: 'section', className: 'hero', headings: ['H'], text: 'Build.', buttonCount: 1, cardCount: 0, bounds: { y: 0, h: 500 } },
      { tag: 'section', className: 'features grid', headings: ['Features'], text: 'Why use us', buttonCount: 0, cardCount: 4, bounds: { y: 500, h: 400 } },
      { tag: 'section', className: 'pricing', headings: ['Pricing'], text: '$10/mo', buttonCount: 3, cardCount: 3, bounds: { y: 900, h: 400 } },
      { tag: 'footer', className: '', headings: [], text: 'Copyright', buttonCount: 0, cardCount: 0, bounds: { y: 1300, h: 200 } },
    ];
    const r = extractSectionRoles(sections, []);
    const roles = r.sections.map(s => s.role);
    assert.ok(roles.includes('hero'));
    assert.ok(roles.includes('feature-grid'));
    assert.ok(roles.includes('pricing-table'));
    assert.ok(roles.includes('footer'));
  });
});

describe('v10: component library detection', () => {
  it('detects shadcn via shadcn css tokens', () => {
    const stack = {
      classNameSample: [
        'bg-background text-foreground rounded-lg ring-offset-background',
        'border-input px-4 py-2',
        'flex items-center gap-2',
      ],
      scripts: [],
    };
    const r = extractComponentLibrary(stack);
    assert.equal(r.library, 'shadcn/ui');
  });

  it('detects MUI via Mui*-root classes', () => {
    const stack = {
      classNameSample: [
        'MuiButton-root MuiButton-contained',
        'MuiPaper-root MuiPaper-elevation1',
        'MuiTypography-root MuiTypography-h1',
      ],
      scripts: [],
    };
    const r = extractComponentLibrary(stack);
    assert.equal(r.library, 'mui');
  });

  it('falls back to tailwindcss when only utility density present', () => {
    const stack = {
      classNameSample: [
        'flex items-center gap-2 px-4 py-2 rounded-lg',
        'text-sm font-medium text-gray-900',
        'bg-white hover:bg-gray-50 border border-gray-200',
      ],
      scripts: [],
    };
    const r = extractComponentLibrary(stack);
    assert.equal(r.library, 'tailwindcss');
  });
});

describe('v10: material language', () => {
  it('flags brutalist via hard shadows + sharp corners + saturation', () => {
    const design = {
      colors: { all: [{ hex: '#FF0055' }, { hex: '#00FF66' }, { hex: '#FFFF00' }] },
      shadows: { values: [{ value: '8px 8px 0 0 #000' }, { value: '4px 4px 0 0 #000' }] },
      borders: { radii: [0, 2, 0] },
      gradients: { count: 0 },
    };
    const r = extractMaterialLanguage(design);
    assert.equal(r.label, 'brutalist');
  });

  it('flags flat when no shadows and simple radii', () => {
    const design = {
      colors: { all: [{ hex: '#f5f5f7' }, { hex: '#111111' }] },
      shadows: { values: [] },
      borders: { radii: [6, 8, 10] },
      gradients: { count: 0 },
    };
    const r = extractMaterialLanguage(design);
    assert.equal(r.label, 'flat');
  });
});

describe('v10: imagery style', () => {
  it('flags flat-illustration when svg dominant', () => {
    const images = [
      { src: '/a.svg', width: 200, height: 200, borderRadius: '0px', tag: 'img' },
      { src: '/b.svg', width: 200, height: 200, borderRadius: '0px', tag: 'img' },
      { src: '/c.svg', width: 200, height: 200, borderRadius: '0px', tag: 'img' },
      { src: '/d.svg', width: 200, height: 200, borderRadius: '0px', tag: 'img' },
    ];
    const r = extractImageryStyle(images);
    assert.equal(r.label, 'flat-illustration');
  });

  it('flags photography when raster + photo filename hints', () => {
    const images = [
      { src: '/hero.jpg', width: 1200, height: 600, borderRadius: '0px', tag: 'img' },
      { src: '/photo-team.jpg', width: 800, height: 600, borderRadius: '0px', tag: 'img' },
      { src: '/portrait.jpeg', width: 400, height: 600, borderRadius: '9999px', tag: 'img' },
    ];
    const r = extractImageryStyle(images);
    assert.equal(r.label, 'photography');
  });
});

describe('v10: multipage discovery', () => {
  it('picks canonical pages from nav links by URL + anchor', async () => {
    const links = [
      { href: 'https://example.com/pricing', text: 'Pricing' },
      { href: 'https://example.com/docs', text: 'Docs' },
      { href: 'https://example.com/about', text: 'About' },
      { href: 'https://example.com/blog/launch', text: 'Our launch' },
      { href: 'https://example.com/random', text: 'random' },
    ];
    const chosen = await discoverCanonicalPages(links, 'https://example.com/', 5);
    const types = chosen.map(c => c.type);
    assert.ok(types.includes('pricing'));
    assert.ok(types.includes('docs'));
    assert.ok(types.includes('about'));
    assert.ok(types.includes('blog-post'));
  });

  it('computes cross-page consistency', () => {
    const pages = [
      { url: 'a', type: 'landing', design: { colors: { all: [{ hex: '#111' }, { hex: '#fff' }] }, typography: { families: ['Inter'] }, spacing: { scale: [{ value: '8px' }] }, borders: { radii: [{ value: '8px' }] } } },
      { url: 'b', type: 'pricing', design: { colors: { all: [{ hex: '#111' }, { hex: '#ff5722' }] }, typography: { families: ['Inter'] }, spacing: { scale: [{ value: '8px' }] }, borders: { radii: [{ value: '8px' }] } } },
    ];
    const r = computeCrossPageConsistency(pages);
    assert.equal(r.pairwise.length, 1);
    assert.ok(r.shared.colors.includes('#111'));
    assert.equal(r.perPageUnique[1].uniqueColors.includes('#ff5722'), true);
  });
});

describe('v10: prompt pack', () => {
  it('builds prompts with inlined tokens', () => {
    const design = {
      colors: { all: [{ hex: '#0ea5e9' }, { hex: '#111827' }] },
      typography: { families: [{ name: 'Inter' }] },
      spacing: { scale: [{ value: '8px' }, { value: '16px' }] },
      borders: { radii: [{ value: '8px' }] },
      shadows: { values: [{ value: '0 1px 2px rgba(0,0,0,.1)' }] },
      pageIntent: { type: 'landing' },
      materialLanguage: { label: 'flat' },
      voice: { tone: 'friendly', ctaVerbs: ['start', 'try'] },
      componentLibrary: { library: 'shadcn/ui' },
      sectionRoles: { sections: [{ role: 'hero', slots: { heading: 'Build faster' } }] },
      componentClusters: [{ name: 'Button' }],
    };
    const pack = buildPromptPack(design);
    assert.ok(pack['v0.txt'].includes('#0ea5e9'));
    assert.ok(pack['v0.txt'].includes('Tone: friendly'));
    assert.ok(pack['cursor.md'].includes('shadcn'));
    assert.ok(pack.recipes.length >= 1);
  });

  it('v0 prompt is non-empty even with a minimal design', () => {
    const r = formatV0Prompt({ colors: { all: [] }, typography: { families: [] }, spacing: { scale: [] }, borders: { radii: [] }, shadows: { values: [] } });
    assert.ok(r.length > 30);
  });
});
