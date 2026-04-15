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

  // Colors
  if (design.colors.primary) config.colors.primary = design.colors.primary.hex;
  if (design.colors.secondary) config.colors.secondary = design.colors.secondary.hex;
  if (design.colors.accent) config.colors.accent = design.colors.accent.hex;
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
