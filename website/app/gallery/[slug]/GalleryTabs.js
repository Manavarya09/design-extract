'use client';

import { useMemo, useState } from 'react';

const GROUP_LABEL = {
  spec:      'Spec',
  tokens:    'Tokens & emitters',
  structure: 'Structure',
  agent:     'Agent surface',
  intel:     'Page intel',
  prompts:   'Prompt pack',
  other:     'Other',
};

export default function GalleryTabs({ slug, files = [] }) {
  const TABS = useMemo(() => files.filter(t => t.body), [files]);
  const groups = useMemo(() => {
    const order = Object.keys(GROUP_LABEL);
    const seen = new Set();
    const out = [];
    for (const t of TABS) {
      const g = t.group || 'other';
      if (!seen.has(g)) { seen.add(g); out.push(g); }
    }
    return out.sort((a, b) => order.indexOf(a) - order.indexOf(b));
  }, [TABS]);

  const [activeGroup, setActiveGroup] = useState(groups[0]);
  const [activeId, setActiveId] = useState(TABS.find(t => (t.group || 'other') === groups[0])?.id);
  const [copied, setCopied] = useState(false);

  const visibleTabs = TABS.filter(t => (t.group || 'other') === activeGroup);
  const tab = TABS.find(t => t.id === activeId) || visibleTabs[0];

  function pickGroup(g) {
    setActiveGroup(g);
    const first = TABS.find(t => (t.group || 'other') === g);
    if (first) setActiveId(first.id);
  }

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
      <div className="gb-source-groups">
        {groups.map((g) => {
          const count = TABS.filter(t => (t.group || 'other') === g).length;
          return (
            <button
              key={g}
              type="button"
              className={`gb-source-group ${activeGroup === g ? 'is-active' : ''}`}
              onClick={() => pickGroup(g)}
            >
              {GROUP_LABEL[g] || g}
              <span className="gb-source-group-count">{count}</span>
            </button>
          );
        })}
      </div>
      <div className="gb-source-head">
        <div className="gb-source-tabs" role="tablist" aria-label="View">
          {visibleTabs.map(t => (
            <button
              key={t.id}
              role="tab"
              aria-selected={activeId === t.id}
              className={`gb-source-tab ${activeId === t.id ? 'is-active' : ''}`}
              onClick={() => setActiveId(t.id)}
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
