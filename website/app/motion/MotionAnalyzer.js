'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// ─── Bézier helpers (shared shape with gallery MotionLab) ───
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
  return m ? [parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3]), parseFloat(m[4])] : null;
}
const SIZE = 120;
function curvePath(pts) {
  const [x1, y1, x2, y2] = pts;
  const px = (v) => (v * SIZE).toFixed(2);
  const py = (v) => ((1 - v) * SIZE).toFixed(2);
  return `M ${px(0)} ${py(0)} C ${px(x1)} ${py(y1)}, ${px(x2)} ${py(y2)}, ${px(1)} ${py(1)}`;
}

// ─── Keyframe sanitiser — extracted CSS is untrusted, so we rebuild a
// scoped @keyframes from only `prop: value` pairs and %/from/to offsets.
// This kills any `}`/`@` breakout before it reaches our <style>. ───
function safeOffset(o) {
  const s = String(o).trim();
  if (s === 'from') return '0%';
  if (s === 'to') return '100%';
  return /^\d{1,3}%$/.test(s) ? s : null;
}
function safeDecls(style) {
  return String(style || '')
    .split(';')
    .map((d) => d.trim())
    .filter(Boolean)
    .map((d) => {
      const i = d.indexOf(':');
      if (i < 0) return null;
      const prop = d.slice(0, i).trim();
      const val = d.slice(i + 1).trim();
      if (!/^-?[a-z][a-z-]*$/i.test(prop)) return null;
      if (/[{}@<>;]/.test(val) || val.length > 200) return null;
      return `${prop}: ${val}`;
    })
    .filter(Boolean)
    .join('; ');
}
function keyframeCss(kf, animName) {
  const blocks = (kf.steps || [])
    .map((s) => {
      const off = safeOffset(s.offset);
      const decls = safeDecls(s.style);
      return off && decls ? `${off} { ${decls} }` : null;
    })
    .filter(Boolean);
  return blocks.length ? `@keyframes ${animName} { ${blocks.join(' ')} }` : null;
}

const SUGGESTIONS = ['stripe.com', 'linear.app', 'vercel.com', 'framer.com', 'apple.com'];

const FEEL_COPY = {
  springy: 'Overshoot curves and bounce — motion that feels physical and alive.',
  responsive: 'Ease-out dominant — quick to start, settling gently. Feels snappy and direct.',
  smooth: 'Ease-in-out dominant — symmetric, calm, deliberate transitions.',
  mechanical: 'Linear dominant — constant-velocity motion. Precise, utilitarian, no easing.',
  mixed: 'A blend of easing families — no single motion personality dominates.',
  unknown: 'Not enough motion detected to fingerprint a feel.',
};

