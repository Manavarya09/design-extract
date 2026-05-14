# Changelog

## [12.12.0] — 2026-05-15

**Website launch — designlang.app, fully rebuilt.**

The marketing/demo site at [designlang.app](https://designlang.app) has been
rewritten from the ground up. Highlights:

- **Hero with WebGL Grainient background** (red/black, ogl-powered, GPU-paused
  when offscreen) and a terminal output card showing real CLI execution.
- **Live demo showcase** (`See it work.`) — paste any URL into a glass
  stage, suggestion chips for stripe.com / linear.app / vercel.com /
  notion.so / figma.com, click-to-copy `npx designlang stripe.com` in the
  hero.
- **Real gallery** — eight pre-rendered brand books for stripe.com,
  linear.app, vercel.com, notion.so, figma.com, apple.com, arc.net and
  spotify.com. Each card is the actual extraction the CLI produced; the
  cover gradient uses the extracted primary + accent tokens.
- **Floating glass nav** with a custom logo, segmented pill links, real
  GitHub star count fetched from the API (server-rendered, 30 min revalidate),
  and an `npm i designlang` CTA matching the hero gradient.
- **Auto-scrolling reddit testimonial marquee** (3 cols, motion/react)
  with the real comments from the r/ClaudeAI launch thread.
- **Polished footer** with brand block, 4 link columns, decorative giant
  outlined wordmark, version + author + license strip.
- **Aggressive SEO** — keyword-dense title and description, ~75-keyword
  list; JSON-LD graph with `SoftwareApplication`, `Organization`,
  `WebSite + SearchAction`, `BreadcrumbList`, `FAQPage`, `HowTo`;
  `aggregateRating` from real GitHub stars; visible FAQ section + ~250-word
  about block; sitemap includes the 8 gallery brand books; rewritten
  `llms.txt` for AI-search citability (allows GPTBot, ClaudeBot,
  PerplexityBot, Google-Extended, Applebot-Extended, etc.).

**Web extractor parity with the CLI.**

- `/api/extract`'s file output now includes the brand-book HTML
  (`<host>.brand.html`) for every run.
- `formatBrandBook` is shared between the CLI and the website's
  `lib/build-files.js`.

**Other**

- Fixed the README so the logo and "designlang in action" image render
  on the npm package page (relative paths swapped for raw GitHub URLs).
- Removed all decorative status dots from the website per design feedback;
  status indicators are now typed text chips.

## [12.11.0] — 2026-05-15

**`brand --pdf` ships native PDF brand guides.**

```bash
npx designlang brand stripe.com --pdf
# → stripe-com.brand.pdf  (print-ready, ~3–5s)
```

What you get on top of any "save as PDF":

- **Per-chapter page breaks** — every section starts on a fresh page.
- **Running footer** — `designlang · <subject> · <page> of <total>` on every page.
- **Selectable text + embedded fonts** — never rasterized.
- **`--paper a4|letter|tabloid` + `--landscape`** for any output target.
- **`--attach-tokens`** embeds the DTCG tokens JSON *inside* the PDF as a
  proper file attachment — open the PDF in Preview/Acrobat, hit the
  paperclip, drop the JSON straight into Tailwind.
- **`--no-print-background`** strips the brand-colour cover band for a
  smaller file when you need it.

Adds one tiny dep (`pdf-lib`, MIT, ~600KB) used only when `--attach-tokens`
is passed; lazy-imported behind a dynamic `import()`.

## [12.10.1] — 2026-05-13

**Tiny ship: \`stats\` now scans multiple URLs at once.**

\`designlang stats\` previously took exactly one URL. Now it takes any
number, runs them in parallel, and prints each block with a divider:

\`\`\`bash
npx designlang stats stripe.com vercel.com linear.app
\`\`\`

In \`--as-json\` mode:

- One URL → a bare object (legacy shape, unchanged)
- Two-or-more URLs → an array of objects
- Per-URL failures don't kill the batch — they surface as
  \`{ url, error }\` in JSON or a red row in pretty mode, and the
  process exits non-zero only when at least one site failed.

No flag changes, no schema breaks for the existing single-URL callers.

## [12.10.0] — 2026-05-12

**Small ship: \`designlang stats\` + low-confidence warning in grade cards.**

Two tight quality-of-life additions on top of the v12.9 extraction pass.

### Added

- **\`designlang stats <url>\`** — one-screen summary to stdout. Grade, primary, fonts, spacing base, WCAG, stack, library, tone, material, intent — all in ~15 lines. No files written. Use \`-j\` / \`--as-json\` for machine-readable output (CI, scripting).

  \`\`\`
  Grade        B · 87/100
  Primary      #533afd ×899 59% conf
  Fonts        sohne-var
  Type scale   14 sizes
  Spacing      base 2px · 13 steps
  Shape        5 radii · 6 shadows
  Colours      31 tokens
  WCAG         79%
  Stack        next · unknown
  Material     skeuomorphic
  Tone         neutral
  Intent       landing
  \`\`\`

- **Low-confidence primary warning in \`grade.html\`.** Surfaces the v12.9
  \`primary.confidence\` field when it drops under 0.5 — a soft, amber
  callout above the dimensions grid that tells the reader the brand
  colour is a near-tie pick rather than a runaway leader. Renders as
  ordinary inline note, not an error. Stays out of the way when
  confidence is high (the common case).

### Why \`stats\`?

Every other command writes files. There was no one-line "what's this
site made of" path for scripting, CI summaries, or a quick sanity
check. \`stats\` fills that gap without bloat — it's the read-only,
zero-side-effect entry point.

2 new tests (low-confidence note present + absent paths). 398/398 total.

## [12.9.0] — 2026-05-11

**Extraction quality pass — the core MVP, fixed.**

Eight features rode on top of the same extractor. This release fixes
four real defects in that extractor — visible across grade, battle,
remix, pack, theme-swap, brand, and pair without anyone having to
re-run the downstream code.

### Fixed

- **Cluster representative bug** in \`clusterColors()\`. Before: the first-
  encountered colour seeded each cluster, so a sparsely-used pale shade
  could become the canonical hex for a cluster that mostly held a vivid
  brand colour. The brand-book primary slot was reading lavender for
  Stripe instead of \`#533afd\`. Fixed: representative is now the
  most-counted member of the cluster.
- **Spacing base detection** missed common production scales. Before:
  only \`[2, 4, 6, 8]\` were tried as base candidates, so Bootstrap-style
  base-5 sites and base-7/10/12 sites returned \`base: null\`. Fixed:
  expanded to \`[2, 4, 5, 6, 7, 8, 10, 12, 16]\` with a small bonus for
  4 and 8 to keep results stable for the production-default sites.
- **Typography noise**. Before: generic CSS stacks (\`sans-serif\`,
  \`monospace\`, \`system-ui\`, \`inherit\`), OS UI fonts (\`-apple-system\`),
  and icon fonts (Material Icons, Font Awesome, Lucide, Tabler, etc.)
  polluted the \`families\` list, making the brand book mistakenly
  document an icon font as the brand's body family. Fixed: explicit
  generic + icon-family filter at the source.

### Added

- **\`primary.confidence\`** (0–1) on \`design.colors.primary\`. Computed
  from the score gap between rank 1 and rank 2 brand candidates — a
  runaway leader scores 1.0; a near-tie scores 0.3. Downstream
  consumers (brand book, grade, theme-swap) can surface uncertainty
  warnings on low-confidence extractions.
- **\`asList(v)\`** helper exported from \`src/utils.js\`. Coerces
  anything-shaped input (array / object / comma-string / scalar) into
  a clean string array. Consolidates the per-formatter ad-hoc
  defenses (brand-book, pair, pack all had their own copies).

### Why

Verified live on \`stripe.com\`:

- Pre-v12.9: primary slot showed a lavender shade, multiple icon-font
  entries in families, spacing base often \`null\`.
- v12.9: primary \`#533afd\` (count 899, confidence 0.59), \`families:
  ['sohne-var']\`, spacing base detected correctly.

No new dependencies, no schema breaks, no public-API changes. 396/396
tests pass (6 new — base-5 + base-6 detectScale, cluster representative
correctness, generic-family filter, icon-family filter, asList shape
coercion).

## [12.8.0] — 2026-05-10

**Pair — fuse two extracted designs into a single hybrid identity.**

\`designlang pair <urlA> <urlB>\` extracts both sites in parallel, then
mixes their design systems along seven configurable axes (colours,
typography, spacing, shape, motion, voice, components). Default split is
"visuals from A, voice + type + components from B" — i.e. the most
distinctive crossover. Override any axis with \`--<axis>-from a|b\`.

\`\`\`bash
npx designlang pair stripe.com linear.app
\`\`\`

\`\`\`
stripe.com × linear.app
  A  Colours      · stripe.com
  B  Typography   · linear.app
  A  Spacing      · stripe.com
  A  Shape        · stripe.com
  A  Motion       · stripe.com
  B  Voice        · linear.app
  B  Components   · linear.app

✓ stripe-com-x-linear-app.pair.html
✓ stripe-com-x-linear-app.pair.md
✓ stripe-com-x-linear-app.pair.json
\`\`\`

### Added

- New CLI command: \`designlang pair <urlA> <urlB>\` with \`--colors-from\`,
  \`--typography-from\`, \`--spacing-from\`, \`--shape-from\`, \`--motion-from\`,
  \`--voice-from\`, \`--components-from\`, plus \`--brand\` to also emit a
  full brand-guidelines book of the fused identity.
- New module \`src/fuse.js\` — \`fuseDesigns(a, b, opts)\` deep-clones both
  inputs, picks each axis from the requested source, synthesises a
  pair-specific meta URL (\`pair://<a>-x-<b>\`), and strips score /
  cssHealth (those belong to the source extractions, not the fusion).
- New formatter \`src/formatters/pair.js\` — editorial pair card with a
  three-card crossover (A · B · Fused), per-axis source matrix table,
  and a fused specimen using the *real headline* from whichever site
  contributed the voice axis.
- Plus \`formatPairMarkdown\` for diff-friendly summaries.
- 12 new tests covering default split, per-axis overrides, score-stripping,
  meta synthesis, immutability of source designs, HTML rendering, voice
  carry-through to the specimen, XSS escaping, and missing-input errors.

### Plugin

\`/pair\` is the 8th slash command in the Claude Code plugin
(\`/extract\`, \`/grade\`, \`/battle\`, \`/remix\`, \`/pack\`, \`/theme-swap\`,
\`/brand\`, \`/pair\`). Plugin manifests bumped to 12.8.0.

### Why

\`battle\` answers "which is better"; \`pair\` answers "what would the
intersection look like". Same parallel extraction, opposite operation.
Pure logic, no LLM, no new dependencies.

## [12.7.1] — 2026-05-09

**Brand book — visual polish pass.**

The v12.7.0 brand book had a real-data deficit: the cover used a generic
grade-coloured accent strip, every section opened with a philosophical
lede ("the felt pace of an interface", "form follows feeling"), and
components were a metadata table instead of a real mock. This pass
replaces all of that with the extracted values themselves.

Changes:

- **Cover** now leads with the brand's actual primary as a full-bleed
  band (auto-detected, falls back through secondary/accent/most-used).
  Asymmetric layout — band + label + hex above, host name in massive
  serif below.
- **Lede paragraphs replaced with one-line data summaries.**
  "1 primary · 1 secondary · 1 accent · 27 neutrals · 88 total" instead
  of "Brand colours carry meaning. Neutrals carry structure."
- **Type specimen** now uses real headlines extracted from the site's
  voice (`design.voice.sampleHeadings`). Falls back to a single neutral
  pangram only when those are absent. The recycled aphorisms ("quiet
  authority of restraint", "form follows feeling") are gone.
- **Colour chapter** — primary at full-width hero card, secondary +
  accent at half-width below, neutrals as a flush horizontal strip,
  full palette grid below. Hex labels render *inside* the swatch in
  high-contrast text (auto black/white).
- **Components chapter** — renders an actual primary + secondary
  button using the extracted brand colour and radius, plus a card
  mockup using extracted surface + text colours. Metadata table moved
  below the visual mock.
- **Accessibility chapter** — failing pairs render as actual stacked
  colour blocks (foreground text on background with ratio inline),
  not a pure table. Big score number on top.
- **Tokens chapter** — code blocks now have a header bar with the
  language label and target filename.
- **"How to use"** trimmed from six rules of thumb to four punchy
  ones, drops the "rule of thumb" framing.
- **Layout** — section padding moved into the wrap (no more gutter
  around the hero band), TOC now sits on a tinted sub-paper background,
  chapter headers are thinner with a bottom rule.

Same 13 chapters, same public API. No breaking changes.

378/378 tests pass (one assertion updated for the new lowercase
"Brand guidelines" cover label).

## [12.7.0] — 2026-05-09

**Brand book — full editorial design-guidelines document for any URL.**

\`designlang brand <url>\` produces a self-contained, print-ready HTML
"brand guidelines book" that documents every dimension of an extracted
design system. Cover, table of contents, 13 chapters: about, logo,
colour, typography, spacing, shape, iconography, motion, components,
voice, accessibility, tokens, how-to-use. Editorial layout, dark-mode
toggle, smooth-scroll TOC, drop-in code blocks per stack.

\`\`\`bash
npx designlang brand stripe.com
\`\`\`

\`\`\`
Brand book · 54 tokens · 3 fonts · grade B · https://stripe.com
✓ stripe-com.brand.html
✓ stripe-com.brand.md
✓ stripe-com.brand.json
\`\`\`

### Why this is different from \`pack\`, \`grade\`, and \`design-language.md\`

| Output | Audience | Format |
|---|---|---|
| \`pack\` (v12.4) | Devs picking up a design system | Directory of files (tokens, components, Storybook, starter) |
| \`grade\` (v12.1) | Audit / share | Single audit page with score + verdict |
| \`design-language.md\` | LLMs | AI-optimized markdown (data-dense) |
| **\`brand\` (v12.7)** | **Designers + handoff** | **Editorial brand-guidelines book — readable, print-ready, hand-off-ready** |

### Added

- New CLI command: \`designlang brand <url> [-o] [-n] [--format] [--open]\`.
- New formatter \`src/formatters/brand-book.js\` exporting \`formatBrandBook\`
  (HTML book) and \`formatBrandBookMarkdown\` (terse markdown summary).
- 13 chapters with editorial typography (Instrument Serif display + Inter
  body), generous whitespace, smooth-scroll anchors, dark-mode toggle,
  print stylesheet with page breaks at chapter boundaries.
- Per-colour section: large swatch + HEX/RGB/HSL/usage grid for brand
  colours, mini-grid for neutrals + full palette.
- Per-token section: drop-in code blocks for CSS variables, Tailwind
  config, with cross-reference to \`pack\` for the full bundle.
- Closing "How to use" chapter with six rules of thumb (hierarchy of
  brand colour, two-family discipline, snap-to-scale spacing, tight
  radius set, motion as feedback, accessibility as hard constraint).
- 7 new tests covering chapter coverage, host/colour/font rendering,
  XSS escaping, sparse-design fallback, and mixed-shape component
  anatomy (the bug that broke the first integration — slots / variants
  arrive as objects, strings, or arrays from the extractor).

### Plugin

\`/brand\` is the 7th slash command in the Claude Code plugin
(\`/extract\`, \`/grade\`, \`/battle\`, \`/remix\`, \`/pack\`, \`/theme-swap\`,
\`/brand\`). \`.claude-plugin/plugin.json\` and \`marketplace.json\`
bumped to 12.7.0.

## [12.6.0] — 2026-05-06

**Theme-swap — recolour any extracted design around your brand primary.**

\`designlang theme-swap <url> --primary <hex>\` takes the existing
extraction and rotates the brand palette around a new primary while
preserving everything else: type scale, spacing rhythm, neutrals, motion,
component anatomy. Closes
[#57](https://github.com/Manavarya09/design-extract/issues/57).

\`\`\`bash
npx designlang theme-swap stripe.com --primary "#ff4800"
\`\`\`

\`\`\`
#533afd → #ff4800 · 91 colours · https://stripe.com
Hue shift: 118.5° · neutrals preserved · type/spacing/motion untouched

✓ stripe-com-themeswap-ff4800.themeswap.html
✓ stripe-com-themeswap-ff4800.themeswap.md
✓ stripe-com-themeswap-ff4800.themeswap.json
✓ stripe-com-themeswap-ff4800.themeswap.tokens.json
\`\`\`

### Added

- New CLI command: \`designlang theme-swap <url> --primary <hex>\`
  with \`--from\`, \`-o\`, \`-n\`, \`--format\`, \`--open\` flags.
- New module \`src/recolor.js\` exporting \`recolorDesign(design, opts)\`.
  Operates in OKLCH so perceptual lightness stays constant — only hue
  rotates. Auto-detects the source primary; pin it with \`--from\`.
  Neutrals (chroma < 0.04 in OKLCH) are explicitly preserved so body
  text, surfaces, and rule lines stay readable.
- New formatter \`src/formatters/theme-swap.js\` exporting
  \`formatThemeSwap\` (HTML side-by-side preview) and
  \`formatThemeSwapMarkdown\`.
- New OKLCH inverse helpers in \`src/utils/color-gamut.js\`:
  \`srgbToOklab\`, \`srgbToOklch\`, \`hexToOklch\`, \`oklchToHex\` —
  with chroma fallback for out-of-gamut colours.
- The recoloured design is fed through every existing emitter (DTCG,
  Tailwind, shadcn, Figma vars, CSS vars), so the swap propagates
  for free.
- 10 new tests covering primary-pinning, neutral preservation,
  hue rotation, error paths, \`--from\` override, HTML/markdown shapes,
  and XSS escaping.

### Why

People keep asking *"what would Stripe look like in our brand colors?"*.
\`theme-swap\` answers it in 30 seconds. Bridges \`remix\` (full-vocab
restyle) and \`apply\` (token write-through to a project).

## [12.5.0] — 2026-05-06

**Claude Code plugin — five slash commands wrapping the CLI.**

designlang is now a first-class Claude Code plugin. Drop it into any
session and every CLI verb becomes a slash command:

\`\`\`bash
/plugin install Manavarya09/design-extract
\`\`\`

| Command | What it does |
|---|---|
| \`/extract <url>\` | Full extraction → DTCG, Tailwind, Figma, motion, voice |
| \`/grade <url>\` | Shareable HTML Design Report Card (+ \`--badge\`) |
| \`/battle <urlA> <urlB>\` | Head-to-head graded battle card |
| \`/remix <url> --as <vocab>\` | Restyle in 6 vocabularies |
| \`/pack <url>\` | Bundle every output into one design-system directory |

### Added

- \`commands/extract.md\`, \`commands/grade.md\`, \`commands/battle.md\`,
  \`commands/remix.md\`, \`commands/pack.md\` — five slash-command
  manifests with \`description\` + \`argument-hint\` frontmatter and prompt
  bodies that wrap the CLI and surface tight summaries.
- Refreshed \`.claude-plugin/plugin.json\` (was stale at v1.0.0) — name
  bumped to \`designlang\`, description rewritten around all v12 surfaces,
  added \`commands\` directory pointer + expanded keywords.
- Refreshed \`.claude-plugin/marketplace.json\` — same updates plus
  marketplace tags.
- New README section "Claude Code plugin" documenting install + the
  five slash commands. Existing skills-ecosystem section retained for
  Cursor / Codex / 40+ other agents.

No CLI behavior change. The slash commands are pure wrappers — they
shell out to \`npx designlang …\` and read the same output files.

## [12.4.0] — 2026-05-05

**Pack — one command, one polished design-system bundle.**

\`designlang pack <url>\` runs the full extraction once and writes every
emitter output into a single, signed, layered directory. One artifact a
designer or dev can clone, drop into a project, or zip up and send to a
client. Closes [#59](https://github.com/Manavarya09/design-extract/issues/59).

### Added

- New CLI command: \`designlang pack <url> [-o <dir>] [--with-clone] [--open]\`
- New module \`src/pack.js\` exporting \`buildPack(design, opts)\`
- Layout:
  \`\`\`
  <host>-design-system/
  ├── README.md           — bespoke, "Built from <host>" + grade + at-a-glance stats
  ├── LICENSE.txt         — provenance + usage guidance
  ├── tokens/             — DTCG + Tailwind + CSS vars + Figma vars + motion + theme.js
  ├── components/         — typed React stubs (anatomy.tsx)
  ├── storybook/          — runnable Storybook project
  ├── starter/            — minimal HTML starter wired to tokens/variables.css
  ├── prompts/            — v0.txt · lovable.txt · cursor.md · claude-artifacts.md
  │   └── recipes/        — recipe-<component>.md cards (named, no longer indexed)
  └── extras/             — voice.json + prompt-pack.md rollup
  \`\`\`
- 7 new tests covering directory shape, valid JSON outputs, README content,
  starter wiring, recipe filenames, and a regression test for the
  double-stringify bug that broke first integration.

### Why

The 17+ loose files designlang already emits are the right pieces, but
asking a user to zip them themselves is friction. \`pack\` is the same
artifacts as one polished, downloadable, cite-able bundle.

## [12.3.0] — 2026-05-05

**Remix — restyle any site in a different design vocabulary.**

A genuinely new product surface: take an extracted page-shape (sections,
voice, page-intent, anatomy) and re-render it under one of six
opinionated design vocabularies. "What would stripe.com look like if it
had been designed brutalist? Or art-deco? Or cyberpunk?"

### Added

- **`designlang remix <url> --as <vocab>`** — re-renders the audited page
  using the host's *own copy* (headings, ledes, CTA verbs from voice) but
  styled in another vocabulary. Six built-ins:
  - `brutalist` — hard edges, mono type, single screaming accent
  - `swiss` — Helvetica, grids, restraint (post-Bauhaus default)
  - `art-deco` — gold on ink, geometric ornament, vertical type
  - `cyberpunk` — neon on midnight, scanlines, mono with glitch energy
  - `soft-ui` — cushioned shapes, low contrast, Vision-OS-adjacent
  - `editorial` — broadsheet serifs, generous whitespace, ink on paper
- `--all` flag emits one HTML per vocabulary in a single extraction.
- `--list` prints the vocabulary registry with blurbs.
- New formatter: `src/formatters/remix.js` — maps every section role
  (hero, feature-grid, pricing-table, stats, testimonial, faq,
  logo-wall, steps, cta) to vocabulary-styled markup.
- New module: `src/vocabularies/` — six self-contained vocab definitions
  (tokens + font stack + signature CSS) plus `index.js` registry.
- Hero-deduplication: real-world section walkers (especially on SPA
  marketing pages) often emit a hero wrapper + an inner hero with the
  same h1. Remix now dedupes by heading and excludes claimed headings
  from the voice pool, so heading-less sections (cta bands, logo walls)
  don't re-render an already-claimed heading.
- 14 new tests (350 total, all passing). Cover registry shape,
  per-vocab token validity, dedup, XSS escaping, missing-input errors.

Why: Grade (v12.1) is the audit, Battle (v12.2) is the comparison,
Remix is the *transformation*. Pure visual moat — no competitor
(Dembrandt, Superposition, html.to.design, Builder Visual Copilot)
ships site-shape-preserving vocabulary swap.

## [12.2.0] — 2026-05-02

**Battle cards + design score badges — distribution + virality on top of Grade.**

### Added

- **`designlang battle <urlA> <urlB>`** — head-to-head graded battle card.
  Single shareable HTML pitting two sites against each other, dimension by
  dimension, with a verdict line and a per-dimension bar table. Both sites
  are extracted in parallel. Emits `*.battle.html`, `*.battle.md`, and
  `*.battle.json`.
- **`designlang grade --badge`** — also emit `*.grade.svg`, a shields.io-style
  SVG badge (`design · B · 87`) coloured by letter grade. Drop into any
  README.
- **Live badge endpoint** at `https://designlang.app/badge/<host>.svg` (with
  rewrites from `/badge/<host>` and `/api/badge/<host>`). Reuses the same
  blob cache the `/api/extract` route writes to, so the first hit warms the
  cache and every subsequent hit is served from edge cache in ~50ms. 6h
  fresh / 24h stale-while-revalidate / 7d max — friendly to the GitHub image
  proxy.
