'use client';

import { useState } from 'react';

const SITE = 'https://designlang.app';

export default function ShareExtractionButton({ url, hash, summary, files }) {
  const [done, setDone] = useState(null);

  const permalink = hash ? `${SITE}/x/${hash}` : `${SITE}/#extract`;
  const host = (() => { try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return 'a website'; } })();
  const tokens = summary?.colors ?? '?';
  const grade = summary?.score?.grade || '—';
  const text = `extracted ${host} with designlang — ${tokens} tokens, grade ${grade}`;

  // Find the AGENT.md content if it's in the streamed files map.
  const agentBody = files ? Object.entries(files).find(([n]) => n.endsWith('-AGENT.md'))?.[1] : null;
  const pdfUrl = hash ? `/api/pdf/${hash}` : null;

  function tweet() {
    const intent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(permalink)}`;
    window.open(intent, '_blank', 'noopener,noreferrer');
    setDone('tweet'); setTimeout(() => setDone(null), 1500);
  }

  async function copyLink() {
    try { await navigator.clipboard.writeText(permalink); setDone('copy'); setTimeout(() => setDone(null), 1500); } catch { /* noop */ }
  }

  async function copyAgent() {
    if (!agentBody) return;
    try { await navigator.clipboard.writeText(agentBody); setDone('agent'); setTimeout(() => setDone(null), 1800); } catch { /* noop */ }
  }

  return (
    <div className="share-row">
      {pdfUrl && (
        <a href={pdfUrl} download={`${host}-brand.pdf`} className="btn btn-primary btn-sm">
          Download brand PDF
        </a>
      )}
      {agentBody && (
        <button type="button" className="btn btn-ghost btn-sm" onClick={copyAgent}>
          {done === 'agent' ? `Copied ${(agentBody.length / 1024).toFixed(1)}KB!` : 'Copy agent prompt'}
        </button>
      )}
      <button type="button" className="btn btn-ghost btn-sm" onClick={tweet}>
        {done === 'tweet' ? 'opened…' : 'Share on X'}
      </button>
      <button type="button" className="btn btn-ghost btn-sm" onClick={copyLink}>
        {done === 'copy' ? 'copied!' : 'Copy link'}
      </button>
    </div>
  );
}
