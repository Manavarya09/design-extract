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
import { formatTailwindV4 } from '../src/formatters/tailwind-v4.js';
import { formatTsDefs } from '../src/formatters/ts-defs.js';
import { formatCssReset } from '../src/formatters/css-reset.js';
import { formatGradientsCss, formatGradientsJson } from '../src/formatters/gradients.js';
import { formatAgentPrompt } from '../src/formatters/agent-prompt.js';
import { formatMotionLab } from '../src/formatters/motion-lab.js';
import { formatFramerMotion } from '../src/formatters/framer-motion.js';
import { formatMotionOne } from '../src/formatters/motion-one.js';
import { formatMotionCss } from '../src/formatters/motion-css.js';
import { formatMotionTailwind } from '../src/formatters/motion-tailwind.js';
import { formatMotionGsap } from '../src/formatters/motion-gsap.js';
import { formatMotionWaapi } from '../src/formatters/motion-waapi.js';
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
import { applyDesign } from '../src/apply.js';
import { formatGrade, formatGradeMarkdown } from '../src/formatters/grade.js';
import { formatBattle, formatBattleMarkdown } from '../src/formatters/battle.js';
import { formatScoreBadge } from '../src/formatters/badge.js';
import { formatRemix } from '../src/formatters/remix.js';
import { VOCABULARIES, getVocabulary, listVocabularies } from '../src/vocabularies/index.js';
import { buildPack } from '../src/pack.js';
import { recolorDesign } from '../src/recolor.js';
import { formatThemeSwap, formatThemeSwapMarkdown } from '../src/formatters/theme-swap.js';
import { formatBrandBook, formatBrandBookMarkdown } from '../src/formatters/brand-book.js';
import { htmlToPdf } from '../src/pdf.js';
import { fuseDesigns, AXES } from '../src/fuse.js';
import { formatPair, formatPairMarkdown } from '../src/formatters/pair.js';
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
  .option('--smart', 'use optional LLM fallback when heuristic classifiers have low confidence (supports ATLASCLOUD_API_KEY, OPENAI_API_KEY, or ANTHROPIC_API_KEY)')
  .option('--pages <n>', 'crawl N canonical pages (pricing/docs/blog/about/product) in addition to the homepage', parseInt)
  .option('--no-prompts', 'skip writing the prompt-pack directory')
  .option('--no-design-md', 'skip writing the agent-native DESIGN.md (single-file, 8-section, YAML front matter)')
  .option('--responsive-shots', 'capture full-page PNGs at 4 breakpoints × (light,dark)')
  .option('--perf', 'measure Core Web Vitals + bundle profile (LCP/CLS/INP, JS/CSS/font/img bytes, third-party count)')
  .option('--palette <n>', 'compress the extracted palette to N perceptually distinct colours via LAB-space k-means (default: emit every unique colour)', parseInt)
  .option('--pdf', 'also render a print-ready brand-book PDF (chapter bookmarks, running footer, embedded tokens)')
  .option('--paper <size>', 'PDF paper size when --pdf is set: a4 | letter | tabloid', 'a4')
  .option('--landscape', 'PDF landscape orientation when --pdf is set')
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

      // Optional palette compression — perceptual LAB k-means down to N colours.
      const paletteTarget = parseInt(opts.palette, 10);
      if (paletteTarget > 0 && Array.isArray(design.colors?.all)) {
        try {
          const { compressPalette } = await import('../src/utils/palette-compress.js');
          const before = design.colors.all.length;
          const compressed = compressPalette(design.colors.all, paletteTarget);
          design.colors.all = compressed;
          design.colors._compressed = { from: before, to: compressed.length, target: paletteTarget };
          spinner.text = `Compressed palette: ${before} → ${compressed.length} colours`;
        } catch (e) {
          console.warn(`(palette compress skipped: ${e.message})`);
        }
      }

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
        { name: `${prefix}-tailwind.config.js`, content: formatTailwind(design), label: 'Tailwind Config (v3)' },
        { name: `${prefix}-tailwind-v4.css`,    content: formatTailwindV4(design), label: 'Tailwind v4 @theme (CSS-first)' },
        { name: `${prefix}-tokens.d.ts`,        content: formatTsDefs(design),     label: 'TypeScript token types' },
        { name: `${prefix}-reset.css`,          content: formatCssReset(design),   label: 'Brand-aware CSS reset' },
        { name: `${prefix}-gradients.css`,      content: formatGradientsCss(design), label: 'Extracted gradients (utility classes)' },
        { name: `${prefix}-gradients.json`,     content: formatGradientsJson(design), label: 'Extracted gradients (structured)' },
        { name: `${prefix}-AGENT.md`,           content: formatAgentPrompt(design), label: 'Agent system prompt (paste into Claude/GPT/Cursor)' },
        { name: `${prefix}-motion.html`,        content: formatMotionLab(design),   label: 'Motion lab (interactive easing/duration/keyframe page)' },
        { name: `${prefix}-motion.framer.js`,   content: formatFramerMotion(design), label: 'Framer Motion presets (transitions + variants)' },
        { name: `${prefix}-motion.one.js`,      content: formatMotionOne(design),    label: 'Motion One presets (animate() + springs + scroll)' },
        { name: `${prefix}-motion.css`,         content: formatMotionCss(design),    label: 'Motion CSS (vars + keyframes + utilities + reduced-motion)' },
        { name: `${prefix}-motion.tailwind.js`, content: formatMotionTailwind(design), label: 'Tailwind motion preset (duration/easing/keyframes/animation)' },
        { name: `${prefix}-motion.gsap.js`,     content: formatMotionGsap(design),   label: 'GSAP presets (CustomEase + reveals + ScrollTrigger)' },
        { name: `${prefix}-motion.waapi.js`,    content: formatMotionWaapi(design),  label: 'Web Animations API presets (zero-dependency, exact curves)' },
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

      // Brand book — always emit the HTML (cheap, ~100KB). Optionally
      // render it to PDF behind --pdf (needs Playwright, ~3–5s).
      try {
        const brandHtml = formatBrandBook(design, { version: PKG_VERSION });
        const brandHtmlPath = join(outDir, `${prefix}.brand.html`);
        writeFileSync(brandHtmlPath, brandHtml, 'utf-8');
        files.push({ name: `${prefix}.brand.html`, label: 'Brand book (HTML)' });

        if (opts.pdf) {
          spinner.text = 'Rendering brand book PDF...';
          const pdfPath = join(outDir, `${prefix}.brand.pdf`);
          await htmlToPdf(brandHtml, {
            paper: opts.paper || 'a4',
            landscape: !!opts.landscape,
            outPath: pdfPath,
            metadata: {
              title: `${new URL(design?.meta?.url || `https://${prefix}`).hostname} brand guidelines`,
              subject: `${prefix} brand guidelines`,
            },
          });
          files.push({ name: `${prefix}.brand.pdf`, label: 'Brand book (PDF · print-ready)' });
        }
      } catch (e) {
        if (!merged.quiet) console.warn(`(brand book skipped: ${e.message})`);
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

// ── Stats command — fast stdout summary, no files written ──
program
  .command('stats <urls...>')
  .description('Print a concise one-screen summary to stdout — grade, primary, fonts, spacing, voice. Accepts multiple URLs. No files written.')
  .option('-j, --as-json', 'emit machine-readable JSON to stdout instead of pretty text (an array when multiple URLs)')
  .action(async (urls, opts) => {
    // Normalise each URL the same way the single-URL path used to.
    const targets = urls.map(u => {
      const full = u.startsWith('http') ? u : `https://${u}`;
      validateUrl(full);
      return full;
    });

    // Quiet path for --as-json: no spinner / chrome noise, just data on stdout.
    // (`--json` is already a global program flag; `--as-json` avoids the clash.)
    const wantJson = !!opts.asJson;
    const spinner = wantJson
      ? null
      : ora(targets.length === 1 ? `Reading ${targets[0]}...` : `Reading ${targets.length} sites in parallel...`).start();

    // Single helper used by both pretty and JSON paths.
    async function summarise(url) {
      const design = await extractDesignLanguage(url);
      const s = design.score || {};
      const primary = design.colors?.primary;
      const families = (design.typography?.families || []).map(f => f?.name || f).filter(Boolean);
      return {
        url,
        title: design.meta?.title,
        grade: s.grade ?? null,
        score: s.overall ?? null,
        primary: primary
          ? { hex: primary.hex, count: primary.count, confidence: primary.confidence ?? null }
          : null,
        families: families.slice(0, 3),
        fontFamilyCount: families.length,
        typeScale: (design.typography?.scale || []).length,
        spacingBase: design.spacing?.base ?? null,
        spacingScale: (design.spacing?.scale || []).length,
        radii: (design.borders?.radii || []).length,
        shadows: (design.shadows?.values || []).length,
        colors: (design.colors?.all || []).length,
        wcag: design.accessibility?.score ?? null,
        material: design.materialLanguage?.label,
        library: design.componentLibrary?.library,
        tone: design.voice?.tone,
        stack: design.stack?.framework,
        intent: design.pageIntent?.type,
      };
    }

    function printPretty(summary) {
      const gradeColor =
        summary.grade === 'A' ? chalk.green
        : summary.grade === 'B' ? chalk.cyan
        : summary.grade === 'C' ? chalk.yellow
        : summary.grade === 'D' ? chalk.magenta
        : chalk.red;
      const primary = summary.primary;
      const confTag = primary && primary.confidence != null
        ? (primary.confidence < 0.5
            ? chalk.yellow(`~${Math.round(primary.confidence * 100)}% conf`)
            : chalk.gray(`${Math.round(primary.confidence * 100)}% conf`))
        : '';
      const line = (label, value) => `  ${chalk.gray(label.padEnd(12))} ${value}`;
      console.log('');
      console.log(`  ${chalk.bold(summary.url)}`);
      if (summary.title) console.log(`  ${chalk.gray(summary.title)}`);
      console.log('');
      console.log(line('Grade', `${gradeColor.bold(summary.grade || '—')} ${chalk.gray('·')} ${chalk.bold(String(summary.score ?? '—') + '/100')}`));
      if (primary) {
        console.log(line('Primary', `${chalk.bold(primary.hex)} ${chalk.gray('×' + primary.count)} ${confTag}`));
      } else {
        console.log(line('Primary', chalk.gray('—')));
      }
      if (summary.families.length) {
        const head = summary.families[0];
        const body = summary.families[1] || head;
        const extra = summary.fontFamilyCount > 2 ? chalk.gray(` +${summary.fontFamilyCount - 2}`) : '';
        console.log(line('Fonts', `${head}${body && body !== head ? chalk.gray(' / ') + body : ''}${extra}`));
      } else {
        console.log(line('Fonts', chalk.gray('—')));
      }
      console.log(line('Type scale', `${summary.typeScale} sizes`));
      console.log(line('Spacing', `${summary.spacingBase ? `base ${summary.spacingBase}px` : 'no base'} · ${summary.spacingScale} steps`));
      console.log(line('Shape', `${summary.radii} radii · ${summary.shadows} shadows`));
      console.log(line('Colours', `${summary.colors} tokens`));
      console.log(line('WCAG', summary.wcag != null ? `${summary.wcag}%` : chalk.gray('—')));
      console.log(line('Stack', [summary.stack, summary.library].filter(Boolean).join(' · ') || chalk.gray('—')));
      console.log(line('Material', summary.material || chalk.gray('—')));
      console.log(line('Tone', summary.tone || chalk.gray('—')));
      console.log(line('Intent', summary.intent || chalk.gray('—')));
    }

    try {
      // Settle so a single failure doesn't kill the whole batch; per-URL
      // errors are surfaced as individual rejections in both paths.
      const results = await Promise.allSettled(targets.map(summarise));

      if (wantJson) {
        if (spinner) spinner.stop();
        const payload = results.map((r, i) => r.status === 'fulfilled'
          ? r.value
          : { url: targets[i], error: r.reason?.message || String(r.reason) });
        // When the caller passed a single URL we keep the legacy shape
        // (a bare object) so existing scripts don't break. Multiple URLs
        // become an array.
        const out = targets.length === 1 ? payload[0] : payload;
        process.stdout.write(JSON.stringify(out, null, 2) + '\n');
        return;
      }

      spinner.stop();
      let anyFailed = false;
      results.forEach((r, i) => {
        if (i > 0) console.log(chalk.gray('  ' + '─'.repeat(60)));
        if (r.status === 'fulfilled') {
          printPretty(r.value);
        } else {
          anyFailed = true;
          console.log('');
          console.log(`  ${chalk.bold(targets[i])}`);
          console.log(`  ${chalk.red('failed:')} ${chalk.red(r.reason?.message || String(r.reason))}`);
        }
      });
      console.log('');
      if (anyFailed) process.exitCode = 1;
    } catch (err) {
      if (spinner) spinner.fail('Stats failed');
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
  .option('--format <fmt>', 'output format: html, md, json, svg, all', 'all')
  .option('--badge', 'also emit *-badge.svg (shields.io-style) — implies adding svg to format')
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
      const wantSvg = opts.badge || opts.format === 'svg' || opts.format === 'all';

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
      if (wantSvg) {
        const svg = formatScoreBadge(s);
        const p = join(outDir, `${prefix}.grade.svg`);
        writeFileSync(p, svg);
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

// ── Battle command — head-to-head graded comparison ────────
program
  .command('battle <urlA> <urlB>')
  .description('Generate a head-to-head graded battle card (HTML + JSON + Markdown)')
  .option('-o, --out <dir>', 'output directory', './design-extract-output')
  .option('-n, --name <name>', 'output file prefix (default: a-vs-b)')
  .option('--format <fmt>', 'output format: html, md, json, all', 'all')
  .option('--open', 'open the battle card in the default browser')
  .action(async (urlA, urlB, opts) => {
    if (!urlA.startsWith('http')) urlA = `https://${urlA}`;
    if (!urlB.startsWith('http')) urlB = `https://${urlB}`;
    validateUrl(urlA);
    validateUrl(urlB);

    const spinner = ora(`Auditing ${urlA} and ${urlB} in parallel...`).start();
    try {
      const [designA, designB] = await Promise.all([
        extractDesignLanguage(urlA),
        extractDesignLanguage(urlB),
      ]);
      if (!designA.score || !designB.score) throw new Error('scoring failed for one or both sites');

      const outDir = resolve(opts.out);
      mkdirSync(outDir, { recursive: true });
      const prefix = opts.name || `${nameFromUrl(urlA)}-vs-${nameFromUrl(urlB)}`;
      const written = [];

      if (opts.format === 'all' || opts.format === 'html') {
        const html = formatBattle(designA, designB, { version: PKG_VERSION });
        const p = join(outDir, `${prefix}.battle.html`);
        writeFileSync(p, html);
        written.push(p);
      }
      if (opts.format === 'all' || opts.format === 'md') {
        const md = formatBattleMarkdown(designA, designB);
        const p = join(outDir, `${prefix}.battle.md`);
        writeFileSync(p, md);
        written.push(p);
      }
      if (opts.format === 'all' || opts.format === 'json') {
        const p = join(outDir, `${prefix}.battle.json`);
        writeFileSync(p, JSON.stringify({
          a: { url: designA.meta?.url, grade: designA.score.grade, overall: designA.score.overall, scores: designA.score.scores },
          b: { url: designB.meta?.url, grade: designB.score.grade, overall: designB.score.overall, scores: designB.score.scores },
          timestamp: new Date().toISOString(),
        }, null, 2));
        written.push(p);
      }

      spinner.stop();
      const aGrade = designA.score.grade, bGrade = designB.score.grade;
      const aColor = aGrade === 'A' ? chalk.green : aGrade === 'B' ? chalk.cyan : aGrade === 'C' ? chalk.yellow : chalk.red;
      const bColor = bGrade === 'A' ? chalk.green : bGrade === 'B' ? chalk.cyan : bGrade === 'C' ? chalk.yellow : chalk.red;
      console.log('');
      console.log(`  ${aColor.bold(`${aGrade} · ${designA.score.overall}`)} ${chalk.gray(designA.meta?.url || urlA)}`);
      console.log(`  ${chalk.gray('vs')}`);
      console.log(`  ${bColor.bold(`${bGrade} · ${designB.score.overall}`)} ${chalk.gray(designB.meta?.url || urlB)}`);
      console.log('');
      const winner =
        designA.score.overall - designB.score.overall >= 3 ? `${chalk.bold(designA.meta?.url || urlA)} wins`
        : designB.score.overall - designA.score.overall >= 3 ? `${chalk.bold(designB.meta?.url || urlB)} wins`
        : 'Too close to call';
      console.log(`  Verdict: ${winner}`);
      console.log('');
      for (const f of written) console.log(`  ${chalk.green('✓')} ${chalk.gray(f)}`);
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
      spinner.fail('Battle failed');
      console.error(chalk.red(`\n  ${err.message}\n`));
      process.exit(1);
    }
  });

// ── Remix command — restyle an extracted page in another vocabulary ─
program
  .command('remix <url>')
  .description('Restyle a site in a different design vocabulary (brutalist, swiss, art-deco, cyberpunk, soft-ui, editorial)')
  .option('-o, --out <dir>', 'output directory', './design-extract-output')
  .option('-n, --name <name>', 'output file prefix (default: derived from URL)')
  .option('--as <vocab>', 'vocabulary id (run `designlang remix --list` to see all)', 'brutalist')
  .option('--list', 'list all vocabularies and exit')
  .option('--all', 'emit one HTML per vocabulary (six files at once)')
  .option('--open', 'open the result in the default browser')
  .action(async (url, opts) => {
    if (opts.list) {
      console.log('');
      console.log(chalk.bold('  Vocabularies'));
      console.log('');
      for (const v of listVocabularies()) {
        console.log(`  ${chalk.cyan(v.id.padEnd(14))} ${chalk.gray(v.blurb)}`);
      }
      console.log('');
      console.log(chalk.gray(`  Use: designlang remix <url> --as <id>`));
      console.log('');
      return;
    }
    if (!url.startsWith('http')) url = `https://${url}`;
    validateUrl(url);

    const vocabIds = opts.all ? Object.keys(VOCABULARIES) : [opts.as];
    // Validate vocab early so we fail before extraction.
    for (const id of vocabIds) getVocabulary(id);

    const spinner = ora(`Extracting ${url}...`).start();
    try {
      const design = await extractDesignLanguage(url);

      const outDir = resolve(opts.out);
      mkdirSync(outDir, { recursive: true });
      const prefix = opts.name || nameFromUrl(url);
      const written = [];

      for (const id of vocabIds) {
        spinner.text = `Rendering ${id}...`;
        const vocab = getVocabulary(id);
        const html = formatRemix(design, vocab, { vocabId: id, version: PKG_VERSION });
        const p = join(outDir, `${prefix}.remix.${id}.html`);
        writeFileSync(p, html);
        written.push(p);
      }

      spinner.stop();
      console.log('');
      console.log(`  ${chalk.bold('Remixed')} ${chalk.gray('·')} ${chalk.cyan(vocabIds.join(', '))} ${chalk.gray('·')} ${chalk.gray(url)}`);
      console.log('');
      for (const f of written) console.log(`  ${chalk.green('✓')} ${chalk.gray(f)}`);
      console.log('');
      console.log(chalk.gray(`  Open the .html in a browser. One file per vocabulary, fully self-contained.`));
      console.log('');

      if (opts.open && written.length > 0) {
        const { spawn } = await import('child_process');
        const cmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
        spawn(cmd, [written[0]], { detached: true, stdio: 'ignore' }).unref();
      }
    } catch (err) {
      spinner.fail('Remix failed');
      console.error(chalk.red(`\n  ${err.message}\n`));
      process.exit(1);
    }
  });

// ── Pack command — bundle every emitter into one design-system directory
program
  .command('pack <url>')
  .description('Bundle every output (tokens, components, storybook, prompts, starter) into a single design-system directory')
  .option('-o, --out <dir>', 'output directory (default: ./<host>-design-system)')
  .option('--with-clone', 'include the full Next.js clone as the starter (slower; otherwise emits a minimal HTML starter)')
  .option('--open', 'open the starter index.html in the default browser')
  .action(async (url, opts) => {
    if (!url.startsWith('http')) url = `https://${url}`;
    validateUrl(url);

    const spinner = ora(`Extracting ${url}...`).start();
    try {
      const design = await extractDesignLanguage(url);

      const defaultDirName = `${nameFromUrl(url)}-design-system`;
      const outDir = resolve(opts.out || defaultDirName);

      spinner.text = 'Packing artifacts...';
      const { files } = buildPack(design, {
        outDir,
        version: PKG_VERSION,
        withClone: !!opts.withClone,
      });

      spinner.stop();
      console.log('');
      console.log(`  ${chalk.bold('Packed')} ${chalk.gray('·')} ${chalk.cyan(files.length)} files ${chalk.gray('·')} ${chalk.gray(url)}`);
      console.log('');
      console.log(`  ${chalk.green('✓')} ${chalk.bold(outDir)}`);
      console.log('');
      console.log(chalk.gray('  Top-level layout:'));
      const top = ['README.md', 'LICENSE.txt', 'tokens/', 'components/', 'storybook/', 'starter/', 'prompts/', 'extras/'];
      for (const t of top) console.log(`    ${chalk.gray('·')} ${t}`);
      console.log('');
      console.log(chalk.gray(`  Zip it:    cd ${outDir} && zip -r ../${defaultDirName}.zip .`));
      console.log(chalk.gray(`  Storybook: cd ${outDir}/storybook && npm install && npm run storybook`));
      console.log('');

      if (opts.open) {
        const starter = join(outDir, 'starter', 'index.html');
        const { spawn } = await import('child_process');
        const cmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
        spawn(cmd, [starter], { detached: true, stdio: 'ignore' }).unref();
      }
    } catch (err) {
      spinner.fail('Pack failed');
      console.error(chalk.red(`\n  ${err.message}\n`));
      process.exit(1);
    }
  });

// ── Theme-swap command — recolour an extracted design around a new primary
program
  .command('theme-swap <url>')
  .description('Recolour the extracted design around a new brand primary (preserves type, spacing, neutrals)')
  .requiredOption('--primary <hex>', 'target primary colour as hex (e.g. "#ff4800")')
  .option('--from <hex>', 'override the auto-detected source primary (e.g. when the extractor misclassifies)')
  .option('-o, --out <dir>', 'output directory', './design-extract-output')
  .option('-n, --name <name>', 'output file prefix (default: derived from URL + target hex)')
  .option('--format <fmt>', 'output format: html, md, json, tokens, all', 'all')
  .option('--open', 'open the HTML preview in the default browser')
  .action(async (url, opts) => {
    if (!url.startsWith('http')) url = `https://${url}`;
    validateUrl(url);

    const spinner = ora(`Extracting ${url}...`).start();
    try {
      const original = await extractDesignLanguage(url);
      spinner.text = `Recolouring around ${opts.primary}...`;
      const { design: recoloured, summary } = recolorDesign(original, {
        primary: opts.primary,
        fromPrimary: opts.from,
      });

      const outDir = resolve(opts.out);
      mkdirSync(outDir, { recursive: true });
      const targetSlug = String(opts.primary).replace(/^#/, '').toLowerCase();
      const prefix = opts.name || `${nameFromUrl(url)}-themeswap-${targetSlug}`;
      const written = [];

      if (opts.format === 'all' || opts.format === 'html') {
        const html = formatThemeSwap(original, recoloured, { version: PKG_VERSION });
        const p = join(outDir, `${prefix}.themeswap.html`);
        writeFileSync(p, html);
        written.push(p);
      }
      if (opts.format === 'all' || opts.format === 'md') {
        const md = formatThemeSwapMarkdown(original, recoloured);
        const p = join(outDir, `${prefix}.themeswap.md`);
        writeFileSync(p, md);
        written.push(p);
      }
      if (opts.format === 'all' || opts.format === 'json') {
        const p = join(outDir, `${prefix}.themeswap.json`);
        writeFileSync(p, JSON.stringify({
          url: original.meta?.url,
          from: summary.from,
          to: summary.to,
          hueShift: summary.hueShift,
          changedColors: summary.changes.length,
          changes: summary.changes,
          timestamp: new Date().toISOString(),
        }, null, 2));
        written.push(p);
      }
      if (opts.format === 'all' || opts.format === 'tokens') {
        const tokens = formatDtcgTokens(recoloured);
        const p = join(outDir, `${prefix}.themeswap.tokens.json`);
        writeFileSync(p, typeof tokens === 'string' ? tokens : JSON.stringify(tokens, null, 2));
        written.push(p);
      }

      spinner.stop();
      console.log('');
      console.log(`  ${chalk.bold(`${summary.from} → ${summary.to}`)} ${chalk.gray('·')} ${chalk.cyan(summary.changes.length)} colours ${chalk.gray('·')} ${chalk.gray(url)}`);
      console.log(`  ${chalk.gray(`Hue shift: ${(summary.hueShift).toFixed(1)}° · neutrals preserved · type/spacing/motion untouched`)}`);
      console.log('');
      for (const f of written) console.log(`  ${chalk.green('✓')} ${chalk.gray(f)}`);
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
      spinner.fail('Theme-swap failed');
      console.error(chalk.red(`\n  ${err.message}\n`));
      process.exit(1);
    }
  });

// ── Brand command — full editorial brand-guidelines book ────
program
  .command('brand <url>')
  .description('Generate a full brand-guidelines book — colour, type, spacing, motion, voice, components, accessibility, tokens, and how-to-use guidance')
  .option('-o, --out <dir>', 'output directory', './design-extract-output')
  .option('-n, --name <name>', 'output file prefix (default: derived from URL)')
  .option('--format <fmt>', 'output format: html, md, json, all', 'all')
  .option('--open', 'open the HTML book in the default browser')
  .option('--pdf', 'also emit a print-ready PDF brand guide (chapter bookmarks, running page numbers)')
  .option('--paper <size>', 'PDF paper size: a4 | letter | tabloid', 'a4')
  .option('--landscape', 'PDF landscape orientation')
  .option('--no-print-background', 'strip the brand-colour cover band from the PDF (smaller file)')
  .option('--attach-tokens', 'embed the DTCG tokens JSON as a PDF file attachment')
  .action(async (url, opts) => {
    if (!url.startsWith('http')) url = `https://${url}`;
    validateUrl(url);

    const spinner = ora(`Building brand guidelines for ${url}...`).start();
    try {
      // The brand book leans on the full extraction (logo, motion, voice,
      // anatomy, accessibility), so default to --full unless the caller has
      // explicitly opted out via env.
      const design = await extractDesignLanguage(url, {
        screenshots: true,
        responsive: false,
        interactions: false,
        deepInteract: true,
      });

      const outDir = resolve(opts.out);
      mkdirSync(outDir, { recursive: true });
      const prefix = opts.name || `${nameFromUrl(url)}.brand`;
      const written = [];

      let bookHtml = null;
      if (opts.format === 'all' || opts.format === 'html' || opts.pdf) {
        bookHtml = formatBrandBook(design, { version: PKG_VERSION });
        if (opts.format === 'all' || opts.format === 'html') {
          const p = join(outDir, `${prefix}.html`);
          writeFileSync(p, bookHtml);
          written.push(p);
        }
      }
      if (opts.format === 'all' || opts.format === 'md') {
        const md = formatBrandBookMarkdown(design);
        const p = join(outDir, `${prefix}.md`);
        writeFileSync(p, md);
        written.push(p);
      }
      if (opts.format === 'all' || opts.format === 'json') {
        // A trimmed JSON of the most-used surfaces in the book — useful for
        // programmatic consumption without re-running extraction.
        const p = join(outDir, `${prefix}.json`);
        writeFileSync(p, JSON.stringify({
          url: design.meta?.url,
          title: design.meta?.title,
          timestamp: design.meta?.timestamp,
          intent: design.pageIntent,
          material: design.materialLanguage,
          imagery: design.imageryStyle,
          library: design.componentLibrary,
          stack: design.stack,
          voice: design.voice,
          colors: design.colors,
          typography: design.typography,
          spacing: design.spacing,
          shadows: design.shadows,
          borders: design.borders,
          motion: design.motion,
          accessibility: design.accessibility,
          score: design.score,
        }, null, 2));
        written.push(p);
      }

      if (opts.pdf) {
        spinner.text = 'Rendering PDF...';
        const pdfPath = join(outDir, `${prefix}.pdf`);
        const attachments = [];
        if (opts.attachTokens) {
          // Reuse the JSON we just wrote if available; otherwise build a DTCG payload on the fly.
          let tokensJson;
          try {
            tokensJson = readFileSync(join(outDir, `${prefix}.json`));
          } catch {
            tokensJson = Buffer.from(JSON.stringify({
              colors: design.colors, typography: design.typography,
              spacing: design.spacing, motion: design.motion,
            }, null, 2));
          }
          attachments.push({
            filename: `${nameFromUrl(url)}-tokens.json`,
            contents: tokensJson,
            mimeType: 'application/json',
            description: 'Design tokens (DTCG-aligned)',
          });
        }
        await htmlToPdf(bookHtml, {
          paper: opts.paper,
          landscape: !!opts.landscape,
          printBackground: opts.printBackground !== false,
          attachments,
          metadata: {
            title: `${new URL(url).hostname} brand guidelines`,
            subject: `${new URL(url).hostname} brand guidelines`,
          },
          outPath: pdfPath,
        });
        written.push(pdfPath);
      }

      spinner.stop();
      const colorCount = (design.colors?.all || []).length;
      const fontCount = (design.typography?.families || []).length;
      const grade = design.score?.grade || '—';
      console.log('');
      console.log(`  ${chalk.bold('Brand book')} ${chalk.gray('·')} ${chalk.cyan(colorCount + ' tokens')} ${chalk.gray('·')} ${chalk.cyan(fontCount + ' fonts')} ${chalk.gray('·')} ${chalk.cyan('grade ' + grade)} ${chalk.gray('·')} ${chalk.gray(url)}`);
      console.log('');
      for (const f of written) console.log(`  ${chalk.green('✓')} ${chalk.gray(f)}`);
      console.log('');
      console.log(chalk.gray(`  Open the .html — it's a self-contained, print-ready guidelines book.`));
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
      spinner.fail('Brand book failed');
      console.error(chalk.red(`\n  ${err.message}\n`));
      process.exit(1);
    }
  });

// ── Pair command — fuse two designs across configurable axes
program
  .command('pair <urlA> <urlB>')
  .description('Fuse two extracted designs across axes (colours/typography/spacing/shape/motion/voice/components)')
  .option('-o, --out <dir>', 'output directory', './design-extract-output')
  .option('-n, --name <name>', 'output file prefix (default: <hostA>-x-<hostB>)')
  .option('--colors-from <a|b>',     'pull colours from A or B (default: a)')
  .option('--typography-from <a|b>', 'pull typography from A or B (default: b)')
  .option('--spacing-from <a|b>',    'pull spacing from A or B (default: a)')
  .option('--shape-from <a|b>',      'pull shape (radii + shadows) from A or B (default: a)')
  .option('--motion-from <a|b>',     'pull motion from A or B (default: a)')
  .option('--voice-from <a|b>',      'pull voice from A or B (default: b)')
  .option('--components-from <a|b>', 'pull component anatomy from A or B (default: b)')
  .option('--brand', 'also emit a full brand-guidelines book of the fused identity')
  .option('--format <fmt>', 'output format: html, md, json, all', 'all')
  .option('--open', 'open the HTML pair card in the default browser')
  .action(async (urlA, urlB, opts) => {
    if (!urlA.startsWith('http')) urlA = `https://${urlA}`;
    if (!urlB.startsWith('http')) urlB = `https://${urlB}`;
    validateUrl(urlA);
    validateUrl(urlB);

    const spinner = ora(`Extracting ${urlA} and ${urlB} in parallel...`).start();
    try {
      const [designA, designB] = await Promise.all([
        extractDesignLanguage(urlA),
        extractDesignLanguage(urlB),
      ]);

      spinner.text = 'Fusing...';
      const { design: fused, summary } = fuseDesigns(designA, designB, {
        colorsFrom:     opts.colorsFrom,
        typographyFrom: opts.typographyFrom,
        spacingFrom:    opts.spacingFrom,
        shapeFrom:      opts.shapeFrom,
        motionFrom:     opts.motionFrom,
        voiceFrom:      opts.voiceFrom,
        componentsFrom: opts.componentsFrom,
      });

      const outDir = resolve(opts.out);
      mkdirSync(outDir, { recursive: true });
      const prefix = opts.name || `${nameFromUrl(urlA)}-x-${nameFromUrl(urlB)}.pair`;
      const written = [];

      if (opts.format === 'all' || opts.format === 'html') {
        const html = formatPair(designA, designB, fused, summary, { version: PKG_VERSION });
        const p = join(outDir, `${prefix}.html`);
        writeFileSync(p, html);
        written.push(p);
      }
      if (opts.format === 'all' || opts.format === 'md') {
        const md = formatPairMarkdown(designA, designB, fused, summary);
        const p = join(outDir, `${prefix}.md`);
        writeFileSync(p, md);
        written.push(p);
      }
      if (opts.format === 'all' || opts.format === 'json') {
        const p = join(outDir, `${prefix}.json`);
        writeFileSync(p, JSON.stringify({
          a: { url: designA.meta?.url, host: summary.a.host },
          b: { url: designB.meta?.url, host: summary.b.host },
          axes: summary.axes,
          fused: {
            primary: fused.colors?.primary?.hex || null,
            family: (fused.typography?.families || [])[0],
            tone: fused.voice?.tone,
          },
          timestamp: new Date().toISOString(),
        }, null, 2));
        written.push(p);
      }
      if (opts.brand) {
        const html = formatBrandBook(fused, { version: PKG_VERSION });
        const p = join(outDir, `${prefix}.brand.html`);
        writeFileSync(p, html);
        written.push(p);
      }

      spinner.stop();
      console.log('');
      console.log(`  ${chalk.bold(`${summary.a.host} × ${summary.b.host}`)}`);
      console.log('');
      const axisLabels = {
        colors: 'Colours', typography: 'Typography', spacing: 'Spacing',
        shape: 'Shape', motion: 'Motion', voice: 'Voice', components: 'Components',
      };
      for (const axis of Object.keys(axisLabels)) {
        const src = summary.axes[axis];
        const fromHost = src === 'a' ? summary.a.host : summary.b.host;
        const tag = src === 'a' ? chalk.cyan('A') : chalk.magenta('B');
        console.log(`    ${tag}  ${axisLabels[axis].padEnd(12)} ${chalk.gray('·')} ${chalk.gray(fromHost)}`);
      }
      console.log('');
      for (const f of written) console.log(`  ${chalk.green('✓')} ${chalk.gray(f)}`);
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
      spinner.fail('Pair failed');
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

// ── Verify — fidelity loop: rebuild from tokens, pixel-diff vs original ──
program
  .command('verify <url>')
  .description('Rebuild components from the extracted tokens and pixel-diff them against the live page — a 0-100 fidelity score + loss heatmaps.')
  .option('-o, --out <dir>', 'output directory', './design-extract-output')
  .option('-c, --components <list>', 'comma-separated components to check (button,card,input,nav)', 'button,card')
  .option('--min <score>', 'exit non-zero if site fidelity is below this (CI gate)', parseInt)
  .option('--system-chrome', 'use the system Chrome install instead of bundled Chromium')
  .action(async (url, opts) => {
    if (!url.startsWith('http')) url = `https://${url}`;
    validateUrl(url);
    const spinner = ora('Extracting + rebuilding from tokens').start();
    try {
      const { verifyDesign } = await import('../src/verify/index.js');
      const { formatVerifyHtml, formatVerifyJson } = await import('../src/formatters/verify.js');
      const components = String(opts.components).split(',').map((s) => s.trim()).filter(Boolean);
      const report = await verifyDesign(url, {
        components,
        out: resolve(opts.out),
        channel: opts.systemChrome ? 'chrome' : undefined,
      });
      mkdirSync(resolve(opts.out), { recursive: true });
      const htmlPath = join(resolve(opts.out), 'verify.html');
      const jsonPath = join(resolve(opts.out), 'verify.json');
      writeFileSync(htmlPath, formatVerifyHtml(report), 'utf8');
      writeFileSync(jsonPath, formatVerifyJson(report), 'utf8');

      const score = report.fidelity;
      spinner.succeed(`Fidelity ${score == null ? 'n/a' : score + '/100'} → ${htmlPath}`);
      for (const c of report.components) {
        const line = c.status === 'ok'
          ? `${chalk.bold(c.component.padEnd(8))} ${chalk.cyan(String(c.fidelity).padStart(3))}/100`
          : `${chalk.bold(c.component.padEnd(8))} ${chalk.gray(c.status)} ${chalk.gray(c.reason || '')}`;
        console.log('  ' + line);
      }
      if (opts.min != null && score != null && score < opts.min) {
        console.error(chalk.red(`\n  Fidelity ${score} is below --min ${opts.min}\n`));
        process.exit(1);
      }
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
