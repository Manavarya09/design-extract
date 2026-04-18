// Attribute top design tokens back to the stylesheet URL that most likely
// contributed them. Uses the per-element `sources` captured by the crawler.

import { parseColor, rgbToHex } from '../utils.js';

function firstSourceUrlWhere(styles, predicate) {
  for (const s of styles) {
    if (!s || !predicate(s)) continue;
    const src = Array.isArray(s.sources) ? s.sources[0] : null;
    if (src && src.url) return src.url;
  }
  return '';
}

export function extractTokenSources(design, computedStyles) {
  const styles = Array.isArray(computedStyles) ? computedStyles : [];
  const out = [];

  // Primary color
  const primaryHex = design.colors?.primary?.hex;
  if (primaryHex) {
    const url = firstSourceUrlWhere(styles, s => {
      const p = parseColor(s.color);
      return p && rgbToHex(p) === primaryHex;
    });
    out.push({ token: 'color.primary', path: 'colors.primary', sourceUrl: url });
  }

  // Text color (first in design.colors.text[])
  const textHex = (design.colors?.text || [])[0];
  if (textHex) {
    const url = firstSourceUrlWhere(styles, s => {
      const p = parseColor(s.color);
      return p && rgbToHex(p) === textHex;
    });
    out.push({ token: 'color.text', path: 'colors.text[0]', sourceUrl: url });
  }

  // Body font — first typography family
  const bodyFont = design.typography?.families?.[0]?.name;
  if (bodyFont) {
    const url = firstSourceUrlWhere(styles, s => typeof s.fontFamily === 'string' && s.fontFamily.includes(bodyFont));
    out.push({ token: 'font.body', path: 'typography.families[0]', sourceUrl: url });
  }

  // Spacing base
  const spacingBase = design.spacing?.base;
  if (spacingBase != null) {
    const target = `${spacingBase}px`;
    const url = firstSourceUrlWhere(styles,
      s => s.paddingTop === target || s.paddingLeft === target || s.marginTop === target || s.gap === target);
    out.push({ token: 'spacing.base', path: 'spacing.base', sourceUrl: url });
  }

  // Radius base — first non-zero from design.borders.radii
  const radii = design.borders?.radii || [];
  const firstRadius = radii.find(r => (r.value || r) && (r.value || r) !== '0px');
  if (firstRadius) {
    const target = typeof firstRadius === 'string' ? firstRadius : (firstRadius.value || '');
    const url = firstSourceUrlWhere(styles, s => s.borderRadius === target);
    out.push({ token: 'radius.base', path: 'borders.radii[0]', sourceUrl: url });
  }

  return out;
}
