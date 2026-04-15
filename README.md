<p align="center">
  <h1 align="center">designlang</h1>
  <p align="center">Reverse-engineer any website's complete design system in one command.</p>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/designlang"><img src="https://img.shields.io/npm/v/designlang?color=blue&label=npm" alt="npm version"></a>
  <a href="https://github.com/Manavarya09/design-extract/blob/main/LICENSE"><img src="https://img.shields.io/github/license/Manavarya09/design-extract" alt="license"></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/node/v/designlang" alt="node version"></a>
</p>

---

**designlang** crawls any website with a headless browser, extracts every computed style from the live DOM, and generates **8 output files** — including an AI-optimized markdown file, visual HTML preview, Tailwind config, React theme, shadcn/ui theme, Figma variables, W3C design tokens, and CSS custom properties.

But unlike every other tool out there, it also extracts **layout patterns** (grids, flexbox, containers), captures **responsive behavior** across 4 breakpoints, records **interaction states** (hover, focus, active), scores **WCAG accessibility**, and lets you **compare multiple brands** or **sync live sites to local tokens**.

## Quick Start

```bash
npx designlang https://stripe.com
```

Get everything at once:

```bash
npx designlang https://stripe.com --full
```

## What You Get (8 Files)

| File | What it is |
|------|------------|
| `*-design-language.md` | AI-optimized markdown — feed it to any LLM to recreate the design |
| `*-preview.html` | Visual report with swatches, type scale, shadows, a11y score |
| `*-design-tokens.json` | [W3C Design Tokens](https://design-tokens.github.io/community-group/format/) format |
| `*-tailwind.config.js` | Drop-in Tailwind CSS theme |
| `*-variables.css` | CSS custom properties |
| `*-figma-variables.json` | Figma Variables import (with dark mode support) |
| `*-theme.js` | React/CSS-in-JS theme (Chakra, Stitches, Vanilla Extract) |
| `*-shadcn-theme.css` | shadcn/ui globals.css variables |

The markdown output has **14 sections**: Color Palette, Typography, Spacing, Border Radii, Box Shadows, CSS Custom Properties, Breakpoints, Transitions & Animations, Component Patterns, Layout System, Responsive Design, Interaction States, Accessibility (WCAG 2.1), and Quick Start.

## Install

```bash
# Use directly (no install needed)
npx designlang https://example.com

# Or install globally
npm install -g designlang

# As an agent skill (Claude Code, Cursor, Codex, 40+ agents)
npx skills add Manavarya09/design-extract
```

## What Makes This Different

Most design extraction tools give you colors and fonts. That's it. designlang fills 5 market gaps that no other tool addresses:

### 1. Layout System Extraction

Extracts the structural skeleton — grid column patterns, flex direction usage, container widths, gap values, and justify/align patterns.

```
Layout: 55 grids, 492 flex containers
```

Every other tool gives you the paint. designlang gives you the architecture.

### 2. Responsive Multi-Breakpoint Capture

Crawls the site at 4 viewports (mobile, tablet, desktop, wide) and maps exactly what changes:

```bash
designlang https://vercel.com --responsive
```

```
Responsive: 4 viewports, 3 breakpoint changes
  375px → 768px: Nav visibility hidden → visible, Hamburger shown → hidden
  768px → 1280px: Max grid columns 1 → 3, H1 size 32px → 48px
```

No other tool captures how the design *adapts*, just how it looks at one size.

### 3. Interaction State Capture

Programmatically hovers and focuses interactive elements, capturing the actual style transitions:

```bash
designlang https://stripe.com --interactions
```

```css
/* Button Hover */
background-color: rgb(83, 58, 253) → rgb(67, 47, 202);
box-shadow: none → 0 4px 12px rgba(83, 58, 253, 0.4);

/* Input Focus */
border-color: rgb(200, 200, 200) → rgb(83, 58, 253);
outline: none → 2px solid rgb(83, 58, 253);
```

### 4. Live Site Sync

Treat the deployed site as your source of truth, not Figma:

```bash
designlang sync https://stripe.com --out ./src/tokens
```

Detects design changes and auto-updates your local `design-tokens.json`, `tailwind.config.js`, and `variables.css`.

### 5. Multi-Brand Comparison

Compare N brands side-by-side:

```bash
designlang brands stripe.com vercel.com github.com linear.app
```

Generates a matrix with color overlap analysis, typography comparison, spacing systems, and accessibility scores. Outputs both `brands.md` and `brands.html`.

## All Features

| Feature | Flag / Command | Description |
|---------|---------------|-------------|
| Base extraction | `designlang <url>` | Colors, typography, spacing, shadows, radii, CSS vars, breakpoints, animations, components |
| Layout system | automatic | Grid patterns, flex usage, container widths, gap values |
| Accessibility | automatic | WCAG 2.1 contrast ratios for all fg/bg pairs |
| Dark mode | `--dark` | Extracts dark color scheme |
| Multi-page | `--depth <n>` | Crawl N internal pages for site-wide tokens |
| Screenshots | `--screenshots` | Capture buttons, cards, inputs, nav, hero, full page |
| Responsive | `--responsive` | Crawl at 4 viewports, map breakpoint changes |
| Interactions | `--interactions` | Capture hover/focus/active state transitions |
| Everything | `--full` | Enable screenshots + responsive + interactions |
| Diff | `designlang diff <A> <B>` | Compare two sites (MD + HTML) |
| Multi-brand | `designlang brands <urls...>` | N-site comparison matrix |
| Sync | `designlang sync <url>` | Update local tokens from live site |
| History | `designlang history <url>` | Track design changes over time |

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
  --depth <n>             Internal pages to crawl (default: 0)
  --screenshots           Capture component screenshots
  --responsive            Capture at multiple breakpoints
  --interactions          Capture hover/focus/active states
  --full                  Enable all captures
  --framework <type>      Only generate specific theme (react, shadcn)
  --no-history            Skip saving to history
  --verbose               Detailed progress output

Commands:
  diff <urlA> <urlB>      Compare two sites' design languages
  brands <urls...>        Multi-brand comparison matrix
  sync <url>              Sync local tokens with live site
  history <url>           View design change history
```

## Example Output

Running `designlang https://vercel.com --full`:

```
  designlang
  https://vercel.com

  Output files:
  ✓ vercel-com-design-language.md (32.6KB)
  ✓ vercel-com-design-tokens.json (5.6KB)
  ✓ vercel-com-tailwind.config.js (3.4KB)
  ✓ vercel-com-variables.css (18.6KB)
  ✓ vercel-com-preview.html (31.8KB)
  ✓ vercel-com-figma-variables.json (12.4KB)
  ✓ vercel-com-theme.js (1.4KB)
  ✓ vercel-com-shadcn-theme.css (477B)
  ✓ screenshots/button.png
  ✓ screenshots/card.png
  ✓ screenshots/nav.png
  ✓ screenshots/hero.png
  ✓ screenshots/full-page.png

  Summary:
  Colors: 27 unique colors
  Fonts: Geist, Geist Mono
  Spacing: 18 values (base: 2px)
  Shadows: 11 unique shadows
  Radii: 10 unique values
  Breakpoints: 45 breakpoints
  Components: 4 patterns detected
  CSS Vars: 407 custom properties
  Layout: 55 grids, 492 flex containers
  Responsive: 4 viewports, 3 breakpoint changes
  Interactions: 8 state changes captured
  A11y: 94% WCAG score (7 failing pairs)
```

## How It Works

1. **Crawl** — Launches headless Chromium via Playwright, waits for network idle and fonts
2. **Extract** — Single `page.evaluate()` walks up to 5,000 DOM elements collecting 25+ computed style properties including layout (grid, flex, container) data
3. **Process** — 12 extractor modules parse, deduplicate, cluster, and classify the raw data
4. **Format** — 8 formatter modules generate output files
5. **Score** — Accessibility extractor calculates WCAG contrast ratios for all color pairs
6. **Capture** — Optional: screenshots, responsive viewport crawling, interaction state recording

## Agent Skill

Works with **Claude Code, Cursor, Codex, and 40+ AI coding agents** via the skills ecosystem:

```bash
npx skills add Manavarya09/design-extract
```

In Claude Code, use `/extract-design <url>`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). PRs welcome!

## License

[MIT](LICENSE) - Manavarya Singh
