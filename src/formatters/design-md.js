// DESIGN.md — agent-native single-file output. Compatible with the
// 8-canonical-section convention (Overview · Colors · Typography · Layout
// · Elevation and Depth · Shapes · Components · Do's and Don'ts), plus
// YAML front matter holding the machine-readable token snapshot.
//
// Designed to be a drop-in replacement for design-extractor.com's
// DESIGN.md output, but driven by the v10/v11 semantic layer (intent,
// material, voice, anatomy, library detection) rather than just colors.

import { readFileSync } from 'fs';

function yamlString(v) {
  if (v == null) return '~';
  if (typeof v === 'number' || typeof v === 'boolean') return String(v);
  const s = String(v);
  if (s === '' || /[:#&*!?[\]{},|>%@`'"\n]/.test(s) || /^\s|\s$/.test(s)) {
    return JSON.stringify(s);
  }
  return s;
}

function yamlList(arr, indent = '    ') {
  if (!arr || arr.length === 0) return '[]';
  return '\n' + arr.map(v => `${indent}- ${yamlString(v)}`).join('\n');
}

function yamlMap(obj, indent = '    ') {
  const entries = Object.entries(obj || {}).filter(([, v]) => v != null);
  if (entries.length === 0) return '{}';
  return '\n' + entries.map(([k, v]) => `${indent}${k}: ${yamlString(v)}`).join('\n');
}

function topColor(colors, role) {
  return colors?.[role]?.hex || null;
}

function fmtPx(v) {
  if (v == null) return null;
  const n = typeof v === 'number' ? v : parseFloat(String(v));
  return Number.isFinite(n) ? `${Math.round(n)}px` : String(v);
}

function uniq(arr) { return [...new Set(arr.filter(Boolean))]; }

function pickHeading(voice, fallback) {
  const s = (voice?.sampleHeadings || []).find(h => h && h.length > 4 && h.length < 80);
  return s || fallback;
}

function ratioLine(v, n) { return `${v} (${n})`; }

// ─── Section renderers ─────────────────────────────────────────

function sectionOverview(design) {
  const intent = design.pageIntent?.type || 'landing';
  const intentConf = design.pageIntent?.confidence;
  const material = design.materialLanguage?.label || 'flat';
  const matConf = design.materialLanguage?.confidence;
  const library = design.componentLibrary?.library;
  const libConf = design.componentLibrary?.confidence;
  const order = (design.sectionRoles?.readingOrder || []).join(' → ') || '—';
  const voice = design.voice || {};
  const tone = voice.tone || 'neutral';
  const lede = pickHeading(voice, design.meta?.title || '');
  const url = design.meta?.url || '';

  const lines = [];
  lines.push(`A **${intent}** page${intentConf ? ` (heuristic confidence ${intentConf})` : ''}, dressed in **${material}** material${matConf ? ` (${matConf})` : ''}.`);
  if (library && library !== 'unknown') {
    lines.push('');
    lines.push(`Component library appears to be **${library}**${libConf ? ` (${libConf})` : ''}.`);
  }
  if (lede) {
    lines.push('');
    lines.push(`> "${lede}"`);
  }
  lines.push('');
  lines.push(`The author writes in a **${tone}** voice; headings tend to be **${voice.headingStyle || 'sentence'}** case and **${voice.headingLengthClass || 'balanced'}**.`);
  lines.push('');
  lines.push(`Reading order detected on the source: \`${order}\`.`);
  if (url) {
    lines.push('');
    lines.push(`Source: <${url}>.`);
  }
  return lines.join('\n');
}

function sectionColors(design) {
  const c = design.colors || {};
  const lines = ['| role | hex | usage |', '|---|---|---|'];
  const rows = [
    ['primary',     c.primary?.hex,     c.primary?.count],
    ['secondary',   c.secondary?.hex,   c.secondary?.count],
    ['accent',      c.accent?.hex,      c.accent?.count],
    ['background',  c.backgrounds?.[0], '—'],
    ['foreground',  c.text?.[0],        '—'],
  ];
  for (const [role, hex, count] of rows) {
    if (!hex) continue;
    lines.push(`| ${role} | \`${hex}\` | ${count ?? '—'} |`);
  }
  const neutrals = (c.neutrals || []).slice(0, 5);
  if (neutrals.length) {
    lines.push('');
    lines.push('**Neutrals:** ' + neutrals.map(n => `\`${n.hex}\``).join(' · '));
  }
  if (c.all?.length) {
    lines.push('');
    lines.push(`**Total unique colors detected:** ${c.all.length}.`);
  }
  return lines.join('\n');
}

function sectionTypography(design) {
  const t = design.typography || {};
  const lines = [];
  if (t.families?.length) {
    lines.push('**Families**');
    for (const f of t.families.slice(0, 4)) {
      lines.push(`- \`${f.name}\`${f.weights ? ` — weights ${[...new Set(f.weights)].join(', ')}` : ''}${f.count ? ` · ${f.count} uses` : ''}`);
    }
  }
  if (t.body?.size) {
    lines.push('');
    lines.push(`**Body size:** \`${t.body.size}px\` / line-height \`${t.body.lineHeight ?? '1.5'}\`.`);
  }
  if (t.headings?.length) {
    lines.push('');
    lines.push('**Heading scale**');
    lines.push('| level | size | weight | line-height |');
    lines.push('|---|---|---|---|');
    for (const [i, h] of t.headings.slice(0, 4).entries()) {
      lines.push(`| h${i + 1} | \`${h.size}px\` | \`${h.weight}\` | \`${h.lineHeight}\` |`);
    }
  }
  return lines.join('\n');
}

function sectionLayout(design) {
  const sp = design.spacing || {};
  const bp = design.breakpoints || [];
  const layout = design.layout || {};
  const lines = [];
  if (sp.base) lines.push(`**Spacing base:** \`${sp.base}px\` increments.`);
  if (sp.scale?.length) lines.push(`**Scale:** ${sp.scale.slice(0, 10).map(s => `\`${(s.value ?? s)}px\``).join(' · ')}`);
  if (layout.gridCount != null || layout.flexCount != null) {
    lines.push('');
    lines.push(`**Layout primitives:** ${layout.gridCount ?? 0} grid containers · ${layout.flexCount ?? 0} flex containers.`);
  }
  if (bp.length) {
    lines.push('');
    lines.push(`**Breakpoints:** ${bp.map(b => `\`${b}px\``).join(' · ')}`);
  }
  return lines.join('\n') || '_No layout signals captured._';
}

function sectionElevation(design) {
  const sh = design.shadows?.values || [];
  const z = design.zIndex || {};
  const lines = [];
  if (sh.length) {
    lines.push('**Shadow scale**');
    for (const s of sh.slice(0, 6)) {
      lines.push(`- \`${s.label || '?'}\` — \`${s.raw || s.value}\``);
    }
  } else {
    lines.push('_No discrete shadow tokens detected — flat material._');
  }
  if (z.allValues?.length) {
    lines.push('');
    lines.push(`**Z-index layers:** ${z.allValues.length}${z.issues?.length ? ` · ⚠ ${z.issues.length} issue(s)` : ''}`);
  }
  return lines.join('\n');
}

