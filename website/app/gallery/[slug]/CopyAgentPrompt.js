'use client';

import { useState } from 'react';

export default function CopyAgentPrompt({ body, host }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback for old browsers
      const ta = document.createElement('textarea');
      ta.value = body;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* noop */ }
      document.body.removeChild(ta);
    }
  }

  return (
    <div className="ap-card">
      <div className="ap-head">
        <span className="mono faint" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          paste into Claude · GPT · Cursor · Windsurf · v0
        </span>
        <button type="button" className="btn btn-primary btn-sm" onClick={copy}>
          {copied ? 'Copied!' : `Copy ${(body.length / 1024).toFixed(1)}KB prompt`}
        </button>
      </div>
      <pre className="ap-body">{body}</pre>
      <div className="ap-foot mono faint">
        Drop this in any AI agent. It will build UI in the {host} brand without hallucinating colours, fonts or component shapes.
      </div>
    </div>
  );
}
