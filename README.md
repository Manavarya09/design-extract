# design-extract

Extract the complete design language from any website. Produces an AI-optimized markdown file, W3C design tokens, Tailwind config, and CSS variables.

## Install & Use

```bash
npx @masyv/design-extract https://example.com
```

Or install globally:

```bash
npm install -g @masyv/design-extract
design-extract https://example.com
```

## What It Extracts

- **Colors** — full palette with primary/secondary/accent/neutral classification
- **Typography** — font families, type scale, heading/body styles, weight distribution
- **Spacing** — spacing scale with automatic base unit detection
- **Border Radii** — all unique values with size labels
- **Box Shadows** — parsed and classified by visual weight
- **CSS Custom Properties** — all `:root` variables, categorized
- **Breakpoints** — media query breakpoints with standard labels
- **Transitions & Animations** — easings, durations, keyframes
- **Component Patterns** — buttons, cards, inputs, links with base styles

## Output Files

| File | Description |
|------|-------------|
| `*-design-language.md` | Rich markdown optimized for AI/LLM consumption |
| `*-design-tokens.json` | W3C Design Tokens format |
| `*-tailwind.config.js` | Ready-to-use Tailwind CSS theme |
| `*-variables.css` | CSS custom properties |

## Options

```
design-extract <url> [options]

Options:
  -o, --out <dir>       Output directory (default: ./design-extract-output)
  -n, --name <name>     Output file prefix (default: derived from URL)
  -w, --width <px>      Viewport width (default: 1280)
  -h, --height <px>     Viewport height (default: 800)
  --wait <ms>           Wait after page load for SPAs (default: 0)
  --dark                Also extract dark mode styles
  --verbose             Show detailed progress
```

## Claude Code Plugin

This is also a Claude Code plugin. Install it and use `/extract-design <url>` to extract design languages directly in your coding session.

## License

MIT
