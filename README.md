<p align="center">
  <img src="website/public/logo-specimen.svg" alt="designlang — reads a website the way a developer reads a stylesheet" width="900">
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/designlang"><img src="https://img.shields.io/npm/v/designlang?color=0A0908&labelColor=F3F1EA&label=npm" alt="npm version"></a>
  <a href="https://github.com/Manavarya09/design-extract/blob/main/LICENSE"><img src="https://img.shields.io/github/license/Manavarya09/design-extract?color=0A0908&labelColor=F3F1EA" alt="license"></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/node/v/designlang?color=0A0908&labelColor=F3F1EA" alt="node version"></a>
  <a href="https://designlang.manavaryasingh.com/"><img src="https://img.shields.io/badge/website-live-FF4800?labelColor=F3F1EA" alt="website"></a>

</p>

---

<p align="center">
  <img src="designlang.png" alt="designlang in action" width="100%">
</p>

[![designlang on npm](https://pkgfolio.vercel.app/embed/pkg/designlang?v=2)](https://www.npmjs.com/package/designlang)

**designlang** crawls any website with a headless browser, extracts every computed style from the live DOM, and generates **17+ output files** — including an AI-optimized markdown file, visual HTML preview, Tailwind config, React theme, shadcn/ui theme, Figma variables, W3C design tokens, CSS custom properties, motion tokens, typed component anatomy stubs, a brand voice summary, **page intent + section roles**, **visual DNA** (material language + imagery style), **component library detection**, a **logo file**, a **multi-page consistency report**, and a **prompt pack** of ready-to-paste prompts for v0, Lovable, Cursor, and Claude Artifacts.

But unlike every other tool out there, it also extracts **layout patterns** (grids, flexbox, containers), **motion language** (durations, easings, springs, scroll-linked animations), **component anatomy** (slots, variant × size × state matrices), **brand voice** (tone, CTA verbs, heading style), captures **responsive behavior** across 4 breakpoints, records **interaction states** (hover, focus, active), scores **WCAG accessibility**, lints your own token files, and lets you **drift-check a codebase against a live site**, **visual-diff two URLs**, **compare multiple brands**, or **sync live sites to local tokens**.

## What's New in v10 — The Intent Release

Everything else captures *how* a site looks. v10 captures *what it is* — the semantic signal an LLM needs to rebuild a site faithfully instead of restyling a generic scaffold.

- **Page Intent** — classifier labels the URL as `landing` / `pricing` / `docs` / `blog` / `blog-post` / `product` / `about` / `dashboard` / `auth` / `legal`, with a confidence score and rival alternates. URL + title + meta + DOM-shape signals. Heuristic-only by default; opt into `--smart` for LLM refinement.
- **Section Roles** — every semantic region gets a role (`hero`, `feature-grid`, `logo-wall`, `stats`, `testimonial`, `pricing-table`, `faq`, `steps`, `comparison`, `gallery`, `bento`, `cta`, `footer`), plus reading order and extracted slot copy (headings, lede, CTA counts).
- **Multi-Page Crawl** — `--full` (or `--pages <n>`) auto-discovers the site's own canonical pages from its nav (pricing/docs/blog/about/product) and runs the full pipeline on each, then emits a cross-page consistency report — shared tokens, per-page uniques, and pairwise Jaccard scores. LLMs get a real design language, not just a homepage snapshot.
- **Material Language** — classifies the visual vocabulary as `glassmorphism` / `neumorphism` / `flat` / `brutalist` / `skeuomorphic` / `material-you` / `soft-ui` / `mixed` from shadow complexity, backdrop-filter usage, saturation, and geometry.
- **Imagery Style** — fingerprints the images: `photography` / `3d-render` / `isometric` / `flat-illustration` / `gradient-mesh` / `icon-only` / `screenshot` / `mixed`, plus dominant aspect ratio and image-radius profile.
- **Component Library Detection** — identifies `shadcn/ui`, `radix-ui`, `headlessui`, `mui`, `chakra-ui`, `mantine`, `ant-design`, `bootstrap`, `heroui`, `tailwind-ui`, `vuetify`, or plain `tailwindcss`, with evidence and alternates.
- **Logo Extraction** — `--full` writes `*-logo.svg` (or `.png`) plus `*-logo.json` with dimensions, aspect, and sampled clearspace.
- **Prompt Pack** — a `*-prompts/` directory with `v0.txt`, `lovable.txt`, `cursor.md`, `claude-artifacts.md`, and atomic `recipe-<component>.md` cards — tokens, section order, voice, and library inlined so one paste is enough.
- **`--smart` mode** — when a heuristic classifier returns low confidence, fall back to a small LLM call (uses `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` from env). Completely optional — no key, no behavior change.

## What's New in v9 — The Motion & Voice Release

- **Motion Language** — durations bucketed into semantic tokens (`instant`/`xs`/`sm`/`md`/`lg`/`xl`), easings classified into families (ease-out, spring-overshoot, steps), scroll-linked animation detection (`animation-timeline`, `view-timeline-name`), keyframe kind classification (slide / fade / reveal / rotate / scale / pulse), and a `feel` fingerprint — *springy*, *responsive*, *smooth*, *mechanical*, or *mixed*.
- **Component Anatomy v2** — every component cluster is now an *anatomy tree* with slots (label, icon, badge, heading, media), variant × size × state matrices, and an emitted `*-anatomy.tsx` file of typed React stubs you can wire into your design system.
- **Brand Voice** — extracts tone (friendly / formal / technical / playful / neutral), pronoun posture (`we→you` / `you-only` / `we-only` / `third-person`), heading style (Title Case / Sentence case / all-lowercase), top CTA verbs, and a microcopy inventory. Feeds LLMs the *voice*, not just the paint.
- **`designlang lint`** — audit your own `design-tokens.json` (DTCG or flat) or `variables.css` for color sprawl, spacing-scale drift, radius/shadow bloat, and WCAG fg/bg contrast fails. Exits non-zero on errors — CI-ready.
- **`designlang drift`** — point at a live site, pass your local token file, and get a verdict: `in-sync` / `minor-drift` / `notable-drift` / `major-drift`. Integrates cleanly with the existing GitHub Action.
- **`designlang visual-diff`** — capture two URLs side-by-side and emit a single-file HTML report with component screenshots, file-size deltas, and changed color tokens. No heavy pixel-diff dependencies — runs in pure Node + Playwright.

## Quick Start

```bash
npx designlang https://stripe.com
```

Get everything at once:

```bash
npx designlang https://stripe.com --full
```

## What You Get (11+ Files)

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
| `*-motion-tokens.json` | **(v9)** Motion tokens — durations, easings, springs, scroll-linked flag |
| `*-anatomy.tsx` | **(v9)** Typed React stubs for every detected component + variants |
| `*-voice.json` | **(v9)** Brand voice fingerprint — tone, CTA verbs, heading style |

The markdown output has **19 sections**: Color Palette, Typography, Spacing, Border Radii, Box Shadows, CSS Custom Properties, Breakpoints, Transitions & Animations, Component Patterns (with full CSS snippets), Layout System, Responsive Design, Interaction States, Accessibility (WCAG 2.1), Gradients, Z-Index Map, SVG Icons, Font Files, Image Style Patterns, and Quick Start.

In v7 a companion `*-mcp.json` file is also written alongside the 8 outputs so that `designlang mcp` can serve regions, components, and health data from disk on later invocations. Opting into `--platforms <csv>` additively emits `ios/`, `android/`, `flutter/`, and/or `wordpress-theme/` directories in the output folder, and `--emit-agent-rules` adds a `.cursor/`, `.claude/`, `CLAUDE.md.fragment`, and `agents.md` set.

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

### 6. Clone Command

Generate a working Next.js app with the extracted design applied:

```bash
designlang clone https://stripe.com
cd cloned-design && npm install && npm run dev
```

One command → a running app with the site's colors, fonts, spacing, and component patterns.

### 7. Design System Scoring

Rate any site's design quality across 7 categories:

```bash
designlang score https://vercel.com
```

```
  68/100  Grade: D

  Color Discipline     ██████████░░░░░░░░░░ 50
  Typography           ██████████████░░░░░░ 70
  Spacing System       ████████████████░░░░ 80
  Shadows              ██████████░░░░░░░░░░ 50
  Border Radii         ████████░░░░░░░░░░░░ 40
  Accessibility        ███████████████████░ 94
  Tokenization         ████████████████████ 100
```

### 8. Watch Mode

Monitor a site for design changes:

```bash
designlang watch https://stripe.com --interval 60
```

Checks hourly and alerts when colors, fonts, or accessibility scores change.

### 9. Apply Command (NEW in v5)

Extract a site's design and write tokens directly into your project — auto-detects your framework:

```bash
designlang apply https://stripe.com --dir ./my-app
```

Detects Tailwind, shadcn/ui, or plain CSS and writes to the right config files automatically.

### 10. Auth Extraction (NEW in v5)

Extract from authenticated or protected pages with cookies and custom headers:

```bash
designlang https://internal-app.com --cookie "session=abc123" --header "Authorization:Bearer token"
```

### 11. Gradient Extraction (NEW in v5)

Detects all CSS gradients — type (linear/radial/conic), direction, color stops, and classifies them as subtle, brand, bold, or complex.

### 12. Z-Index Map (NEW in v5)

Builds a layer hierarchy from all z-index values, groups them into layers (base, sticky, dropdown, modal, etc.), and flags z-index wars or excessive values (>9999).

### 13. SVG Icon Extraction (NEW in v5)

Finds and deduplicates all inline SVGs, classifies them by size and style (outline/solid/duotone), and extracts the icon color palette.

### 14. Font File Detection (NEW in v5)

Identifies every font source — Google Fonts, self-hosted, CDN, or system — and generates ready-to-use `@font-face` CSS.

### 15. Image Style Patterns (NEW in v5)

Detects image aspect ratios, border treatments, filters, and classifies patterns like avatar, hero, thumbnail, and gallery.

### 16. Dark Mode Diffing (NEW in v5)

Compare light and dark mode side-by-side — see exactly which colors change and which CSS variables are overridden:

```bash
designlang https://vercel.com --dark
```

### 17. MCP Server (NEW in v7)

One-command integration with any MCP-aware AI agent (Cursor, Claude Code, Windsurf, and more):

```bash
designlang mcp --output-dir ./design-extract-output
```

Launches a stdio JSON-RPC server that exposes the extracted design as MCP resources and tools.

**Resources:**

- `designlang://tokens/primitive` — primitive token layer
- `designlang://tokens/semantic` — semantic token layer (with DTCG alias references)
- `designlang://regions` — classified page regions (nav, hero, pricing, etc.)
- `designlang://components` — reusable component clusters with variants
- `designlang://health` — CSS health audit

**Tools:**

- `search_tokens` — query tokens by name, value, or type
- `find_nearest_color` — snap any color to the nearest palette token
- `get_region` — fetch a classified region by name
- `get_component` — fetch a component cluster by id
- `list_failing_contrast_pairs` — list every WCAG-failing fg/bg pair with remediation suggestions

### 18. Multi-Platform Output (NEW in v7)

Emit iOS SwiftUI, Android Compose, Flutter, and WordPress block-theme files in a single run, in addition to the default web output:

```bash
designlang https://stripe.com --platforms all
```

Resulting tree:

```
design-extract-output/
├── stripe-com-*.{md,json,css,js,html}    (default web output)
├── ios/
│   └── DesignTokens.swift
├── android/
│   ├── Theme.kt
│   ├── colors.xml
│   └── dimens.xml
├── flutter/
│   └── design_tokens.dart               (+ buildDesignlangTheme())
└── wordpress-theme/
    ├── theme.json
    ├── style.css
    ├── functions.php
    ├── index.php
    └── templates/index.html
```

Values for `--platforms` are any comma-separated subset of `web,ios,android,flutter,wordpress,all`. The flag is additive — the default web output is always emitted.

### 19. Agent Rules Emitter (NEW in v7)

Write agent-facing rule files generated from the resolved semantic tokens:

```bash
designlang https://stripe.com --emit-agent-rules
```

Writes:

- `.cursor/rules/designlang.mdc` — Cursor rule
- `.claude/skills/designlang/SKILL.md` — Claude Code skill
- `CLAUDE.md.fragment` — snippet you can paste into your project's CLAUDE.md
- `agents.md` — generic, vendor-neutral agent guidance

Each file is templated from the semantic layer of the extracted token set, so the agent sees real token names and values — not placeholders.

### 20. Stack + Tailwind Fingerprint (NEW in v7)

Automatic framework, utility-class, and analytics detection surfaced on `design.stack`:

- **Framework**: Next.js, Nuxt, Gatsby, Remix, Astro, Shopify, WordPress, Framer, Webflow, and more.
- **Tailwind**: when Tailwind is in use, records utility-class frequency so you see which utilities drive the design.
- **Analytics**: inventory of analytics scripts — GA4, Plausible, PostHog, Segment, Mixpanel, Amplitude, and friends.

### 21. CSS Health Audit (NEW in v7)

A dedicated audit pass surfaced on `design.cssHealth`:

- Specificity graph (distribution, hotspots)
- `!important` count
- Duplicate declarations
- Unused CSS via the Playwright Coverage API
- `@keyframes` catalog
- Vendor-prefix audit

Also contributes a `cssHealth` dimension to the overall design score.

### 22. Chrome Extension (NEW in v7.1)

A Manifest-v3 popup lives in [`chrome-extension/`](chrome-extension/). One click on any tab opens `designlang.manavaryasingh.com` with the URL prefilled — no copy-paste, no context switch. There is also a **Copy CLI** button that puts `npx designlang <url>` in your clipboard.

- **Permissions:** `activeTab` only, plus host access to the hosted extractor.
- **Install:** toggle developer mode at `chrome://extensions`, click *Load unpacked*, pick the `chrome-extension/` folder.
- **Firefox + Edge** work with the same MV3 manifest.

### 24. Motion Language (NEW in v9)

Extracts the full motion fingerprint, not just transition strings:

```bash
designlang https://linear.app
# emits linear-app-motion-tokens.json
```

```
Motion: feel = springy, 2 spring easings, scroll-linked = yes
Durations: instant (80ms), xs (150ms), sm (220ms), md (380ms)
Easings: ease-out (61%), spring-overshoot (18%), ease-in-out (21%)
Keyframes: fade-up (slide-y, used 18x), scale-in (reveal, used 4x)
```

### 25. Component Anatomy v2 (NEW in v9)

Every detected component becomes an anatomy tree with typed React stubs:

```bash
designlang https://stripe.com
# emits stripe-com-anatomy.tsx
```

```tsx
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  leadingIcon?: React.ReactNode;
  badge?: React.ReactNode;
  children?: React.ReactNode;
}
```

### 26. Brand Voice (NEW in v9)

Pulls the voice alongside the visual:

```bash
designlang https://vercel.com
# emits vercel-com-voice.json + a Brand Voice section in the markdown
```

```
Tone: technical · Pronoun: we→you · Headings: Sentence case (tight)
Top CTA verbs: start (14), get (8), deploy (5), try (3)
Sample headings:
  > Develop. Preview. Ship.
  > The React framework for the web.
```

### 27. `designlang lint` — Token Quality Linter (NEW in v9)

Audit your own token file with the same rules the scorer runs against live sites:

```bash
designlang lint ./src/tokens/design-tokens.json
```

```
Score: 74/100  Grade: C   Tokens: 126

  colorDiscipline      ██████████████░░░░░░ 72
  spacingSystem        ████████████████░░░░ 84
  borderRadii          ████████████░░░░░░░░ 60
  shadows              ██████████░░░░░░░░░░ 50
  accessibility        █████████████████░░░ 88

  WARN  [color-sprawl] 3 near-duplicate color pair(s) within 8 RGB units
  ERROR [contrast-wcag-aa] 2 fg/bg pair(s) fail WCAG AA (4.5:1)
```

Exits non-zero on any `error`-level finding — drop into CI.

### 28. `designlang drift` — Codebase ↔ Live Site Sync Check (NEW in v9)

Point at a deployed site, pass your local tokens, and get a verdict:

```bash
designlang drift https://yourapp.com --tokens ./src/tokens.json --tolerance 8
```

```
Verdict: notable-drift (drift ratio: 0.24)

| token          | local    | nearest live       | Δ  |
|----------------|----------|--------------------|----|
| color.primary  | #4338CA  | #5B4CF5 (primary)  | 22 |
| color.border   | #D4D4D8  | #E5E5EA (surface)  | 18 |
```

Configurable `--fail-on <level>` for CI: `minor-drift` / `notable-drift` / `major-drift`.

### 29. `designlang visual-diff` — Two-URL Side-by-Side (NEW in v9)

Capture screenshots + token deltas for two URLs in a single self-contained HTML report:

```bash
designlang visual-diff https://staging.app.com https://app.com
```

Emits `visual-diff-<timestamp>.html` with embedded images (base64), file-size deltas, and a changed-color-tokens table. Nothing else to serve — just open the file.

### 30. Better Auth + Network Control (v7.1)

Extracting from authenticated, self-signed, or non-default environments now takes one flag:

- **`--cookie-file <path>`** — loads cookies from JSON array, Playwright `storageState.json`, or Netscape `cookies.txt` (browser extensions, curl exports). Merges cleanly with the existing `--cookie name=value` flag.
- **`--insecure`** — ignore HTTPS/SSL certificate errors for self-signed dev servers, corporate staging, or MITM tools.
- **`--user-agent <ua>`** — override the browser User-Agent string.

```bash
designlang https://staging.internal --cookie-file ./session.json --insecure
```

## All Features

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
  Components: 11 types detected (with CSS snippets)
  CSS Vars: 407 custom properties
  Layout: 55 grids, 492 flex containers
  Gradients: 4 unique gradients
  Z-Index: 8 layers mapped
  Icons: 23 unique SVGs
  Font Files: 4 font sources detected
  Images: 6 style patterns
  Responsive: 4 viewports, 3 breakpoint changes
  Interactions: 8 state changes captured
  A11y: 94% WCAG score (7 failing pairs)
  Design Score: 68/100 (D) — 4 issues
```

## How It Works

1. **Crawl** — Launches headless Chromium via Playwright, waits for network idle and fonts
2. **Extract** — Single `page.evaluate()` walks up to 5,000 DOM elements collecting 25+ computed style properties, layout data, inline SVGs, font sources, and image metadata
3. **Process** — 17 extractor modules parse, deduplicate, cluster, and classify the raw data (including gradients, z-index layers, icons, fonts, and image patterns)
4. **Format** — 8 formatter modules generate output files
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

## Agent Skill

Works with **Claude Code, Cursor, Codex, and 40+ AI coding agents** via the skills ecosystem:

```bash
npx skills add Manavarya09/design-extract
```

In Claude Code, use `/extract-design <url>`.

## Website

**[https://designlang.manavaryasingh.com](https://designlang.manavaryasingh.com/)** — the brutalist product page.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). PRs welcome!

## License

[MIT](LICENSE) - Manav Arya Singh


