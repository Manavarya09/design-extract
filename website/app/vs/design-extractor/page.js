import Rule from '../../components/Rule';

export const metadata = {
  title: 'designlang vs design-extractor.com — honest comparison',
  description:
    'design-extractor.com ships a DESIGN.md. designlang ships the design system — DESIGN.md plus DTCG tokens, multi-platform emitters, anatomy, voice, motion, a CI drift bot, a clone command, a local studio, MCP, and a Figma plugin. $0, MIT, no signup.',
  openGraph: {
    title: 'designlang vs design-extractor.com',
    description:
      'They sell the spec. We ship the system. Honest feature comparison.',
  },
};

// Real extraction snapshots emitted by designlang on 2026-04-25.
// If anything below is wrong, run designlang yourself and PR a fix.
const THEIR_EXTRACTION = {
  url: 'design-extractor.com',
  intent: 'landing (0.29)',
  material: 'flat',
  library: 'tailwindcss (0.842)',
  voice: 'friendly · sentence case · tight',
  topHeading: 'Extract any website\u2019s design system',
  readingOrder: 'nav → feature-grid → content → pricing → feature-grid → hero → faq → footer',
  fonts: 'Inter / Geist Mono',
  uniqueColors: 8,
};

// note can include backtick-wrapped code spans — we split + render safely.
const COMPARISON_ROWS = [
  ['DESIGN.md (single-file, 8-section, YAML front matter)',     true,  true,  'They invented this format. We emit it too.'],
  ['Account / email signup required',                            false, true,  'They gate behind email.'],
  ['Public pricing',                                              true,  false, '$0 vs. undisclosed.'],
  ['CLI',                                                         true,  false, '`npx designlang <url>` — no signup, scriptable.'],
  ['MCP server (Claude Desktop / Cursor read live)',              true,  false, 'Editor sees the extraction as a live resource.'],
  ['DTCG W3C tokens',                                              true,  false, 'Industry-standard token spec.'],
  ['Tailwind config + CSS vars + React/Vue/Svelte themes',        true,  false, 'Generated alongside the markdown.'],
  ['iOS Swift / Android Compose / Flutter Dart / WordPress',      true,  false, 'Multi-platform emitters.'],
  ['Figma variables + a Figma plugin to import them',              true,  false, 'Figma-side import takes one click.'],
  ['Component anatomy (typed React stubs)',                       true,  false, 'Variant × size × state matrices, typed.'],
  ['Voice extraction (tone, CTA verbs, heading style)',           true,  false, 'The words that match the paint.'],
  ['Motion tokens + scripted WebM replay',                        true,  false, 'Transitions and keyframes captured.'],
  ['Page intent + section roles + material + library detection',  true,  false, 'The semantic layer beneath the markdown.'],
  ['CI drift bot (PR comment with score + drifted tokens)',        true,  false, '`designlang ci`. Works in any CI.'],
  ['Clone — runnable Next.js repo from a URL',                    true,  false, '`designlang clone`. One command, real project.'],
  ['Local studio (clickable swatches, zero account)',              true,  false, '`designlang studio` → localhost:4837.'],
  ['Open source (MIT)',                                            true,  false, 'github.com/Manavarya09/design-extract.'],
];

// Render a note cell: split on backticks, wrap odd segments in <code>.
function NoteCell({ text }) {
  const parts = String(text).split('`');
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1
          ? <code key={i} className="mono" style={{ fontSize: 12 }}>{p}</code>
          : <span key={i}>{p}</span>
      )}
    </>
  );
}

