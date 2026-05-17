// One-shot agent prompt — `<host>-AGENT.md`.
//
// Drop the contents into Claude / GPT / Gemini / Cursor / Windsurf
// and the agent will build any UI you ask for *in the extracted brand*.
//
// Distinct from the existing prompt-pack (which targets v0 / Lovable /
// Cursor with tool-specific syntax). This file is one self-contained
// system-prompt that works in any context window — every token, every
// component anatomy slot, every brand voice rule, ready to paste.

function hex(c) { return c?.hex || c || null; }
function pickHex(role, design) { return hex(design?.colors?.[role]) || null; }

function topN(arr, n) {
  if (Array.isArray(arr)) return arr.slice(0, n);
  if (arr && typeof arr === 'object') return Object.values(arr).slice(0, n);
  return [];
}

function listColors(design) {
  const out = [];
  for (const role of ['primary', 'secondary', 'accent', 'background', 'foreground']) {
    const v = pickHex(role, design);
    if (v) out.push(`- ${role.padEnd(11)} ${v}`);
  }
  const neutrals = topN(design?.colors?.neutrals, 6).map((n) => hex(n)).filter(Boolean);
  if (neutrals.length) out.push(`- neutrals    ${neutrals.join(' · ')}`);
  return out.join('\n');
}

function listType(design) {
  const fams = topN(design?.typography?.families, 4).map((f) => f?.name || f).filter(Boolean);
  const weights = topN(design?.typography?.weights, 6).map((w) => w?.weight || w?.value || w).filter(Boolean);
  const base = design?.typography?.base || 16;
  return [
    fams.length ? `- families   ${fams.join(' · ')}` : null,
    weights.length ? `- weights    ${weights.join(' · ')}` : null,
    `- base size  ${base}px`,
  ].filter(Boolean).join('\n');
}

function listSpacing(design) {
  const scale = topN(design?.spacing?.scale, 12).map((px) => `${px}px`);
  if (!scale.length) return null;
  return `- scale      ${scale.join(' · ')}`;
}

function listRadii(design) {
  const radii = topN(design?.borders?.radii, 6).map((r) => `${typeof r === 'object' ? r.value : r}px`);
  if (!radii.length) return null;
  return `- scale      ${radii.join(' · ')}`;
}

function listMotion(design) {
  const durs = topN(design?.motion?.durations, 4).map((d) => `${typeof d === 'object' ? (d.value || d.ms) : d}ms`);
  const eas = topN(design?.motion?.easings, 4).map((e) => typeof e === 'object' ? e.value : e).filter(Boolean);
  return [
    durs.length ? `- durations  ${durs.join(' · ')}` : null,
    eas.length  ? `- easings    ${eas.join(' · ')}` : null,
  ].filter(Boolean).join('\n');
}

function listVoice(design) {
  const v = design?.voice || {};
  const ctas = topN(v.ctaVerbs, 6).map((c) => c?.value || c).filter(Boolean);
  const headings = topN(v.headlines || v.headings, 3).map((h) => h?.text || h).filter(Boolean);
  return [
    v.tone     ? `- tone       ${v.tone}` : null,
    v.pronoun  ? `- pronoun    ${v.pronoun}` : null,
    v.headingStyle ? `- headings   ${v.headingStyle}` : null,
    ctas.length    ? `- CTA verbs  ${ctas.join(' · ')}` : null,
    headings.length ? `- real headlines:\n${headings.map(h => `  > "${String(h).slice(0, 120)}"`).join('\n')}` : null,
  ].filter(Boolean).join('\n');
}

function listAnatomy(design) {
  const list = design?.componentAnatomy || design?.componentClusters || [];
  if (!Array.isArray(list) || list.length === 0) return null;
  return topN(list, 8).map((c) => {
    const kind = String(c?.kind || c?.name || 'component');
    const variants = topN(c?.variants, 4).map(String).join(' · ') || '—';
    const slots    = topN(c?.slots,    4).map(String).join(' · ') || '—';
    return `- ${kind.padEnd(10)} variants: ${variants}  ·  slots: ${slots}`;
  }).join('\n');
}

function listA11y(design) {
  const a = design?.accessibility || {};
  const score = a.score ?? null;
  const fails = a.failCount ?? (a.remediation?.length ?? 0);
  return `- WCAG score ${score == null ? '—' : `${score}%`} · failing pairs: ${fails}`;
}

