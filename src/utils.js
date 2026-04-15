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

export function parseColor(str) {
  if (!str || str === 'none' || str === 'currentcolor' || str === 'inherit' || str === 'initial') return null;
  str = str.trim().toLowerCase();

  if (NAMED_COLORS[str]) return { ...NAMED_COLORS[str] };

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
  const candidates = [2, 4, 6, 8];
  let bestBase = null;
  let bestScore = 0;
  for (const base of candidates) {
    const score = values.filter(v => v > 0 && v % base === 0).length / values.length;
    if (score > bestScore) { bestScore = score; bestBase = base; }
  }
  if (bestScore >= 0.6) return { base: bestBase, scale: values };
  return { base: null, scale: values };
}
