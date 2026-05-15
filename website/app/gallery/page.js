import { listRecent } from '../../lib/cache';

export const dynamic = 'force-dynamic';
export const revalidate = 600;

export const metadata = {
  title: 'Gallery — design systems extracted by designlang',
  description:
    'Real, browseable extractions of stripe.com, linear.app, vercel.com, notion.so, figma.com, apple.com, arc.net, spotify.com plus every recent run. Each card opens the full brand book — DTCG tokens, Tailwind config, Figma variables, downloads.',
  alternates: { canonical: 'https://designlang.app/gallery' },
  openGraph: { title: 'designlang gallery', description: 'Real extractions of well-known design systems — every card opens the brand book.' },
};

const FEATURED = [
  { host: 'stripe.com',  slug: 'stripe-com',  primary: '#533afd', accent: '#e5edf5', bg: '#ffffff', grade: 'B'  },
  { host: 'linear.app',  slug: 'linear-app',  primary: '#5e6ad2', accent: '#e4f222', bg: '#08090a', grade: 'A'  },
  { host: 'vercel.com',  slug: 'vercel-com',  primary: '#0068d6', accent: '#52aeff', bg: '#fafafa', grade: 'A'  },
  { host: 'notion.so',   slug: 'notion-so',   primary: '#455dd3', accent: '#0075de', bg: '#ffffff', grade: 'A-' },
  { host: 'figma.com',   slug: 'figma-com',   primary: '#00b6ff', accent: '#e4ff97', bg: '#ffffff', grade: 'A'  },
  { host: 'apple.com',   slug: 'apple-com',   primary: '#0071e3', accent: '#f5f5f7', bg: '#ffffff', grade: 'A+' },
  { host: 'arc.net',     slug: 'arc-net',     primary: '#2702c2', accent: '#fffadd', bg: '#fffcec', grade: 'A'  },
  { host: 'spotify.com', slug: 'spotify-com', primary: '#1ed760', accent: '#346e4a', bg: '#121212', grade: 'A-' },
];

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
  let entries = [];
  try { entries = await listRecent(48); } catch { entries = []; }

  return (
    <main>
      <section className="section" style={{ paddingTop: 64, paddingBottom: 32 }}>
        <div className="wrap">
          <p className="eyebrow">gallery</p>
          <h1 className="h1" style={{ fontSize: 'clamp(40px, 5.5vw, 64px)', maxWidth: '14ch' }}>
            Real extractions, on this site.
          </h1>
          <p className="lede" style={{ marginTop: 20 }}>
            Eight well-known design systems pulled with <code className="kbd">npx designlang &lt;host&gt;</code>{' '}
            and committed to this repo. Click any card to open the actual brand book the CLI produced —
            colour, typography, spacing, motion, anatomy, voice, accessibility, the lot.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
            <h2 className="h2" style={{ fontSize: 28, margin: 0 }}>Featured.</h2>
            <span className="mono faint" style={{ fontSize: 12 }}>{FEATURED.length} brand books · pre-rendered</span>
          </header>
          <div className="gallery-grid">
            {FEATURED.map(g => (
              <a
                key={g.host}
                href={`/gallery/${g.slug}`}
                className="gal-card gal-real"
              >
                <div
                  className="gal-swatch"
                  style={{ background: `linear-gradient(135deg, ${g.primary} 0%, ${g.accent} 65%, ${g.bg === '#ffffff' ? '#1a1a1a' : g.bg} 100%)` }}
                />
                <div className="gal-logo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://icon.horse/icon/${g.host}`} alt="" loading="lazy" width={64} height={64} />
                </div>
                <div className="gal-meta">
                  <span className="gal-host">{g.host}</span>
                  <span className="gal-grade">brand book ↗</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
            <h2 className="h2" style={{ fontSize: 28, margin: 0 }}>Recent runs.</h2>
            <span className="mono faint" style={{ fontSize: 12 }}>
              {entries.length > 0 ? `${entries.length} extractions · live cache` : 'live cache · waiting for runs'}
            </span>
          </header>
          {entries.length === 0 ? (
            <div className="card" style={{ padding: '36px 32px', textAlign: 'center' }}>
              <p className="lede" style={{ margin: '0 auto 18px' }}>
                Nothing in the live cache yet. Run an extraction from the homepage to add the first one.
              </p>
              <a href="/#extract" className="btn btn-primary">Run an extraction</a>
            </div>
          ) : (
            <div className="gallery-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
              {entries.map((e) => {
                const palette = [e.primary, e.secondary, e.accent, e.foreground, e.background].filter(Boolean);
                const a = palette[0] || '#7f1d1d';
                const b = palette[palette.length - 1] || '#000';
                return (
                  <a key={e.hash} href={`/x/${e.hash}`} className="gal-card" style={{ aspectRatio: 'auto', display: 'block' }}>
                    <div style={{ display: 'flex', height: 110 }}>
                      {palette.length > 0
                        ? palette.map((c, i) => <div key={i} style={{ flex: 1, background: c }} />)
                        : <div style={{ flex: 1, background: `linear-gradient(135deg, ${a}, ${b})` }} />}
                    </div>
                    <div style={{ padding: '14px 16px 16px' }}>
                      <div className="h3" style={{ fontSize: 16, marginBottom: 4 }}>{host(e.url)}</div>
                      <div className="mono faint" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
                        {[e.intent, e.material, e.library].filter((x) => x && x !== 'unknown').join(' · ') || '—'}
                      </div>
                      <div className="mono" style={{ fontSize: 11, color: 'var(--fg-2)', display: 'flex', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid var(--hairline)' }}>
                        <span>{e.colors} colors</span>
                        <span className="faint">{relTime(e.generatedAt)}</span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
