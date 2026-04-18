import { pxToRem } from '../utils.js';

export function formatMarkdown(design) {
  const lines = [];
  const { meta, colors, typography, spacing, shadows, borders, variables, breakpoints, animations, components } = design;
  const componentClusters = Array.isArray(design.componentClusters) ? design.componentClusters : [];

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

  // ── Component Clusters (v7) ──
  if (componentClusters.length > 0) {
    lines.push('## Component Clusters');
    lines.push('');
    lines.push('Reusable component instances grouped by DOM structure and style similarity:');
    lines.push('');
    for (const cluster of componentClusters) {
      const kindLabel = cluster.kind.charAt(0).toUpperCase() + cluster.kind.slice(1);
      lines.push(`### ${kindLabel} — ${cluster.instanceCount} instance${cluster.instanceCount === 1 ? '' : 's'}, ${cluster.variants.length} variant${cluster.variants.length === 1 ? '' : 's'}`);
      lines.push('');
      cluster.variants.forEach((v, i) => {
        lines.push(`**Variant ${i + 1}** (${v.instanceCount} instance${v.instanceCount === 1 ? '' : 's'})`);
        lines.push('');
        lines.push('```css');
        for (const [prop, val] of Object.entries(v.css || {})) {
          const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
          lines.push(`  ${cssProp}: ${val};`);
        }
        lines.push('```');
        lines.push('');
      });
    }
  }

  // ── Layout ──
  if (design.layout) {
    const l = design.layout;
    lines.push('## Layout System');
    lines.push('');
    lines.push(`**${l.gridCount} grid containers** and **${l.flexCount} flex containers** detected.`);
    lines.push('');

    if (l.containerWidths.length > 0) {
      lines.push('### Container Widths');
      lines.push('');
      lines.push('| Max Width | Padding |');
      lines.push('|-----------|---------|');
      for (const c of l.containerWidths) {
        lines.push(`| ${c.maxWidth} | ${c.padding} |`);
      }
      lines.push('');
    }

    if (l.gridColumns.length > 0) {
      lines.push('### Grid Column Patterns');
      lines.push('');
      lines.push('| Columns | Usage Count |');
      lines.push('|---------|-------------|');
      for (const g of l.gridColumns) {
        lines.push(`| ${g.columns}-column | ${g.count}x |`);
      }
      lines.push('');
    }

    if (l.topGrids.length > 0) {
      lines.push('### Grid Templates');
      lines.push('');
      lines.push('```css');
      for (const g of l.topGrids) {
        lines.push(`grid-template-columns: ${g.columns};`);
        if (g.gap !== 'normal' && g.gap !== '0px') lines.push(`gap: ${g.gap};`);
      }
      lines.push('```');
      lines.push('');
    }

    if (Object.keys(l.flexDirections).length > 0) {
      lines.push('### Flex Patterns');
      lines.push('');
      lines.push('| Direction/Wrap | Count |');
      lines.push('|----------------|-------|');
      for (const [pattern, count] of Object.entries(l.flexDirections)) {
        lines.push(`| ${pattern} | ${count}x |`);
      }
      lines.push('');
    }

    if (l.gaps.length > 0) {
      lines.push(`**Gap values:** ${l.gaps.map(g => `\`${g}\``).join(', ')}`);
      lines.push('');
    }
  }

  // ── Responsive ──
  if (design.responsive) {
    const r = design.responsive;
    lines.push('## Responsive Design');
    lines.push('');

    if (r.viewports.length > 0) {
      lines.push('### Viewport Snapshots');
      lines.push('');
      lines.push('| Viewport | Body Font | Nav Visible | Max Columns | Hamburger | Page Height |');
      lines.push('|----------|-----------|-------------|-------------|-----------|-------------|');
      for (const vp of r.viewports) {
        lines.push(`| ${vp.name} (${vp.width}px) | ${vp.bodyFontSize} | ${vp.navVisible ? 'Yes' : 'No'} | ${vp.maxColumns} | ${vp.hasHamburger ? 'Yes' : 'No'} | ${vp.scrollHeight}px |`);
      }
      lines.push('');
    }

    if (r.changes.length > 0) {
      lines.push('### Breakpoint Changes');
      lines.push('');
      for (const change of r.changes) {
        lines.push(`**${change.breakpoint}** (${change.from} → ${change.to}):`);
        for (const d of change.diffs) {
          lines.push(`- ${d.property}: \`${d.from}\` → \`${d.to}\``);
        }
        lines.push('');
      }
    }
  }

  // ── Interaction States ──
  if (design.interactions) {
    const hasContent = design.interactions.buttons.length > 0 || design.interactions.links.length > 0 || design.interactions.inputs.length > 0;
    if (hasContent) {
      lines.push('## Interaction States');
      lines.push('');

      if (design.interactions.buttons.length > 0) {
        lines.push('### Button States');
        lines.push('');
        for (const btn of design.interactions.buttons.slice(0, 3)) {
          lines.push(`**"${btn.text}"**`);
          if (Object.keys(btn.hover).length > 0) {
            lines.push('```css');
            lines.push('/* Hover */');
            for (const [prop, val] of Object.entries(btn.hover)) {
              lines.push(`${prop.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${val.from} → ${val.to};`);
            }
            lines.push('```');
          }
          if (Object.keys(btn.focus).length > 0) {
            lines.push('```css');
            lines.push('/* Focus */');
            for (const [prop, val] of Object.entries(btn.focus)) {
              lines.push(`${prop.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${val.from} → ${val.to};`);
            }
            lines.push('```');
          }
          lines.push('');
        }
      }

      if (design.interactions.links.length > 0) {
        lines.push('### Link Hover');
        lines.push('');
        const link = design.interactions.links[0];
        lines.push('```css');
        for (const [prop, val] of Object.entries(link.hover)) {
          lines.push(`${prop.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${val.from} → ${val.to};`);
        }
        lines.push('```');
        lines.push('');
      }

      if (design.interactions.inputs.length > 0) {
        lines.push('### Input Focus');
        lines.push('');
        const input = design.interactions.inputs[0];
        lines.push('```css');
        for (const [prop, val] of Object.entries(input.focus)) {
          lines.push(`${prop.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${val.from} → ${val.to};`);
        }
        lines.push('```');
        lines.push('');
      }
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

  // ── Design Score ──
  if (design.score) {
    const s = design.score;
    lines.push('## Design System Score');
    lines.push('');
    lines.push(`**Overall: ${s.overall}/100 (Grade: ${s.grade})**`);
    lines.push('');
    lines.push('| Category | Score |');
    lines.push('|----------|-------|');
    if (s.scores.colorDiscipline !== undefined) lines.push(`| Color Discipline | ${s.scores.colorDiscipline}/100 |`);
    if (s.scores.typographyConsistency !== undefined) lines.push(`| Typography Consistency | ${s.scores.typographyConsistency}/100 |`);
    if (s.scores.spacingSystem !== undefined) lines.push(`| Spacing System | ${s.scores.spacingSystem}/100 |`);
    if (s.scores.shadowConsistency !== undefined) lines.push(`| Shadow Consistency | ${s.scores.shadowConsistency}/100 |`);
    if (s.scores.radiusConsistency !== undefined) lines.push(`| Border Radius Consistency | ${s.scores.radiusConsistency}/100 |`);
    if (s.scores.accessibility !== undefined) lines.push(`| Accessibility | ${s.scores.accessibility}/100 |`);
    if (s.scores.tokenization !== undefined) lines.push(`| CSS Tokenization | ${s.scores.tokenization}/100 |`);
    lines.push('');

    if (s.strengths.length > 0) {
      lines.push('**Strengths:** ' + s.strengths.join(', '));
      lines.push('');
    }
    if (s.issues.length > 0) {
      lines.push('**Issues:**');
      for (const issue of s.issues) {
        lines.push(`- ${issue}`);
      }
      lines.push('');
    }
  }

  // ── Gradients ──
  if (design.gradients && design.gradients.count > 0) {
    lines.push('## Gradients');
    lines.push('');
    lines.push(`**${design.gradients.count} unique gradients** detected.`);
    lines.push('');
    lines.push('| Type | Direction | Stops | Classification |');
    lines.push('|------|-----------|-------|----------------|');
    for (const g of design.gradients.gradients.slice(0, 15)) {
      lines.push(`| ${g.type} | ${g.direction || '—'} | ${g.stops.length} | ${g.classification} |`);
    }
    lines.push('');
    lines.push('```css');
    for (const g of design.gradients.gradients.slice(0, 5)) {
      lines.push(`background: ${g.raw};`);
    }
    lines.push('```');
    lines.push('');
  }

  // ── Z-Index Map ──
  if (design.zIndex && design.zIndex.allValues.length > 0) {
    lines.push('## Z-Index Map');
    lines.push('');
    lines.push(`**${design.zIndex.allValues.length} unique z-index values** across ${design.zIndex.layers.length} layers.`);
    lines.push('');
    if (design.zIndex.layers.length > 0) {
      lines.push('| Layer | Range | Elements |');
      lines.push('|-------|-------|----------|');
      for (const l of design.zIndex.layers) {
        const elNames = l.elements.slice(0, 3).join(', ');
        lines.push(`| ${l.name} | ${l.range} | ${elNames} |`);
      }
      lines.push('');
    }
    if (design.zIndex.issues.length > 0) {
      lines.push('**Issues:**');
      for (const issue of design.zIndex.issues) {
        lines.push(`- ${issue}`);
      }
      lines.push('');
    }
  }

  // ── Icons ──
  if (design.icons && design.icons.count > 0) {
    lines.push('## SVG Icons');
    lines.push('');
    lines.push(`**${design.icons.count} unique SVG icons** detected. Dominant style: **${design.icons.dominantStyle || 'mixed'}**.`);
    lines.push('');
    const dist = design.icons.sizeDistribution;
    if (dist) {
      lines.push('| Size Class | Count |');
      lines.push('|------------|-------|');
      for (const [cls, count] of Object.entries(dist)) {
        if (count > 0) lines.push(`| ${cls} | ${count} |`);
      }
      lines.push('');
    }
    if (design.icons.colorPalette.length > 0) {
      lines.push(`**Icon colors:** ${design.icons.colorPalette.slice(0, 10).map(c => `\`${c}\``).join(', ')}`);
      lines.push('');
    }
  }

  // ── Font Files ──
  if (design.fonts && design.fonts.fonts.length > 0) {
    lines.push('## Font Files');
    lines.push('');
    lines.push('| Family | Source | Weights | Styles |');
    lines.push('|--------|--------|---------|--------|');
    for (const f of design.fonts.fonts) {
      lines.push(`| ${f.family} | ${f.source} | ${f.weights.join(', ')} | ${f.styles.join(', ')} |`);
    }
    lines.push('');
    if (design.fonts.googleFontsUrl) {
      lines.push(`**Google Fonts URL:** \`${design.fonts.googleFontsUrl}\``);
      lines.push('');
    }
  }

  // ── Image Styles ──
  if (design.images && design.images.patterns.length > 0) {
    lines.push('## Image Style Patterns');
    lines.push('');
    lines.push('| Pattern | Count | Key Styles |');
    lines.push('|---------|-------|------------|');
    for (const p of design.images.patterns) {
      const styles = Object.entries(p.styles || {}).map(([k, v]) => `${k}: ${v}`).join(', ');
      lines.push(`| ${p.name} | ${p.count} | ${styles || '—'} |`);
    }
    lines.push('');
    if (design.images.aspectRatios.length > 0) {
      lines.push(`**Aspect ratios:** ${design.images.aspectRatios.slice(0, 8).map(a => `${a.ratio} (${a.count}x)`).join(', ')}`);
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
