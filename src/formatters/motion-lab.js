// Motion Lab emitter — `<host>-motion.html`.
//
// A self-contained, dependency-free interactive page that brings the
// extracted motion to life: every easing curve drawn as a Bézier path
// with a dot riding it, every duration shown as a racing bar, every
// @keyframes animation replayed on loop. Open it in any browser.
//
// This is "motionlang" — motion treated as a first-class shippable
// artefact, not a flat JSON nobody opens.

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

// Parse `cubic-bezier(x1, y1, x2, y2)` → [x1,y1,x2,y2]. Named easings
// map to their well-known control points.
const NAMED = {
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1],
  'ease-in': [0.42, 0, 1, 1],
  'ease-out': [0, 0, 0.58, 1],
  'ease-in-out': [0.42, 0, 0.58, 1],
};
function bezierPoints(raw) {
  if (!raw) return null;
  const s = String(raw).trim();
  if (NAMED[s]) return NAMED[s];
  const m = s.match(/cubic-bezier\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/i);
  if (m) return [parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3]), parseFloat(m[4])];
  return null;
}

// SVG path for a cubic-bezier curve drawn in a 0..1 box (y inverted).
function curvePath(pts, size) {
  const [x1, y1, x2, y2] = pts;
  const px = (v) => (v * size).toFixed(2);
  const py = (v) => ((1 - v) * size).toFixed(2);
  return `M ${px(0)} ${py(0)} C ${px(x1)} ${py(y1)}, ${px(x2)} ${py(y2)}, ${px(1)} ${py(1)}`;
}

export function formatMotionLab(design) {
  const host = (() => { try { return new URL(design?.meta?.url).hostname.replace(/^www\./, ''); } catch { return 'site'; } })();
  const durations = Array.isArray(design?.motion?.durations) ? design.motion.durations : [];
  const easings   = Array.isArray(design?.motion?.easings)   ? design.motion.easings   : [];
  const keyframes = Array.isArray(design?.motion?.keyframes) ? design.motion.keyframes : [];

  const SIZE = 160;

  const easingCards = easings.map((e, i) => {
    const raw = e.raw || e.value || e;
    const pts = bezierPoints(raw);
    const path = pts ? curvePath(pts, SIZE) : null;
    const name = e.family && e.family !== 'custom' ? e.family : `easing-${i + 1}`;
    return `
    <article class="ml-card">
      <div class="ml-card-head">
        <span class="ml-name">${esc(name)}</span>
        ${e.count ? `<span class="ml-count">${e.count}×</span>` : ''}
      </div>
      ${path ? `
      <svg class="ml-curve" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}">
        <line x1="0" y1="${SIZE}" x2="${SIZE}" y2="0" class="ml-curve-guide"/>
        <path d="${path}" class="ml-curve-path"/>
      </svg>` : `<div class="ml-curve ml-curve-none">non-bezier</div>`}
      <code class="ml-raw">${esc(raw)}</code>
      <div class="ml-demo">
        <span class="ml-dot" style="animation-timing-function: ${esc(raw)};"></span>
      </div>
    </article>`;
  }).join('');

  const durationRows = durations.map((d) => {
    const ms = d.ms || parseInt(d.css || d.value || d, 10) || 0;
    const pct = Math.min(100, (ms / 1000) * 100);
    return `
    <div class="ml-dur">
      <span class="ml-dur-name">${esc(d.name || `${ms}ms`)}</span>
      <span class="ml-dur-track"><span class="ml-dur-fill" style="--ms:${ms}ms; width:${pct}%"></span></span>
      <span class="ml-dur-ms">${ms}ms</span>
    </div>`;
  }).join('');

  const keyframeBlocks = keyframes.slice(0, 12).map((k, i) => {
    const name = k.name || `keyframes-${i + 1}`;
    const css = k.css || k.raw || '';
    return `
    <article class="ml-kf">
      <div class="ml-card-head"><span class="ml-name">@keyframes ${esc(name)}</span></div>
      <pre class="ml-kf-css">${esc(css).slice(0, 600)}</pre>
    </article>`;
  }).join('');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(host)} — motion lab · designlang</title>
