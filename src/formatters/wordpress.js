import { resolveRef } from './_token-ref.js';

const HEADER_VERSION = '7.0.0';

function* walkLeaves(node, prefix) {
  if (node == null || typeof node !== 'object') return;
  if ('$value' in node && '$type' in node) {
    yield { path: prefix, token: node };
    return;
  }
  for (const key of Object.keys(node)) {
    yield* walkLeaves(node[key], prefix ? `${prefix}.${key}` : key);
  }
}

// "semantic.color.action.primary" → "action-primary"
// "primitive.spacing.s0" → "s0"
function slugFromPath(path) {
  const parts = path.split('.');
  const trimmed = parts.slice(1);
  let segs;
  if (trimmed[0] === 'color' && trimmed.length >= 3) {
    segs = trimmed.slice(1);
  } else if (trimmed[0] === 'spacing' || trimmed[0] === 'radius') {
    segs = trimmed.slice(1);
  } else {
    segs = trimmed;
  }
  return segs
    .map((s) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase())
    .join('-')
    .replace(/[^a-z0-9-]/g, '');
}

function titleFromPath(path) {
  return slugFromPath(path)
    .split('-')
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');
}

function collectWpColors(tokens) {
  const entries = [];
  const sem = tokens?.semantic?.color;
  if (sem) {
    for (const leaf of walkLeaves(sem, 'semantic.color')) {
      if (leaf.token.$type !== 'color') continue;
      const resolved = resolveRef(tokens, leaf.path);
      if (typeof resolved !== 'string') continue;
      entries.push({ slug: slugFromPath(leaf.path), color: resolved, name: titleFromPath(leaf.path) });
    }
  }
  return entries;
}

function collectWpSpacing(tokens) {
  const entries = [];
  const spacing = tokens?.primitive?.spacing || {};
  for (const key of Object.keys(spacing)) {
    const tok = spacing[key];
    if (!tok || tok.$type !== 'dimension') continue;
    const resolved = resolveRef(tokens, `primitive.spacing.${key}`);
    if (typeof resolved !== 'string') continue;
    entries.push({ slug: key, size: resolved, name: key.toUpperCase() });
  }
  return entries;
}

function collectWpFontSizes(tokens, design) {
  const entries = [];
  const scale = design?.typography?.scale || [];
  const labelFor = (s) => (s.tags && s.tags[0]) || `fs-${s.size}`;
  for (const s of scale) {
    const size = typeof s.size === 'number' ? `${s.size}px` : s.size;
    const label = String(labelFor(s));
    entries.push({ slug: label.toLowerCase(), size, name: label });
  }
  return entries;
}

function collectWpFontFamilies(tokens, design) {
  const entries = [];
  const fams = design?.typography?.families || [];
  for (const f of fams) {
    const name = typeof f === 'string' ? f : f?.name;
    if (!name) continue;
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    entries.push({ slug, fontFamily: `${name}, sans-serif`, name });
  }
  return entries;
}

function buildThemeJson(tokens, design) {
  const palette = collectWpColors(tokens);
  const spacingSizes = collectWpSpacing(tokens);
  const fontSizes = collectWpFontSizes(tokens, design);
  const fontFamilies = collectWpFontFamilies(tokens, design);

  // Semantic surface/text for styles.color
  const surfaceDefault = resolveRef(tokens, 'semantic.color.surface.default') || '#ffffff';
  const textBody = resolveRef(tokens, 'semantic.color.text.body') || '#111111';

  const theme = {
    $schema: 'https://schemas.wp.org/trunk/theme.json',
    version: 3,
    settings: {
      color: { palette },
      typography: { fontSizes, fontFamilies },
      spacing: { spacingSizes },
    },
    styles: {
      color: {
        background: `var(--wp--preset--color--surface-default, ${surfaceDefault})`,
        text: `var(--wp--preset--color--text-body, ${textBody})`,
      },
    },
  };
  return JSON.stringify(theme, null, 2) + '\n';
}

function buildStyleCss(tokens, design) {
  const source = tokens?.$metadata?.source || (design?.meta?.url ?? '');
  const header = `/*
Theme Name: designlang extracted theme
Theme URI: https://github.com/Manavarya09/design-extract
Description: Block theme generated from ${source} by designlang v${HEADER_VERSION}
Version: 1.0.0
Author: designlang
License: MIT
Text Domain: designlang-theme
*/
`;
  const lines = [header, ':root {'];
  for (const c of collectWpColors(tokens)) {
    lines.push(`  --${c.slug}: ${c.color};`);
  }
  for (const s of collectWpSpacing(tokens)) {
    lines.push(`  --spacing-${s.slug}: ${s.size};`);
  }
  lines.push('}');
  return lines.join('\n') + '\n';
}

