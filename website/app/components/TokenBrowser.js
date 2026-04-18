'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { resolveRef, flattenTokens } from '../../lib/token-helpers';
import { sampleTokens, sampleCommand } from './token-browser-sample';
import Marginalia from './Marginalia';

const REF_PATTERN = /^\{([^}]+)\}$/;
function refTarget(value) {
  if (typeof value !== 'string') return null;
  const m = value.match(REF_PATTERN);
  return m ? m[1] : null;
}

function Swatch({ value }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width: 14,
        height: 14,
        border: '1px solid var(--ink)',
        background: value,
        verticalAlign: 'middle',
        marginRight: 8,
      }}
    />
  );
}

function ValueSample({ row, resolvedHex, highlighted }) {
  const { $type, $value } = row;
  if ($type === 'color') {
    const display = typeof $value === 'string' && $value.startsWith('{')
      ? (resolvedHex || $value)
      : $value;
    return (
      <span className="mono" style={{ fontSize: 12, display: 'inline-flex', alignItems: 'center' }}>
        {typeof display === 'string' && display.startsWith('#') ? <Swatch value={display} /> : null}
        <span style={{ color: highlighted ? 'var(--accent)' : 'var(--ink)' }}>{display}</span>
      </span>
    );
  }
  if ($type === 'dimension') {
    return <span className="mono" style={{ fontSize: 12 }}>{String(resolvedHex || $value)}</span>;
  }
  if ($type === 'typography' && typeof $value === 'object' && $value) {
    const { fontFamily, fontSize, lineHeight, fontWeight } = $value;
    const label = `${String(fontFamily).split(',')[0]} ${fontSize}/${lineHeight} ${fontWeight}`;
    return (
      <span
        style={{
          fontFamily: String(fontFamily),
          fontSize: 13,
          lineHeight: 1.3,
          fontWeight: Number(fontWeight) || 400,
        }}
      >
        {label}
      </span>
    );
  }
  return <span className="mono" style={{ fontSize: 12 }}>{JSON.stringify($value)}</span>;
}