- New formatters: `src/formatters/battle.js`, `src/formatters/badge.js`,
  with exports `formatBattle`, `formatBattleMarkdown`, `compareScores`,
  `formatBadge`, `formatScoreBadge`.
- 13 new tests (battle markup, score comparison thresholds, SVG escaping,
  grade-color mapping, missing-score handling).

Why this exists: the v12.1 Grade card was the differentiator. Battle is the
viral content layer ("Stripe vs Vercel — guess who lost"). The badge is the
distribution layer — every README that adopts it is a permanent backlink to
a public grade page.

## [12.1.0] — 2026-04-29

**Design Report Card — a shareable audit page, generated from any URL.**

### Added

- **`designlang grade <url>`** — produces a standalone, self-contained HTML
  "Design Report Card" alongside JSON and Markdown variants. Letter grade
  (A–F) hero, eight scored dimensions with arc gauges, evidence pulled from
  the audited site itself (palette swatches, type specimen, spacing rhythm),
  and a strengths / what-to-fix ledger. Editorial layout, paper/ink theme
  with a dark toggle, print-ready, OG-meta for shareable links.
- New formatter: **`src/formatters/grade.js`** with `formatGrade` (HTML) and
  `formatGradeMarkdown` exports. Reuses the existing `scoreDesignSystem`
  output — no scoring changes.
