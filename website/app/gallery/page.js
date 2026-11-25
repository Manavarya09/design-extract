import { listRecent } from '../../lib/cache';
import GalleryFeatured from './GalleryFeatured';

// Regenerated at most every 10 minutes (and exported as-is for the static site),
// instead of listing Blob storage on every visit.
export const revalidate = 600;

export const metadata = {
  title: 'Gallery — design systems extracted by designlang',
  description:
    'Dozens of real, browseable design-system extractions — Stripe, Linear, Vercel, Figma, Apple, Supabase, Raycast, Framer, Netflix, Discord, PostHog, Sentry, Retool and more — each graded on a real designlang run. Open the brand book (DTCG tokens, Tailwind, Figma variables) or watch any one get read live.',
  alternates: { canonical: 'https://designlang.app/gallery' },
  openGraph: { title: 'designlang gallery', description: 'Dozens of well-known design systems, graded on real runs — open the brand book or watch it read live.' },
};

const FEATURED = [
  { host: 'stripe.com',  slug: 'stripe-com',  primary: '#533afd', accent: '#e5edf5', bg: '#ffffff', grade: 'B',  tag: 'fintech' },
  { host: 'linear.app',  slug: 'linear-app',  primary: '#5e6ad2', accent: '#e4f222', bg: '#08090a', grade: 'A',  tag: 'dev tools' },
  { host: 'vercel.com',  slug: 'vercel-com',  primary: '#0068d6', accent: '#52aeff', bg: '#fafafa', grade: 'A',  tag: 'infra' },
  { host: 'notion.so',   slug: 'notion-so',   primary: '#455dd3', accent: '#0075de', bg: '#ffffff', grade: 'A-', tag: 'productivity' },
  { host: 'figma.com',   slug: 'figma-com',   primary: '#00b6ff', accent: '#e4ff97', bg: '#ffffff', grade: 'A',  tag: 'design' },
  { host: 'apple.com',   slug: 'apple-com',   primary: '#0071e3', accent: '#f5f5f7', bg: '#ffffff', grade: 'A+', tag: 'consumer' },
  { host: 'arc.net',     slug: 'arc-net',     primary: '#2702c2', accent: '#fffadd', bg: '#fffcec', grade: 'A',  tag: 'consumer' },
  { host: 'spotify.com', slug: 'spotify-com', primary: '#1ed760', accent: '#346e4a', bg: '#121212', grade: 'A-', tag: 'consumer' },
  { host: 'github.com',      slug: 'github-com',      primary: '#08872b', accent: '#f0f6fc', bg: '#0d1117', grade: 'A',  tag: 'dev tools' },
  { host: 'airbnb.com',      slug: 'airbnb-com',      primary: '#ff385c', accent: '#e00b41', bg: '#ffffff', grade: 'A-', tag: 'consumer' },
  { host: 'openai.com',      slug: 'openai-com',      primary: '#000000', accent: '#8e8ea0', bg: '#ffffff', grade: 'A',  tag: 'ai' },
  { host: 'tailwindcss.com', slug: 'tailwindcss-com', primary: '#0080ff', accent: '#ec0853', bg: '#ffffff', grade: 'A',  tag: 'dev tools' },
  { host: 'anthropic.com',   slug: 'anthropic-com',   primary: '#d97757', accent: '#141413', bg: '#faf9f5', grade: 'A',  tag: 'ai' },
  // ── v13 expansion — values harvested from real `designlang` runs ──
  { host: 'raycast.com',     slug: 'raycast-com',     primary: '#ff6363', accent: '#56c2ff', bg: '#07080a', grade: 'C', tag: 'dev tools', live: true },
  { host: 'supabase.com',    slug: 'supabase-com',    primary: '#72e3ad', accent: '#a9f1ca', bg: '#fcfcfc', grade: 'A', tag: 'infra', live: true },
  { host: 'framer.com',      slug: 'framer-com',      primary: '#0066ff', accent: '#0099ff', bg: '#000000', grade: 'C', tag: 'design', live: true },
  { host: 'resend.com',      slug: 'resend-com',      primary: '#d6ebfd', accent: '#44ffa4', bg: '#000000', grade: 'B', tag: 'dev tools', live: true },
  { host: 'clerk.com',       slug: 'clerk-com',       primary: '#6c47ff', accent: '#5de3ff', bg: '#f7f7f8', grade: 'B', tag: 'infra', live: true },
  { host: 'cal.com',         slug: 'cal-com',         primary: '#0000ee', accent: '#d6ecfe', bg: '#f4f4f4', grade: 'C', tag: 'productivity', live: true },
  { host: 'discord.com',     slug: 'discord-com',     primary: '#5865f2', accent: '#1a2081', bg: '#1a2081', grade: 'C', tag: 'consumer', live: true },
  { host: 'netflix.com',     slug: 'netflix-com',     primary: '#e50914', accent: '#e50914', bg: '#000000', grade: 'A', tag: 'consumer', live: true },
  { host: 'duolingo.com',    slug: 'duolingo-com',    primary: '#d7ffb8', accent: '#ddf4ff', bg: '#ffffff', grade: 'B', tag: 'consumer', live: true },
  { host: 'coinbase.com',    slug: 'coinbase-com',    primary: '#0000ee', accent: '#0000ee', bg: '#ffffff', grade: 'B', tag: 'fintech', live: true },
  { host: 'loom.com',        slug: 'loom-com',        primary: '#1868db', accent: '#e9f2fe', bg: '#ffffff', grade: 'B', tag: 'productivity', live: true },
  { host: 'webflow.com',     slug: 'webflow-com',     primary: '#146ef5', accent: '#3b82f6', bg: '#ffffff', grade: 'B', tag: 'design', live: true },
  { host: 'postman.com',     slug: 'postman-com',     primary: '#e05320', accent: '#ff6c37', bg: '#ffffff', grade: 'D', tag: 'dev tools', live: true },
  { host: 'replit.com',      slug: 'replit-com',      primary: '#0051c3', accent: '#521010', bg: '#ffffff', grade: 'B', tag: 'dev tools', live: true },
  { host: 'railway.app',     slug: 'railway-app',     primary: '#59497a', accent: '#1f132a', bg: '#13111c', grade: 'B', tag: 'infra', live: true },
  { host: 'render.com',      slug: 'render-com',      primary: '#8a05ff', accent: '#e0f4ff', bg: '#ffffff', grade: 'C', tag: 'infra', live: true },
  { host: 'mintlify.com',    slug: 'mintlify-com',    primary: '#faf8f5', accent: '#ff7a59', bg: '#f9f6f3', grade: 'A', tag: 'dev tools', live: true },
  { host: 'posthog.com',     slug: 'posthog-com',     primary: '#e1d7c2', accent: '#eeefe9', bg: '#e5e7e0', grade: 'B', tag: 'dev tools', live: true },
  { host: 'sentry.io',       slug: 'sentry-io',       primary: '#150f23', accent: '#2d2340', bg: '#1f1633', grade: 'B', tag: 'dev tools', live: true },
  { host: 'perplexity.ai',   slug: 'perplexity-ai',   primary: '#0000ee', accent: '#0000ee', bg: '#ffffff', grade: 'B', tag: 'ai', live: true },
  { host: 'ramp.com',        slug: 'ramp-com',        primary: '#000000', accent: '#000000', bg: '#ffffff', grade: 'B', tag: 'fintech', live: true },
  { host: 'retool.com',      slug: 'retool-com',      primary: '#e9ebdf', accent: '#f7f8f4', bg: '#151515', grade: 'A', tag: 'dev tools', live: true },
  { host: 'planetscale.com', slug: 'planetscale-com', primary: '#f2b600', accent: '#0b6ec5', bg: '#fafafa', grade: 'A', tag: 'infra', live: true },
  { host: 'v0.dev',          slug: 'v0-dev',          primary: '#d2d2d2', accent: '#d2d2d2', bg: '#f4f4f4', grade: 'A', tag: 'ai', live: true },
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
            Dozens of well-known design systems pulled with <code className="kbd">npx designlang &lt;host&gt;</code>{' '}
            — each graded on a real run. Click any card to open the actual brand book the CLI produced
            (colour, type, spacing, motion, anatomy, voice, a11y), or hit <strong>▶ watch</strong> to see
            it read live.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
            <h2 className="h2" style={{ fontSize: 28, margin: 0 }}>Featured.</h2>
            <span className="mono faint" style={{ fontSize: 12 }}>{FEATURED.length} brand books · graded · filter or watch any one</span>
          </header>
          <GalleryFeatured items={FEATURED} />
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
