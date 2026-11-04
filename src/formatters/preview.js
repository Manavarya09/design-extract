// The visual preview: one self-contained HTML page that shows the measured
// design system as a specimen, in designlang's own look. Colours, type,
// spacing, corners, depth, components, contrast and the Slop Score, each
// drawn with the site's real values. Every string from the page is escaped
// and every CSS value is checked before it reaches a style attribute.

import { scoreGeneric } from '../slop/index.js';

const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const HEX = /^#[0-9a-f]{6}$/i;
const hexOf = (c) => {
  const h = c && typeof c === 'object' ? c.hex : c;
  return HEX.test(String(h || '')) ? String(h).toLowerCase() : null;
};
// Only plain lengths, colours and numbers may reach a style attribute.
const SAFE = /^[#a-z0-9.,%()\s-]{1,80}$/i;
const safe = (v) => (typeof v === 'string' && SAFE.test(v) && !/url|expression|var\(/i.test(v) ? v : null);
const family = (name) => `'${String(name || '').replace(/[^A-Za-z0-9 _.-]/g, '')}', system-ui, sans-serif`;

function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const contrast = (a, b) => { const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const inkOn = (hex) => (contrast(hex, '#ffffff') >= contrast(hex, '#1b1d3a') ? '#ffffff' : '#1b1d3a');
const hostOf = (u) => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return String(u || ''); } };

function roleSwatches(c) {
  return ['primary', 'secondary', 'accent'].map((role) => [role, c[role]]).filter(([, v]) => hexOf(v)).map(([role, v]) => {
    const hex = hexOf(v);
    const ink = inkOn(hex);
    return `<figure class="role" style="background:${hex};color:${ink}">
      <figcaption><b>${esc(role)}</b><span>${esc(hex)}</span></figcaption>
      <p>${esc(v.count ?? '')}${v.count ? ' uses' : ''} · ${contrast(hex, '#ffffff').toFixed(1)}:1 on white</p>
    </figure>`;
  }).join('');
}

function ramp(c) {
  const steps = c.ramps?.primary?.steps;
  if (!steps) return '';
  const cells = Object.entries(steps).filter(([, h]) => HEX.test(h)).map(([k, h]) => `<div style="background:${h};color:${inkOn(h)}"><b>${esc(k)}</b><span>${esc(h)}</span></div>`).join('');
  return `<div class="ramp" aria-label="Primary tonal ramp">${cells}</div>`;
}

function chips(c) {
  const all = (c.all || []).map(hexOf).filter(Boolean).slice(0, 40);
  return `<ul class="chips">${all.map((h) => `<li><i style="background:${h}"></i><code>${esc(h)}</code></li>`).join('')}</ul>`;
}

function typeSection(d) {
  const fams = (d.typography?.families || []).slice(0, 4);
  const sample = (d.voice?.sampleHeadings || []).find((h) => h && h.length > 12 && h.length < 70) || 'The quick brown fox jumps over the lazy dog';
  const spec = fams.map((f) => `<article class="face" style="font-family:${esc(family(f.name))}">
      <span class="face-aa">Aa</span>
      <div><h3>${esc(f.name)}</h3><p>${esc(f.usage || 'text')}${f.count ? ` · ${esc(f.count)} elements` : ''}</p></div>
    </article>`).join('');
  const body = fams.find((f) => f.usage !== 'mono')?.name || fams[0]?.name || 'system-ui';
  const scale = (d.typography?.scale || []).slice(0, 9).map((s) => {
    const size = Math.max(10, Math.min(Number(s.size) || 16, 96));
    const weight = safe(String(s.weight)) || '400';
    return `<div class="tscale-row"><code>${esc(s.size)}px · ${esc(weight)}${s.tags?.[0] ? ` · ${esc(s.tags[0])}` : ''}</code><p style="font-family:${esc(family(body))};font-size:${size}px;font-weight:${esc(weight)}">${esc(sample)}</p></div>`;
  }).join('');
  return `<div class="faces">${spec}</div><div class="tscale">${scale}</div><p class="note">Shown in each family when it is installed on this computer; otherwise a system face stands in.</p>`;
}

function spacingSection(d) {
  const scale = (d.spacing?.scale || []).filter((n) => n > 0 && n <= 160).slice(0, 14);
  if (!scale.length) return '<p class="note">No spacing scale found.</p>';
  return `<div class="ruler">${scale.map((n) => `<div><i style="width:${n * 2}px"></i><code>${esc(n)}px</code></div>`).join('')}</div>`;
}

function shapeSection(d) {
  const radii = (d.borders?.radii || []).slice(0, 8);
  const shadows = (d.shadows?.values || []).slice(0, 6).map((s) => safe(String(s.raw || '').replace(/\s+/g, ' '))).filter(Boolean);
  return `<div class="shapes">${radii.map((r) => `<div class="radius"><i style="border-radius:${Math.min(Number(r.value) || 0, 60)}px"></i><code>${r.value >= 999 ? 'pill' : `${esc(r.value)}px`}</code><span>${esc(r.count ?? '')}×</span></div>`).join('')}</div>
    ${shadows.length ? `<div class="shadows">${shadows.map((s, i) => `<div style="box-shadow:${esc(s)}"><code>shadow ${i + 1}</code></div>`).join('')}</div>` : ''}`;
}

function rgbToHex(v) {
  const m = String(v || '').match(/rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,\s/]+([\d.]+))?/);
  if (!m) return HEX.test(String(v)) ? v : null;
  if (m[4] !== undefined && Number(m[4]) === 0) return 'transparent';
  return '#' + [m[1], m[2], m[3]].map((n) => Number(n).toString(16).padStart(2, '0')).join('');
}

