'use client';

// §05 A11y remediation — interactive contrast slider.
// WCAG relative-luminance formula copied here (~12 lines) so this stays
// client-side and doesn't import from the CLI package.

import { useMemo, useState } from 'react';
import Rule from './Rule';
import Marginalia from './Marginalia';

// ── WCAG helpers ────────────────────────────────────────────────
function toRgb(hex) {
  const h = String(hex || '').replace('#', '');
  const n = h.length === 3 ? h.split('').map((x) => x + x).join('') : h;
  const i = parseInt(n, 16);
  return [(i >> 16) & 255, (i >> 8) & 255, i & 255];
}
function relLum([r, g, b]) {
  const f = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function contrast(a, b) {
  const la = relLum(toRgb(a));
  const lb = relLum(toRgb(b));
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}
function lerpHex(a, b, t) {
  const [ar, ag, ab] = toRgb(a);
  const [br, bg, bb] = toRgb(b);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return (
    '#' +
    [r, g, bl].map((x) => x.toString(16).padStart(2, '0')).join('').toUpperCase()
  );
}

// ── Demo data (shaped like remediateFailingPairs output) ────────
const BG = '#F3F1EA';
const FAIL_FG = '#B8B199';
const PASS_FG = '#403C34';

const REMEDIATIONS = [
  {
    fg: '#B8B199',
    bg: '#F3F1EA',
    ratio: 2.11,
    rule: 'AA-normal',
    suggestion: { replace: 'fg', color: '#403C34', newRatio: 7.84 },
  },
  {
    fg: '#8B8778',
    bg: '#F3F1EA',
    ratio: 3.28,
    rule: 'AA-normal',
    suggestion: { replace: 'fg', color: '#0A0908', newRatio: 15.92 },
  },
  {
    fg: '#FF4800',
    bg: '#ECE8DD',
    ratio: 3.51,
    rule: 'AAA-normal',
    suggestion: { replace: 'fg', color: '#0A0908', newRatio: 15.31 },
  },
];

function tagFor(ratio) {
  if (ratio >= 7) return { label: 'AAA', color: 'var(--ink)', underline: true };
  if (ratio >= 4.5) return { label: 'AA', color: 'var(--accent)', underline: false };
  if (ratio >= 3) return { label: 'AA large', color: 'var(--accent)', underline: false };
  return { label: 'FAIL', color: 'var(--ink)', underline: false };
}

export default function A11ySlider() {
  const [t, setT] = useState(0);
  const fg = useMemo(() => lerpHex(FAIL_FG, PASS_FG, t / 100), [t]);
  const ratio = useMemo(() => contrast(fg, BG), [fg]);
  const tag = tagFor(ratio);

  return (
    <>
      <Rule number="05" label="A11y remediation" />
      <div className="with-margin" style={{ marginTop: 'var(--r5)' }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 'var(--r3)' }}>§05 A11y remediation</div>
          <h2 className="display" style={{ marginBottom: 'var(--r4)' }}>
            From score to fix.
          </h2>
          <p className="prose" style={{ fontSize: 18, maxWidth: '62ch', color: 'var(--ink-2)' }}>
            Most tools hand you a failing contrast ratio. designlang hands you the next color in
            your own palette that passes AA. Drag to see the difference.
          </p>

          <div
            className="grid-12"
            style={{ marginTop: 'var(--r7)', alignItems: 'start' }}
          >
            {/* LEFT — slider tiles (span 6) */}
            <div style={{ gridColumn: 'span 6' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--r4)' }}>
                {/* Failing tile (static reference) */}
                <Tile
                  bg={BG}
                  fg={FAIL_FG}
                  ratio={contrast(FAIL_FG, BG)}
                  label="failing pair"
                  staticTag={{ label: 'FAIL', color: 'var(--ink)', underline: false }}
                />
                {/* Live tile driven by slider */}
                <Tile
                  bg={BG}
                  fg={fg}
                  ratio={ratio}
                  label="remediated"
                  staticTag={tag}
                />
              </div>

              <div style={{ marginTop: 'var(--r5)' }}>
                <label
                  htmlFor="a11y-range"
                  className="mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--ink-2)',
                    display: 'block',
                    marginBottom: 8,
                  }}
                >
                  drag: failing → remediated
                </label>
                <input
                  id="a11y-range"
                  type="range"
                  min="0"
                  max="100"
                  value={t}
                  onChange={(e) => setT(Number(e.target.value))}
                  aria-valuetext={`contrast ratio ${ratio.toFixed(2)} to 1`}
                  className="a11y-range"
                  style={{ width: '100%' }}
                />
                <div
                  className="mono"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 6,
                    fontSize: 11,
                    color: 'var(--ink-3)',
                  }}
                >
                  <span>{FAIL_FG}</span>
                  <span style={{ fontVariantNumeric: 'tabular-nums' }}>{fg}</span>
                  <span>{PASS_FG}</span>
                </div>
              </div>
            </div>

            {/* RIGHT — remediation list (span 6) */}
            <div style={{ gridColumn: 'span 6' }}>
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-2)',
                  marginBottom: 'var(--r3)',
                }}
              >
                remediateFailingPairs() output
              </div>
              <div
                role="table"
                style={{
                  border: '1px solid var(--ink)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                }}
              >
                <div
                  role="row"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1.3fr 0.3fr 1.3fr 0.9fr 0.7fr',
                    padding: '8px 12px',
                    borderBottom: '1px solid var(--ink)',
                    color: 'var(--ink-3)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontSize: 10,
                  }}
                >
                  <span>original</span>
                  <span />
                  <span>suggested</span>
                  <span>ratio</span>
                  <span>rule</span>
                </div>
                {REMEDIATIONS.map((r, i) => (
                  <div
                    key={i}
                    role="row"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1.3fr 0.3fr 1.3fr 0.9fr 0.7fr',
                      padding: '10px 12px',
                      borderTop: i === 0 ? 0 : '1px solid var(--ink-3)',
                      alignItems: 'center',
                    }}
                  >
                    <span>
                      <Swatch color={r.fg} /> {r.fg}{' '}
                      <span style={{ color: 'var(--ink-3)' }}>on</span>{' '}
                      <Swatch color={r.bg} />
                    </span>
                    <span style={{ color: 'var(--ink-3)', textAlign: 'center' }}>→</span>
                    <span>
                      <Swatch color={r.suggestion.color} /> {r.suggestion.color}
                    </span>
                    <span style={{ fontVariantNumeric: 'tabular-nums' }}>
                      <span style={{ color: 'var(--ink-3)' }}>{r.ratio.toFixed(2)}</span>
                      <span style={{ color: 'var(--ink-3)' }}> → </span>
                      <span style={{ color: 'var(--accent)' }}>
                        {r.suggestion.newRatio.toFixed(2)}
                      </span>
                    </span>
                    <span style={{ color: 'var(--ink-2)' }}>{r.rule}</span>
                  </div>
                ))}
              </div>
              <p
                className="mono"
                style={{
                  marginTop: 'var(--r3)',
                  fontSize: 11,
                  color: 'var(--ink-3)',
                  maxWidth: '52ch',
                }}
              >
                designlang only suggests colors that already exist in the extracted palette. No
                invented tokens.
              </p>
            </div>
          </div>
        </div>

        <Marginalia>
          <div>WCAG thresholds</div>
          <div style={{ marginTop: 6 }}>
            <div><code>AA normal 4.5:1</code></div>
            <div><code>AA large 3:1</code></div>
            <div><code>AAA normal 7:1</code></div>
            <div><code>AAA large 4.5:1</code></div>
          </div>
          <hr style={{ margin: '12px 0', border: 0, borderTop: '1px solid var(--ink-3)' }} />
          <p className="foot">
            Run <code>designlang &lt;url&gt;</code> and every failing pair ships with a drop-in fix.
          </p>
        </Marginalia>
      </div>

      <style jsx>{`
        .a11y-range {
          -webkit-appearance: none;
          appearance: none;
          height: 2px;
          background: var(--ink);
          outline: 0;
          cursor: pointer;
        }
        .a11y-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          background: var(--paper);
          border: 2px solid var(--ink);
          border-radius: 0;
          cursor: grab;
        }
        .a11y-range::-moz-range-thumb {
          width: 18px;
          height: 18px;
          background: var(--paper);
          border: 2px solid var(--ink);
          border-radius: 0;
          cursor: grab;
        }
        .a11y-range:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
        }
      `}</style>
    </>
  );
}

function Swatch({ color }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width: 10,
        height: 10,
        background: color,
        border: '1px solid var(--ink)',
        verticalAlign: 'middle',
        marginRight: 4,
      }}
    />
  );
}

function Tile({ bg, fg, ratio, label, staticTag }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--r3)' }}>
      <div
        style={{
          width: '100%',
          aspectRatio: '1 / 1',
          maxWidth: 220,
          maxHeight: 220,
          background: bg,
          border: '1px solid var(--ink)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          className="display"
          style={{ color: fg, fontSize: 'clamp(36px, 4vw, 64px)', letterSpacing: '-0.03em' }}
        >
          Aa
        </span>
      </div>
      <div className="mono" style={{ fontSize: 11, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {label}
        </span>
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>
          {fg.toUpperCase()} <span style={{ color: 'var(--ink-3)' }}>on</span> {bg.toUpperCase()}
        </span>
        <span
          style={{
            color: staticTag.color,
            fontVariantNumeric: 'tabular-nums',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            textDecoration: staticTag.underline ? 'underline' : 'none',
            textDecorationColor: 'var(--accent)',
            textUnderlineOffset: 3,
          }}
        >
          {staticTag.label} {ratio.toFixed(2)}:1
        </span>
      </div>
    </div>
  );
}
