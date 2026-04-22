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
import { extractModernCss } from './extractors/modern-css.js';
import { extractWideGamut } from './extractors/wide-gamut.js';
import { extractTokenSources } from './extractors/token-sources.js';
import { extractInteractionStates } from './extractors/interaction-states.js';
import { extractMotion } from './extractors/motion.js';
import { extractComponentAnatomy, formatAnatomyStubs } from './extractors/component-anatomy.js';
import { extractVoice } from './extractors/voice.js';
import { extractPageIntent } from './extractors/page-intent.js';
import { extractSectionRoles } from './extractors/section-roles.js';
import { extractComponentLibrary } from './extractors/component-library.js';
import { extractMaterialLanguage } from './extractors/material-language.js';
import { extractImageryStyle } from './extractors/imagery-style.js';
import { formatDtcgTokens } from './formatters/dtcg-tokens.js';
import { formatMotionTokens } from './formatters/motion-tokens.js';

function safeExtract(fn, ...args) {
  try { return fn(...args); } catch { return null; }
}

export async function extractDesignLanguage(url, options = {}) {
  const rawData = await crawlPage(url, {
    ...options,
    ignore: options.ignore,
    deepInteract: options.deepInteract,
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
    modernCss: safeExtract(extractModernCss, rawData) || { pseudoElements: { count: 0, samples: [] }, variableFonts: { count: 0, axes: [] }, openTypeFeatures: [], textWrap: { wrap: [], decorationStyle: [], decorationThickness: [], underlineOffset: [] }, containerQueries: { count: 0, rules: [] }, envUsage: [] },
    wideGamut: safeExtract(extractWideGamut, rawData.light.modernColors || []) || { oklch: { count: 0, samples: [] }, oklab: { count: 0, samples: [] }, colorMix: { count: 0, samples: [] }, lightDark: { count: 0, samples: [] }, displayP3: { count: 0, samples: [] }, rec2020: { count: 0, samples: [] }, totalCount: 0 },
    tokenSources: [],
    interactionStates: safeExtract(extractInteractionStates, rawData.interactState || rawData.light.interactState) || { scrollSettled: false, menusOpened: 0, hover: { sampled: 0, changed: 0, deltas: [] }, accordionsOpened: 0, modals: [] },
    motion: safeExtract(extractMotion, styles, rawData.light.keyframes) || { durations: [], easings: [], springs: [], keyframes: [], scrollLinked: { present: false, signals: [] }, stats: {}, feel: 'unknown' },
    componentAnatomy: safeExtract(extractComponentAnatomy, rawData.light.componentCandidates) || [],
    voice: safeExtract(extractVoice, { componentCandidates: rawData.light.componentCandidates, sections: rawData.light.sections }) || { tone: 'neutral', ctaVerbs: [], buttonPatterns: [], sampleHeadings: [] },
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

  design.tokenSources = safeExtract(extractTokenSources, design, styles) || [];

  // v10: page intent, section roles, component library, material language,
  // imagery style. All additive — no existing field is modified.
  design.pageIntent = safeExtract(extractPageIntent, rawData, { url: rawData.url, title: rawData.title }) || { type: 'unknown', confidence: 0, signals: [] };
  design.sectionRoles = safeExtract(extractSectionRoles, rawData.light?.sections || [], design.regions, design.pageIntent) || { sections: [], counts: {}, readingOrder: [] };
  design.componentLibrary = safeExtract(extractComponentLibrary, rawData.light?.stack || {}) || { library: 'unknown', confidence: 0, evidence: [], alternates: [] };
  design.materialLanguage = safeExtract(extractMaterialLanguage, design) || { label: 'flat', confidence: 0, signals: [], metrics: {} };
  design.imageryStyle = safeExtract(extractImageryStyle, rawData.light?.images || []) || { label: 'none', confidence: 0, counts: {}, signals: [] };
  // Stash raw crawler output so downstream orchestration (multipage, smart)
  // can rebuild the digest without re-crawling.
  design._raw = rawData;

  // Per-route token extraction (Tier 2 multi-page reconciliation).
  if (Array.isArray(rawData.routes) && rawData.routes.length > 0) {
    design.routes = rawData.routes.map(r => {
      const rStyles = r.computedStylesSample || [];
      const rDesign = {
        meta: { url: r.url },
        colors: safeExtract(extractColors, rStyles) || { all: [], neutrals: [], backgrounds: [], text: [], gradients: [] },
        typography: safeExtract(extractTypography, rStyles) || { families: [], scale: [] },
        spacing: safeExtract(extractSpacing, rStyles) || { scale: [], base: null },
        shadows: safeExtract(extractShadows, rStyles) || { values: [] },
        borders: safeExtract(extractBorders, rStyles) || { radii: [] },
      };
      const tokens = safeExtract(formatDtcgTokens, rDesign) || { primitive: {}, semantic: {} };
      return { url: r.url, path: r.path, tokens };
    });
  }

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
export { extractMotion } from './extractors/motion.js';
export { formatMotionTokens } from './formatters/motion-tokens.js';
export { extractComponentAnatomy, formatAnatomyStubs } from './extractors/component-anatomy.js';
export { extractVoice } from './extractors/voice.js';
export { lintTokens } from './lint.js';
export { checkDrift, formatDriftMarkdown } from './drift.js';
export { visualDiff, formatVisualDiffHtml } from './visual-diff.js';
// v10
export { extractPageIntent } from './extractors/page-intent.js';
export { extractSectionRoles } from './extractors/section-roles.js';
export { extractComponentLibrary } from './extractors/component-library.js';
export { extractMaterialLanguage } from './extractors/material-language.js';
export { extractImageryStyle } from './extractors/imagery-style.js';
export { extractLogo } from './extractors/logo.js';
export { refineWithSmart } from './classifiers/smart.js';
export { crawlCanonicalPages, computeCrossPageConsistency, discoverCanonicalPages } from './multipage.js';
export { buildPromptPack, formatV0Prompt, formatLovablePrompt, formatCursorPrompt, formatClaudeArtifactPrompt } from './formatters/prompt-pack.js';
