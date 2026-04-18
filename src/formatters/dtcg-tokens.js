// DTCG v1 token formatter.
// Input: design object from extractDesignLanguage.
// Output: { $metadata, primitive, semantic } — every leaf is { $value, $type }.

function token(value, type, extensions) {
  const t = { $value: value, $type: type };
  if (extensions) t.$extensions = extensions;
  return t;
}

function ref(path) { return `{${path}}`; }

// Normalize a color entry — may be a string hex or { hex } object.
function colorValue(v) {
  if (v == null) return null;
  if (typeof v === 'string') return v;
  if (typeof v === 'object' && typeof v.hex === 'string') return v.hex;
  return null;
}

// Normalize a dimension entry — may be a string ('4px'), a number (4), or { value } object.
function dimensionValue(v) {
  if (v == null) return null;
  if (typeof v === 'string') return v;
  if (typeof v === 'number') return `${v}px`;
  if (typeof v === 'object') {
    if (typeof v.value === 'number') return `${v.value}px`;
    if (typeof v.value === 'string') return v.value;
  }
  return null;
}

// Normalize a shadow entry — may be a string or { raw } object.
function shadowValue(v) {
  if (v == null) return null;
  if (typeof v === 'string') return v;
  if (typeof v === 'object' && typeof v.raw === 'string') return v.raw;
  return null;
}

// Normalize a font family entry — may be a string or { name } object.
function fontFamilyValue(v) {
  if (v == null) return null;
  if (typeof v === 'string') return v;
  if (typeof v === 'object' && typeof v.name === 'string') return v.name;
  return null;
}

// Normalize a typography scale size — may be number (px) or string ('16px').
function fontSizeValue(v) {
  if (v == null) return null;
  if (typeof v === 'string') return v;
  if (typeof v === 'number') return `${v}px`;
  return null;
}

function buildPrimitive(design) {
  const brand = colorValue(design.colors?.primary) || colorValue(design.colors?.all?.[0]) || '#000000';
  const secondary = colorValue(design.colors?.secondary);

  const neutrals = {};
  const rawNeutrals = design.colors?.neutrals || [];
  for (let i = 0; i < rawNeutrals.length; i++) {
    const cv = colorValue(rawNeutrals[i]);
    if (cv) neutrals[`n${i * 100 + 100}`] = token(cv, 'color');
  }

  const background = {};
  const rawBackgrounds = design.colors?.backgrounds || [];
  for (let i = 0; i < rawBackgrounds.length; i++) {
    const cv = colorValue(rawBackgrounds[i]);
    if (cv) background[`bg${i}`] = token(cv, 'color');
  }

  const text = {};
  const rawText = design.colors?.text || [];
  for (let i = 0; i < rawText.length; i++) {
    const cv = colorValue(rawText[i]);
    if (cv) text[`text${i}`] = token(cv, 'color');
  }

  const color = {
    brand: {
      primary: token(brand, 'color'),
      ...(secondary && { secondary: token(secondary, 'color') }),
    },
    neutral: neutrals,
    background,
    text,
  };

  const spacing = {};
  const rawSpacing = design.spacing?.scale || [];
  for (let i = 0; i < rawSpacing.length; i++) {
    const dv = dimensionValue(rawSpacing[i]);
    if (dv) spacing[`s${i}`] = token(dv, 'dimension');
  }

  const radius = {};
  const rawRadii = design.borders?.radii || [];
  for (let i = 0; i < rawRadii.length; i++) {
    const dv = dimensionValue(rawRadii[i]);
    if (dv) radius[`r${i}`] = token(dv, 'dimension');
  }

  const shadow = {};
  const rawShadows = design.shadows?.values || [];
  for (let i = 0; i < rawShadows.length; i++) {
    const sv = shadowValue(rawShadows[i]);
    if (sv) shadow[`sh${i}`] = token(sv, 'shadow');
  }

  const fontFamily = {};
  const rawFamilies = design.typography?.families || [];
  for (let i = 0; i < rawFamilies.length; i++) {
    const fv = fontFamilyValue(rawFamilies[i]);
    if (fv) fontFamily[`f${i}`] = token(fv, 'fontFamily');
  }

  return { color, spacing, radius, shadow, fontFamily };
}

function buildSemantic(design, primitive) {
  const firstRadiusKey = Object.keys(primitive.radius)[0] || 'r0';
  const firstShadowKey = Object.keys(primitive.shadow)[0] || 'sh0';

  const color = {
    action: {
      primary: token(ref('primitive.color.brand.primary'), 'color'),
    },
    surface: {
      default: token(ref('primitive.color.background.bg0'), 'color'),
    },
    text: {
      body: token(ref('primitive.color.text.text0'), 'color'),
    },
  };
  if (primitive.color.brand.secondary) {
    color.action.secondary = token(ref('primitive.color.brand.secondary'), 'color');
  }

  const firstFamily = fontFamilyValue(design.typography?.families?.[0]) || 'system-ui';
  const firstScale = design.typography?.scale?.[0] || {};
  const typography = {
    body: token({
      fontFamily: firstFamily,
      fontSize: fontSizeValue(firstScale.size) || '16px',
      fontWeight: firstScale.weight || '400',
      lineHeight: firstScale.lineHeight || '1.5',
    }, 'typography'),
  };

  const radius = {
    control: token(ref(`primitive.radius.${firstRadiusKey}`), 'dimension'),
  };

  const shadow = {
    elevated: token(ref(`primitive.shadow.${firstShadowKey}`), 'shadow'),
  };

  return { color, typography, radius, shadow };
}

export function formatDtcgTokens(design) {
  const primitive = buildPrimitive(design);
  const semantic = buildSemantic(design, primitive);
  const $metadata = {
    generator: 'designlang',
    version: '7.0.0',
    spec: 'https://design-tokens.github.io/community-group/format/',
  };
  if (design.meta?.url) $metadata.source = design.meta.url;
  if (design.meta?.timestamp) $metadata.generatedAt = design.meta.timestamp;
  return { $metadata, primitive, semantic };
}