- Flags: `--format html|md|json|all`, `--open` to launch the report in your
  browser when it finishes.

Why this exists: html.to.design, Locofy, Builder, Polypane all ship
extraction or layout cloning. None of them grade the design system itself
in a form you can post on Twitter or email to a client. This is that.

## [10.5.0] — 2026-04-22

**The states LLMs always botch.**

### Added

- **`src/extractors/form-states.js`** — surfaces forms (input count + style families), modal/dialog/sheet containers, skeleton and spinner loading indicators, empty-state and error-state placeholders, and detects which toast library is on the page (Sonner, react-hot-toast, react-toastify, Radix Toast, Chakra Toast, Notistack).
- New output: `*-form-states.json`.

Closes the v10.x minor-release series started in v10.1. Everything the
v10 spec deferred for v11 is now shipped as minor releases — with no
breaking changes along the way.

## [10.4.0] — 2026-04-22

**Identification trio: icon system, background patterns, stack intel.**

### Added

- **`src/extractors/icon-system.js`** — fingerprints the icon library (Lucide / Heroicons outline+solid / Phosphor / Tabler / Feather / Remix / Material) from stroke vs fill dominance, stroke width, grid size, and rounded-caps presence. Emits per-icon hints agents can act on.
- **`src/extractors/background-patterns.js`** — classifies noise / dot-grid / line-grid / gradient-mesh / svg-pattern / plain from computed `background-image` values. Merged into `*-visual-dna.json`.
- **`src/extractors/stack-intel.js`** — extends the existing stack-fingerprint with 12 CMSs (Webflow, Framer, Shopify, Ghost, Sanity, Contentful, Wix, Squarespace, WordPress, Hashnode, Notion, Bubble), 13 analytics platforms, and 7 experimentation platforms.
- Bin reads its own version from `package.json` — no more per-release version drift in the CLI.
- New outputs: `*-icon-system.json`, `*-stack-intel.json`.

