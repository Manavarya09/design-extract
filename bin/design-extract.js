#!/usr/bin/env node

import { Command } from 'commander';
import { mkdirSync, writeFileSync, readFileSync } from 'fs';
import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PKG_VERSION = JSON.parse(readFileSync(resolve(__dirname, '..', 'package.json'), 'utf-8')).version;
import chalk from 'chalk';
import ora from 'ora';
import { extractDesignLanguage } from '../src/index.js';
import { refineWithSmart } from '../src/classifiers/smart.js';
import { crawlCanonicalPages } from '../src/multipage.js';
import { extractLogo } from '../src/extractors/logo.js';
import { captureComponentScreenshotsV10 } from '../src/extractors/component-screenshots.js';
import { pairDarkMode } from '../src/extractors/dark-mode-pair.js';
import { captureResponsiveScreenshots } from '../src/extractors/responsive-screenshots.js';
import { captureCoreWebVitals, extractFontLoading } from '../src/extractors/perf.js';
import { buildPromptPack } from '../src/formatters/prompt-pack.js';
import { formatMarkdown } from '../src/formatters/markdown.js';
import { formatTokens } from '../src/formatters/tokens.js';
import { formatDtcgTokens } from '../src/formatters/dtcg-tokens.js';
import { formatTailwind } from '../src/formatters/tailwind.js';
import { formatCssVars } from '../src/formatters/css-vars.js';
import { formatPreview } from '../src/formatters/preview.js';
import { formatFigma } from '../src/formatters/figma.js';
import { formatReactTheme, formatShadcnTheme } from '../src/formatters/theme.js';
import { formatWordPress, formatWordPressTheme } from '../src/formatters/wordpress.js';
import { formatIosSwiftUI } from '../src/formatters/ios-swiftui.js';
import { formatAndroidCompose } from '../src/formatters/android-compose.js';
import { formatFlutterDart } from '../src/formatters/flutter-dart.js';
import { formatVueTheme } from '../src/formatters/vue-theme.js';
import { formatSvelteTheme } from '../src/formatters/svelte-theme.js';
import { formatAgentRules } from '../src/formatters/agent-rules.js';
import { reconcileRoutes, formatRoutesReport } from '../src/formatters/routes-reconciliation.js';
import { loadConfig, mergeConfig } from '../src/config.js';
import { diffDesigns, formatDiffMarkdown, formatDiffHtml } from '../src/diff.js';
import { saveSnapshot, getHistory, formatHistoryMarkdown } from '../src/history.js';
import { captureResponsive } from '../src/extractors/responsive.js';
import { captureInteractions } from '../src/extractors/interactions.js';
import { syncDesign } from '../src/sync.js';
import { compareBrands, formatBrandMatrix, formatBrandMatrixHtml } from '../src/multibrand.js';
import { generateClone } from '../src/clone.js';
import { watchSite } from '../src/watch.js';
import { diffDarkMode } from '../src/darkdiff.js';
import { applyDesign } from '../src/apply.js';
import { formatGrade, formatGradeMarkdown } from '../src/formatters/grade.js';
import { nameFromUrl } from '../src/utils.js';

function validateUrl(url) {
  try { new URL(url); } catch {
    console.error(chalk.red(`\n  Invalid URL: ${url}\n`));
    console.error(chalk.gray('  Example: designlang https://example.com\n'));
    process.exit(1);
  }
}

const program = new Command();

program
  .name('designlang')
  .description('Extract the complete design language from any website')
  .version(PKG_VERSION);

