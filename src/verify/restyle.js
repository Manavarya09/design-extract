// The re-style engine — the heart of `verify`.
//
// Pure function: given an element's *real* computed styles and the design's
// token sets, produce the styles that element would have if it could only use
// the extracted tokens. The gap between the two — rendered and pixel-diffed
// elsewhere — IS the tokenization loss the fidelity score reports.
//
// No browser, no I/O. Every visual property that determines a static crop is
// snapped to its nearest token; properties with no matching token family are
// flagged `mapped: false` and rendered with a neutral default (radius 0,
// shadow none) so the diff EXPOSES the missing extractor rather than hiding it.
//
// Motion/easing is deliberately excluded: it does not affect a static
// screenshot, so snapping it would add noise without signal.

// ── colour ──────────────────────────────────────────────────────
export function parseColor(str) {
  if (!str) return null;
  const s = String(str).trim();
  const m = s.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)\s*(?:[,/]\s*([\d.]+))?\s*\)/i);
  if (m) return { r: +m[1], g: +m[2], b: +m[3], a: m[4] === undefined ? 1 : +m[4] };
  const h = s.match(/^#([0-9a-f]{6})$/i);
  if (h) return { r: parseInt(h[1].slice(0, 2), 16), g: parseInt(h[1].slice(2, 4), 16), b: parseInt(h[1].slice(4, 6), 16), a: 1 };
  const h3 = s.match(/^#([0-9a-f]{3})$/i);
  if (h3) return { r: parseInt(h3[1][0] + h3[1][0], 16), g: parseInt(h3[1][1] + h3[1][1], 16), b: parseInt(h3[1][2] + h3[1][2], 16), a: 1 };
  return null;
}

function toHex({ r, g, b }) {
  return '#' + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
}

// sRGB → CIE Lab, so colour distance tracks perception, not raw RGB.
function rgbToLab({ r, g, b }) {
  let [R, G, B] = [r, g, b].map((v) => {
    v /= 255;
    return v > 0.04045 ? ((v + 0.055) / 1.055) ** 2.4 : v / 12.92;
  });
  let x = (R * 0.4124 + G * 0.3576 + B * 0.1805) / 0.95047;
  let y = (R * 0.2126 + G * 0.7152 + B * 0.0722) / 1.0;
  let z = (R * 0.0193 + G * 0.1192 + B * 0.9505) / 1.08883;
  [x, y, z] = [x, y, z].map((v) => (v > 0.008856 ? Math.cbrt(v) : 7.787 * v + 16 / 116));
  return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
}

export function deltaE(hexA, hexB) {
  const a = parseColor(hexA);
  const b = parseColor(hexB);
  if (!a || !b) return Infinity;
  const [l1, a1, b1] = rgbToLab(a);
  const [l2, a2, b2] = rgbToLab(b);
  return Math.hypot(l1 - l2, a1 - a2, b1 - b2);
}

export function nearestColor(value, palette) {
  const col = parseColor(value);
  if (!col || col.a < 0.05) return { value: 'transparent', mapped: true, transparent: true };
  if (!palette?.length) return { value: toHex(col), mapped: false };
  const here = toHex(col);
  let best = palette[0];
  let bestD = Infinity;
  for (const p of palette) {
    const d = deltaE(here, p);
    if (d < bestD) { bestD = d; best = p; }
  }
  return { value: best, mapped: true, distance: bestD };
}

// ── numeric scales ──────────────────────────────────────────────
export function px(v) {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : null;
}

export function nearestNumber(value, scale, { fallback = 0 } = {}) {
  const n = px(value);
  if (n === null) return { value: fallback, mapped: false };
  if (!scale?.length) return { value: fallback, mapped: false, original: n };
  let best = scale[0];
  for (const s of scale) if (Math.abs(s - n) < Math.abs(best - n)) best = s;
  return { value: best, mapped: true, distance: Math.abs(best - n) };
}

// ── shadow ──────────────────────────────────────────────────────
function blurOf(shadow) {
  const m = String(shadow).match(/(-?\d+(?:\.\d+)?)px\s+(-?\d+(?:\.\d+)?)px\s+(\d+(?:\.\d+)?)px/);
  return m ? +m[3] : 0;
}

export function nearestShadow(value, shadows) {
  const has = value && value !== 'none';
  if (!has) return { value: 'none', mapped: true };
  if (!shadows?.length) return { value: 'none', mapped: false };
  const target = blurOf(value);
  let best = shadows[0];
  for (const s of shadows) if (Math.abs(blurOf(s) - target) < Math.abs(blurOf(best) - target)) best = s;
  return { value: best, mapped: true };
}

// ── font family ─────────────────────────────────────────────────
function primaryFamily(stack) {
  return String(stack || '').split(',')[0].trim().replace(/^["']|["']$/g, '');
}

export function snapFamily(value, families, fallback) {
  const want = primaryFamily(value).toLowerCase();
  const hit = (families || []).find((f) => primaryFamily(f).toLowerCase() === want);
  if (hit) return { value: hit, mapped: true };
  return { value: fallback || families?.[0] || 'sans-serif', mapped: false };
}

// ── orchestration ───────────────────────────────────────────────
// `computed` is a flat map of the raw values read from getComputedStyle.
// Returns { styled, deltas } — styled is inline CSS to apply to the rebuild
// root; deltas explains every move (for the attribution / heatmap legend).
export function restyleComponent(computed = {}, tokens = {}) {
  const styled = {};
  const deltas = [];
  const record = (prop, family, from, res) => {
    styled[prop] = res.value;
    deltas.push({ prop, family, from, to: res.value, mapped: res.mapped !== false, distance: res.distance });
  };

  record('background-color', 'color', computed.backgroundColor, nearestColor(computed.backgroundColor, tokens.palette));
  record('color', 'color', computed.color, nearestColor(computed.color, tokens.palette));

  const bw = px(computed.borderTopWidth) || 0;
  if (bw > 0) {
    record('border-style', 'border', computed.borderTopStyle, { value: computed.borderTopStyle || 'solid', mapped: true });
    record('border-width', 'border', computed.borderTopWidth, nearestNumber(computed.borderTopWidth, tokens.borderWidths, { fallback: bw }));
    record('border-color', 'color', computed.borderTopColor, nearestColor(computed.borderTopColor, tokens.palette));
  }

  record('border-radius', 'radius', computed.borderTopLeftRadius, nearestNumber(computed.borderTopLeftRadius, tokens.radii, { fallback: 0 }));

  for (const [prop, key] of [['padding-top', 'paddingTop'], ['padding-right', 'paddingRight'], ['padding-bottom', 'paddingBottom'], ['padding-left', 'paddingLeft']]) {
    record(prop, 'spacing', computed[key], nearestNumber(computed[key], tokens.spacing, { fallback: px(computed[key]) || 0 }));
  }

  record('font-family', 'type', computed.fontFamily, snapFamily(computed.fontFamily, tokens.fontFamilies, tokens.bodyFamily));
  record('font-size', 'type', computed.fontSize, nearestNumber(computed.fontSize, tokens.fontSizes, { fallback: px(computed.fontSize) || 16 }));
  record('font-weight', 'type', computed.fontWeight, nearestNumber(computed.fontWeight, tokens.fontWeights, { fallback: parseInt(computed.fontWeight, 10) || 400 }));
  record('box-shadow', 'shadow', computed.boxShadow, nearestShadow(computed.boxShadow, tokens.shadows));

  return { styled, deltas };
}

// Turn the `styled` map into an inline style string, appending px units to the
// numeric props the snappers return as raw numbers.
export function styledToCss(styled = {}) {
  const PX = new Set(['border-width', 'border-radius', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'font-size']);
  return Object.entries(styled)
    .map(([k, v]) => `${k}: ${PX.has(k) && typeof v === 'number' ? `${v}px` : v}`)
    .join('; ');
}
