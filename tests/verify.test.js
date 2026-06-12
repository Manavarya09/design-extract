import { describe, it } from 'node:test';
import assert from 'node:assert';
import { PNG } from 'pngjs';

import { tokensFromDesign } from '../src/verify/tokens.js';
import {
  nearestColor, nearestNumber, nearestShadow, snapFamily, deltaE,
  restyleComponent, styledToCss,
} from '../src/verify/restyle.js';
import { diffPngBuffers, ratioToFidelity } from '../src/verify/diff.js';

const design = {
  colors: {
    primary: { hex: '#533afd' },
    secondary: null,
    accent: { hex: '#e4f222' },
    neutrals: [{ hex: '#000000' }, { hex: '#ffffff' }],
    backgrounds: ['#ffffff'],
    text: ['#0a0a0a'],
    all: [{ hex: '#533afd' }, { hex: '#000000' }, { hex: '#ffffff' }, { hex: '#0a0a0a' }],
  },
  typography: {
    families: [{ name: 'Inter' }, { name: 'Georgia' }],
    body: { family: 'Inter' },
    scale: [{ size: 16, weight: '400' }, { size: 24, weight: '700' }],
  },
  spacing: { scale: [4, 8, 16, 24] },
  borders: { radii: [4, 8, 16], widths: [1, 2] },
  shadows: { values: ['0px 1px 2px rgba(0,0,0,0.1)', '0px 8px 24px rgba(0,0,0,0.2)'] },
};

describe('verify · tokensFromDesign', () => {
  it('flattens the design into snap-ready token sets', () => {
    const t = tokensFromDesign(design);
    assert.ok(t.palette.includes('#533afd'));
    assert.deepEqual(t.spacing, [4, 8, 16, 24]);
    assert.deepEqual(t.radii, [4, 8, 16]);
    assert.deepEqual(t.fontSizes, [16, 24]);
    assert.deepEqual(t.fontWeights, [400, 700]);
    assert.equal(t.shadows.length, 2);
    assert.equal(t.bodyFamily, 'Inter');
  });

  it('degrades on an empty design without throwing', () => {
    const t = tokensFromDesign({});
    assert.deepEqual(t.palette, []);
    assert.deepEqual(t.spacing, []);
    assert.equal(typeof t.bodyFamily, 'string');
  });
});

describe('verify · restyle snapping', () => {
  const tokens = tokensFromDesign(design);

  it('snaps a near colour to the closest palette token by ΔE', () => {
    const r = nearestColor('rgb(85, 60, 250)', tokens.palette); // ~#553cfa, near #533afd
    assert.equal(r.value, '#533afd');
    assert.equal(r.mapped, true);
  });

  it('treats fully transparent as transparent (not a palette snap)', () => {
    const r = nearestColor('rgba(0, 0, 0, 0)', tokens.palette);
    assert.equal(r.value, 'transparent');
    assert.equal(r.transparent, true);
  });

  it('deltaE is ~0 for identical colours and large for opposites', () => {
    assert.ok(deltaE('#533afd', '#533afd') < 0.5);
    assert.ok(deltaE('#000000', '#ffffff') > 90);
  });

  it('snaps a number to the nearest scale value', () => {
    assert.equal(nearestNumber('7px', tokens.radii).value, 8);
    assert.equal(nearestNumber('15px', tokens.spacing).value, 16);
  });

  it('flags unmapped when the scale is empty (honest loss, not silent keep)', () => {
    const r = nearestNumber('12px', [], { fallback: 0 });
    assert.equal(r.mapped, false);
    assert.equal(r.value, 0);
  });

  it('nearestShadow picks by blur and maps "none" cleanly', () => {
    assert.equal(nearestShadow('none', tokens.shadows).value, 'none');
    assert.equal(nearestShadow('0px 9px 20px rgba(0,0,0,0.2)', tokens.shadows).value, '0px 8px 24px rgba(0,0,0,0.2)');
    assert.equal(nearestShadow('0px 2px 4px #000', []).mapped, false); // has shadow, no token → loss
  });

  it('snapFamily keeps a known family and flags an unknown one', () => {
    assert.deepEqual(snapFamily('Inter, sans-serif', tokens.fontFamilies, 'Inter'), { value: 'Inter', mapped: true });
    assert.equal(snapFamily('Comic Sans, cursive', tokens.fontFamilies, 'Inter').mapped, false);
  });

  it('restyleComponent produces inline styles + an explained delta per property', () => {
    const computed = {
      backgroundColor: 'rgb(83, 58, 253)', color: 'rgb(255, 255, 255)',
      borderTopWidth: '0px', borderTopLeftRadius: '7px',
      paddingTop: '9px', paddingRight: '15px', paddingBottom: '9px', paddingLeft: '15px',
      fontFamily: 'Inter', fontSize: '15px', fontWeight: '600', boxShadow: 'none',
    };
    const { styled, deltas } = restyleComponent(computed, tokens);
    assert.equal(styled['background-color'], '#533afd');
    assert.equal(styled['border-radius'], 8);
    assert.equal(styled['padding-left'], 16);
    assert.ok(deltas.find((d) => d.prop === 'background-color' && d.family === 'color'));
    const css = styledToCss(styled);
    assert.match(css, /border-radius: 8px/);
    assert.match(css, /background-color: #533afd/);
  });
});

// Build a solid-colour PNG buffer for deterministic diff tests.
function solidPng(w, h, [r, g, b]) {
  const png = new PNG({ width: w, height: h });
  for (let i = 0; i < png.data.length; i += 4) {
    png.data[i] = r; png.data[i + 1] = g; png.data[i + 2] = b; png.data[i + 3] = 255;
  }
  return PNG.sync.write(png);
}

describe('verify · pixel diff', () => {
  it('identical images → ratio 0 → fidelity 100', () => {
    const a = solidPng(40, 20, [80, 80, 80]);
    const { ratio } = diffPngBuffers(a, a);
    assert.equal(ratio, 0);
    assert.equal(ratioToFidelity(ratio), 100);
  });

  it('opposite images → high ratio → low fidelity', () => {
    const a = solidPng(40, 20, [0, 0, 0]);
    const b = solidPng(40, 20, [255, 255, 255]);
    const { ratio } = diffPngBuffers(a, b);
    assert.ok(ratio > 0.9, `expected near-total diff, got ${ratio}`);
    assert.ok(ratioToFidelity(ratio) < 10);
  });

  it('size mismatch is letterboxed (not stretched) and counts the margin as loss', () => {
    const a = solidPng(40, 20, [80, 80, 80]);
    const b = solidPng(20, 20, [80, 80, 80]); // narrower → right margin uncovered
    const { ratio, width, height } = diffPngBuffers(a, b);
    assert.equal(width, 40);
    assert.equal(height, 20);
    assert.ok(ratio > 0, 'uncovered margin should register as difference');
  });
});
