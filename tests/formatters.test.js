import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { formatMarkdown } from '../src/formatters/markdown.js';
import { formatTokens } from '../src/formatters/tokens.js';
import { formatTailwind } from '../src/formatters/tailwind.js';
import { formatCssVars } from '../src/formatters/css-vars.js';
import { formatPreview } from '../src/formatters/preview.js';
import { formatFigma } from '../src/formatters/figma.js';
import { formatReactTheme, formatShadcnTheme } from '../src/formatters/theme.js';
import { formatDtcgTokens } from '../src/formatters/dtcg-tokens.js';

// ── Shared mock design object ───────────────────────────────────

const mockDesign = {
  meta: {
    url: 'https://example.com',
    title: 'Test Site',
    timestamp: new Date().toISOString(),
    elementCount: 100,
    pagesAnalyzed: 1,
  },
  colors: {
    primary: { hex: '#0066cc', rgb: { r: 0, g: 102, b: 204 }, hsl: { h: 210, s: 100, l: 40 }, count: 50 },
    secondary: { hex: '#cc6600', rgb: { r: 204, g: 102, b: 0 }, hsl: { h: 30, s: 100, l: 40 }, count: 25 },
    accent: { hex: '#00cc66', rgb: { r: 0, g: 204, b: 102 }, hsl: { h: 150, s: 100, l: 40 }, count: 10 },
    neutrals: [
      { hex: '#333333', rgb: { r: 51, g: 51, b: 51 }, hsl: { h: 0, s: 0, l: 20 }, count: 30 },
      { hex: '#666666', rgb: { r: 102, g: 102, b: 102 }, hsl: { h: 0, s: 0, l: 40 }, count: 20 },
    ],
    backgrounds: ['#ffffff', '#f5f5f5'],
    text: ['#333333', '#666666'],
    gradients: ['linear-gradient(to right, #0066cc, #00cc66)'],
    all: [
      { hex: '#0066cc', rgb: { r: 0, g: 102, b: 204 }, hsl: { h: 210, s: 100, l: 40 }, count: 50, contexts: ['text', 'background'] },
      { hex: '#333333', rgb: { r: 51, g: 51, b: 51 }, hsl: { h: 0, s: 0, l: 20 }, count: 30, contexts: ['text'] },
    ],
  },
  typography: {
    families: [
      { name: 'Inter', count: 80, usage: 'all' },
      { name: 'Playfair Display', count: 20, usage: 'headings' },
    ],
    scale: [
      { size: 48, weight: '700', lineHeight: '1.2', letterSpacing: '-0.02em', tags: ['h1'], count: 5 },
      { size: 36, weight: '700', lineHeight: '1.3', letterSpacing: 'normal', tags: ['h2'], count: 8 },
      { size: 24, weight: '600', lineHeight: '1.4', letterSpacing: 'normal', tags: ['h3'], count: 12 },
      { size: 16, weight: '400', lineHeight: '1.5', letterSpacing: 'normal', tags: ['p', 'span'], count: 60 },
    ],
    headings: [
      { size: 48, weight: '700', lineHeight: '1.2', letterSpacing: '-0.02em', tags: ['h1'], count: 5 },
      { size: 36, weight: '700', lineHeight: '1.3', letterSpacing: 'normal', tags: ['h2'], count: 8 },
    ],
    body: { size: 16, weight: '400', lineHeight: '1.5', letterSpacing: 'normal', tags: ['p'], count: 60 },
    weights: [{ weight: '400', count: 60 }, { weight: '600', count: 12 }, { weight: '700', count: 13 }],
  },
  spacing: {
    base: 4,
    scale: [4, 8, 12, 16, 24, 32, 48, 64],
    tokens: { '1': '4px', '2': '8px', '3': '12px', '4': '16px', '6': '24px', '8': '32px', '12': '48px', '16': '64px' },
    raw: [4, 8, 12, 16, 24, 32, 48, 64],
  },
  shadows: {
    values: [
      { raw: '0 1px 3px rgba(0,0,0,0.1)', blur: 3, inset: false, label: 'sm' },
      { raw: '0 4px 12px rgba(0,0,0,0.15)', blur: 12, inset: false, label: 'md' },
    ],
  },
  borders: {
    radii: [
      { value: 4, label: 'sm', count: 20 },
      { value: 8, label: 'md', count: 15 },
      { value: 16, label: 'lg', count: 5 },
    ],
    widths: [1, 2],
    styles: ['solid'],
  },
  variables: { colors: { '--color-primary': '#0066cc' }, spacing: {}, typography: {} },
  breakpoints: [
    { value: 640, label: 'mobile', type: 'min-width' },
    { value: 768, label: 'tablet', type: 'min-width' },
    { value: 1024, label: 'desktop', type: 'min-width' },
  ],
  animations: {
    transitions: ['all 0.2s ease', 'opacity 0.3s ease-in-out'],
    keyframes: [],
    easings: ['ease', 'ease-in-out'],
    durations: ['0.2s', '0.3s'],
  },
  components: {
    buttons: {
      count: 10,
      baseStyle: { backgroundColor: '#0066cc', color: '#ffffff', borderRadius: '4px', fontSize: '14px' },
    },
  },
  accessibility: { score: 90, passCount: 45, failCount: 5, totalPairs: 50, pairs: [] },
  layout: {
    gridCount: 5,
    flexCount: 20,
    gridColumns: [{ columns: 3, count: 5 }],
    flexDirections: { 'row/nowrap': 15, 'column/nowrap': 5 },
    justifyPatterns: {},
    alignPatterns: {},
    containerWidths: [{ maxWidth: '1200px', padding: '16px' }],
    gaps: ['16px', '24px'],
    topGrids: [{ columns: 'repeat(3, 1fr)', rows: 'none', gap: '24px' }],
    topFlex: [],
  },
  gradients: { count: 0, gradients: [] },
  zIndex: { allValues: [], layers: [], issues: [], scale: [] },
  icons: { icons: [], count: 0 },
  fonts: { fonts: [], systemFonts: [] },
  images: { patterns: [], aspectRatios: [] },
  componentScreenshots: {},
  score: {
    overall: 85,
    grade: 'B',
    scores: {
      colorDiscipline: 85,
      typographyConsistency: 100,
      spacingSystem: 90,
      shadowConsistency: 100,
      radiusConsistency: 100,
      accessibility: 90,
      tokenization: 50,
    },
    issues: ['No CSS custom properties found'],
    strengths: ['Tight, disciplined color palette'],
  },
};