function buildFunctionsPhp() {
  return `<?php
if (!function_exists('designlang_theme_support')) {
  function designlang_theme_support() {
    add_theme_support('wp-block-styles');
    add_theme_support('editor-styles');
    add_theme_support('responsive-embeds');
  }
  add_action('after_setup_theme', 'designlang_theme_support');
}
`;
}

function buildIndexPhp() {
  return `<?php get_header(); get_template_part('template-parts/content'); get_footer(); ?>
`;
}

function buildIndexHtml() {
  return `<!-- wp:template-part {"slug":"header"} /-->
<!-- wp:group {"tagName":"main","layout":{"type":"constrained"}} -->
<main class="wp-block-group"><!-- wp:post-content /--></main>
<!-- /wp:group -->
<!-- wp:template-part {"slug":"footer"} /-->
`;
}

// Full block-theme skeleton. `design` is optional context for typography
// (font families, type scale) that isn't in the DTCG token tree yet.
export function formatWordPressTheme(tokens, design = {}) {
  return {
    'theme.json': buildThemeJson(tokens, design),
    'style.css': buildStyleCss(tokens, design),
    'functions.php': buildFunctionsPhp(),
    'index.php': buildIndexPhp(),
    'templates/index.html': buildIndexHtml(),
  };
}

export function formatWordPress(design) {
  const { colors, typography, spacing } = design;

  const theme = {
    $schema: "https://schemas.wp.org/trunk/theme.json",
    version: 3,
    settings: {
      color: {
        palette: [],
        gradients: [],
      },
      typography: {
        fontFamilies: [],
        fontSizes: [],
      },
      spacing: {
        spacingSizes: [],
      },
      layout: {
        contentSize: "1200px",
        wideSize: "1400px",
      },
    },
    styles: {
      color: {},
      typography: {},
      spacing: {},
    },
  };

  // Colors
  if (colors.primary) theme.settings.color.palette.push({ slug: 'primary', color: colors.primary.hex, name: 'Primary' });
  if (colors.secondary) theme.settings.color.palette.push({ slug: 'secondary', color: colors.secondary.hex, name: 'Secondary' });
  if (colors.accent) theme.settings.color.palette.push({ slug: 'accent', color: colors.accent.hex, name: 'Accent' });
  for (let i = 0; i < Math.min(colors.neutrals.length, 5); i++) {
    theme.settings.color.palette.push({ slug: `neutral-${i + 1}`, color: colors.neutrals[i].hex, name: `Neutral ${i + 1}` });
  }
  for (const bg of colors.backgrounds.slice(0, 3)) {
    theme.settings.color.palette.push({ slug: `bg-${bg.replace('#', '')}`, color: bg, name: `Background ${bg}` });
  }

  // Typography
  for (const fam of typography.families) {
    theme.settings.typography.fontFamilies.push({ fontFamily: fam.name, slug: fam.name.toLowerCase().replace(/\s+/g, '-'), name: fam.name });
  }
  for (const s of typography.scale.slice(0, 8)) {
    theme.settings.typography.fontSizes.push({ size: `${s.size}px`, slug: `size-${s.size}`, name: `${s.size}px` });
  }

  // Spacing
  for (let i = 0; i < Math.min(spacing.scale.length, 8); i++) {
    const val = spacing.scale[i];
    theme.settings.spacing.spacingSizes.push({ size: `${val}px`, slug: `spacing-${val}`, name: `${val}px` });
  }

  // Layout from extracted containers
  if (design.layout && design.layout.containerWidths.length > 0) {
    theme.settings.layout.contentSize = design.layout.containerWidths[0].maxWidth;
  }

  // Body styles
  if (typography.body) {
    theme.styles.typography.fontSize = `${typography.body.size}px`;
    theme.styles.typography.lineHeight = typography.body.lineHeight;
  }
  if (typography.families.length > 0) {
    theme.styles.typography.fontFamily = typography.families[0].name;
  }
  if (colors.backgrounds.length > 0) {
    theme.styles.color.background = colors.backgrounds[0];
  }
  if (colors.text.length > 0) {
    theme.styles.color.text = colors.text[0];
  }

  // Gradients from design
  if (design.gradients && design.gradients.gradients) {
    for (const g of design.gradients.gradients.slice(0, 5)) {
      theme.settings.color.gradients.push({ slug: `gradient-${theme.settings.color.gradients.length + 1}`, gradient: g.raw, name: `Gradient ${theme.settings.color.gradients.length + 1}` });
    }
  }

  return JSON.stringify(theme, null, 2);
}
