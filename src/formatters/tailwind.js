import { rgbToHex, rgbToHsl } from '../utils.js';

function generateColorScale(hex, parsed) {
  const { h, s } = parsed.hsl ?? rgbToHsl(parsed.rgb);
  const scale = {};
  const levels = [
    { name: '50', l: 97 }, { name: '100', l: 94 }, { name: '200', l: 86 },
    { name: '300', l: 76 }, { name: '400', l: 64 }, { name: '500', l: 50 },
    { name: '600', l: 40 }, { name: '700', l: 32 }, { name: '800', l: 24 },
    { name: '900', l: 16 }, { name: '950', l: 10 },
  ];
  for (const { name, l } of levels) {
    scale[name] = `hsl(${h}, ${s}%, ${l}%)`;
  }
  return scale;
}

export function formatTailwind(design) {
  const config = {
    colors: {},
    fontFamily: {},
    fontSize: {},
    spacing: {},
    borderRadius: {},
    boxShadow: {},
    screens: {},
    zIndex: {},
    transitionDuration: {},
    transitionTimingFunction: {},
  };

  // Colors — generate full scales from brand colors
  if (design.colors.primary) {
    config.colors.primary = generateColorScale(design.colors.primary.hex, design.colors.primary);
    config.colors.primary.DEFAULT = design.colors.primary.hex;
  }
  if (design.colors.secondary) {
    config.colors.secondary = generateColorScale(design.colors.secondary.hex, design.colors.secondary);
    config.colors.secondary.DEFAULT = design.colors.secondary.hex;
  }
  if (design.colors.accent) {
    config.colors.accent = generateColorScale(design.colors.accent.hex, design.colors.accent);
    config.colors.accent.DEFAULT = design.colors.accent.hex;
  }
  for (let i = 0; i < design.colors.neutrals.length && i < 10; i++) {
    config.colors[`neutral-${i * 100 || 50}`] = design.colors.neutrals[i].hex;
  }
  if (design.colors.backgrounds.length > 0) config.colors.background = design.colors.backgrounds[0];
  if (design.colors.text.length > 0) config.colors.foreground = design.colors.text[0];

  // Typography — first family becomes 'sans', second becomes 'mono' or 'heading'
  for (let i = 0; i < design.typography.families.length; i++) {
    const f = design.typography.families[i];
    let key;
    if (f.usage === 'headings') key = 'heading';
    else if (f.usage === 'body') key = 'body';
    else if (i === 0) key = 'sans';
    else if (f.name.toLowerCase().includes('mono')) key = 'mono';
    else key = i === 1 ? 'heading' : `font${i}`;
    config.fontFamily[key] = [f.name, 'sans-serif'];
  }

  for (const s of design.typography.scale.slice(0, 15)) {
    config.fontSize[`${s.size}`] = [`${s.size}px`, { lineHeight: s.lineHeight, letterSpacing: s.letterSpacing !== 'normal' ? s.letterSpacing : undefined }];
  }

  // Spacing
  for (const [name, value] of Object.entries(design.spacing.tokens)) {
    config.spacing[name] = value;
  }

  // Border radius
  for (const r of design.borders.radii) {
    config.borderRadius[r.label] = `${r.value}px`;
  }

  // Shadows
  for (const s of design.shadows.values) {
    config.boxShadow[s.label] = s.raw;
  }

  // Breakpoints
  for (const bp of design.breakpoints) {
    if (bp.type === 'min-width') {
      config.screens[bp.label] = `${bp.value}px`;
    }
  }

  // Animations
  if (design.animations) {
    if (design.animations.durations.length > 0) {
      config.transitionDuration = {};
      for (const d of design.animations.durations) {
        const ms = d.endsWith('ms') ? parseInt(d) : parseFloat(d) * 1000;
        config.transitionDuration[`${ms}`] = d;
      }
    }
    if (design.animations.easings.length > 0) {
      config.transitionTimingFunction = {};
      for (const e of design.animations.easings) {
        const val = typeof e === 'object' ? e.value : e;
        const name = val.startsWith('cubic-bezier') ? 'custom' : val.replace(/ease-?/g, '').replace(/-/g, '') || 'default';
        config.transitionTimingFunction[name] = val;
      }
    }
  }

  // Container
  if (design.layout && design.layout.containerWidths.length > 0) {
    const maxW = design.layout.containerWidths[0].maxWidth;
    const padding = design.layout.containerWidths[0].padding;
    config.container = { center: true, padding: padding || '1rem' };
    if (maxW) config.maxWidth = { container: maxW };
  }

  // Clean empty objects
  for (const [key, val] of Object.entries(config)) {
    if (typeof val === 'object' && Object.keys(val).length === 0) delete config[key];
  }

  const configStr = JSON.stringify(config, null, 4)
    // Unquote simple keys (letters, digits, underscores only)
    .replace(/"([a-zA-Z_]\w*)":/g, '$1:')
    // Replace double quotes with single quotes for values
    .replace(/"/g, "'");

  return `/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: ${configStr},
  },
};
`;
}
