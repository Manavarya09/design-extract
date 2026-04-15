# Contributing to design-ex

Thanks for your interest in contributing! Here's how to get started.

## Development Setup

```bash
git clone https://github.com/Manavarya09/design-extract.git
cd design-extract
npm install
```

This installs dependencies and Playwright's Chromium browser.

## Running Locally

```bash
node bin/design-extract.js https://example.com --out ./test-output
```

## Project Structure

```
src/
  crawler.js          # Playwright page.evaluate extraction
  index.js            # Orchestrator
  utils.js            # Color parsing, clustering, helpers
  extractors/         # 9 modules that process raw style data
    colors.js         # Color palette extraction
    typography.js     # Font and type scale extraction
    spacing.js        # Spacing scale detection
    shadows.js        # Box shadow parsing
    borders.js        # Border radius extraction
    variables.js      # CSS custom property categorization
    breakpoints.js    # Media query extraction
    animations.js     # Transition and keyframe extraction
    components.js     # UI component pattern detection
  formatters/         # 4 output format generators
    markdown.js       # AI-optimized markdown (hero output)
    tokens.js         # W3C Design Tokens JSON
    tailwind.js       # Tailwind CSS config
    css-vars.js       # CSS custom properties file
```

## Guidelines

- Keep dependencies minimal — prefer pure JS over adding a package
- Test changes against at least 2-3 real websites
- Follow the existing code style (ES modules, no semicolons in some files)
- The markdown formatter is the most important output — keep it rich and AI-friendly

## Reporting Issues

When filing a bug, please include:
- The URL you tried to extract from
- The error message or unexpected output
- Your Node.js version (`node --version`)

## Pull Requests

- One feature/fix per PR
- Keep PRs focused and small when possible
- Add a brief description of what changed and why
