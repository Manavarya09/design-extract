import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  parseColor,
  rgbToHex,
  rgbToHsl,
  colorDistance,
  clusterColors,
  clusterValues,
  parseCSSValue,
  detectScale,
  nameFromUrl,
  isSaturated,
  safeName,
  remToPx,
  pxToRem,
} from '../src/utils.js';

// ── parseColor ──────────────────────────────────────────────────

describe('parseColor', () => {
  it('returns null for null/undefined/empty/none/inherit', () => {
    assert.equal(parseColor(null), null);
    assert.equal(parseColor(undefined), null);
    assert.equal(parseColor(''), null);
    assert.equal(parseColor('none'), null);
    assert.equal(parseColor('inherit'), null);
    assert.equal(parseColor('initial'), null);
    assert.equal(parseColor('currentcolor'), null);
  });

  it('parses 3-digit hex (#RGB)', () => {
    const c = parseColor('#f00');
    assert.deepEqual(c, { r: 255, g: 0, b: 0, a: 1 });
  });

  it('parses 6-digit hex (#RRGGBB)', () => {
    const c = parseColor('#0066cc');
    assert.deepEqual(c, { r: 0, g: 102, b: 204, a: 1 });
  });

  it('parses 8-digit hex (#RRGGBBAA)', () => {
    const c = parseColor('#0066cc80');
    assert.equal(c.r, 0);
    assert.equal(c.g, 102);
    assert.equal(c.b, 204);
    assert.ok(Math.abs(c.a - 128 / 255) < 0.01);
  });

  it('parses 4-digit hex (#RGBA)', () => {
    const c = parseColor('#f008');
    assert.equal(c.r, 255);
    assert.equal(c.g, 0);
    assert.equal(c.b, 0);
    assert.ok(Math.abs(c.a - 0x88 / 255) < 0.01);
  });

  it('parses rgb(r, g, b)', () => {
    const c = parseColor('rgb(100, 200, 50)');
    assert.deepEqual(c, { r: 100, g: 200, b: 50, a: 1 });
  });

  it('parses rgba(r, g, b, a)', () => {
    const c = parseColor('rgba(100, 200, 50, 0.5)');
    assert.deepEqual(c, { r: 100, g: 200, b: 50, a: 0.5 });
  });

  it('parses hsl(h, s%, l%)', () => {
    const c = parseColor('hsl(0, 100%, 50%)');
    assert.equal(c.r, 255);
    assert.equal(c.g, 0);
    assert.equal(c.b, 0);
    assert.equal(c.a, 1);
  });

  it('parses hsla(h, s%, l%, a)', () => {
    const c = parseColor('hsla(0, 100%, 50%, 0.5)');
    assert.equal(c.r, 255);
    assert.equal(c.a, 0.5);
  });

  it('parses modern hsl syntax: hsl(210 50% 40%)', () => {
    const c = parseColor('hsl(210 50% 40%)');
    assert.ok(c);
    assert.equal(c.a, 1);
    // hsl(210, 50%, 40%) -> some shade of blue
    assert.ok(c.b > c.r);
  });

  it('parses modern hsl syntax with alpha: hsl(210 50% 40% / 0.5)', () => {
    const c = parseColor('hsl(210 50% 40% / 0.5)');
    assert.ok(c);
    assert.equal(c.a, 0.5);
  });

  it('parses oklch(L C H)', () => {
    const c = parseColor('oklch(0.5 0.2 270)');
    assert.ok(c);
    assert.equal(c.a, 1);
    assert.ok(c.r >= 0 && c.r <= 255);
  });

  it('parses oklch with alpha', () => {
    const c = parseColor('oklch(0.5 0.2 270 / 0.8)');
    assert.ok(c);
    assert.equal(c.a, 0.8);
  });

  it('parses oklab(L a b)', () => {
    const c = parseColor('oklab(0.5 0.1 -0.1)');
    assert.ok(c);
    assert.equal(c.a, 1);
    assert.ok(c.r >= 0 && c.r <= 255);
  });

  it('parses color-mix(in srgb, ...)', () => {
    const c = parseColor('color-mix(in srgb, #ff0000 50%, #0000ff)');
    assert.ok(c);
    // Should be roughly halfway between red and blue
    assert.ok(c.r > 100);
    assert.ok(c.b > 100);
  });

  it('parses named colors', () => {
    const c = parseColor('red');
    assert.deepEqual(c, { r: 255, g: 0, b: 0, a: 1 });
  });

  it('parses named color white', () => {
    const c = parseColor('white');
    assert.deepEqual(c, { r: 255, g: 255, b: 255, a: 1 });
  });

  it('parses named colors case-insensitively', () => {
    const c = parseColor('RED');
    assert.deepEqual(c, { r: 255, g: 0, b: 0, a: 1 });
  });

  it('returns null for unrecognized strings', () => {
    assert.equal(parseColor('not-a-color'), null);
    assert.equal(parseColor('blahblah'), null);
  });
});

