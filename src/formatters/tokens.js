export function formatTokens(design) {
  const tokens = {};

  // Colors
  tokens.color = {};
  if (design.colors.primary) tokens.color.primary = { $value: design.colors.primary.hex, $type: 'color' };
  if (design.colors.secondary) tokens.color.secondary = { $value: design.colors.secondary.hex, $type: 'color' };
  if (design.colors.accent) tokens.color.accent = { $value: design.colors.accent.hex, $type: 'color' };

  for (let i = 0; i < design.colors.neutrals.length && i < 10; i++) {
    tokens.color[`neutral-${i}`] = { $value: design.colors.neutrals[i].hex, $type: 'color' };
  }

  for (let i = 0; i < design.colors.backgrounds.length; i++) {
    tokens.color[`background-${i}`] = { $value: design.colors.backgrounds[i], $type: 'color' };
  }

  for (let i = 0; i < design.colors.text.length && i < 5; i++) {
    tokens.color[`text-${i}`] = { $value: design.colors.text[i], $type: 'color' };
  }

  // Typography
  tokens.fontFamily = {};
  for (const f of design.typography.families) {
    tokens.fontFamily[f.usage === 'headings' ? 'heading' : f.usage === 'body' ? 'body' : f.name.toLowerCase().replace(/\s+/g, '-')] = {
      $value: f.name,
      $type: 'fontFamily',
    };
  }

  tokens.fontSize = {};
  for (const s of design.typography.scale.slice(0, 15)) {
    tokens.fontSize[`${s.size}`] = { $value: `${s.size}px`, $type: 'dimension' };
  }

  // Spacing
  tokens.spacing = {};
  for (const [name, value] of Object.entries(design.spacing.tokens)) {
    tokens.spacing[name] = { $value: value, $type: 'dimension' };
  }

  // Border radius
  tokens.borderRadius = {};
  for (const r of design.borders.radii) {
    tokens.borderRadius[r.label] = { $value: `${r.value}px`, $type: 'dimension' };
  }

  // Shadows
  tokens.shadow = {};
  for (const s of design.shadows.values) {
    tokens.shadow[s.label] = { $value: s.raw, $type: 'shadow' };
  }

  // Breakpoints
  tokens.breakpoint = {};
  for (const bp of design.breakpoints) {
    tokens.breakpoint[bp.label] = { $value: `${bp.value}px`, $type: 'dimension' };
  }

  return JSON.stringify(tokens, null, 2);
}
