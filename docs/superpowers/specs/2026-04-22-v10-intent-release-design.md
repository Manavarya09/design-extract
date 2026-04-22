# designlang v10 — "Intent Release" Design

**Date:** 2026-04-22
**Status:** Approved, moving to implementation
**Primary consumer:** LLM agents rebuilding UIs (then designers, then developers)

## Goal

Push designlang from "extracts how a site looks" to "extracts what a site *is*" — the first extraction tool that gives an LLM enough signal to recreate a site faithfully, not just restyle a generic layout in the target brand.

## Problem

Current extractors (v9) capture tokens, motion, voice, anatomy. Missing:
1. **Semantic intent** — an LLM reading the output can't tell this is a pricing page vs a landing page.
2. **Section roles** — `semantic-regions.js` detects regions but doesn't label their purpose.
3. **Per-page-type design language** — homepage alone is misleading; pricing/docs/product pages drift.
4. **Visual DNA** — material language (glass/flat/brutalist), imagery style, logo are not captured.
5. **Component library detection** — LLMs don't know whether to scaffold with shadcn vs MUI.
6. **LLM-native outputs** — no ready-to-paste prompts for v0/Lovable/Cursor/Claude Artifacts.

## Scope (v10)

### New extractors — semantic

- **`page-intent.js`** — classify the crawled URL as one of: `landing`, `pricing`, `docs`, `blog`, `blog-post`, `product`, `about`, `dashboard`, `auth`, `legal`, `unknown`. Emits a confidence score.
  - Heuristic signals: URL path (`/pricing`, `/docs`), title/meta, heading pattern, DOM fingerprints (pricing cards = 3 columns of price + feature list, docs = sidebar + article), form presence, link density.
- **`section-roles.js`** — for each region already found by `semantic-regions.js`, attach a role: `hero`, `feature-grid`, `social-proof`, `logo-wall`, `testimonial`, `pricing-table`, `faq`, `cta`, `footer`, `nav`, `stats`, `comparison`, `steps`, `gallery`, `unknown`.
- **`multi-page-crawler.js`** — given the homepage, discover canonical page types from nav links. Score each link's likely page type by URL + anchor text. Pick top N (default 5) unique types. Crawls each with full extractor pipeline. Enabled by `--full` or explicit `--pages <n>`.
- **`cross-page-consistency.js`** — diffs token sets across crawled pages; reports drift (color, type, spacing, radius) and reuse (components appearing on multiple pages).
- **`smart-classifier.js`** — when any of the above returns confidence < 0.6, optionally call an LLM (OpenAI or Anthropic, via `OPENAI_API_KEY` / `ANTHROPIC_API_KEY`) with a compact DOM digest. Gated behind `--smart` flag. Gracefully no-ops if no key.

### New extractors — visual DNA

- **`material-language.js`** — classify the site as `glassmorphism`, `neumorphism`, `flat`, `brutalist`, `skeuomorphic`, `material-you`, `mixed`. Signals: backdrop-filter usage, shadow complexity, border presence, saturation, geometry.
- **`imagery-style.js`** — sample images from the page and classify: `photography`, `3d-render`, `isometric`, `flat-illustration`, `gradient-mesh`, `icon-only`, `mixed`. Also extracts dominant palette from images and aspect-ratio distribution. Uses quick color/edge histograms — no ML model required in the default path.
- **`logo.js`** — detect the logo (header `<img>` or inline SVG near site start or with "logo" in alt/aria), save as SVG when possible, infer clearspace from bounding box + whitespace sampling. Writes `*-logo.svg` or `*-logo.png` plus `*-logo.json` (dims, clearspace, colors).

### Stack

- **`component-library.js`** — detect shadcn/ui, Radix, Chakra, MUI, HeroUI, Tailwind UI, Mantine, Ant Design, Headless UI, Bootstrap, Mantine via class/attr fingerprints (`data-radix-*`, `MuiButton-root`, `chakra-*`, Tailwind utility density, etc.). Returns library + confidence + evidence.

### LLM-native outputs

- **`prompt-pack.js`** — emits `*-prompts/` directory with:
  - `v0.txt` — ready for vercel.com/v0
  - `lovable.txt` — ready for lovable.dev
  - `cursor.md` — ready to paste into Cursor chat with tokens + anatomy inlined
  - `claude-artifacts.md` — ready for Claude artifact generation
  - `recipe-<component>.md` per detected component cluster — atomic "build this one component" prompts
- Extended markdown `*-design-language.md` — new sections: Page Intent, Section Roles, Material Language, Imagery Style, Component Library, Multi-Page Map (when `--full`).