export default function MotionAnalyzer() {
  const [status, setStatus] = useState('idle'); // idle | loading | done | error
  const [data, setData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [playing, setPlaying] = useState(true);
  const [copied, setCopied] = useState(null);
  const inputRef = useRef(null);

  // Deep-link / handoff: ?url= prefills and auto-runs once.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const incoming = new URLSearchParams(window.location.search).get('url');
    if (incoming && inputRef.current) {
      inputRef.current.value = incoming.replace(/^https?:\/\//, '');
      run(incoming);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const run = useCallback(async (rawUrl) => {
    const value = (rawUrl ?? inputRef.current?.value ?? '').trim();
    if (!value || status === 'loading') return;
    const url = /^https?:\/\//.test(value) ? value : `https://${value}`;
    setStatus('loading'); setErrorMsg(null); setData(null);
    try {
      const res = await fetch('/api/motion', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        setErrorMsg(json?.error || `Failed (${res.status})`);
        setStatus('error');
        return;
      }
      if (!json?.motion) {
        setErrorMsg('No motion data returned for this site.');
        setStatus('error');
        return;
      }
      setData(json);
      setStatus('done');
    } catch {
      setErrorMsg('Network error — check your connection.');
      setStatus('error');
    }
  }, [status]);

  const onSubmit = (e) => { e.preventDefault(); run(); };
  const setUrl = (h) => { if (inputRef.current) inputRef.current.value = h; };

  const copy = useCallback(async (key, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied((c) => (c === key ? null : c)), 1500);
    } catch { /* noop */ }
  }, []);

  const download = useCallback((filename, text) => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const u = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = u; a.download = filename; a.click();
    setTimeout(() => URL.revokeObjectURL(u), 1000);
  }, []);

  const motion = data?.motion;
  const primary = data?.primary || '#ef4444';
  const host = (() => { try { return new URL(data?.url || '').hostname.replace(/^www\./, ''); } catch { return ''; } })();

  // Stable animation names for the keyframe demos.
  const keyframeStyles = useMemo(() => {
    if (!motion?.keyframes) return [];
    return motion.keyframes.map((kf, i) => ({
      kf,
      animName: `mlk-${i}`,
      css: keyframeCss(kf, `mlk-${i}`),
    }));
  }, [motion]);

  const easingsSorted = useMemo(
    () => (motion?.easings ? [...motion.easings].sort((a, b) => (b.count || 0) - (a.count || 0)) : []),
    [motion],
  );

  const maxPropCount = Math.max(1, ...(motion?.transitionedProperties || []).map((p) => p.count));
  const playState = playing ? 'running' : 'paused';

  return (
    <main className="page mp">
      <section className="mp-hero">
        <div className="section-label"><span>§ motionlang — motion language analyzer</span></div>
        <h1 className="display mp-title">
          See how a website <em>moves</em>.
        </h1>
        <p className="mp-sub">
          Paste a URL. We extract its motion language — easing curves, durations, springs,
          keyframes, scroll-linked animation — and bring every piece to life.
        </p>

        <form className="dx-form mp-form" onSubmit={onSubmit}>
          <span className="dx-form-prefix">https://</span>
          <label htmlFor="mp-url" className="visually-hidden">URL</label>
          <input
            id="mp-url" ref={inputRef} name="url" type="text"
            placeholder="stripe.com" defaultValue="stripe.com"
            disabled={status === 'loading'} className="dx-form-input"
            spellCheck={false} autoComplete="off" autoCapitalize="off"
          />
          <button type="submit" className="dx-form-submit" disabled={status === 'loading'} aria-busy={status === 'loading'}>
            {status === 'loading' ? (<><span className="dx-spinner" aria-hidden /><span>Reading motion…</span></>) : (<><span>Analyze</span><span className="dx-form-kbd">↵</span></>)}
          </button>
        </form>

        <div className="dx-suggest">
          <span className="dx-suggest-label">try</span>
          {SUGGESTIONS.map((s) => (
            <button key={s} type="button" className="dx-chip" disabled={status === 'loading'} onClick={() => setUrl(s)}>{s}</button>
          ))}
        </div>

        {errorMsg && (
          <p className="dx-alert mono" role="alert">
            {errorMsg}
            <button type="button" className="dx-alert-action" onClick={() => { setStatus('idle'); setErrorMsg(null); }}>dismiss</button>
          </p>
        )}
      </section>

      {status === 'done' && motion && (
        <section className="mp-result">
          {/* ── Feel fingerprint + headline stats ── */}
          <div className="mp-feel">
            <div className="mp-feel-main">
              <span className="mp-feel-tag mono">motion feel</span>
              <div className="mp-feel-word" style={{ color: primary }}>{motion.feel || 'unknown'}</div>
              <p className="mp-feel-copy">{FEEL_COPY[motion.feel] || FEEL_COPY.unknown}</p>
              <p className="mono mp-feel-host">
                {host}{data.cached ? ' · cached' : ''} · {motion.scrollLinked?.present ? 'scroll-linked motion present' : 'no scroll-linked motion'}
              </p>
            </div>
            <div className="mp-stats">
              <Stat n={motion.easings?.length ?? 0} label="easings" />
              <Stat n={motion.durations?.length ?? 0} label="durations" />
              <Stat n={motion.springs?.length ?? 0} label="springs" />
              <Stat n={motion.stats?.keyframeCount ?? 0} label="keyframes" />
              <Stat n={motion.stats?.animatingElements ?? 0} label="animated els" />
              <Stat n={motion.stats?.transitionCount ?? 0} label="transitions" />
            </div>
          </div>

          <div className="mp-controls">
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setPlaying((p) => !p)}>
              {playing ? '⏸ Pause motion' : '▶ Play motion'}
            </button>
            <span className="mono mp-controls-note">all timings below are the site’s real values</span>
          </div>

          {/* ── Easing curves ── */}
          {easingsSorted.length > 0 && (
            <Block title="Easing curves" count={easingsSorted.length}>
              <div className="mp-curves">
                {easingsSorted.map((e, i) => {
                  const pts = bezierPoints(e.raw);
                  return (
                    <article key={i} className={`mp-curve ${e.family === 'spring' ? 'is-spring' : ''}`}>
                      <header className="mp-curve-head">
                        <span className="mono">{e.family}{e.overshoot ? ' ⤴' : ''}</span>
                        {e.count ? <span className="mono mp-curve-count">{e.count}×</span> : null}
                      </header>
                      {pts ? (
                        <svg className="mp-curve-svg" viewBox={`0 0 ${SIZE} ${SIZE}`} width={SIZE} height={SIZE} aria-hidden>
                          <line x1="0" y1={SIZE} x2={SIZE} y2="0" className="mp-guide" />
                          <path d={curvePath(pts)} className="mp-path" style={{ stroke: primary }} />
                        </svg>
                      ) : <div className="mp-curve-svg mp-none mono">non-bézier</div>}
                      <div className="mp-track">
                        <span className="mp-dot" style={{ background: primary, animationTimingFunction: e.raw, animationPlayState: playState }} />
                      </div>
                      <code className="mp-raw">{e.raw}</code>
                    </article>
                  );
                })}
              </div>
            </Block>
          )}

          {/* ── Durations ── */}
          {motion.durations?.length > 0 && (
            <Block title="Duration scale" count={motion.durations.length}>
              <div className="mp-durs">
                {motion.durations.map((d, i) => (
                  <div key={i} className="mp-dur">
                    <span className="mono mp-dur-name">{d.name}</span>
                    <span className="mp-dur-track">
                      <span className="mp-dur-fill" style={{ background: primary, animationDuration: `${d.ms}ms`, animationPlayState: playState }} />
                    </span>
                    <span className="mono mp-dur-ms">{d.css}</span>
                  </div>
                ))}
              </div>
            </Block>
          )}

          {/* ── Keyframes (live replay) ── */}
          {keyframeStyles.length > 0 && (
            <Block title="Keyframe animations" count={keyframeStyles.length}>
              <div className="mp-kfs">
                {keyframeStyles.map(({ kf, animName, css }, i) => (
                  <article key={i} className="mp-kf">
                    {css && <style>{css}</style>}
                    <div className="mp-kf-stage">
                      <span
                        className="mp-kf-box"
                        style={css ? { background: primary, animation: `${animName} 1.8s both`, animationIterationCount: 'infinite', animationPlayState: playState } : { background: primary }}
                      />
                    </div>
                    <div className="mp-kf-meta">
                      <span className="mono mp-kf-name">{kf.name}</span>
                      <span className={`mp-badge mp-badge-${kf.kind}`}>{kf.kind}</span>
                      {!kf.used && <span className="mp-badge mp-badge-unused">unused</span>}
                      {kf.usageCount > 0 && <span className="mono mp-kf-uses">{kf.usageCount}×</span>}
                    </div>
                    {kf.propertiesAnimated?.length > 0 && (
                      <code className="mp-kf-props">{kf.propertiesAnimated.join(', ')}</code>
                    )}
                  </article>
                ))}
              </div>
            </Block>
          )}

          {/* ── Transitioned properties ── */}
          {motion.transitionedProperties?.length > 0 && (
            <Block title="Most-transitioned properties" count={motion.transitionedProperties.length}>
              <div className="mp-props">
                {motion.transitionedProperties.map((p, i) => (
                  <div key={i} className="mp-prop">
                    <span className="mono mp-prop-name">{p.property}</span>
                    <span className="mp-prop-track">
                      <span className="mp-prop-fill" style={{ width: `${(p.count / maxPropCount) * 100}%`, background: primary }} />
                    </span>
                    <span className="mono mp-prop-count">{p.count}</span>
                  </div>
                ))}
              </div>
            </Block>
          )}

          {/* ── Scroll-linked ── */}
          <Block title="Scroll-linked motion" count={motion.scrollLinked?.signals?.length || 0}>
            {motion.scrollLinked?.present ? (
              <div className="mp-scroll">
                <p className="mp-scroll-yes mono">✓ uses scroll / view-timeline driven animation</p>
                <div className="mp-tags">
                  {motion.scrollLinked.signals.map((s, i) => <code key={i} className="mp-tag">{s}</code>)}
                </div>
              </div>
            ) : (
              <p className="mono mp-scroll-no">No scroll- or view-timeline animation detected — motion here is time-based.</p>
            )}
          </Block>

          {/* ── Exports ── */}
          {data.exports && (
            <Block title="Export motion language">
              <div className="mp-exports">
                <ExportCard label="Motion tokens (DTCG JSON)" file={`${host || 'site'}-motion.tokens.json`} text={data.exports.tokens} copied={copied === 'tokens'} onCopy={() => copy('tokens', data.exports.tokens)} onDownload={() => download(`${host || 'site'}-motion.tokens.json`, data.exports.tokens)} />
                <ExportCard label="Framer Motion presets" file={`${host || 'site'}-motion.framer.js`} text={data.exports.framer} copied={copied === 'framer'} onCopy={() => copy('framer', data.exports.framer)} onDownload={() => download(`${host || 'site'}-motion.framer.js`, data.exports.framer)} />
                <ExportCard label="Motion CSS variables" file={`${host || 'site'}-motion.css`} text={data.exports.css} copied={copied === 'css'} onCopy={() => copy('css', data.exports.css)} onDownload={() => download(`${host || 'site'}-motion.css`, data.exports.css)} />
                {data.exports.motionone && (
                  <ExportCard label="Motion One presets" file={`${host || 'site'}-motion.one.js`} text={data.exports.motionone} copied={copied === 'motionone'} onCopy={() => copy('motionone', data.exports.motionone)} onDownload={() => download(`${host || 'site'}-motion.one.js`, data.exports.motionone)} />
                )}
                {data.exports.tailwind && (
                  <ExportCard label="Tailwind motion config" file={`${host || 'site'}-motion.tailwind.js`} text={data.exports.tailwind} copied={copied === 'tailwind'} onCopy={() => copy('tailwind', data.exports.tailwind)} onDownload={() => download(`${host || 'site'}-motion.tailwind.js`, data.exports.tailwind)} />
                )}
                {data.exports.gsap && (
                  <ExportCard label="GSAP presets" file={`${host || 'site'}-motion.gsap.js`} text={data.exports.gsap} copied={copied === 'gsap'} onCopy={() => copy('gsap', data.exports.gsap)} onDownload={() => download(`${host || 'site'}-motion.gsap.js`, data.exports.gsap)} />
                )}
                {data.exports.waapi && (
                  <ExportCard label="Web Animations API" file={`${host || 'site'}-motion.waapi.js`} text={data.exports.waapi} copied={copied === 'waapi'} onCopy={() => copy('waapi', data.exports.waapi)} onDownload={() => download(`${host || 'site'}-motion.waapi.js`, data.exports.waapi)} />
                )}
              </div>
            </Block>
          )}
        </section>
      )}

      <style jsx>{`
        .mp { max-width: 1080px; margin: 0 auto; padding-bottom: var(--r9); }
        .mp-hero { padding-top: var(--r5); }
        .mp-title { font-size: clamp(34px, 6vw, 64px); letter-spacing: -0.03em; line-height: 1.02; margin: var(--r3) 0; }
        .mp-title :global(em) { font-family: var(--font-display); font-style: italic; color: var(--accent); }
        .mp-sub { max-width: 60ch; color: var(--ink-2); font-size: clamp(15px, 2vw, 18px); line-height: 1.55; margin-bottom: var(--r5); }
        .mp-form { margin-top: var(--r4); }

        .mp-result { margin-top: var(--r6); display: flex; flex-direction: column; gap: var(--r6); }

        .mp-feel { display: grid; grid-template-columns: 1.4fr 1fr; gap: var(--r5); border: var(--hair); background: var(--paper); padding: clamp(20px, 3vw, 36px); align-items: center; }
        .mp-feel-tag { font-size: 11px; text-transform: uppercase; letter-spacing: 0.16em; color: var(--ink-3); }
        .mp-feel-word { font-family: var(--font-display); font-size: clamp(40px, 7vw, 80px); line-height: 0.95; letter-spacing: -0.03em; text-transform: lowercase; margin: 6px 0 12px; }
        .mp-feel-copy { color: var(--ink-2); font-size: 15px; line-height: 1.5; max-width: 42ch; }
        .mp-feel-host { font-size: 11.5px; color: var(--ink-3); margin-top: 14px; letter-spacing: 0.03em; }
        .mp-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--paper-3); border: 1px solid var(--paper-3); }
        .mp-stat { background: var(--paper); padding: 16px 12px; text-align: center; }
        .mp-stat-n { font-family: var(--font-display); font-size: clamp(22px, 3vw, 32px); line-height: 1; }
        .mp-stat-l { font-family: var(--font-mono); font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--ink-3); margin-top: 6px; }

        .mp-controls { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
        .mp-controls-note { font-size: 11px; color: var(--ink-3); letter-spacing: 0.04em; }

        .mp-block { border: var(--hair); background: var(--paper); }
        .mp-block-head { display: flex; justify-content: space-between; align-items: baseline; padding: 14px 18px; border-bottom: var(--hair); }
        .mp-block-title { font-family: var(--font-display); font-size: 19px; letter-spacing: -0.01em; }
        .mp-block-count { font-family: var(--font-mono); font-size: 11px; color: var(--ink-3); letter-spacing: 0.08em; }
        .mp-block-body { padding: clamp(16px, 2.5vw, 28px); }

        .mp-curves { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 14px; }
        .mp-curve { border: 1px solid var(--paper-3); padding: 12px; background: var(--paper); }
        .mp-curve.is-spring { border-color: var(--accent); }
        .mp-curve-head { display: flex; justify-content: space-between; font-size: 11px; color: var(--ink-2); margin-bottom: 8px; }
        .mp-curve-count { color: var(--ink-3); }
        .mp-curve-svg { display: block; width: 100%; height: auto; aspect-ratio: 1; background: var(--paper-2); }
        .mp-none { display: flex; align-items: center; justify-content: center; font-size: 10px; color: var(--ink-3); }
        .mp-guide { stroke: var(--paper-3); stroke-width: 1; stroke-dasharray: 3 3; }
        .mp-path { fill: none; stroke-width: 2.5; }
        .mp-track { position: relative; height: 8px; margin: 10px 0 8px; background: var(--paper-2); }
        .mp-dot { position: absolute; top: 50%; left: 0; width: 10px; height: 10px; border-radius: 50%; transform: translateY(-50%); animation: mp-ride 1.8s infinite alternate; }
        @keyframes mp-ride { from { left: 0; } to { left: calc(100% - 10px); } }
        .mp-raw { display: block; font-family: var(--font-mono); font-size: 10px; color: var(--ink-3); word-break: break-all; }

        .mp-durs { display: flex; flex-direction: column; gap: 10px; }
        .mp-dur { display: grid; grid-template-columns: 64px 1fr 64px; align-items: center; gap: 12px; }
        .mp-dur-name { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--ink-2); }
        .mp-dur-track { position: relative; height: 10px; background: var(--paper-2); overflow: hidden; }
        .mp-dur-fill { position: absolute; inset: 0 auto 0 0; width: 100%; transform-origin: left; animation: mp-fill linear infinite alternate; }
        @keyframes mp-fill { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .mp-dur-ms { font-size: 11px; color: var(--ink-3); text-align: right; }

        .mp-kfs { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 14px; }
        .mp-kf { border: 1px solid var(--paper-3); padding: 12px; }
        .mp-kf-stage { height: 80px; display: flex; align-items: center; justify-content: center; background: var(--paper-2); margin-bottom: 10px; overflow: hidden; }
        .mp-kf-box { width: 30px; height: 30px; border-radius: 6px; }
        .mp-kf-meta { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 6px; }
        .mp-kf-name { font-size: 11px; color: var(--ink); word-break: break-all; }
        .mp-kf-uses { font-size: 10px; color: var(--ink-3); }
        .mp-badge { font-family: var(--font-mono); font-size: 9.5px; text-transform: uppercase; letter-spacing: 0.06em; padding: 2px 6px; background: var(--ink); color: var(--paper); }
        .mp-badge-unused { background: transparent; color: var(--ink-3); border: 1px solid var(--paper-3); }
        .mp-kf-props { display: block; font-family: var(--font-mono); font-size: 10px; color: var(--ink-3); word-break: break-all; }

        .mp-props { display: flex; flex-direction: column; gap: 8px; }
        .mp-prop { display: grid; grid-template-columns: 140px 1fr 40px; align-items: center; gap: 12px; }
        .mp-prop-name { font-size: 11px; color: var(--ink-2); }
        .mp-prop-track { height: 14px; background: var(--paper-2); }
        .mp-prop-fill { display: block; height: 100%; }
        .mp-prop-count { font-size: 11px; color: var(--ink-3); text-align: right; }

        .mp-scroll-yes { font-size: 13px; color: var(--ink); margin-bottom: 10px; }
        .mp-scroll-no { font-size: 13px; color: var(--ink-3); }
        .mp-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .mp-tag { font-family: var(--font-mono); font-size: 11px; padding: 4px 8px; background: var(--paper-2); color: var(--ink-2); }

        .mp-exports { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; }
        .mp-export { border: 1px solid var(--paper-3); display: flex; flex-direction: column; }
        .mp-export-head { padding: 12px 14px; border-bottom: 1px solid var(--paper-3); }
        .mp-export-label { font-size: 12.5px; color: var(--ink); }
        .mp-export-file { font-family: var(--font-mono); font-size: 10px; color: var(--ink-3); margin-top: 3px; }
        .mp-export-pre { margin: 0; padding: 12px 14px; font-family: var(--font-mono); font-size: 10.5px; line-height: 1.5; color: var(--paper); background: var(--ink); max-height: 150px; overflow: auto; white-space: pre; }
        .mp-export-actions { display: flex; gap: 0; border-top: 1px solid var(--paper-3); }
        .mp-export-actions button { flex: 1; padding: 9px; font-family: var(--font-mono); font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.08em; background: var(--paper); border: 0; cursor: pointer; color: var(--ink); }
        .mp-export-actions button:first-child { border-right: 1px solid var(--paper-3); }
        .mp-export-actions button:hover { background: var(--ink); color: var(--paper); }

        @media (max-width: 720px) {
          .mp-feel { grid-template-columns: 1fr; }
          .mp-prop { grid-template-columns: 100px 1fr 32px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mp-dot, .mp-dur-fill, .mp-kf-box { animation: none !important; }
        }
      `}</style>
    </main>
  );
}

function Stat({ n, label }) {
  return (
    <div className="mp-stat">
      <div className="mp-stat-n">{n}</div>
      <div className="mp-stat-l">{label}</div>
    </div>
  );
}

function Block({ title, count, children }) {
  return (
    <div className="mp-block">
      <div className="mp-block-head">
        <span className="mp-block-title">{title}</span>
        {count != null && <span className="mp-block-count">{count}</span>}
      </div>
      <div className="mp-block-body">{children}</div>
    </div>
  );
}

function ExportCard({ label, file, text, copied, onCopy, onDownload }) {
  return (
    <div className="mp-export">
      <div className="mp-export-head">
        <div className="mp-export-label">{label}</div>
        <div className="mp-export-file">{file}</div>
      </div>
      <pre className="mp-export-pre">{(text || '').slice(0, 600)}</pre>
      <div className="mp-export-actions">
        <button type="button" onClick={onCopy}>{copied ? 'Copied' : 'Copy'}</button>
        <button type="button" onClick={onDownload}>Download</button>
      </div>
    </div>
  );
}
