import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { oklchToSrgb, oklabToSrgb, oklchLikeToHex, parseOklchOrOklab, rgbToHex } from '../src/utils/color-gamut.js';
import { extractWideGamut } from '../src/extractors/wide-gamut.js';
import { extractTokenSources } from '../src/extractors/token-sources.js';

describe('color-gamut', () => {
  it('converts oklch(1 0 0) to white', () => {
    const hex = oklchLikeToHex('oklch(1 0 0)');
    assert.equal(hex, '#ffffff');
  });

  it('converts oklch(0 0 0) to black', () => {
    const hex = oklchLikeToHex('oklch(0 0 0)');
    assert.equal(hex, '#000000');
  });

  it('converts a mid-chroma oklch to approximate sRGB', () => {
    // oklch(62.8% 0.258 29.23) ≈ red (#ff0000) region
    const hex = oklchLikeToHex('oklch(62.8% 0.258 29.23)');
    assert.ok(/^#[0-9a-f]{6}$/.test(hex));
    // Red channel should dominate
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    assert.ok(r > g, `expected r>g, got ${hex}`);
    assert.ok(r > b, `expected r>b, got ${hex}`);
  });

  it('parses oklab values with percentages', () => {
    const p = parseOklchOrOklab('oklab(62.8% 0.1 -0.1)');
    assert.equal(p.type, 'oklab');
    assert.ok(Math.abs(p.L - 0.628) < 1e-6);
  });

  it('rgbToHex clamps and formats correctly', () => {
    assert.equal(rgbToHex(1, 0, 0), '#ff0000');
    assert.equal(rgbToHex(0, 1, 0), '#00ff00');
    assert.equal(rgbToHex(1.5, -0.5, 0.5), '#ff0080');
  });
});

describe('extractWideGamut', () => {
  it('returns zeros for empty input', () => {
    const r = extractWideGamut([]);
    assert.equal(r.totalCount, 0);
    assert.equal(r.oklch.count, 0);
  });

  it('buckets colors by type and emits hex for oklch samples', () => {
    const r = extractWideGamut([
      { raw: 'oklch(62.8% 0.258 29.23)', type: 'oklch', property: 'color', selector: '.btn' },
      { raw: 'color-mix(in oklab, red, blue)', type: 'color-mix', property: 'background', selector: '.x' },
      { raw: 'light-dark(white, black)', type: 'light-dark', property: 'color', selector: '.y' },
      { raw: 'color(display-p3 1 0 0)', type: 'display-p3', property: 'background', selector: '.p3' },
    ]);
    assert.equal(r.oklch.count, 1);
    assert.ok(r.oklch.samples[0].value?.startsWith('#'));
    assert.equal(r.colorMix.count, 1);
    assert.equal(r.lightDark.count, 1);
    assert.equal(r.displayP3.count, 1);
    assert.equal(r.totalCount, 4);
  });
});

describe('extractTokenSources', () => {
  it('returns an array of token→sourceUrl entries based on first matching element', () => {
    const design = {
      colors: { primary: { hex: '#0072f5' }, text: ['#111111'] },
      typography: { families: [{ name: 'Geist' }] },
      spacing: { base: 8 },
      borders: { radii: [{ value: '8px' }] },
    };
    const styles = [
      { color: 'rgb(0, 114, 245)', fontFamily: '"Geist", sans-serif', paddingTop: '8px', borderRadius: '8px', sources: [{ url: 'https://cdn.example/app.css', mediaText: '' }] },
      { color: 'rgb(17, 17, 17)', sources: [{ url: 'https://cdn.example/text.css', mediaText: '' }] },
    ];
    const out = extractTokenSources(design, styles);
    const primary = out.find(t => t.token === 'color.primary');
    assert.equal(primary.sourceUrl, 'https://cdn.example/app.css');
    const text = out.find(t => t.token === 'color.text');
    assert.equal(text.sourceUrl, 'https://cdn.example/text.css');
    const font = out.find(t => t.token === 'font.body');
    assert.equal(font.sourceUrl, 'https://cdn.example/app.css');
    const spacing = out.find(t => t.token === 'spacing.base');
    assert.equal(spacing.sourceUrl, 'https://cdn.example/app.css');
    const radius = out.find(t => t.token === 'radius.base');
    assert.equal(radius.sourceUrl, 'https://cdn.example/app.css');
  });
});