// ── Main command: extract ──────────────────────────────────────
program
  .argument('<url>', 'URL to extract design language from')
  .option('-o, --out <dir>', 'output directory', './design-extract-output')
  .option('-n, --name <name>', 'output file prefix (default: derived from URL)')
  .option('-w, --width <px>', 'viewport width', parseInt, 1280)
  .option('--height <px>', 'viewport height', parseInt, 800)
  .option('--wait <ms>', 'wait after page load (ms)', parseInt, 0)
  .option('--dark', 'also extract dark mode styles')
  .option('--depth <n>', 'number of internal pages to also crawl', parseInt, 0)
  .option('--screenshots', 'capture component screenshots')
  .option('--framework <type>', 'generate framework theme (react, shadcn, vue, svelte)')
  .option('--responsive', 'capture design at multiple breakpoints')
  .option('--interactions', 'capture hover/focus/active states')
  .option('--deep-interact', 'auto-interact pass: scroll, open menus/modals/accordions, hover CTAs (implies --interactions)')
  .option('--full', 'enable all extra captures (screenshots, responsive, interactions, deep-interact)')
  .option('--cookie <cookies...>', 'cookies for authenticated pages (name=value)')
  .option('--cookie-file <path>', 'load cookies from JSON, Playwright storageState, or Netscape cookies.txt')
  .option('--header <headers...>', 'custom headers (name:value)')
  .option('--user-agent <ua>', 'override the browser User-Agent string')
  .option('--insecure', 'ignore HTTPS/SSL certificate errors (self-signed, dev, proxies)')
  .option('--ignore <selectors...>', 'CSS selectors to remove before extraction')
  .option('--ignore-widgets', 'Also ignore a curated list of third-party widgets (Intercom, Drift, HubSpot chat, cookie banners, reCAPTCHA, etc.)  See `designlang widgets`.')
  .option('--storybook', 'Emit a runnable Storybook project (stories/, .storybook/, package.json) alongside the extraction')
  .option('--selector <css>', 'only extract design from elements matching this CSS selector (e.g. ".pricing-card")')
  .option('--system-chrome', 'use the system Chrome install instead of the bundled Chromium (skips the 150MB Playwright download)')
  .option('--tokens-legacy', 'Emit pre-v7 flat token JSON (backward compat)')
  .option('--platforms <csv>', 'Additional platforms: web,ios,android,flutter,wordpress,all (web is always emitted)', 'web')
  .option('--emit-agent-rules', 'Emit Cursor/Claude Code/generic agent rules')
  .option('--smart', 'use optional LLM fallback when heuristic classifiers have low confidence (needs OPENAI_API_KEY or ANTHROPIC_API_KEY)')
  .option('--pages <n>', 'crawl N canonical pages (pricing/docs/blog/about/product) in addition to the homepage', parseInt)
  .option('--no-prompts', 'skip writing the prompt-pack directory')
  .option('--no-design-md', 'skip writing the agent-native DESIGN.md (single-file, 8-section, YAML front matter)')
  .option('--responsive-shots', 'capture full-page PNGs at 4 breakpoints × (light,dark)')
  .option('--perf', 'measure Core Web Vitals + bundle profile (LCP/CLS/INP, JS/CSS/font/img bytes, third-party count)')
  .option('--json', 'output raw JSON to stdout (for CI/CD)')
  .option('--json-pretty', 'output formatted JSON to stdout')
  .option('--no-history', 'skip saving to history')
  .option('--verbose', 'show detailed progress')
  .option('-q, --quiet', 'suppress output except file paths')
  .action(async (url, opts) => {
    if (!url.startsWith('http')) url = `https://${url}`;

    // Load config file and merge with CLI opts
    const config = loadConfig();
    const merged = mergeConfig(opts, config);

    if (merged.ignoreWidgets || opts.ignoreWidgets) {
      const { widgetIgnoreList } = await import('../src/widgets.js');
      merged.ignore = [...(merged.ignore || []), ...widgetIgnoreList()];
    }

    // Validate URL
    validateUrl(url);

    // Validate numeric options
    if (isNaN(merged.width) || merged.width < 100) {
      console.error(chalk.red('\n  Invalid width. Must be >= 100\n'));
      process.exit(1);
    }
    if (merged.depth < 0 || merged.depth > 50) {
      console.error(chalk.red('\n  Invalid depth. Must be 0-50\n'));
      process.exit(1);
    }

    const prefix = opts.name || nameFromUrl(url);
    const outDir = resolve(merged.out);

    const jsonMode = opts.json || opts.jsonPretty;
    const startTime = Date.now();

    if (!jsonMode && !opts.quiet) {
      console.log('');
      console.log(chalk.bold('  designlang'));
      console.log(chalk.gray(`  ${url}${merged.depth > 0 ? ` (+ ${merged.depth} pages)` : ''}`));
      console.log('');
    }

    const spinner = jsonMode || opts.quiet
      ? { start() { return this; }, set text(v) {}, succeed() {}, fail() {}, info() {}, stop() {} }
      : ora('Launching browser...').start();

    try {
      spinner.text = `Crawling${merged.depth > 0 ? ` (depth: ${merged.depth})` : ''}...`;
      // Parse auth options
      const cliCookies = merged.cookie || [];
      const fileCookies = [];
      if (merged.cookieFile) {
        try {
          const { loadCookiesFromFile } = await import('../src/utils-cookies.js');
          fileCookies.push(...loadCookiesFromFile(resolve(merged.cookieFile), url));
        } catch (e) {
          console.error(chalk.red(`\n  cookie-file load failed: ${e.message}\n`));
          process.exit(1);
        }
      }
      const { mergeCookies } = await import('../src/utils-cookies.js');
      const cookies = mergeCookies(cliCookies, fileCookies, url);
      const headers = {};
      if (merged.header) {
        for (const h of merged.header) {
          const [name, ...rest] = h.split(':');
          if (name && rest.length) headers[name.trim()] = rest.join(':').trim();
        }
      }

      const design = await extractDesignLanguage(url, {
        width: merged.width,
        height: parseInt(merged.height) || 800,
        wait: merged.wait,
        dark: merged.dark,
        depth: merged.depth,
        screenshots: merged.screenshots || merged.full,
        outDir,
        ignore: merged.ignore,
        cookies: cookies.length > 0 ? cookies : undefined,
        headers: Object.keys(headers).length > 0 ? headers : undefined,
        insecure: merged.insecure || false,
        userAgent: merged.userAgent,
        deepInteract: merged.deepInteract || merged.full,
        selector: merged.selector,
        channel: merged.systemChrome ? 'chrome' : undefined,
      });

      // Responsive capture
      if (merged.responsive || merged.full) {
        spinner.text = 'Capturing responsive breakpoints...';
        design.responsive = await captureResponsive(url, { wait: merged.wait });
      }

      // Interaction state capture
      if (merged.interactions || merged.full) {
        spinner.text = 'Capturing interaction states...';
        design.interactions = await captureInteractions(url, { width: merged.width, height: parseInt(merged.height) || 800, wait: merged.wait });
      }

      // v10: optional LLM refinement for low-confidence classifiers.
      if (merged.smart) {
        spinner.text = 'Refining classifiers with smart mode...';
        try {
          const refined = await refineWithSmart({
            enabled: true,
            rawData: design._raw,
            design,
            pageIntent: design.pageIntent,
            sectionRoles: design.sectionRoles,
            materialLanguage: design.materialLanguage,
            componentLibrary: design.componentLibrary,
          });
          if (refined.applied) {
            if (refined.updates?.pageIntent) design.pageIntent = { ...design.pageIntent, ...refined.updates.pageIntent };
            if (refined.updates?.materialLanguage) design.materialLanguage = { ...design.materialLanguage, ...refined.updates.materialLanguage };
            if (refined.updates?.componentLibrary) design.componentLibrary = { ...design.componentLibrary, ...refined.updates.componentLibrary };
            design._smart = { provider: refined.provider, errors: refined.errors };
          } else {
            design._smart = { skipped: refined.reason };
          }
        } catch (e) { design._smart = { error: e.message }; }
      }

      // v10: logo extraction via a fresh Playwright session.
      if (merged.full || merged.screenshots) {
        spinner.text = 'Extracting logo...';
        try {
          const { chromium } = await import('playwright');
          const browser = await chromium.launch({ headless: true, ...(merged.systemChrome && { channel: 'chrome' }) });
          const ctx = await browser.newContext({ viewport: { width: merged.width, height: parseInt(merged.height) || 800 } });
          const lp = await ctx.newPage();
          await lp.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 }).catch(() => {});
          await lp.waitForLoadState('networkidle').catch(() => {});
          mkdirSync(outDir, { recursive: true });
          design.logo = await extractLogo(lp, outDir, prefix);
          await browser.close();
        } catch (e) { design.logo = { found: false, error: e.message }; }
      }

      // v10.1: cluster-aware retina component screenshots.
      if (merged.full || merged.screenshots) {
        spinner.text = 'Capturing component screenshots (retina)...';
        try {
          design.componentScreenshots = await captureComponentScreenshotsV10(url, outDir, {
            width: merged.width,
            height: parseInt(merged.height) || 800,
            channel: merged.systemChrome ? 'chrome' : undefined,
          });
        } catch (e) { design.componentScreenshots = { error: e.message }; }
      }

      // v10.2: dark-mode pairing (pure, based on already-extracted data).
      design.darkModePaired = pairDarkMode(design);

      // v10.3: Core Web Vitals + bundle profile.
      if (merged.full || merged.perf) {
        spinner.text = 'Measuring Core Web Vitals...';
        try {
          design.perf = await captureCoreWebVitals(url, {
            width: merged.width,
            height: parseInt(merged.height) || 800,
            channel: merged.systemChrome ? 'chrome' : undefined,
          });
          design.perf.fontLoading = extractFontLoading(design._raw?.light?.stack || {});
        } catch (e) { design.perf = { error: e.message }; }
      }

      // v10.2: responsive screenshots at 4 breakpoints × (light, dark).
      if (merged.full || merged.responsiveShots) {
        spinner.text = 'Capturing responsive screenshots...';
        try {
          design.responsiveShots = await captureResponsiveScreenshots(url, outDir, {
            includeDark: merged.dark || merged.full,
            channel: merged.systemChrome ? 'chrome' : undefined,
          });
        } catch (e) { design.responsiveShots = { error: e.message }; }
      }

      // v10: multi-page canonical crawl (pricing/docs/blog/about/product).
      const pagesArg = merged.pages != null ? merged.pages : (merged.full ? 5 : 0);
      if (pagesArg > 0) {
        spinner.text = `Crawling ${pagesArg} canonical pages...`;
        try {
          const mp = await crawlCanonicalPages({
            homepageUrl: url,
            homepageRawData: design._raw,
            maxPages: pagesArg,
            crawlerOptions: { width: merged.width, height: parseInt(merged.height) || 800 },
            extract: (u, o) => extractDesignLanguage(u, o),
          });
          design.multiPage = mp;
        } catch (e) { design.multiPage = { error: e.message }; }
      }

      // Drop the internal raw stash before JSON/output serialization.
      delete design._raw;

      // JSON mode: output and exit
      if (jsonMode) {
        const output = opts.jsonPretty ? JSON.stringify(design, null, 2) : JSON.stringify(design);
        process.stdout.write(output + '\n');
        process.exit(0);
      }

      spinner.text = 'Generating outputs...';
      mkdirSync(outDir, { recursive: true });

      const files = [
        { name: `${prefix}-design-language.md`, content: formatMarkdown(design), label: 'Markdown (AI-optimized)' },
        { name: `${prefix}-design-tokens.json`, content: merged.tokensLegacy ? formatTokens(design) : JSON.stringify(formatDtcgTokens(design), null, 2), label: merged.tokensLegacy ? 'Design Tokens (legacy)' : 'Design Tokens (DTCG v1)' },
        { name: `${prefix}-tailwind.config.js`, content: formatTailwind(design), label: 'Tailwind Config' },
        { name: `${prefix}-variables.css`, content: formatCssVars(design), label: 'CSS Variables' },
        { name: `${prefix}-preview.html`, content: formatPreview(design), label: 'Visual Preview' },
        { name: `${prefix}-figma-variables.json`, content: formatFigma(design), label: 'Figma Variables' },
      ];

      // Framework-specific themes
      if (merged.framework === 'react') {
        files.push({ name: `${prefix}-theme.js`, content: formatReactTheme(design), label: 'React Theme' });
      } else if (merged.framework === 'shadcn') {
        files.push({ name: `${prefix}-shadcn-theme.css`, content: formatShadcnTheme(design), label: 'shadcn/ui Theme' });
      } else if (merged.framework === 'vue') {
        files.push({ name: `${prefix}-vue-theme.js`, content: formatVueTheme(design), label: 'Vue/Vuetify Theme' });
      } else if (merged.framework === 'svelte') {
        files.push({ name: `${prefix}-svelte-theme.css`, content: formatSvelteTheme(design), label: 'Svelte Theme' });
      } else {
        // Generate both by default
        files.push({ name: `${prefix}-theme.js`, content: formatReactTheme(design), label: 'React Theme' });
        files.push({ name: `${prefix}-shadcn-theme.css`, content: formatShadcnTheme(design), label: 'shadcn/ui Theme' });
      }

      // WordPress theme (always generated)
      files.push({ name: `${prefix}-wordpress-theme.json`, content: formatWordPress(design), label: 'WordPress Theme' });

      // MCP companion — the subset of `design` the MCP server serves when a
      // user runs `designlang mcp --output-dir <dir>` later.
      const mcpPayload = {
        colors: { all: design.colors?.all || [] },
        regions: design.regions || [],
        componentClusters: design.componentClusters || [],
        accessibility: { remediation: design.accessibility?.remediation || [] },
        cssHealth: design.cssHealth || null,
      };
      files.push({ name: `${prefix}-mcp.json`, content: JSON.stringify(mcpPayload, null, 2), label: 'MCP companion' });

      // v9: motion tokens + component anatomy stubs + voice
      const { formatMotionTokens } = await import('../src/formatters/motion-tokens.js');
      const { formatAnatomyStubs } = await import('../src/extractors/component-anatomy.js');
      files.push({ name: `${prefix}-motion-tokens.json`, content: formatMotionTokens(design.motion), label: 'Motion Tokens' });
      if ((design.componentAnatomy || []).length) {
        files.push({ name: `${prefix}-anatomy.tsx`, content: formatAnatomyStubs(design.componentAnatomy), label: 'Component Anatomy (stubs)' });
      }
      files.push({ name: `${prefix}-voice.json`, content: JSON.stringify(design.voice || {}, null, 2), label: 'Brand Voice' });

      // v11.2: agent-native single-file DESIGN.md (compatible with the
      // 8-canonical-section convention; default-on, opt-out via --no-design-md).
      if (merged.designMd !== false) {
        const { formatDesignMd } = await import('../src/formatters/design-md.js');
        files.push({ name: `${prefix}-DESIGN.md`, content: formatDesignMd(design), label: 'DESIGN.md (agent-native)' });
      }

      // v10: page intent + section roles + visual DNA + component library + multi-page + prompt pack.
      files.push({ name: `${prefix}-intent.json`, content: JSON.stringify({ pageIntent: design.pageIntent, sectionRoles: design.sectionRoles }, null, 2), label: 'Page Intent + Section Roles' });
      files.push({ name: `${prefix}-visual-dna.json`, content: JSON.stringify({ materialLanguage: design.materialLanguage, imageryStyle: design.imageryStyle, backgroundPatterns: design.backgroundPatterns }, null, 2), label: 'Visual DNA' });
      files.push({ name: `${prefix}-library.json`, content: JSON.stringify(design.componentLibrary || {}, null, 2), label: 'Component Library Detection' });
      if (design.logo && design.logo.found) {
        files.push({ name: `${prefix}-logo.json`, content: JSON.stringify(design.logo, null, 2), label: 'Logo Metadata' });
      }
      if (design.multiPage) {
        files.push({ name: `${prefix}-multipage.json`, content: JSON.stringify(design.multiPage, null, 2), label: 'Multi-Page Crawl' });
      }
      if (design.componentScreenshots && (design.componentScreenshots.components || []).length) {
        files.push({ name: `${prefix}-screenshots.json`, content: JSON.stringify(design.componentScreenshots, null, 2), label: 'Component Screenshots index' });
      }
      if (design.darkModePaired && design.darkModePaired.available) {
        files.push({ name: `${prefix}-dark-mode.json`, content: JSON.stringify(design.darkModePaired, null, 2), label: 'Dark Mode Pairing' });
      }
      if (design.responsiveShots && Array.isArray(design.responsiveShots.shots) && design.responsiveShots.shots.length) {
        files.push({ name: `${prefix}-responsive.json`, content: JSON.stringify(design.responsiveShots, null, 2), label: 'Responsive Screenshots index' });
      }
      if (design.seo) {
        files.push({ name: `${prefix}-seo.json`, content: JSON.stringify(design.seo, null, 2), label: 'SEO + Structured Data' });
      }
      if (design.perf && !design.perf.error) {
        files.push({ name: `${prefix}-perf.json`, content: JSON.stringify(design.perf, null, 2), label: 'Perf + Bundle' });
      }
      if (design.iconSystem && (design.iconSystem.icons || []).length) {
        files.push({ name: `${prefix}-icon-system.json`, content: JSON.stringify(design.iconSystem, null, 2), label: 'Icon System' });
      }
      if (design.stackIntel) {
        files.push({ name: `${prefix}-stack-intel.json`, content: JSON.stringify(design.stackIntel, null, 2), label: 'Stack Intel (CMS/analytics/experimentation)' });
      }
      if (design.formStates) {
        files.push({ name: `${prefix}-form-states.json`, content: JSON.stringify(design.formStates, null, 2), label: 'Forms + States' });
      }
      if (merged.prompts !== false) {
        const pack = buildPromptPack(design);
        const promptsDir = join(outDir, `${prefix}-prompts`);
        mkdirSync(promptsDir, { recursive: true });
        writeFileSync(join(promptsDir, 'v0.txt'), pack['v0.txt'], 'utf-8');
        writeFileSync(join(promptsDir, 'lovable.txt'), pack['lovable.txt'], 'utf-8');
        writeFileSync(join(promptsDir, 'cursor.md'), pack['cursor.md'], 'utf-8');
        writeFileSync(join(promptsDir, 'claude-artifacts.md'), pack['claude-artifacts.md'], 'utf-8');
        for (const r of pack.recipes) {
          const slug = r.name.replace(/[^a-z0-9]+/gi, '-').toLowerCase() || 'component';
          writeFileSync(join(promptsDir, `recipe-${slug}.md`), r.content, 'utf-8');
        }
      }

      for (const file of files) {
        writeFileSync(join(outDir, file.name), file.content, 'utf-8');
      }

      // Multi-platform emission (v7.0). web is already emitted above.
      const platforms = merged.platforms || ['web'];
      const dtcgTokens = formatDtcgTokens(design);
      const platformFiles = [];
      if (platforms.includes('ios')) {
        const dir = join(outDir, 'ios');
        mkdirSync(dir, { recursive: true });
        const path = join(dir, 'DesignTokens.swift');
        writeFileSync(path, formatIosSwiftUI(dtcgTokens), 'utf-8');
        platformFiles.push({ path, label: 'iOS SwiftUI' });
      }
      if (platforms.includes('android')) {
        const dir = join(outDir, 'android');
        mkdirSync(dir, { recursive: true });
        const out = formatAndroidCompose(dtcgTokens);
        for (const name of Object.keys(out)) {
          const p = join(dir, name);
          writeFileSync(p, out[name], 'utf-8');
          platformFiles.push({ path: p, label: `Android (${name})` });
        }
      }
      if (platforms.includes('flutter')) {
        const dir = join(outDir, 'flutter');
        mkdirSync(dir, { recursive: true });
        const p = join(dir, 'design_tokens.dart');
        writeFileSync(p, formatFlutterDart(dtcgTokens), 'utf-8');
        platformFiles.push({ path: p, label: 'Flutter Dart' });
      }
      if (platforms.includes('wordpress')) {
        const dir = join(outDir, 'wordpress-theme');
        mkdirSync(dir, { recursive: true });
        const out = formatWordPressTheme(dtcgTokens, design);
        for (const name of Object.keys(out)) {
          const p = join(dir, name);
          mkdirSync(join(p, '..'), { recursive: true });
          writeFileSync(p, out[name], 'utf-8');
          platformFiles.push({ path: p, label: `WordPress (${name})` });
        }
      }

      // Multi-route token reconciliation (Tier 2). Only when --depth >= 1 and
      // the crawler actually returned per-route token data.
      if (merged.depth >= 1 && Array.isArray(design.routes) && design.routes.length > 0) {
        const reconciled = reconcileRoutes(design.routes);
        const sharedPath = join(outDir, `${prefix}-tokens-shared.json`);
        writeFileSync(sharedPath, JSON.stringify(reconciled.shared, null, 2), 'utf-8');
        platformFiles.push({ path: sharedPath, label: 'Shared tokens (multi-route)' });
        const routesDir = join(outDir, `${prefix}-tokens-routes`);
        mkdirSync(routesDir, { recursive: true });
        for (const [slug, entry] of Object.entries(reconciled.perRoute)) {
          const rp = join(routesDir, `${slug}.json`);
          writeFileSync(rp, JSON.stringify({ url: entry.url, path: entry.path, added: entry.added, changed: entry.changed }, null, 2), 'utf-8');
          platformFiles.push({ path: rp, label: `Route tokens (${slug})` });
        }
        const reportPath = join(outDir, `${prefix}-routes-report.md`);
        writeFileSync(reportPath, formatRoutesReport(reconciled), 'utf-8');
        platformFiles.push({ path: reportPath, label: 'Routes report (markdown)' });
      }

      // Agent rules (opt-in, also enabled by --full)
      if (merged.emitAgentRules || merged.full) {
        const agentFiles = formatAgentRules({ design, tokens: dtcgTokens, url });
        for (const rel of Object.keys(agentFiles)) {
          const p = join(outDir, rel);
          mkdirSync(join(p, '..'), { recursive: true });
          writeFileSync(p, agentFiles[rel], 'utf-8');
          platformFiles.push({ path: p, label: `Agent rules (${rel})` });
        }
      }

      // Storybook project (opt-in via --storybook)
      if (merged.storybook && Array.isArray(design.componentAnatomy) && design.componentAnatomy.length > 0) {
        const { formatStorybook } = await import('../src/formatters/storybook.js');
        const sbFiles = formatStorybook(design);
        const sbDir = join(outDir, `${prefix}-storybook`);
        mkdirSync(sbDir, { recursive: true });
        for (const [rel, content] of Object.entries(sbFiles)) {
          const p = join(sbDir, rel);
          mkdirSync(join(p, '..'), { recursive: true });
          writeFileSync(p, content, 'utf-8');
          platformFiles.push({ path: p, label: `Storybook (${rel})` });
        }
      }

      // Save to history
      if (opts.history !== false) {
        const histInfo = saveSnapshot(design);
        if (opts.verbose) spinner.info(`Snapshot #${histInfo.snapshotCount} saved for ${histInfo.hostname}`);
      }

      const duration = ((Date.now() - startTime) / 1000).toFixed(1);

      spinner.succeed('Extraction complete!');

      if (opts.quiet) {
        // Quiet mode: only show file paths
        for (const file of files) {
          console.log(join(outDir, file.name));
        }
        for (const pf of platformFiles) {
          console.log(pf.path);
        }
      } else {
        console.log('');
        console.log(chalk.bold('  Output files:'));
        for (const file of files) {
          const size = Buffer.byteLength(file.content);
          const sizeStr = size > 1024 ? `${(size / 1024).toFixed(1)}KB` : `${size}B`;
          console.log(`  ${chalk.green('✓')} ${chalk.cyan(file.name)} ${chalk.gray(`(${sizeStr})`)} — ${file.label}`);
        }
        for (const pf of platformFiles) {
          console.log(`  ${chalk.green('✓')} ${chalk.cyan(pf.path)} — ${pf.label}`);
        }
        if (opts.screenshots && design.componentScreenshots && Object.keys(design.componentScreenshots).length > 0) {
          for (const [, info] of Object.entries(design.componentScreenshots)) {
            console.log(`  ${chalk.green('✓')} ${chalk.cyan(info.path)} — ${info.label} screenshot`);
          }
        }
        console.log('');
        console.log(chalk.gray(`  Saved to ${outDir}`));

        // Summary
        console.log('');
        console.log(chalk.bold('  Summary:'));
        if (design.meta.pagesAnalyzed > 1) {
          console.log(`  ${chalk.gray('Pages:')} ${design.meta.pagesAnalyzed} pages analyzed`);
        }
        console.log(`  ${chalk.gray('Colors:')} ${design.colors.all.length} unique colors`);
        console.log(`  ${chalk.gray('Fonts:')} ${design.typography.families.map(f => f.name).join(', ') || 'none detected'}`);
        console.log(`  ${chalk.gray('Spacing:')} ${design.spacing.scale.length} values${design.spacing.base ? ` (base: ${design.spacing.base}px)` : ''}`);
        console.log(`  ${chalk.gray('Shadows:')} ${design.shadows.values.length} unique shadows`);
        console.log(`  ${chalk.gray('Radii:')} ${design.borders.radii.length} unique values`);
        console.log(`  ${chalk.gray('Breakpoints:')} ${design.breakpoints.length} breakpoints`);
        console.log(`  ${chalk.gray('Components:')} ${Object.keys(design.components).length} patterns detected`);
        console.log(`  ${chalk.gray('CSS Vars:')} ${Object.values(design.variables).reduce((s, v) => s + Object.keys(v).length, 0)} custom properties`);
        if (design.layout) {
          console.log(`  ${chalk.gray('Layout:')} ${design.layout.gridCount} grids, ${design.layout.flexCount} flex containers`);
        }
        if (design.responsive) {
          console.log(`  ${chalk.gray('Responsive:')} ${design.responsive.viewports.length} viewports, ${design.responsive.changes.length} breakpoint changes`);
        }
        if (design.interactions) {
          const ic = design.interactions;
          const total = ic.buttons.length + ic.links.length + ic.inputs.length;
          console.log(`  ${chalk.gray('Interactions:')} ${total} state changes captured`);
        }
        if (design.score) {
          const s = design.score;
          const gradeColor = s.grade === 'A' ? chalk.green : s.grade === 'B' ? chalk.cyan : s.grade === 'C' ? chalk.yellow : chalk.red;
          console.log(`  ${chalk.gray('Design Score:')} ${gradeColor(`${s.overall}/100 (${s.grade})`)}${s.issues.length > 0 ? ` — ${s.issues.length} issues` : ''}`);
        }

        // Score change vs last snapshot
        const history = getHistory(url);
        if (history.length > 1 && design.score) {
          const prev = history[history.length - 2];
          if (prev.score !== undefined) {
            const delta = design.score.overall - prev.score;
            if (delta !== 0) {
              const sign = delta > 0 ? '+' : '';
              const color = delta > 0 ? chalk.green : chalk.red;
              console.log(`  ${chalk.gray('Score \u0394:')} ${color(`${sign}${delta} from last scan`)}`);
            }
          }
        }

        // New v5 extractors
        if (design.gradients && design.gradients.count > 0) {
          console.log(`  ${chalk.gray('Gradients:')} ${design.gradients.count} unique gradients`);
        }
        if (design.zIndex && design.zIndex.allValues.length > 0) {
          console.log(`  ${chalk.gray('Z-Index:')} ${design.zIndex.allValues.length} layers${design.zIndex.issues.length > 0 ? ` (${design.zIndex.issues.length} issues)` : ''}`);
        }
        if (design.icons && design.icons.count > 0) {
          console.log(`  ${chalk.gray('Icons:')} ${design.icons.count} SVG icons (${design.icons.dominantStyle || 'mixed'})`);
        }
        if (design.fonts && design.fonts.fonts.length > 0) {
          const sources = design.fonts.fonts.map(f => f.source).filter((v, i, a) => a.indexOf(v) === i);
          console.log(`  ${chalk.gray('Font Files:')} ${design.fonts.fonts.length} fonts (${sources.join(', ')})`);
        }
        if (design.images && design.images.patterns.length > 0) {
          const total = design.images.patterns.reduce((s, p) => s + p.count, 0);
          console.log(`  ${chalk.gray('Images:')} ${total} images, ${design.images.patterns.length} style patterns`);
        }

        // Accessibility summary
        if (design.accessibility) {
          const a = design.accessibility;
          const scoreColor = a.score >= 80 ? chalk.green : a.score >= 50 ? chalk.yellow : chalk.red;
          console.log(`  ${chalk.gray('A11y:')} ${scoreColor(`${a.score}% WCAG score`)} (${a.failCount} failing pairs)`);
        }

        console.log(chalk.gray(`  Completed in ${duration}s`));
        console.log('');
      }

    } catch (err) {
      if (jsonMode) {
        process.stderr.write(JSON.stringify({ error: err.message }) + '\n');
        process.exit(1);
      }
      spinner.fail('Extraction failed');
      if (err.message.includes('playwright')) {
        console.error(chalk.red('\n  Playwright is not installed.'));
        console.error(chalk.gray('  Run: npx playwright install chromium\n'));
      } else {
        console.error(chalk.red(`\n  ${err.message}\n`));
        if (opts.verbose) console.error(err.stack);
      }
      process.exit(1);
    }
  });

