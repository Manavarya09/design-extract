# Changelog

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