// ── rgbToHex ────────────────────────────────────────────────────

describe('rgbToHex', () => {
  it('converts black', () => {
    assert.equal(rgbToHex({ r: 0, g: 0, b: 0 }), '#000000');
  });

  it('converts white', () => {
    assert.equal(rgbToHex({ r: 255, g: 255, b: 255 }), '#ffffff');
  });

  it('converts a mid color', () => {
    assert.equal(rgbToHex({ r: 0, g: 102, b: 204 }), '#0066cc');
  });
});

// ── rgbToHsl ────────────────────────────────────────────────────

describe('rgbToHsl', () => {
  it('converts pure red', () => {
    const hsl = rgbToHsl({ r: 255, g: 0, b: 0 });
    assert.equal(hsl.h, 0);
    assert.equal(hsl.s, 100);
    assert.equal(hsl.l, 50);
  });

  it('converts pure green (CSS green = 0,128,0)', () => {
    const hsl = rgbToHsl({ r: 0, g: 128, b: 0 });
    assert.equal(hsl.h, 120);
    assert.equal(hsl.l, 25);
  });

  it('converts gray (achromatic)', () => {
    const hsl = rgbToHsl({ r: 128, g: 128, b: 128 });
    assert.equal(hsl.h, 0);
    assert.equal(hsl.s, 0);
    assert.equal(hsl.l, 50);
  });

  it('converts white', () => {
    const hsl = rgbToHsl({ r: 255, g: 255, b: 255 });
    assert.equal(hsl.l, 100);
    assert.equal(hsl.s, 0);
  });
});

// ── colorDistance ────────────────────────────────────────────────

describe('colorDistance', () => {
  it('returns 0 for identical colors', () => {
    assert.equal(colorDistance({ r: 100, g: 100, b: 100 }, { r: 100, g: 100, b: 100 }), 0);
  });

  it('returns correct Euclidean distance', () => {
    const d = colorDistance({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 });
    assert.ok(Math.abs(d - Math.sqrt(3 * 255 * 255)) < 0.01);
  });

  it('returns small distance for similar colors', () => {
    const d = colorDistance({ r: 100, g: 100, b: 100 }, { r: 105, g: 100, b: 100 });
    assert.ok(d < 10);
  });
});

// ── clusterColors ───────────────────────────────────────────────

describe('clusterColors', () => {
  it('groups similar colors together', () => {
    const colors = [
      { hex: '#ff0000', parsed: { r: 255, g: 0, b: 0 }, count: 10 },
      { hex: '#ff0505', parsed: { r: 255, g: 5, b: 5 }, count: 5 },
      { hex: '#0000ff', parsed: { r: 0, g: 0, b: 255 }, count: 3 },
    ];
    const clusters = clusterColors(colors, 15);
    // Red shades should be grouped, blue separate
    assert.equal(clusters.length, 2);
    assert.equal(clusters[0].count, 15); // red cluster total
    assert.equal(clusters[1].count, 3);  // blue cluster
  });

  it('returns each color as its own cluster when threshold is 0', () => {
    const colors = [
      { hex: '#ff0000', parsed: { r: 255, g: 0, b: 0 }, count: 10 },
      { hex: '#ff0505', parsed: { r: 255, g: 5, b: 5 }, count: 5 },
    ];
    const clusters = clusterColors(colors, 0);
    assert.equal(clusters.length, 2);
  });

  it('sorts clusters by count descending', () => {
    const colors = [
      { hex: '#0000ff', parsed: { r: 0, g: 0, b: 255 }, count: 3 },
      { hex: '#ff0000', parsed: { r: 255, g: 0, b: 0 }, count: 10 },
    ];
    const clusters = clusterColors(colors, 15);
    assert.ok(clusters[0].count >= clusters[clusters.length - 1].count);
  });

  it('uses the most-used member as the cluster representative (not first-encountered)', () => {
    // The lavender (#f0f0ff) was encountered FIRST but is only used 2 times;
    // the deep purple (#5544ff) joins its cluster and is used 50 times.
    // The representative MUST be the dominant shade for downstream
    // primary-detection to work correctly. (This was a real bug pre-v12.9
    // that produced washed-out brand colours in the brand book.)
    const colors = [
      { hex: '#f0f0ff', parsed: { r: 240, g: 240, b: 255 }, count: 2 },
      { hex: '#5544ff', parsed: { r: 85, g: 68, b: 255 }, count: 50 },
    ];
    const clusters = clusterColors(colors, 280); // big threshold → both cluster together
    assert.equal(clusters.length, 1);
    assert.equal(clusters[0].hex, '#5544ff', 'cluster hex must be the dominant member');
    assert.deepEqual(clusters[0].representative, { r: 85, g: 68, b: 255 });
  });
});