## [10.3.0] — 2026-04-22

**Perf + SEO.** designlang now doubles as a lightweight auditor.

### Added

- **`src/extractors/perf.js`** — `captureCoreWebVitals(url)` opens a fresh Playwright context, measures LCP / CLS / INP via PerformanceObserver, categorises every network response into JS / CSS / font / image / document / other, counts third-party requests against a known-host list, and synthesises an interaction so INP reports. Returns grade buckets (good / needs-improvement / poor) per vital.
- **`src/extractors/seo.js`** — pure extractor for Open Graph, Twitter cards, canonical, manifest, theme-color, viewport, every favicon, and inline JSON-LD blocks (schema.org structured data).
- Crawler now captures `favicons`, `manifest`, and `<script type="application/ld+json">` content.
- New flag `--perf`. Auto-on with `--full`.
- New outputs: `*-seo.json`, `*-perf.json`.

## [10.2.0] — 2026-04-22

**Dark mode pairing + responsive screenshots.** Joins the light & dark extractor passes into semantic pairs, and adds full-page captures at 4 breakpoints × (light, dark).

### Added

- **`src/extractors/dark-mode-pair.js`** — pure function that maps light ↔ dark pairs for primary/secondary/accent/background/text roles and every CSS variable that actually differs between themes. Emits a drop-in Tailwind `darkMode: 'class'` config plus an audit (tokens missing from either pass).
- **`src/extractors/responsive-screenshots.js`** — full-page PNGs at mobile / tablet / desktop / wide × (light, dark). Writes to `screenshots/responsive/<breakpoint>-<scheme>.png` with an index.
- New flag `--responsive-shots`. Auto-on with `--full`.
- New outputs: `*-dark-mode.json`, `*-responsive.json`.

