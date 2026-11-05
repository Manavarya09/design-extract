'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { STATIC_SITE, livePausedMessage } from '../../lib/static-site.js';

const EXAMPLES = ['stripe.com', 'linear.app', 'vercel.com', 'notion.so'];

export default function StudioPlayground() {
  const [status, setStatus] = useState('idle'); // idle | loading | done | error
  const [html, setHtml] = useState(null);
  const [host, setHost] = useState(null);
  const [docUrl, setDocUrl] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const inputRef = useRef(null);

  // A standalone Blob URL of the studio doc, for "Open full ↗" in a new tab.
  useEffect(() => {
    if (!html) { setDocUrl(null); return; }
    const url = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
    setDocUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [html]);

  const run = useCallback(async (rawUrl) => {
    const raw = (rawUrl != null ? rawUrl : (inputRef.current?.value || '')).trim();
    if (!raw) return;
    const url = /^https?:\/\//i.test(raw) ? raw : 'https://' + raw;
    if (STATIC_SITE) {
      setErrorMsg(livePausedMessage(url));
      setStatus('error');
      return;
    }
    setStatus('loading');
    setErrorMsg(null);
    try {
      const res = await fetch('/api/studio', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorMsg(json.error || 'Could not open the studio for that URL.');
        setStatus('error');
        return;
      }
      setHtml(json.html);
      setHost(json.hostname);
      setStatus('done');
      // Reflect the target in the URL so the page is shareable.
      try {
        const u = new URL(window.location.href);
        u.searchParams.set('url', raw.replace(/^https?:\/\//i, ''));
        window.history.replaceState(null, '', u);
      } catch {}
    } catch {
      setErrorMsg('Network error — please try again.');
      setStatus('error');
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    run();
  };

  // Auto-run from ?url= so shared links open straight into the studio.
  useEffect(() => {
    try {
      const q = new URL(window.location.href).searchParams.get('url');
      if (q) {
        if (inputRef.current) inputRef.current.value = q.replace(/^https?:\/\//i, '');
        run(q);
      }
    } catch {}
  }, [run]);

  const loading = status === 'loading';

  return (
    <main className="studio-page">
      <section className="studio-hero">
        <div className="studio-eyebrow"><span>§ studio — live design-system editor</span></div>
        <h1 className="studio-title">
          Edit a website’s design system, <em>live</em>.
        </h1>
        <p className="studio-sub">
          Paste any URL. Tweak the extracted tokens in the inspector and watch a wall of real
          components — and a rebuilt page — restyle in real time. Then export DTCG tokens, CSS
          variables, or a Tailwind theme.
        </p>

        <form className="dx-form studio-form" onSubmit={onSubmit}>
          <span className="dx-form-prefix">https://</span>
          <label htmlFor="studio-url" className="visually-hidden">URL</label>
          <input
            id="studio-url"
            ref={inputRef}
            type="text"
            inputMode="url"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder="stripe.com"
            disabled={loading}
            className="dx-form-input"
          />
          <button type="submit" className="dx-form-submit" disabled={loading} aria-busy={loading}>
            {loading
              ? (<><span className="dx-spinner" aria-hidden /><span>Opening studio…</span></>)
              : (<><span>Open studio</span><span className="dx-form-kbd">↵</span></>)}
          </button>
        </form>

        <div className="dx-suggest">
          <span className="dx-suggest-label">try</span>
          {EXAMPLES.map((s) => (
            <button
              key={s}
              type="button"
              className="dx-chip"
              disabled={loading}
              onClick={() => { if (inputRef.current) inputRef.current.value = s; run(s); }}
            >
              {s}
            </button>
          ))}
        </div>

        {status === 'error' && (
          <p className="studio-error" role="alert">{errorMsg}</p>
        )}
      </section>

      <section className="studio-stage-shell">
        {status === 'idle' && (
          <div className="studio-empty">
            <p>Your editable studio appears here.</p>
            <ul>
              <li>Inspector with color pickers, type, shape, spacing &amp; motion</li>
              <li>Live <strong>WCAG contrast</strong> grading as you edit</li>
              <li>Component wall + a rebuilt page, paper / white / dark backdrops</li>
              <li>Export DTCG · CSS variables · Tailwind theme</li>
            </ul>
          </div>
        )}
        {loading && (
          <div className="studio-empty studio-loading">
            <span className="dx-spinner" aria-hidden />
            <p>Reading the design language off the live DOM…</p>
          </div>
        )}
        {status === 'done' && html && (
          <div className="studio-frame-wrap">
            <div className="studio-frame-bar">
              <span className="studio-frame-dot" /><span className="studio-frame-dot" /><span className="studio-frame-dot" />
              <span className="studio-frame-host">{host}</span>
              {docUrl && (
                <a className="studio-frame-pop" href={docUrl} target="_blank" rel="noreferrer">
                  Open full ↗
                </a>
              )}
            </div>
            <iframe
              className="studio-frame"
              title={`designlang studio — ${host || 'site'}`}
              srcDoc={html}
              sandbox="allow-scripts allow-downloads allow-popups allow-forms"
              allow="clipboard-write"
            />
          </div>
        )}
      </section>

      <style jsx>{`
        .studio-page { max-width: 1180px; margin: 0 auto; padding: var(--r7) var(--r4) var(--r8); }
        .studio-hero { padding-top: var(--r5); }
        .studio-eyebrow { font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--fg-3); margin-bottom: var(--r3); }
        .studio-title { font-size: clamp(34px, 6vw, 64px); letter-spacing: -0.03em; line-height: 1.03; margin: var(--r3) 0; color: var(--fg); }
        .studio-title :global(em) { font-family: var(--font-display); font-style: italic; color: var(--accent); }
        .studio-sub { max-width: 60ch; color: var(--fg-2); font-size: 17px; line-height: 1.55; margin-bottom: var(--r5); }
        .studio-form { margin-top: var(--r4); }
        .studio-error { margin-top: var(--r3); color: #ff6a52; font-size: 14px; }

        .studio-stage-shell { margin-top: var(--r6); }
        .studio-empty { border: 1px dashed var(--hairline-2); border-radius: var(--r4); padding: var(--r7) var(--r5); color: var(--fg-2); background: var(--surface); }
        .studio-empty p { font-size: 16px; color: var(--fg); margin-bottom: var(--r3); }
        .studio-empty ul { display: grid; gap: 8px; padding-left: 18px; color: var(--fg-2); font-size: 14px; }
        .studio-empty strong { color: var(--fg); }
        .studio-loading { display: flex; align-items: center; gap: var(--r3); text-align: left; }

        .studio-frame-wrap { border: 1px solid var(--hairline-2); border-radius: var(--r4); overflow: hidden; background: #14110e; box-shadow: 0 24px 80px -28px rgba(0,0,0,0.7); }
        .studio-frame-bar { display: flex; align-items: center; gap: 8px; padding: 10px 14px; background: #0c0c0c; border-bottom: 1px solid var(--hairline); }
        .studio-frame-dot { width: 10px; height: 10px; border-radius: 999px; background: var(--hairline-2); }
        .studio-frame-host { margin-left: 8px; font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; color: var(--fg-2); letter-spacing: 0.02em; }
        .studio-frame-pop { margin-left: auto; font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; color: var(--fg-2); text-decoration: none; border: 1px solid var(--hairline-2); padding: 4px 10px; border-radius: 999px; }
        .studio-frame-pop:hover { color: var(--fg); border-color: var(--accent); }
        .studio-frame { width: 100%; height: min(82vh, 920px); border: 0; display: block; background: #f3f1ea; }

        @media (max-width: 640px) { .studio-frame { height: 78vh; } }
      `}</style>
    </main>
  );
}