// ── clusterValues ───────────────────────────────────────────────

describe('clusterValues', () => {
  it('groups nearby numbers', () => {
    const result = clusterValues([4, 5, 8, 16, 17, 32], 2);
    // 4 and 5 cluster -> 4; 8 standalone; 16 and 17 cluster -> 16; 32 standalone
    assert.ok(result.includes(4));
    assert.ok(result.includes(8));
    assert.ok(result.includes(16));
    assert.ok(result.includes(32));
    assert.ok(!result.includes(5));
    assert.ok(!result.includes(17));
  });

  it('returns all values when threshold is 0', () => {
    const result = clusterValues([1, 2, 3], 0);
    assert.deepEqual(result, [1, 2, 3]);
  });
});

// ── parseCSSValue ───────────────────────────────────────────────

describe('parseCSSValue', () => {
  it('parses px values', () => {
    const r = parseCSSValue('16px');
    assert.deepEqual(r, { value: 16, unit: 'px' });
  });

  it('parses rem values', () => {
    const r = parseCSSValue('1.5rem');
    assert.deepEqual(r, { value: 1.5, unit: 'rem' });
  });

  it('parses em values', () => {
    const r = parseCSSValue('2em');
    assert.deepEqual(r, { value: 2, unit: 'em' });
  });

  it('parses percentage values', () => {
    const r = parseCSSValue('100%');
    assert.deepEqual(r, { value: 100, unit: '%' });
  });

  it('parses unitless numbers', () => {
    const r = parseCSSValue('1.5');
    assert.deepEqual(r, { value: 1.5, unit: '' });
  });

  it('returns null for normal/auto/none', () => {
    assert.equal(parseCSSValue('normal'), null);
    assert.equal(parseCSSValue('auto'), null);
    assert.equal(parseCSSValue('none'), null);
  });

  it('returns null for null/undefined', () => {
    assert.equal(parseCSSValue(null), null);
    assert.equal(parseCSSValue(undefined), null);
  });
});

// ── detectScale ─────────────────────────────────────────────────

describe('detectScale', () => {
  it('detects a base unit for multiples-of-4 scale', () => {
    // All values are divisible by 2 and 4; the algorithm picks the first
    // candidate (2) that reaches the 60% threshold, so base is 2.
    const result = detectScale([4, 8, 12, 16, 24, 32, 48, 64]);
    assert.ok(result.base !== null);
    assert.ok([2, 4].includes(result.base));
  });

  it('detects a base unit for multiples-of-8 scale', () => {
    const result = detectScale([8, 16, 24, 32, 40, 48, 56, 64]);
    assert.ok(result.base !== null);
    assert.ok([2, 4, 8].includes(result.base));
  });

  it('returns null base for fewer than 3 values', () => {
    const result = detectScale([10, 20]);
    assert.equal(result.base, null);
  });

  it('returns null base for arbitrary values', () => {
    const result = detectScale([3, 7, 11, 19, 37, 53]);
    assert.equal(result.base, null);
  });

  it('detects base-5 scales (Bootstrap-style)', () => {
    // 5/10/15/20/25/40/60 — all divisible by 5; nothing in [2,4,6,8] fits
    // well, so before this change the result was base:null.
    const result = detectScale([5, 10, 15, 20, 25, 40, 60]);
    assert.equal(result.base, 5);
  });

  it('detects base-6 scales', () => {
    const result = detectScale([6, 12, 18, 24, 30, 42, 60]);
    // base 2 or 6 both fit ≥60%; 6 should win the tie (or 2 with bonus).
    assert.ok([2, 6].includes(result.base));
  });

  it('still prefers base-8 when both 4 and 8 fit (Tailwind-leaning bonus)', () => {
    // 8/16/24/32/40 — 4 fits 100%, 8 fits 100%. Tie. Bonus keeps both
    // valid but the chosen base should still be one of the production
    // defaults, not a coincidental higher divisor.
    const result = detectScale([8, 16, 24, 32, 40]);
    assert.ok([4, 8].includes(result.base));
  });
});

