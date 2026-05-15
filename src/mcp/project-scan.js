// Auto-scan project directory for design config files and return them
// in the { tokens, design } shape that buildResources/buildTools expect.

import { existsSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const SEARCH_DIRS = ['', 'src', 'app', 'styles'];
const TAILWIND_NAMES = ['tailwind.config.js', 'tailwind.config.ts', 'tailwind.config.mjs', 'tailwind.config.cjs'];

function findFile(projectDir, dirs, filename) {
  for (const dir of dirs) {
    const p = join(projectDir, dir, filename);
    if (existsSync(p)) return p;
  }
  return null;
}

function findTailwindConfig(projectDir) {
  for (const name of TAILWIND_NAMES) {
    const p = join(projectDir, name);
    if (existsSync(p)) return p;
  }
  return null;
}

function tryDesignTokens(projectDir) {
  const path = findFile(projectDir, SEARCH_DIRS, 'design-tokens.json');
  if (!path) return null;
  try {
    const data = JSON.parse(readFileSync(path, 'utf-8'));
    if (data && typeof data === 'object') {
      if (data.primitive && data.semantic) return data;
      return { primitive: data, semantic: {} };
    }
  } catch { /* malformed JSON — skip */ }
  return null;
}

function extractTailwindValues(text) {
  const primitive = {};

  const colorRe = /['"]([a-zA-Z][\w-]*)['"]:\s*['"]([#\w().,\s]+)['"]/g;

  const colorsBlock = text.match(/colors\s*:\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}/s);
  if (colorsBlock) {
    const colorGroup = {};
    let m;
    while ((m = colorRe.exec(colorsBlock[1])) !== null) {
      colorGroup[m[1]] = { $value: m[2].trim(), $type: 'color' };
    }
    if (Object.keys(colorGroup).length) primitive.color = colorGroup;
  }

  const spacingBlock = text.match(/spacing\s*:\s*\{([^}]*)\}/s);
  if (spacingBlock) {
    const spacingGroup = {};
    const spacingRe = /['"]?([\w.-]+)['"]?\s*:\s*['"]([\w.]+(?:rem|px|em))['"]/g;
    let m;
    while ((m = spacingRe.exec(spacingBlock[1])) !== null) {
      spacingGroup[m[1]] = { $value: m[2], $type: 'dimension' };
    }
    if (Object.keys(spacingGroup).length) primitive.spacing = spacingGroup;
  }

  const fontBlock = text.match(/fontFamily\s*:\s*\{([^}]*(?:\[[^\]]*\][^}]*)*)\}/s);
  if (fontBlock) {
    const fontGroup = {};
    const fontRe = /['"]?(\w+)['"]?\s*:\s*\[([^\]]+)\]/g;
    let m;
    while ((m = fontRe.exec(fontBlock[1])) !== null) {
      const fonts = m[2].match(/['"]([^'"]+)['"]/g);
      if (fonts) {
        fontGroup[m[1]] = {
          $value: fonts.map(f => f.replace(/['"]/g, '')).join(', '),
          $type: 'fontFamily',
        };
      }
    }
    if (Object.keys(fontGroup).length) primitive.fontFamily = fontGroup;
  }

  return Object.keys(primitive).length ? primitive : null;
}

function tryTailwindConfig(projectDir) {
  const path = findTailwindConfig(projectDir);
  if (!path) return null;
  try {
    const text = readFileSync(path, 'utf-8');
    const primitive = extractTailwindValues(text);
    if (primitive) return { primitive, semantic: {} };
  } catch { /* unreadable — skip */ }
  return null;
}

function extractCssVars(text) {
  const primitive = { cssVar: {} };
  const rootBlocks = text.match(/:root\s*\{[^}]*\}/gs);
  if (!rootBlocks) return null;

  const varRe = /--([\w-]+)\s*:\s*([^;]+);/g;
  for (const block of rootBlocks) {
    let m;
    while ((m = varRe.exec(block)) !== null) {
      const name = m[1].trim();
      const value = m[2].trim();
      primitive.cssVar[name] = { $value: value, $type: 'color' };
    }
  }
  return Object.keys(primitive.cssVar).length ? primitive : null;
}

function tryGlobalsCss(projectDir) {
  const path = findFile(projectDir, SEARCH_DIRS, 'globals.css');
  if (!path) return null;
  try {
    const text = readFileSync(path, 'utf-8');
    const primitive = extractCssVars(text);
    if (primitive) return { primitive, semantic: {} };
  } catch { /* unreadable — skip */ }
  return null;
}

function mergeTokens(base, addition) {
  if (!addition) return base;
  if (!base) return addition;
  const merged = { ...base };
  for (const key of Object.keys(addition)) {
    if (!(key in merged)) {
      merged[key] = addition[key];
    }
  }
  return merged;
}

export function scanProjectDesignFiles(projectDir) {
  const dtResult = tryDesignTokens(projectDir);
  const twResult = tryTailwindConfig(projectDir);
  const cssResult = tryGlobalsCss(projectDir);

  if (!dtResult && !twResult && !cssResult) return null;

  let primitive = dtResult?.primitive ?? null;
  let semantic = dtResult?.semantic ?? {};

  if (twResult) primitive = mergeTokens(primitive, twResult.primitive);
  if (cssResult) primitive = mergeTokens(primitive, cssResult.primitive);

  if (!primitive) return null;

  return {
    tokens: { primitive, semantic },
    design: {},
  };
}
