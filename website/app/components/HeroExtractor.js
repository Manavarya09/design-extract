'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Marginalia from './Marginalia';
import ResultViewer from './ResultViewer';
import ShareExtractionButton from './ShareExtractionButton';

const STAGE_LABEL = {
  crawl: 'walking DOM',
  colors: 'resolving palette',
  typography: 'reading type',
  spacing: 'measuring rhythm',
  shadows: 'catching shadows',
  borders: 'tracing radii',
  components: 'clustering components',
  regions: 'naming regions',
  a11y: 'auditing contrast',
  score: 'scoring system',
};

const MAX_SWATCHES = 24;
const MAX_DIMENSIONS = 12;

export default function HeroExtractor() {
  const [status, setStatus] = useState('idle'); // idle | streaming | done | error
  const [stage, setStage] = useState(null);
  const [cached, setCached] = useState(false);
  const [swatches, setSwatches] = useState([]);
  const [fontSample, setFontSample] = useState(null);
  const [dimensions, setDimensions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [files, setFiles] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [rateLimitMsg, setRateLimitMsg] = useState(null);
  const [downloadBusy, setDownloadBusy] = useState(false);
  const inputRef = useRef(null);

  // Accept ?url= query param (Chrome extension handoff, deep links). Only
  // applied once on mount; the extension prefills the input and the user still
  // controls submission.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const incoming = params.get('url');
    if (!incoming || !inputRef.current) return;
    try {
      const parsed = new URL(incoming);
      if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
        inputRef.current.value = parsed.toString();
      }
    } catch {
      // Ignore malformed URLs silently — user still sees the default placeholder.
    }
  }, []);

  const reset = useCallback(() => {
    setStage(null);
    setCached(false);
    setSwatches([]);
    setFontSample(null);
    setDimensions([]);
    setSummary(null);
    setFiles(null);
    setErrorMsg(null);
    setRateLimitMsg(null);
  }, []);

  const handleEvent = useCallback((event) => {
    switch (event.type) {
      case 'cache':
        setCached(true);
        break;
      case 'permalink': {
        // Rewrite the URL bar so a refresh / share lands on /x/<hash>.
        // history.replaceState avoids a Next router navigation (we want to keep
        // the live extraction state, just change the URL).
        if (typeof window !== 'undefined' && event.hash) {
          try { window.history.replaceState({}, '', `/x/${event.hash}`); } catch {}
        }
        break;
      }
      case 'stage':
        setStage(event.name);
        break;
      case 'token': {
        if (event.$type === 'color' && typeof event.value === 'string' && event.value.startsWith('#')) {
          setSwatches((prev) => {
            if (prev.length >= MAX_SWATCHES) return prev;
            if (prev.some((s) => s.path === event.path)) return prev;
            return [...prev, { path: event.path, hex: event.value }];
          });
        } else if (event.$type === 'fontFamily' && typeof event.value === 'string') {
          setFontSample((prev) => prev || event.value);
        } else if (event.$type === 'dimension' && typeof event.value === 'string') {
          const px = parseFloat(event.value);
          if (!Number.isNaN(px)) {
            setDimensions((prev) => {
              if (prev.length >= MAX_DIMENSIONS) return prev;
              return [...prev, { path: event.path, px, raw: event.value }];
            });
          }
        }
        break;
      }
      case 'summary':
        setSummary(event.summary);
        break;
      case 'files':
        setFiles(event.files);
        setStatus('done');
        break;
      case 'error':
        setErrorMsg(event.error || 'Extraction failed');
        setStatus('error');
        break;
    }
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (status === 'streaming') return;
    reset();
    setStatus('streaming');

    const url = inputRef.current?.value?.trim() || '';
    let res;
    try {
      res = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url }),
      });
    } catch (err) {
      setErrorMsg('Network error — check your connection.');
      setStatus('error');
      return;
    }

    if (!res.ok) {
      let body = null;
      try { body = await res.json(); } catch {}
      if (res.status === 429) {
        setRateLimitMsg(body?.error || 'Rate limit reached. Try again in 24h.');
      } else if (res.status === 400) {
        setErrorMsg(body?.error || 'Invalid URL.');
      } else {
        setErrorMsg(body?.error || 'Extraction failed. Try another URL.');
      }
      setStatus('error');
      return;
    }

    if (!res.body) {
      setErrorMsg('Browser does not support streaming responses.');
      setStatus('error');
      return;
    }

    const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
    let buffer = '';
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += value;
        let nl;
        while ((nl = buffer.indexOf('\n')) !== -1) {
          const line = buffer.slice(0, nl).trim();
          buffer = buffer.slice(nl + 1);
          if (!line) continue;
          try {
            handleEvent(JSON.parse(line));
          } catch {
            // Ignore partial / malformed lines — defensive only.
          }
        }
      }
      if (buffer.trim()) {
        try { handleEvent(JSON.parse(buffer.trim())); } catch {}
      }
    } catch (err) {
      setErrorMsg('Stream interrupted. Try another URL.');
      setStatus('error');
    }
  }, [status, handleEvent, reset]);

  const handleDownload = useCallback(async () => {
    if (!files || downloadBusy) return;
    setDownloadBusy(true);
    try {
      const { zipFilesToUrl } = await import('../../lib/zip-files.js');
      const { url, filename } = await zipFilesToUrl(files, {
        name: `designlang-${new Date().toISOString().slice(0, 10)}`,
      });
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } finally {
      setDownloadBusy(false);
    }
  }, [files, downloadBusy]);

  const stageLabel = stage ? STAGE_LABEL[stage] || stage : null;
  const streaming = status === 'streaming';
  const disabled = streaming;

  const SUGGESTIONS = ['stripe.com', 'linear.app', 'vercel.com', 'notion.so', 'figma.com'];
  const setUrl = (host) => { if (inputRef.current) inputRef.current.value = `https://${host}`; };

  return (
    <>
      <div className="dx-shell">
        <form className="dx-form" onSubmit={handleSubmit}>
          <span className="dx-form-prefix">https://</span>
          <label htmlFor="url" className="visually-hidden">URL</label>
          <input
            id="url"
            ref={inputRef}
            name="url"
            type="text"
            placeholder="stripe.com"
            defaultValue="stripe.com"
            disabled={disabled}
            className="dx-form-input"
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
          />
          <button type="submit" className="dx-form-submit" disabled={disabled} aria-busy={streaming}>
            {streaming ? (
              <>
                <span className="dx-spinner" aria-hidden />
                <span>Extracting…</span>
              </>
            ) : (
              <>
                <span>Extract</span>
                <span className="dx-form-kbd">↵</span>
              </>
            )}
          </button>
        </form>

        <div className="dx-suggest">
          <span className="dx-suggest-label">try</span>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              className="dx-chip"
              disabled={disabled}
              onClick={() => setUrl(s)}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="dx-status">
          <span className={`dx-status-tag dx-status-${status}`}>
            {status === 'idle' && 'IDLE'}
            {streaming && 'STREAMING'}
            {status === 'done' && (cached ? 'DONE / CACHED' : 'DONE')}
            {status === 'error' && 'HALTED'}
          </span>
          <span className="dx-status-text mono">
            {status === 'idle' && 'paste a URL above'}
            {streaming && (stageLabel || 'opening stream…')}
            {status === 'done' && 'extraction complete'}
            {status === 'error' && 'try another URL'}
          </span>
          <span className="dx-status-meta mono">free demo · 1 / day · unlimited via CLI</span>
        </div>

        {errorMsg && (
          <p className="dx-alert mono" role="alert">
            {errorMsg}
            {status === 'error' && (
              <button type="button" className="dx-alert-action" onClick={reset}>retry</button>
            )}
          </p>
        )}
        {rateLimitMsg && <p className="dx-alert mono" role="alert">{rateLimitMsg}</p>}
      </div>

      {(swatches.length > 0 || fontSample || dimensions.length > 0 || summary) && (
        <div className="dx-paint">
          {swatches.length > 0 && (
            <section className="dx-panel">
              <header className="dx-panel-head">
                <span>palette</span>
                <span className="mono">{swatches.length} colors</span>
              </header>
              <div className="dx-swatches">
                {swatches.map((s, i) => (
                  <div key={s.path} className="dx-swatch" style={{ animationDelay: `${i * 40}ms` }}>
                    <div className="dx-swatch-chip" style={{ background: s.hex }} />
                    <div className="dx-swatch-hex mono">{s.hex}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
          {fontSample && (
            <section className="dx-panel">
              <header className="dx-panel-head"><span>typography</span><span className="mono">{fontSample}</span></header>
              <div className="dx-type" style={{ fontFamily: `${fontSample}, system-ui, sans-serif` }}>Aa Bb Cc 123</div>
            </section>
          )}
          {dimensions.length > 0 && (
            <section className="dx-panel">
              <header className="dx-panel-head"><span>scale</span><span className="mono">{dimensions.length} steps</span></header>
              <div className="dx-bars">
                {dimensions.map((d, i) => (
                  <div
                    key={d.path}
                    title={`${d.path} — ${d.raw}`}
                    className="dx-bar"
                    style={{ height: Math.min(Math.max(d.px, 4), 120), animationDelay: `${i * 30}ms` }}
                  />
                ))}
              </div>
            </section>
          )}
          {summary && (
            <section className="dx-panel dx-summary">
              <header className="dx-panel-head"><span>summary</span><span className="mono">live</span></header>
              <div className="dx-summary-grid">
                <Numeral value={summary.colors} label="colors" />
                <Numeral value={summary.spacingCount} label="spacing" />
                <Numeral value={summary.shadowCount} label="shadows" />
                <Numeral value={summary.componentCount} label="components" />
                <Numeral value={summary.score?.overall ?? '—'} label={`score ${summary.score?.grade ? `(${summary.score.grade})` : ''}`} />
              </div>
            </section>
          )}
        </div>
      )}

      {files && (
        <ResultViewer
          files={files}
          onDownloadZip={handleDownload}
          downloadBusy={downloadBusy}
        />
      )}

      {status === 'done' && (
        <div style={{ marginTop: 18, paddingTop: 14, borderTop: '1px solid var(--hairline)' }}>
          <ShareExtractionButton
            url={inputRef.current?.value || ''}
            hash={typeof window !== 'undefined' ? window.location.pathname.match(/^\/x\/([\w-]+)/)?.[1] : null}
            summary={summary}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes designlang-fade-in {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>
    </>
  );
}

function Numeral({ value, label }) {
  return (
    <div className="dx-num">
      <div className="dx-num-value">{value}</div>
      <div className="dx-num-label mono">{label}</div>
    </div>
  );
}
