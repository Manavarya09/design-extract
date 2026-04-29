import { listRecent } from '../../lib/cache';

export const dynamic = 'force-dynamic';
export const revalidate = 600; // 10 min — gallery shouldn't be hammered live

export const metadata = {
  title: 'Gallery — design systems extracted by designlang',
  description:
    'Public gallery of recent extractions. Every entry is a permalink: tap a card to read the DESIGN.md, browse DTCG tokens, copy the Tailwind config, or download the full bundle. $0, MIT, no signup.',
  alternates: { canonical: 'https://designlang.app/gallery' },
  openGraph: {
    title: 'designlang gallery',
    description: 'Recent extractions — every card is a shareable permalink.',
  },
};

function relTime(ms) {
  const s = Math.floor((Date.now() - ms) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

function host(url) {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return url; }
}

export default async function Gallery() {
  const entries = await listRecent(48);

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
            <a href="/features" style={{ borderBottom: 0 }}>Features</a>
            <a href="/spec" style={{ borderBottom: 0 }}>Spec</a>
            <a href="/vs/design-extractor" style={{ borderBottom: 0, color: 'var(--accent)' }}>vs</a>
          </nav>
        </div>
      </header>

      <section style={{ paddingBlock: 'var(--r7) var(--r6)' }}>
        <div className="section-label" style={{ marginBottom: 'var(--r5)' }}>
          <span>§ gallery</span>
        </div>
        <h1 className="display" style={{ fontSize: 'clamp(40px, 6vw, 72px)', letterSpacing: '-0.03em', lineHeight: 1.0 }}>
          Every extraction,<br />
          a <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>permalink</em>.
        </h1>
        <p className="prose" style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: '52ch', marginTop: 'var(--r4)' }}>
          A live feed of sites people have run through designlang. Each card opens a full
          shareable view — DESIGN.md, DTCG tokens, Tailwind, all 12 outputs, copy &amp; download.
        </p>
      </section>

      {entries.length === 0 ? (
        <div className="mono" style={{ padding: 'var(--r7) 0', color: 'var(--ink-3)', fontSize: 13, letterSpacing: '0.04em' }}>
          No recent extractions yet. <a href="/" style={{ color: 'var(--accent)' }}>Run the first one →</a>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 0,
            borderTop: 'var(--hair)',
            borderLeft: 'var(--hair)',
          }}
        >
          {entries.map((e) => (
            <a
              key={e.hash}
              href={`/x/${e.hash}`}
              style={{
                display: 'block',
                padding: 'var(--r4)',
                borderBottom: '1px solid var(--ink)',
                borderRight: '1px solid var(--ink)',
                borderBottom_: '1px solid var(--ink)',
                background: 'var(--paper)',
                color: 'var(--ink)',
                borderBottomStyle: 'solid',
                textDecoration: 'none',
              }}
            >
              {/* Palette strip — paints the card identity in 2s. */}
              <div style={{ display: 'flex', height: 56, marginBottom: 'var(--r3)', border: '1px solid var(--ink)' }}>
                {[e.primary, e.secondary, e.accent, e.foreground, e.background]
                  .filter(Boolean)
                  .map((c, i) => (
                    <div key={i} style={{ flex: 1, background: c }} />
                  ))}
              </div>
              <div className="display" style={{ fontSize: 18, letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: 4, wordBreak: 'break-word' }}>
                {host(e.url)}
              </div>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 'var(--r3)' }}>
                {[e.intent, e.material, e.library].filter((x) => x && x !== 'unknown').join(' · ') || '—'}
              </div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--ink-2)', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--paper-3)', paddingTop: 8 }}>
                <span>{e.colors} colors</span>
                <span style={{ color: 'var(--ink-3)' }}>{relTime(e.generatedAt)}</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </main>
  );
}
