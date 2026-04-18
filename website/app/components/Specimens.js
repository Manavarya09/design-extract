'use client';

import { useEffect, useRef } from 'react';
import specimens from '../../lib/specimens.json';
import Marginalia from './Marginalia';

// Quick relative-luminance check used to guard against accents that would fail
// 3:1 on paper. If they do, we fall back to ink.
function contrastsOnPaper(hex) {
  const paper = [0xf3, 0xf1, 0xea];
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const lum = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  const l1 = 0.2126 * lum(paper[0]) + 0.7152 * lum(paper[1]) + 0.0722 * lum(paper[2]);
  const l2 = 0.2126 * lum(r) + 0.7152 * lum(g) + 0.0722 * lum(b);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  return ratio >= 3;
}

export default function Specimens() {
  const stripRef = useRef(null);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;

    const cards = Array.from(el.querySelectorAll('[data-specimen]'));
    const root = document.documentElement;
    const DEFAULT = '#FF4800';

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    root.style.setProperty('--accent-transition', reduced ? '0s' : '400ms');
    // Attach transition for --accent. Since CSS can't transition a custom
    // property by default we apply it via a style tag scoped to documentElement.
    const styleEl = document.createElement('style');
    styleEl.textContent = `html { transition: --accent var(--accent-transition) ease; } @property --accent { syntax: '<color>'; inherits: true; initial-value: #FF4800; }`;
    document.head.appendChild(styleEl);

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) {
          root.style.setProperty('--accent', DEFAULT);
          return;
        }
        // Pick the one with the greatest visibility ratio.
        const top = visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const accent = top.target.getAttribute('data-accent') || DEFAULT;
        const safe = contrastsOnPaper(accent) ? accent : '#0A0908';
        root.style.setProperty('--accent', safe);
      },
      { root: el, threshold: [0.6] }
    );

    cards.forEach((c) => io.observe(c));
    return () => {
      io.disconnect();
      root.style.setProperty('--accent', DEFAULT);
      styleEl.remove();
    };
  }, []);

  return (
    <div>
      <div className="with-margin" style={{ marginTop: 'var(--r5)', marginBottom: 'var(--r7)' }}>
        <div>
          <div className="section-label" style={{ marginBottom: 'var(--r5)' }}>
            <span>§07 — Specimens</span>
          </div>
          <h2 className="display" style={{ marginBottom: 'var(--r5)' }}>
            Six design systems,<br />
            <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>one format.</em>
          </h2>
          <p className="prose" style={{ fontSize: 18, lineHeight: 1.5, maxWidth: '62ch' }}>
            Each specimen was crawled once and written to DTCG. The page accent below is
            pulled from the specimen&apos;s own extracted primary — the same{' '}
            <code className="mono" style={{ fontSize: 14 }}>semantic.color.action.primary</code>{' '}
            your agent would get over MCP.
          </p>
        </div>
        <Marginalia>
          <div>accessibility</div>
          <p className="foot" style={{ marginTop: 6 }}>
            The live <code>--accent</code> is tested for ≥3:1 contrast with paper on scroll.
            Specimens that fall below fall back to ink.
          </p>
          <hr style={{ margin: '12px 0', border: 0, borderTop: '1px solid var(--ink-3)' }} />
          <p className="foot">
            Specimens are point-in-time snapshots, re-rendered from on-disk DTCG files.
            To update, re-run <code>designlang &lt;url&gt; --platforms web</code> and
            replace the specimen entry.
          </p>
        </Marginalia>
      </div>

      <div
        ref={stripRef}
        className="specimen-strip"
        style={{
          display: 'flex',
          gap: 'var(--r5)',
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollSnapType: 'x mandatory',
          paddingBottom: 'var(--r5)',
          paddingInline: 'var(--page-pad-x)',
          marginInline: 'calc(-1 * var(--page-pad-x))',
          scrollbarWidth: 'thin',
        }}
      >
        {specimens.map((s) => (
          <SpecimenCard key={s.host} s={s} />
        ))}
      </div>

      <style jsx>{`
        .specimen-strip > :global([data-specimen]) {
          flex: 0 0 640px;
          height: 400px;
          scroll-snap-align: start;
          border: 1px solid var(--ink);
          background: var(--paper-2);
          padding: var(--r5);
          display: grid;
          grid-template-rows: auto auto 1fr auto auto;
          gap: var(--r4);
        }
        @media (max-width: 860px) {
          .specimen-strip {
            flex-direction: column;
            overflow-x: hidden;
            scroll-snap-type: none;
          }
          .specimen-strip > :global([data-specimen]) {
            flex: 0 0 auto;
            width: 100%;
            height: auto;
            min-height: 420px;
          }
        }
      `}</style>
    </div>
  );
}

function SpecimenCard({ s }) {
  return (
    <article data-specimen data-accent={s.accent} aria-label={`${s.display} specimen`}>
      <header style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <span className="chip mono">{s.host}</span>
        <span className="chip mono">{s.year}</span>
        <span className="chip mono">{s.framework}</span>
      </header>

      <div style={{ display: 'flex', gap: 0 }}>
        {s.palette.map((hex) => (
          <div key={hex} style={{ flex: '0 0 auto', marginRight: 8 }}>
            <div
              aria-hidden="true"
              style={{
                width: 40,
                height: 40,
                background: hex,
                border: '1px solid var(--ink)',
              }}
            />
            <div
              className="mono"
              style={{ fontSize: 10, marginTop: 4, color: 'var(--ink-2)', letterSpacing: '0.02em' }}
            >
              {hex.toUpperCase()}
            </div>
          </div>
        ))}
      </div>

      <div
        className="display"
        style={{
          fontSize: 64,
          lineHeight: 1,
          letterSpacing: '-0.02em',
          color: 'var(--ink)',
          alignSelf: 'center',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        <span style={{ color: s.accent }}>{s.display}.</span>{' '}
        <span style={{ color: 'var(--ink-2)' }}>Design as a system.</span>
      </div>

      <div style={{ display: 'flex', gap: 'var(--r6)' }}>
        <Metric label="a11y" value={s.a11y} />
        <Metric label="score" value={s.designScore} />
        <Metric label="radius" value={s.radius} />
      </div>

      <footer
        style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          color: 'var(--ink-2)',
          fontSize: 14,
          borderTop: '1px solid var(--ink-3)',
          paddingTop: 10,
        }}
      >
        {s.note}
      </footer>
    </article>
  );
}

function Metric({ label, value }) {
  return (
    <div>
      <div
        className="display"
        style={{ fontSize: 40, lineHeight: 1, letterSpacing: '-0.02em' }}
      >
        {value}
      </div>
      <div
        className="mono"
        style={{ fontSize: 10, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 4 }}
      >
        {label}
      </div>
    </div>
  );
}
