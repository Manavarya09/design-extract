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
import { nameFromUrl } from '../src/utils.js';

const program = new Command();

program
  .name('designlang')
  .description('Extract the complete design language from any website')
  .version('1.0.0')
  .argument('<url>', 'URL to extract design language from')
  .option('-o, --out <dir>', 'output directory', './design-extract-output')
  .option('-n, --name <name>', 'output file prefix (default: derived from URL)')
  .option('-w, --width <px>', 'viewport width', parseInt, 1280)
  .option('-h, --height <px>', 'viewport height', parseInt, 800)
  .option('--wait <ms>', 'wait after page load (ms)', parseInt, 0)
  .option('--dark', 'also extract dark mode styles')
  .option('--verbose', 'show detailed progress')
  .action(async (url, opts) => {
    // Ensure URL has protocol
    if (!url.startsWith('http')) url = `https://${url}`;

    const prefix = opts.name || nameFromUrl(url);
    const outDir = resolve(opts.out);

    console.log('');
    console.log(chalk.bold('  design-extract'));
    console.log(chalk.gray(`  ${url}`));
    console.log('');

    const spinner = ora('Launching browser...').start();

    try {
      spinner.text = 'Crawling page and extracting styles...';
      const design = await extractDesignLanguage(url, {
        width: opts.width,
        height: opts.height,
        wait: opts.wait,
        dark: opts.dark,
      });

      spinner.text = 'Generating output files...';

      mkdirSync(outDir, { recursive: true });

      const files = [
        { name: `${prefix}-design-language.md`, content: formatMarkdown(design), label: 'Markdown (AI-optimized)' },
        { name: `${prefix}-design-tokens.json`, content: formatTokens(design), label: 'Design Tokens (W3C)' },
        { name: `${prefix}-tailwind.config.js`, content: formatTailwind(design), label: 'Tailwind Config' },
        { name: `${prefix}-variables.css`, content: formatCssVars(design), label: 'CSS Variables' },
      ];

      for (const file of files) {
        writeFileSync(join(outDir, file.name), file.content, 'utf-8');
      }

      spinner.succeed('Extraction complete!');
      console.log('');
      console.log(chalk.bold('  Output files:'));
      for (const file of files) {
        const size = Buffer.byteLength(file.content);
        const sizeStr = size > 1024 ? `${(size / 1024).toFixed(1)}KB` : `${size}B`;
        console.log(`  ${chalk.green('✓')} ${chalk.cyan(file.name)} ${chalk.gray(`(${sizeStr})`)} — ${file.label}`);
      }
      console.log('');
      console.log(chalk.gray(`  Saved to ${outDir}`));

      // Summary stats
      console.log('');
      console.log(chalk.bold('  Summary:'));
      console.log(`  ${chalk.gray('Colors:')} ${design.colors.all.length} unique colors`);
      console.log(`  ${chalk.gray('Fonts:')} ${design.typography.families.map(f => f.name).join(', ') || 'none detected'}`);
      console.log(`  ${chalk.gray('Spacing:')} ${design.spacing.scale.length} values${design.spacing.base ? ` (base: ${design.spacing.base}px)` : ''}`);
      console.log(`  ${chalk.gray('Shadows:')} ${design.shadows.values.length} unique shadows`);
      console.log(`  ${chalk.gray('Radii:')} ${design.borders.radii.length} unique values`);
      console.log(`  ${chalk.gray('Breakpoints:')} ${design.breakpoints.length} breakpoints`);
      console.log(`  ${chalk.gray('Components:')} ${Object.keys(design.components).length} patterns detected`);
      console.log(`  ${chalk.gray('CSS Vars:')} ${Object.values(design.variables).reduce((s, v) => s + Object.keys(v).length, 0)} custom properties`);
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

program.parse();
