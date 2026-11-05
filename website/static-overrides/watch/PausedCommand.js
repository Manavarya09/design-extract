'use client';

import { useEffect, useState } from 'react';

// Shows `npx designlang <site>` for the site the visitor submitted (?u=).
export default function PausedCommand() {
  const [host, setHost] = useState('stripe.com');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const u = new URLSearchParams(window.location.search).get('u') || '';
    const h = u.trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    if (/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(h)) setHost(h);
  }, []);

  const cmd = `npx designlang ${host}`;
  return (
    <p style={{ marginTop: 28, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <code className="mono" style={{ padding: '12px 16px', border: '1px solid var(--hairline-2)', borderRadius: 10, fontSize: 16 }}>
        {cmd}
      </code>
      <button
        type="button"
        className="btn btn-sm"
        onClick={() => {
          navigator.clipboard?.writeText(cmd).then(() => setCopied(true), () => {});
        }}
      >
        {copied ? 'copied' : 'copy'}
      </button>
    </p>
  );
}