### Changed

- CLI version test now reads from `package.json` instead of a hardcoded string — no per-release test churn going forward.

## [10.1.0] — 2026-04-22

**Component screenshots.** The existing `--screenshots` flag now emits cluster-aware, retina (2×), multi-variant PNGs instead of five hardcoded selectors and a full-page image.

### Added

- **`src/extractors/component-screenshots.js`** — queries the live DOM with the same candidate selector the crawler uses, groups matches by `kind + variantHint + sizeHint`, and captures up to three representatives per group. Falls back to the v9 hardcoded list when no clusters produced anything (auth / docs pages).
- Retina capture via a dedicated Playwright context at `deviceScaleFactor: 2`.
- **`*-screenshots.json`** — index file mapping every cropped PNG to its cluster name, variant, bounds, and fallback flag.
- Markdown formatter gains a **Component Screenshots** section listing the first 20 crops.

### Behaviour

- No new CLI flags. `--screenshots` and `--full` continue to opt into capture.
- Backward compatible — when no clusters match, the v9 hardcoded selector set still fires.

### Tests

297 → **299** passing.

## [10.0.0] — 2026-04-22

**The Intent Release.** v9 captured *how* a site looks; v10 captures *what it is* — the semantic layer LLM agents need to rebuild a site faithfully, not just restyle a generic scaffold. Six new extractors, a multi-page crawl orchestrator, an optional smart-classifier LLM fallback, and a ready-to-paste prompt pack. 297/297 tests passing.