function componentSection(d) {
  const variants = (d.components?.buttons?.variants || []).slice(0, 6);
  if (!variants.length) return '<p class="note">No buttons measured on this page.</p>';
  const btns = variants.map((v) => {
    const st = v.style || {};
    const bg = rgbToHex(v.backgroundColor) || 'transparent';
    const fg = rgbToHex(st.color) || '#1b1d3a';
    const css = [`background:${bg}`, `color:${fg}`];
    for (const [k, p] of [['fontSize', 'font-size'], ['fontWeight', 'font-weight'], ['borderRadius', 'border-radius']]) if (safe(st[k])) css.push(`${p}:${st[k]}`);
    const py = safe(st.paddingTop); const px = safe(st.paddingRight);
    if (py && px) css.push(`padding:${py} ${px}`);
    // An outlined button has padding; a bare text link does not get a frame.
    if (bg === 'transparent' && parseFloat(py) > 0) css.push(`border:1.5px solid ${fg === 'transparent' ? '#1b1d3a' : fg}`);
    return `<figure class="btn-spec"><span style="${esc(css.join(';'))}">${esc(v.variant === 'variant-3' ? 'Primary action' : v.variant === 'secondary' ? 'Secondary' : v.variant === 'ghost' ? 'Ghost link' : 'Button')}</span><figcaption>${esc(v.variant)} · ${esc(v.count)}×</figcaption></figure>`;
  }).join('');
  return `<div class="btns">${btns}</div>`;
}

function a11ySection(d) {
  const a = d.accessibility || {};
  const fails = (a.failingPairs || []).slice(0, 6).filter((p) => HEX.test(p.fg) && HEX.test(p.bg));
  const head = `<p class="lead-num"><b>${esc(a.score ?? '—')}</b>% of measured text pairs pass WCAG AA</p>`;
  if (!fails.length) return head + '<p class="note">Every measured text and background pair passes AA.</p>';
  return head + `<div class="pairs">${fails.map((p) => `<div style="background:${p.bg};color:${p.fg}"><b>Aa</b><code>${esc(p.fg)} on ${esc(p.bg)} · ${esc(p.ratio)}:1</code></div>`).join('')}</div>`;
}

function slopSection(d) {
  const r = scoreGeneric(d);
  const words = { distinct: 'Looks distinct', mixed: 'Some generic tells', generic: 'Looks generic' };
  return `<div class="slop"><div class="slop-num"><b>${r.score}</b><span>/100</span><p>${words[r.band]}</p></div>
    <div>${r.flags.length ? `<ul class="flags">${r.flags.map((f) => `<li><b>${esc(f.label)}</b><span>${esc(f.evidence[0]?.where || '')}: ${esc(f.evidence[0]?.value || '')}</span></li>`).join('')}</ul>` : '<p>None of the ten known AI-design tells were measured.</p>'}
    <p class="note">0 is distinct, 100 is every known tell of AI-made design at once. <code>npx designlang slop ${esc(hostOf(d.meta?.url))}</code></p></div></div>`;
}