// ── Diff command ──────────────────────────────────────────────
program
  .command('diff <urlA> <urlB>')
  .description('Compare design languages of two websites')
  .option('-o, --out <dir>', 'output directory', './design-diff-output')
  .action(async (urlA, urlB, opts) => {
    if (!urlA.startsWith('http')) urlA = `https://${urlA}`;
    if (!urlB.startsWith('http')) urlB = `https://${urlB}`;
    validateUrl(urlA);
    validateUrl(urlB);

    console.log('');
    console.log(chalk.bold('  designlang diff'));
    console.log(chalk.gray(`  ${urlA}`));
    console.log(chalk.gray(`  ${urlB}`));
    console.log('');

    const spinner = ora('Extracting Site A...').start();

    try {
      const designA = await extractDesignLanguage(urlA);
      spinner.text = 'Extracting Site B...';
      const designB = await extractDesignLanguage(urlB);

      spinner.text = 'Comparing...';
      const diff = diffDesigns(designA, designB);

      const outDir = resolve(opts.out);
      mkdirSync(outDir, { recursive: true });

      const mdContent = formatDiffMarkdown(diff);
      const htmlContent = formatDiffHtml(diff);

      writeFileSync(join(outDir, 'diff.md'), mdContent, 'utf-8');
      writeFileSync(join(outDir, 'diff.html'), htmlContent, 'utf-8');

      spinner.succeed('Comparison complete!');
      console.log('');
      console.log(`  ${chalk.green('✓')} ${chalk.cyan('diff.md')} — Markdown comparison`);
      console.log(`  ${chalk.green('✓')} ${chalk.cyan('diff.html')} — Visual comparison`);
      console.log('');
      console.log(chalk.gray(`  Saved to ${outDir}`));

      // Quick summary
      for (const s of diff.sections) {
        if (s.changed && s.changed.length > 0) {
          for (const c of s.changed) {
            console.log(`  ${chalk.yellow('≠')} ${s.name} — ${c.property}: ${c.a} → ${c.b}`);
          }
        }
      }
      console.log('');

    } catch (err) {
      spinner.fail('Comparison failed');
      console.error(chalk.red(`\n  ${err.message}\n`));
      process.exit(1);
    }
  });

