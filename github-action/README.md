# designlang — Design Regression Guard

GitHub Action that runs `designlang` on every pull request, diffs the extracted design tokens against a committed baseline, annotates each changed token on the PR, and fails the job on drift.

## Example workflow

```yaml
name: Design Regression Guard

on:
  pull_request:
    paths:
      - 'src/**'
      - 'app/**'
      - 'tailwind.config.*'

jobs:
  design-diff:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22' }
      - uses: Manavarya09/design-extract/github-action@v13.3.1
        with:
          url: https://preview-${{ github.event.number }}.yoursite.dev
          baseline: ./design-tokens.baseline.json
```

Pin to a release tag. The action installs the designlang version it was tagged with, so a gate on `@v13.3.1` never changes behaviour under you.

## Inputs

| Name | Required | Default | Description |
|------|----------|---------|-------------|
| `url` | ✅ | — | URL to extract from. Typically a PR preview deploy. |
| `baseline` | ✅ | — | Path to the committed baseline tokens file. |
| `comment` | | `true` | Post a PR comment with the diff. |
| `fail-on-change` | | `true` | Fail the job if any token changed. Set `false` to report without gating. |
| `full` | | `false` | Pass `--full` to `designlang`. |
| `extra-args` | | — | Extra CLI args. |

## Outputs

- `changed` — `true`/`false`
- `changed-count` — number of changed tokens
- `diff-path` — path to the generated diff markdown
- `version` — the designlang version that ran

## Why a job failed

A failed job always says which of these it was, so a flaky preview deploy is never mistaken for a design regression:

| designlang exit | Meaning |
|---|---|
| `0` | Extracted; compared against the baseline |
| `1` | Drift over threshold (`designlang drift` / `ci` / `lint`) |
| `2` | Extraction failed: page error, bad input, no browser |
| `3` | Navigation timeout: retryable, the design was not checked |

The action's own "Fail on change" step exits `1` when tokens changed.

## Upgrading from `@v1`

`fail-on-change` now defaults to `true`. Pass `fail-on-change: false` to keep report-only behaviour.