export function formatPreview(design) {
  const d = design || {};
  const c = d.colors || {};
  const host = hostOf(d.meta?.url);
  const primary = hexOf(c.primary) || '#1b1d3a';
  const fams = (d.typography?.families || []).map((f) => f.name);
  const when = d.meta?.timestamp ? new Date(d.meta.timestamp).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
  const facts = [
    `${(c.all || []).length} colours`,
    `${fams.length} type ${fams.length === 1 ? 'family' : 'families'}`,
    d.spacing?.base ? `${d.spacing.base}px spacing base` : null,
    `${(d.borders?.radii || []).length} corner radii`,
    d.score?.grade ? `system grade ${d.score.grade}` : null,
  ].filter(Boolean).join(' · ');
  const section = (id, title, sub, body) => `<section id="${id}"><header><h2>${title}</h2>${sub ? `<p>${sub}</p>` : ''}</header>${body}</section>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(host)} design system — designlang</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
:root{--bg:#ececee;--bg2:#f4f4f6;--card:#fff;--ink:#1b1d3a;--ink2:#4a4e6a;--ink3:#5b5f7a;--line:rgba(28,31,59,.1);--purple:#8a4fe0;--tint:#ece2fc;--lime:#d4f56b;--brand:${primary};--on-brand:${inkOn(primary)};--sans:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',sans-serif;--mono:'Geist Mono',ui-monospace,Menlo,monospace}
@media (prefers-color-scheme:dark){:root{--bg:#14152b;--bg2:#1b1d3a;--card:#202247;--ink:#f1f0fb;--ink2:#c9c8e0;--ink3:#a3a2c0;--line:rgba(255,255,255,.1);--tint:#2c2460}}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.55 var(--sans)}
code{font-family:var(--mono);font-size:12.5px}
.wrap{max-width:1180px;margin:0 auto;padding:0 clamp(16px,3vw,40px)}
.top{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:22px 0;font-size:14px;color:var(--ink3)}
.top b{color:var(--ink);font-weight:300;font-size:20px;letter-spacing:.01em}
.top a{color:inherit}
.hero{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr);gap:clamp(18px,3vw,36px);align-items:stretch;padding:12px 0 8px}
.hero h1{margin:0;font-size:clamp(44px,7vw,92px);font-weight:300;letter-spacing:-.045em;line-height:.98;overflow-wrap:anywhere}
.hero h1 b{font-weight:800}
.hero .sub{margin:16px 0 0;color:var(--ink2);max-width:52ch}
.hero .facts{margin:20px 0 0;font:500 14px var(--mono);color:var(--ink3)}
.brandcard{border-radius:32px;background:var(--brand);color:var(--on-brand);padding:28px;display:flex;flex-direction:column;justify-content:space-between;min-height:260px}
.brandcard b{font-size:clamp(40px,5vw,64px);font-weight:800;letter-spacing:-.04em;line-height:1}
.brandcard span{font:500 15px var(--mono);opacity:.85}
nav.toc{display:flex;flex-wrap:wrap;gap:8px;margin:30px 0 8px}
nav.toc a{padding:8px 14px;border-radius:999px;background:var(--card);color:var(--ink);text-decoration:none;font-size:14px;font-weight:600}
nav.toc a:hover{background:var(--tint)}
section{margin:22px 0;padding:clamp(20px,3vw,34px);border-radius:28px;background:var(--card)}
section>header{display:flex;justify-content:space-between;align-items:baseline;gap:12px;flex-wrap:wrap;margin-bottom:20px}
section h2{margin:0;font-size:26px;font-weight:800;letter-spacing:-.03em}
section>header p{margin:0;color:var(--ink3);font-size:14px}
.roles{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px}
.role{margin:0;border-radius:22px;padding:22px;min-height:170px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:inset 0 0 0 1px rgba(0,0,0,.06)}
.role figcaption{display:flex;justify-content:space-between;gap:8px;font-size:15px}
.role figcaption span{font:500 14px var(--mono)}
.role p{margin:0;font-size:13px;opacity:.85}
.ramp{display:grid;grid-template-columns:repeat(11,minmax(0,1fr));margin-top:12px;border-radius:16px;overflow:hidden}
.ramp div{padding:12px 8px;display:grid;gap:2px;font-size:11px}.ramp span{font:10px var(--mono);opacity:.8}
.chips{list-style:none;margin:18px 0 0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:8px}
.chips li{display:flex;align-items:center;gap:8px;padding:6px;border-radius:12px;background:var(--bg2)}
.chips i{width:28px;height:28px;border-radius:8px;box-shadow:inset 0 0 0 1px var(--line);flex:none}
.faces{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px}
.face{display:flex;gap:16px;align-items:center;padding:18px;border-radius:20px;background:var(--bg2)}
.face-aa{font-size:56px;line-height:1;color:var(--purple)}
.face h3{margin:0;font-size:18px;font-family:var(--sans)}.face p{margin:2px 0 0;color:var(--ink3);font:13px var(--sans)}
.tscale{margin-top:16px;display:grid;gap:4px}
.tscale-row{display:grid;grid-template-columns:150px minmax(0,1fr);gap:16px;align-items:baseline;padding:10px 0;border-bottom:1px solid var(--line)}
.tscale-row code{color:var(--ink3)}.tscale-row p{margin:0;line-height:1.15;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ruler{display:grid;gap:8px}.ruler div{display:flex;align-items:center;gap:14px}
.ruler i{display:block;height:14px;border-radius:4px;background:var(--lime);box-shadow:inset 0 0 0 1px rgba(0,0,0,.08);max-width:70%}
.ruler code{color:var(--ink3)}
.shapes{display:flex;flex-wrap:wrap;gap:16px}
.radius{display:grid;justify-items:center;gap:6px;color:var(--ink3)}.radius i{width:72px;height:72px;background:var(--tint);border:2px solid var(--purple)}
.radius span{font-size:12px}
.shadows{margin-top:22px;display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:22px;padding:18px;border-radius:20px;background:var(--bg2)}
.shadows div{height:90px;border-radius:16px;background:#fff;display:grid;place-items:end start;padding:10px;color:#5b5f7a}
.btns{display:flex;flex-wrap:wrap;gap:18px;align-items:flex-start;padding:22px;border-radius:20px;background:#fff;box-shadow:inset 0 0 0 1px var(--line)}
.btn-spec{margin:0;display:grid;gap:8px;justify-items:start}.btn-spec span{display:inline-block;line-height:1.2}
.btn-spec figcaption{font:12px var(--mono);color:#5b5f7a}
.lead-num{margin:0 0 14px;font-size:18px}.lead-num b{font-size:42px;letter-spacing:-.04em}
.pairs{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px}
.pairs div{border-radius:16px;padding:16px;display:grid;gap:6px;box-shadow:inset 0 0 0 1px var(--line)}.pairs b{font-size:26px}
.slop{display:grid;grid-template-columns:200px minmax(0,1fr);gap:24px;align-items:start}
.slop-num{padding:20px;border-radius:22px;background:var(--lime);color:#1b1d3a}.slop-num b{font-size:64px;font-weight:800;letter-spacing:-.05em;line-height:.9}
.slop-num span{font-weight:600}.slop-num p{margin:6px 0 0;font-weight:700}
.flags{list-style:none;margin:0;padding:0;display:grid;gap:8px}.flags li{display:grid;gap:2px;padding:12px 14px;border-radius:14px;background:var(--bg2)}
.flags span{font:12.5px var(--mono);color:var(--ink3);overflow-wrap:anywhere}
.note{margin:14px 0 0;font-size:13px;color:var(--ink3)}
footer{padding:28px 0 48px;color:var(--ink3);font-size:14px}footer a{color:var(--purple);font-weight:600}
@media (max-width:820px){.hero,.slop{grid-template-columns:1fr}.ramp{grid-template-columns:repeat(6,minmax(0,1fr))}.tscale-row{grid-template-columns:1fr;gap:4px}}
</style>
</head>
<body>
<div class="wrap">
  <div class="top"><b>designlang</b><span>Read in a real browser${when ? ` on ${esc(when)}` : ''} · <a href="${esc(d.meta?.url || '#')}" rel="noreferrer">${esc(host)}</a></span></div>
  <div class="hero">
    <div>
      <h1><b>${esc(host)}</b><br>design system</h1>
      <p class="sub">${esc(d.meta?.title || '')}</p>
      <p class="facts">${esc(facts)}</p>
    </div>
    <div class="brandcard"><span>primary</span><b>${esc(primary)}</b><span>${esc(fams[0] || '')}</span></div>
  </div>
  <nav class="toc" aria-label="Sections"><a href="#colours">Colours</a><a href="#type">Typography</a><a href="#space">Spacing</a><a href="#shape">Shape and depth</a><a href="#components">Components</a><a href="#a11y">Contrast</a><a href="#slop">Slop Score</a></nav>
  ${section('colours', 'Color Palette', `${(c.all || []).length} colours measured`, `<div class="roles">${roleSwatches(c)}</div>${ramp(c)}${chips(c)}`)}
  ${section('type', 'Typography', `${(d.typography?.scale || []).length} sizes`, typeSection(d))}
  ${section('space', 'Spacing', d.spacing?.base ? `${esc(d.spacing.base)}px base` : '', spacingSection(d))}
  ${section('shape', 'Shape and depth', '', shapeSection(d))}
  ${section('components', 'Components', 'Buttons as measured', componentSection(d))}
  ${section('a11y', 'Contrast', 'WCAG 2.1 AA', a11ySection(d))}
  ${section('slop', 'Slop Score', 'How generic it looks', slopSection(d))}
  <footer>Every value here was measured from the rendered page. Tokens, Tailwind, Figma and DESIGN.md files sit next to this page. Made with <a href="https://designlang.app">designlang</a>.</footer>
</div>
</body>
</html>
`;
}