### New output files

```
*-intent.json           # page-type + section-role map
*-multipage.json        # per-page design languages + consistency (only with --full / --pages)
*-visual-dna.json       # material-language + imagery-style
*-library.json          # component library detection + confidence + evidence
*-logo.svg | *-logo.png # extracted logo
*-logo.json             # logo metadata
*-prompts/              # directory with prompt-pack files
```

All new files are additive; all v9 outputs preserved unchanged. Users not on `--full` see a small set of new outputs (intent, visual-dna, library, logo, prompts) and no new runtime cost beyond ~1-2s on the single-page path.

## CLI surface

- `designlang <url>` — unchanged default, now additively emits intent, visual-dna, library, logo, prompts.
- `designlang <url> --full` — lights up multi-page crawl (5 canonical pages) + component screenshots *(deferred to v11, flagged in output)* + all new extractors.
- `designlang <url> --pages <n>` — explicit multi-page crawl, overrides default.
- `designlang <url> --smart` — enable LLM fallback for low-confidence classifications. Reads `OPENAI_API_KEY` or `ANTHROPIC_API_KEY`.
- `designlang <url> --no-prompts` — skip prompt pack emission.

## Architecture

```
src/
  crawler.js               # extend: expose crawlMany(urls)
  multipage.js             # NEW: discover + orchestrate multi-page crawl
  extractors/
    page-intent.js         # NEW
    section-roles.js       # NEW (wraps semantic-regions.js output)
    material-language.js   # NEW
    imagery-style.js       # NEW
    logo.js                # NEW
    component-library.js   # NEW
    cross-page.js          # NEW (only runs when multiple pages)
  classifiers/
    smart.js               # NEW: optional LLM router
    heuristics/
      page-type.js         # rule tables
      section-role.js      # rule tables
      material.js          # rule tables
  formatters/
    intent.js              # NEW: *-intent.json
    visual-dna.js          # NEW: *-visual-dna.json
    library.js             # NEW: *-library.json
    logo.js                # NEW: logo writer
    multipage.js           # NEW: *-multipage.json
    prompts/
      v0.js                # NEW
      lovable.js           # NEW
      cursor.js            # NEW
      claude-artifacts.js  # NEW
      recipes.js           # NEW
    markdown.js            # extend: new sections
```

Each extractor:
- Takes a `PageContext` (DOM + computed styles + existing extractor results).
- Returns a plain JSON result + a confidence score.
- No cross-extractor imports; orchestration lives in `index.js`.

## Data flow

```
index.js
  -> crawler.js        (single URL, existing)
  -> run v9 extractors
  -> run v10 extractors:
       page-intent, section-roles, material-language, imagery-style,
       logo, component-library
  -> if --smart: smart-classifier refines low-confidence results
  -> if --full / --pages: multipage.js runs full pipeline per extra page
       then cross-page.js produces consistency report
  -> formatters emit: v9 files + intent/visual-dna/library/logo/prompts
```

## Testing

- **Fixture sites:** stripe.com, linear.app, vercel.com, github.com/pricing, framer.com, shadcn/ui docs — run the full pipeline in `tests/fixtures/` with snapshot assertions on JSON shape (not exact values, which will drift).
- **Unit tests:** each heuristic rule table has its own test with minimal DOM snippets.
- **Smart classifier:** mocked LLM responses only; real API not hit in CI.
- **Regression:** all existing v9 snapshot tests must still pass unchanged.

## Non-goals (v10)

Deferred explicitly to v11:
- Component screenshots (disk heavy, needs careful bounding-box math).
- Icon-system matching against Lucide/Phosphor/Heroicons.
- Dark-mode token pairing.
- Background pattern detection (noise/grid/dots/mesh).
- Cursor style capture.
- Core Web Vitals + bundle stats.
- SEO/schema.org/OG extraction.
- Form / modal / empty-state capture.

## Success criteria

1. Running `designlang https://linear.app` emits `*-intent.json` with `page_type: "landing"` and section roles labeled on each region.
2. Running `designlang https://vercel.com --full` emits `*-multipage.json` covering homepage + pricing + docs + blog + one product page, with a cross-page consistency report.
3. `*-library.json` correctly identifies `shadcn/ui` on shadcn.com and `MUI` on mui.com with confidence > 0.8.
4. `*-prompts/v0.txt` when pasted into v0 produces a layout visibly closer to the source than a no-prompt baseline (manual spot-check).
5. All v9 outputs are byte-identical for the same input URL when no new flags are passed (new files added alongside, none modified).
6. Default single-page runtime increases by ≤ 2 seconds vs v9.
