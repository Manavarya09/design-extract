// Named CSS colors (subset — the 17 standard + common extras)
const NAMED_COLORS = {
  transparent: { r: 0, g: 0, b: 0, a: 0 },
  black: { r: 0, g: 0, b: 0, a: 1 },
  white: { r: 255, g: 255, b: 255, a: 1 },
  red: { r: 255, g: 0, b: 0, a: 1 },
  green: { r: 0, g: 128, b: 0, a: 1 },
  blue: { r: 0, g: 0, b: 255, a: 1 },
  yellow: { r: 255, g: 255, b: 0, a: 1 },
  cyan: { r: 0, g: 255, b: 255, a: 1 },
  magenta: { r: 255, g: 0, b: 255, a: 1 },
  gray: { r: 128, g: 128, b: 128, a: 1 },
  grey: { r: 128, g: 128, b: 128, a: 1 },
  orange: { r: 255, g: 165, b: 0, a: 1 },
  purple: { r: 128, g: 0, b: 128, a: 1 },
  pink: { r: 255, g: 192, b: 203, a: 1 },
  navy: { r: 0, g: 0, b: 128, a: 1 },
  teal: { r: 0, g: 128, b: 128, a: 1 },
  silver: { r: 192, g: 192, b: 192, a: 1 },
  maroon: { r: 128, g: 0, b: 0, a: 1 },
};

function oklabToRgb(L, a, b) {
  // OKLab -> linear sRGB
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;
  let r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  let bl = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;
  // Linear light -> sRGB (gamma), then clamp to [0,255]. Without the gamma
  // step every oklch/oklab colour read far too dark (mid grey came out #202020).
  const encode = (v) => {
    const c = Math.max(0, Math.min(1, v));
    return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  };
  const clamp = (v) => Math.round(Math.max(0, Math.min(1, encode(v))) * 255);
  return { r: clamp(r), g: clamp(g), b: clamp(bl) };
}

function oklchToRgb(L, C, H) {
  const hRad = H * Math.PI / 180;
  const a = C * Math.cos(hRad);
  const b = C * Math.sin(hRad);
  return oklabToRgb(L, a, b);
}

