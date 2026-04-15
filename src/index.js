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

export async function extractDesignLanguage(url, options = {}) {
  const rawData = await crawlPage(url, options);
  const styles = rawData.light.computedStyles;

  const design = {
    meta: {
      url: rawData.url,
      title: rawData.title,
      timestamp: new Date().toISOString(),
      elementCount: styles.length,
      pagesAnalyzed: rawData.pagesAnalyzed || 1,
    },
    colors: extractColors(styles),
    typography: extractTypography(styles),
    spacing: extractSpacing(styles),
    shadows: extractShadows(styles),
    borders: extractBorders(styles),
    variables: extractVariables(rawData.light.cssVariables),
    breakpoints: extractBreakpoints(rawData.light.mediaQueries),
    animations: extractAnimations(styles, rawData.light.keyframes),
    components: extractComponents(styles),
    accessibility: extractAccessibility(styles),
    componentScreenshots: rawData.componentScreenshots || {},
  };

  if (rawData.dark) {
    design.darkMode = {
      colors: extractColors(rawData.dark.computedStyles),
      variables: extractVariables(rawData.dark.cssVariables),
    };
  }

  return design;
}

export { crawlPage } from './crawler.js';
export { formatTokens } from './formatters/tokens.js';
export { formatMarkdown } from './formatters/markdown.js';
export { formatTailwind } from './formatters/tailwind.js';
export { formatCssVars } from './formatters/css-vars.js';
export { formatPreview } from './formatters/preview.js';
export { formatFigma } from './formatters/figma.js';
export { formatReactTheme, formatShadcnTheme } from './formatters/theme.js';
export { diffDesigns, formatDiffMarkdown, formatDiffHtml } from './diff.js';
export { saveSnapshot, getHistory, formatHistoryMarkdown } from './history.js';
