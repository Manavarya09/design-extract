// Read a brand for the on-brand score from a DESIGN.md (YAML front matter),
// a DTCG token file, or a plain { colors, fonts, radii } JSON.

import { toHex } from './color.js';

function frontMatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
  // Indentation-aware walk of the simple YAML designlang and DESIGN.md use.
  const root = {};
  const stack = [{ indent: -1, obj: root }];
  for (const raw of m[1].split('\n')) {
    if (!raw.trim() || raw.trim().startsWith('#')) continue;
    const indent = raw.match(/^\s*/)[0].length;
    const line = raw.trim();
    const kv = line.match(/^([^:]+):\s*(.*)$/);
    if (!kv) continue;
    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) stack.pop();
    const parent = stack[stack.length - 1].obj;
    const key = kv[1].trim().replace(/^["']|["']$/g, '');
    const value = kv[2].trim();
    if (value === '') {
      parent[key] = {};
      stack.push({ indent, obj: parent[key] });
    } else {
      parent[key] = value.replace(/^["']|["']$/g, '');
    }
  }
  return root;
}

function fromDesignMd(text) {
  const fm = frontMatter(text);
  if (!fm) return null;
  const t = fm.tokens || fm;
  const colors = t.colors || {};
  const typo = t.typography || {};
  const fonts = [];
  for (const [k, v] of Object.entries(typo)) {
    if (typeof v === 'string' && !/^\d/.test(v) && k !== 'base') fonts.push(v.split(',')[0].trim().replace(/^["']|["']$/g, ''));
    if (v && typeof v === 'object' && v.fontFamily) fonts.push(String(v.fontFamily).split(',')[0].trim().replace(/^["']|["']$/g, ''));
  }
  const radii = Object.values(t.radii || t.rounded || {}).map((v) => parseFloat(v)).filter((n) => Number.isFinite(n) && n < 999);
  const spacingBase = parseFloat(t.spacing?.base);
  return {
    colors: { primary: toHex(colors.primary), secondary: toHex(colors.secondary), accent: toHex(colors.accent), neutrals: [] },
    fonts: [...new Set(fonts)],
    radii,
    ...(Number.isFinite(spacingBase) ? { spacingBase } : {}),
  };
}

function fromDtcg(json) {
  const found = { colors: {}, fonts: [], radii: [] };
  const walk = (node, path) => {
    if (!node || typeof node !== 'object') return;
    if ('$value' in node) {
      const name = path[path.length - 1] || '';
      const type = node.$type || '';
      const v = node.$value;
      if (type === 'color' || toHex(v)) {
        for (const role of ['primary', 'secondary', 'accent']) {
          if (name === role && !found.colors[role]) found.colors[role] = toHex(v);
        }
      } else if (type === 'fontFamily' || /font.?family|families/i.test(path.join('.'))) {
        const first = Array.isArray(v) ? v[0] : String(v).split(',')[0];
        if (first) found.fonts.push(String(first).trim().replace(/^["']|["']$/g, ''));
      } else if (/radi/i.test(path.join('.'))) {
        const n = parseFloat(typeof v === 'object' ? v.value : v);
        if (Number.isFinite(n) && n < 999) found.radii.push(n);
      }
      return;
    }
    for (const [k, v] of Object.entries(node)) if (!k.startsWith('$')) walk(v, [...path, k]);
  };
  walk(json, []);
  return { colors: { ...found.colors, neutrals: [] }, fonts: [...new Set(found.fonts)], radii: [...new Set(found.radii)] };
}

export function parseBrand(text, filename = '') {
  let brand = null;
  if (/\.md$/i.test(filename) || text.trimStart().startsWith('---')) {
    brand = fromDesignMd(text);
  } else {
    const json = JSON.parse(text);
    if (json.colors && (typeof json.colors.primary === 'string' || json.fonts)) {
      brand = { colors: { ...json.colors, primary: toHex(json.colors.primary), neutrals: json.colors.neutrals || [] }, fonts: json.fonts || [], radii: json.radii || [], ...(json.spacingBase ? { spacingBase: json.spacingBase } : {}) };
    } else {
      brand = fromDtcg(json);
    }
  }
  if (!brand?.colors?.primary) throw new Error(`No primary colour found in ${filename || 'the brand file'}`);
  return brand;
}
