import { pxToRem } from '../utils.js';

export function formatCssVars(design) {
  const lines = [':root {'];

  // Colors
  lines.push('  /* Colors — Primary */');
  if (design.colors.primary) lines.push(`  --color-primary: ${design.colors.primary.hex};`);
  if (design.colors.secondary) lines.push(`  --color-secondary: ${design.colors.secondary.hex};`);
  if (design.colors.accent) lines.push(`  --color-accent: ${design.colors.accent.hex};`);
  lines.push('');

  if (design.colors.neutrals.length > 0) {
    lines.push('  /* Colors — Neutrals */');
    for (let i = 0; i < design.colors.neutrals.length && i < 10; i++) {
      lines.push(`  --color-neutral-${i * 100 || 50}: ${design.colors.neutrals[i].hex};`);
    }
    lines.push('');
  }

  if (design.colors.backgrounds.length > 0) {
    lines.push('  /* Colors — Backgrounds */');
    for (let i = 0; i < design.colors.backgrounds.length; i++) {
      lines.push(`  --color-bg${i > 0 ? `-${i}` : ''}: ${design.colors.backgrounds[i]};`);
    }
    lines.push('');
  }

  if (design.colors.text.length > 0) {
    lines.push('  /* Colors — Text */');
    for (let i = 0; i < design.colors.text.length && i < 5; i++) {
      lines.push(`  --color-text${i > 0 ? `-${i}` : ''}: ${design.colors.text[i]};`);
    }
    lines.push('');
  }

  // Typography
  if (design.typography.families.length > 0) {
    lines.push('  /* Typography — Families */');
    for (let i = 0; i < design.typography.families.length; i++) {
      const f = design.typography.families[i];
      let key;
      if (f.usage === 'headings') key = 'heading';
      else if (f.usage === 'body') key = 'body';
      else if (i === 0) key = 'sans';
      else if (f.name.toLowerCase().includes('mono')) key = 'mono';
      else key = i === 1 ? 'heading' : `font-${i}`;
      lines.push(`  --font-${key}: '${f.name}', sans-serif;`);
    }
    lines.push('');
  }

  if (design.typography.scale.length > 0) {
    lines.push('  /* Typography — Scale */');
    for (const s of design.typography.scale.slice(0, 12)) {
      lines.push(`  --font-size-${s.size}: ${s.size}px;`);
    }
    lines.push('');
  }

  // Spacing
  if (design.spacing.scale.length > 0) {
    lines.push('  /* Spacing */');
    for (const v of design.spacing.scale.slice(0, 20)) {
      lines.push(`  --spacing-${v}: ${v}px;`);
    }
    lines.push('');
  }

  // Border radius
  if (design.borders.radii.length > 0) {
    lines.push('  /* Border Radius */');
    for (const r of design.borders.radii) {
      lines.push(`  --radius-${r.label}: ${r.value}px;`);
    }
    lines.push('');
  }

  // Shadows
  if (design.shadows.values.length > 0) {
    lines.push('  /* Box Shadows */');
    for (const s of design.shadows.values) {
      lines.push(`  --shadow-${s.label}: ${s.raw};`);
    }
    lines.push('');
  }

  // Site's own CSS variables
  const siteVars = Object.entries(design.variables).filter(([, v]) => Object.keys(v).length > 0);
  if (siteVars.length > 0) {
    lines.push('  /* Original Site Variables */');
    for (const [category, vars] of siteVars) {
      lines.push(`  /* — ${category} — */`);
      for (const [name, value] of Object.entries(vars)) {
        lines.push(`  ${name}: ${value};`);
      }
    }
    lines.push('');
  }

  lines.push('}');
  return lines.join('\n');
}