export function parseColor(str) {
  if (!str || str === 'none' || str === 'currentcolor' || str === 'inherit' || str === 'initial') return null;
  str = str.trim().toLowerCase();

  if (NAMED_COLORS[str]) return { ...NAMED_COLORS[str] };

  // Angle units on hues ("152.9deg") and percentage lightness in oklch/oklab
  // ("62.8%") are valid CSS; reduce them to the bare numbers matched below.
  str = str.replace(/(-?[\d.]+)deg\b/g, '$1');
  str = str.replace(/^(okl(?:ch|ab)\(\s*)([\d.]+)%/, (m, head, l) => `${head}${+l / 100}`);

  // hex: #RGB, #RGBA, #RRGGBB, #RRGGBBAA
  if (str.startsWith('#')) {
    const hex = str.slice(1);
    if (hex.length === 3) return { r: parseInt(hex[0] + hex[0], 16), g: parseInt(hex[1] + hex[1], 16), b: parseInt(hex[2] + hex[2], 16), a: 1 };
    if (hex.length === 4) return { r: parseInt(hex[0] + hex[0], 16), g: parseInt(hex[1] + hex[1], 16), b: parseInt(hex[2] + hex[2], 16), a: parseInt(hex[3] + hex[3], 16) / 255 };
    if (hex.length === 6) return { r: parseInt(hex.slice(0, 2), 16), g: parseInt(hex.slice(2, 4), 16), b: parseInt(hex.slice(4, 6), 16), a: 1 };
    if (hex.length === 8) return { r: parseInt(hex.slice(0, 2), 16), g: parseInt(hex.slice(2, 4), 16), b: parseInt(hex.slice(4, 6), 16), a: parseInt(hex.slice(6, 8), 16) / 255 };
  }

  // rgb(r, g, b) or rgba(r, g, b, a)
  const rgbMatch = str.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)/);
  if (rgbMatch) {
    return { r: +rgbMatch[1], g: +rgbMatch[2], b: +rgbMatch[3], a: rgbMatch[4] !== undefined ? +rgbMatch[4] : 1 };
  }

  // Modern syntax: rgb(r g b / a)
  const rgbModern = str.match(/rgba?\(\s*(\d+)\s+(\d+)\s+(\d+)\s*(?:\/\s*([\d.]+%?))?\s*\)/);
  if (rgbModern) {
    let a = 1;
    if (rgbModern[4] !== undefined) {
      a = rgbModern[4].endsWith('%') ? parseFloat(rgbModern[4]) / 100 : +rgbModern[4];
    }
    return { r: +rgbModern[1], g: +rgbModern[2], b: +rgbModern[3], a };
  }

  // hsl(h, s%, l%) or hsla(h, s%, l%, a)
  const hslMatch = str.match(/hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*([\d.]+))?\s*\)/);
  if (hslMatch) {
    const rgb = hslToRgb(+hslMatch[1], +hslMatch[2], +hslMatch[3]);
    return { ...rgb, a: hslMatch[4] !== undefined ? +hslMatch[4] : 1 };
  }

  // hsl modern: hsl(210 50% 40%) or hsl(210 50% 40% / 0.5)
  const hslModern = str.match(/hsla?\(\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%\s*(?:\/\s*([\d.]+%?))?\s*\)/);
  if (hslModern) {
    const rgb = hslToRgb(+hslModern[1], +hslModern[2], +hslModern[3]);
    let a = 1;
    if (hslModern[4] !== undefined) {
      a = hslModern[4].endsWith('%') ? parseFloat(hslModern[4]) / 100 : +hslModern[4];
    }
    return { ...rgb, a };
  }

  // oklch(L C H) or oklch(L C H / a)
  const oklchMatch = str.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*(?:\/\s*([\d.]+%?))?\s*\)/);
  if (oklchMatch) {
    const rgb = oklchToRgb(+oklchMatch[1], +oklchMatch[2], +oklchMatch[3]);
    let a = 1;
    if (oklchMatch[4] !== undefined) {
      a = oklchMatch[4].endsWith('%') ? parseFloat(oklchMatch[4]) / 100 : +oklchMatch[4];
    }
    return { ...rgb, a };
  }

  // oklab(L a b) or oklab(L a b / alpha)
  const oklabMatch = str.match(/oklab\(\s*([\d.e+-]+)\s+([\d.e+-]+)\s+([\d.e+-]+)\s*(?:\/\s*([\d.]+%?))?\s*\)/);
  if (oklabMatch) {
    const rgb = oklabToRgb(+oklabMatch[1], +oklabMatch[2], +oklabMatch[3]);
    let a = 1;
    if (oklabMatch[4] !== undefined) {
      a = oklabMatch[4].endsWith('%') ? parseFloat(oklabMatch[4]) / 100 : +oklabMatch[4];
    }
    return { ...rgb, a };
  }

  // color-mix(in srgb, color1 pct, color2)
  const mixMatch = str.match(/color-mix\(\s*in\s+\w+\s*,\s*(.+?)\s*,\s*(.+?)\s*\)/);
  if (mixMatch) {
    const part1 = mixMatch[1].trim().replace(/\s+\d+%$/, '');
    const part2 = mixMatch[2].trim().replace(/\s+\d+%$/, '');
    const c1 = parseColor(part1);
    const c2 = parseColor(part2);
    if (c1 && c2) {
      return { r: Math.round((c1.r + c2.r) / 2), g: Math.round((c1.g + c2.g) / 2), b: Math.round((c1.b + c2.b) / 2), a: (c1.a + c2.a) / 2 };
    }
  }

  return null;
}

