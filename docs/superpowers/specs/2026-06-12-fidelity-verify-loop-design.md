# Fidelity loop — `designlang verify`

**Status:** shipped (v12.18.0) · **Date:** 2026-06-12

## Problem / core idea

designlang *reads* a design system off the live DOM and emits artifacts, but it
never **proves** those artifacts reconstruct the source. "Close the loop" turns
the extractor into a *fidelity engine*: rebuild components from the extracted
tokens, pixel-diff against the live page, and report a 0–100 score. This makes
the core idea honest, gives agents a trust number, and produces a self-improving
signal (low-fidelity regions point at the weakest extractors).

## What it does

`designlang verify <url>` →
1. extract the design (tokens) via `extractDesignLanguage`,
2. for each target component (v1: **button, card**), capture the real crop + its
   computed styles + outerHTML,
3. **re-style** a clone using ONLY the extracted tokens (each visual property
   snapped to its nearest token; unmapped properties flagged as loss),
4. render the re-styled clone on a clean canvas,
5. **pixel-diff** rebuilt vs original (pixelmatch, letterboxed — never stretched),
6. `fidelity = round(100 × (1 − diff_ratio))`, aggregated (equal-weight mean) to a
   site score with per-token-family **attribution**.

Outputs: `verify.html` (original │ rebuilt │ loss-heatmap triptych per component),
`verify.json`, and the PNGs under `verify/{original,rebuilt,diff}/`. `--min`
exits non-zero below a threshold (CI gate).

## Modules (each independently testable)

- `src/verify/tokens.js` — `tokensFromDesign(design)` → flat snap-ready token sets.
- `src/verify/restyle.js` — pure `restyleComponent(computed, tokens)` → `{styled, deltas}`; colour snapping via CIE-Lab ΔE, numeric scales, shadow-by-blur, font-family match.
- `src/verify/render.js` — `renderComponent(browser, comp, tokens)` → PNG of the re-styled clone.
- `src/verify/diff.js` — `diffPngBuffers(a, b)` → `{ratio, heatmap}` (pixelmatch + pngjs).
- `src/verify/index.js` — `verifyDesign(url, opts)` orchestrator.
- `src/formatters/verify.js` — `formatVerifyHtml` / `formatVerifyJson`.
- `bin/design-extract.js` — `verify <url>` command (`--components`, `--min`).

## Decisions

- **Re-style strategy:** DOM-clone + token-snap (honestly measures tokenization
  loss), not canonical specimen or numeric-only diff.
- **Motion/easing excluded** — it does not affect a static crop.
- **Honesty-first:** component not on page → `n/a`, excluded from the aggregate
  (no silent 100%); property with no matching token → `unmapped`, counted as loss
  and surfaced in attribution. Size mismatch is letterboxed, never stretched.
- **Deps:** `pixelmatch` + `pngjs` (tiny, pure-JS).

## Scope

- **v1 (shipped):** button + card, CLI, `verify.html`/`verify.json`, `--min` gate.
- **Later:** full component coverage, website `/api/verify`, a fidelity badge SVG,
  ΔE2000, token `confidence` scores feeding the aggregate weighting.

## Validation

13 unit tests (tokens/restyle/diff) + full suite green (438). Live smoke vs
github.com: button **89/100**, card `n/a` (not present), radius flagged `unmapped`
because github's radii weren't extracted — the loop exposing a real extractor gap.
