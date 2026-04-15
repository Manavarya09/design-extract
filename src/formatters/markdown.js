import { pxToRem } from '../utils.js';

export function formatMarkdown(design) {
  const lines = [];
  const { meta, colors, typography, spacing, shadows, borders, variables, breakpoints, animations, components } = design;

  lines.push(`# Design Language: ${meta.title || 'Unknown Site'}`);
  lines.push('');
  lines.push(`> Extracted from \`${meta.url}\` on ${new Date(meta.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`);
  lines.push(`> ${meta.elementCount} elements analyzed${meta.pagesAnalyzed > 1 ? ` across ${meta.pagesAnalyzed} pages` : ''}`);
  lines.push('');
  lines.push('This document describes the complete design language of the website. It is structured for AI/LLM consumption — use it to faithfully recreate the visual design in any framework.');
  lines.push('');

  // ── Colors ──
  lines.push('## Color Palette');
  lines.push('');
  if (colors.primary) {
    lines.push('### Primary Colors');
    lines.push('');
    lines.push('| Role | Hex | RGB | HSL | Usage Count |');
    lines.push('|------|-----|-----|-----|-------------|');
    if (colors.primary) lines.push(`| Primary | \`${colors.primary.hex}\` | rgb(${colors.primary.rgb.r}, ${colors.primary.rgb.g}, ${colors.primary.rgb.b}) | hsl(${colors.primary.hsl.h}, ${colors.primary.hsl.s}%, ${colors.primary.hsl.l}%) | ${colors.primary.count} |`);
    if (colors.secondary) lines.push(`| Secondary | \`${colors.secondary.hex}\` | rgb(${colors.secondary.rgb.r}, ${colors.secondary.rgb.g}, ${colors.secondary.rgb.b}) | hsl(${colors.secondary.hsl.h}, ${colors.secondary.hsl.s}%, ${colors.secondary.hsl.l}%) | ${colors.secondary.count} |`);
    if (colors.accent) lines.push(`| Accent | \`${colors.accent.hex}\` | rgb(${colors.accent.rgb.r}, ${colors.accent.rgb.g}, ${colors.accent.rgb.b}) | hsl(${colors.accent.hsl.h}, ${colors.accent.hsl.s}%, ${colors.accent.hsl.l}%) | ${colors.accent.count} |`);
    lines.push('');
  }

  if (colors.neutrals.length > 0) {
    lines.push('### Neutral Colors');
    lines.push('');
    lines.push('| Hex | HSL | Usage Count |');
    lines.push('|-----|-----|-------------|');
    for (const c of colors.neutrals.slice(0, 12)) {
      lines.push(`| \`${c.hex}\` | hsl(${c.hsl.h}, ${c.hsl.s}%, ${c.hsl.l}%) | ${c.count} |`);
    }
    lines.push('');
  }

  if (colors.backgrounds.length > 0) {
    lines.push('### Background Colors');
    lines.push('');
    lines.push(`Used on large-area elements: ${colors.backgrounds.map(h => `\`${h}\``).join(', ')}`);
    lines.push('');
  }

  if (colors.text.length > 0) {
    lines.push('### Text Colors');
    lines.push('');
    lines.push(`Text color palette: ${colors.text.map(h => `\`${h}\``).join(', ')}`);
    lines.push('');
  }

  if (colors.gradients.length > 0) {
    lines.push('### Gradients');
    lines.push('');
    for (const g of colors.gradients) {
      lines.push('```css');
      lines.push(`background-image: ${g};`);
      lines.push('```');
      lines.push('');
    }
  }

  if (colors.all.length > 0) {
    lines.push('### Full Color Inventory');
    lines.push('');
    lines.push('| Hex | Contexts | Count |');
    lines.push('|-----|----------|-------|');
    for (const c of colors.all.slice(0, 30)) {
      lines.push(`| \`${c.hex}\` | ${c.contexts.join(', ')} | ${c.count} |`);
    }
    lines.push('');
  }

  // ── Typography ──
  lines.push('## Typography');
  lines.push('');

  if (typography.families.length > 0) {
    lines.push('### Font Families');
    lines.push('');
    for (const f of typography.families) {
      lines.push(`- **${f.name}** — used for ${f.usage} (${f.count} elements)`);
    }
    lines.push('');
  }

  if (typography.scale.length > 0) {
    lines.push('### Type Scale');
    lines.push('');
    lines.push('| Size (px) | Size (rem) | Weight | Line Height | Letter Spacing | Used On |');
    lines.push('|-----------|------------|--------|-------------|----------------|---------|');
    for (const s of typography.scale.slice(0, 15)) {
      lines.push(`| ${s.size}px | ${pxToRem(s.size)}rem | ${s.weight} | ${s.lineHeight} | ${s.letterSpacing} | ${s.tags.slice(0, 4).join(', ')} |`);
    }
    lines.push('');
  }

  if (typography.headings.length > 0) {
    lines.push('### Heading Scale');
    lines.push('');
    lines.push('```css');
    for (const h of typography.headings) {
      const tag = h.tags.find(t => /^h[1-6]$/.test(t)) || 'h';
      lines.push(`${tag} { font-size: ${h.size}px; font-weight: ${h.weight}; line-height: ${h.lineHeight}; }`);
    }
    lines.push('```');
    lines.push('');
  }

  if (typography.body) {
    lines.push('### Body Text');
    lines.push('');
    lines.push('```css');
    lines.push(`body { font-size: ${typography.body.size}px; font-weight: ${typography.body.weight}; line-height: ${typography.body.lineHeight}; }`);
    lines.push('```');
    lines.push('');
  }

  if (typography.weights.length > 0) {
    lines.push('### Font Weights in Use');
    lines.push('');
    lines.push(typography.weights.map(w => `\`${w.weight}\` (${w.count}x)`).join(', '));
    lines.push('');
  }

  // ── Spacing ──
  lines.push('## Spacing');
  lines.push('');
  if (spacing.base) {
    lines.push(`**Base unit:** ${spacing.base}px`);
    lines.push('');
  }
  if (spacing.scale.length > 0) {
    lines.push('| Token | Value | Rem |');
    lines.push('|-------|-------|-----|');
    for (const v of spacing.scale.slice(0, 20)) {
      lines.push(`| spacing-${v} | ${v}px | ${pxToRem(v)}rem |`);
    }
    lines.push('');
  }

  // ── Borders ──
  if (borders.radii.length > 0) {
    lines.push('## Border Radii');
    lines.push('');
    lines.push('| Label | Value | Count |');
    lines.push('|-------|-------|-------|');
    for (const r of borders.radii) {
      lines.push(`| ${r.label} | ${r.value}px | ${r.count} |`);
    }
    lines.push('');
  }

  // ── Shadows ──
  if (shadows.values.length > 0) {
    lines.push('## Box Shadows');
    lines.push('');
    for (const s of shadows.values) {
      lines.push(`**${s.label}${s.inset ? ' (inset)' : ''}** — blur: ${s.blur}px`);
      lines.push('```css');
      lines.push(`box-shadow: ${s.raw};`);
      lines.push('```');
      lines.push('');
    }
  }

  // ── CSS Variables ──
  const varCategories = Object.entries(variables).filter(([, v]) => Object.keys(v).length > 0);
  if (varCategories.length > 0) {
    lines.push('## CSS Custom Properties');
    lines.push('');
    for (const [category, vars] of varCategories) {
      lines.push(`### ${category.charAt(0).toUpperCase() + category.slice(1)}`);
      lines.push('');
      lines.push('```css');
      for (const [name, value] of Object.entries(vars)) {
        lines.push(`${name}: ${value};`);
      }
      lines.push('```');
      lines.push('');
    }
  }

  // ── Breakpoints ──
  if (breakpoints.length > 0) {
    lines.push('## Breakpoints');
    lines.push('');
    lines.push('| Name | Value | Type |');
    lines.push('|------|-------|------|');
    for (const bp of breakpoints) {
      lines.push(`| ${bp.label} | ${bp.value}px | ${bp.type} |`);
    }
    lines.push('');
  }

  // ── Animations ──
  if (animations.transitions.length > 0 || animations.keyframes.length > 0) {
    lines.push('## Transitions & Animations');
    lines.push('');

    if (animations.easings.length > 0) {
      lines.push(`**Easing functions:** ${animations.easings.map(e => `\`${e}\``).join(', ')}`);
      lines.push('');
    }
    if (animations.durations.length > 0) {
      lines.push(`**Durations:** ${animations.durations.map(d => `\`${d}\``).join(', ')}`);
      lines.push('');
    }

    if (animations.transitions.length > 0) {
      lines.push('### Common Transitions');
      lines.push('');
      lines.push('```css');
      for (const t of animations.transitions.slice(0, 10)) {
        lines.push(`transition: ${t};`);
      }
      lines.push('```');
      lines.push('');
    }

    if (animations.keyframes.length > 0) {
      lines.push('### Keyframe Animations');
      lines.push('');
      for (const kf of animations.keyframes.slice(0, 10)) {
        lines.push(`**${kf.name}**`);
        lines.push('```css');
        lines.push(`@keyframes ${kf.name} {`);
        for (const step of kf.steps) {
          lines.push(`  ${step.offset} { ${step.style} }`);
        }
        lines.push('}');
        lines.push('```');
        lines.push('');
      }
    }
  }

  // ── Components ──
  if (Object.keys(components).length > 0) {
    lines.push('## Component Patterns');
    lines.push('');
    lines.push('Detected UI component patterns and their most common styles:');
    lines.push('');

    for (const [name, comp] of Object.entries(components)) {
      lines.push(`### ${name.charAt(0).toUpperCase() + name.slice(1)} (${comp.count} instances)`);
      lines.push('');
      lines.push('```css');
      lines.push(`.${name.slice(0, -1)} {`);
      for (const [prop, val] of Object.entries(comp.baseStyle)) {
        const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
        lines.push(`  ${cssProp}: ${val};`);
      }
      lines.push('}');
      lines.push('```');
      lines.push('');
    }
  }

  // ── Accessibility ──
  if (design.accessibility) {
    const a = design.accessibility;
    lines.push('## Accessibility (WCAG 2.1)');
    lines.push('');
    lines.push(`**Overall Score: ${a.score}%** — ${a.passCount} passing, ${a.failCount} failing color pairs`);
    lines.push('');

    if (a.pairs.length > 0) {
      const failures = a.pairs.filter(p => p.level === 'FAIL');
      if (failures.length > 0) {
        lines.push('### Failing Color Pairs');
        lines.push('');
        lines.push('| Foreground | Background | Ratio | Level | Used On |');
        lines.push('|------------|------------|-------|-------|---------|');
        for (const p of failures.slice(0, 15)) {
          lines.push(`| \`${p.foreground}\` | \`${p.background}\` | ${p.ratio}:1 | ${p.level} | ${p.elements.join(', ')} (${p.count}x) |`);
        }
        lines.push('');
      }

      const passes = a.pairs.filter(p => p.level !== 'FAIL');
      if (passes.length > 0) {
        lines.push('### Passing Color Pairs');
        lines.push('');
        lines.push('| Foreground | Background | Ratio | Level |');
        lines.push('|------------|------------|-------|-------|');
        for (const p of passes.slice(0, 10)) {
          lines.push(`| \`${p.foreground}\` | \`${p.background}\` | ${p.ratio}:1 | ${p.level} |`);
        }
        lines.push('');
      }
    }
  }

  // ── Dark Mode ──
  if (design.darkMode) {
    lines.push('## Dark Mode');
    lines.push('');
    lines.push('The site has a distinct dark mode color scheme:');
    lines.push('');
    const dc = design.darkMode.colors;
    if (dc.primary) lines.push(`- **Primary:** \`${dc.primary.hex}\``);
    if (dc.secondary) lines.push(`- **Secondary:** \`${dc.secondary.hex}\``);
    if (dc.backgrounds.length > 0) lines.push(`- **Backgrounds:** ${dc.backgrounds.map(h => `\`${h}\``).join(', ')}`);
    if (dc.text.length > 0) lines.push(`- **Text:** ${dc.text.slice(0, 5).map(h => `\`${h}\``).join(', ')}`);
    lines.push('');

    const darkVars = Object.entries(design.darkMode.variables).filter(([, v]) => Object.keys(v).length > 0);
    if (darkVars.length > 0) {
      lines.push('### Dark Mode CSS Variables');
      lines.push('');
      lines.push('```css');
      for (const [, vars] of darkVars) {
        for (const [name, value] of Object.entries(vars)) {
          lines.push(`${name}: ${value};`);
        }
      }
      lines.push('```');
      lines.push('');
    }
  }

  // ── Quick Start ──
  lines.push('## Quick Start');
  lines.push('');
  lines.push('To recreate this design in a new project:');
  lines.push('');
  if (typography.families.length > 0) {
    const fontName = typography.families[0].name;
    lines.push(`1. **Install fonts:** Add \`${fontName}\` from Google Fonts or your font provider`);
  }
  lines.push(`2. **Import CSS variables:** Copy \`variables.css\` into your project`);
  lines.push(`3. **Tailwind users:** Use the generated \`tailwind.config.js\` to extend your theme`);
  lines.push(`4. **Design tokens:** Import \`design-tokens.json\` for tooling integration`);
  lines.push('');

  return lines.join('\n');
}
