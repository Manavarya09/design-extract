<p align="center">
  <h1 align="center">designlang</h1>
  <p align="center">Extract the complete design language from any website in seconds.</p>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/designlang"><img src="https://img.shields.io/npm/v/designlang?color=blue&label=npm" alt="npm version"></a>
  <a href="https://github.com/Manavarya09/design-extract/blob/main/LICENSE"><img src="https://img.shields.io/github/license/Manavarya09/design-extract" alt="license"></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/node/v/designlang" alt="node version"></a>
</p>

---

**designlang** crawls any website with a headless browser, extracts every computed style from the live DOM, and generates **8 output files** — including an AI-optimized markdown file, visual HTML preview, Tailwind config, Figma variables, React theme, shadcn/ui theme, W3C design tokens, and CSS custom properties.

It also does **WCAG accessibility scoring**, **component screenshot capture**, **multi-page crawling**, **design comparison** between two sites, and **historical tracking** of how a site's design evolves over time.

**No other tool does all of this from a single command.**

## Quick Start

```bash
npx designlang https://stripe.com
```

## What You Get (8 Files)

| File | What it is |
|------|------------|
| `*-design-language.md` | AI-optimized markdown — the full design system described for LLMs |
| `*-preview.html` | Visual HTML report with swatches, type scale, shadows, a11y score |
| `*-design-tokens.json` | [W3C Design Tokens](https://design-tokens.github.io/community-group/format/) for tooling |
| `*-tailwind.config.js` | Drop-in Tailwind CSS theme extension |
| `*-variables.css` | CSS custom properties ready to import |
| `*-figma-variables.json` | Figma Variables import (with dark mode support) |
| `*-theme.js` | React/CSS-in-JS theme object (Chakra, Stitches, Vanilla Extract) |
| `*-shadcn-theme.css` | shadcn/ui globals.css theme variables |

## Install

```bash
# Use directly (no install needed)
npx designlang https://example.com

# Or install globally
npm install -g designlang
```

## Features

### Multi-Page Crawling

Crawl multiple pages for a site-wide design system:

```bash
designlang https://stripe.com --depth 5
```

### WCAG Accessibility Scoring

Every extraction includes a WCAG 2.1 contrast analysis:

```
A11y: 94% WCAG score (7 failing pairs)
```

Failing color pairs are highlighted in both the markdown and HTML preview with exact contrast ratios.

### Component Screenshots

Capture PNG screenshots of detected UI components:

```bash
designlang https://vercel.com --screenshots
```

Saves screenshots of buttons, cards, inputs, navigation, hero sections, and a full-page capture.

### Visual HTML Preview

Every run generates a `*-preview.html` file — a gorgeous dark-themed report you can open in your browser with:
- Color swatches for the full palette
- Live type scale rendering
- Spacing scale visualization
- Shadow cards with actual CSS shadows
- Accessibility score and failing pair analysis
- Component screenshots (when `--screenshots` is used)

### Design Comparison

Compare two sites side-by-side:

```bash
designlang diff https://vercel.com https://stripe.com
```

Generates `diff.md` and `diff.html` showing color, typography, spacing, and accessibility differences.

### Historical Tracking

Track how a site's design evolves over time:

```bash
# Each extraction auto-saves a snapshot
designlang https://stripe.com

# View history
designlang history https://stripe.com
```

Shows color changes, font swaps, accessibility score trends, and CSS variable count over time.

### Framework Themes

Generates ready-to-use theme files for:

- **React/CSS-in-JS** — theme object compatible with Chakra UI, Stitches, Vanilla Extract
- **shadcn/ui** — CSS variables in the exact format shadcn expects (paste into globals.css)
- **Tailwind** — full theme extension with colors, fonts, spacing, radii, shadows, screens

## What It Extracts

| Category | Details |
|----------|---------|
| **Colors** | Full palette with primary/secondary/accent/neutral classification, gradients |
| **Typography** | Font families, type scale, heading/body styles, weight distribution |
| **Spacing** | All unique values with automatic base-unit detection (4px/8px grid) |
| **Border Radii** | Unique values labeled xs through full |
| **Box Shadows** | Parsed and classified by visual weight |
| **CSS Variables** | All `:root` custom properties, categorized |
| **Breakpoints** | Media query breakpoints with standard labels |
| **Animations** | Transitions, easing functions, durations, `@keyframes` |
| **Components** | Buttons, cards, inputs, links — with base styles |
| **Accessibility** | WCAG 2.1 contrast ratios for all fg/bg color pairs |

## Full CLI Reference

```
designlang <url> [options]

Options:
  -o, --out <dir>         Output directory (default: ./design-extract-output)
  -n, --name <name>       Output file prefix (default: derived from URL)
  -w, --width <px>        Viewport width (default: 1280)
  --height <px>           Viewport height (default: 800)
  --wait <ms>             Wait after page load for SPAs (default: 0)
  --dark                  Also extract dark mode styles
  --depth <n>             Pages to crawl (default: 0, just the URL)
  --screenshots           Capture component screenshots
  --framework <type>      Only generate specific theme (react, shadcn)
  --no-history            Skip saving to history
  --verbose               Detailed progress output

Commands:
  diff <urlA> <urlB>      Compare two sites' design languages
  history <url>           View design history for a site
```

## How It Works

1. **Crawl** — Launches headless Chromium via Playwright
2. **Extract** — `page.evaluate()` walks up to 5,000 DOM elements collecting computed styles
3. **Process** — 10 extractor modules parse, deduplicate, cluster, and classify the raw data
4. **Format** — 8 formatter modules generate the output files
5. **Score** — Accessibility extractor calculates WCAG contrast ratios
6. **Capture** — Optional Playwright screenshots of detected components

## Claude Code Plugin

**designlang** also works as a [Claude Code](https://claude.ai/claude-code) plugin. Use `/extract-design <url>` in your coding session.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). PRs welcome!

## License

[MIT](LICENSE) - Manavarya Singh