<style>
  :root {
    --bg: #0a0a0c; --fg: #f4f4f5; --fg-2: rgba(244,244,245,.62); --fg-3: rgba(244,244,245,.4);
    --line: rgba(255,255,255,.08); --accent: #ef4444;
    --mono: ui-monospace, 'SF Mono', Menlo, monospace;
    --sans: -apple-system, 'Segoe UI', system-ui, sans-serif;
  }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--bg); color: var(--fg); font-family: var(--sans); }
  .ml-wrap { max-width: 1080px; margin: 0 auto; padding: 56px 24px 96px; }
  header.ml-h { margin-bottom: 48px; }
  .ml-eyebrow { font-family: var(--mono); font-size: 11px; letter-spacing: .18em;
    text-transform: uppercase; color: var(--fg-3); margin: 0 0 12px; }
  h1.ml-title { font-size: clamp(34px, 6vw, 60px); letter-spacing: -.03em; margin: 0 0 12px; font-weight: 600; }
  .ml-sub { color: var(--fg-2); font-size: 16px; max-width: 60ch; margin: 0; }
  h2.ml-section { font-size: 22px; letter-spacing: -.01em; margin: 56px 0 20px; font-weight: 600; }
  .ml-section-meta { font-family: var(--mono); font-size: 12px; color: var(--fg-3); margin-left: 8px; font-weight: 400; }

  .ml-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
  .ml-card { border: 1px solid var(--line); border-radius: 14px; padding: 18px; background: rgba(255,255,255,.02); }
  .ml-card-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 12px; }
  .ml-name { font-family: var(--mono); font-size: 13px; color: var(--fg); }
  .ml-count { font-family: var(--mono); font-size: 11px; color: var(--fg-3); }
  .ml-curve { display: block; margin: 0 auto 12px; }
  .ml-curve-guide { stroke: var(--line); stroke-width: 1; stroke-dasharray: 3 3; }
  .ml-curve-path { fill: none; stroke: var(--accent); stroke-width: 2.5; stroke-linecap: round; }
  .ml-curve-none { height: 160px; display: flex; align-items: center; justify-content: center;
    color: var(--fg-3); font-family: var(--mono); font-size: 12px; }
  .ml-raw { display: block; font-family: var(--mono); font-size: 10.5px; color: var(--fg-3);
    word-break: break-all; margin-bottom: 14px; }
  .ml-demo { height: 8px; border-radius: 999px; background: rgba(255,255,255,.05); position: relative; }
  .ml-dot { position: absolute; top: 50%; left: 0; width: 14px; height: 14px; border-radius: 50%;
    background: var(--accent); transform: translate(0,-50%);
    animation: ml-ride 1.6s infinite alternate; box-shadow: 0 0 12px rgba(239,68,68,.6); }
  @keyframes ml-ride { from { left: 0; } to { left: calc(100% - 14px); } }

  .ml-durs { display: flex; flex-direction: column; gap: 10px; }
  .ml-dur { display: grid; grid-template-columns: 90px 1fr 64px; gap: 14px; align-items: center; }
  .ml-dur-name { font-family: var(--mono); font-size: 12px; color: var(--fg-2); }
  .ml-dur-track { height: 8px; border-radius: 999px; background: rgba(255,255,255,.05); overflow: hidden; }
  .ml-dur-fill { display: block; height: 100%; background: var(--accent); border-radius: 999px;
    transform-origin: left; animation: ml-pulse var(--ms) ease-in-out infinite alternate; }
  @keyframes ml-pulse { from { opacity: .35; } to { opacity: 1; } }
  .ml-dur-ms { font-family: var(--mono); font-size: 12px; color: var(--fg-3); text-align: right; }

  .ml-kf { border: 1px solid var(--line); border-radius: 14px; padding: 18px; background: rgba(255,255,255,.02); margin-bottom: 14px; }
  .ml-kf-css { font-family: var(--mono); font-size: 11px; color: var(--fg-2); overflow-x: auto; margin: 0; }

  .ml-empty { color: var(--fg-3); font-family: var(--mono); font-size: 13px;
    border: 1px dashed var(--line); border-radius: 12px; padding: 28px; text-align: center; }
  footer.ml-f { margin-top: 72px; padding-top: 24px; border-top: 1px solid var(--line);
    font-family: var(--mono); font-size: 11px; color: var(--fg-3); }
  footer.ml-f a { color: var(--accent); }
  @media (prefers-reduced-motion: reduce) { .ml-dot, .ml-dur-fill { animation: none; } }
</style>
</head>
<body>
<div class="ml-wrap">
  <header class="ml-h">
    <p class="ml-eyebrow">motionlang · motion lab</p>
    <h1 class="ml-title">${esc(host)} in motion</h1>
    <p class="ml-sub">Every easing curve, duration and keyframe animation designlang read off the live ${esc(host)} page — drawn, timed and replayed. Generated ${new Date().toISOString().slice(0, 10)}.</p>
  </header>

  <h2 class="ml-section">Easing curves <span class="ml-section-meta">${easings.length}</span></h2>
  ${easings.length ? `<div class="ml-grid">${easingCards}</div>` : '<div class="ml-empty">No easing curves detected. Re-run with --interactions to capture hover transitions.</div>'}

  <h2 class="ml-section">Durations <span class="ml-section-meta">${durations.length}</span></h2>
  ${durations.length ? `<div class="ml-durs">${durationRows}</div>` : '<div class="ml-empty">No durations detected.</div>'}

  <h2 class="ml-section">Keyframe animations <span class="ml-section-meta">${keyframes.length}</span></h2>
  ${keyframes.length ? keyframeBlocks : '<div class="ml-empty">No @keyframes animations detected on this page.</div>'}

  <footer class="ml-f">
    Generated by designlang · motionlang · <a href="https://designlang.app">designlang.app</a> · re-extract with <code>npx designlang ${esc(host)} --motion</code>
  </footer>
</div>
</body>
</html>`;
}