// ── History command ──────────────────────────────────────────
program
  .command('history <url>')
  .description('View design history for a website')
  .action(async (url) => {
    if (!url.startsWith('http')) url = `https://${url}`;
    validateUrl(url);
    const history = getHistory(url);
    console.log('');
    console.log(formatHistoryMarkdown(url, history));
  });

// ── Brands command (multi-site comparison) ─────────────────
program
  .command('brands <urls...>')
  .description('Compare design languages across multiple brands')
  .option('-o, --out <dir>', 'output directory', './design-brands-output')
  .action(async (urls, opts) => {
    console.log('');
    console.log(chalk.bold('  designlang brands'));
    console.log(chalk.gray(`  Comparing ${urls.length} sites`));
    console.log('');

    const spinner = ora(`Extracting ${urls.length} sites...`).start();

    try {
      const brands = await compareBrands(urls);

      const outDir = resolve(opts.out);
      mkdirSync(outDir, { recursive: true });

      const md = formatBrandMatrix(brands);
      const html = formatBrandMatrixHtml(brands);

      writeFileSync(join(outDir, 'brands.md'), md, 'utf-8');
      writeFileSync(join(outDir, 'brands.html'), html, 'utf-8');

      spinner.succeed('Brand comparison complete!');
      console.log('');
      console.log(`  ${chalk.green('✓')} ${chalk.cyan('brands.md')} — Markdown matrix`);
      console.log(`  ${chalk.green('✓')} ${chalk.cyan('brands.html')} — Visual matrix`);
      console.log('');
      console.log(chalk.gray(`  Saved to ${outDir}`));

      // Quick summary
      const valid = brands.filter(b => !b.error);
      for (const b of valid) {
        console.log(`  ${chalk.cyan(b.hostname)}: ${b.design.colors.all.length} colors, ${b.design.typography.families.map(f => f.name).join(', ')}, ${b.design.accessibility?.score ?? '?'}% a11y`);
      }
      console.log('');

    } catch (err) {
      spinner.fail('Brand comparison failed');
      console.error(chalk.red(`\n  ${err.message}\n`));
      process.exit(1);
    }
  });