export default function TokenBrowser() {
  const tokens = sampleTokens;
  const semanticRows = useMemo(() => flattenTokens(tokens, { layer: 'semantic' }), [tokens]);
  const primitiveRows = useMemo(() => flattenTokens(tokens, { layer: 'primitive' }), [tokens]);

  const [activeIdx, setActiveIdx] = useState(-1);
  const [reduced, setReduced] = useState(false);
  const semanticRefs = useRef([]);
  const primitiveRefs = useRef([]);
  const containerRef = useRef(null);
  const [lineGeom, setLineGeom] = useState(null); // { x1, y1, x2, y2, targetPrimitivePath }

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  // Compute line geometry when activeIdx changes.
  useEffect(() => {
    if (activeIdx < 0 || !containerRef.current) {
      setLineGeom(null);
      return;
    }
    const row = semanticRows[activeIdx];
    if (!row) return setLineGeom(null);
    const target = refTarget(row.$value);
    if (!target) return setLineGeom(null);

    const primitiveIdx = primitiveRows.findIndex((p) => p.path === target);
    if (primitiveIdx < 0) return setLineGeom(null);

    const semEl = semanticRefs.current[activeIdx];
    const primEl = primitiveRefs.current[primitiveIdx];
    const box = containerRef.current.getBoundingClientRect();
    if (!semEl || !primEl) return setLineGeom(null);
    const a = semEl.getBoundingClientRect();
    const b = primEl.getBoundingClientRect();

    setLineGeom({
      x1: a.right - box.left,
      y1: a.top + a.height / 2 - box.top,
      x2: b.left - box.left,
      y2: b.top + b.height / 2 - box.top,
      targetPrimitivePath: target,
      width: box.width,
      height: box.height,
    });
  }, [activeIdx, semanticRows, primitiveRows]);

  // Recompute on resize.
  useEffect(() => {
    const onResize = () => setActiveIdx((i) => i); // re-trigger
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const activeRow = activeIdx >= 0 ? semanticRows[activeIdx] : null;
  const activeResolved = activeRow ? resolveRef(tokens, activeRow.path) : null;
  const activeTargetPath = activeRow ? refTarget(activeRow.$value) : null;

  const handleKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(semanticRows.length - 1, i < 0 ? 0 : i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(0, i < 0 ? 0 : i - 1));
    } else if (e.key === 'Escape') {
      setActiveIdx(-1);
    }
  };

  return (
    <div className="with-margin">
      <div>
        <h2 className="display" style={{ marginBottom: 'var(--r3)' }}>Aliases, not values.</h2>
        <p className="prose" style={{ fontSize: 18, marginBottom: 'var(--r6)' }}>
          v7.0 writes tokens in W3C DTCG. Hover a semantic row on the left and watch the
          alias resolve through to its primitive on the right.
        </p>

        <div
          ref={containerRef}
          role="group"
          aria-label="DTCG token browser"
          tabIndex={0}
          onKeyDown={handleKey}
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: '5fr 2fr 5fr',
            columnGap: 0,
            border: 'var(--hair)',
            background: 'var(--paper-2)',
          }}
        >
          {/* Left: semantic */}
          <div>
            <div
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--ink-2)',
                padding: '10px 14px',
                borderBottom: 'var(--hair)',
              }}
            >
              semantic
            </div>
            {semanticRows.map((row, i) => {
              const isActive = i === activeIdx;
              return (
                <div
                  key={row.path}
                  ref={(el) => (semanticRefs.current[i] = el)}
                  onMouseEnter={() => setActiveIdx(i)}
                  onFocus={() => setActiveIdx(i)}
                  tabIndex={-1}
                  role="row"
                  aria-selected={isActive}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 14px',
                    borderBottom: i === semanticRows.length - 1 ? 0 : '1px solid var(--ink-3)',
                    background: isActive ? 'var(--paper)' : 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  <span className="mono" style={{ fontSize: 12, color: 'var(--ink)' }}>
                    {row.path.replace(/^semantic\./, '')}
                  </span>
                  <ValueSample row={row} resolvedHex={isActive ? activeResolved : null} highlighted={isActive} />
                </div>
              );
            })}
          </div>

          {/* Middle: flight-path */}
          <div style={{ position: 'relative', borderLeft: '1px solid var(--ink-3)', borderRight: '1px solid var(--ink-3)' }}>
            {lineGeom && (
              <svg
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                  overflow: 'visible',
                }}
                viewBox={`0 0 ${lineGeom.width} ${lineGeom.height}`}
                preserveAspectRatio="none"
              >
                <FlightLine geom={lineGeom} reduced={reduced} />
              </svg>
            )}
          </div>

          {/* Right: primitive */}
          <div>
            <div
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--ink-2)',
                padding: '10px 14px',
                borderBottom: 'var(--hair)',
              }}
            >
              primitive
            </div>
            {primitiveRows.map((row, i) => {
              const isTarget = activeTargetPath === row.path;
              return (
                <div
                  key={row.path}
                  ref={(el) => (primitiveRefs.current[i] = el)}
                  role="row"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 14px',
                    borderBottom: i === primitiveRows.length - 1 ? 0 : '1px solid var(--ink-3)',
                    background: isTarget ? 'var(--paper)' : 'transparent',
                    boxShadow: isTarget ? 'inset 3px 0 0 var(--accent)' : 'none',
                  }}
                >
                  <span className="mono" style={{ fontSize: 12 }}>
                    {row.path.replace(/^primitive\./, '')}
                  </span>
                  <ValueSample row={row} highlighted={isTarget} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Live region for screen readers */}
        <div
          aria-live="polite"
          style={{
            position: 'absolute',
            width: 1,
            height: 1,
            overflow: 'hidden',
            clip: 'rect(0 0 0 0)',
          }}
        >
          {activeRow
            ? `${activeRow.path} resolves to ${activeTargetPath || activeRow.$value} — ${activeResolved || ''}`
            : ''}
        </div>
      </div>

      <Marginalia>
        <div>taxonomy</div>
        <div>
          Semantic tokens describe intent. Primitive tokens describe values.
          designlang writes both in W3C DTCG so your consumer can choose which layer to bind to.
        </div>
        <hr style={{ margin: '12px 0', border: 0, borderTop: '1px solid var(--ink-3)' }} />
        <div>produced by</div>
        <div><code>{sampleCommand}</code></div>
      </Marginalia>
    </div>
  );
}

function FlightLine({ geom, reduced }) {
  const { x1, y1, x2, y2 } = geom;
  // Curve control points for a smooth horizontal flight path.
  const midX = (x1 + x2) / 2;
  const d = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;

  const pathRef = useRef(null);
  const [len, setLen] = useState(0);
  useEffect(() => {
    if (pathRef.current) setLen(pathRef.current.getTotalLength());
  }, [x1, y1, x2, y2]);

  return (
    <>
      <path
        ref={pathRef}
        d={d}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeDasharray={reduced ? '0' : len}
        strokeDashoffset={reduced ? 0 : len}
        style={{
          animation: reduced ? 'none' : 'designlang-flight 320ms ease-out forwards',
        }}
      />
      <circle cx={x2} cy={y2} r="3" fill="var(--accent)" />
      <style>{`
        @keyframes designlang-flight {
          to { stroke-dashoffset: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes designlang-flight { to { stroke-dashoffset: 0; } }
        }
      `}</style>
    </>
  );
}
