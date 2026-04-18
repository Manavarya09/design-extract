# Changelog

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
