'use client';

import { useCallback, useState } from 'react';
import ResultViewer from '../../components/ResultViewer';

export default function PermalinkViewer({ hash, url, title, summary, files }) {
  const [zipBusy, setZipBusy] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const handleDownloadZip = useCallback(async () => {
    setZipBusy(true);
    try {
      const { zipFilesToUrl } = await import('../../../lib/zip-files');
      const { url: blobUrl, filename } = await zipFilesToUrl(files, {
        name: `designlang-${hash.slice(0, 8)}`,
      });
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      a.click();
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    } finally { setZipBusy(false); }
  }, [files, hash]);

  const sharePermalink = useCallback(async () => {
    if (typeof window === 'undefined') return;
    const link = `${window.location.origin}/x/${hash}`;
    try {
      await navigator.clipboard.writeText(link);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 1500);
    } catch {/* ignore */}
  }, [hash]);

  return (
    <main className="page" style={{ paddingBottom: 'var(--r9)' }}>
      <header style={{ paddingTop: 'var(--r4)', paddingBottom: 'var(--r5)' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: 'var(--r5)',
            borderBottom: 'var(--hair)',
            paddingBottom: 'var(--r3)',
          }}
        >
          <a href="/" className="mono" style={{ fontSize: 13, letterSpacing: '0.02em', borderBottom: 0, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mark.svg" alt="" width={22} height={22} style={{ display: 'block' }} />
            designlang <span style={{ color: 'var(--ink-3)', marginLeft: 12 }}>v12.1</span>
          </a>
          <nav className="mono" style={{ display: 'flex', gap: 'var(--r5)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            <a href="/" style={{ borderBottom: 0 }}>Home</a>
            <a href="/gallery" style={{ borderBottom: 0 }}>Gallery</a>
            <a href="/spec" style={{ borderBottom: 0 }}>Spec</a>
            <a href="/features" style={{ borderBottom: 0 }}>Features</a>
            <a href="/vs/design-extractor" style={{ borderBottom: 0, color: 'var(--accent)' }}>vs</a>
          </nav>
        </div>
      </header>

      <section style={{ paddingBlock: 'var(--r6) var(--r5)' }}>
        <div className="section-label" style={{ marginBottom: 'var(--r4)' }}>
          <span>§ permalink — /x/{hash.slice(0, 8)}</span>
        </div>
        <h1 className="display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: 'var(--r3)', wordBreak: 'break-word' }}>
          {title}
        </h1>
        <p className="mono" style={{ fontSize: 12, color: 'var(--ink-3)', letterSpacing: '0.04em', marginBottom: 'var(--r4)', wordBreak: 'break-all' }}>
          {url}
        </p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={sharePermalink}
            className="cta"
            style={{ background: 'var(--paper)', color: 'var(--ink)', border: '1px solid var(--ink)', boxShadow: 'none' }}
          >
            {shareCopied ? 'Link copied' : 'Copy permalink'}
          </button>
          <a className="cta" href="/" style={{ background: 'transparent', color: 'var(--ink)', border: '1px solid var(--ink)', boxShadow: 'none', borderBottom: 'none' }}>
            Extract another →
          </a>
        </div>

        {/* Stat strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: 'var(--r5)',
            borderTop: 'var(--hair)',
            borderBottom: 'var(--hair)',
            marginTop: 'var(--r6)',
            padding: 'var(--r5) 0',
          }}
        >
          <Numeral value={summary.colors} label="colors" />
          <Numeral value={summary.spacingCount} label="spacing" />
          <Numeral value={summary.shadowCount} label="shadows" />
          <Numeral value={summary.componentCount} label="components" />
          <Numeral
            value={summary.score?.overall ?? '—'}
            label={`score ${summary.score?.grade ? `(${summary.score.grade})` : ''}`}
          />
        </div>
      </section>

      <ResultViewer files={files} onDownloadZip={handleDownloadZip} downloadBusy={zipBusy} />
    </main>
  );
}

function Numeral({ value, label }) {
  return (
    <div>
      <div className="display" style={{ fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1 }}>
        {value}
      </div>
      <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 6, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        {label}
      </div>
    </div>
  );
}