export function rgbToHex({ r, g, b }) {
  const toHex = (n) => Math.round(n).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function rgbToHsl({ r, g, b }) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(h, s, l) {
  h /= 360; s /= 100; l /= 100;
  if (s === 0) { const v = Math.round(l * 255); return { r: v, g: v, b: v }; }
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return {
    r: Math.round(hue2rgb(p, q, h + 1/3) * 255),
    g: Math.round(hue2rgb(p, q, h) * 255),
    b: Math.round(hue2rgb(p, q, h - 1/3) * 255),
  };
}

export function colorDistance(c1, c2) {
  return Math.sqrt((c1.r - c2.r) ** 2 + (c1.g - c2.g) ** 2 + (c1.b - c2.b) ** 2);
}

export function isSaturated({ r, g, b }) {
  const { s } = rgbToHsl({ r, g, b });
  return s > 10;
}

export function clusterColors(colors, threshold = 15) {
  const clusters = [];
  for (const color of colors) {
    const existing = clusters.find(c => colorDistance(c.representative, color.parsed) < threshold);
    if (existing) {
      existing.members.push(color);
      existing.count += color.count;
    } else {
      clusters.push({ representative: color.parsed, hex: color.hex, members: [color], count: color.count });
    }
  }
  // The first encountered colour seeded each cluster, but that's order-of-
  // iteration accident, not signal. Re-pick the representative as the
  // most-used member of the cluster so downstream consumers (primary
  // detection, palette display, brand book) get the dominant shade.
  for (const cluster of clusters) {
    if (cluster.members.length > 1) {
      const dominant = cluster.members.reduce(
        (best, m) => (m.count > best.count ? m : best),
        cluster.members[0],
      );
      cluster.representative = dominant.parsed;
      cluster.hex = dominant.hex;
    }
  }
  return clusters.sort((a, b) => b.count - a.count);
}

export function clusterValues(values, threshold) {
  const sorted = [...values].sort((a, b) => a - b);
  const groups = [];
  for (const v of sorted) {
    const last = groups[groups.length - 1];
    if (last && Math.abs(v - last.representative) <= threshold) {
      last.members.push(v);
    } else {
      groups.push({ representative: v, members: [v] });
    }
  }
  return groups.map(g => g.representative);
}

export function parseCSSValue(str) {
  if (!str || str === 'normal' || str === 'auto' || str === 'none') return null;
  const match = str.match(/^([\d.]+)(px|rem|em|%|vw|vh|pt)?$/);
  if (!match) return null;
  return { value: parseFloat(match[1]), unit: match[2] || '' };
}

export function remToPx(rem, base = 16) {
  return rem * base;
}

export function pxToRem(px, base = 16) {
  return +(px / base).toFixed(4);
}

export function safeName(str) {
  return str.replace(/[^a-zA-Z0-9-_]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').toLowerCase();
}

export function nameFromUrl(url) {
  try {
    const hostname = new URL(url).hostname;
    return safeName(hostname.replace(/^www\./, ''));
  } catch {
    return 'unknown-site';
  }
}

export function detectScale(values) {
  if (values.length < 3) return { base: null, scale: values };
  // Expanded candidate set. Real production palettes use 4/8 (Tailwind +
  // Material), 5 (Bootstrap), 6 (some Apple specs), 7 (rare), 10/12/16
  // (looser systems). 2 stays as a fallback for icon/component-level
  // numbers. We give 4 and 8 a small head-start because they win >70%
  // of the time and were the previous-only choices — keeps results
  // stable for sites that worked before.
  const candidates = [2, 4, 5, 6, 7, 8, 10, 12, 16];
  const bonus = { 4: 0.04, 8: 0.04 };
  let bestBase = null;
  let bestScore = 0;
  for (const base of candidates) {
    const fit = values.filter(v => v > 0 && v % base === 0).length / values.length;
    const score = fit + (bonus[base] || 0);
    if (score > bestScore) { bestScore = score; bestBase = base; }
  }
  if (bestScore >= 0.6) return { base: bestBase, scale: values };
  return { base: null, scale: values };
}

// Shared "always-list" coercer for downstream consumers (formatters,
// pack, brand-book). Different extractors return slot/prop/variant
// fields as arrays, objects, or comma-separated strings depending on
// what was detected; this normalises without losing data.
export function asList(v) {
  if (v == null) return [];
  if (Array.isArray(v)) return v.filter(x => x != null);
  if (typeof v === 'string') return v.split(',').map(s => s.trim()).filter(Boolean);
  if (typeof v === 'object') return Object.keys(v).filter(k => v[k] !== false && v[k] !== null);
  return [String(v)];
}