### Added — extraction

- **Page Intent classifier** (`src/extractors/page-intent.js`) — labels the crawled URL as `landing` / `pricing` / `docs` / `blog` / `blog-post` / `product` / `about` / `dashboard` / `auth` / `legal`, with URL + title + meta + DOM-shape signals, a confidence score, and ranked alternates.
- **Section Roles** (`src/extractors/section-roles.js`) — annotates every semantic region with a role (`hero`, `feature-grid`, `logo-wall`, `stats`, `testimonial`, `pricing-table`, `faq`, `steps`, `comparison`, `gallery`, `bento`, `cta`, `footer`), extracts slot copy (headings, lede, CTA counts), and emits reading order.
- **Material Language** (`src/extractors/material-language.js`) — classifies the visual vocabulary (`glassmorphism` / `neumorphism` / `flat` / `brutalist` / `skeuomorphic` / `material-you` / `soft-ui` / `mixed`) from shadow complexity, backdrop-filter usage, saturation, and geometry.
- **Imagery Style** (`src/extractors/imagery-style.js`) — fingerprints the imagery (`photography` / `3d-render` / `isometric` / `flat-illustration` / `gradient-mesh` / `icon-only` / `screenshot` / `mixed`), plus dominant aspect ratio and image-radius profile.
- **Component Library detector** (`src/extractors/component-library.js`) — identifies shadcn/ui, Radix, Headless UI, MUI, Chakra, Mantine, Ant Design, Bootstrap, HeroUI/NextUI, Tailwind UI, Vuetify, or plain Tailwind, with evidence and alternates.
- **Logo extractor** (`src/extractors/logo.js`) — pulls the site's logo (SVG source or `<img>` bytes) and samples clearspace; writes `*-logo.svg` or `.png` plus `*-logo.json`.

### Added — orchestration

- **Multi-page crawl** (`src/multipage.js`) — `--full` or `--pages <n>` auto-discovers canonical pages from nav (pricing/docs/blog/about/product), runs the full extractor pipeline on each, and emits a cross-page consistency report with shared tokens, per-page uniques, and pairwise Jaccard scores.
- **Smart classifier fallback** (`src/classifiers/smart.js`) — opt-in `--smart` flag routes low-confidence classifications through the OpenAI or Anthropic API (via `OPENAI_API_KEY` / `ANTHROPIC_API_KEY`). Gracefully no-ops when no key is set. Zero-dep — uses global `fetch`.

### Added — LLM-native outputs

- **Prompt pack** (`src/formatters/prompt-pack.js`) — writes a `*-prompts/` directory with `v0.txt`, `lovable.txt`, `cursor.md`, `claude-artifacts.md`, and atomic `recipe-<component>.md` cards. Tokens, section order, voice, and library guidance are all inlined so one paste is enough.
- **Markdown sections** (`src/formatters/markdown.js`) — adds Page Intent, Section Roles, Material Language, Imagery Style, Component Library, and (when `--full`) Multi-Page Map sections to `*-design-language.md`.

### Added — output files

- `*-intent.json` — page-type + section-role map
- `*-visual-dna.json` — material language + imagery style
- `*-library.json` — component library detection + evidence
- `*-logo.svg` | `*-logo.png` + `*-logo.json` (with `--full`)
- `*-multipage.json` — per-page design languages + consistency (with `--full` / `--pages`)
- `*-prompts/` — prompt pack directory

### New CLI flags

- `--smart` — enable optional LLM refinement for low-confidence classifiers
- `--pages <n>` — explicitly crawl N canonical pages
- `--no-prompts` — skip the prompt-pack directory

### Tests

- `tests/v10-features.test.js` — 15 new subtests covering page intent, section roles, component library, material language, imagery style, multi-page discovery, cross-page consistency, and prompt pack. Full suite: 297 passing.

## [9.0.0] — 2026-04-21

**The Motion & Voice release.** Six new capabilities that push designlang past "extract the paint" and into "extract the *feel*, the *anatomy*, and the *voice*." No competing tool does any of these. All work ships with tests (282/282 passing).

### Added — extraction

- **Motion language extractor** (`src/extractors/motion.js`) — easings are classified into families (`ease-in`, `ease-in-out`, `ease-out`, `linear`, `steps`, `spring`, `custom`) via cubic-bezier geometry, durations are bucketed into a named scale (`instant`/`xs`/`sm`/`md`/`lg`/`xl`/`xxl`), spring/overshoot cubic-beziers are surfaced, scroll-linked animation usage is detected via `animation-timeline` / `view-timeline-name` / `scroll-timeline-name`, and each `@keyframes` rule is classified by kind (`slide-x`, `slide-y`, `fade`, `reveal`, `rotate`, `scale`, `pulse`, `custom`). A one-word `feel` fingerprint (`springy`/`responsive`/`smooth`/`mechanical`/`mixed`) summarizes the whole system.
- **Motion tokens formatter** (`src/formatters/motion-tokens.js`) — emits `*-motion-tokens.json` in a DTCG-flavored shape with `$type: duration` / `$type: cubicBezier`.
- **Component Anatomy v2** (`src/extractors/component-anatomy.js`) — groups components by variant-class hints, infers slot roles (icon / label / badge / heading / media / footer), builds a variant × size × state matrix, captures sample button labels, and emits typed React stubs via `formatAnatomyStubs`. Output: `*-anatomy.tsx`.
- **Brand voice extractor** (`src/extractors/voice.js`) — classifies tone (friendly / formal / technical / playful / neutral) from lexical markers, picks pronoun posture (`we→you`, `you-only`, `we-only`, `third-person`), detects heading style, top CTA verbs, and microcopy patterns. Output: `*-voice.json`.
- **Crawler extensions** (`src/crawler.js`) — per-element `animation-timeline`, view/scroll timeline names; per-candidate `text`, `slots[]`, `disabled`, `variantHint`, `sizeHint` to feed anatomy + voice.

