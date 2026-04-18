import { crawlPage } from './crawler.js';
import { extractColors } from './extractors/colors.js';
import { extractTypography } from './extractors/typography.js';
import { extractSpacing } from './extractors/spacing.js';
import { extractShadows } from './extractors/shadows.js';
import { extractBorders } from './extractors/borders.js';
import { extractVariables } from './extractors/variables.js';
import { extractBreakpoints } from './extractors/breakpoints.js';
import { extractAnimations } from './extractors/animations.js';
import { extractComponents } from './extractors/components.js';
import { extractAccessibility } from './extractors/accessibility.js';
import { extractLayout } from './extractors/layout.js';
import { scoreDesignSystem } from './extractors/scoring.js';
import { extractGradients } from './extractors/gradients.js';
import { extractZIndex } from './extractors/zindex.js';
import { extractIcons } from './extractors/icons.js';
import { extractFonts } from './extractors/fonts.js';
import { extractImageStyles } from './extractors/images.js';
import { extractStackFingerprint } from './extractors/stack-fingerprint.js';
import { extractCssHealth } from './extractors/css-health.js';
import { remediateFailingPairs } from './extractors/a11y-remediation.js';
import { extractSemanticRegions } from './extractors/semantic-regions.js';
import { clusterComponents } from './extractors/component-clusters.js';

function safeExtract(fn, ...args) {
  try { return fn(...args); } catch { return null; }
}

export async function extractDesignLanguage(url, options = {}) {
  const rawData = await crawlPage(url, {
    ...options,
    ignore: options.ignore,
  });
  const styles = rawData.light.computedStyles;
  const warnings = [];

  const design = {
    meta: {
      url: rawData.url,
      title: rawData.title,
      timestamp: new Date().toISOString(),
      elementCount: styles.length,
      pagesAnalyzed: rawData.pagesAnalyzed || 1,
    },
    colors: safeExtract(extractColors, styles) || { primary: null, secondary: null, accent: null, neutrals: [], backgrounds: [], text: [], gradients: [], all: [] },
    typography: safeExtract(extractTypography, styles) || { families: [], scale: [] },
    spacing: safeExtract(extractSpacing, styles) || { scale: [], base: null },
    shadows: safeExtract(extractShadows, styles) || { values: [] },
    borders: safeExtract(extractBorders, styles) || { radii: [] },
    variables: safeExtract(extractVariables, rawData.light.cssVariables) || {},
    breakpoints: safeExtract(extractBreakpoints, rawData.light.mediaQueries) || [],
    animations: safeExtract(extractAnimations, styles, rawData.light.keyframes) || { transitions: [], keyframes: [] },
    components: safeExtract(extractComponents, styles) || {},
    accessibility: safeExtract(extractAccessibility, styles) || { score: 0, failCount: 0 },
    layout: safeExtract(extractLayout, styles) || { gridCount: 0, flexCount: 0 },
    gradients: safeExtract(extractGradients, styles) || { count: 0 },
    zIndex: safeExtract(extractZIndex, styles) || { allValues: [], issues: [] },
    icons: rawData.light.icons ? (safeExtract(extractIcons, rawData.light.icons) || { icons: [], count: 0 }) : { icons: [], count: 0 },
    fonts: rawData.light.fontData ? (safeExtract(extractFonts, rawData.light.fontData) || { fonts: [], systemFonts: [] }) : { fonts: [], systemFonts: [] },
    images: rawData.light.images ? (safeExtract(extractImageStyles, rawData.light.images) || { patterns: [], aspectRatios: [] }) : { patterns: [], aspectRatios: [] },
    componentScreenshots: rawData.componentScreenshots || {},
    stack: safeExtract(extractStackFingerprint, rawData.light.stack) || { framework: 'unknown', css: { layer: 'unknown', tailwind: null }, analytics: [], detectedFrom: { globalCount: 0, scriptCount: 0, classSampleSize: 0 } },
    cssHealth: safeExtract(extractCssHealth, rawData.light.cssCoverage) || null,
    regions: safeExtract(extractSemanticRegions, rawData.light.sections) || [],
    componentClusters: safeExtract(clusterComponents, rawData.light.componentCandidates) || [],
    score: null,
  };

  // Track which extractors failed
  const extractorChecks = [
    ['colors', design.colors], ['typography', design.typography], ['spacing', design.spacing],
    ['shadows', design.shadows], ['borders', design.borders], ['variables', design.variables],
    ['breakpoints', design.breakpoints], ['animations', design.animations], ['components', design.components],
    ['accessibility', design.accessibility], ['layout', design.layout], ['gradients', design.gradients],
    ['zIndex', design.zIndex],
  ];
  for (const [name, result] of extractorChecks) {
    if (result === null) warnings.push(`${name} extractor failed`);
  }
  design.warnings = warnings;

  if (rawData.dark) {
    design.darkMode = {
      colors: safeExtract(extractColors, rawData.dark.computedStyles) || { primary: null, secondary: null, accent: null, neutrals: [], backgrounds: [], text: [], gradients: [], all: [] },
      variables: safeExtract(extractVariables, rawData.dark.cssVariables) || {},
    };
  }

  // A11y remediation: derive failing pairs from accessibility extractor output
  // and propose palette colors that pass the matching WCAG rule.
  try {
    const a11y = design.accessibility || {};
    const palette = (design.colors?.all || []).map(c => c.hex).filter(Boolean);
    const failingPairs = (a11y.pairs || [])
      .filter(p => p.level === 'FAIL')
      .map(p => ({
        fg: p.foreground,
        bg: p.background,
        ratio: p.ratio,
        rule: p.isLargeText ? 'AA-large' : 'AA-normal',
      }));
    design.accessibility = {
      ...a11y,
      failingPairs,
      remediation: remediateFailingPairs(failingPairs, palette),
    };
  } catch { /* non-fatal */ }

  design.score = safeExtract(scoreDesignSystem, design);
  if (design.score === null) warnings.push('scoring failed');

  return design;
}

export { crawlPage } from './crawler.js';
export { formatTokens } from './formatters/tokens.js';
export { formatDtcgTokens } from './formatters/dtcg-tokens.js';
export { formatMarkdown } from './formatters/markdown.js';
export { formatTailwind } from './formatters/tailwind.js';
export { formatCssVars } from './formatters/css-vars.js';
export { formatPreview } from './formatters/preview.js';
export { formatFigma } from './formatters/figma.js';
export { formatReactTheme, formatShadcnTheme } from './formatters/theme.js';
export { formatWordPress } from './formatters/wordpress.js';
export { formatVueTheme } from './formatters/vue-theme.js';
export { formatSvelteTheme } from './formatters/svelte-theme.js';
export { diffDesigns, formatDiffMarkdown, formatDiffHtml } from './diff.js';
export { saveSnapshot, getHistory, formatHistoryMarkdown } from './history.js';
export { captureResponsive } from './extractors/responsive.js';
export { captureInteractions } from './extractors/interactions.js';
export { syncDesign } from './sync.js';
export { compareBrands, formatBrandMatrix, formatBrandMatrixHtml } from './multibrand.js';
export { generateClone } from './clone.js';
export { scoreDesignSystem } from './extractors/scoring.js';
export { watchSite } from './watch.js';
export { diffDarkMode } from './darkdiff.js';
export { applyDesign } from './apply.js';
export { loadConfig, mergeConfig } from './config.js';
