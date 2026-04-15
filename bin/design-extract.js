#!/usr/bin/env node

import { Command } from 'commander';
import { mkdirSync, writeFileSync } from 'fs';
import { resolve, join } from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { extractDesignLanguage } from '../src/index.js';
import { formatMarkdown } from '../src/formatters/markdown.js';
import { formatTokens } from '../src/formatters/tokens.js';
import { formatTailwind } from '../src/formatters/tailwind.js';
import { formatCssVars } from '../src/formatters/css-vars.js';
import { formatPreview } from '../src/formatters/preview.js';
import { formatFigma } from '../src/formatters/figma.js';
import { formatReactTheme, formatShadcnTheme } from '../src/formatters/theme.js';
import { diffDesigns, formatDiffMarkdown, formatDiffHtml } from '../src/diff.js';
import { saveSnapshot, getHistory, formatHistoryMarkdown } from '../src/history.js';
import { captureResponsive } from '../src/extractors/responsive.js';
import { captureInteractions } from '../src/extractors/interactions.js';
import { syncDesign } from '../src/sync.js';
import { compareBrands, formatBrandMatrix, formatBrandMatrixHtml } from '../src/multibrand.js';
import { generateClone } from '../src/clone.js';
import { watchSite } from '../src/watch.js';
import { nameFromUrl } from '../src/utils.js';

const program = new Command();

program
  .name('designlang')
  .description('Extract the complete design language from any website')
  .version('4.0.0');

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
  .option('--framework <type>', 'generate framework theme (react, shadcn)')
  .option('--responsive', 'capture design at multiple breakpoints')
  .option('--interactions', 'capture hover/focus/active states')
  .option('--full', 'enable all extra captures (screenshots, responsive, interactions)')
  .option('--no-history', 'skip saving to history')
  .option('--verbose', 'show detailed progress')
  .action(async (url, opts) => {
    if (!url.startsWith('http')) url = `https://${url}`;
    const prefix = opts.name || nameFromUrl(url);
    const outDir = resolve(opts.out);

    console.log('');
    console.log(chalk.bold('  designlang'));
    console.log(chalk.gray(`  ${url}${opts.depth > 0 ? ` (+ ${opts.depth} pages)` : ''}`));
    console.log('');

    const spinner = ora('Launching browser...').start();

    try {
      spinner.text = `Crawling${opts.depth > 0 ? ` (depth: ${opts.depth})` : ''}...`;
      const design = await extractDesignLanguage(url, {
        width: opts.width,
        height: parseInt(opts.height) || 800,
        wait: opts.wait,
        dark: opts.dark,
        depth: opts.depth,
        screenshots: opts.screenshots || opts.full,
        outDir,
      });

      // Responsive capture
      if (opts.responsive || opts.full) {
        spinner.text = 'Capturing responsive breakpoints...';
        design.responsive = await captureResponsive(url, { wait: opts.wait });
      }

      // Interaction state capture
      if (opts.interactions || opts.full) {
        spinner.text = 'Capturing interaction states...';
        design.interactions = await captureInteractions(url, { width: opts.width, height: parseInt(opts.height) || 800, wait: opts.wait });
      }

      spinner.text = 'Generating outputs...';
      mkdirSync(outDir, { recursive: true });

      const files = [
        { name: `${prefix}-design-language.md`, content: formatMarkdown(design), label: 'Markdown (AI-optimized)' },
        { name: `${prefix}-design-tokens.json`, content: formatTokens(design), label: 'Design Tokens (W3C)' },
        { name: `${prefix}-tailwind.config.js`, content: formatTailwind(design), label: 'Tailwind Config' },
        { name: `${prefix}-variables.css`, content: formatCssVars(design), label: 'CSS Variables' },
        { name: `${prefix}-preview.html`, content: formatPreview(design), label: 'Visual Preview' },
        { name: `${prefix}-figma-variables.json`, content: formatFigma(design), label: 'Figma Variables' },
      ];

      // Framework-specific themes
      if (opts.framework === 'react') {
        files.push({ name: `${prefix}-theme.js`, content: formatReactTheme(design), label: 'React Theme' });
      } else if (opts.framework === 'shadcn') {
        files.push({ name: `${prefix}-shadcn-theme.css`, content: formatShadcnTheme(design), label: 'shadcn/ui Theme' });
      } else {
        // Generate both by default
        files.push({ name: `${prefix}-theme.js`, content: formatReactTheme(design), label: 'React Theme' });
        files.push({ name: `${prefix}-shadcn-theme.css`, content: formatShadcnTheme(design), label: 'shadcn/ui Theme' });
      }

      for (const file of files) {
        writeFileSync(join(outDir, file.name), file.content, 'utf-8');
      }

      // Save to history
      if (opts.history !== false) {
        const histInfo = saveSnapshot(design);
        if (opts.verbose) spinner.info(`Snapshot #${histInfo.snapshotCount} saved for ${histInfo.hostname}`);
      }

      spinner.succeed('Extraction complete!');
      console.log('');
      console.log(chalk.bold('  Output files:'));
      for (const file of files) {
        const size = Buffer.byteLength(file.content);
        const sizeStr = size > 1024 ? `${(size / 1024).toFixed(1)}KB` : `${size}B`;
        console.log(`  ${chalk.green('✓')} ${chalk.cyan(file.name)} ${chalk.gray(`(${sizeStr})`)} — ${file.label}`);
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

      // Accessibility summary
      if (design.accessibility) {
        const a = design.accessibility;
        const scoreColor = a.score >= 80 ? chalk.green : a.score >= 50 ? chalk.yellow : chalk.red;
        console.log(`  ${chalk.gray('A11y:')} ${scoreColor(`${a.score}% WCAG score`)} (${a.failCount} failing pairs)`);
      }
      console.log('');

    } catch (err) {
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

program.parse();