### Added — new commands

- **`designlang lint <file>`** — audits DTCG / flat-JSON / CSS-vars token files for color sprawl, spacing-scale drift, radius/shadow bloat, and WCAG AA fg/bg contrast. Exits non-zero on `error`-level findings. CI-ready.
- **`designlang drift <url> --tokens <file>`** — compares local tokens against a live site, reports `in-sync` / `minor-drift` / `notable-drift` / `major-drift` with a drift ratio. `--fail-on <level>` controls CI exit code.
- **`designlang visual-diff <before> <after>`** — single-file HTML side-by-side report with embedded base64 screenshots, file-size deltas, and a changed-color-tokens table.

### Added — markdown output

Three new sections in `*-design-language.md`: **Motion Language**, **Component Anatomy**, **Brand Voice**.

### Changed

- Default extraction now writes **11+ files** (up from 8): `*-motion-tokens.json`, `*-anatomy.tsx` (when candidates exist), `*-voice.json`.
- `bin/design-extract.js` version → `9.0.0`.
- `package.json` — description refreshed; new keywords: `motion`, `animation`, `component-anatomy`, `brand-voice`, `token-lint`, `visual-diff`.
- README: "What's New in v9" hero block, new feature sections 24-29, new CLI entries (`lint`, `drift`, `visual-diff`).

### Tests

- New `tests/v9-features.test.js` — 7 suites, 21 assertions across motion, anatomy, voice, and lint.
- Full suite: **282/282 passing**.

## [8.0.0] — 2026-04-20

A credibility-and-distribution release. Three reliability bugs that hurt trust on real sites are fixed; three DX flags close the most-requested CLI gaps; five new surfaces (VS Code, Raycast, Figma, GitHub Actions, MCP registry) ship alongside.

### Reliability

- **Brand / primary color detection rewritten** — the extractor now ranks chromatic clusters by `interactiveBg × 100 + saturation × 2 + log(usage)` and requires either HSL saturation > 25 or an interactive-bg hit to qualify as chromatic. Previously the extractor picked the most-counted color, which on neutral-heavy sites like Linear meant the "Primary" was a pale gray (`#d0d6e0`). v8 correctly picks Linear's lime CTA (`#e4f222`) and Stripe's purple (`#533afd`). `src/extractors/colors.js`.
- **Accessibility scoring defused** — the crawler now emits a `hasText` boolean per element (a direct text-node child with visible characters), and the WCAG extractor filters out decorative glyph wrappers, transparent/overlay pairs, and non-text containers. Linear's WCAG score moved from 25% (171 failing pairs) to 83% (1 failing pair). `src/extractors/accessibility.js`, `src/crawler.js`.
- **Design-system score recalibrated** — thresholds for color count, shadow count, border-radii count, typography weight, and type-scale size were re-fit against ground-truth sites (Stripe, Linear, Vercel, GitHub, Apple). `cssHealth` is now weighted in the overall (8/100). Linear 47→76, Stripe 81→88, Apple 83→86, Vercel 64→76. `src/extractors/scoring.js`.

### Added