export default function VsDesignExtractor() {
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
            designlang <span style={{ color: 'var(--ink-3)', marginLeft: 12 }}>v11</span>
          </a>
          <nav className="mono" style={{ display: 'flex', gap: 'var(--r5)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            <a href="/" style={{ borderBottom: 0 }}>Home</a>
            <a href="/#install" style={{ borderBottom: 0 }}>Install</a>
            <a href="https://github.com/Manavarya09/design-extract" style={{ borderBottom: 0 }}>GitHub</a>
            <a href="https://www.npmjs.com/package/designlang" style={{ borderBottom: 0 }}>npm</a>
          </nav>
        </div>
      </header>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{ paddingBlock: 'var(--r7) var(--r8)' }}>
        <div className="section-label" style={{ marginBottom: 'var(--r6)' }}>
          <span>§00 — vs · design-extractor.com</span>
        </div>
        <h1 className="display" style={{ fontSize: 'clamp(48px, 8vw, 96px)', letterSpacing: '-0.035em', lineHeight: 0.96, marginBottom: 'var(--r6)' }}>
          They sell the <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>spec</em>.<br />
          We ship the <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>system</em>.
        </h1>
        <p className="prose" style={{ fontSize: 19, lineHeight: 1.5, maxWidth: '54ch', color: 'var(--ink-2)' }}>
          <a href="https://www.design-extractor.com" rel="nofollow noopener">design-extractor.com</a> ships a
          one-file <code className="mono">DESIGN.md</code> for AI coding agents — clever positioning,
          single artifact, easy to remember. designlang ships <code className="mono">DESIGN.md</code> too,
          plus everything you actually need to <em>build</em> the design: DTCG tokens, multi-platform
          emitters, motion, anatomy, voice, a CI drift bot, a clone command, a local studio, MCP, and a Figma plugin.
        </p>
      </section>

      {/* ── COMPARISON TABLE ─────────────────────────────────── */}
      <section>
        <Rule number="01" label="feature comparison" />
        <p className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 'var(--r5)', marginBottom: 'var(--r3)' }}>
          based on design-extractor.com as of 2026-04-25 · open a PR if anything is wrong
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '14px 12px 14px 0', borderBottom: '2px solid var(--ink)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500 }}>capability</th>
                <th style={{ textAlign: 'center', padding: '14px 12px', borderBottom: '2px solid var(--ink)', fontWeight: 600 }}>designlang</th>
                <th style={{ textAlign: 'center', padding: '14px 12px', borderBottom: '2px solid var(--ink)', fontWeight: 500, color: 'var(--ink-2)' }}>design-extractor</th>
                <th style={{ textAlign: 'left', padding: '14px 0 14px 12px', borderBottom: '2px solid var(--ink)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500 }}>note</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map(([cap, us, them, note]) => (
                <tr key={cap}>
                  <td style={{ padding: '14px 12px 14px 0', borderBottom: '1px solid var(--paper-3)' }}>{cap}</td>
                  <td style={{ padding: '14px 12px', borderBottom: '1px solid var(--paper-3)', textAlign: 'center', fontFamily: 'var(--font-mono)', color: us ? 'var(--accent)' : 'var(--ink-3)' }}>{us ? '●' : '○'}</td>
                  <td style={{ padding: '14px 12px', borderBottom: '1px solid var(--paper-3)', textAlign: 'center', fontFamily: 'var(--font-mono)', color: them ? 'var(--ink)' : 'var(--ink-3)' }}>{them ? '●' : '○'}</td>
                  <td style={{ padding: '14px 0 14px 12px', borderBottom: '1px solid var(--paper-3)', fontSize: 13, color: 'var(--ink-2)' }}>
                    <NoteCell text={note} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── DESIGN.MD PARITY ─────────────────────────────────── */}
      <section>
        <Rule number="02" label="DESIGN.md — their format, our pipeline" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--r5)', paddingBlock: 'var(--r6)' }}>
          <p className="prose" style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: '60ch' }}>
            They invented the 8-section <code className="mono">DESIGN.md</code> with YAML front matter.
            We emit the same shape — same sections, same front-matter conventions — fed by our v10 semantic
            layer (intent, material, voice, library detection) so the body has more to say.
            Below: the first lines of <code className="mono">stripe-com-DESIGN.md</code>, generated by{' '}
            <code className="mono">npx designlang stripe.com</code>:
          </p>
          <pre className="mono" style={{ background: 'var(--ink)', color: 'var(--paper)', padding: 'var(--r5)', overflowX: 'auto', fontSize: 12, lineHeight: 1.7 }}>
{`---
site: "Stripe | Financial Infrastructure to Grow Your Revenue"
url: "https://stripe.com"
generated_at: "2026-04-25T17:00:47Z"
generator: "designlang@11.2.0"
intent: landing
material: flat
tokens:
  colors:
    primary: "#533afd"
    secondary: "#e8e9ff"
    accent: "#ffe0d1"
    background: "#ffffff"
    foreground: "#000000"
  typography:
    sans: sohne-var
    base: 16
  spacing:
    base: 2
    scale: [1, 28, 32, 40, 48, 52, 60, 64, 72, 80]
  radii:
    xs: 1
    sm: 4
    md: 8
    lg: 16
    full: 100
---

# Overview
A **landing** page (heuristic confidence 0.75), dressed in **flat** material.

> "Flexible solutions for every business model."

The author writes in a **neutral** voice; headings tend to be
**Sentence case** case and **balanced**.`}
          </pre>
        </div>
      </section>

      {/* ── DOGFOOD: WE EXTRACTED THEIR SITE ─────────────────── */}
      <section>
        <Rule number="03" label="we ran designlang on design-extractor.com" />
        <div style={{ paddingBlock: 'var(--r6)' }}>
          <p className="prose" style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: '60ch', marginBottom: 'var(--r5)' }}>
            We pointed our own tool at theirs. Real extraction, real numbers — generated by
            <code className="mono"> npx designlang design-extractor.com</code>:
          </p>
          <dl style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '12px 24px', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.8, borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)', paddingBlock: 'var(--r4)' }}>
            <dt style={{ color: 'var(--ink-2)', letterSpacing: '0.04em' }}>page intent</dt><dd><em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>{THEIR_EXTRACTION.intent}</em></dd>
            <dt style={{ color: 'var(--ink-2)', letterSpacing: '0.04em' }}>material</dt><dd>{THEIR_EXTRACTION.material}</dd>
            <dt style={{ color: 'var(--ink-2)', letterSpacing: '0.04em' }}>library</dt><dd>{THEIR_EXTRACTION.library}</dd>
            <dt style={{ color: 'var(--ink-2)', letterSpacing: '0.04em' }}>voice</dt><dd>{THEIR_EXTRACTION.voice}</dd>
            <dt style={{ color: 'var(--ink-2)', letterSpacing: '0.04em' }}>top heading</dt><dd>&ldquo;{THEIR_EXTRACTION.topHeading}&rdquo;</dd>
            <dt style={{ color: 'var(--ink-2)', letterSpacing: '0.04em' }}>reading order</dt><dd style={{ wordBreak: 'break-word' }}>{THEIR_EXTRACTION.readingOrder}</dd>
            <dt style={{ color: 'var(--ink-2)', letterSpacing: '0.04em' }}>fonts</dt><dd>{THEIR_EXTRACTION.fonts}</dd>
            <dt style={{ color: 'var(--ink-2)', letterSpacing: '0.04em' }}>unique colors</dt><dd>{THEIR_EXTRACTION.uniqueColors}</dd>
          </dl>
          <p className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)', marginTop: 'var(--r4)' }}>
            Output included DESIGN.md, DTCG tokens, Tailwind config, CSS vars, Figma variables, motion
            tokens, anatomy stubs, voice JSON, intent + section roles, library detection,
            visual DNA, MCP companion. 21 files. 6 seconds.
          </p>
        </div>
      </section>

      {/* ── COURTESY ─────────────────────────────────────────── */}
      <section>
        <Rule number="04" label="credit where it's due" />
        <p className="prose" style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: '60ch', paddingBlock: 'var(--r5)' }}>
          design-extractor.com pioneered the <code className="mono">DESIGN.md</code> convention as
          an agent-native artifact. It&rsquo;s a sharp idea, well-named, well-positioned.
          We adopted the format because it deserves to be a standard — not because we want to
          replace them on their best ground. We want to replace them on every other ground.
        </p>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section style={{ paddingTop: 'var(--r7)' }}>
        <div style={{ borderTop: '2px solid var(--ink)', paddingTop: 'var(--r6)' }}>
          <h2 className="display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 'var(--r4)' }}>
            One command. No account. <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>$0</em>.
          </h2>
          <pre className="mono" style={{ background: 'var(--ink)', color: 'var(--accent)', padding: 'var(--r4) var(--r5)', overflowX: 'auto', fontSize: 14, lineHeight: 1.7, marginBlock: 'var(--r4)' }}>
{`$ npx designlang <url>
$ npx designlang clone <url>
$ npx designlang ci <url> --tokens ./tokens.json
$ npx designlang studio`}
          </pre>
          <p className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
            Extracted, not generated.
          </p>
        </div>
      </section>
    </main>
  );
}
