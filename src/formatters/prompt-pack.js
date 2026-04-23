// Generates ready-to-paste prompts for v0, Lovable, Cursor, and Claude
// Artifacts — plus atomic per-component "recipe cards". The point is to get an
// LLM to reproduce a site's look without the user having to hand-translate the
// extracted JSON. We inline the tokens, voice, section order, and library
// guidance so the model has everything it needs in one message.

function colorList(design) {
  const all = (design.colors?.all || []).map(c => c.hex).filter(Boolean);
  return [...new Set(all)].slice(0, 14);
}

function typeFamilies(design) {
  return [...new Set((design.typography?.families || []).filter(Boolean))].slice(0, 4);
}

function scaleSnippet(scale = []) {
  if (!scale.length) return '(not detected)';
  return scale.slice(0, 8).map(s => String(s.value ?? s) + (s.label ? ` (${s.label})` : '')).join(', ');
}

function radiiSnippet(borders) {
  const r = (borders?.radii || []).slice(0, 6).map(x => String(x.value ?? x));
  return r.length ? r.join(', ') : '(none)';
}

function shadowSnippet(shadows) {
  const s = (shadows?.values || []).slice(0, 3).map(x => String(x.raw ?? x.value ?? x));
  return s.length ? s.join(' | ') : '(none)';
}

function librarySuggest(library) {
  if (!library || library.library === 'unknown') return null;
  const map = {
    'shadcn/ui': 'Use shadcn/ui components (Button, Card, Dialog, Input, Sheet, Tabs). Pair with Tailwind.',
    'radix-ui': 'Use Radix UI primitives for accessibility. Style with your preferred CSS solution.',
    'headlessui': 'Use Headless UI primitives styled with Tailwind.',
    'mui': 'Use MUI v5 components with a custom ThemeProvider matching the tokens below.',
    'chakra-ui': 'Use Chakra UI components with a custom extendTheme({}) block.',
    'mantine': 'Use Mantine UI components with MantineProvider theme overrides.',
    'ant-design': 'Use Ant Design v5 with ConfigProvider theme tokens.',
    'bootstrap': 'Use Bootstrap 5 utility classes. Customize via CSS variables.',
    'heroui': 'Use HeroUI/NextUI components.',
    'tailwind-ui': 'Use Tailwind UI patterns — no component library runtime, just Tailwind classes.',
    'tailwindcss': 'Use plain Tailwind CSS without a component library.',
    'vuetify': 'Use Vuetify 3 components with a custom theme object.',
  };
  return map[library.library] || null;
}

function sectionList(sectionRoles) {
  if (!sectionRoles || !sectionRoles.sections) return [];
  return sectionRoles.sections
    .filter(s => s.role && s.role !== 'content' && s.role !== 'nav')
    .map(s => {
      const slot = s.slots?.heading ? ` — heading: "${s.slots.heading.slice(0, 80)}"` : '';
      return `- ${s.role}${slot}`;
    });
}

function voiceBlock(voice) {
  if (!voice) return '';
  const parts = [];
  if (voice.tone) parts.push(`Tone: ${voice.tone}`);
  if (voice.headingStyle) parts.push(`Headings: ${voice.headingStyle}`);
  if (voice.pronounPosture) parts.push(`Pronoun posture: ${voice.pronounPosture}`);
  if ((voice.ctaVerbs || []).length) parts.push(`CTA verbs: ${(voice.ctaVerbs || []).slice(0, 6).join(', ')}`);
  return parts.join(' · ');
}

function coreBrief(design, opts = {}) {
  const colors = colorList(design);
  const fonts = typeFamilies(design);
  const spacing = scaleSnippet(design.spacing?.scale);
  const radii = radiiSnippet(design.borders);
  const shadows = shadowSnippet(design.shadows);
  const material = design.materialLanguage?.label || 'flat';
  const intent = design.pageIntent?.type || 'landing';
  const sections = sectionList(design.sectionRoles);
  const voice = voiceBlock(design.voice);
  const lib = librarySuggest(design.componentLibrary);
  return {
    colors, fonts, spacing, radii, shadows, material, intent, sections, voice, lib,
  };
}

export function formatV0Prompt(design) {
  const b = coreBrief(design);
  return [
    `Build a ${b.intent} page with this exact visual language.`,
    '',
    'COLORS:',
    b.colors.map(c => `  ${c}`).join('\n'),
    '',
    `FONTS: ${b.fonts.join(', ') || 'system-ui'}`,
    `SPACING: ${b.spacing}`,
    `RADIUS: ${b.radii}`,
    `SHADOWS: ${b.shadows}`,
    `MATERIAL LANGUAGE: ${b.material}`,
    b.voice ? `VOICE: ${b.voice}` : '',
    b.lib ? `LIBRARY: ${b.lib}` : '',
    '',
    'SECTIONS (in order):',
    (b.sections.length ? b.sections : ['- hero', '- features', '- cta', '- footer']).join('\n'),
    '',
    'Use Tailwind. Match these tokens exactly. Keep the material language consistent.',
  ].filter(Boolean).join('\n');
}

