// Agent rules emitter. Produces ready-to-drop files that teach coding agents
// (Cursor, Claude Code, generic) to prefer the extracted design tokens
// instead of inventing new colors/typography.
//
// Output: { relativePath: fileContent } — caller is responsible for writing.

import { resolveRef } from './_token-ref.js';

function hostFromUrl(url) {
  try { return new URL(url).hostname; } catch { return url || 'unknown'; }
}

// Resolve a semantic token path to its concrete leaf value, or fall back.
function resolveSemantic(tokens, path, fallback) {
  const v = resolveRef(tokens, path);
  return (typeof v === 'string' && v) ? v : fallback;
}

function firstFontFamily(tokens) {
  const fam = tokens?.primitive?.fontFamily || {};
  const keys = Object.keys(fam);
  if (!keys.length) return 'system-ui';
  const v = fam[keys[0]]?.$value;
  return typeof v === 'string' ? v : 'system-ui';
}

function buildBody({ url, tokens, design, iso }) {
  const actionPrimary = resolveSemantic(tokens, 'semantic.color.action.primary', '#000000');
  const surfaceDefault = resolveSemantic(tokens, 'semantic.color.surface.default', '#ffffff');
  const textBody = resolveSemantic(tokens, 'semantic.color.text.body', '#111111');
  const radiusControl = resolveSemantic(tokens, 'semantic.radius.control', '0px');
  const fontFamily = firstFontFamily(tokens);

  const lines = [];
  lines.push(`Source: ${url}`);
  lines.push(`Extracted by designlang v7.0.0 on ${iso}`);
  lines.push('');
  lines.push('## Semantic tokens (use these)');
  lines.push(`- color.action.primary: ${actionPrimary}`);
  lines.push(`- color.surface.default: ${surfaceDefault}`);
  lines.push(`- color.text.body: ${textBody}`);
  lines.push(`- radius.control: ${radiusControl}`);
  lines.push(`- typography.body.fontFamily: ${fontFamily}`);

  const regions = Array.isArray(design?.regions) ? design.regions : [];
  if (regions.length) {
    lines.push('');
    lines.push('## Regions');
    const names = regions.map(r => r.role || r.name).filter(Boolean);
    for (const n of names) lines.push(`- ${n}`);
  }

  lines.push('');
  lines.push('## How to use');
  lines.push('- Prefer `semantic.*` tokens over `primitive.*`.');
  lines.push('- Never invent new tokens or hex values; reuse the ones above.');
  lines.push('- When a value is missing, pick the closest existing semantic token and flag the gap.');
  lines.push('- Reference tokens by their dotted path (e.g. `semantic.color.action.primary`).');

  return { body: lines.join('\n'), actionPrimary };
}

function cursorFile({ url, body }) {
  const front = [
    '---',
    `description: Design system extracted from ${url} — use these tokens, do not invent new ones.`,
    'globs: **/*.{ts,tsx,jsx,js,css,scss,html,vue,svelte,swift,kt,dart,php}',
    'alwaysApply: true',
    '---',
    '',
    '# Design system reference',
  ].join('\n');
  return `${front}\n${body}\n`;
}

function claudeSkillFile({ url, body }) {
  const host = hostFromUrl(url);
  const front = [
    '---',
    'name: designlang-tokens',
    `description: Use when styling UI for ${host} — references the extracted design system tokens instead of inventing colors, spacing, or typography.`,
    '---',
    '',
    '# designlang tokens',
  ].join('\n');
  return `${front}\n${body}\n`;
}

function claudeFragmentFile({ url, body }) {
  // Plain H2 section ready to append to a project's CLAUDE.md (no frontmatter).
  return `## Design system (via designlang)\n\n${body}\n`;
}

function agentsMdFile({ url, body }) {
  const head = [
    '# Agent instructions — design system',
    '',
    `This project follows the design system extracted from ${url}.`,
    'Any coding agent working here must use the tokens below and avoid inventing new ones.',
    '',
  ].join('\n');
  return `${head}${body}\n`;
}

export function formatAgentRules({ design, tokens, url }) {
  const resolvedUrl = url || tokens?.$metadata?.source || design?.meta?.url || 'unknown';
  const iso = tokens?.$metadata?.generatedAt || new Date().toISOString();
  const { body } = buildBody({ url: resolvedUrl, tokens, design: design || {}, iso });

  return {
    '.cursor/rules/designlang.mdc': cursorFile({ url: resolvedUrl, body }),
    '.claude/skills/designlang/SKILL.md': claudeSkillFile({ url: resolvedUrl, body }),
    'CLAUDE.md.fragment': claudeFragmentFile({ url: resolvedUrl, body }),
    'agents.md': agentsMdFile({ url: resolvedUrl, body }),
  };
}
