'use client';

import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { theatreReducer, initialTheatreState } from '../../../lib/theatre-reducer.js';
import BrowserStage from './BrowserStage.js';
import SystemRail from './SystemRail.js';
import StageTicker from './StageTicker.js';
import ResultViewer from '../ResultViewer.js';
import ShareExtractionButton from '../ShareExtractionButton.js';

const STAGE_LABEL = {
  crawl: 'walking the DOM',
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

const SUGGESTIONS = ['stripe.com', 'linear.app', 'vercel.com', 'notion.so', 'figma.com'];

export default function Theatre({
  autoStart = null,
  live = false,
  compact = false,
  big = false,
  redirectOnSubmit = false,
}) {
  const [state, dispatch] = useReducer(theatreReducer, initialTheatreState);
  const [activeUrl, setActiveUrl] = useState(autoStart || '');
  const [rateLimitMsg, setRateLimitMsg] = useState(null);
  const [downloadBusy, setDownloadBusy] = useState(false);
  const inputRef = useRef(null);
  const runningRef = useRef(false);

  // When embedded on the homepage we don't run inline — submitting opens the
  // dedicated big /watch page. Elsewhere (the /watch page itself) we run here.
  const go = useCallback((rawUrl) => {
    const url = (rawUrl || '').trim();
    if (!url) return;
    if (redirectOnSubmit) {
      const full = url.startsWith('http') ? url : `https://${url}`;
      window.location.href = `/watch?u=${encodeURIComponent(full)}`;
      return;
    }
    run(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectOnSubmit]);

  const handleDownload = useCallback(async () => {
    if (!state.files || downloadBusy) return;
    setDownloadBusy(true);
    try {
      const { zipFilesToUrl } = await import('../../../lib/zip-files.js');
      const { url, filename } = await zipFilesToUrl(state.files, {
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
  }, [state.files, downloadBusy]);

  const run = useCallback(async (rawUrl, { replayOnly = false } = {}) => {
    const url = (rawUrl || '').trim();
    if (!url || runningRef.current) return;
    runningRef.current = true;
    setRateLimitMsg(null);
    setActiveUrl(url.startsWith('http') ? url : `https://${url}`);
    dispatch({ type: 'start' });

    let res;
    try {
      res = await fetch('/api/extract?theatre=1', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url, theatre: true, replayOnly }),
      });
    } catch {
      dispatch({ type: 'error', error: 'Network error — check your connection.' });
      runningRef.current = false;
      return;
    }

    if (!res.ok) {
      let body = null;
      try { body = await res.json(); } catch {}
      if (res.status === 429) setRateLimitMsg(body?.error || 'Free demo limit reached. Use the CLI for unlimited.');
      dispatch({ type: 'error', error: body?.error || 'Could not read that site. Try another URL.' });
      runningRef.current = false;
      return;
    }
    if (!res.body) {
      dispatch({ type: 'error', error: 'Your browser does not support streaming.' });
      runningRef.current = false;
      return;
    }

    const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
    let buffer = '';
    try {
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += value;
        let nl;
        while ((nl = buffer.indexOf('\n')) !== -1) {
          const line = buffer.slice(0, nl).trim();
          buffer = buffer.slice(nl + 1);
          if (line) {
            try { dispatch(JSON.parse(line)); } catch { /* partial line */ }
          }
        }
      }
      if (buffer.trim()) {
        try { dispatch(JSON.parse(buffer.trim())); } catch {}
      }
      dispatch({ type: 'end' });
    } catch {
      dispatch({ type: 'error', error: 'Stream interrupted. Try another URL.' });
    } finally {
      runningRef.current = false;
    }
  }, []);

  // Autoplay on mount. The homepage hero is replay-only (never launches a
  // browser); /watch passes `live` so a shared ?u= link runs a real extraction.
  useEffect(() => {
    if (autoStart) run(autoStart, { replayOnly: !live });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart, live]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    go(inputRef.current?.value || '');
  }, [go]);

  const streaming = state.status === 'streaming';
  const stageLabel = state.stage ? STAGE_LABEL[state.stage] || state.stage : null;

  return (
    <div className={`thtr ${compact ? 'is-compact' : ''} ${big ? 'is-big' : ''}`}>
      <form className="thtr-form" onSubmit={onSubmit}>
        <span className="thtr-form-prefix">https://</span>
        <input
          ref={inputRef}
          className="thtr-form-input"
          type="text"
          inputMode="url"
          placeholder="any-website.com"
          aria-label="Website URL to read"
          defaultValue=""
          disabled={streaming}
        />
        <button className="thtr-form-go" type="submit" disabled={streaming}>
          {streaming ? 'reading…' : 'watch it read'}
        </button>
      </form>

      <div className="thtr-suggest">
        {SUGGESTIONS.map((h) => (
          <button key={h} type="button" className="thtr-chip" disabled={streaming} onClick={() => go(h)}>
            {h}
          </button>
        ))}
      </div>

      {rateLimitMsg && <p className="thtr-note">{rateLimitMsg}</p>}
      {state.status === 'error' && !rateLimitMsg && <p className="thtr-note">{state.error}</p>}

      <div className="thtr-split">
        <BrowserStage
          url={activeUrl}
          frame={state.frame}
          status={state.status}
          cached={state.cached}
          stageLabel={stageLabel}
        />
        <SystemRail
          swatches={state.swatches}
          fontSample={state.fontSample}
          dimensions={state.dimensions}
          summary={state.summary}
        />
      </div>

      <StageTicker stage={state.stage} stagesSeen={state.stagesSeen} />

      {(live || big) && state.status === 'done' && state.files && (
        <div className="thtr-output">
          <div className="thtr-output-head">
            <h3 className="thtr-output-title">Everything it extracted from {hostOf(activeUrl)}</h3>
            <div className="thtr-actions">
              {state.hash && <ShareExtractionButton url={activeUrl} hash={state.hash} summary={state.summary} files={state.files} />}
            </div>
          </div>
          <ResultViewer files={state.files} onDownloadZip={handleDownload} downloadBusy={downloadBusy} />
        </div>
      )}
    </div>
  );
}

function hostOf(url) {
  try {
    return new URL(url.startsWith('http') ? url : `https://${url}`).hostname.replace(/^www\./, '');
  } catch {
    return 'the site';
  }
}
