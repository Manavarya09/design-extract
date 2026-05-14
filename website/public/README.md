<p align="center">
  <img src="https://raw.githubusercontent.com/Manavarya09/design-extract/main/website/public/logo-specimen.svg" alt="designlang — reads a website the way a developer reads a stylesheet" width="900">
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/designlang"><img src="https://img.shields.io/npm/v/designlang?color=0A0908&labelColor=F3F1EA&label=npm" alt="npm version"></a>
  <a href="https://github.com/Manavarya09/design-extract/blob/main/LICENSE"><img src="https://img.shields.io/github/license/Manavarya09/design-extract?color=0A0908&labelColor=F3F1EA" alt="license"></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/node/v/designlang?color=0A0908&labelColor=F3F1EA" alt="node version"></a>
  <a href="https://designlang.manavaryasingh.com/"><img src="https://img.shields.io/badge/website-live-FF4800?labelColor=F3F1EA" alt="website"></a>

</p>

---

<p align="center">
  <img src="https://raw.githubusercontent.com/Manavarya09/design-extract/main/designlang.png" alt="designlang in action — extracts DTCG tokens, Tailwind config, Figma variables, brand book PDF" width="100%">
</p>

[![designlang on npm](https://pkgfolio.vercel.app/embed/pkg/designlang?v=2)](https://www.npmjs.com/package/designlang)

**designlang** points a headless browser at any URL and reads the design system off the live DOM. One command emits 17+ files — DTCG tokens, Tailwind config, shadcn theme, Figma variables, motion tokens, typed component anatomy, brand voice, page-intent labels, and a paste-ready prompt pack for v0 / Lovable / Cursor / Claude Artifacts.

It also goes where extractors don't: **layout patterns**, **responsive behavior across 4 breakpoints**, **hover / focus / active states**, **WCAG contrast scoring**, **multi-page consistency**, **drift checks against a live source-of-truth**, **visual-diffs**, and a **shareable graded report card**.

## Quick start

```bash
npx designlang https://stripe.com                      # extract everything
npx designlang pair stripe.com linear.app              # fuse two designs (visuals A × voice B)    ← v12.8
npx designlang brand stripe.com                        # full brand-guidelines book (13 chapters)  ← v12.7
npx designlang theme-swap stripe.com --primary "#ff4800"  # recolour around your brand        ← v12.6
npx designlang pack stripe.com                         # one polished design-system directory ← v12.4
npx designlang remix stripe.com --as cyberpunk         # restyle in another vocabulary       ← v12.3
npx designlang remix stripe.com --all                  # emit all 6 vocabs at once           ← v12.3
npx designlang grade https://stripe.com --badge        # report card + SVG badge             ← v12.2
npx designlang battle stripe.com vercel.com            # head-to-head graded fight           ← v12.2
npx designlang clone https://stripe.com                # working Next.js starter
npx designlang --full https://stripe.com               # screenshots + responsive + interactions
```

Drop a live design-score badge in any README:

```markdown
![Design Score](https://designlang.app/badge/stripe.com.svg)
```

## Install

```bash
npm i -g designlang                         # global
npx skills add Manavarya09/design-extract   # as an agent skill (40+ agents)
```

## What you get

Each run writes 17+ files to `./design-extract-output/`. The headline outputs:

| File | What it is |
|---|---|
| `*-design-language.md` | 19-section markdown — feed any LLM to recreate the design |
| `*-design-tokens.json` | W3C DTCG tokens (primitive + semantic + composite layers) |
| `*-tailwind.config.js` | Drop-in Tailwind theme |
| `*-shadcn-theme.css` | shadcn/ui `globals.css` variables |
| `*-figma-variables.json` | Figma Variables import (light + dark) |
| `*-variables.css` | CSS custom properties |
| `*-anatomy.tsx` | Typed React stubs for every detected component + variants |
| `*-motion-tokens.json` | Durations, easings, springs, scroll-linked flag |
| `*-voice.json` | Brand voice — tone, pronoun posture, CTA verbs |
| `*-prompts/` | Paste-ready prompts for v0, Lovable, Cursor, Claude Artifacts |
| `*-mcp.json` | Disk-backed MCP server payload |
| `*-grade.html` | **v12.1** Shareable Design Report Card (letter grade + evidence) |
| `*-grade.svg` | **v12.2** Shields.io-style design-score badge (drop into any README) |
| `*-battle.html` | **v12.2** Head-to-head graded battle card from `designlang battle` |
| `*-remix.<vocab>.html` | **v12.3** Site restyled in another vocabulary — brutalist / swiss / art-deco / cyberpunk / soft-ui / editorial |

Multi-platform (`--platforms web,ios,android,flutter,wordpress,all`) adds `ios/`, `android/`, `flutter/`, and a WordPress block theme. `--emit-agent-rules` adds Cursor / Claude Code / generic agent rule files.

## Why designlang vs anything else

Other tools give you the paint. designlang reads the architecture:

- **Layout system** — grids, flex containers, container widths, gaps — not just tokens.
- **Responsive** — crawls 4 breakpoints and reports what changes (`--responsive`).
- **Interaction states** — programmatically hovers and focuses, captures the deltas (`--interactions`, `--deep-interact`).
- **Motion language** — durations, easing families, spring detection, scroll-linked flag, `feel` fingerprint (springy / smooth / mechanical / mixed).
- **Component anatomy** — slot trees with variant × size × state matrices, emitted as typed `.tsx`.
- **Brand voice** — tone, pronoun posture, heading style, CTA verb inventory.
- **Page intent + section roles** — `landing` / `pricing` / `docs` etc., with semantic regions (`hero`, `feature-grid`, `pricing-table`, `cta`…).
- **Multi-page consistency** — auto-discovers canonical pages, reconciles shared vs per-route tokens.
- **WCAG** — every fg/bg pair scored, with a remediation palette suggesting nearest passing colors.
- **Drift + lint + visual-diff** — `designlang drift`, `lint`, `visual-diff` all CI-ready, exit non-zero on failure.
- **Live-site sync** — treat the deployed site as source of truth (`designlang sync`).
- **MCP server** — `designlang mcp` exposes tokens, regions, components, and contrast pairs to any MCP-aware agent.

```bash
designlang grade https://stripe.com         # ← v12.1: shareable report card
designlang clone https://stripe.com         # → working Next.js app
designlang apply https://stripe.com -d ./app   # auto-detect framework, write tokens
designlang brands stripe.com vercel.com linear.app   # N-brand matrix
designlang drift https://yourapp.com --tokens ./src/tokens.json
designlang lint ./src/tokens/design-tokens.json     # CI-ready linter
designlang visual-diff https://staging.app https://app   # single-file HTML diff
designlang mcp                              # stdio MCP server for Cursor / Claude Code
```

## All features

| Feature | Flag / Command | Description |
|---------|---------------|-------------|
| Base extraction | `designlang <url>` | Colors, typography, spacing, shadows, radii, CSS vars, breakpoints, animations, components |
| Layout system | automatic | Grid patterns, flex usage, container widths, gap values |
| Accessibility | automatic | WCAG 2.1 contrast ratios for all fg/bg pairs |
| Design scoring | automatic | 7-category quality rating (A-F) with actionable issues |
| Gradients | automatic | Gradient type, direction, stops, classification |
| Z-index map | automatic | Layer hierarchy, z-index wars detection |
| SVG icons | automatic | Deduplicated icons, size/style classification, color palette |
| Font files | automatic | Source detection (Google/self-hosted/CDN/system), @font-face CSS |
| Image styles | automatic | Aspect ratios, shapes, filters, pattern classification |
| Dark mode | `--dark` | Extracts dark color scheme + light/dark diff |
| Auth pages | `--cookie`, `--cookie-file`, `--header` | Extract from authenticated/protected pages; cookie files in JSON / Playwright storageState / Netscape formats |
| Self-signed / dev TLS | `--insecure` | Ignore HTTPS/SSL certificate errors |
| User-Agent override | `--user-agent <ua>` | Set a custom User-Agent string |
| Chrome extension | `chrome-extension/` | One-click handoff from any tab, MV3, `activeTab` only |
| Multi-page | `--depth <n>` | Crawl N internal pages; emits shared-vs-per-route token reconciliation (`*-tokens-shared.json`, `*-tokens-routes/<slug>.json`, `*-routes-report.md`) |
| Screenshots | `--screenshots` | Capture buttons, cards, inputs, nav, hero, full page |
| Responsive | `--responsive` | Crawl at 4 viewports, map breakpoint changes |
| Interactions | `--interactions` | Capture hover/focus/active state transitions |
| Auto-interact | `--deep-interact` | Scroll, open menus/modals/accordions, hover CTAs before extraction |
| Everything | `--full` | Enable screenshots + responsive + interactions + deep-interact |
| Apply | `designlang apply <url>` | Auto-detect framework and write tokens to your project |
| Clone | `designlang clone <url>` | Generate a working Next.js starter with extracted design |
| Score | `designlang score <url>` | Rate design quality with visual bar chart breakdown |
| Grade (v12.1) | `designlang grade <url>` | Shareable HTML "Design Report Card" — letter grade, 8 dimensions, evidence, strengths + fixes |
| Battle (v12.2) | `designlang battle <A> <B>` | Head-to-head graded battle card with verdict, dimension table, palette comparison |
| Badge (v12.2) | `designlang grade --badge` | Shields.io-style SVG badge — `design · B · 87` — drop into any README. Live endpoint: `designlang.app/badge/<host>.svg` |
| Remix (v12.3) | `designlang remix <url> --as <vocab>` | Restyle the audited page in another vocabulary (brutalist / swiss / art-deco / cyberpunk / soft-ui / editorial). `--all` emits all 6 |
| Pack (v12.4) | `designlang pack <url>` | Bundle every output (tokens / components / Storybook / starter / prompts) into one polished design-system directory |
| Theme-swap (v12.6) | `designlang theme-swap <url> --primary <hex>` | Recolour the extracted design around a new brand primary. OKLCH hue rotation, neutrals preserved, type/spacing/motion untouched |
| Brand book (v12.7) | `designlang brand <url>` | Full editorial brand-guidelines document (13 chapters: cover, about, logo, colour, type, spacing, shape, iconography, motion, components, voice, a11y, tokens, how-to-use). Print-ready, dark-mode toggle, hand-off-ready |
| Pair (NEW v12.8) | `designlang pair <urlA> <urlB>` | Fuse two designs across 7 axes (colours/type/spacing/shape/motion/voice/components). Defaults to "visuals from A, voice + type from B". `--brand` also emits a brand book of the fused identity |
| Watch | `designlang watch <url>` | Monitor for design changes on interval |
| Diff | `designlang diff <A> <B>` | Compare two sites (MD + HTML) |
| Multi-brand | `designlang brands <urls...>` | N-site comparison matrix |
| Sync | `designlang sync <url>` | Update local tokens from live site |
| History | `designlang history <url>` | Track design changes over time |
| MCP server | `designlang mcp` | Expose extraction as MCP resources + tools |
| Multi-platform | `--platforms <csv>` | Emit iOS / Android / Flutter / WordPress outputs |
| Agent rules | `--emit-agent-rules` | Cursor, Claude Code, generic agent rule files |
| Stack fingerprint | automatic | Framework + Tailwind + analytics detection |
| CSS health | automatic | Specificity, !important, unused CSS, keyframes |
| A11y remediation | automatic | Nearest palette color passing AA / AAA for every failing pair |
| Semantic regions | automatic | nav / hero / pricing / testimonials / cta / footer classification |
| Reusable components | automatic | DOM subtree + style-vector clustering with variants |
| DTCG tokens | default | W3C Design Tokens v1 with semantic + composite layers (`--tokens-legacy` for pre-v7) |

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
  --deep-interact         Auto-interact pass (scroll, menus, modals, accordions, hover CTAs)
  --full                  Enable all captures (implies --deep-interact)
  --cookie <cookies...>   Cookies for authenticated pages (name=value)
  --cookie-file <path>    Load cookies from JSON / storageState / Netscape cookies.txt
  --header <headers...>   Custom headers (name:value)
  --user-agent <ua>       Override the browser User-Agent string
  --insecure              Ignore HTTPS/SSL certificate errors (self-signed, dev, proxies)
  --selector <css>        Only extract from elements matching this CSS selector (e.g. ".pricing-card")
  --system-chrome         Use the system Chrome install instead of the bundled Chromium (skips 150MB download)
  --json                  Print full extraction as JSON to stdout (for piping into other tools)
  --framework <type>      Only generate specific theme (react, shadcn)
  --platforms <csv>       Additional platforms: web,ios,android,flutter,wordpress,all (additive)
  --emit-agent-rules      Emit Cursor / Claude Code / CLAUDE.md / agents.md rule files
  --tokens-legacy         Emit pre-v7 flat design-tokens.json shape (backward compat)
  --no-history            Skip saving to history
  --verbose               Detailed progress output

Commands:
  apply <url>                       Extract and apply design directly to your project
  clone <url>                       Generate a working Next.js starter from extracted design
  score <url>                       Rate design quality (7 categories, A-F, bar chart)
  grade <url>                       Generate a shareable HTML Design Report Card (--format html|md|json|svg|all, --badge, --open)
  battle <urlA> <urlB>              Head-to-head graded battle card (--format html|md|json|all, --open)
  remix <url>                       Restyle in another vocabulary (--as brutalist|swiss|art-deco|cyberpunk|soft-ui|editorial, --all, --list, --open)
  pack <url>                        Bundle every output into one design-system directory (--with-clone, --open)
  theme-swap <url> --primary <hex>  Recolour around a new brand primary (--from, --format html|md|json|tokens|all, --open)
  brand <url>                       Generate a full editorial brand-guidelines book (--format html|md|json|all, --open)
  pair <urlA> <urlB>                Fuse two designs across 7 axes (--colors-from, --typography-from, --spacing-from, --shape-from, --motion-from, --voice-from, --components-from, --brand)
  watch <url>                       Monitor for design changes on interval
  diff <urlA> <urlB>                Compare two sites' design languages
  brands <urls...>                  Multi-brand comparison matrix
  sync <url>                        Sync local tokens with live site
  history <url>                     View design change history
  mcp                               Launch stdio MCP server (--output-dir <dir>)
  lint <file>                       (v9) Audit a local token file (.json/.css) — CI-ready
  drift <url> --tokens <file>       (v9) Check local tokens for drift against a live site
  visual-diff <before> <after>      (v9) Side-by-side HTML diff of two URLs
```

## Example output

`designlang https://vercel.com --full` →

```
Colors: 27 · Fonts: Geist + Geist Mono · Spacing: 18 (base 2px)
Shadows: 11 · Radii: 10 · CSS vars: 407 · Layout: 55 grids / 492 flex
Responsive: 4 viewports, 3 breakpoint changes · Interactions: 8 transitions
A11y: 94% WCAG · Score: 68/100 (D) · 4 issues

→ 17 files written to ./design-extract-output/
→ Run `designlang grade https://vercel.com` for a shareable report card
```

## How it works

1. **Crawl** — Headless Chromium via Playwright, waits for network idle and fonts
2. **Extract** — One `page.evaluate()` walks up to 5,000 DOM elements, collecting 25+ computed properties, inline SVGs, font sources, and image metadata
3. **Process** — 17 extractor modules parse, deduplicate, cluster, and classify the raw data
4. **Format** — 12+ formatter modules emit the output files
5. **Score** — Accessibility extractor calculates WCAG contrast ratios for all color pairs
6. **Capture** — Optional: screenshots, responsive viewport crawling, interaction state recording

## Install Everywhere

designlang ships surfaces beyond the CLI:

| Surface | Path | Description |
|---------|------|-------------|
| **CLI** | `npx designlang <url>` | Main entry point. |
| **VS Code extension** | [`vscode-extension/`](vscode-extension/) | "Extract design from URL" command + auto-inject into workspace. |
| **Raycast extension** | [`raycast-extension/`](raycast-extension/) | Extract, score, and "copy CLI command" from Raycast. |
| **Figma plugin** | [`figma-plugin/`](figma-plugin/) | Paste a URL inside Figma, get a full Variables collection. |
| **GitHub Action** | [`github-action/`](github-action/) | "Design regression guard" — diffs tokens on every PR and comments. |
| **Chrome extension** | [`chrome-extension/`](chrome-extension/) | One-click handoff from any tab (MV3, `activeTab` only). |
| **MCP server** | `npx designlang mcp` | Exposes the extracted design as MCP resources + tools for Cursor, Claude Code, Windsurf, etc. See [`docs/MCP-REGISTRY.md`](docs/MCP-REGISTRY.md). |
| **Claude Code plugin** | [`.claude-plugin/`](.claude-plugin/) | Five slash commands inside Claude Code — `/extract`, `/grade`, `/battle`, `/remix`, `/pack`. |

## Claude Code plugin

Drop designlang straight into Claude Code as a plugin. Every CLI command becomes a slash command:

```bash
/plugin install Manavarya09/design-extract
```

Then inside any Claude Code session:

| Slash command | What it does |
|---|---|
| `/extract <url>` | Full extraction → DTCG tokens, Tailwind, Figma vars, motion, voice |
| `/grade <url>` | Shareable HTML "Design Report Card" (+ `--badge` for an SVG) |
| `/battle <urlA> <urlB>` | Head-to-head graded battle card |
| `/remix <url> --as <vocab>` | Restyle in brutalist / swiss / art-deco / cyberpunk / soft-ui / editorial |
| `/pack <url>` | Bundle every output into one design-system directory |

Manifest: [`.claude-plugin/plugin.json`](.claude-plugin/plugin.json) · marketplace: [`.claude-plugin/marketplace.json`](.claude-plugin/marketplace.json) · commands: [`commands/`](commands/) · skills: [`skills/`](skills/).

## Agent skill (other ecosystems)

Works with **Cursor, Codex, and 40+ AI coding agents** via the skills ecosystem:

```bash
npx skills add Manavarya09/design-extract
```

In Cursor / Codex / etc., use `/extract-design <url>`.

## Website

**[https://designlang.manavaryasingh.com](https://designlang.manavaryasingh.com/)** — the brutalist product page.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). PRs welcome!

## License

[MIT](LICENSE) - Manav Arya Singh


