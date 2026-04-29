// designlang grade — standalone, shareable HTML "Design Report Card".
// Renders the existing scoring output as an editorial-style audit page that
// embeds the audited site's own design language (palette, type, spacing) as
// visual evidence. Self-contained: no external assets except Google Fonts.

const FONT_DISPLAY = 'Instrument Serif';
const FONT_BODY = 'Inter';
const FONT_MONO = 'JetBrains Mono';

const DIMENSIONS = [
  ['colorDiscipline',       'Color Discipline',     'Palette breadth, brand clarity, restraint.'],
  ['typographyConsistency', 'Typography',           'Family count, weight discipline, scale length.'],
  ['spacingSystem',         'Spacing System',       'Base unit fit, value count, rhythm.'],
  ['shadowConsistency',     'Elevation',            'Shadow count and tier discipline.'],
  ['radiusConsistency',     'Border Radii',         'Radius scale tightness.'],
  ['accessibility',         'Accessibility',        'WCAG contrast pass rate.'],
  ['tokenization',          'Tokenization',         'CSS variable depth.'],
  ['cssHealth',             'CSS Health',           'Unused rules, !important, duplicates.'],
];

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function gradeAccent(grade) {
  return ({ A: '#0a8a52', B: '#1f6feb', C: '#b08400', D: '#d2691e', F: '#c43d3d' })[grade] || '#1f1f1f';
}

function describeScore(n) {
  if (n >= 90) return 'Exemplary';
  if (n >= 80) return 'Strong';
  if (n >= 70) return 'Adequate';
  if (n >= 60) return 'Below standard';
  return 'Needs work';
}

function arcGauge(value, accent) {
  const v = Math.max(0, Math.min(100, value));
  const r = 36;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - v / 100);
  return `
    <svg viewBox="0 0 88 88" class="gauge" aria-hidden="true">
      <circle cx="44" cy="44" r="${r}" class="gauge-track" fill="none" stroke-width="4"/>
      <circle cx="44" cy="44" r="${r}" class="gauge-fill" fill="none" stroke-width="4"
              stroke="${accent}" stroke-linecap="round"
              stroke-dasharray="${c.toFixed(2)}"
              stroke-dashoffset="${offset.toFixed(2)}"
              transform="rotate(-90 44 44)"/>
    </svg>`;
}

function colorSwatches(design) {
  const all = (design.colors?.all || []).slice(0, 18);
  if (!all.length) return '';
  return all.map(c => {
    const hex = esc(c.hex || c);
    return `<li class="swatch" style="--c:${hex}"><span class="swatch-chip"></span><code>${hex}</code></li>`;
  }).join('');
}

function typeSpecimen(design) {
  const families = (design.typography?.families || []).slice(0, 2).map(familyName).filter(Boolean);
  const sizeOf = s => typeof s === 'number' ? s : (s?.size ?? 0);
  const allScale = (design.typography?.scale || []).map(sizeOf).filter(n => n > 0).sort((a, b) => b - a);
  const scale = allScale.slice(0, 5);
  if (!families.length) return '';
  const head = families[0];
  const weights = (design.typography?.weights || []).map(w => typeof w === 'object' ? (w.value || w.weight) : w).filter(Boolean);
  return `
    <div class="specimen" style="font-family: ${esc(head)}, ${FONT_DISPLAY}, serif">
      ${scale.map((s, i) => {
        const lines = [
          'The quiet authority of restraint.',
          'How the page reads at rest.',
          'Form follows feeling.',
          'Calm hierarchy is a craft.',
          'Notes from the audit.',
        ];
        return `<div class="spec-line" style="font-size:${Math.min(s, 72)}px">${lines[i] || lines[0]}</div>`;
      }).join('')}
    </div>
    <div class="specimen-meta">
      <span>Families · ${families.map(esc).join(' / ')}</span>
      <span>Scale · ${(design.typography?.scale || []).length} sizes</span>
      <span>Weights · ${weights.join(', ') || '—'}</span>
    </div>`;
}