// ── formatMarkdown ──────────────────────────────────────────────

describe('formatMarkdown', () => {
  it('returns a string', () => {
    const result = formatMarkdown(mockDesign);
    assert.equal(typeof result, 'string');
  });

  it('contains the site title', () => {
    const result = formatMarkdown(mockDesign);
    assert.ok(result.includes('Test Site'));
  });

  it('contains color palette section', () => {
    const result = formatMarkdown(mockDesign);
    assert.ok(result.includes('## Color Palette'));
  });

  it('contains typography section', () => {
    const result = formatMarkdown(mockDesign);
    assert.ok(result.includes('## Typography'));
  });

  it('contains spacing section', () => {
    const result = formatMarkdown(mockDesign);
    assert.ok(result.includes('## Spacing'));
  });

  it('contains the primary color hex', () => {
    const result = formatMarkdown(mockDesign);
    assert.ok(result.includes('#0066cc'));
  });

  it('contains font family names', () => {
    const result = formatMarkdown(mockDesign);
    assert.ok(result.includes('Inter'));
  });

  it('contains component patterns section', () => {
    const result = formatMarkdown(mockDesign);
    assert.ok(result.includes('## Component Patterns'));
  });

  it('contains design system score section', () => {
    const result = formatMarkdown(mockDesign);
    assert.ok(result.includes('## Design System Score'));
  });

  it('contains layout section', () => {
    const result = formatMarkdown(mockDesign);
    assert.ok(result.includes('## Layout System'));
  });
});

// ── formatTokens ────────────────────────────────────────────────

describe('formatTokens', () => {
  it('returns valid JSON', () => {
    const result = formatTokens(mockDesign);
    const parsed = JSON.parse(result);
    assert.ok(typeof parsed === 'object');
  });

  it('contains color tokens', () => {
    const parsed = JSON.parse(formatTokens(mockDesign));
    assert.ok(parsed.color);
    assert.ok(parsed.color.primary);
    assert.equal(parsed.color.primary.$value, '#0066cc');
    assert.equal(parsed.color.primary.$type, 'color');
  });

  it('contains fontFamily tokens', () => {
    const parsed = JSON.parse(formatTokens(mockDesign));
    assert.ok(parsed.fontFamily);
  });

  it('contains spacing tokens', () => {
    const parsed = JSON.parse(formatTokens(mockDesign));
    assert.ok(parsed.spacing);
  });

  it('contains borderRadius tokens', () => {
    const parsed = JSON.parse(formatTokens(mockDesign));
    assert.ok(parsed.borderRadius);
    assert.ok(parsed.borderRadius.sm);
  });

  it('contains shadow tokens', () => {
    const parsed = JSON.parse(formatTokens(mockDesign));
    assert.ok(parsed.shadow);
    assert.ok(parsed.shadow.sm);
  });

  it('contains breakpoint tokens', () => {
    const parsed = JSON.parse(formatTokens(mockDesign));
    assert.ok(parsed.breakpoint);
  });
});

