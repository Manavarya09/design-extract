'use client';

import { useState } from 'react';

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

function curvePath(pts, size) {
  const [x1, y1, x2, y2] = pts;
  const px = (v) => (v * size).toFixed(2);
  const py = (v) => ((1 - v) * size).toFixed(2);
  return `M ${px(0)} ${py(0)} C ${px(x1)} ${py(y1)}, ${px(x2)} ${py(y2)}, ${px(1)} ${py(1)}`;
}

const SIZE = 132;

export default function MotionLab({ durations = [], easings = [], primary = '#ef4444', host, slug }) {
  const [playing, setPlaying] = useState(true);

  return (
    <div className="mlab">
      <div className="mlab-bar">
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => setPlaying((p) => !p)}>
          {playing ? 'Pause' : 'Play'} motion
        </button>
        <a className="btn btn-ghost btn-sm" href={`/gallery/${slug}/${slug}-motion.html`} target="_blank" rel="noreferrer">
          Open full Motion Lab ↗
        </a>
      </div>

      {easings.length > 0 && (
        <>
          <p className="mlab-label mono">easing curves · {easings.length}</p>
          <div className="mlab-grid">
            {easings.map((e, i) => {
              const pts = bezierPoints(e.value);
              return (
                <article key={i} className="mlab-card">
                  <div className="mlab-card-head">
                    <span className="mono">{e.family && e.family !== 'custom' ? e.family : `easing-${i + 1}`}</span>
                  </div>
                  {pts ? (
                    <svg className="mlab-curve" viewBox={`0 0 ${SIZE} ${SIZE}`} width={SIZE} height={SIZE} aria-hidden>
                      <line x1="0" y1={SIZE} x2={SIZE} y2="0" className="mlab-guide" />
                      <path d={curvePath(pts, SIZE)} className="mlab-path" style={{ stroke: primary }} />
                    </svg>
                  ) : (
                    <div className="mlab-curve mlab-none">non-bezier</div>
                  )}
                  <code className="mlab-raw">{e.value}</code>
                  <div className="mlab-track">
                    <span
                      className="mlab-dot"
                      style={{
                        background: primary,
                        animationTimingFunction: e.value,
                        animationPlayState: playing ? 'running' : 'paused',
                      }}
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}

      {durations.length > 0 && (
        <>
          <p className="mlab-label mono" style={{ marginTop: 22 }}>durations · {durations.length}</p>
          <div className="mlab-durs">
            {durations.map((d, i) => (
              <div key={i} className="mlab-dur">
                <span className="mono mlab-dur-name">{d.name}</span>
                <span className="mlab-dur-track">
                  <span
                    className="mlab-dur-fill"
                    style={{
                      background: primary,
                      width: `${Math.min(100, (d.ms / 1000) * 100)}%`,
                      animationDuration: `${d.ms}ms`,
                      animationPlayState: playing ? 'running' : 'paused',
                    }}
                  />
                </span>
                <span className="mono mlab-dur-ms">{d.ms}ms</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
