// OKLCH / OKLab → sRGB hex conversion utilities.
// Based on the public OKLab formulas by Björn Ottosson
// (https://bottosson.github.io/posts/oklab/). Implemented locally (no deps).

function clamp01(v) { return Math.max(0, Math.min(1, v)); }

function linearToSrgb(x) {
  // Convert linear-light sRGB [0..1] to sRGB gamma-encoded [0..1]
  if (x < 0) x = 0;
  if (x > 1) x = 1;
  return x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;
}

export function oklabToSrgb(L, a, b) {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  const r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const b2 = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

  return [linearToSrgb(r), linearToSrgb(g), linearToSrgb(b2)];
}

export function oklchToSrgb(L, C, h) {
  const hr = (h * Math.PI) / 180;
  const a = C * Math.cos(hr);
  const b = C * Math.sin(hr);
  return oklabToSrgb(L, a, b);
}

function toHex(v) {
  const n = Math.round(clamp01(v) * 255);
  return n.toString(16).padStart(2, '0');
}

export function rgbToHex(r, g, b) {
  return '#' + toHex(r) + toHex(g) + toHex(b);
}

// Parse an oklch() or oklab() CSS value. Accepts values like:
//   oklch(62.8% 0.258 29.23)
//   oklch(0.628 0.258 29.23)
//   oklab(0.628 0.1 -0.1)
// Returns { type: 'oklch'|'oklab', L, C, h, a, b, raw } or null.
export function parseOklchOrOklab(raw) {
  if (!raw || typeof raw !== 'string') return null;
  const m = raw.match(/^\s*(oklch|oklab)\(\s*([^)]+)\)\s*$/i);
  if (!m) return null;
  const type = m[1].toLowerCase();
  // Strip alpha (everything after /)
  const body = m[2].split('/')[0].trim();
  const parts = body.split(/[\s,]+/).filter(Boolean);
  if (parts.length < 3) return null;

  function parseNum(s, scale = 1) {
    if (s.endsWith('%')) return parseFloat(s) / 100;
    return parseFloat(s) * scale;
  }

  const p0 = parts[0].endsWith('%') ? parseFloat(parts[0]) / 100 : parseFloat(parts[0]);
  const p1 = parseFloat(parts[1]);
  const p2 = parseFloat(parts[2]);
  if ([p0, p1, p2].some(v => Number.isNaN(v))) return null;

  if (type === 'oklch') return { type, L: p0, C: p1, h: p2, raw };
  return { type, L: p0, a: p1, b: p2, raw };
}

export function oklchLikeToHex(raw) {
  const parsed = parseOklchOrOklab(raw);
  if (!parsed) return null;
  const [r, g, b] = parsed.type === 'oklch'
    ? oklchToSrgb(parsed.L, parsed.C, parsed.h)
    : oklabToSrgb(parsed.L, parsed.a, parsed.b);
  return rgbToHex(r, g, b);
}