function spacingScale(design) {
  const raw = (design.spacing?.scale || []).map(v => typeof v === 'number' ? v : (v?.value ?? v?.size ?? 0)).filter(n => n > 0);
  const scale = raw.slice().sort((a, b) => a - b).slice(0, 10);
  if (!scale.length) return '';
  return scale.map(v => `<div class="rhythm-bar" style="width:${Math.min(v * 1.6, 220)}px"><span>${v}</span></div>`).join('');
}

function familyName(f) {
  if (!f) return '';
  if (typeof f === 'string') return f;
  return f.name || f.family || '';
}

function fontHref(family) {
  const name = familyName(family);
  if (!name) return '';
  const f = name.replace(/['"]/g, '').split(',')[0].trim();
  if (!f) return '';
  return `https://fonts.googleapis.com/css2?family=${encodeURIComponent(f).replace(/%20/g, '+')}:wght@400;500;700&display=swap`;
}

export function formatGrade(design, opts = {}) {
  const s = design.score;
  if (!s) throw new Error('grade: design.score missing — extract failed to score');

  const accent = gradeAccent(s.grade);
  const headFamily = (design.typography?.families || [])[0];
  const headHref = fontHref(headFamily);
  const url = design.meta?.url || '';
  const title = design.meta?.title || url;
  const host = (() => { try { return new URL(url).hostname; } catch { return url; } })();
  const date = new Date(design.meta?.timestamp || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const issues = s.issues || [];
  const strengths = s.strengths || [];
  const ogTitle = `${host} — Grade ${s.grade}`;
  const ogDesc = `Design system audit by designlang. ${s.overall}/100 across 8 dimensions.`;

  const dims = DIMENSIONS
    .filter(([k]) => s.scores[k] !== undefined)
    .map(([k, label, blurb]) => {
      const score = Math.round(s.scores[k]);
      const dimAccent = score >= 80 ? '#0a8a52' : score >= 60 ? '#b08400' : '#c43d3d';
      return `
        <article class="dim">
          <div class="dim-gauge">${arcGauge(score, dimAccent)}<span class="dim-score">${score}</span></div>
          <div class="dim-body">
            <h3>${esc(label)}</h3>
            <p class="dim-blurb">${esc(blurb)}</p>
            <p class="dim-verdict" style="color:${dimAccent}">${describeScore(score)}</p>
          </div>
        </article>`;
    }).join('');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(ogTitle)} · designlang</title>
<meta name="description" content="${esc(ogDesc)}">
<meta property="og:title" content="${esc(ogTitle)}">
<meta property="og:description" content="${esc(ogDesc)}">
<meta property="og:type" content="article">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(FONT_DISPLAY)}&family=${encodeURIComponent(FONT_BODY)}:wght@400;500;600&family=${encodeURIComponent(FONT_MONO)}:wght@400;500&display=swap" rel="stylesheet">
${headHref ? `<link href="${esc(headHref)}" rel="stylesheet">` : ''}
<style>
  :root {
    --paper: #f7f5ef;
    --ink: #141414;
    --ink-soft: #555049;
    --rule: #e5e1d6;
    --accent: ${accent};
    --display: '${FONT_DISPLAY}', 'Times New Roman', serif;
    --body: '${FONT_BODY}', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
    --mono: '${FONT_MONO}', ui-monospace, 'SF Mono', monospace;
  }
  [data-theme="dark"] {
    --paper: #0e0d0b;
    --ink: #f0ece2;
    --ink-soft: #9b9589;
    --rule: #2a2823;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    background: var(--paper);
    color: var(--ink);
    font-family: var(--body);
    font-size: 16px;
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background .25s ease, color .25s ease;
  }
  .wrap { max-width: 920px; margin: 0 auto; padding: 56px 40px 96px; }
  @media (max-width: 640px) { .wrap { padding: 32px 22px 64px; } }

  /* — Top bar — */
  .topbar { display:flex; justify-content:space-between; align-items:center; margin-bottom: 72px; font-size: 13px; }
  .brand { font-family: var(--display); font-size: 22px; letter-spacing: .01em; }
  .brand a { color: var(--ink); text-decoration: none; border-bottom: 1px solid var(--rule); padding-bottom: 1px; }
  .topbar nav { display:flex; gap: 18px; align-items: center; color: var(--ink-soft); }
  .theme-btn {
    background: transparent; border: 1px solid var(--rule); color: var(--ink-soft);
    font-family: var(--body); font-size: 12px; padding: 6px 12px; border-radius: 999px; cursor: pointer;
    letter-spacing: .04em; text-transform: uppercase;
  }
  .theme-btn:hover { color: var(--ink); border-color: var(--ink); }

  /* — Hero — */
  .hero { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 32px; align-items: end; padding-bottom: 56px; border-bottom: 1px solid var(--rule); }
  .kicker { text-transform: uppercase; letter-spacing: .18em; font-size: 11px; color: var(--ink-soft); margin-bottom: 18px; }
  .hero h1 { font-family: var(--display); font-weight: 400; font-size: clamp(40px, 6vw, 72px); line-height: 1.02; margin: 0 0 18px; letter-spacing: -.01em; }
  .hero h1 em { font-style: italic; color: var(--accent); }
  .hero h1 a { color: var(--ink); text-decoration: none; border-bottom: 2px solid var(--accent); padding-bottom: 2px; transition: color .15s; }
  .hero h1 a:hover { color: var(--accent); }
  .hero .subject { font-size: 15px; color: var(--ink-soft); margin: 0; }
  .hero .subject a { color: var(--ink); text-decoration: none; border-bottom: 1px solid var(--rule); }
  .hero .meta { display:flex; gap: 18px; margin-top: 22px; font-size: 12px; color: var(--ink-soft); font-family: var(--mono); text-transform: uppercase; letter-spacing: .08em; }
  .grade-block { text-align: center; }
  .grade-letter {
    font-family: var(--display); font-size: clamp(180px, 26vw, 280px); line-height: .82; color: var(--accent);
    font-weight: 400; letter-spacing: -.04em; margin: 0;
    animation: gradeIn .9s cubic-bezier(.2,.8,.2,1);
  }
  .grade-score { font-family: var(--mono); font-size: 14px; color: var(--ink-soft); letter-spacing: .04em; margin-top: 8px; }
  @keyframes gradeIn { from { opacity: 0; transform: translateY(12px) scale(.96); } to { opacity: 1; transform: none; } }
  @media (max-width: 640px) { .hero { grid-template-columns: 1fr; gap: 0; } .grade-block { text-align: left; margin-top: 24px; } }

  /* — Section frame — */
  section { padding: 64px 0; border-bottom: 1px solid var(--rule); }
  section:last-of-type { border-bottom: 0; }
  section > h2 { font-family: var(--display); font-weight: 400; font-size: 32px; margin: 0 0 8px; letter-spacing: -.005em; }
  section > h2 + .lead { color: var(--ink-soft); margin: 0 0 36px; max-width: 60ch; }

  /* — Dimensions grid — */
  .dims { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 32px 48px; }
  @media (max-width: 640px) { .dims { grid-template-columns: 1fr; gap: 28px; } }
  .dim { display: grid; grid-template-columns: 88px 1fr; gap: 18px; align-items: start; }
  .dim-gauge { position: relative; width: 88px; height: 88px; }
  .gauge { width: 100%; height: 100%; }
  .gauge-track { stroke: var(--rule); }
  .gauge-fill { stroke-dasharray: var(--c, 226); animation: arc 1.1s cubic-bezier(.2,.8,.2,1) both; }
  @keyframes arc { from { stroke-dashoffset: 226; } }
  .dim-score { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-family: var(--mono); font-weight: 500; font-size: 18px; }
  .dim h3 { font-family: var(--display); font-weight: 400; font-size: 22px; margin: 4px 0 6px; }
  .dim-blurb { color: var(--ink-soft); font-size: 14px; margin: 0 0 8px; }
  .dim-verdict { font-size: 12px; font-family: var(--mono); text-transform: uppercase; letter-spacing: .08em; margin: 0; }

  /* — Lists — */
  .ledger { display: grid; grid-template-columns: repeat(2, 1fr); gap: 48px; }
  @media (max-width: 640px) { .ledger { grid-template-columns: 1fr; gap: 36px; } }
  .ledger h3 { font-family: var(--display); font-weight: 400; font-size: 22px; margin: 0 0 16px; }
  .ledger ul { list-style: none; padding: 0; margin: 0; }
  .ledger li { padding: 14px 0; border-top: 1px solid var(--rule); display: flex; gap: 14px; align-items: baseline; }
  .ledger li:last-child { border-bottom: 1px solid var(--rule); }
  .ledger .marker { font-family: var(--mono); font-size: 11px; color: var(--ink-soft); flex: 0 0 24px; padding-top: 2px; letter-spacing: .04em; }
  .ledger li p { margin: 0; font-size: 15px; line-height: 1.5; }
  .ledger.empty p { color: var(--ink-soft); font-style: italic; font-family: var(--display); font-size: 16px; }

  /* — Evidence — */
  .swatches { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 10px; }
  .swatch { display: flex; align-items: center; gap: 8px; padding: 6px 10px 6px 6px; background: rgba(0,0,0,.02); border: 1px solid var(--rule); border-radius: 6px; }
  [data-theme="dark"] .swatch { background: rgba(255,255,255,.03); }
  .swatch-chip { width: 22px; height: 22px; border-radius: 4px; background: var(--c); box-shadow: inset 0 0 0 1px rgba(0,0,0,.06); flex: 0 0 auto; }
  .swatch code { font-family: var(--mono); font-size: 11px; color: var(--ink-soft); }

  .specimen { padding: 24px 0; }
  .spec-line { line-height: 1.05; margin: 0 0 14px; letter-spacing: -.01em; }
  .spec-line:nth-child(2) { color: var(--ink-soft); font-style: italic; }
  .specimen-meta { display: flex; flex-wrap: wrap; gap: 24px; font-family: var(--mono); font-size: 11px; color: var(--ink-soft); text-transform: uppercase; letter-spacing: .06em; padding-top: 18px; border-top: 1px solid var(--rule); }

  .rhythm { display: flex; flex-direction: column; gap: 6px; padding: 12px 0; }
  .rhythm-bar { height: 14px; background: var(--accent); opacity: .82; border-radius: 2px; display: flex; align-items: center; padding-left: 10px; transition: opacity .15s; }
  .rhythm-bar span { font-family: var(--mono); font-size: 10px; color: var(--paper); mix-blend-mode: difference; filter: invert(1); }
  .rhythm-bar:hover { opacity: 1; }

  /* — Footer — */
  footer { padding: 48px 0 0; font-size: 13px; color: var(--ink-soft); display: flex; justify-content: space-between; align-items: end; flex-wrap: wrap; gap: 16px; }
  footer .sig { font-family: var(--display); font-size: 22px; color: var(--ink); }
  footer a { color: var(--ink); text-decoration: none; border-bottom: 1px solid var(--rule); }
  footer .stamp { font-family: var(--mono); font-size: 11px; text-transform: uppercase; letter-spacing: .08em; }

  /* — Print — */
  @media print {
    body { background: white; color: black; }
    .topbar nav, .theme-btn { display: none; }
    section, .hero { page-break-inside: avoid; border-color: #ddd; }
    .grade-letter { color: black; }
  }
</style>
</head>
<body>
  <div class="wrap">
    <header class="topbar">
      <div class="brand"><a href="https://designlang.dev">designlang</a></div>
      <nav>
        <span>Report Card</span>
        <button class="theme-btn" id="themeBtn" type="button">Theme</button>
      </nav>
    </header>

    <div class="hero">
      <div>
        <p class="kicker">Design Audit · ${esc(date)}</p>
        <h1>An <em>independent reading</em> of the design system at <a href="${esc(url)}" target="_blank" rel="noopener">${esc(host)}</a>.</h1>
        <p class="subject">${esc(title)}</p>
        <div class="meta">
          <span>${(design.colors?.all || []).length} colors</span>
          <span>${(design.typography?.scale || []).length} sizes</span>
          <span>${(design.spacing?.scale || []).length} spacings</span>
          <span>${(design.shadows?.values || []).length} shadows</span>
        </div>
      </div>
      <div class="grade-block">
        <div class="grade-letter">${esc(s.grade)}</div>
        <div class="grade-score">${s.overall} / 100</div>
      </div>
    </div>

    <section>
      <h2>Eight dimensions, scored.</h2>
      <p class="lead">Each dimension is graded against calibrated thresholds drawn from production design systems (Stripe, Linear, Vercel, GitHub, Apple). The number is the headline; the prose underneath is what to do next.</p>
      <div class="dims">${dims}</div>
    </section>

    <section>
      <h2>What's working. What to fix.</h2>
      <div class="ledger">
        <div class="${strengths.length ? '' : 'empty'}">
          <h3>Strengths</h3>
          ${strengths.length
            ? `<ul>${strengths.map((str, i) => `<li><span class="marker">${String(i + 1).padStart(2, '0')}</span><p>${esc(str)}</p></li>`).join('')}</ul>`
            : `<p>No standout strengths surfaced — the system is uniformly mid-tier.</p>`}
        </div>
        <div class="${issues.length ? '' : 'empty'}">
          <h3>What to fix</h3>
          ${issues.length
            ? `<ul>${issues.map((iss, i) => `<li><span class="marker">${String(i + 1).padStart(2, '0')}</span><p>${esc(iss)}</p></li>`).join('')}</ul>`
            : `<p>Nothing material flagged. Polish, then ship.</p>`}
        </div>
      </div>
    </section>

    <section>
      <h2>Evidence.</h2>
      <p class="lead">The audit reads from the page itself. Here is what the auditor saw — palette, type, rhythm — drawn straight from the live styles.</p>

      <h3 style="font-family:var(--display);font-weight:400;font-size:18px;margin:24px 0 12px;color:var(--ink-soft)">Palette</h3>
      <ul class="swatches">${colorSwatches(design)}</ul>

      <h3 style="font-family:var(--display);font-weight:400;font-size:18px;margin:32px 0 0;color:var(--ink-soft)">Type</h3>
      ${typeSpecimen(design)}

      <h3 style="font-family:var(--display);font-weight:400;font-size:18px;margin:32px 0 0;color:var(--ink-soft)">Spacing rhythm</h3>
      <div class="rhythm">${spacingScale(design)}</div>
    </section>

    <footer>
      <div>
        <div class="sig">designlang</div>
        <div>Audit any site: <code style="font-family:var(--mono)">npx designlang grade ${esc(host)}</code></div>
      </div>
      <div class="stamp">${esc(date)} · v${esc(opts.version || '')}</div>
    </footer>
  </div>

  <script>
    (function () {
      var btn = document.getElementById('themeBtn');
      var saved = null;
      try { saved = localStorage.getItem('dl-theme'); } catch (e) {}
      if (saved) document.documentElement.setAttribute('data-theme', saved);
      btn && btn.addEventListener('click', function () {
        var cur = document.documentElement.getAttribute('data-theme') === 'dark' ? '' : 'dark';
        if (cur) document.documentElement.setAttribute('data-theme', cur);
        else document.documentElement.removeAttribute('data-theme');
        try { localStorage.setItem('dl-theme', cur); } catch (e) {}
      });
    })();
  </script>
</body>
</html>`;
}

export function formatGradeMarkdown(design) {
  const s = design.score;
  if (!s) throw new Error('grade: design.score missing');
  const url = design.meta?.url || '';
  const date = new Date(design.meta?.timestamp || Date.now()).toISOString().split('T')[0];
  const lines = [
    `# Design Report Card — ${url}`,
    ``,
    `**Grade ${s.grade}** · ${s.overall}/100 · _${date}_`,
    ``,
    `## Dimensions`,
    ``,
    `| Dimension | Score | Verdict |`,
    `|---|---|---|`,
    ...DIMENSIONS.filter(([k]) => s.scores[k] !== undefined).map(([k, label]) =>
      `| ${label} | ${Math.round(s.scores[k])}/100 | ${describeScore(s.scores[k])} |`),
    ``,
  ];
  if (s.strengths?.length) {
    lines.push(`## Strengths`, ``, ...s.strengths.map(x => `- ${x}`), ``);
  }
  if (s.issues?.length) {
    lines.push(`## What to fix`, ``, ...s.issues.map(x => `- ${x}`), ``);
  }
  lines.push(`---`, `_Audited by [designlang](https://designlang.dev) · \`npx designlang grade ${url}\`_`);
  return lines.join('\n');
}