export function formatLovablePrompt(design) {
  const b = coreBrief(design);
  return [
    `Clone the design language of this ${b.intent} page and build a fresh equivalent.`,
    '',
    `Visual feel: ${b.material}. ${b.voice || ''}`,
    `Primary palette: ${b.colors.slice(0, 5).join(', ')}.`,
    `Typography: ${b.fonts.join(', ') || 'system-ui'}.`,
    `Corner radius vocabulary: ${b.radii}.`,
    `Shadow vocabulary: ${b.shadows}.`,
    b.lib ? `Use: ${b.lib}` : '',
    '',
    'Page structure:',
    (b.sections.length ? b.sections : ['- hero', '- features', '- social proof', '- cta', '- footer']).join('\n'),
  ].filter(Boolean).join('\n');
}

export function formatCursorPrompt(design) {
  const b = coreBrief(design);
  return [
    '# Design brief',
    '',
    `Page type: **${b.intent}**.`,
    `Material language: **${b.material}**.`,
    b.voice ? `Voice: ${b.voice}.` : '',
    '',
    '## Tokens',
    '',
    '```ts',
    'export const tokens = {',
    `  colors: [${b.colors.map(c => `'${c}'`).join(', ')}],`,
    `  fonts: [${b.fonts.map(f => `'${f}'`).join(', ')}],`,
    `  radii: [${(design.borders?.radii || []).slice(0, 6).map(r => `'${String(r.value ?? r)}'`).join(', ')}],`,
    `  shadows: [${(design.shadows?.values || []).slice(0, 3).map(s => `'${String(s.raw ?? s.value ?? s).replace(/'/g, "\\'")}'`).join(', ')}],`,
    '};',
    '```',
    '',
    '## Sections',
    (b.sections.length ? b.sections : ['- hero', '- features', '- cta', '- footer']).join('\n'),
    '',
    b.lib ? `## Library\n\n${b.lib}` : '',
  ].filter(Boolean).join('\n');
}

export function formatClaudeArtifactPrompt(design) {
  const b = coreBrief(design);
  return [
    'Create a React artifact that reproduces this brand\'s design language.',
    '',
    `Page intent: ${b.intent}.`,
    `Material language: ${b.material}.`,
    b.voice ? `Voice: ${b.voice}.` : '',
    b.lib ? `Library preference: ${b.lib}` : '',
    '',
    `Colors to use: ${b.colors.join(', ')}.`,
    `Fonts: ${b.fonts.join(', ') || 'system-ui'}.`,
    `Radius vocabulary: ${b.radii}.`,
    '',
    'Sections:',
    (b.sections.length ? b.sections : ['- hero', '- features', '- cta', '- footer']).join('\n'),
    '',
    'Use Tailwind via CDN, lucide-react for icons, and keep the material language consistent across sections. Do not add extra decorative elements outside this vocabulary.',
  ].filter(Boolean).join('\n');
}

export function formatRecipeCards(design) {
  const clusters = design.componentClusters || [];
  if (!clusters.length) return [];
  const b = coreBrief(design);
  return clusters.slice(0, 12).map((c, i) => {
    const name = c.name || c.kind || `component-${i + 1}`;
    const signals = [
      b.lib,
      `Radius: ${b.radii}`,
      `Shadows: ${b.shadows}`,
    ].filter(Boolean).join(' · ');
    return {
      name,
      content: [
        `# Recipe: ${name}`,
        '',
        `Build one ${name} component that matches this brand.`,
        '',
        `Palette: ${b.colors.slice(0, 6).join(', ')}`,
        `Typography: ${b.fonts.join(', ') || 'system-ui'}`,
        `Material: ${b.material}`,
        signals ? `Signals: ${signals}` : '',
        '',
        '## Anatomy (detected)',
        '```json',
        JSON.stringify(c, null, 2).slice(0, 1500),
        '```',
      ].filter(Boolean).join('\n'),
    };
  });
}

export function buildPromptPack(design) {
  return {
    'v0.txt': formatV0Prompt(design),
    'lovable.txt': formatLovablePrompt(design),
    'cursor.md': formatCursorPrompt(design),
    'claude-artifacts.md': formatClaudeArtifactPrompt(design),
    recipes: formatRecipeCards(design),
  };
}
