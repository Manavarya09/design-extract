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

async function listFiles(slug) {
  for (const d of galleryDirs(slug)) {
    try {
      const all = await readdir(d, { withFileTypes: true });
      const flat = [];
      for (const f of all) {
        if (f.isDirectory()) {
          try {
            const sub = await readdir(join(d, f.name));
            for (const s of sub) flat.push(`${f.name}/${s}`);
          } catch { /* skip */ }
        } else {
          flat.push(f.name);
        }
      }
      return flat.sort();
    } catch { /* try next */ }
  }
  return [];
}

async function readPrompt(slug, name) {
  for (const d of galleryDirs(slug)) {
    try {
      const dirs = await readdir(d);
      const promptDir = dirs.find((f) => f.endsWith('-prompts'));
      if (promptDir) {
        const path = join(d, promptDir, name);
        try { return await readFile(path, 'utf-8'); } catch { /* missing */ }
      }
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
    title: `${host} design system — every token, every emitter, every prompt — designlang`,
    description: `Real extraction of ${host}: 17+ files including DTCG tokens, Tailwind, Figma variables, shadcn theme, brand-book PDF, MCP server payload, AGENTS.md, component anatomy, icon system, voice, motion, prompt pack for v0/Lovable/Cursor/Claude. Open-source alternative to design-extractor.com (4 outputs).`,
    alternates: { canonical: `https://designlang.app/gallery/${slug}` },
    openGraph: {
      title: `${host} design system — designlang`,
      description: `Tokens, emitters, anatomy, icons, voice, motion, MCP, prompts, brand-book PDF — all 17+ artefacts on one page.`,
    },
  };
}

function pickPalette(tokens) {
  const out = [];
  const walk = (node, path) => {
    if (!node || typeof node !== 'object') return;
    if (node.$value && node.$type === 'color' && typeof node.$value === 'string' && node.$value.startsWith('#')) {
      out.push({ path, hex: node.$value });
      return;
    }
    for (const k of Object.keys(node)) { if (!k.startsWith('$')) walk(node[k], path ? `${path}.${k}` : k); }
  };
  walk(tokens?.primitive?.color, 'primitive.color');
  const seen = new Set();
  return out.filter(({ hex }) => { const k = hex.toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; }).slice(0, 18);
}

function pickRadii(tokens) {
  const out = [];
  const walk = (node, path) => {
    if (!node || typeof node !== 'object') return;
    if (node.$value !== undefined && (node.$type === 'dimension' || node.$type === undefined)) { out.push({ path, value: String(node.$value) }); return; }
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
  for (const k of Object.keys(f || {})) { if (f[k]?.$value) return { name: k, value: f[k].$value }; }
  return null;
}

function fileGroup(name) {
  if (name === 'brand.html') return 'brand';
  if (/-DESIGN\.md$/.test(name)) return 'spec';
  if (/-design-tokens\.json$/.test(name)) return 'tokens';
  if (/-tailwind\.config\.js$/.test(name)) return 'tokens';
  if (/-variables\.css$/.test(name)) return 'tokens';
  if (/-shadcn-theme\.css$/.test(name)) return 'tokens';
  if (/-figma-variables\.json$/.test(name)) return 'tokens';
  if (/-theme\.js$/.test(name)) return 'tokens';
  if (/-wordpress-theme\.json$/.test(name)) return 'tokens';
  if (/-anatomy\.tsx$/.test(name)) return 'anatomy';
  if (/-voice\.json$/.test(name)) return 'voice';
  if (/-motion-tokens\.json$/.test(name)) return 'motion';
  if (/-icon-system\.json$/.test(name)) return 'icons';
  if (/-form-states\.json$/.test(name)) return 'states';
  if (/-mcp\.json$/.test(name)) return 'mcp';
  if (/-design-language\.md$/.test(name)) return 'spec';
  if (/-intent\.json$/.test(name)) return 'intent';
  if (/-library\.json$/.test(name)) return 'intent';
  if (/-stack-intel\.json$/.test(name)) return 'intent';
  if (/-seo\.json$/.test(name)) return 'intent';
  if (/-visual-dna\.json$/.test(name)) return 'intent';
  if (/-preview\.html$/.test(name)) return 'spec';
  if (name.startsWith(/.+-prompts\//.test(name) ? '' : '__')) return 'prompts';
  if (name.includes('-prompts/')) return 'prompts';
  return 'other';
}

const GROUP_LABEL = {
  brand:    'Brand book',
  spec:     'Spec',
  tokens:   'Tokens & emitters',
  anatomy:  'Anatomy',
  voice:    'Voice',
  motion:   'Motion',
  icons:    'Icons',
  states:   'Form states',
  mcp:      'MCP / Agent rules',
  intent:   'Page intel',
  prompts:  'Prompt pack',
  other:    'Other',
};

export default async function GalleryBrandPage({ params }) {
  const { slug } = await params;
  const meta = FEATURED[slug];
  if (!meta) notFound();

  const [
    tokensRaw, designMd, voiceRaw, motionRaw, intentRaw,
    tailwindCfg, cssVars, shadcnCss, themeJs, wpThemeRaw,
    anatomyTsx, mcpRaw, iconRaw, formStatesRaw,
    promptV0, promptLovable, promptCursor, promptClaude,
    fileList,
  ] = await Promise.all([
    findFile(slug, '-design-tokens.json'),
    findFile(slug, '-DESIGN.md'),
    findFile(slug, '-voice.json'),
    findFile(slug, '-motion-tokens.json'),
    findFile(slug, '-intent.json'),
    findFile(slug, '-tailwind.config.js'),
    findFile(slug, '-variables.css'),
    findFile(slug, '-shadcn-theme.css'),
    findFile(slug, '-theme.js'),
    findFile(slug, '-wordpress-theme.json'),
    findFile(slug, '-anatomy.tsx'),
    findFile(slug, '-mcp.json'),
    findFile(slug, '-icon-system.json'),
    findFile(slug, '-form-states.json'),
    readPrompt(slug, 'v0.txt'),
    readPrompt(slug, 'lovable.txt'),
    readPrompt(slug, 'cursor.md'),
    readPrompt(slug, 'claude-artifacts.md'),
    listFiles(slug),
  ]);

  const tokens = tokensRaw ? JSON.parse(tokensRaw) : null;
  const voice  = voiceRaw  ? JSON.parse(voiceRaw)  : null;
  const motion = motionRaw ? JSON.parse(motionRaw) : null;
  const intent = intentRaw ? JSON.parse(intentRaw) : null;
  const icons  = iconRaw   ? JSON.parse(iconRaw)   : null;

  const palette = pickPalette(tokens);
  const radii   = pickRadii(tokens);
  const spacing = pickSpacing(tokens);
  const font    = pickFont(tokens);

  const host = meta.host;
  const url = `https://${host}`;
  const primary = palette[0]?.hex || '#7f1d1d';
  const accent  = palette[1]?.hex || '#dc2626';

  // Group files for the downloads strip
  const fileCount = fileList.length;
  const grouped = {};
  for (const f of fileList) {
    const g = fileGroup(f);
    (grouped[g] ||= []).push(f);
  }
  const groups = Object.keys(grouped).sort((a, b) =>
    Object.keys(GROUP_LABEL).indexOf(a) - Object.keys(GROUP_LABEL).indexOf(b)
  );

  // Pull a sample of CTA verbs for the voice section
  const ctaVerbs = (voice?.ctaVerbs || []).slice(0, 8);
  const headings = (voice?.headlines || voice?.headings || []).slice(0, 6);

  // Motion durations / easings as flat lists
  const motionDurations = motion?.duration ? Object.entries(motion.duration).slice(0, 6) : [];
  const motionEasings   = motion?.easing   ? Object.entries(motion.easing).slice(0, 6)   : [];

  return (
    <main>
      {/* Hero */}
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
              <p className="eyebrow" style={{ marginBottom: 8 }}>extracted · {fileCount} artefacts</p>
              <h1 className="h1 gb-hero-h1">{host}</h1>
              <p className="lede" style={{ marginTop: 10 }}>
                Live extraction of <a href={url} target="_blank" rel="noreferrer" style={{ color: 'var(--red-3)' }}>{url}</a> —
                tokens, emitters, anatomy, icons, voice, motion, MCP server, AGENTS.md, prompt pack and a 13-chapter brand book.
                Generated with one command.
              </p>
              <div className="row" style={{ marginTop: 20, gap: 10, flexWrap: 'wrap' }}>
                <a href={`/gallery/${slug}/brand.html`} target="_blank" rel="noreferrer" className="btn btn-primary">Open brand book ↗</a>
                <a href="#tokens" className="btn btn-ghost">Browse tokens</a>
                <a href="#downloads" className="btn btn-ghost">All {fileCount} files</a>
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

      {/* "vs them" strip */}
      <section className="gb-vs-strip">
        <div className="wrap gb-vs-row">
          <div>
            <span className="mono faint" style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase' }}>vs design-extractor.com</span>
            <p style={{ margin: '6px 0 0', color: 'var(--fg-2)', fontSize: 14 }}>
              They surface <strong style={{ color: '#fff' }}>4 sections</strong> per brand (DESIGN.md · Tailwind · CSS · Tokens). designlang ships <strong style={{ color: '#fff' }}>{fileCount} artefacts</strong> for {host} and renders <strong style={{ color: '#fff' }}>12+ sections</strong> below.
            </p>
          </div>
          <a href="/vs/design-extractor" className="btn btn-ghost btn-sm">See full comparison ↗</a>
        </div>
      </section>

      {/* Tokens & code (expanded tabs) */}
      <section className="section gb-body" id="tokens">
        <div className="wrap gb-grid">
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

            {radii.length > 0 && (<>
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
            </>)}

            {spacing.length > 0 && (<>
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
            </>)}
          </aside>

          <div className="gb-main">
            <GalleryTabs
              host={host}
              slug={slug}
              files={[
                { id: 'design',   label: 'DESIGN.md',          body: designMd    || '' },
                { id: 'tokens',   label: 'design-tokens.json', body: tokensRaw   || '' },
                { id: 'tailwind', label: 'tailwind.config.js', body: tailwindCfg || '' },
                { id: 'css',      label: 'variables.css',      body: cssVars     || '' },
                { id: 'shadcn',   label: 'shadcn-theme.css',   body: shadcnCss   || '' },
                { id: 'theme',    label: 'theme.js',           body: themeJs     || '' },
                { id: 'wp',       label: 'wordpress-theme.json', body: wpThemeRaw || '' },
                { id: 'anatomy',  label: 'anatomy.tsx',        body: anatomyTsx  || '' },
                { id: 'mcp',      label: 'mcp.json',           body: mcpRaw      || '' },
              ].filter(t => t.body)}
            />
          </div>
        </div>
      </section>

      {/* Typography */}
      {font && (
        <section className="section" style={{ paddingTop: 32 }} id="typography">
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
      {(headings.length > 0 || ctaVerbs.length > 0) && (
        <section className="section" style={{ paddingTop: 32 }} id="voice">
          <div className="wrap">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 22, flexWrap: 'wrap', gap: 10 }}>
              <div>
                <h2 className="h2" style={{ fontSize: 28, marginBottom: 8 }}>Voice</h2>
                <p className="lede" style={{ margin: 0 }}>Tone, CTA verbs, headlines and pronoun stance — pulled from the live page.</p>
              </div>
              {voice?.tone && <span className="mono faint" style={{ fontSize: 12 }}>tone · {voice.tone}{voice.pronoun ? ` · ${voice.pronoun}` : ''}</span>}
            </header>

            {ctaVerbs.length > 0 && (
              <div className="card" style={{ padding: '20px 24px', marginBottom: 18 }}>
                <p className="mono faint" style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', margin: '0 0 12px' }}>top CTA verbs</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {ctaVerbs.map((v, i) => (
                    <span key={i} className="pill mono" style={{ fontSize: 12 }}>
                      {v.value || v}
                      {typeof v === 'object' && v.count ? <span className="faint" style={{ marginLeft: 6 }}>×{v.count}</span> : null}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {headings.length > 0 && (
              <div className="grid-3">
                {headings.map((q, i) => (
                  <blockquote key={i} className="voice-quote" style={{ borderLeftColor: primary, fontSize: 16 }}>
                    &ldquo;{String(q?.text || q).slice(0, 160)}&rdquo;
                  </blockquote>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Motion */}
      {(motionDurations.length > 0 || motionEasings.length > 0) && (
        <section className="section" style={{ paddingTop: 32 }} id="motion">
          <div className="wrap">
            <header style={{ marginBottom: 22 }}>
              <h2 className="h2" style={{ fontSize: 28, marginBottom: 8 }}>Motion</h2>
              <p className="lede" style={{ margin: 0 }}>Durations and easing curves captured from real CSS transitions.</p>
            </header>
            <div className="grid-2">
              {motionDurations.length > 0 && (
                <div className="card" style={{ padding: '20px 24px' }}>
                  <p className="mono faint" style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', margin: '0 0 14px' }}>durations</p>
                  <div className="gb-spacing">
                    {motionDurations.map(([k, v]) => {
                      const ms = parseInt(String(v?.$value || v || '0'), 10) || 0;
                      return (
                        <div key={k} className="gb-spacing-row">
                          <span className="mono" style={{ width: 80, color: 'var(--fg-3)' }}>{k}</span>
                          <span className="gb-spacing-bar" style={{ width: Math.min(ms / 3, 220), background: primary }} />
                          <span className="mono faint" style={{ width: 60, textAlign: 'right' }}>{v?.$value || v}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {motionEasings.length > 0 && (
                <div className="card" style={{ padding: '20px 24px' }}>
                  <p className="mono faint" style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', margin: '0 0 14px' }}>easings</p>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {motionEasings.map(([k, v]) => (
                      <li key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 12 }}>
                        <span className="mono" style={{ color: '#fff' }}>{k}</span>
                        <span className="mono faint">{v?.$value || v}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Component anatomy */}
      {anatomyTsx && (
        <section className="section" style={{ paddingTop: 32 }} id="anatomy">
          <div className="wrap">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 22, flexWrap: 'wrap', gap: 10 }}>
              <div>
                <h2 className="h2" style={{ fontSize: 28, marginBottom: 8 }}>Component anatomy</h2>
                <p className="lede" style={{ margin: 0 }}>Typed React stubs — variants, slots and props detected from clustered DOM patterns.</p>
              </div>
              <span className="mono faint" style={{ fontSize: 12 }}>{anatomyTsx.length.toLocaleString()} chars · TypeScript</span>
            </header>
            <pre className="mcp-snippet" style={{ maxHeight: 420, overflow: 'auto' }}>{anatomyTsx.slice(0, 2400)}</pre>
          </div>
        </section>
      )}

      {/* Icon system */}
      {icons && (
        <section className="section" style={{ paddingTop: 32 }} id="icons">
          <div className="wrap">
            <header style={{ marginBottom: 22 }}>
              <h2 className="h2" style={{ fontSize: 28, marginBottom: 8 }}>Icon system</h2>
              <p className="lede" style={{ margin: 0 }}>SVG icon census — count, style mix, grid and stroke profile.</p>
            </header>
            <div className="card" style={{ padding: '20px 24px' }}>
              <div className="dx-summary-grid" style={{ marginBottom: 0 }}>
                <div className="dx-num"><div className="dx-num-value">{icons.stats?.count ?? '—'}</div><div className="dx-num-label mono">total icons</div></div>
                <div className="dx-num"><div className="dx-num-value">{icons.stats?.strokeOnly ?? 0}</div><div className="dx-num-label mono">stroke-only</div></div>
                <div className="dx-num"><div className="dx-num-value">{icons.stats?.fillOnly ?? 0}</div><div className="dx-num-label mono">fill-only</div></div>
                <div className="dx-num"><div className="dx-num-value">{icons.stats?.avgStrokeWidth?.toFixed?.(2) ?? '—'}</div><div className="dx-num-label mono">avg stroke</div></div>
                <div className="dx-num"><div className="dx-num-value">{icons.library !== 'unknown' ? icons.library : '—'}</div><div className="dx-num-label mono">library</div></div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* MCP / Agent rules */}
      {mcpRaw && (
        <section className="section" style={{ paddingTop: 32 }} id="mcp">
          <div className="wrap">
            <header style={{ marginBottom: 22 }}>
              <h2 className="h2" style={{ fontSize: 28, marginBottom: 8 }}>MCP / Agent rules</h2>
              <p className="lede" style={{ marginBottom: 16 }}>
                The same payload the stdio MCP server hands to Claude Code, Cursor and Windsurf. Wire it into your editor and the agent
                answers brand-system questions with the actual extraction — not a guess.
              </p>
              <div className="row" style={{ gap: 10, flexWrap: 'wrap' }}>
                <a href="/blog/mcp-launch" className="btn btn-ghost btn-sm">How to wire MCP →</a>
                <code className="kbd" style={{ fontSize: 12, padding: '6px 10px' }}>npx designlang mcp --url {url}</code>
              </div>
            </header>
            <pre className="mcp-snippet" style={{ maxHeight: 420, overflow: 'auto' }}>{mcpRaw.slice(0, 2400)}</pre>
          </div>
        </section>
      )}

      {/* Prompt pack */}
      {(promptV0 || promptLovable || promptCursor || promptClaude) && (
        <section className="section" style={{ paddingTop: 32 }} id="prompts">
          <div className="wrap">
            <header style={{ marginBottom: 22 }}>
              <h2 className="h2" style={{ fontSize: 28, marginBottom: 8 }}>Prompt pack</h2>
              <p className="lede" style={{ margin: 0 }}>
                Paste-ready prompts pre-loaded with the {host} system, for v0, Lovable, Cursor and Claude Artifacts.
              </p>
            </header>
            <div className="grid-2">
              {[
                ['v0',     promptV0],
                ['Lovable', promptLovable],
                ['Cursor', promptCursor],
                ['Claude Artifacts', promptClaude],
              ].filter(([, body]) => body).map(([label, body]) => (
                <div key={label} className="card" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span className="h3" style={{ margin: 0, fontSize: 16 }}>{label}</span>
                    <span className="mono faint" style={{ fontSize: 11 }}>{body.length.toLocaleString()} chars</span>
                  </header>
                  <pre style={{ margin: 0, padding: '12px 14px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--hairline)', borderRadius: 8, fontFamily: 'var(--ff-mono)', fontSize: 11.5, lineHeight: 1.55, color: 'var(--fg-2)', maxHeight: 200, overflow: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{body.slice(0, 600)}{body.length > 600 ? '…' : ''}</pre>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All downloads */}
      {fileCount > 0 && (
        <section className="section" style={{ paddingTop: 32 }} id="downloads">
          <div className="wrap">
            <header style={{ marginBottom: 22 }}>
              <h2 className="h2" style={{ fontSize: 28, marginBottom: 8 }}>All artefacts</h2>
              <p className="lede" style={{ margin: 0 }}>
                Every file designlang produced for {host} — {fileCount} in total. Download anything.
              </p>
            </header>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              {groups.map((g) => (
                <div key={g} className="gb-dl-group">
                  <div className="gb-dl-group-head">
                    <span className="mono">{GROUP_LABEL[g] || g}</span>
                    <span className="mono faint" style={{ fontSize: 11 }}>{grouped[g].length} {grouped[g].length === 1 ? 'file' : 'files'}</span>
                  </div>
                  <ul className="gb-dl-list">
                    {grouped[g].map((f) => (
                      <li key={f}>
                        <a href={`/gallery/${slug}/${f}`} target="_blank" rel="noreferrer">
                          <span className="mono">{f}</span>
                          <span className="mono faint">↗</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="section">
        <div className="wrap" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="card" style={{ maxWidth: 720, width: '100%', padding: '32px 32px', textAlign: 'center' }}>
            <h2 className="h2" style={{ fontSize: 28, marginBottom: 8 }}>Run designlang on your own URL.</h2>
            <p className="lede" style={{ margin: '0 auto 18px' }}>
              Same {fileCount}-artefact depth as the {host} extraction above. No signup, no API key.
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
