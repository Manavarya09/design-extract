---
name: extract-design
description: "Extract the full design language from any website URL. Produces AI-optimized markdown, W3C design tokens, Tailwind config, and CSS variables. Use when user says 'extract design', 'get design system', 'design language', 'design tokens', 'what colors does this site use', 'what font does this site use', or '/extract-design'."
argument-hint: "<url> [--dark] [--out <dir>]"
allowed-tools: Bash, Read, Write, Glob
---

# Extract Design Language

Extract the complete design language from any website URL.

## Process

1. **Run the extraction CLI** on the provided URL:

```bash
cd "${CLAUDE_SKILL_DIR}/../.." && node bin/design-extract.js $ARGUMENTS
```

If dependencies are not installed, run first:
```bash
cd "${CLAUDE_SKILL_DIR}/../.." && npm install
```

2. **Read the generated markdown file** to understand the design:

```bash
cat design-extract-output/*-design-language.md
```

3. **Present key findings** to the user:
   - Primary color palette (with hex codes)
   - Font families in use
   - Spacing system (base unit if detected)
   - Number of component patterns found
   - Any notable design decisions (shadows, border-radius scale, etc.)

4. **Offer next steps:**
   - Copy `tailwind.config.js` into the user's project
   - Import `variables.css` into their stylesheet
   - Use `design-tokens.json` for tooling integration
   - Use the markdown file as a reference for AI-assisted development

## Output Files

The tool generates 4 files in the output directory:

| File | Purpose |
|------|---------|
| `*-design-language.md` | AI-optimized markdown describing the full design system |
| `*-design-tokens.json` | W3C Design Tokens format for tooling |
| `*-tailwind.config.js` | Ready-to-use Tailwind CSS theme extension |
| `*-variables.css` | CSS custom properties for direct use |

## Options

- `--out <dir>` — Output directory (default: `./design-extract-output`)
- `--dark` — Also extract dark mode color scheme
- `--wait <ms>` — Wait time after page load for SPAs
