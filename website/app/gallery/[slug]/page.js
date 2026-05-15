import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { notFound } from 'next/navigation';
import GalleryTabs from './GalleryTabs';

export const revalidate = 86400;
export const dynamic = 'force-static';

const FEATURED = {
  'stripe-com':  { host: 'stripe.com'  },
  'linear-app':  { host: 'linear.app'  },
  'vercel-com':  { host: 'vercel.com'  },
  'notion-so':   { host: 'notion.so'   },
  'figma-com':   { host: 'figma.com'   },
  'apple-com':   { host: 'apple.com'   },
  'arc-net':     { host: 'arc.net'     },
  'spotify-com': { host: 'spotify.com' },
};

export function generateStaticParams() {
  return Object.keys(FEATURED).map((slug) => ({ slug }));
}

function galleryDirs(slug) {
  // Cover every plausible cwd: Vercel build (website), local dev started from
  // the website folder, and dev started from the repo root or one level up.
  return [
    join(process.cwd(), 'public', 'gallery', slug),
    join(process.cwd(), 'website', 'public', 'gallery', slug),
    join(process.cwd(), 'design-extract', 'website', 'public', 'gallery', slug),
  ];
}

async function findFile(slug, suffix) {
  for (const d of galleryDirs(slug)) {
    try {
      const files = await readdir(d);
      const hit = files.find((f) => f.endsWith(suffix));
      if (hit) return await readFile(join(d, hit), 'utf-8');
    } catch { /* try next */ }
  }
  return null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const meta = FEATURED[slug];
  if (!meta) return { title: 'Brand not found — designlang' };
  const host = meta.host;
  return {
    title: `${host} design system — extracted by designlang`,
    description: `${host} design system: every colour, font, spacing token, shadow, radius, motion curve, anatomy and brand voice — extracted with one command. DTCG tokens, Tailwind config, Figma variables, brand-book PDF, all on one page. The open-source alternative to design-extractor.com.`,
    alternates: { canonical: `https://designlang.app/gallery/${slug}` },
    openGraph: {
      title: `${host} design system — designlang`,
      description: `Real extraction of ${host}: tokens, typography, spacing, motion, anatomy, voice, brand-book PDF.`,
    },
  };
}

function pickPalette(tokens) {
  // Walk the DTCG tree and pick all primitive colour leafs.
  const out = [];
  const walk = (node, path) => {
    if (!node || typeof node !== 'object') return;
    if (node.$value && node.$type === 'color' && typeof node.$value === 'string' && node.$value.startsWith('#')) {
      out.push({ path, hex: node.$value });
      return;
    }
    for (const k of Object.keys(node)) {
      if (k.startsWith('$')) continue;
      walk(node[k], path ? `${path}.${k}` : k);
    }
  };
  walk(tokens?.primitive?.color, 'primitive.color');
  // dedupe by hex
  const seen = new Set();
  return out.filter(({ hex }) => {
    const k = hex.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  }).slice(0, 18);
}

function pickRadii(tokens) {
  const out = [];
  const walk = (node, path) => {
    if (!node || typeof node !== 'object') return;
    if (node.$value !== undefined && (node.$type === 'dimension' || node.$type === undefined)) {
      out.push({ path, value: String(node.$value) });
      return;
    }
    for (const k of Object.keys(node)) { if (!k.startsWith('$')) walk(node[k], path ? `${path}.${k}` : k); }
  };
  walk(tokens?.primitive?.radius, '');
  return out;
}

function pickSpacing(tokens) {
  const out = [];
  const walk = (node, path) => {
    if (!node || typeof node !== 'object') return;
    if (node.$value !== undefined) { out.push({ path, value: String(node.$value) }); return; }
    for (const k of Object.keys(node)) { if (!k.startsWith('$')) walk(node[k], path ? `${path}.${k}` : k); }
  };
  walk(tokens?.primitive?.spacing, '');
  return out.slice(0, 12);
}

function pickFont(tokens) {
  const f = tokens?.primitive?.fontFamily;
  if (!f) return null;
  for (const k of Object.keys(f || {})) {
    if (f[k]?.$value) return { name: k, value: f[k].$value };
  }
  return null;
}

