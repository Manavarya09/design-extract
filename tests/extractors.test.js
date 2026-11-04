import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { extractColors } from '../src/extractors/colors.js';
import { buildRamp, buildSemanticPairs, contrast } from '../src/extractors/color-ramps.js';
import { extractTypography, inferTypeRatio, parseFluidValue } from '../src/extractors/typography.js';
import { extractSpacing } from '../src/extractors/spacing.js';
import { extractShadows } from '../src/extractors/shadows.js';
import { extractBorders } from '../src/extractors/borders.js';
import { extractComponents } from '../src/extractors/components.js';
import { extractAccessibility } from '../src/extractors/accessibility.js';
import { extractLayout } from '../src/extractors/layout.js';
import { extractGradients } from '../src/extractors/gradients.js';
import { extractZIndex } from '../src/extractors/zindex.js';
import { scoreDesignSystem } from '../src/extractors/scoring.js';
import { extractStackFingerprint } from '../src/extractors/stack-fingerprint.js';
import { extractCssHealth } from '../src/extractors/css-health.js';
import { remediateFailingPairs } from '../src/extractors/a11y-remediation.js';
import { extractSemanticRegions } from '../src/extractors/semantic-regions.js';
import { clusterComponents } from '../src/extractors/component-clusters.js';

// ── Shared fixture defaults ─────────────────────────────────────

function makeEl(overrides = {}) {
  return {
    tag: 'div',
    classList: '',
    role: '',
    area: 10000,
    color: 'rgb(0, 0, 0)',
    backgroundColor: 'rgb(255, 255, 255)',
    backgroundImage: 'none',
    borderColor: 'rgb(200, 200, 200)',
    fontFamily: '"Inter", sans-serif',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '1.5',
    letterSpacing: 'normal',
    paddingTop: '0px',
    paddingRight: '0px',
    paddingBottom: '0px',
    paddingLeft: '0px',
    marginTop: '0px',
    marginRight: '0px',
    marginBottom: '0px',
    marginLeft: '0px',
    gap: '0px',
    borderRadius: '0px',
    boxShadow: 'none',
    zIndex: 'auto',
    transition: 'none',
    animation: 'none',
    display: 'block',
    position: 'static',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'normal',
    alignItems: 'normal',
    gridTemplateColumns: 'none',
    gridTemplateRows: 'none',
    maxWidth: 'none',
    borderWidth: '0px',
    borderStyle: 'none',
    ...overrides,
  };
}

// ── extractColors ───────────────────────────────────────────────

describe('extractColors', () => {
  const mockStyles = [
    makeEl({ tag: 'body', area: 200000, color: 'rgb(51, 51, 51)', backgroundColor: 'rgb(255, 255, 255)' }),
    makeEl({ tag: 'h1', color: 'rgb(0, 0, 0)', backgroundColor: 'rgb(255, 255, 255)' }),
    makeEl({ tag: 'a', classList: 'btn', role: 'button', area: 5000, color: 'rgb(255, 255, 255)', backgroundColor: 'rgb(0, 102, 204)' }),
    makeEl({ tag: 'a', classList: 'btn', role: 'button', area: 5000, color: 'rgb(255, 255, 255)', backgroundColor: 'rgb(0, 102, 204)' }),
    makeEl({ tag: 'a', classList: 'btn', role: 'button', area: 5000, color: 'rgb(255, 255, 255)', backgroundColor: 'rgb(0, 102, 204)' }),
    makeEl({ tag: 'span', color: 'rgb(200, 50, 50)', backgroundColor: 'rgba(0, 0, 0, 0)' }),
    makeEl({ tag: 'span', color: 'rgb(200, 50, 50)', backgroundColor: 'rgba(0, 0, 0, 0)' }),
    makeEl({ tag: 'p', color: 'rgb(102, 102, 102)', backgroundColor: 'rgb(255, 255, 255)' }),
    makeEl({ tag: 'div', area: 100000, backgroundColor: 'rgb(245, 245, 245)', color: 'rgb(0, 0, 0)' }),
    makeEl({ tag: 'footer', area: 80000, backgroundColor: 'rgb(34, 34, 34)', color: 'rgb(200, 200, 200)' }),
    // Intentional low-contrast text pair for a11y failure detection
    makeEl({ tag: 'p', color: 'rgb(170, 170, 170)', backgroundColor: 'rgb(255, 255, 255)' }),
  ];

  it('returns an object with expected keys', () => {
    const colors = extractColors(mockStyles);
    assert.ok('primary' in colors);
    assert.ok('secondary' in colors);
    assert.ok('accent' in colors);
    assert.ok('neutrals' in colors);
    assert.ok('backgrounds' in colors);
    assert.ok('text' in colors);
    assert.ok('gradients' in colors);
    assert.ok('all' in colors);
  });

  it('detects a primary chromatic color', () => {
    const colors = extractColors(mockStyles);
    assert.ok(colors.primary);
    assert.ok(colors.primary.hex);
    assert.ok(colors.primary.rgb);
    assert.ok(colors.primary.hsl);
  });

  it('identifies background colors from large-area elements', () => {
    const colors = extractColors(mockStyles);
    assert.ok(colors.backgrounds.length > 0);
    assert.ok(colors.backgrounds.includes('#ffffff'));
  });

  it('identifies text colors', () => {
    const colors = extractColors(mockStyles);
    assert.ok(colors.text.length > 0);
  });

  it('detects neutrals (unsaturated colors)', () => {
    const colors = extractColors(mockStyles);
    assert.ok(colors.neutrals.length > 0);
  });

  it('all colors have hex, rgb, hsl, count, contexts', () => {
    const colors = extractColors(mockStyles);
    for (const c of colors.all) {
      assert.ok(c.hex);
      assert.ok(c.rgb);
      assert.ok(c.hsl);
      assert.ok(typeof c.count === 'number');
      assert.ok(Array.isArray(c.contexts));
    }
  });

  it('collects gradients from backgroundImage', () => {
    const styles = [
      makeEl({ backgroundImage: 'linear-gradient(to right, #ff0000, #0000ff)' }),
      makeEl(),
    ];
    const colors = extractColors(styles);
    assert.equal(colors.gradients.length, 1);
  });
});

// ── extractTypography ───────────────────────────────────────────