function sectionShapes(design) {
  const r = design.borders?.radii || [];
  const lines = [];
  if (r.length) {
    lines.push('**Radius scale**');
    for (const x of r.slice(0, 6)) lines.push(`- \`${x.label || '?'}\` — \`${x.value}px\``);
  } else {
    lines.push('_No discrete radius tokens detected — sharp/brutalist shapes._');
  }
  return lines.join('\n');
}

function sectionComponents(design) {
  const lines = [];
  const detected = Object.keys(design.components || {});
  if (detected.length) {
    lines.push(`**Detected patterns:** ${detected.map(c => `\`${c}\``).join(' · ')}`);
    lines.push('');
  }
  const anatomies = design.componentAnatomy || [];
  if (anatomies.length) {
    lines.push('**Anatomy**');
    lines.push('| kind | variants | sizes | instances |');
    lines.push('|---|---|---|---|');
    for (const a of anatomies.slice(0, 8)) {
      const variants = (a.props?.variant || []).join(', ') || '—';
      const sizes = (a.props?.size || []).join(', ') || '—';
      lines.push(`| ${a.kind} | ${variants} | ${sizes} | ${a.totalInstances ?? '—'} |`);
    }
  }
  if (!lines.length) lines.push('_No component anatomy extracted._');
  return lines.join('\n');
}

function sectionDosDonts(design) {
  const voice = design.voice || {};
  const score = design.score || {};
  const a11y = design.accessibility || {};
  const lines = [];

  lines.push("**Do's**");
  const dos = [];
  const ctas = (voice.ctaVerbs || []).slice(0, 3).map(v => v.value).filter(Boolean);
  if (ctas.length) dos.push(`Use \`${ctas.join('\`, \`')}\` as the primary verbs in CTAs — these dominate the source.`);
  if (voice.headingStyle) dos.push(`Write headings in **${voice.headingStyle}** case, **${voice.headingLengthClass || 'balanced'}** length.`);
  if (voice.pronoun && voice.pronoun !== 'neutral') dos.push(`Address the reader with the pronoun posture **${voice.pronoun}**.`);
  if (design.materialLanguage?.label) dos.push(`Stay inside the **${design.materialLanguage.label}** material — match shadow and radius habits.`);
  if (!dos.length) dos.push('_No strong directional signals captured._');
  for (const d of dos) lines.push(`- ${d}`);

  lines.push('');
  lines.push("**Don'ts**");
  const donts = [];
  if (a11y.failCount > 0) donts.push(`Don't ship copy on the colors flagged in accessibility — ${a11y.failCount} contrast pair(s) fail WCAG AA on the source itself.`);
  if (score.issues?.length) for (const i of score.issues.slice(0, 4)) donts.push(`Don't ${i.toLowerCase().replace(/^./, c => c.toLowerCase())}.`);
  if (!donts.length) donts.push("_No anti-patterns surfaced. Don't invent new tokens — reuse the scale above._");
  for (const d of donts) lines.push(`- ${d}`);

  return lines.join('\n');
}

