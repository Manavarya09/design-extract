'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function MobileMenu({ stars }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="nav-burger"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <span className={`nav-burger-bar ${open ? 'is-x1' : ''}`} />
        <span className={`nav-burger-bar ${open ? 'is-x2' : ''}`} />
      </button>

      {open && mounted && createPortal(
        (
          <div className="nav-sheet" role="dialog" aria-modal="true" aria-label="Site menu">
            <button type="button" className="nav-sheet-close" onClick={() => setOpen(false)} aria-label="Close menu">
              <span className="nav-burger-bar is-x1" />
              <span className="nav-burger-bar is-x2" />
            </button>
            <nav className="nav-sheet-links" aria-label="primary">
              <a href="/features"  onClick={() => setOpen(false)}>Features</a>
              <a href="/gallery"   onClick={() => setOpen(false)}>Gallery</a>
              <a href="/spec"      onClick={() => setOpen(false)}>DESIGN.md spec</a>
              <a href="/vs/design-extractor" onClick={() => setOpen(false)}>vs design-extractor</a>
              <a href="/changelog" onClick={() => setOpen(false)}>Changelog</a>
              <a href="/drift"     onClick={() => setOpen(false)}>Drift leaderboard</a>
              <a href="/build"     onClick={() => setOpen(false)}>Build</a>
            </nav>
            <div className="nav-sheet-meta">
              <a href="https://github.com/Manavarya09/design-extract" target="_blank" rel="noreferrer" className="nav-sheet-row">
                <span>GitHub</span>
                <span className="mono">★ {stars ?? '—'}</span>
              </a>
              <a href="https://www.npmjs.com/package/designlang" target="_blank" rel="noreferrer" className="nav-sheet-row">
                <span>npm</span>
                <span className="mono">npm i designlang ↗</span>
              </a>
            </div>
          </div>
        ),
        document.body
      )}
    </>
  );
}