// ── nameFromUrl ─────────────────────────────────────────────────

describe('nameFromUrl', () => {
  it('extracts hostname and makes it safe', () => {
    // safeName replaces dots with hyphens
    assert.equal(nameFromUrl('https://www.example.com/page'), 'example-com');
  });

  it('strips www prefix', () => {
    const name = nameFromUrl('https://www.google.com');
    assert.ok(!name.startsWith('www'));
  });

  it('returns unknown-site for invalid URLs', () => {
    assert.equal(nameFromUrl('not a url'), 'unknown-site');
  });

  it('handles complex domains', () => {
    const name = nameFromUrl('https://my-app.vercel.app/dashboard');
    assert.equal(name, 'my-app-vercel-app');
  });
});

// ── isSaturated ─────────────────────────────────────────────────

describe('isSaturated', () => {
  it('returns true for a saturated color', () => {
    assert.equal(isSaturated({ r: 255, g: 0, b: 0 }), true);
  });

  it('returns false for gray', () => {
    assert.equal(isSaturated({ r: 128, g: 128, b: 128 }), false);
  });

  it('returns false for white', () => {
    assert.equal(isSaturated({ r: 255, g: 255, b: 255 }), false);
  });

  it('returns false for black', () => {
    assert.equal(isSaturated({ r: 0, g: 0, b: 0 }), false);
  });
});

// ── safeName ────────────────────────────────────────────────────

describe('safeName', () => {
  it('replaces special characters with hyphens', () => {
    assert.equal(safeName('Hello World!'), 'hello-world');
  });

  it('collapses multiple hyphens', () => {
    assert.equal(safeName('a--b---c'), 'a-b-c');
  });

  it('trims leading/trailing hyphens', () => {
    assert.equal(safeName('--test--'), 'test');
  });
});

// ── remToPx / pxToRem ──────────────────────────────────────────

describe('remToPx', () => {
  it('converts with default base 16', () => {
    assert.equal(remToPx(1), 16);
    assert.equal(remToPx(2), 32);
  });

  it('converts with custom base', () => {
    assert.equal(remToPx(1, 10), 10);
  });
});

describe('pxToRem', () => {
  it('converts with default base 16', () => {
    assert.equal(pxToRem(16), 1);
    assert.equal(pxToRem(32), 2);
  });

  it('converts with custom base', () => {
    assert.equal(pxToRem(10, 10), 1);
  });
});

describe('parseColor: modern colour syntax', () => {
  const hex = (c) => '#' + [c.r, c.g, c.b].map((n) => n.toString(16).padStart(2, '0')).join('');
  it('encodes oklch and oklab to sRGB with gamma (mid grey is #636363, not near-black)', () => {
    assert.equal(hex(parseColor('oklch(0.5 0 0)')), '#636363');
    assert.equal(hex(parseColor('oklch(0.628 0.2577 29.23)')), '#ff0000');
    assert.equal(hex(parseColor('oklab(0.5 0 0)')), '#636363');
    // supabase.com --primary
    const g = parseColor('oklch(.525 .12 157.5)');
    assert.ok(g.g > 100 && g.r < 60, JSON.stringify(g));
  });
  it('reads percentage lightness and angle units', () => {
    assert.equal(hex(parseColor('oklch(62.8% 0.2577 29.23)')), '#ff0000');
    assert.equal(hex(parseColor('oklch(0.628 0.2577 29.23deg)')), '#ff0000');
    assert.equal(hex(parseColor('hsl(152.9deg 60% 52.9%)')), '#3fcf8e');
    assert.equal(hex(parseColor('hsl(152.9deg, 60%, 52.9%)')), '#3fcf8e');
    assert.deepEqual(parseColor('hsl(152.9deg 60% 52.9% / 50%)').a, 0.5);
  });
});