export function formatAgentPrompt(design) {
  const host = design?.meta?.url ? new URL(design.meta.url).hostname.replace(/^www\./, '') : 'this site';
  const title = design?.meta?.title || host;
  const intent = design?.pageIntent?.label || 'landing';
  const material = design?.materialLanguage?.label || 'flat';
  const library = design?.componentLibrary?.label || null;
  const grade = design?.score?.grade || null;

  const blocks = [];
  blocks.push(
    `# You are building UI in the ${host} design system.`,
    '',
    `Source: ${design?.meta?.url || '—'}`,
    `Extracted by designlang on ${new Date().toISOString().slice(0, 10)}.`,
    '',
    '## Brand at a glance',
    '',
    `- title         ${title}`,
    `- page intent   ${intent}`,
    `- material      ${material}`,
    library ? `- library       ${library}` : null,
    grade ? `- design grade  ${grade}` : null,
    '',
    '## Colour',
    '',
    listColors(design) || '_(no colour roles detected)_',
    '',
    '## Typography',
    '',
    listType(design),
    '',
  );

  const spacing = listSpacing(design);
  if (spacing) blocks.push('## Spacing', '', spacing, '');

  const radii = listRadii(design);
  if (radii) blocks.push('## Radii', '', radii, '');

  const motion = listMotion(design);
  if (motion) blocks.push('## Motion', '', motion, '');

  const voice = listVoice(design);
  if (voice) blocks.push('## Voice', '', voice, '');

  const anatomy = listAnatomy(design);
  if (anatomy) blocks.push('## Component anatomy', '', anatomy, '');

  blocks.push('## Accessibility', '', listA11y(design), '');

  blocks.push(
    '## Build rules',
    '',
    '1. Use the colours above. **Never invent a new hex.** If you need a',
    '   shade between two existing colours, derive it via HSL adjustment',
    '   from the closest extracted colour and call out the derivation.',
    '2. Use the extracted typography families. If you need a missing weight,',
    '   pick the nearest available weight from the list and note it.',
    '3. Snap spacing values to the scale above. No off-scale paddings or',
    '   margins.',
    '4. Snap border radii to the scale above.',
    '5. Match the voice: same tone, same pronoun stance, same heading',
    '   style. Reuse the listed CTA verbs.',
    '6. Aim for WCAG AA contrast minimum. When the brand colours fail,',
    '   prefer the foreground colour on the background colour rather than',
    '   mid-tone neutrals.',
    '7. Reuse component anatomy when it exists — do not invent novel',
    '   structures for things the site already has.',
    '',
    '## Available context files',
    '',
    'designlang wrote these alongside this prompt. Reach for them when',
    'you need ground truth:',
    '',
    '- `<host>-design-tokens.json` — DTCG primitive · semantic · composite tokens',
    '- `<host>-tailwind.config.js`  — Tailwind v3 config',
    '- `<host>-tailwind-v4.css`     — Tailwind v4 `@theme` block',
    '- `<host>-tokens.d.ts`         — TypeScript literal-union types',
    '- `<host>-variables.css`       — bare CSS custom properties',
    '- `<host>-reset.css`           — brand-aware base styles',
    '- `<host>-gradients.css`       — `.grad-N` utility classes',
    '- `<host>-anatomy.tsx`         — typed React component scaffolds',
    '- `<host>-shadcn-theme.css`    — shadcn/ui theme',
    '- `<host>-theme.js`            — React / Vue / Svelte theme object',
    '- `<host>-mcp.json`            — MCP server payload (load via stdio)',
    '- `<host>.brand.pdf`           — print-ready 13-chapter brand book',
    '',
    'When you reference the system in code, prefer importing from these',
    'files over hard-coding values.',
    '',
    '## Output expectations',
    '',
    'When asked to "build a pricing page" or "make a card" or any UI:',
    '',
    '- Produce a single self-contained component file in the appropriate',
    '  framework (React / Vue / Svelte — match what the user is using).',
    '- Use Tailwind utility classes wired to the v4 `@theme` if Tailwind',
    '  is available; otherwise use the CSS custom properties from',
    '  `variables.css`.',
    '- Write the headline copy using the brand voice; do not invent',
    '  generic Lorem.',
    '- Annotate any choice where you had to bend the system, with a',
    '  one-line `// note:` comment explaining what and why.',
    '',
    `## One-line install`,
    '',
    '```bash',
    `npx designlang ${host}`,
    '```',
    '',
    'Run this against any other URL to extract its system in the same',
    'shape as the one above.',
    '',
    '---',
    '',
    `Generated by designlang. Re-extract by running \`npx designlang ${host}\`.`,
    '',
  );

  return blocks.filter((b) => b !== null).join('\n');
}