export default async function GalleryBrandPage({ params }) {
  const { slug } = await params;
  const meta = FEATURED[slug];
  if (!meta) notFound();

  const [tokensRaw, designMd, voiceRaw, motionRaw, intentRaw, tailwindCfg, cssVars] = await Promise.all([
    findFile(slug, '-design-tokens.json'),
    findFile(slug, '-DESIGN.md'),
    findFile(slug, '-voice.json'),
    findFile(slug, '-motion-tokens.json'),
    findFile(slug, '-intent.json'),
    findFile(slug, '-tailwind.config.js'),
    findFile(slug, '-variables.css'),
  ]);

  const tokens = tokensRaw ? JSON.parse(tokensRaw) : null;
  const voice  = voiceRaw  ? JSON.parse(voiceRaw)  : null;
  const motion = motionRaw ? JSON.parse(motionRaw) : null;
  const intent = intentRaw ? JSON.parse(intentRaw) : null;

  const palette = pickPalette(tokens);
  const radii   = pickRadii(tokens);
  const spacing = pickSpacing(tokens);
  const font    = pickFont(tokens);

  const host = meta.host;
  const url = `https://${host}`;
  const primary = palette[0]?.hex || '#7f1d1d';
  const accent  = palette[1]?.hex || '#dc2626';

  return (
    <main>
      {/* Hero with extracted-brand-tinted gradient */}
      <section className="gb-hero">
        <div
          className="gb-hero-bg"
          aria-hidden
          style={{ background: `linear-gradient(135deg, ${primary} 0%, ${accent} 60%, #050505 100%)` }}
        />
        <div className="wrap gb-hero-inner">
          <a href="/gallery" className="gb-back mono">← Gallery</a>
          <div className="gb-hero-row">
            <div className="gb-hero-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://icon.horse/icon/${host}`} alt="" width={72} height={72} />
            </div>
            <div className="gb-hero-text">
              <p className="eyebrow" style={{ marginBottom: 8 }}>extracted · {new Date().toISOString().slice(0, 10)}</p>
              <h1 className="h1 gb-hero-h1">{host}</h1>
              <p className="lede" style={{ marginTop: 10 }}>
                Live extraction of{' '}
                <a href={url} target="_blank" rel="noreferrer" style={{ color: 'var(--red-3)' }}>{url}</a>{' '}
                — every colour, font, spacing token, shadow, radius, motion curve, anatomy and brand voice. Generated with one command.
              </p>
              <div className="row" style={{ marginTop: 20, gap: 10, flexWrap: 'wrap' }}>
                <a href={`/gallery/${slug}/brand.html`} target="_blank" rel="noreferrer" className="btn btn-primary">Open brand book ↗</a>
                <a href="#tokens" className="btn btn-ghost">Browse tokens</a>
                <a href={`/api/extract`} className="btn btn-ghost" style={{ display: 'none' }}>Re-extract</a>
              </div>
            </div>
            <div className="gb-hero-stats">
              {intent?.intent && <div className="gb-stat"><span className="gb-stat-num">{intent.intent}</span><span className="gb-stat-label">intent</span></div>}
              {intent?.material && <div className="gb-stat"><span className="gb-stat-num">{intent.material}</span><span className="gb-stat-label">material</span></div>}
              <div className="gb-stat"><span className="gb-stat-num">{palette.length}</span><span className="gb-stat-label">colors</span></div>
              {font && <div className="gb-stat"><span className="gb-stat-num" style={{ fontFamily: `${font.value}, system-ui` }}>Aa</span><span className="gb-stat-label">{font.name}</span></div>}
            </div>
          </div>
        </div>
      </section>

      {/* Two-column body: palette + tabbed code */}
      <section className="section gb-body" id="tokens">
        <div className="wrap gb-grid">
          {/* Left: palette + radii + spacing */}
          <aside className="gb-side">
            <header className="gb-side-head">
              <h2 className="h3" style={{ margin: 0 }}>Palette</h2>
              <span className="mono faint" style={{ fontSize: 11 }}>{palette.length} colors</span>
            </header>
            <div className="gb-swatches">
              {palette.map((c, i) => (
                <div key={c.hex + i} className="gb-swatch" title={c.path}>
                  <div className="gb-swatch-chip" style={{ background: c.hex }} />
                  <div className="gb-swatch-meta">
                    <span className="mono">color-{i + 1}</span>
                    <span className="mono faint">{c.hex}</span>
                  </div>
                </div>
              ))}
            </div>

            {radii.length > 0 && (
              <>
                <header className="gb-side-head" style={{ marginTop: 28 }}>
                  <h2 className="h3" style={{ margin: 0 }}>Radii</h2>
                  <span className="mono faint" style={{ fontSize: 11 }}>{radii.length} steps</span>
                </header>
                <div className="gb-radii">
                  {radii.map((r, i) => {
                    const px = parseFloat(r.value) || 0;
                    return (
                      <div key={i} className="gb-radius">
                        <div className="gb-radius-tile" style={{ borderRadius: Math.min(px, 32) }} />
                        <span className="mono">{r.path.split('.').pop()}</span>
                        <span className="mono faint">{r.value}px</span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {spacing.length > 0 && (
              <>
                <header className="gb-side-head" style={{ marginTop: 28 }}>
                  <h2 className="h3" style={{ margin: 0 }}>Spacing</h2>
                  <span className="mono faint" style={{ fontSize: 11 }}>{spacing.length} steps</span>
                </header>
                <div className="gb-spacing">
                  {spacing.map((s, i) => {
                    const px = parseFloat(s.value) || 0;
                    return (
                      <div key={i} className="gb-spacing-row">
                        <span className="mono" style={{ width: 80, color: 'var(--fg-3)' }}>{s.path.split('.').pop()}</span>
                        <span className="gb-spacing-bar" style={{ width: Math.min(px * 2, 220), background: primary }} />
                        <span className="mono faint" style={{ width: 50, textAlign: 'right' }}>{s.value}px</span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </aside>

          {/* Right: tabbed source viewer (client) */}
          <div className="gb-main">
            <GalleryTabs
              host={host}
              slug={slug}
              designMd={designMd || ''}
              tailwindCfg={tailwindCfg || ''}
              cssVars={cssVars || ''}
              tokensJson={tokensRaw || ''}
            />
          </div>
        </div>
      </section>

      {/* Typography */}
      {font && (
        <section className="section gb-typo" style={{ paddingTop: 32 }}>
          <div className="wrap">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 22, flexWrap: 'wrap', gap: 10 }}>
              <h2 className="h2" style={{ fontSize: 28, margin: 0 }}>Typography</h2>
              <span className="mono faint" style={{ fontSize: 12 }}>{font.value}</span>
            </header>
            <div className="card" style={{ padding: '32px 36px' }}>
              {[
                { size: 56, weight: 600, lh: 1.05, label: 'display · 56px / 600' },
                { size: 36, weight: 500, lh: 1.15, label: 'headline · 36px / 500' },
                { size: 22, weight: 400, lh: 1.35, label: 'subhead · 22px / 400' },
                { size: 16, weight: 400, lh: 1.55, label: 'body · 16px / 400' },
                { size: 12, weight: 500, lh: 1.4,  label: 'caption · 12px / 500 · uppercase', upper: true },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 24, padding: '14px 0', borderBottom: '1px solid var(--hairline)' }}>
                  <div style={{ fontFamily: `${font.value}, system-ui, sans-serif`, fontSize: row.size, fontWeight: row.weight, lineHeight: row.lh, color: '#fff', letterSpacing: row.size > 30 ? '-0.02em' : 'normal', textTransform: row.upper ? 'uppercase' : 'none' }}>
                    The quick brown fox jumps
                  </div>
                  <span className="mono faint" style={{ fontSize: 11, marginLeft: 'auto', whiteSpace: 'nowrap' }}>{row.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Voice */}
      {Array.isArray(voice?.headlines) && voice.headlines.length > 0 && (
        <section className="section" style={{ paddingTop: 32 }}>
          <div className="wrap">
            <h2 className="h2" style={{ fontSize: 28, marginBottom: 8 }}>Voice</h2>
            <p className="lede" style={{ marginBottom: 22 }}>Real headlines pulled from the live page.</p>
            <div className="grid-3">
              {voice.headlines.slice(0, 6).map((q, i) => (
                <blockquote key={i} className="voice-quote" style={{ borderLeftColor: primary, fontSize: 16 }}>
                  &ldquo;{String(q).slice(0, 160)}&rdquo;
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Motion */}
      {motion && (
        <section className="section" style={{ paddingTop: 32 }}>
          <div className="wrap">
            <h2 className="h2" style={{ fontSize: 28, marginBottom: 8 }}>Motion</h2>
            <p className="lede" style={{ marginBottom: 22 }}>Durations and easing curves captured live.</p>
            <pre className="mcp-snippet" style={{ maxWidth: 760 }}>{JSON.stringify(motion, null, 2).slice(0, 1200)}</pre>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="section">
        <div className="wrap" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="card" style={{ maxWidth: 720, width: '100%', padding: '32px 32px', textAlign: 'center' }}>
            <h2 className="h2" style={{ fontSize: 28, marginBottom: 8 }}>Run designlang on your own URL.</h2>
            <p className="lede" style={{ margin: '0 auto 18px' }}>
              Same depth as the {host} extraction above. No signup, no API key.
            </p>
            <div className="row" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
              <code className="kbd" style={{ fontSize: 13, padding: '8px 14px' }}>npx designlang yoursite.com</code>
              <a href="/" className="btn btn-primary">Try it live</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
