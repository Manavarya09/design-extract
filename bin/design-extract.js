#!/usr/bin/env node

import { Command } from 'commander';
import { mkdirSync, writeFileSync } from 'fs';
import { resolve, join } from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { extractDesignLanguage } from '../src/index.js';
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
  .version('6.0.0');

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
  .option('--full', 'enable all extra captures (screenshots, responsive, interactions)')
  .option('--cookie <cookies...>', 'cookies for authenticated pages (name=value)')
  .option('--header <headers...>', 'custom headers (name:value)')
  .option('--ignore <selectors...>', 'CSS selectors to remove before extraction')
  .option('--tokens-legacy', 'Emit pre-v7 flat token JSON (backward compat)')
  .option('--platforms <csv>', 'Additional platforms: web,ios,android,flutter,wordpress,all (web is always emitted)', 'web')
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
      const cookies = merged.cookie || [];
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

program.parse();