describe('extractTypography', () => {
  const mockStyles = [
    makeEl({ tag: 'h1', fontFamily: '"Playfair Display", serif', fontSize: '48px', fontWeight: '700', lineHeight: '1.2', letterSpacing: '-0.02em' }),
    makeEl({ tag: 'h2', fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: '700', lineHeight: '1.3', letterSpacing: 'normal' }),
    makeEl({ tag: 'h3', fontFamily: '"Inter", sans-serif', fontSize: '24px', fontWeight: '600', lineHeight: '1.4', letterSpacing: 'normal' }),
    makeEl({ tag: 'p', fontFamily: '"Inter", sans-serif', fontSize: '16px', fontWeight: '400', lineHeight: '1.5', letterSpacing: 'normal' }),
    makeEl({ tag: 'p', fontFamily: '"Inter", sans-serif', fontSize: '16px', fontWeight: '400', lineHeight: '1.5', letterSpacing: 'normal' }),
    makeEl({ tag: 'p', fontFamily: '"Inter", sans-serif', fontSize: '16px', fontWeight: '400', lineHeight: '1.5', letterSpacing: 'normal' }),
    makeEl({ tag: 'span', fontFamily: '"Inter", sans-serif', fontSize: '14px', fontWeight: '400', lineHeight: '1.5', letterSpacing: 'normal' }),
    makeEl({ tag: 'li', fontFamily: '"Inter", sans-serif', fontSize: '16px', fontWeight: '400', lineHeight: '1.5', letterSpacing: 'normal' }),
    makeEl({ tag: 'strong', fontFamily: '"Inter", sans-serif', fontSize: '16px', fontWeight: '700', lineHeight: '1.5', letterSpacing: 'normal' }),
  ];

  it('returns expected keys', () => {
    const typo = extractTypography(mockStyles);
    assert.ok('families' in typo);
    assert.ok('scale' in typo);
    assert.ok('headings' in typo);
    assert.ok('body' in typo);
    assert.ok('weights' in typo);
  });

  it('detects font families sorted by usage', () => {
    const typo = extractTypography(mockStyles);
    assert.ok(typo.families.length >= 2);
    // Inter is most used
    assert.equal(typo.families[0].name, 'Inter');
  });

  it('builds a type scale from unique sizes', () => {
    const typo = extractTypography(mockStyles);
    assert.ok(typo.scale.length >= 3);
    // Scale should be sorted descending by size
    for (let i = 1; i < typo.scale.length; i++) {
      assert.ok(typo.scale[i - 1].size >= typo.scale[i].size);
    }
  });

  it('identifies heading sizes from h1-h6 tags', () => {
    const typo = extractTypography(mockStyles);
    assert.ok(typo.headings.length >= 2);
    assert.ok(typo.headings.some(h => h.tags.includes('h1')));
  });

  it('identifies body text', () => {
    const typo = extractTypography(mockStyles);
    assert.ok(typo.body);
    assert.equal(typo.body.size, 16);
  });

  it('counts font weights', () => {
    const typo = extractTypography(mockStyles);
    assert.ok(typo.weights.length >= 2);
    assert.ok(typo.weights.some(w => w.weight === '400'));
    assert.ok(typo.weights.some(w => w.weight === '700'));
  });

  it('drops generic CSS family names from the families list', () => {
    // Stacks declaring only generic fallbacks should not produce any
    // entry in families[] — they aren't part of the site's brand.
    const noisy = [
      makeEl({ tag: 'p',    fontFamily: 'sans-serif', fontSize: '16px' }),
      makeEl({ tag: 'span', fontFamily: 'system-ui',  fontSize: '14px' }),
      makeEl({ tag: 'code', fontFamily: 'monospace',  fontSize: '12px' }),
      makeEl({ tag: 'h1',   fontFamily: 'inherit',    fontSize: '32px' }),
      makeEl({ tag: 'h2',   fontFamily: '"Inter", sans-serif', fontSize: '24px' }),
    ];
    const typo = extractTypography(noisy);
    const names = typo.families.map(f => f.name);
    assert.ok(!names.some(n => /^sans-serif|monospace|system-ui|inherit$/i.test(n)),
      `families must not contain generic stacks, got: ${names.join(', ')}`);
    assert.ok(names.includes('Inter'), 'real families must still come through');
  });

  it('drops icon-font families (Material Icons, Font Awesome, etc.)', () => {
    const iconHeavy = [
      makeEl({ tag: 'i',    fontFamily: '"Material Icons", sans-serif', fontSize: '24px' }),
      makeEl({ tag: 'i',    fontFamily: '"Font Awesome 6 Free"',         fontSize: '20px' }),
      makeEl({ tag: 'span', fontFamily: 'lucide',                        fontSize: '16px' }),
      makeEl({ tag: 'p',    fontFamily: '"Inter", sans-serif',           fontSize: '16px' }),
    ];
    const typo = extractTypography(iconHeavy);
    const names = typo.families.map(f => f.name);
    assert.ok(!names.some(n => /Material Icons|Font Awesome|lucide/i.test(n)),
      `families must not contain icon fonts, got: ${names.join(', ')}`);
  });
});

// ── extractSpacing ──────────────────────────────────────────────

describe('extractSpacing', () => {
  const mockStyles = [
    makeEl({ paddingTop: '4px', paddingRight: '8px', paddingBottom: '4px', paddingLeft: '8px' }),
    makeEl({ paddingTop: '16px', paddingRight: '16px', marginBottom: '24px' }),
    makeEl({ paddingTop: '8px', paddingRight: '12px', gap: '16px' }),
    makeEl({ marginTop: '32px', marginBottom: '32px' }),
    makeEl({ paddingTop: '48px', paddingBottom: '48px' }),
    makeEl({ paddingTop: '64px' }),
  ];

  it('returns expected keys', () => {
    const spacing = extractSpacing(mockStyles);
    assert.ok('base' in spacing);
    assert.ok('scale' in spacing);
    assert.ok('tokens' in spacing);
    assert.ok('raw' in spacing);
  });

  it('detects a base unit', () => {
    const spacing = extractSpacing(mockStyles);
    // The algorithm picks the best-scoring candidate from [2,4,6,8];
    // since all values are divisible by 2, base may be 2, 4, or another factor.
    assert.ok(spacing.base !== null);
    assert.ok([2, 4, 8].includes(spacing.base));
  });

  it('raw values are sorted ascending', () => {
    const spacing = extractSpacing(mockStyles);
    for (let i = 1; i < spacing.raw.length; i++) {
      assert.ok(spacing.raw[i] >= spacing.raw[i - 1]);
    }
  });

  it('generates tokens object', () => {
    const spacing = extractSpacing(mockStyles);
    assert.ok(Object.keys(spacing.tokens).length > 0);
  });
});

// ── extractShadows ──────────────────────────────────────────────

