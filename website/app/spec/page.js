export const metadata = {
  title: 'DESIGN.md spec — designlang',
  description:
    'The DESIGN.md format spec — single-file, 8-section, YAML front matter agent-native design system artifact. Open spec, MIT-licensed reference implementation, embeddable Verified badge.',
  alternates: { canonical: 'https://designlang.app/spec' },
  openGraph: {
    title: 'DESIGN.md — open spec',
    description: 'The agent-native design-system artifact, formalized.',
  },
};

export default function Spec() {
  return (
    <main className="page" style={{ paddingBottom: 'var(--r9)', maxWidth: '72ch', margin: '0 auto' }}>
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
            <a href="/features" style={{ borderBottom: 0 }}>Features</a>
            <a href="/vs/design-extractor" style={{ borderBottom: 0, color: 'var(--accent)' }}>vs</a>
          </nav>
        </div>
      </header>

      <article style={{ paddingBlock: 'var(--r6)', fontSize: 16, lineHeight: 1.65 }}>
        <div className="section-label" style={{ marginBottom: 'var(--r4)' }}>
          <span>§ DESIGN.md spec — v1.0</span>
        </div>
        <h1 className="display" style={{ fontSize: 'clamp(40px, 6vw, 72px)', letterSpacing: '-0.03em', lineHeight: 1.0, marginBottom: 'var(--r5)' }}>
          The agent-native design-system artifact, <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>formalized</em>.
        </h1>

        <p style={{ marginBottom: 'var(--r4)', color: 'var(--ink-2)' }}>
          A <code className="mono">DESIGN.md</code> is a single Markdown file at the root of a repo (or alongside an extraction) that
          captures a website&rsquo;s design system in a form an LLM can read and an engineer can edit. It is the design
          counterpart to <code className="mono">AGENTS.md</code>.
        </p>

        <h2 className="display" style={{ fontSize: 28, marginTop: 'var(--r6)', marginBottom: 'var(--r3)' }}>Structure</h2>
        <p>A valid <code className="mono">DESIGN.md</code> has two layers:</p>
        <ol style={{ paddingLeft: 22, marginBottom: 'var(--r4)' }}>
          <li><strong>YAML front matter</strong> holding the machine-readable token snapshot — colors, typography, spacing, radii, shadows.</li>
          <li><strong>Markdown body</strong> with up to eight canonical sections, in this order, any of which may be omitted if not relevant.</li>
        </ol>

        <h3 className="display" style={{ fontSize: 21, marginTop: 'var(--r5)', marginBottom: 'var(--r3)' }}>The eight canonical sections</h3>
        <ol style={{ paddingLeft: 22, marginBottom: 'var(--r4)' }}>
          <li><strong>Overview</strong> — a one-paragraph design rationale plus page intent and material language.</li>
          <li><strong>Colors</strong> — palette table (role · hex · usage), neutrals, total unique count.</li>
          <li><strong>Typography</strong> — families, weights, body size, heading scale.</li>
          <li><strong>Layout</strong> — spacing base + scale, breakpoints, grid/flex primitive counts.</li>
          <li><strong>Elevation and Depth</strong> — shadow scale and z-index layers.</li>
          <li><strong>Shapes</strong> — border-radius scale.</li>
          <li><strong>Components</strong> — detected patterns and anatomy table (kind · variants · sizes · instances).</li>
          <li><strong>Do&rsquo;s and Don&rsquo;ts</strong> — actionable directional guidance derived from voice + lint findings.</li>
        </ol>
        <p>Sections may be added (e.g. <em>Motion</em>, <em>Voice</em>, <em>Imagery</em>) but should appear after the eight canonical ones.</p>

        <h2 className="display" style={{ fontSize: 28, marginTop: 'var(--r6)', marginBottom: 'var(--r3)' }}>Front-matter schema</h2>
        <pre className="mono" style={{ background: 'var(--ink)', color: 'var(--paper)', padding: 'var(--r4) var(--r5)', overflowX: 'auto', fontSize: 12.5, lineHeight: 1.7 }}>
{`site:           string        # canonical name
url:            string        # source URL (preferred)
generated_at:   ISO 8601      # UTC timestamp
generator:      "tool@vX.Y"   # tool identifier
intent:         string        # landing | pricing | docs | blog | product | …
material:       string        # flat | brutalist | glass | soft-ui | material-you | …
library:        string?       # shadcn/ui | radix | mui | chakra | tailwind-ui | …
tokens:
  colors:
    primary:    "#hex"
    secondary?: "#hex"
    accent?:    "#hex"
    background: "#hex"
    foreground: "#hex"
  typography:
    sans:       string
    mono?:      string
    base:       integer       # px
  spacing:
    base?:      integer       # px
    scale:      integer[]
  radii?:
    xs|sm|md|lg|xl|full: integer  # px
  shadows?:
    sm|md|lg|xl: string       # raw box-shadow value`}
        </pre>

        <h2 className="display" style={{ fontSize: 28, marginTop: 'var(--r6)', marginBottom: 'var(--r3)' }}>Reference implementation</h2>
        <p>
          designlang ships an MIT-licensed, dependency-light reference emitter at{' '}
          <a className="mono" href="https://github.com/Manavarya09/design-extract/blob/main/src/formatters/design-md.js" style={{ borderBottom: '1px solid currentColor' }}>
            src/formatters/design-md.js
          </a>
          . Generate a sample with:
        </p>
        <pre className="mono" style={{ background: 'var(--ink)', color: 'var(--accent)', padding: 'var(--r4) var(--r5)', overflowX: 'auto', fontSize: 13 }}>
{`npx designlang stripe.com    # writes stripe-com-DESIGN.md`}
        </pre>

        <h2 className="display" style={{ fontSize: 28, marginTop: 'var(--r6)', marginBottom: 'var(--r3)' }}>The Verified badge</h2>
        <p style={{ marginBottom: 'var(--r4)' }}>
          Sites that publish their own <code className="mono">DESIGN.md</code> at <code className="mono">/DESIGN.md</code> may embed the
          following SVG badge — a one-shot signal to crawlers, AI agents, and design-system tooling that the
          spec is honored:
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: 'var(--r4)',
            background: 'var(--paper-2)',
            border: '1px solid var(--ink)',
            marginBottom: 'var(--r4)',
            flexWrap: 'wrap',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/badge.svg" alt="DESIGN.md verified" width={140} height={28} style={{ display: 'block' }} />
          <code className="mono" style={{ fontSize: 11, color: 'var(--ink-2)', wordBreak: 'break-all' }}>
            &lt;a href=&quot;https://designlang.app/spec&quot;&gt;&lt;img src=&quot;https://designlang.app/badge.svg&quot; alt=&quot;DESIGN.md verified&quot;/&gt;&lt;/a&gt;
          </code>
        </div>

        <h2 className="display" style={{ fontSize: 28, marginTop: 'var(--r6)', marginBottom: 'var(--r3)' }}>Compatibility</h2>
        <p>
          The spec was inspired by the <code className="mono">DESIGN.md</code> convention pioneered at{' '}
          <a href="https://www.design-extractor.com" rel="nofollow noopener" style={{ borderBottom: '1px solid currentColor' }}>design-extractor.com</a>.
          designlang adopts the eight-section structure verbatim and extends the front matter with the v10 semantic
          layer (<code className="mono">intent</code>, <code className="mono">material</code>, <code className="mono">library</code>) so
          downstream tools have richer ground truth without sacrificing single-file portability.
        </p>

        <h2 className="display" style={{ fontSize: 28, marginTop: 'var(--r6)', marginBottom: 'var(--r3)' }}>License</h2>
        <p>
          The spec is published under <a href="https://creativecommons.org/licenses/by/4.0/" rel="noopener" style={{ borderBottom: '1px solid currentColor' }}>CC BY 4.0</a> — copy, fork, extend, embed.
          Contributions welcome at <a className="mono" href="https://github.com/Manavarya09/design-extract" style={{ borderBottom: '1px solid currentColor' }}>github.com/Manavarya09/design-extract</a>.
        </p>
      </article>
    </main>
  );
}
