---
name: extract-design
description: "Extract the full design language from any website URL. Produces 8 output files including AI-optimized markdown, visual HTML preview, Tailwind config, React theme, shadcn/ui theme, Figma variables, W3C design tokens, and CSS variables. Also runs WCAG accessibility scoring. Use when user says 'extract design', 'get design system', 'design language', 'design tokens', 'what colors/fonts does this site use', or '/extract-design'."
allowed-tools: Bash, Read, Write, Glob
---

# Extract Design Language

Extract the complete design language from any website URL. Generates 8 output files covering colors, typography, spacing, shadows, components, breakpoints, animations, and accessibility.

## Prerequisites

Ensure `designlang` is available. Install if needed:

```bash
npm install -g designlang
```

Or use npx (no install required):

```bash
npx designlang <url>
```

## Auto-Loaded Design Context

When the MCP server starts, it automatically scans the project for existing design config files and pre-loads them as MCP resources — no manual extraction needed for basic context:

- **`design-tokens.json`** — W3C DTCG tokens (searched in `./`, `./src/`, `./app/`, `./styles/`)
- **`tailwind.config.*`** — Tailwind theme colors, spacing, and font families (searched in `./`)
- **`globals.css`** — CSS custom properties from `:root` blocks (searched in `./`, `./src/`, `./app/`, `./styles/`)

Running `/extract-design` against a URL produces a richer extraction that supersedes auto-detected context.

## Process

1. **Run the extraction** on the provided URL:

```bash
npx designlang <url> --screenshots
```

For multi-page crawling: `npx designlang <url> --depth 3 --screenshots`
For dark mode: `npx designlang <url> --dark --screenshots`

2. **Read the generated markdown file** to understand the design:

```bash
cat design-extract-output/*-design-language.md
```

3. **Present key findings** to the user:
   - Primary color palette with hex codes
   - Font families in use
   - Spacing system (base unit if detected)
   - WCAG accessibility score
   - Component patterns found
   - Notable design decisions (shadows, radii, etc.)

4. **Offer next steps:**
   - Copy `*-tailwind.config.js` into their project
   - Import `*-variables.css` into their stylesheet
   - Paste `*-shadcn-theme.css` into globals.css for shadcn/ui users
   - Import `*-theme.js` for React/CSS-in-JS projects
   - Import `*-figma-variables.json` into Figma for designer handoff
   - Open `*-preview.html` in a browser for a visual overview
   - Use the markdown file as context for AI-assisted development

## Output Files (8)

| File | Purpose |
|------|---------|
| `*-design-language.md` | AI-optimized markdown — the full design system for LLMs |
| `*-preview.html` | Visual HTML report with swatches, type scale, shadows, a11y |
| `*-design-tokens.json` | W3C Design Tokens format |
| `*-tailwind.config.js` | Ready-to-use Tailwind CSS theme |
| `*-variables.css` | CSS custom properties |
| `*-figma-variables.json` | Figma Variables import format |
| `*-theme.js` | React/CSS-in-JS theme object |
| `*-shadcn-theme.css` | shadcn/ui theme CSS variables |

## Additional Commands

- **Compare two sites:** `npx designlang diff <urlA> <urlB>`
- **View history:** `npx designlang history <url>`

## Options

| Flag | Description |
|------|-------------|
| `--out <dir>` | Output directory (default: `./design-extract-output`) |
| `--dark` | Also extract dark mode color scheme |
| `--depth <n>` | Crawl N internal pages for site-wide extraction |
| `--screenshots` | Capture component screenshots (buttons, cards, nav) |
| `--wait <ms>` | Wait time after page load for SPAs |
| `--framework <type>` | Generate only specific theme (`react` or `shadcn`) |
