import { parseColor, rgbToHex, rgbToHsl, clusterColors, isSaturated } from '../utils.js';

export function extractColors(computedStyles) {
  const colorMap = new Map(); // hex -> { hex, parsed, count, contexts: Set }

  function addColor(value, context) {
    const parsed = parseColor(value);
    if (!parsed || parsed.a === 0) return;
    const hex = rgbToHex(parsed);
    if (!colorMap.has(hex)) {
      colorMap.set(hex, { hex, parsed, count: 0, contexts: new Set() });
    }
    const entry = colorMap.get(hex);
    entry.count++;
    entry.contexts.add(context);
  }

  const gradients = new Set();

  for (const el of computedStyles) {
    addColor(el.color, 'text');
    addColor(el.backgroundColor, 'background');
    addColor(el.borderColor, 'border');

    if (el.backgroundImage && el.backgroundImage !== 'none' && el.backgroundImage.includes('gradient')) {
      gradients.add(el.backgroundImage);
    }
  }

  const allColors = Array.from(colorMap.values());
  const clusters = clusterColors(allColors, 15);

  // Classify roles
  const neutrals = [];
  const chromatic = [];

  for (const cluster of clusters) {
    if (isSaturated(cluster.representative)) {
      chromatic.push(cluster);
    } else {
      neutrals.push(cluster);
    }
  }

  // Background colors: found on large-area elements
  const bgColors = [];
  for (const el of computedStyles) {
    if (el.area > 50000) {
      const parsed = parseColor(el.backgroundColor);
      if (parsed && parsed.a > 0) bgColors.push(rgbToHex(parsed));
    }
  }

  // Text colors: from color property
  const textColors = [];
  for (const el of computedStyles) {
    const parsed = parseColor(el.color);
    if (parsed && parsed.a > 0) {
      const hex = rgbToHex(parsed);
      if (!textColors.includes(hex)) textColors.push(hex);
    }
  }

  const primary = chromatic[0] || null;
  const secondary = chromatic[1] || null;
  const accent = chromatic.find(c => {
    const pct = c.count / allColors.reduce((s, a) => s + a.count, 0);
    return pct < 0.05 && c.members.some(m => m.contexts.has('background'));
  }) || chromatic[2] || null;

  return {
    primary: primary ? { hex: primary.hex, rgb: primary.representative, hsl: rgbToHsl(primary.representative), count: primary.count } : null,
    secondary: secondary ? { hex: secondary.hex, rgb: secondary.representative, hsl: rgbToHsl(secondary.representative), count: secondary.count } : null,
    accent: accent ? { hex: accent.hex, rgb: accent.representative, hsl: rgbToHsl(accent.representative), count: accent.count } : null,
    neutrals: neutrals.map(c => ({ hex: c.hex, rgb: c.representative, hsl: rgbToHsl(c.representative), count: c.count })),
    backgrounds: [...new Set(bgColors)],
    text: textColors.slice(0, 10),
    gradients: [...gradients],
    all: clusters.map(c => ({
      hex: c.hex,
      rgb: c.representative,
      hsl: rgbToHsl(c.representative),
      count: c.count,
      contexts: [...new Set(c.members.flatMap(m => [...m.contexts]))],
    })),
  };
}
