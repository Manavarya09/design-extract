// Normalise a `design` object into the flat token sets the re-style engine
// snaps against. One job: turn the rich extraction into "here are the allowed
// values per visual property", so restyle.js stays a pure function of
// (computedStyle, tokens).

function uniqNums(arr) {
  return [...new Set((arr || []).map(Number).filter((n) => Number.isFinite(n)))].sort((a, b) => a - b);
}

function hex(s) {
  return typeof s === 'string' && /^#[0-9a-f]{6}$/i.test(s) ? s.toLowerCase() : null;
}

export function tokensFromDesign(design = {}) {
  const c = design.colors || {};
  const palette = [...new Set([
    c.primary?.hex,
    c.secondary?.hex,
    c.accent?.hex,
    ...(c.neutrals || []).map((n) => n.hex),
    ...(c.backgrounds || []),
    ...(c.text || []),
    ...(c.all || []).map((x) => x.hex),
  ].map(hex).filter(Boolean))];

  const ty = design.typography || {};
  const fontFamilies = [...new Set((ty.families || []).map((f) => f.name).filter(Boolean))];
  const fontSizes = uniqNums((ty.scale || []).map((s) => s.size));
  const fontWeights = uniqNums((ty.scale || []).map((s) => parseInt(s.weight, 10)));

  return {
    palette,
    radii: uniqNums(design.borders?.radii),
    borderWidths: uniqNums(design.borders?.widths),
    spacing: uniqNums(design.spacing?.scale),
    fontFamilies,
    fontSizes,
    fontWeights,
    shadows: (design.shadows?.values || []).filter((s) => typeof s === 'string' && s && s !== 'none'),
    // sensible wrapper defaults so rebuilt text inherits the token system
    bodyFamily: ty.body?.family || fontFamilies[0] || 'sans-serif',
    bodyColor: hex(c.text?.[0]) || (c.primary?.hex ? hex(c.primary.hex) : null) || '#111111',
    bodyBg: hex(c.backgrounds?.[0]) || '#ffffff',
  };
}
