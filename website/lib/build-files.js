// Shared file-builder used by /api/extract (streaming) and /x/[hash]
// (permalink page). Pure function over a `design` object.

import { formatMarkdown } from '../../src/formatters/markdown.js';
import { formatDesignMd } from '../../src/formatters/design-md.js';
import { formatTailwind } from '../../src/formatters/tailwind.js';
import { formatTailwindV4 } from '../../src/formatters/tailwind-v4.js';
import { formatCssVars } from '../../src/formatters/css-vars.js';
import { formatPreview } from '../../src/formatters/preview.js';
import { formatFigma } from '../../src/formatters/figma.js';
import { formatReactTheme, formatShadcnTheme } from '../../src/formatters/theme.js';
import { formatWordPress, formatWordPressTheme } from '../../src/formatters/wordpress.js';
import { formatDtcgTokens } from '../../src/formatters/dtcg-tokens.js';
import { formatIosSwiftUI } from '../../src/formatters/ios-swiftui.js';
import { formatAndroidCompose } from '../../src/formatters/android-compose.js';
import { formatFlutterDart } from '../../src/formatters/flutter-dart.js';
import { formatAgentRules } from '../../src/formatters/agent-rules.js';
import { formatBrandBook } from '../../src/formatters/brand-book.js';
import { nameFromUrl } from '../../src/utils.js';

export function buildFiles(design, targetUrl) {
  const prefix = nameFromUrl(targetUrl);
  const dtcg = formatDtcgTokens(design);
  const dtcgJson = JSON.stringify(dtcg, null, 2);

  const files = {
    [`${prefix}-DESIGN.md`]: formatDesignMd(design),
    [`${prefix}-design-language.md`]: formatMarkdown(design),
    [`${prefix}-design-tokens.json`]: dtcgJson,
    [`${prefix}-tailwind.config.js`]: formatTailwind(design),
    [`${prefix}-tailwind-v4.css`]:    formatTailwindV4(design),
    [`${prefix}-variables.css`]: formatCssVars(design),
    [`${prefix}-preview.html`]: formatPreview(design),
    [`${prefix}.brand.html`]: formatBrandBook(design),
    [`${prefix}-figma-variables.json`]: formatFigma(design),
    [`${prefix}-theme.js`]: formatReactTheme(design),
    [`${prefix}-shadcn-theme.css`]: formatShadcnTheme(design),
    [`${prefix}-wordpress-theme.json`]: formatWordPress(design),
  };

  files[`${prefix}-mcp.json`] = JSON.stringify({
    colors: { all: design.colors?.all || [] },
    regions: design.regions || [],
    componentClusters: design.componentClusters || [],
    accessibility: { remediation: design.accessibility?.remediation || [] },
    cssHealth: design.cssHealth || null,
  }, null, 2);

  files['ios/DesignTokens.swift'] = formatIosSwiftUI(dtcg);

  const android = formatAndroidCompose(dtcg);
  for (const name of Object.keys(android)) {
    files[`android/${name}`] = android[name];
  }

  files['flutter/design_tokens.dart'] = formatFlutterDart(dtcg);

  const wpTheme = formatWordPressTheme(dtcg, design);
  for (const name of Object.keys(wpTheme)) {
    files[`wordpress-theme/${name}`] = wpTheme[name];
  }

  const agentFiles = formatAgentRules({ design, tokens: dtcg, url: targetUrl });
  for (const name of Object.keys(agentFiles)) {
    files[name] = agentFiles[name];
  }

  return { files, dtcg, prefix };
}

export function buildSummary(design) {
  return {
    url: design.meta?.url,
    title: design.meta?.title,
    colors: design.colors?.all?.length ?? 0,
    colorList: (design.colors?.all || []).slice(0, 20).map((c) => c.hex),
    fonts: design.typography?.families?.map((f) => f.name).join(', ') || 'none detected',
    spacingCount: design.spacing?.scale?.length ?? 0,
    spacingBase: design.spacing?.base ?? null,
    shadowCount: design.shadows?.values?.length ?? 0,
    radiiCount: design.borders?.radii?.length ?? 0,
    componentCount: Object.keys(design.components || {}).length,
    cssVarCount: Object.values(design.variables || {}).reduce((s, v) => s + Object.keys(v).length, 0),
    a11yScore: design.accessibility?.score ?? null,
    a11yFailCount: design.accessibility?.failCount ?? 0,
    score: design.score,
  };
}