// ── formatDtcgTokens ────────────────────────────────────────────

describe('formatDtcgTokens', () => {
  const minimalDesign = {
    colors: { primary: '#3b82f6', secondary: '#10b981', neutrals: ['#111','#888','#eee'], backgrounds: ['#fff'], text: ['#111'], all: [] },
    typography: { families: ['Inter'], scale: [{ size:'16px', weight:'400', lineHeight:'1.5' }] },
    spacing: { scale: ['4px','8px','16px'], base: '4px' },
    shadows: { values: ['0 1px 2px rgba(0,0,0,0.1)'] },
    borders: { radii: ['4px','8px'] },
    variables: {},
  };

  it('emits $value/$type for every leaf', () => {
    const out = formatDtcgTokens(minimalDesign);
    assert.equal(out.primitive.color.brand.primary.$value, '#3b82f6');
    assert.equal(out.primitive.color.brand.primary.$type, 'color');
  });

  it('emits semantic aliases referencing primitives', () => {
    const out = formatDtcgTokens(minimalDesign);
    assert.match(out.semantic.color.action.primary.$value, /^\{primitive\.color\.brand\.primary\}$/);
    assert.equal(out.semantic.color.action.primary.$type, 'color');
  });

  it('emits composite typography tokens', () => {
    const out = formatDtcgTokens(minimalDesign);
    const body = out.semantic.typography.body;
    assert.equal(body.$type, 'typography');
    assert.equal(body.$value.fontFamily, 'Inter');
    assert.equal(body.$value.fontSize, '16px');
  });

  it('round-trips through JSON unchanged', () => {
    const out = formatDtcgTokens(minimalDesign);
    assert.deepEqual(JSON.parse(JSON.stringify(out)), out);
  });
});

// ── formatTailwind ──────────────────────────────────────────────

describe('formatTailwind', () => {
  it('returns a string', () => {
    const result = formatTailwind(mockDesign);
    assert.equal(typeof result, 'string');
  });

  it('contains export default', () => {
    const result = formatTailwind(mockDesign);
    assert.ok(result.includes('export default'));
  });

  it('contains primary color', () => {
    const result = formatTailwind(mockDesign);
    assert.ok(result.includes('#0066cc'));
  });

  it('contains font family', () => {
    const result = formatTailwind(mockDesign);
    assert.ok(result.includes('Inter'));
  });

  it('contains spacing values', () => {
    const result = formatTailwind(mockDesign);
    assert.ok(result.includes('4px'));
  });

  it('contains screen breakpoints', () => {
    const result = formatTailwind(mockDesign);
    assert.ok(result.includes('768px'));
  });
});

// ── formatCssVars ───────────────────────────────────────────────

describe('formatCssVars', () => {
  it('returns a string', () => {
    const result = formatCssVars(mockDesign);
    assert.equal(typeof result, 'string');
  });

  it('starts with :root {', () => {
    const result = formatCssVars(mockDesign);
    assert.ok(result.startsWith(':root {'));
  });

  it('ends with closing brace', () => {
    const result = formatCssVars(mockDesign);
    assert.ok(result.trimEnd().endsWith('}'));
  });

  it('contains color variables', () => {
    const result = formatCssVars(mockDesign);
    assert.ok(result.includes('--color-primary: #0066cc;'));
  });

  it('contains spacing variables', () => {
    const result = formatCssVars(mockDesign);
    assert.ok(result.includes('--spacing-'));
  });

  it('contains font variables', () => {
    const result = formatCssVars(mockDesign);
    assert.ok(result.includes('--font-'));
  });

  it('contains radius variables', () => {
    const result = formatCssVars(mockDesign);
    assert.ok(result.includes('--radius-'));
  });

  it('contains shadow variables', () => {
    const result = formatCssVars(mockDesign);
    assert.ok(result.includes('--shadow-'));
  });
});

// ── formatPreview ───────────────────────────────────────────────

describe('formatPreview', () => {
  it('returns a string', () => {
    const result = formatPreview(mockDesign);
    assert.equal(typeof result, 'string');
  });

  it('returns valid HTML with doctype', () => {
    const result = formatPreview(mockDesign);
    assert.ok(result.includes('<!DOCTYPE html>'));
  });

  it('contains html and body tags', () => {
    const result = formatPreview(mockDesign);
    assert.ok(result.includes('<html'));
    assert.ok(result.includes('<body>'));
    assert.ok(result.includes('</body>'));
    assert.ok(result.includes('</html>'));
  });

  it('contains the site title', () => {
    const result = formatPreview(mockDesign);
    assert.ok(result.includes('Test Site'));
  });

  it('contains color swatches section', () => {
    const result = formatPreview(mockDesign);
    assert.ok(result.includes('Color Palette'));
  });

  it('contains typography section', () => {
    const result = formatPreview(mockDesign);
    assert.ok(result.includes('Typography'));
  });
});