- **`--selector <css>`** — scopes extraction to a DOM subtree (e.g. `designlang https://stripe.com --selector "footer"`). Stripe full-page extraction drops from 2,409 elements to 112 when scoped to the footer. Falls back to the full document if the selector is invalid or empty.
- **`--system-chrome`** — forces Playwright to use the locally installed Chrome (`channel: 'chrome'`) instead of the ~150 MB bundled Chromium, for faster `npx` first-runs in environments that already have Chrome.
- **`--json` output mode** — full extraction payload written to stdout (suppresses progress UI) for piping into other tools. This was a partial implementation in v7; v8 makes it first-class and adds it to the CLI reference.
- **VS Code extension** (`vscode-extension/`) — `designlang: Extract design from URL` and `designlang: Extract and inject into workspace` commands.
- **Raycast extension** (`raycast-extension/`) — Extract, Score, and "Copy CLI command for URL" commands.
- **Figma plugin** (`figma-plugin/`) — URL or paste-JSON → Figma Variables collections (MV for Figma's `figma.variables` API, with multi-mode support).
- **GitHub Action** (`github-action/`) — "Design regression guard": runs `designlang` on a URL, diffs tokens vs a committed baseline, and comments the delta on the pull request. Optional `fail-on-change`.
- **Smithery + MCP registry** (`smithery.yaml`, `smithery.dockerfile`, `docs/MCP-REGISTRY.md`) — one-command install in Smithery; checklist for the official MCP registry, Cursor, and Claude Desktop.
- **Chrome Web Store + Firefox + Edge listing prep** (`chrome-extension/PRIVACY.md`, `chrome-extension/STORE_LISTING.md`) — privacy policy and store copy.
- **README hero demo tape** (`docs/demo.tape`) — VHS script that renders an animated terminal GIF into `website/public/demo.gif`.
- **Launch kit** (`docs/LAUNCH.md`) — Product Hunt / Show HN / Twitter copy + day-of checklist.

### Changed

- README: hero image now references the animated demo (with static PNG fallback), adds an "Install everywhere" table covering all surfaces, documents `--selector`, `--system-chrome`, and `--json`.
- `.npmignore`: excludes all companion-surface directories (`vscode-extension/`, `raycast-extension/`, `figma-plugin/`, `github-action/`, `chrome-extension/`, `website/`) and test fixtures so the npm tarball stays small — each surface publishes to its own registry.
- `bin/design-extract.js`: reports `8.0.0` from `--version`.
- `src/config.js`: whitelists `selector` and `systemChrome` from CLI/config.

### Thanks

- To everyone who flagged that Linear's primary was coming out as light gray — that single complaint drove the brand-color rewrite.

## [7.2.0] — 2026-04-19

### Added

- **Modern CSS surfacing (Tier 1a)** — crawler now captures pseudo-elements, variable-font axes (`font-variation-settings`), `@container` queries, and `env()` usage. Surfaced on `design.modernCss`. (#33)
- **Wide-gamut color + CSS source attribution (Tier 1b)** — `oklch()`, `oklab()`, `color-mix()`, `light-dark()`, Display P3, and Rec2020 references are collected on `design.wideGamut`. A new `design.tokenSources` maps each extracted token to the stylesheet URL it first appeared in. (#34)
- **Auto-interact pass (Tier 2)** — new `--deep-interact` flag (implied by `--full`) runs an interaction pass before extraction: full-page scroll in 4 steps, menu/dropdown opens, hover snapshots for the first batch of buttons/links with computed-style diffs, accordion clicks, and first-match modal trigger. Results populate `design.interactionStates` (hover deltas, menu/modal snapshots). Every step is wrapped in try/catch with per-step timeouts so interaction failures never kill the crawl.
- **Multi-page token reconciliation (Tier 2)** — when `--depth >= 1` the extractor now emits three new artifacts alongside the merged baseline: `*-tokens-shared.json` (tokens shared across every route), `*-tokens-routes/<slug>.json` (per-route `added` and `changed` deltas), and `*-routes-report.md` (readable summary). Slugs are derived from the route path (`/` → `index`) with automatic collision handling.

### Changed

- `--full` now also enables `--deep-interact`.
- `--depth <n>` description updated to mention the new reconciliation outputs.

## [7.1.0] — 2026-04-19

### Added

- **Cookie file support** — `--cookie-file <path>` loads cookies from a JSON array, a Playwright `storageState.json`, or a Netscape `cookies.txt` (browser extensions, curl exports). The new loader lives in `src/utils-cookies.js` and merges cleanly with the existing `--cookie name=value` flag.
- **`--insecure`** — ignores HTTPS/SSL certificate errors. Useful for self-signed dev servers, internal staging environments behind corporate proxies, and local extraction through MITM tools. Passes `ignoreHTTPSErrors: true` to the Playwright context plus the matching Chromium launch flags.
- **`--user-agent <ua>`** — override the browser User-Agent string for extraction.
- **Chrome extension** — `chrome-extension/` ships a Manifest v3 popup that hands the current tab off to [designlang.manavaryasingh.com](https://designlang.manavaryasingh.com) with the URL prefilled. Also emits a "Copy CLI" button that drops `npx designlang <url>` into the clipboard. Developer-mode install for now; Chrome Web Store listing pending.
- **Website URL query parameter** — the extractor input on the hosted site now honours `?url=<encoded>` so the Chrome extension (and any deep link) can prefill.
- **CONTRIBUTING**: "Good first issues" and "Credits" sections.

### Thanks

- A developer from China opened a conversation proposing cookie-file handling, SSL bypass, and a Chrome packaging story — this release ships all three.

## [7.0.0] — 2026-04-18

### Breaking

- **Design token JSON format** — the default `*-design-tokens.json` now follows the W3C Design Tokens Community Group (DTCG) v1 spec: every leaf is `{ "$value": ..., "$type": ... }`, with two layers (`primitive.*` and `semantic.*`) and composite tokens for typography, shadow, border, and gradient. If a downstream consumer expects the pre-v7 flat shape, pass `--tokens-legacy` to preserve it.

  Before (v6):
  ```json
  { "color": { "primary": "#3b82f6" }, "fontFamily": { "sans": "Inter" } }
  ```

  After (v7, default):
  ```json
  {
    "$metadata": { "generator": "designlang", "version": "7.0.0" },
    "primitive": { "color": { "brand": { "primary": { "$value": "#3b82f6", "$type": "color" } } } },
    "semantic":  { "color": { "action": { "primary": { "$value": "{primitive.color.brand.primary}", "$type": "color" } } } }
  }
  ```

  Migration: either (a) update consumers to read the DTCG shape (recommended — long-term stable, ecosystem-compatible), or (b) add `--tokens-legacy` to the CLI invocation.

### Added

- **MCP server** — new `designlang mcp --output-dir <dir>` subcommand. Stdio JSON-RPC. Resources: `designlang://tokens/primitive`, `designlang://tokens/semantic`, `designlang://regions`, `designlang://components`, `designlang://health`. Tools: `search_tokens`, `find_nearest_color`, `get_region`, `get_component`, `list_failing_contrast_pairs`.
- **Agent rules emitter** — `--emit-agent-rules` writes `.cursor/rules/designlang.mdc`, `.claude/skills/designlang/SKILL.md`, `CLAUDE.md.fragment`, and `agents.md`. All four template from the resolved semantic tokens.
- **Multi-platform emitters** — `--platforms <csv>` (values `web`, `ios`, `android`, `flutter`, `wordpress`, `all`). Additive to default web output. Emits iOS SwiftUI, Android Compose + XML, Flutter Dart + ThemeData, and a full WordPress block-theme skeleton (`theme.json` v3, `style.css`, `functions.php`, `index.php`, `templates/index.html`).
- **Stack + Tailwind fingerprint** — framework detection, Tailwind utility-class frequency map, analytics stack inventory. Surfaced on `design.stack`.
- **CSS health audit** — specificity distribution, `!important` count, duplicate declarations, unused CSS via Playwright Coverage API, `@keyframes` catalog, vendor-prefix audit. Surfaced on `design.cssHealth` and added as an additive `cssHealth` dimension in the design score.
- **A11y remediation** — for every failing WCAG contrast pair, suggests the nearest palette color that passes AA (4.5:1 / 3:1) or AAA (7:1 / 4.5:1). Surfaced on `design.accessibility.remediation`.
- **Semantic regions** — classifies page sections into `nav`, `hero`, `features`, `pricing`, `testimonials`, `cta`, `footer`, `sidebar`, `content`. Surfaced on `design.regions`.
- **Reusable component detection** — DOM subtree structural hash + cosine-similarity style vector clustering with variant detection. Surfaced on `design.componentClusters` and rendered in the markdown output.
- **MCP companion file** — `*-mcp.json` written at extract time so later `designlang mcp` invocations can serve regions / components / health / remediation from disk, not just memory.

### Dependencies

- Added `@modelcontextprotocol/sdk` (runtime).

### Tests

- 241/241 passing (baseline 186 + 55 new tests).