// ── Sync command ────────────────────────────────────────────
program
  .command('sync <url>')
  .description('Sync local design tokens with a live website')
  .option('-o, --out <dir>', 'directory with token files to update', '.')
  .action(async (url, opts) => {
    if (!url.startsWith('http')) url = `https://${url}`;
    validateUrl(url);

    console.log('');
    console.log(chalk.bold('  designlang sync'));
    console.log(chalk.gray(`  ${url}`));
    console.log('');

    const spinner = ora('Extracting current design...').start();

    try {
      const result = await syncDesign(url, { out: resolve(opts.out) });

      if (result.isFirstRun) {
        spinner.succeed('First sync — baseline saved.');
      } else if (result.changes.length === 0) {
        spinner.succeed('No design changes detected.');
      } else {
        spinner.succeed(`${result.changes.length} design changes detected!`);
        console.log('');
        for (const c of result.changes) {
          console.log(`  ${chalk.yellow('≠')} ${c.property}: ${c.from} → ${c.to}`);
        }
      }

      if (result.updatedFiles.length > 0) {
        console.log('');
        console.log(chalk.bold('  Updated files:'));
        for (const f of result.updatedFiles) {
          console.log(`  ${chalk.green('✓')} ${chalk.cyan(f)}`);
        }
      }
      console.log('');

    } catch (err) {
      spinner.fail('Sync failed');
      console.error(chalk.red(`\n  ${err.message}\n`));
      process.exit(1);
    }
  });

