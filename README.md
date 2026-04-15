<p align="center">
  <h1 align="center">designlang</h1>
  <p align="center">Extract the complete design language from any website.</p>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/designlang"><img src="https://img.shields.io/npm/v/designlang?color=blue&label=npm" alt="npm version"></a>
  <a href="https://github.com/Manavarya09/designlangtract/blob/main/LICENSE"><img src="https://img.shields.io/github/license/Manavarya09/designlangtract" alt="license"></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/node/v/designlang" alt="node version"></a>
</p>

---

**designlang** uses Playwright to headlessly crawl any website, extracts computed styles from the live DOM, and generates a full design system you can immediately use in your project. The primary output is an **AI-optimized markdown file** that an LLM can use to faithfully recreate the design.

## Quick Start

```bash
npx designlang https://stripe.com
```

That's it. Four files appear in `./designlangtract-output/`:

| File | What it is |
|------|------------|
| `*-design-language.md` | AI-optimized markdown — the full design system in natural language with code examples |
| `*-design-tokens.json` | [W3C Design Tokens](https://design-tokens.github.io/community-group/format/) format for tooling |
| `*-tailwind.config.js` | Drop-in Tailwind CSS theme extension |
| `*-variables.css` | CSS custom properties ready to import |

## Install

```bash
# Use directly with npx (no install needed)
npx designlang https://example.com

# Or install globally
npm install -g designlang
designlang https://example.com
```

> Playwright's Chromium is auto-installed on first run via the `postinstall` script.

## What It Extracts

| Category | Details |
|----------|---------|
| **Colors** | Full palette with primary/secondary/accent/neutral classification, gradients, background & text colors |
| **Typography** | Font families, type scale (heading/body/caption), weights, line heights, letter spacing |
| **Spacing** | All unique values with automatic base-unit detection (e.g. 4px grid) |
| **Border Radii** | Unique values labeled xs through full |
| **Box Shadows** | Parsed and classified by visual weight (xs/sm/md/lg/xl) |
| **CSS Variables** | All `:root` custom properties, categorized by type |
| **Breakpoints** | Media query breakpoints with standard labels (sm/md/lg/xl) |
| **Animations** | Transitions, easing functions, durations, `@keyframes` |
| **Components** | Detected patterns for buttons, cards, inputs, links — with base styles |

## CLI Options

```
designlang <url> [options]

Options:
  -o, --out <dir>       Output directory (default: ./designlangtract-output)
  -n, --name <name>     Output file prefix (default: derived from URL hostname)
  -w, --width <px>      Viewport width (default: 1280)
  -h, --height <px>     Viewport height (default: 800)
  --wait <ms>           Wait after page load for SPAs (default: 0)
  --dark                Also extract dark mode color scheme
  --verbose             Show detailed extraction progress
  -V, --version         Show version
  -h, --help            Show help
```

### Examples

```bash
# Basic extraction
designlang https://vercel.com

# Custom output directory
designlang https://stripe.com --out ./stripe-design

# Extract dark mode too
designlang https://github.com --dark

# Wait for SPA to render
designlang https://app.example.com --wait 3000

# Custom viewport
designlang https://example.com --width 1440 --height 900
```

## The Markdown Output

The `*-design-language.md` file is the hero output. It's structured for AI/LLM consumption with:

- Color palette tables with hex, RGB, and HSL values
- Typography scale with size, weight, line-height, and letter-spacing
- Spacing scale with token names and px/rem conversions
- CSS code blocks for shadows, component patterns, and animations
- A "Quick Start" section with step-by-step instructions to recreate the design

Feed it to any AI coding assistant and it can recreate the site's visual design from scratch.

## Claude Code Plugin

**designlang** also works as a [Claude Code](https://claude.ai/claude-code) plugin.

After installing, use the `/extract-design` slash command:

```
/extract-design https://stripe.com
```

Claude will extract the design, read the markdown output, and help you integrate it into your project.

## How It Works

1. **Crawl** — Launches headless Chromium via Playwright, navigates to the URL, waits for network idle and font loading
2. **Extract** — Runs a single `page.evaluate()` call that walks up to 5,000 DOM elements and collects computed styles, CSS custom properties, media queries, and keyframes
3. **Process** — Nine extractor modules parse, deduplicate, cluster, and classify the raw style data into a unified design object
4. **Format** — Four formatter modules generate the output files

## Limitations

- **Cross-origin stylesheets** — CSS loaded from CDNs may not be inspectable via `document.styleSheets` (CORS). Computed styles are still captured since `getComputedStyle()` sees the final resolved values.
- **Shadow DOM** — Elements inside closed shadow roots are not accessible. Open shadow roots are partially supported.
- **CSS-in-JS** — Styles injected at runtime (styled-components, Emotion) are captured via computed styles but not as raw CSS rules.
- **Element cap** — DOM traversal is capped at 5,000 elements to prevent hanging on very large pages.

## Tech Stack

- [Playwright](https://playwright.dev/) — headless browser automation
- [Commander](https://github.com/tj/commander.js/) — CLI framework
- [Chalk](https://github.com/chalk/chalk) + [Ora](https://github.com/sindresorhus/ora) — terminal styling

Zero external dependencies for color parsing, clustering, or CSS processing — all handled with ~200 lines of pure JS utilities.

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Make your changes
4. Test on a few websites (`node bin/designlangtract.js https://example.com`)
5. Commit and push
6. Open a pull request

## License

[MIT](LICENSE) - Manavarya Singh