describe('extractShadows', () => {
  const mockStyles = [
    makeEl({ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }),
    makeEl({ boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }),
    makeEl({ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)' }),
    makeEl({ boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }),
    makeEl({ boxShadow: 'none' }),
    makeEl(),
  ];

  it('returns an object with values array', () => {
    const shadows = extractShadows(mockStyles);
    assert.ok(Array.isArray(shadows.values));
  });

  it('extracts unique shadows', () => {
    const shadows = extractShadows(mockStyles);
    assert.equal(shadows.values.length, 4);
  });

  it('classifies shadow sizes', () => {
    const shadows = extractShadows(mockStyles);
    const labels = shadows.values.map(s => s.label);
    assert.ok(labels.includes('sm'));
    assert.ok(labels.includes('lg') || labels.includes('xl'));
  });

  it('detects inset shadows', () => {
    const shadows = extractShadows(mockStyles);
    assert.ok(shadows.values.some(s => s.inset));
  });

  it('sorts by blur ascending', () => {
    const shadows = extractShadows(mockStyles);
    for (let i = 1; i < shadows.values.length; i++) {
      assert.ok(shadows.values[i].blur >= shadows.values[i - 1].blur);
    }
  });

  it('parses multi-layer shadows from the key layer, not the whole string', () => {
    const shadows = extractShadows([
      makeEl({ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.1)' }),
    ]);
    const s = shadows.values[0];
    assert.equal(s.layerCount, 2);
    assert.equal(s.blur, 15);
    assert.equal(s.offsetY, 10);
    assert.equal(s.spread, -3);
    assert.equal(s.label, 'lg');
  });

  it('builds an ordered elevation ladder and drops near-duplicates', () => {
    const shadows = extractShadows([
      makeEl({ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }),
      makeEl({ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }),
      makeEl({ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }),
      makeEl({ boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }),
    ]);
    assert.equal(shadows.elevation.length, 2);
    assert.deepEqual(shadows.elevation.map(e => e.name), ['xs', 'sm']);
    // The most-used raw value wins its bucket.
    assert.equal(shadows.elevation[0].raw, '0 1px 3px rgba(0,0,0,0.06)');
    assert.ok(shadows.elevation[0].visualWeight < shadows.elevation[1].visualWeight);
    assert.equal(shadows.system.redundancy, 1.5);
  });

  it('flags brand-tinted shadows', () => {
    const shadows = extractShadows([
      makeEl({ boxShadow: '0 8px 24px rgba(79, 70, 229, 0.35)' }),
    ]);
    assert.equal(shadows.values[0].tint.kind, 'colored');
    assert.equal(shadows.values[0].tint.alpha, 0.35);
    assert.equal(shadows.system.tint, 'colored');
  });

  it('reads neutral black shadows as neutral', () => {
    const shadows = extractShadows([makeEl({ boxShadow: '0 4px 12px rgba(0,0,0,0.15)' })]);
    assert.equal(shadows.values[0].tint.kind, 'neutral');
    assert.equal(shadows.system.tint, 'neutral');
  });

  it('keeps inset shadows out of the elevation ladder', () => {
    const shadows = extractShadows([
      makeEl({ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)' }),
      makeEl({ boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }),
    ]);
    assert.equal(shadows.elevation.length, 1);
    assert.equal(shadows.system.insetCount, 1);
  });
});

// ── extractBorders ──────────────────────────────────────────────

describe('extractBorders', () => {
  const mockStyles = [
    makeEl({ borderRadius: '4px', borderWidth: '1px', borderStyle: 'solid' }),
    makeEl({ borderRadius: '4px', borderWidth: '1px', borderStyle: 'solid' }),
    makeEl({ borderRadius: '4px', borderWidth: '1px', borderStyle: 'solid' }),
    makeEl({ borderRadius: '8px', borderWidth: '2px', borderStyle: 'solid' }),
    makeEl({ borderRadius: '8px', borderWidth: '2px', borderStyle: 'solid' }),
    makeEl({ borderRadius: '16px', borderStyle: 'dashed', borderWidth: '1px' }),
    makeEl({ borderRadius: '9999px' }),
    makeEl({ borderRadius: '0px' }),
  ];

  it('returns expected keys', () => {
    const borders = extractBorders(mockStyles);
    assert.ok('radii' in borders);
    assert.ok('widths' in borders);
    assert.ok('styles' in borders);
  });

  it('extracts unique border radii', () => {
    const borders = extractBorders(mockStyles);
    assert.ok(borders.radii.length >= 3);
  });

  it('labels border radii', () => {
    const borders = extractBorders(mockStyles);
    for (const r of borders.radii) {
      assert.ok(r.label);
      assert.ok(r.value > 0);
      assert.ok(typeof r.count === 'number');
    }
  });

  it('extracts border widths', () => {
    const borders = extractBorders(mockStyles);
    assert.ok(borders.widths.length >= 1);
    assert.ok(borders.widths.includes(1));
  });

  it('extracts border styles', () => {
    const borders = extractBorders(mockStyles);
    assert.ok(borders.styles.includes('solid'));
    assert.ok(borders.styles.includes('dashed'));
  });
});

// ── extractComponents ───────────────────────────────────────────

describe('extractComponents', () => {
  const mockStyles = [
    makeEl({ tag: 'button', role: 'button', area: 3000, backgroundColor: 'rgb(0, 102, 204)', color: 'rgb(255, 255, 255)', fontSize: '14px', fontWeight: '600', borderRadius: '8px', paddingTop: '10px', paddingRight: '20px' }),
    makeEl({ tag: 'button', role: 'button', area: 3000, backgroundColor: 'rgb(0, 102, 204)', color: 'rgb(255, 255, 255)', fontSize: '14px', fontWeight: '600', borderRadius: '8px', paddingTop: '10px', paddingRight: '20px' }),
    makeEl({ tag: 'a', classList: 'btn-secondary', role: 'button', area: 2500, backgroundColor: 'rgb(240, 240, 240)', color: 'rgb(0, 0, 0)', fontSize: '14px', fontWeight: '500', borderRadius: '8px', paddingTop: '10px', paddingRight: '20px' }),
    makeEl({ tag: 'input', area: 2000, backgroundColor: 'rgb(255, 255, 255)', color: 'rgb(0, 0, 0)', borderColor: 'rgb(200, 200, 200)', borderRadius: '4px', fontSize: '14px', paddingTop: '8px', paddingRight: '12px' }),
    makeEl({ tag: 'input', area: 2000, backgroundColor: 'rgb(255, 255, 255)', color: 'rgb(0, 0, 0)', borderColor: 'rgb(200, 200, 200)', borderRadius: '4px', fontSize: '14px', paddingTop: '8px', paddingRight: '12px' }),
    makeEl({ tag: 'a', area: 500, color: 'rgb(0, 102, 204)', fontSize: '16px', fontWeight: '400' }),
    makeEl({ tag: 'a', area: 500, color: 'rgb(0, 102, 204)', fontSize: '16px', fontWeight: '400' }),
    makeEl({ tag: 'nav', role: 'navigation', area: 50000, backgroundColor: 'rgb(255, 255, 255)', paddingTop: '12px', paddingBottom: '12px', paddingLeft: '24px', paddingRight: '24px', position: 'sticky', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }),
    makeEl({ tag: 'div', classList: 'card', area: 20000, backgroundColor: 'rgb(255, 255, 255)', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', paddingTop: '24px', paddingRight: '24px' }),
  ];

  it('detects buttons', () => {
    const components = extractComponents(mockStyles);
    assert.ok(components.buttons);
    assert.ok(components.buttons.count >= 2);
    assert.ok(components.buttons.baseStyle);
  });

  it('detects inputs', () => {
    const components = extractComponents(mockStyles);
    assert.ok(components.inputs);
    assert.equal(components.inputs.count, 2);
  });

  it('detects links', () => {
    const components = extractComponents(mockStyles);
    assert.ok(components.links);
  });

  it('detects navigation', () => {
    const components = extractComponents(mockStyles);
    assert.ok(components.navigation);
  });

  it('detects cards', () => {
    const components = extractComponents(mockStyles);
    assert.ok(components.cards);
  });

  it('generates CSS for detected components', () => {
    const components = extractComponents(mockStyles);
    // At least buttons should have CSS
    assert.ok(components.buttons.css);
    assert.ok(components.buttons.css.includes('{'));
  });
});

// ── extractAccessibility ────────────────────────────────────────

describe('extractAccessibility', () => {
  const mockStyles = [
    // Good contrast: black on white
    makeEl({ tag: 'p', color: 'rgb(0, 0, 0)', backgroundColor: 'rgb(255, 255, 255)', fontSize: '16px' }),
    makeEl({ tag: 'p', color: 'rgb(0, 0, 0)', backgroundColor: 'rgb(255, 255, 255)', fontSize: '16px' }),
    makeEl({ tag: 'p', color: 'rgb(0, 0, 0)', backgroundColor: 'rgb(255, 255, 255)', fontSize: '16px' }),
    // Good contrast: white on dark blue
    makeEl({ tag: 'a', color: 'rgb(255, 255, 255)', backgroundColor: 'rgb(0, 51, 153)', fontSize: '14px' }),
    makeEl({ tag: 'a', color: 'rgb(255, 255, 255)', backgroundColor: 'rgb(0, 51, 153)', fontSize: '14px' }),
    // Bad contrast: light gray on white
    makeEl({ tag: 'span', color: 'rgb(200, 200, 200)', backgroundColor: 'rgb(255, 255, 255)', fontSize: '12px' }),
    makeEl({ tag: 'span', color: 'rgb(200, 200, 200)', backgroundColor: 'rgb(255, 255, 255)', fontSize: '12px' }),
    // Transparent bg should be skipped
    makeEl({ tag: 'div', color: 'rgb(0, 0, 0)', backgroundColor: 'rgba(0, 0, 0, 0)', fontSize: '16px' }),
  ];

  it('returns expected keys', () => {
    const a11y = extractAccessibility(mockStyles);
    assert.ok('score' in a11y);
    assert.ok('passCount' in a11y);
    assert.ok('failCount' in a11y);
    assert.ok('totalPairs' in a11y);
    assert.ok('pairs' in a11y);
  });

  it('detects passing pairs', () => {
    const a11y = extractAccessibility(mockStyles);
    assert.ok(a11y.passCount > 0);
  });

  it('detects failing pairs', () => {
    const a11y = extractAccessibility(mockStyles);
    assert.ok(a11y.failCount > 0);
  });

  it('score is between 0 and 100', () => {
    const a11y = extractAccessibility(mockStyles);
    assert.ok(a11y.score >= 0 && a11y.score <= 100);
  });

  it('sorts failures first', () => {
    const a11y = extractAccessibility(mockStyles);
    if (a11y.pairs.length >= 2) {
      const firstFail = a11y.pairs.findIndex(p => p.level === 'FAIL');
      const firstPass = a11y.pairs.findIndex(p => p.level !== 'FAIL');
      if (firstFail >= 0 && firstPass >= 0) {
        assert.ok(firstFail < firstPass);
      }
    }
  });

  it('each pair has ratio and level', () => {
    const a11y = extractAccessibility(mockStyles);
    for (const p of a11y.pairs) {
      assert.ok(typeof p.ratio === 'number');
      assert.ok(['AA', 'AAA', 'FAIL'].includes(p.level));
    }
  });
});

// ── extractLayout ───────────────────────────────────────────────

describe('extractLayout', () => {
  const mockStyles = [
    makeEl({ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: 'auto', gap: '24px', area: 80000 }),
    makeEl({ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', area: 40000 }),
    makeEl({ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', area: 50000 }),
    makeEl({ display: 'flex', flexDirection: 'column', flexWrap: 'nowrap', justifyContent: 'flex-start', alignItems: 'stretch', area: 30000 }),
    makeEl({ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '12px', area: 60000 }),
    makeEl({ tag: 'main', area: 200000, maxWidth: '1200px', paddingLeft: '24px', paddingRight: '24px' }),
  ];

  it('returns expected keys', () => {
    const layout = extractLayout(mockStyles);
    assert.ok('gridCount' in layout);
    assert.ok('flexCount' in layout);
    assert.ok('gridColumns' in layout);
    assert.ok('flexDirections' in layout);
    assert.ok('containerWidths' in layout);
    assert.ok('gaps' in layout);
    assert.ok('topGrids' in layout);
    assert.ok('topFlex' in layout);
  });

  it('counts grid and flex containers', () => {
    const layout = extractLayout(mockStyles);
    assert.equal(layout.gridCount, 2);
    assert.equal(layout.flexCount, 3);
  });

  it('detects grid column patterns', () => {
    const layout = extractLayout(mockStyles);
    assert.ok(layout.gridColumns.length >= 1);
    assert.ok(layout.gridColumns.some(g => g.columns === 3));
  });

  it('summarizes flex directions', () => {
    const layout = extractLayout(mockStyles);
    assert.ok(layout.flexDirections['row/nowrap'] >= 1);
    assert.ok(layout.flexDirections['column/nowrap'] >= 1);
  });

  it('collects gap values', () => {
    const layout = extractLayout(mockStyles);
    assert.ok(layout.gaps.length >= 1);
  });

  it('detects container widths', () => {
    const layout = extractLayout(mockStyles);
    assert.ok(layout.containerWidths.length >= 1);
    assert.ok(layout.containerWidths.some(c => c.maxWidth === '1200px'));
  });
});

// ── extractGradients ────────────────────────────────────────────

describe('extractGradients', () => {
  const mockStyles = [
    makeEl({ backgroundImage: 'linear-gradient(to right, #ff0000, #0000ff)' }),
    makeEl({ backgroundImage: 'radial-gradient(circle, #ff0000, #00ff00, #0000ff)' }),
    makeEl({ backgroundImage: 'linear-gradient(135deg, #ff0000 0%, #ff7700 50%, #ffff00 100%)' }),
    makeEl({ backgroundImage: 'none' }),
    makeEl({ backgroundImage: '' }),
    // Duplicate should not be counted twice
    makeEl({ backgroundImage: 'linear-gradient(to right, #ff0000, #0000ff)' }),
  ];

  it('returns expected keys', () => {
    const result = extractGradients(mockStyles);
    assert.ok('gradients' in result);
    assert.ok('count' in result);
  });

  it('counts unique gradients', () => {
    const result = extractGradients(mockStyles);
    assert.equal(result.count, 3);
  });

  it('parses gradient type', () => {
    const result = extractGradients(mockStyles);
    assert.ok(result.gradients.some(g => g.type === 'linear'));
    assert.ok(result.gradients.some(g => g.type === 'radial'));
  });

  it('parses gradient stops', () => {
    const result = extractGradients(mockStyles);
    for (const g of result.gradients) {
      assert.ok(Array.isArray(g.stops));
      assert.ok(g.stops.length >= 2);
    }
  });

  it('classifies gradients', () => {
    const result = extractGradients(mockStyles);
    for (const g of result.gradients) {
      assert.ok(['subtle', 'brand', 'bold', 'complex'].includes(g.classification));
    }
  });
});

// ── extractZIndex ───────────────────────────────────────────────

describe('extractZIndex', () => {
  const mockStyles = [
    makeEl({ tag: 'header', classList: 'navbar', zIndex: '100', position: 'sticky' }),
    makeEl({ tag: 'div', classList: 'modal', zIndex: '1000', position: 'fixed' }),
    makeEl({ tag: 'div', classList: 'dropdown', zIndex: '200', position: 'absolute' }),
    makeEl({ tag: 'div', classList: 'tooltip', zIndex: '500', position: 'absolute' }),
    makeEl({ zIndex: 'auto' }),
    makeEl({ tag: 'div', zIndex: '1' }),
  ];

  it('returns expected keys', () => {
    const result = extractZIndex(mockStyles);
    assert.ok('layers' in result);
    assert.ok('allValues' in result);
    assert.ok('issues' in result);
    assert.ok('scale' in result);
  });

  it('collects sorted unique z-index values', () => {
    const result = extractZIndex(mockStyles);
    assert.ok(result.allValues.length >= 4);
    for (let i = 1; i < result.allValues.length; i++) {
      assert.ok(result.allValues[i] >= result.allValues[i - 1]);
    }
  });

  it('groups values into layers', () => {
    const result = extractZIndex(mockStyles);
    assert.ok(result.layers.length >= 1);
    assert.ok(result.layers.some(l => l.name === 'modal'));
    assert.ok(result.layers.some(l => l.name === 'dropdown'));
  });

  it('skips auto z-index values', () => {
    const result = extractZIndex(mockStyles);
    assert.ok(!result.allValues.includes(NaN));
  });
});

// ── scoreDesignSystem ───────────────────────────────────────────

describe('scoreDesignSystem', () => {
  const mockDesign = {
    colors: {
      primary: { hex: '#0066cc', rgb: { r: 0, g: 102, b: 204 }, hsl: { h: 210, s: 100, l: 40 }, count: 50 },
      secondary: null,
      accent: null,
      neutrals: [{ hex: '#333333', rgb: { r: 51, g: 51, b: 51 }, hsl: { h: 0, s: 0, l: 20 }, count: 30 }],
      backgrounds: ['#ffffff'],
      text: ['#333333'],
      all: [
        { hex: '#0066cc', count: 50 },
        { hex: '#333333', count: 30 },
        { hex: '#ffffff', count: 80 },
        { hex: '#666666', count: 20 },
        { hex: '#f5f5f5', count: 15 },
      ],
    },
    typography: {
      families: [{ name: 'Inter', count: 80, usage: 'all' }],
      scale: [
        { size: 48, weight: '700', lineHeight: '1.2', tags: ['h1'], count: 5 },
        { size: 16, weight: '400', lineHeight: '1.5', tags: ['p'], count: 60 },
      ],
      weights: [{ weight: '400', count: 60 }, { weight: '700', count: 20 }],
    },
    spacing: { base: 4, scale: [4, 8, 12, 16, 24, 32, 48, 64] },
    shadows: { values: [{ raw: '0 1px 3px rgba(0,0,0,0.1)', blur: 3, inset: false, label: 'sm' }] },
    borders: { radii: [{ value: 4, label: 'sm', count: 20 }, { value: 8, label: 'md', count: 15 }] },
    variables: { colors: { '--color-primary': '#0066cc' }, spacing: {}, typography: {} },
    accessibility: { score: 90, passCount: 45, failCount: 5, totalPairs: 50, pairs: [] },
  };

  it('returns expected keys', () => {
    const result = scoreDesignSystem(mockDesign);
    assert.ok('overall' in result);
    assert.ok('grade' in result);
    assert.ok('scores' in result);
    assert.ok('issues' in result);
    assert.ok('strengths' in result);
  });

  it('overall score is between 0 and 100', () => {
    const result = scoreDesignSystem(mockDesign);
    assert.ok(result.overall >= 0 && result.overall <= 100);
  });

  it('assigns a letter grade', () => {
    const result = scoreDesignSystem(mockDesign);
    assert.ok(['A', 'B', 'C', 'D', 'F'].includes(result.grade));
  });

  it('scores each category', () => {
    const result = scoreDesignSystem(mockDesign);
    assert.ok('colorDiscipline' in result.scores);
    assert.ok('typographyConsistency' in result.scores);
    assert.ok('spacingSystem' in result.scores);
    assert.ok('shadowConsistency' in result.scores);
    assert.ok('radiusConsistency' in result.scores);
    assert.ok('accessibility' in result.scores);
    assert.ok('tokenization' in result.scores);
  });

  it('gives good scores for a clean design', () => {
    const result = scoreDesignSystem(mockDesign);
    // This mock has tight palette, 1 font, base-4 spacing
    assert.ok(result.scores.colorDiscipline >= 80);
    assert.ok(result.scores.typographyConsistency >= 80);
    assert.ok(result.scores.spacingSystem >= 80);
  });

  it('identifies strengths', () => {
    const result = scoreDesignSystem(mockDesign);
    assert.ok(Array.isArray(result.strengths));
  });

  it('penalizes missing primary color', () => {
    const noPrimary = { ...mockDesign, colors: { ...mockDesign.colors, primary: null } };
    const result = scoreDesignSystem(noPrimary);
    assert.ok(result.issues.some(i => i.includes('primary')));
  });
});

// ── extractStackFingerprint ─────────────────────────────────────

describe('extractStackFingerprint', () => {
  it('detects Next.js from __NEXT_DATA__', () => {
    const out = extractStackFingerprint({ windowGlobals: ['__NEXT_DATA__'], scripts: [], metas: [], classNameSample: [] });
    assert.equal(out.framework, 'next');
  });

  it('detects Tailwind from utility-heavy classNames', () => {
    const out = extractStackFingerprint({
      windowGlobals: [],
      scripts: [],
      metas: [],
      classNameSample: [
        'flex items-center gap-4 text-sm text-gray-600',
        'px-4 py-2 rounded-md bg-blue-500',
        'grid grid-cols-3 md:grid-cols-4',
        'flex justify-center',
        'p-4 shadow-md',
        'mt-4 text-lg',
      ],
    });
    assert.equal(out.css.layer, 'tailwind');
    assert.ok(out.css.tailwind.utilities.length > 0);
  });

  it('returns unknown when nothing matches', () => {
    const out = extractStackFingerprint({ windowGlobals: [], scripts: [], metas: [], classNameSample: ['foo', 'bar'] });
    assert.equal(out.framework, 'unknown');
    assert.equal(out.css.layer, 'unknown');
  });
});

// ── extractCssHealth ────────────────────────────────────────────

describe('extractCssHealth', () => {
  const payload = [{
    url: 'https://x.com/a.css',
    text: '.a{color:red}.a{color:red}.b{color:blue !important}.c-webkit-foo{color:x}@keyframes fade{0%{opacity:0}100%{opacity:1}\n}',
    totalBytes: 1000,
    ranges: [{ start: 0, end: 400 }], // 60% unused
  }];

  it('counts !important', () => {
    const r = extractCssHealth(payload);
    assert.equal(r.importantCount, 1);
  });

  it('counts duplicate declarations', () => {
    const r = extractCssHealth(payload);
    assert.ok(r.duplicates >= 1);
  });

  it('reports unused bytes', () => {
    const r = extractCssHealth(payload);
    assert.equal(r.unusedBytes, 600);
    assert.equal(r.usedBytes, 400);
  });

  it('catalogs keyframes', () => {
    const r = extractCssHealth(payload);
    assert.ok(r.keyframes.some(k => k.name === 'fade'));
  });
});

// ── remediateFailingPairs ───────────────────────────────────────

describe('remediateFailingPairs', () => {
  it('suggests a palette color that passes AA', () => {
    const failing = [{ fg: '#777777', bg: '#ffffff', ratio: 3.5, rule: 'AA-normal' }];
    const palette = ['#000000', '#222222', '#555555', '#cccccc'];
    const out = remediateFailingPairs(failing, palette);
    assert.equal(out.length, 1);
    assert.ok(out[0].suggestion);
    assert.ok(out[0].suggestion.newRatio >= 4.5);
  });

  it('returns null suggestion when no palette color passes', () => {
    const failing = [{ fg: '#eee', bg: '#fff', ratio: 1.1, rule: 'AA-normal' }];
    const palette = ['#dedede'];
    const out = remediateFailingPairs(failing, palette);
    assert.equal(out[0].suggestion, null);
  });
});

// ── extractSemanticRegions ──────────────────────────────────────

describe('extractSemanticRegions', () => {
  it('labels header as nav', () => {
    const out = extractSemanticRegions([{ tag: 'header', role: '', className: '', id: '', text: 'Home About', headings: [], buttonCount: 3, cardCount: 0, bounds: { x: 0, y: 0, w: 1280, h: 80 } }]);
    assert.equal(out[0].role, 'nav');
  });

  it('labels section with CTA + heading as hero', () => {
    const out = extractSemanticRegions([{ tag: 'section', role: '', className: 'hero', id: '', text: 'Welcome', headings: ['Build better'], buttonCount: 2, cardCount: 0, bounds: { x: 0, y: 80, w: 1280, h: 600 } }]);
    assert.equal(out[0].role, 'hero');
  });

  it('labels pricing based on cards + keyword', () => {
    const out = extractSemanticRegions([{ tag: 'section', role: '', className: '', id: '', text: 'Basic $9/mo Pro $29/mo Team $99/mo', headings: ['Pricing'], buttonCount: 3, cardCount: 3, bounds: { x: 0, y: 0, w: 1280, h: 400 } }]);
    assert.equal(out[0].role, 'pricing');
  });
});

// ── clusterComponents ───────────────────────────────────────────

describe('clusterComponents', () => {
  it('collapses identical instances into one entry', () => {
    const els = Array.from({ length: 5 }, () => ({ kind: 'button', structuralHash: 'button>span', styleVector: [16, 8, 0, 0], css: { bg: '#f00' } }));
    const out = clusterComponents(els);
    assert.equal(out.length, 1);
    assert.equal(out[0].instanceCount, 5);
  });

  it('separates variants with different style vectors', () => {
    const els = [
      { kind: 'button', structuralHash: 'button>span', styleVector: [16, 8, 0, 0], css: { bg: '#f00' } },
      { kind: 'button', structuralHash: 'button>span', styleVector: [16, 8, 0, 0], css: { bg: '#f00' } },
      { kind: 'button', structuralHash: 'button>span', styleVector: [0, 0, 16, 8], css: { bg: '#0f0' } },
    ];
    const out = clusterComponents(els);
    assert.equal(out.length, 1);
    assert.equal(out[0].variants.length, 2);
  });
});

// ── Typography system (v13.2) ───────────────────────────────────

describe('typography system', () => {
  const typeEl = (o) => makeEl({ width: 700, ...o });
  const styles = [
    typeEl({ tag: 'h1', fontSize: '48px', fontWeight: '700', letterSpacing: '-0.02em' }),
    typeEl({ tag: 'h2', fontSize: '32px', fontWeight: '700' }),
    typeEl({ tag: 'h3', fontSize: '24px', fontWeight: '600' }),
    typeEl({ tag: 'p', fontSize: '16px', width: 640 }),
    typeEl({ tag: 'p', fontSize: '16px', width: 640 }),
    typeEl({ tag: 'span', fontSize: '13px' }),
  ];

  it('infers a modular ratio from a clean scale', () => {
    const ratio = inferTypeRatio([16, 20, 25, 31, 39]);
    assert.equal(ratio.name, 'major third');
    assert.equal(ratio.value, 1.25);
    assert.ok(ratio.fit > 0.8);
    assert.equal(ratio.coverage, 1);
    assert.equal(ratio.anchor, 16);
  });

  it('refuses to name a ratio for an irregular scale', () => {
    const ratio = inferTypeRatio([16, 17, 18, 19, 20, 44]);
    assert.equal(ratio.value, null);
    assert.equal(ratio.name, 'irregular');
    assert.equal(ratio.coverage, 0);
  });

  it('does not let a small ratio explain everything with big powers', () => {
    // 1.067^4 lands within 3% of a perfect fourth — without a power penalty
    // the minor second wins every scale it is offered.
    const ratio = inferTypeRatio([16, 21.3, 28.4, 37.9]);
    assert.equal(ratio.name, 'perfect fourth');
  });

  it('parses clamp() into min/max px', () => {
    const f = parseFluidValue('clamp(2rem, 4vw + 1rem, 4rem)');
    assert.equal(f.kind, 'clamp');
    assert.equal(f.minPx, 32);
    assert.equal(f.maxPx, 64);
    assert.equal(f.scales, true);
  });

  it('flags a clamp whose middle term never scales', () => {
    const f = parseFluidValue('clamp(1rem, 2rem, 3rem)');
    assert.equal(f.scales, false);
  });

  it('parses bare viewport units', () => {
    const f = parseFluidValue('5vw', { maxViewport: 1440 });
    assert.equal(f.kind, 'viewport');
    assert.equal(f.maxPx, 72);
  });

  it('returns null for a static value', () => {
    assert.equal(parseFluidValue('18px'), null);
  });

  it('reserves display for the largest step and orders the rest', () => {
    const t = extractTypography([
      typeEl({ tag: 'div', fontSize: '64px' }),
      typeEl({ tag: 'div', fontSize: '40px' }),
      typeEl({ tag: 'h1', fontSize: '48px' }),
      typeEl({ tag: 'p', fontSize: '16px' }),
    ]);
    assert.deepEqual(t.roleScale.map(s => [s.role, s.size]), [
      ['display', 64],
      ['h1', 48],
      ['title-1', 40],
      ['body', 16],
    ]);
  });

  it('measures the reading column, not the narrowest paragraph', () => {
    const t = extractTypography([
      typeEl({ tag: 'p', fontSize: '16px', width: 640 }),
      typeEl({ tag: 'p', fontSize: '16px', width: 640 }),
      ...Array.from({ length: 20 }, () => typeEl({ tag: 'p', fontSize: '16px', width: 180 })),
    ]);
    assert.equal(t.system.measure.charsPerLine, 80);
  });

  it('names every step in the scale', () => {
    const t = extractTypography(styles);
    const roles = t.roleScale.map(s => s.role);
    assert.deepEqual(roles.slice(0, 3), ['h1', 'h2', 'h3']);
    assert.ok(roles.includes('body'));
    assert.ok(roles.every(Boolean));
  });

  it('measures line length for body text', () => {
    const t = extractTypography(styles);
    assert.equal(t.system.measure.charsPerLine, 80);
    assert.equal(t.system.measure.verdict, 'wide');
  });

  it('reports no measure when there is no body copy', () => {
    const t = extractTypography([makeEl({ tag: 'div', width: 400 })]);
    assert.equal(t.system.measure, null);
  });

  it('folds fluid declarations into the system summary', () => {
    const t = extractTypography(styles, {
      fluidValues: [
        { property: 'font-size', value: 'clamp(2rem, 4vw, 4rem)', selector: 'h1' },
        { property: 'font-size', value: 'clamp(1rem, 1rem, 1.2rem)', selector: 'p' },
        { property: 'gap', value: 'clamp(1rem, 2vw, 2rem)', selector: '.grid' },
      ],
    });
    assert.equal(t.system.fluid.isFluid, true);
    assert.equal(t.system.fluid.count, 2);
    assert.equal(t.system.fluid.inertCount, 1);
    assert.equal(t.system.fluid.range.maxPx, 64);
  });

  it('builds line-height and tracking ladders', () => {
    const t = extractTypography(styles);
    assert.ok(t.lineHeights.length > 0);
    assert.deepEqual(t.tracking.map(x => x.value), ['-0.02em']);
  });
});

// ── Layout system (v13.2) ───────────────────────────────────────

describe('layout system', () => {
  const box = (o) => makeEl({ width: 0, height: 0, area: 0, ...o });
  const styles = [
    box({ tag: 'section', width: 1440, height: 600, area: 864000, marginLeft: 'auto', marginRight: 'auto', paddingTop: '96px', paddingBottom: '96px' }),
    box({ tag: 'section', width: 1440, height: 500, area: 720000, marginLeft: 'auto', marginRight: 'auto', paddingTop: '96px', paddingBottom: '128px' }),
    box({ tag: 'div', width: 1200, height: 400, area: 480000, maxWidth: '1200px', paddingLeft: '24px', paddingRight: '24px' }),
    box({ tag: 'div', width: 1200, height: 300, area: 360000, maxWidth: '1200px', paddingLeft: '24px' }),
    box({ tag: 'div', display: 'grid', width: 1200, height: 300, area: 360000, gridTemplateColumns: 'repeat(12, 1fr)', gap: '32px' }),
    box({ tag: 'div', display: 'grid', width: 380, height: 200, area: 76000, gridTemplateColumns: '1fr 1fr', gap: '16px' }),
  ];

  it('finds the content width and gutter', () => {
    const { system } = extractLayout(styles);
    assert.equal(system.container.contentWidth, 1200);
    assert.equal(system.container.gutter, 24);
    assert.equal(system.density, 0.02);
  });

  it('picks the column system by area, not by count', () => {
    const { system } = extractLayout(styles);
    assert.equal(system.columns.dominant, 12);
    assert.equal(system.columns.canonical, true);
  });

  it('reads section rhythm from full-bleed sections', () => {
    const { system } = extractLayout(styles);
    assert.equal(system.rhythm.section, 96);
    assert.deepEqual(system.rhythm.ladder, [96, 128]);
  });

  it('sorts the gap scale numerically', () => {
    const { system } = extractLayout([
      box({ tag: 'div', display: 'flex', width: 400, height: 100, area: 40000, gap: '4px' }),
      box({ tag: 'div', display: 'flex', width: 400, height: 100, area: 40000, gap: '10px' }),
      box({ tag: 'div', display: 'flex', width: 400, height: 100, area: 40000, gap: '32px' }),
    ]);
    assert.deepEqual(system.gapScale, [4, 10, 32]);
  });

  it('collects fluid layout declarations', () => {
    const { system } = extractLayout(styles, {
      fluidValues: [
        { property: 'max-width', value: 'clamp(320px, 90vw, 1200px)', selector: '.container' },
        { property: 'font-size', value: 'clamp(1rem, 2vw, 2rem)', selector: 'h1' },
      ],
    });
    assert.equal(system.fluid.count, 1);
    assert.equal(system.fluid.declarations[0].property, 'max-width');
  });

  it('reports a full-bleed shell instead of promoting a card', () => {
    const { system } = extractLayout([
      box({ tag: 'div', width: 1440, height: 900, area: 1296000, marginLeft: 'auto', marginRight: 'auto', paddingLeft: '24px' }),
      box({ tag: 'div', width: 440, height: 300, area: 132000, maxWidth: '440px' }),
    ], { viewportWidth: 1440 });
    assert.equal(system.container.fullBleed, true);
    assert.equal(system.container.contentWidth, 1440);
    assert.equal(system.container.innerWidth, 440);
    assert.deepEqual(system.container.ladder, [440, 1440]);
  });

  it('prefers a constrained column when one governs real area', () => {
    const { system } = extractLayout([
      box({ tag: 'div', width: 1440, height: 200, area: 288000, marginLeft: 'auto', marginRight: 'auto' }),
      box({ tag: 'div', width: 1200, height: 800, area: 960000, maxWidth: '1200px', paddingLeft: '32px' }),
      box({ tag: 'div', width: 1200, height: 600, area: 720000, maxWidth: '1200px', paddingLeft: '32px' }),
    ], { viewportWidth: 1440 });
    assert.equal(system.container.fullBleed, false);
    assert.equal(system.container.contentWidth, 1200);
    assert.equal(system.container.gutter, 32);
  });

  it('survives a page with no containers', () => {
    const { system } = extractLayout([box({ tag: 'div' })]);
    assert.equal(system.container, null);
    assert.equal(system.rhythm, null);
    assert.equal(system.density, null);
  });
});

// ── Color system (v13.2) ────────────────────────────────────────

describe('color ramps and pairs', () => {
  it('builds a perceptually even ramp that keeps the source colour', () => {
    const ramp = buildRamp('#4f46e5');
    assert.equal(ramp.base, '#4f46e5');
    assert.equal(ramp.steps[ramp.anchor], '#4f46e5');
    assert.equal(Object.keys(ramp.steps).length, 11);
    // Light steps really are lighter than dark ones.
    const lum = (hex) => parseInt(hex.slice(1, 3), 16) + parseInt(hex.slice(3, 5), 16) + parseInt(hex.slice(5, 7), 16);
    assert.ok(lum(ramp.steps['50']) > lum(ramp.steps['500']));
    assert.ok(lum(ramp.steps['500']) > lum(ramp.steps['950']));
  });

  it('returns null for an unparseable colour', () => {
    assert.equal(buildRamp('not-a-colour'), null);
  });

  it('measures contrast', () => {
    assert.equal(contrast('#ffffff', '#000000'), 21);
  });

  it('picks the foreground that actually passes on each surface', () => {
    const pairs = buildSemanticPairs({
      backgrounds: ['#ffffff', '#f8fafc'],
      text: ['#0f172a'],
      primary: { hex: '#4f46e5' },
    });
    const action = pairs.find(p => p.role === 'action.primary');
    assert.equal(action.foreground, '#ffffff');
    assert.equal(action.level, 'AA');
    assert.equal(action.unresolvable, false);
  });

  it('falls back outside the palette when no site colour passes', () => {
    const pairs = buildSemanticPairs({ backgrounds: ['#808080'], text: ['#7a7a7a'] });
    assert.equal(pairs[0].fromPalette, false);
    assert.equal(pairs[0].foreground, '#000000');
    assert.equal(pairs[0].unresolvable, false);
  });

  it('prefers a passing colour the site already ships', () => {
    const pairs = buildSemanticPairs({ backgrounds: ['#ffffff'], text: ['#0f172a'] });
    assert.equal(pairs[0].foreground, '#0f172a');
    assert.equal(pairs[0].fromPalette, true);
  });

  it('ranks colours by painted area, not by declaration count', () => {
    const styles = [
      makeEl({ backgroundColor: 'rgb(255, 255, 255)', area: 900000 }),
      ...Array.from({ length: 40 }, () => makeEl({ backgroundColor: 'rgb(20, 20, 20)', area: 400 })),
    ];
    const colors = extractColors(styles);
    assert.equal(colors.dominance[0].hex, '#ffffff');
    assert.ok(colors.dominance[0].areaShare > 0.9);
  });

  it('attaches ramps for the named roles', () => {
    const colors = extractColors([
      makeEl({ tag: 'button', backgroundColor: 'rgb(79, 70, 229)', area: 5000 }),
      makeEl({ backgroundColor: 'rgb(255, 255, 255)', area: 900000 }),
    ]);
    assert.ok(colors.ramps.primary);
    assert.equal(colors.ramps.primary.base, '#4f46e5');
    assert.ok(colors.pairs.length > 0);
  });
});

describe('extractSpacing: weighted by use', () => {
  // Stripe-shaped: a few 1px hairlines and one-off values, but most spacing
  // on a 4px grid with 8px multiples dominating.
  const els = [];
  const add = (n, css) => { for (let i = 0; i < n; i++) els.push(makeEl(css)); };
  add(40, { paddingTop: '8px', paddingBottom: '8px', paddingLeft: '16px', paddingRight: '16px' });
  add(30, { marginBottom: '24px', gap: '16px' });
  add(20, { paddingTop: '32px', paddingBottom: '32px' });
  add(10, { marginTop: '48px', gap: '12px' });
  add(6, { paddingTop: '4px', paddingLeft: '4px' });
  add(3, { marginTop: '1px', marginBottom: '1px' });
  add(1, { marginTop: '366px', paddingTop: '13px', paddingLeft: '2px' });

  it('finds the grid people actually use, not the hairlines', () => {
    const s = extractSpacing(els);
    assert.ok([4, 8].includes(s.base), `base ${s.base}`);
    assert.ok(!s.scale.includes(1), `scale ${s.scale}`);
    for (const v of [8, 16, 24, 32]) assert.ok(s.scale.includes(v), `${v} missing from ${s.scale}`);
    assert.ok(!s.scale.includes(366), 'one-off values stay out of the scale');
  });
});