// ── Clone command ───────────────────────────────────────────
program
  .command('clone <url>')
  .description('Generate a working Next.js starter from a site\'s design')
  .option('-o, --out <dir>', 'output directory', './cloned-design')
  .action(async (url, opts) => {
    if (!url.startsWith('http')) url = `https://${url}`;
    validateUrl(url);

    console.log('');
    console.log(chalk.bold('  designlang clone'));
    console.log(chalk.gray(`  ${url}`));
    console.log('');

    const spinner = ora('Extracting design...').start();

    try {
      const design = await extractDesignLanguage(url);
      spinner.text = 'Generating Next.js project...';

      const result = generateClone(design, resolve(opts.out));

      spinner.succeed('Clone generated!');
      console.log('');
      for (const f of result.files) {
        console.log(`  ${chalk.green('✓')} ${chalk.cyan(f)}`);
      }
      console.log('');
      console.log(chalk.bold('  To run:'));
      console.log(chalk.gray(`  cd ${opts.out} && npm install && npm run dev`));
      console.log('');

    } catch (err) {
      spinner.fail('Clone failed');
      console.error(chalk.red(`\n  ${err.message}\n`));
      process.exit(1);
    }
  });

// ── Watch command ───────────────────────────────────────────
program
  .command('watch <url>')
  .description('Monitor a site for design changes')
  .option('--interval <minutes>', 'check interval in minutes', parseInt, 60)
  .action(async (url, opts) => {
    if (!url.startsWith('http')) url = `https://${url}`;
    validateUrl(url);
    const intervalMs = (opts.interval || 60) * 60 * 1000;

    console.log('');
    console.log(chalk.bold('  designlang watch'));
    console.log(chalk.gray(`  ${url} (every ${opts.interval || 60}min)`));
    console.log('');

    const check = async () => {
      const spinner = ora('Checking for design changes...').start();
      try {
        const result = await watchSite(url);

        if (result.isFirstRun) {
          spinner.succeed('Baseline captured. Watching for changes...');
        } else if (result.changes.length === 0) {
          spinner.succeed(`No changes — ${new Date().toLocaleTimeString()}`);
        } else {
          spinner.warn(`${result.changes.length} changes detected!`);
          for (const c of result.changes) {
            console.log(`  ${chalk.yellow('≠')} ${c.what}: ${c.from} → ${c.to}`);
          }
        }
      } catch (err) {
        spinner.fail(`Check failed: ${err.message}`);
      }
    };

    await check();
    console.log(chalk.gray(`\n  Next check in ${opts.interval || 60} minutes. Press Ctrl+C to stop.\n`));
    setInterval(check, intervalMs);
  });

// ── Score command ───────────────────────────────────────────
program
  .command('score <url>')
  .description('Score a website\'s design system quality')
  .action(async (url) => {
    if (!url.startsWith('http')) url = `https://${url}`;
    validateUrl(url);

    const spinner = ora('Analyzing design...').start();

    try {
      const design = await extractDesignLanguage(url);
      const s = design.score;

      spinner.stop();
      console.log('');
      console.log(chalk.bold('  Design System Score'));
      console.log(chalk.gray(`  ${url}`));
      console.log('');

      const gradeColor = s.grade === 'A' ? chalk.green : s.grade === 'B' ? chalk.cyan : s.grade === 'C' ? chalk.yellow : chalk.red;
      console.log(`  ${gradeColor.bold(`  ${s.overall}/100  Grade: ${s.grade}`)}`);
      console.log('');

      // Category breakdown
      const cats = [
        ['Color Discipline', s.scores.colorDiscipline],
        ['Typography', s.scores.typographyConsistency],
        ['Spacing System', s.scores.spacingSystem],
        ['Shadows', s.scores.shadowConsistency],
        ['Border Radii', s.scores.radiusConsistency],
        ['Accessibility', s.scores.accessibility],
        ['Tokenization', s.scores.tokenization],
      ];

      for (const [name, score] of cats) {
        const bar = '█'.repeat(Math.round(score / 5)) + '░'.repeat(20 - Math.round(score / 5));
        const color = score >= 80 ? chalk.green : score >= 60 ? chalk.yellow : chalk.red;
        console.log(`  ${chalk.gray(name.padEnd(20))} ${color(bar)} ${score}`);
      }

      if (s.strengths.length > 0) {
        console.log('');
        console.log(chalk.bold('  Strengths:'));
        for (const str of s.strengths) {
          console.log(`  ${chalk.green('✓')} ${str}`);
        }
      }

      if (s.issues.length > 0) {
        console.log('');
        console.log(chalk.bold('  Issues:'));
        for (const issue of s.issues) {
          console.log(`  ${chalk.yellow('!')} ${issue}`);
        }
      }
      console.log('');

    } catch (err) {
      spinner.fail('Scoring failed');
      console.error(chalk.red(`\n  ${err.message}\n`));
      process.exit(1);
    }
  });

