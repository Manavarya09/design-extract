'use client';

import { useState } from 'react';

export default function GalleryTabs({ slug, files = [] }) {
  const TABS = files.filter(t => t.body);
  const [active, setActive] = useState(TABS[0]?.id);
  const [copied, setCopied] = useState(false);
  const tab = TABS.find(t => t.id === active) || TABS[0];

  async function copy() {
    try {
      await navigator.clipboard.writeText(tab?.body || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch { /* noop */ }
  }

  if (TABS.length === 0) return null;

  return (
    <div className="gb-source">
      <div className="gb-source-head">
        <div className="gb-source-tabs" role="tablist" aria-label="View">
          {TABS.map(t => (
            <button
              key={t.id}
              role="tab"
              aria-selected={active === t.id}
              className={`gb-source-tab ${active === t.id ? 'is-active' : ''}`}
              onClick={() => setActive(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="gb-source-actions">
          <span className="mono faint" style={{ fontSize: 11 }}>{(tab?.body || '').length.toLocaleString()} chars</span>
          <button type="button" className="gb-copy" onClick={copy}>{copied ? 'copied!' : 'copy'}</button>
          <a href={`/gallery/${slug}/brand.html`} target="_blank" rel="noreferrer" className="gb-copy gb-pdf">brand book ↗</a>
        </div>
      </div>
      <pre className="gb-source-body">{tab?.body || ''}</pre>
    </div>
  );
}
