'use client';

import { useState } from 'react';

const SITE = 'https://designlang.app';

export default function ShareExtractionButton({ url, hash, summary }) {
  const [done, setDone] = useState(null); // 'copy' | 'tweet' | null

  const permalink = hash ? `${SITE}/x/${hash}` : `${SITE}/#extract`;
  const host = (() => { try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return 'a website'; } })();
  const tokens = summary?.colors ?? '?';
  const grade = summary?.score?.grade || '—';
  const text = `extracted ${host} with designlang — ${tokens} tokens, grade ${grade}`;

  function tweet() {
    const intent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(permalink)}`;
    window.open(intent, '_blank', 'noopener,noreferrer');
    setDone('tweet'); setTimeout(() => setDone(null), 1500);
  }

  async function copyLink() {
    try { await navigator.clipboard.writeText(permalink); setDone('copy'); setTimeout(() => setDone(null), 1500); } catch { /* noop */ }
  }

  return (
    <div className="share-row">
      <button type="button" className="btn btn-ghost btn-sm" onClick={tweet}>
        {done === 'tweet' ? 'opened…' : 'Share on X'}
      </button>
      <button type="button" className="btn btn-ghost btn-sm" onClick={copyLink}>
        {done === 'copy' ? 'copied!' : 'Copy link'}
      </button>
    </div>
  );
}