// ── Grade command — shareable HTML report card ─────────────
program
  .command('grade <url>')
  .description('Generate a shareable Design Report Card (HTML + JSON + Markdown)')
  .option('-o, --out <dir>', 'output directory', './design-extract-output')
  .option('-n, --name <name>', 'output file prefix (default: derived from URL)')
  .option('--format <fmt>', 'output format: html, md, json, all', 'all')
  .option('--open', 'open the HTML report in the default browser')
  .action(async (url, opts) => {
    if (!url.startsWith('http')) url = `https://${url}`;
    validateUrl(url);

    const spinner = ora('Auditing design system...').start();
    try {
      const design = await extractDesignLanguage(url);
      const s = design.score;
      if (!s) throw new Error('scoring failed — cannot grade');

      const outDir = resolve(opts.out);
      mkdirSync(outDir, { recursive: true });
      const prefix = opts.name || nameFromUrl(url);
      const written = [];

      if (opts.format === 'all' || opts.format === 'html') {
        const html = formatGrade(design, { version: PKG_VERSION });
        const p = join(outDir, `${prefix}.grade.html`);
        writeFileSync(p, html);
        written.push(p);
      }
      if (opts.format === 'all' || opts.format === 'md') {
        const md = formatGradeMarkdown(design);
        const p = join(outDir, `${prefix}.grade.md`);
        writeFileSync(p, md);
        written.push(p);
      }
      if (opts.format === 'all' || opts.format === 'json') {
        const p = join(outDir, `${prefix}.grade.json`);
        writeFileSync(p, JSON.stringify({
          url: design.meta?.url,
          title: design.meta?.title,
          timestamp: design.meta?.timestamp,
          grade: s.grade,
          overall: s.overall,
          scores: s.scores,
          strengths: s.strengths,
          issues: s.issues,
        }, null, 2));
        written.push(p);
      }

      spinner.stop();
      const gradeColor = s.grade === 'A' ? chalk.green : s.grade === 'B' ? chalk.cyan : s.grade === 'C' ? chalk.yellow : chalk.red;
      console.log('');
      console.log(`  ${gradeColor.bold(`Grade ${s.grade}`)} ${chalk.gray('·')} ${chalk.bold(`${s.overall}/100`)} ${chalk.gray('·')} ${chalk.gray(url)}`);
      console.log('');
      for (const f of written) console.log(`  ${chalk.green('✓')} ${chalk.gray(f)}`);
      console.log('');
      console.log(chalk.gray(`  Share: open the .grade.html in a browser, post the URL.`));
      console.log('');

      if (opts.open) {
        const htmlPath = written.find(p => p.endsWith('.html'));
        if (htmlPath) {
          const { spawn } = await import('child_process');
          const cmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
          spawn(cmd, [htmlPath], { detached: true, stdio: 'ignore' }).unref();
        }
      }
    } catch (err) {
      spinner.fail('Grade failed');
      console.error(chalk.red(`\n  ${err.message}\n`));
      process.exit(1);
    }
  });

// ── Apply command ──────────────────────────────────────────
program
  .command('apply <url>')
  .description('Extract and apply design directly to your project')
  .option('-d, --dir <path>', 'project directory', '.')
  .option('--framework <type>', 'force framework (tailwind, shadcn, css)')
  .option('--cookie <cookies...>', 'cookies for authenticated pages')
  .option('--header <headers...>', 'custom headers')
  .action(async (url, opts) => {
    if (!url.startsWith('http')) url = `https://${url}`;
    validateUrl(url);

    console.log('');
    console.log(chalk.bold('  designlang apply'));
    console.log(chalk.gray(`  ${url} → ${resolve(opts.dir)}`));
    console.log('');

    const spinner = ora('Extracting design...').start();

    try {
      const result = await applyDesign(url, {
        dir: resolve(opts.dir),
        framework: opts.framework,
        cookies: opts.cookie,
        headers: opts.header ? Object.fromEntries(opts.header.map(h => { const [k, ...v] = h.split(':'); return [k.trim(), v.join(':').trim()]; })) : undefined,
      });

      spinner.succeed(`Applied ${result.framework} design!`);
      console.log('');
      for (const f of result.applied) {
        console.log(`  ${chalk.green('✓')} ${chalk.cyan(f.file)} — ${f.type}`);
      }
      console.log('');

    } catch (err) {
      spinner.fail('Apply failed');
      console.error(chalk.red(`\n  ${err.message}\n`));
      process.exit(1);
    }
  });

// ── Export command ─────────────────────────────────────────
program
  .command('export <url>')
  .description('Export raw design data in various formats')
  .option('-f, --format <type>', 'output format (json, csv)', 'json')
  .option('--pretty', 'pretty-print output')
  .action(async (url, opts) => {
    if (!url.startsWith('http')) url = `https://${url}`;
    validateUrl(url);

    try {
      const design = await extractDesignLanguage(url);

      if (opts.format === 'csv') {
        // Export colors as CSV
        const rows = ['hex,rgb_r,rgb_g,rgb_b,hsl_h,hsl_s,hsl_l,count,contexts'];
        for (const c of design.colors.all) {
          rows.push(`${c.hex},${c.rgb.r},${c.rgb.g},${c.rgb.b},${c.hsl.h},${c.hsl.s},${c.hsl.l},${c.count},"${c.contexts.join(';')}"`);
        }
        process.stdout.write(rows.join('\n') + '\n');
      } else {
        const output = opts.pretty ? JSON.stringify(design, null, 2) : JSON.stringify(design);
        process.stdout.write(output + '\n');
      }
    } catch (err) {
      process.stderr.write(`Error: ${err.message}\n`);
      process.exit(1);
    }
  });

// ── Token lint (v9) ────────────────────────────────────────
program
  .command('lint <file>')
  .description('Audit a local token file (.json / .css) for color sprawl, scale drift, contrast fails')
  .option('--json', 'emit machine-readable JSON')
  .action(async (file, opts) => {
    try {
      const { lintTokens } = await import('../src/lint.js');
      const r = lintTokens(resolve(file));
      if (opts.json) { process.stdout.write(JSON.stringify(r, null, 2) + '\n'); return; }
      console.log('');
      console.log(chalk.bold(`  designlang lint — ${file}`));
      console.log(`  Score: ${chalk.bold(r.score + '/100')}  Grade: ${chalk.bold(r.grade)}   Tokens: ${r.tokenCount}`);
      console.log('');
      for (const [k, v] of Object.entries(r.scorecard)) {
        const bar = '█'.repeat(Math.round(v / 5)) + '░'.repeat(20 - Math.round(v / 5));
        console.log(`  ${k.padEnd(20)} ${bar} ${v}`);
      }
      console.log('');
      for (const f of r.findings) {
        const color = f.severity === 'error' ? chalk.red : f.severity === 'warn' ? chalk.yellow : chalk.cyan;
        console.log(`  ${color(f.severity.toUpperCase())} [${f.rule}] ${f.message}`);
      }
      if (!r.findings.length) console.log(chalk.green('  ✓ no issues found'));
      console.log('');
      process.exit(r.findings.some(f => f.severity === 'error') ? 1 : 0);
    } catch (err) {
      process.stderr.write(chalk.red(`\n  Error: ${err.message}\n\n`));
      process.exit(1);
    }
  });

// ── Drift (v9) ─────────────────────────────────────────────
program
  .command('drift <url>')
  .description('Compare local tokens against a live site and report drift (CI-friendly)')
  .requiredOption('--tokens <file>', 'local tokens file (.json or .css)')
  .option('--tolerance <n>', 'color distance tolerance (0-50)', parseInt, 8)
  .option('--fail-on <level>', 'exit non-zero on: minor-drift | notable-drift | major-drift', 'notable-drift')
  .option('--json', 'emit machine-readable JSON')
  .action(async (url, opts) => {
    if (!url.startsWith('http')) url = `https://${url}`;
    validateUrl(url);
    try {
      const { checkDrift, formatDriftMarkdown } = await import('../src/drift.js');
      const r = await checkDrift(url, { tokens: resolve(opts.tokens), tolerance: opts.tolerance });
      if (opts.json) { process.stdout.write(JSON.stringify(r, null, 2) + '\n'); }
      else { console.log('\n' + formatDriftMarkdown(r) + '\n'); }
      const order = ['in-sync', 'minor-drift', 'notable-drift', 'major-drift'];
      if (order.indexOf(r.verdict) >= order.indexOf(opts.failOn)) process.exit(1);
    } catch (err) {
      process.stderr.write(chalk.red(`\n  Error: ${err.message}\n\n`));
      process.exit(1);
    }
  });