// ─── YAML front matter ─────────────────────────────────────────

function frontMatter(design, version) {
  const url = design.meta?.url || '';
  const title = design.meta?.title || '';
  const c = design.colors || {};
  const t = design.typography || {};
  const sp = design.spacing || {};
  const r = design.borders?.radii || [];
  const sh = design.shadows?.values || [];

  const lines = ['---'];
  lines.push(`site: ${yamlString(title || url)}`);
  if (url) lines.push(`url: ${yamlString(url)}`);
  lines.push(`generated_at: ${yamlString(new Date().toISOString())}`);
  lines.push(`generator: ${yamlString(`designlang@${version}`)}`);
  if (design.pageIntent?.type) lines.push(`intent: ${yamlString(design.pageIntent.type)}`);
  if (design.materialLanguage?.label) lines.push(`material: ${yamlString(design.materialLanguage.label)}`);
  if (design.componentLibrary?.library && design.componentLibrary.library !== 'unknown') {
    lines.push(`library: ${yamlString(design.componentLibrary.library)}`);
  }

  lines.push('tokens:');
  lines.push('  colors:' + yamlMap({
    primary: topColor(c, 'primary'),
    secondary: topColor(c, 'secondary'),
    accent: topColor(c, 'accent'),
    background: c.backgrounds?.[0],
    foreground: c.text?.[0],
  }, '    '));
  lines.push('  typography:' + yamlMap({
    sans: t.families?.[0]?.name,
    mono: t.families?.find(f => /mono/i.test(f.name))?.name,
    base: t.body?.size,
  }, '    '));
  lines.push('  spacing:' + yamlMap({
    base: sp.base,
    scale: sp.scale?.length ? '[' + sp.scale.slice(0, 10).map(s => (s.value ?? s)).join(', ') + ']' : null,
  }, '    '));
  if (r.length) {
    lines.push('  radii:' + yamlMap(Object.fromEntries(r.slice(0, 6).map(x => [x.label || `r${x.value}`, x.value])), '    '));
  }
  if (sh.length) {
    lines.push('  shadows:' + yamlMap(Object.fromEntries(sh.slice(0, 4).map(x => [x.label || 'shadow', x.raw || x.value])), '    '));
  }
  lines.push('---');
  return lines.join('\n');
}

// ─── Main ──────────────────────────────────────────────────────

let CACHED_VERSION = null;
function pkgVersion() {
  if (CACHED_VERSION) return CACHED_VERSION;
  try {
    const url = new URL('../../package.json', import.meta.url);
    CACHED_VERSION = JSON.parse(readFileSync(url, 'utf-8')).version;
  } catch { CACHED_VERSION = '0.0.0'; }
  return CACHED_VERSION;
}

export function formatDesignMd(design) {
  const version = pkgVersion();
  const fm = frontMatter(design, version);

  const sections = [
    ['Overview',            sectionOverview(design)],
    ['Colors',              sectionColors(design)],
    ['Typography',          sectionTypography(design)],
    ['Layout',              sectionLayout(design)],
    ['Elevation and Depth', sectionElevation(design)],
    ['Shapes',              sectionShapes(design)],
    ['Components',          sectionComponents(design)],
    ["Do's and Don'ts",     sectionDosDonts(design)],
  ];

  const body = sections.map(([h, b]) => `# ${h}\n\n${b || '_—_'}\n`).join('\n');

  const sourceUrl = design.meta?.url || '';
  const footer = `\n---\n_Generated by [designlang](https://github.com/Manavarya09/design-extract) v${version} from <${sourceUrl}>._\n_Compatible with the DESIGN.md convention pioneered by [design-extractor.com](https://www.design-extractor.com) — extended with intent, material, voice, anatomy, and library detection._\n`;

  return `${fm}\n\n${body}${footer}`;
}