// ── formatFigma ─────────────────────────────────────────────────

describe('formatFigma', () => {
  it('returns valid JSON', () => {
    const result = formatFigma(mockDesign);
    const parsed = JSON.parse(result);
    assert.ok(typeof parsed === 'object');
  });

  it('has collections array with Brand collection', () => {
    const parsed = JSON.parse(formatFigma(mockDesign));
    assert.ok(Array.isArray(parsed.collections));
    const brand = parsed.collections.find(c => c.name === 'Brand');
    assert.ok(brand);
    assert.ok(Array.isArray(brand.modes));
    assert.ok(brand.variables.length > 0);
  });

  it('has Typography and Spacing collections', () => {
    const parsed = JSON.parse(formatFigma(mockDesign));
    const typo = parsed.collections.find(c => c.name === 'Typography');
    const spacing = parsed.collections.find(c => c.name === 'Spacing');
    assert.ok(typo);
    assert.ok(spacing);
    assert.ok(typo.variables.length > 0);
    assert.ok(spacing.variables.length > 0);
  });

  it('contains color variables with normalized RGB in light mode', () => {
    const parsed = JSON.parse(formatFigma(mockDesign));
    const brand = parsed.collections.find(c => c.name === 'Brand');
    const primary = brand.variables.find(v => v.name === 'color/primary');
    assert.ok(primary);
    assert.ok(primary.values.light.r >= 0 && primary.values.light.r <= 1);
  });

  it('contains spacing variables', () => {
    const parsed = JSON.parse(formatFigma(mockDesign));
    const spacing = parsed.collections.find(c => c.name === 'Spacing');
    const spacingVars = spacing.variables.filter(v => v.name.startsWith('spacing/'));
    assert.ok(spacingVars.length > 0);
  });

  it('contains radius variables', () => {
    const parsed = JSON.parse(formatFigma(mockDesign));
    const spacing = parsed.collections.find(c => c.name === 'Spacing');
    const radiusVars = spacing.variables.filter(v => v.name.startsWith('radius/'));
    assert.ok(radiusVars.length > 0);
  });
});

// ── formatReactTheme ────────────────────────────────────────────

describe('formatReactTheme', () => {
  it('returns a string', () => {
    const result = formatReactTheme(mockDesign);
    assert.equal(typeof result, 'string');
  });

  it('contains export const theme', () => {
    const result = formatReactTheme(mockDesign);
    assert.ok(result.includes('export const theme'));
  });

  it('contains export default theme', () => {
    const result = formatReactTheme(mockDesign);
    assert.ok(result.includes('export default theme'));
  });

  it('contains the primary color', () => {
    const result = formatReactTheme(mockDesign);
    assert.ok(result.includes('#0066cc'));
  });

  it('contains font family', () => {
    const result = formatReactTheme(mockDesign);
    assert.ok(result.includes('Inter'));
  });

  it('contains spacing values', () => {
    const result = formatReactTheme(mockDesign);
    assert.ok(result.includes('4px'));
  });

  it('contains the embedded JSON as valid JS', () => {
    const result = formatReactTheme(mockDesign);
    // Extract the JSON object from the template
    const jsonMatch = result.match(/export const theme = ({[\s\S]+?});/);
    assert.ok(jsonMatch, 'Should contain a theme object');
    // The JSON should be parseable
    const parsed = JSON.parse(jsonMatch[1]);
    assert.ok(parsed.colors);
    assert.ok(parsed.fonts);
  });
});

// ── formatShadcnTheme ───────────────────────────────────────────

describe('formatShadcnTheme', () => {
  it('returns a string', () => {
    const result = formatShadcnTheme(mockDesign);
    assert.equal(typeof result, 'string');
  });

  it('contains @layer base', () => {
    const result = formatShadcnTheme(mockDesign);
    assert.ok(result.includes('@layer base'));
  });

  it('contains :root', () => {
    const result = formatShadcnTheme(mockDesign);
    assert.ok(result.includes(':root'));
  });

  it('contains --primary variable', () => {
    const result = formatShadcnTheme(mockDesign);
    assert.ok(result.includes('--primary:'));
  });

  it('contains --background variable', () => {
    const result = formatShadcnTheme(mockDesign);
    assert.ok(result.includes('--background:'));
  });

  it('contains --radius variable', () => {
    const result = formatShadcnTheme(mockDesign);
    assert.ok(result.includes('--radius:'));
  });

  it('contains shadcn/ui comment', () => {
    const result = formatShadcnTheme(mockDesign);
    assert.ok(result.includes('shadcn/ui'));
  });
});