// ── Visual diff (v9) ───────────────────────────────────────
program
  .command('visual-diff <before> <after>')
  .description('Side-by-side HTML diff of two URLs with screenshots + token changes')
  .option('-o, --out <dir>', 'output directory', './design-extract-output')
  .action(async (before, after, opts) => {
    if (!before.startsWith('http')) before = `https://${before}`;
    if (!after.startsWith('http')) after = `https://${after}`;
    validateUrl(before); validateUrl(after);
    const spinner = ora('Capturing before + after').start();
    try {
      const { visualDiff, formatVisualDiffHtml } = await import('../src/visual-diff.js');
      const r = await visualDiff({ beforeUrl: before, afterUrl: after });
      const html = formatVisualDiffHtml(r);
      mkdirSync(resolve(opts.out), { recursive: true });
      const path = join(resolve(opts.out), `visual-diff-${Date.now()}.html`);
      writeFileSync(path, html, 'utf8');
      spinner.succeed(`Visual diff written → ${path}`);
    } catch (err) {
      spinner.fail(err.message);
      process.exit(1);
    }
  });

// ── Chat — REPL over a live extraction (v12) ──────────────
program
  .command('chat <target>')
  .description('Interactive REPL over an extraction. <target> is either a URL or a path to an existing *-design-tokens.json file.')
  .option('-o, --out <dir>', 'output directory for `save`', './chat-output')
  .action(async (target, opts) => {
    try {
      const { runChat } = await import('../src/chat.js');
      await runChat(target, opts);
    } catch (err) {
      console.error(chalk.red(`\n  ${err.message}\n`));
      process.exit(1);
    }
  });

// ── Replay — record a short WebM of motion from a URL ─────
program
  .command('replay <url>')
  .description('Record a short WebM clip of a site\'s motion (scroll + hover). Optional MP4 if ffmpeg is on PATH.')
  .option('-o, --out <dir>', 'output directory', './design-extract-output')
  .option('-n, --name <name>', 'output file prefix', 'motion-replay')
  .option('-d, --duration <s>', 'duration in seconds (2-15)', parseInt, 5)
  .option('-w, --width <px>', 'viewport width', parseInt, 1280)
  .option('--height <px>', 'viewport height', parseInt, 800)
  .option('--mp4', 'also emit an MP4 (requires ffmpeg on PATH)')
  .action(async (url, opts) => {
    if (!url.startsWith('http')) url = `https://${url}`;
    validateUrl(url);
    const spinner = ora('Recording motion replay...').start();
    try {
      const { recordReplay } = await import('../src/replay.js');
      const r = await recordReplay(url, {
        out: opts.out,
        prefix: opts.name,
        duration: opts.duration,
        width: opts.width,
        height: opts.height,
        mp4: opts.mp4,
      });
      if (!r.webm) {
        spinner.fail('No video was produced. The browser may have blocked recording; try a different URL.');
        process.exit(1);
      }
      spinner.succeed(`Replay captured (${r.duration}s)`);
      console.log('');
      console.log(`  ${chalk.green('✓')} ${chalk.cyan(r.webm)} — WebM`);
      if (r.mp4) console.log(`  ${chalk.green('✓')} ${chalk.cyan(r.mp4)} — MP4`);
      else if (opts.mp4) console.log(`  ${chalk.gray('note: ffmpeg not found on PATH; MP4 skipped')}`);
      console.log('');
    } catch (err) {
      spinner.fail(err.message);
      process.exit(1);
    }
  });

// ── Widgets — print the curated third-party widget ignore list ─
program
  .command('widgets')
  .description('Print the curated widget-ignore selector list used by --ignore-widgets')
  .action(async () => {
    const { WIDGET_SELECTORS } = await import('../src/widgets.js');
    for (const s of WIDGET_SELECTORS) console.log(s);
  });

// ── CI command — single PR-comment-ready report ────────────
program
  .command('ci <url>')
  .description('One-shot design regression report — drift + score + PR-ready markdown. Works in any CI.')
  .option('--tokens <file>', 'local tokens file (.json or .css) to compare against the live site')
  .option('--baseline <url>', 'baseline URL for a before/after visual diff')
  .option('--tolerance <n>', 'color distance tolerance (0-50)', parseInt, 8)
  .option('--fail-on <level>', 'exit non-zero on: minor-drift | notable-drift | major-drift', 'notable-drift')
  .option('-o, --out <dir>', 'output directory', '.designlang-ci')
  .option('--quiet', 'suppress stdout (still writes files)')
  .action(async (url, opts) => {
    if (!url.startsWith('http')) url = `https://${url}`;
    validateUrl(url);
    const spinner = opts.quiet ? { start() { return this; }, succeed() {}, fail() {}, set text(v) {} } : ora('Running CI report...').start();
    try {
      const { runCi } = await import('../src/ci.js');
      const r = await runCi(url, opts);
      spinner.succeed(`CI report written → ${r.mdPath}`);
      if (!opts.quiet) {
        console.log('');
        console.log(r.md);
      }
      if (r.shouldFail) process.exit(1);
    } catch (err) {
      spinner.fail(err.message);
      process.exit(1);
    }
  });

// ── Studio — local web studio over the latest extraction ──
program
  .command('studio')
  .description('Launch a local web studio over the latest extraction (editorial token browser, voice, motion, DNA).')
  .option('-d, --dir <path>', 'extraction directory', './design-extract-output')
  .option('-p, --port <n>', 'port', parseInt, 4837)
  .option('--prefix <name>', 'extraction prefix (default: newest *-design-tokens.json)')
  .option('--no-open', 'do not auto-open the browser')
  .action(async (opts) => {
    try {
      const { runStudio } = await import('../src/studio.js');
      const { port, dir, prefix } = await runStudio(opts);
      console.log('');
      console.log(chalk.bold('  designlang studio'));
      console.log(chalk.gray(`  serving ${dir}`));
      console.log(chalk.gray(`  prefix: ${prefix}`));
      console.log('');
      console.log(`  ${chalk.green('→')} ${chalk.cyan(`http://localhost:${port}`)}`);
      console.log('');
      console.log(chalk.gray('  Ctrl+C to stop.'));
      if (opts.open !== false) {
        const { spawn } = await import('child_process');
        const cmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
        try { spawn(cmd, [`http://localhost:${port}`], { stdio: 'ignore', detached: true }).unref(); } catch {}
      }
    } catch (err) {
      console.error(chalk.red(`\n  ${err.message}\n`));
      process.exit(1);
    }
  });

// ── MCP server command ─────────────────────────────────────
program
  .command('mcp')
  .description('Launch designlang MCP server over stdio (exposes latest extraction as resources + tools)')
  .option('--output-dir <path>', 'Source extraction directory', './design-extract-output')
  .action(async (opts) => {
    const { run } = await import('../src/mcp/server.js');
    await run(opts);
  });

program.parse();
