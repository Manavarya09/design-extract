import Rule from './components/Rule';
import Marginalia from './components/Marginalia';
import HeroExtractor from './components/HeroExtractor';
import TokenBrowser from './components/TokenBrowser';
import McpSection from './components/McpSection';
import PlatformTabs from './components/PlatformTabs';
import CssHealth from './components/CssHealth';
import A11ySlider from './components/A11ySlider';
import RegionsComponents from './components/RegionsComponents';
import Specimens from './components/Specimens';
import Comparison from './components/Comparison';

export default function Home() {
  return (
    <main className="page">
      {/* ── HEAD SLUG ─────────────────────────────────────── */}
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
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mark.svg" alt="" width={22} height={22} style={{ display: 'block' }} />
            <span className="mono" style={{ fontSize: 13, letterSpacing: '0.02em' }}>
              designlang
              <span style={{ color: 'var(--ink-3)', marginLeft: 12 }}>v10</span>
            </span>
          </span>
          <nav
            className="mono"
            style={{ display: 'flex', gap: 'var(--r5)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}
          >
            <a href="#extract" style={{ borderBottom: 0 }}>Extract</a>
            <a href="#features" style={{ borderBottom: 0 }}>Features</a>
            <a href="#specimens" style={{ borderBottom: 0 }}>Specimens</a>
            <a href="#install" style={{ borderBottom: 0 }}>Install</a>
            <a href="https://github.com/Manavarya09/design-extract" style={{ borderBottom: 0 }}>GitHub</a>
            <a href="https://www.npmjs.com/package/designlang" style={{ borderBottom: 0 }}>npm</a>
          </nav>
        </div>
      </header>

      {/* ── §00 HERO ──────────────────────────────────────── */}
      <section id="extract" style={{ paddingBlock: 'var(--r7) var(--r8)', borderTop: 0 }}>
        <div className="with-margin">
          <div>
            <div className="section-label" style={{ marginBottom: 'var(--r6)' }}>
              <span>§00 — Entry</span>
            </div>
            <h1
              className="display hero-title"
              style={{ marginBottom: 'var(--r7)' }}
            >
              A website<br />
              reads as a<br />
              <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>design system</em>.
            </h1>
            <p className="prose" style={{ fontSize: 20, lineHeight: 1.4, maxWidth: '46ch' }}>
              designlang crawls any URL and returns its complete design language —
              tokens, typography, spacing, shadows, components, regions, health,
              remediations — in W3C DTCG format, with native emitters for iOS,
              Android, Flutter and WordPress, and a live MCP server your editor can read.
            </p>
          </div>
          <Marginalia>
            <div>extraction runtime</div>
            <div>
              <code>Playwright 1.59</code>
              <br />
              <code>@sparticuz/chromium</code>
            </div>
            <hr style={{ margin: '12px 0', border: 0, borderTop: '1px solid var(--ink-3)' }} />
            <div>default invocation</div>
            <div><code>$ npx designlang &lt;url&gt;</code></div>
            <p className="foot" style={{ marginTop: 12 }}>
              Works without install. Playwright fetches Chromium on first run;
              ≈ 3–6 seconds per page on a modern laptop.
            </p>
          </Marginalia>
        </div>

        <HeroExtractor />
      </section>

      {/* ── §00.5 v10 — INTENT · VISUAL DNA · PROMPT PACK ── */}
      <section id="v10">
        <Rule number="00" label="v10 — intent · visual DNA · prompt pack" />
        <V10Capabilities />
      </section>

      {/* ── §00.9 v9 — MOTION · ANATOMY · VOICE ──────────── */}
      <section id="v9">
        <Rule number="00" label="v9 — motion · anatomy · voice" />
        <V9Capabilities />
      </section>

      {/* ── §01 DTCG BROWSER ──────────────────────────────── */}
      <section id="features">
        <Rule number="01" label="DTCG token browser" />
        <div style={{ padding: 'var(--r6) 0' }}>
          <TokenBrowser />
        </div>
      </section>

      {/* ── §02 MCP ───────────────────────────────────────── */}
      <section>
        <Rule number="02" label="MCP server" />
        <McpSection />
      </section>

      {/* ── §03 MULTI-PLATFORM ────────────────────────────── */}
      <section>
        <Rule number="03" label="Multi-platform emitters" />
        <PlatformTabs />
      </section>

      {/* ── §04 HEALTH ────────────────────────────────────── */}
      <section>
        <CssHealth />
      </section>

      {/* ── §05 REMEDIATION ───────────────────────────────── */}
      <section>
        <A11ySlider />
      </section>

      {/* ── §06 REGIONS + COMPONENTS ──────────────────────── */}
      <section>
        <RegionsComponents />
      </section>

      {/* ── §07 SPECIMENS ─────────────────────────────────── */}
      <section id="specimens">
        <Rule number="07" label="Specimens" />
        <Specimens />
      </section>

      {/* ── §08 COMPARISON ────────────────────────────────── */}
      <section>
        <Rule number="08" label="Compared" />
        <Comparison />
      </section>

      {/* ── §09 INSTALL ───────────────────────────────────── */}
      <section id="install" style={{ paddingBottom: 'var(--r9)' }}>
        <Rule number="09" label="Install" />
        <InstallTracks />
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <SiteFooter />
    </main>
  );
}

function InstallTracks() {
  const preStyle = {
    padding: 'var(--r4) var(--r5)',
    background: 'var(--ink)',
    color: 'var(--paper)',
    fontSize: 13,
    lineHeight: 1.7,
    overflowX: 'auto',
    whiteSpace: 'pre',
  };
  const colHead = {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'var(--ink-2)',
    marginBottom: 'var(--r3)',
  };
  const colTitle = {
    fontSize: 36,
    lineHeight: 1,
    letterSpacing: '-0.02em',
    marginBottom: 'var(--r4)',
  };

  return (
    <div style={{ marginTop: 'var(--r5)' }}>
      <div className="install-grid">
        {/* CLI */}
        <div className="install-col">
          <div style={colHead}>track 01</div>
          <h3 className="display" style={colTitle}>CLI</h3>
          <p style={{ fontSize: 14, color: 'var(--ink-2)', marginBottom: 'var(--r3)', maxWidth: '34ch' }}>
            Zero install via npx. Node ≥ 20.
          </p>
          <pre className="mono" style={preStyle}>
{`1  $ npx designlang <url>
2  $ npx designlang <url> --platforms all
3  $ npx designlang <url> --emit-agent-rules
4  $ npx designlang <url> --cookie-file ./cookies.txt
5  $ npx designlang <url> --insecure
6  $ npx designlang <url> --user-agent "custom-ua"
7  $ npx designlang <url> --tokens-legacy`}
          </pre>
        </div>

        {/* MCP */}
        <div className="install-col">
          <div style={colHead}>track 02</div>
          <h3 className="display" style={colTitle}>MCP server</h3>
          <p className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', marginBottom: 'var(--r3)' }}>
            claude_desktop_config.json / ~/.cursor/mcp.json
          </p>
          <pre className="mono" style={preStyle}>
{`{
  "mcpServers": {
    "designlang": {
      "command": "npx",
      "args": [
        "designlang",
        "mcp",
        "--output-dir",
        "./design-extract-output"
      ]
    }
  }
}`}
          </pre>
          <p style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 'var(--r3)', fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>
            Once connected, every MCP-aware agent can query your last extraction.
          </p>
        </div>

        {/* Agent rules */}
        <div className="install-col">
          <div style={colHead}>track 03</div>
          <h3 className="display" style={colTitle}>Agent rules</h3>
          <p style={{ fontSize: 14, color: 'var(--ink-2)', marginBottom: 'var(--r3)', maxWidth: '34ch' }}>
            One flag emits ready-to-commit rules for every popular agent.
          </p>
          <pre className="mono" style={preStyle}>
{`$ npx designlang <url> --emit-agent-rules`}
          </pre>
          <ul
            className="mono"
            style={{
              listStyle: 'none',
              padding: 0,
              marginTop: 'var(--r3)',
              fontSize: 12,
              lineHeight: 1.9,
              color: 'var(--ink-2)',
            }}
          >
            <li>.cursor/rules/designlang.mdc</li>
            <li>.claude/skills/designlang/SKILL.md</li>
            <li>CLAUDE.md.fragment</li>
            <li>agents.md</li>
          </ul>
        </div>

        {/* Chrome extension */}
        <div className="install-col">
          <div style={colHead}>track 04 · chrome ext</div>
          <h3 className="display" style={colTitle}>Chrome extension</h3>
          <p style={{ fontSize: 14, color: 'var(--ink-2)', marginBottom: 'var(--r3)', maxWidth: '34ch' }}>
            One click from any tab. Opens this page with the URL prefilled.
          </p>
          <ol
            className="mono"
            style={{
              padding: 0,
              margin: 0,
              listStylePosition: 'inside',
              fontSize: 12,
              lineHeight: 1.9,
              color: 'var(--ink-2)',
            }}
          >
            <li>clone the repo</li>
            <li>open <code style={{ color: 'var(--ink)' }}>chrome://extensions</code></li>
            <li>toggle developer mode</li>
            <li>load unpacked → <code style={{ color: 'var(--ink)' }}>chrome-extension/</code></li>
          </ol>
          <p style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 'var(--r4)', fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>
            Manifest v3. Only permission: <code className="mono" style={{ fontStyle: 'normal' }}>activeTab</code>.
          </p>
          <a
            href="https://github.com/Manavarya09/design-extract/tree/main/chrome-extension"
            target="_blank"
            rel="noopener"
            className="mono"
            style={{ display: 'inline-block', marginTop: 'var(--r3)', fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase' }}
          >
            source →
          </a>
        </div>
      </div>

      <style>{`
        .install-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 0;
        }
        .install-col {
          padding: 0 var(--r4);
        }
        .install-col:first-child { padding-left: 0; }
        .install-col:last-child { padding-right: 0; }
        .install-col + .install-col {
          border-left: 1px solid var(--ink);
        }
        @media (max-width: 1100px) {
          .install-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0; }
          .install-col { padding: var(--r4) var(--r4); }
          .install-col:nth-child(2n+1) { padding-left: 0; }
          .install-col:nth-child(2n) { padding-right: 0; }
          .install-col:nth-child(n+3) { border-top: 1px solid var(--ink); }
          .install-col:nth-child(2n+1) { border-left: 0; }
        }
        @media (max-width: 640px) {
          .install-grid { grid-template-columns: 1fr; gap: 0; }
          .install-col { padding: var(--r5) 0; border-left: 0 !important; }
          .install-col + .install-col { border-top: 1px solid var(--ink); }
        }
      `}</style>
    </div>
  );
}

function SiteFooter() {
  const colHead = {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'var(--ink-2)',
    marginBottom: 'var(--r3)',
  };
  const linkStyle = {
    display: 'block',
    fontFamily: 'var(--font-mono)',
    fontSize: 12,
    padding: '6px 0',
    borderBottom: '1px solid var(--paper-3)',
    color: 'var(--ink)',
  };
  return (
    <footer style={{ paddingBottom: 'var(--r7)' }}>
      <div className="rule" role="separator" aria-label="end">
        <div className="rule-line" />
        <div className="chip mono" style={{ textTransform: 'uppercase', letterSpacing: '0.14em' }}>END</div>
      </div>

      <div
        className="grid-12"
        style={{ paddingTop: 'var(--r6)', paddingBottom: 'var(--r5)' }}
      >
        <div style={{ gridColumn: 'span 3' }}>
          <div className="mono" style={{ fontSize: 14, letterSpacing: '0.02em' }}>designlang</div>
          <p style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 8, fontFamily: 'var(--font-mono)' }}>
            Built in Node, Playwright, and opinion.
          </p>
        </div>

        <div style={{ gridColumn: 'span 3' }}>
          <div style={colHead}>community</div>
          <a href="https://github.com/Manavarya09/design-extract" style={linkStyle}>GitHub</a>
          <a href="https://www.npmjs.com/package/designlang" style={linkStyle}>npm</a>
          <a href="https://github.com/Manavarya09/design-extract/discussions" style={linkStyle}>Discussions</a>
          <a href="https://github.com/Manavarya09/design-extract/issues" style={linkStyle}>Issues</a>
          <a href="https://github.com/sponsors/Manavarya09" style={linkStyle}>Sponsor</a>
        </div>

        <div style={{ gridColumn: 'span 3' }}>
          <div style={colHead}>reference</div>
          <a href="https://github.com/Manavarya09/design-extract#cli" style={linkStyle}>CLI docs</a>
          <a href="https://github.com/Manavarya09/design-extract#mcp" style={linkStyle}>MCP server</a>
          <a href="https://github.com/Manavarya09/design-extract#agent-rules" style={linkStyle}>Cursor rules</a>
          <a href="https://github.com/Manavarya09/design-extract/blob/main/CHANGELOG.md" style={linkStyle}>CHANGELOG</a>
        </div>

        <div style={{ gridColumn: 'span 3' }}>
          <div style={colHead}>colophon</div>
          <p style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', lineHeight: 1.6 }}>
            v10 · MIT · Manav Arya Singh · 2026.
          </p>
          <p style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 10, fontFamily: 'var(--font-mono)', lineHeight: 1.6 }}>
            Set in Fraunces (Undercase), Instrument Sans (Instrument), and JetBrains Mono (JetBrains).
          </p>
        </div>
      </div>

      <div
        className="mono"
        style={{
          fontSize: 11,
          color: 'var(--ink-3)',
          borderTop: '1px solid var(--paper-3)',
          paddingTop: 'var(--r3)',
          letterSpacing: '0.04em',
        }}
      >
        Extracted, not generated.
      </div>
    </footer>
  );
}

function V9Capabilities() {
  const cardStyle = {
    border: '1px solid var(--ink)',
    padding: 'var(--r4)',
    background: 'var(--paper)',
  };
  const tagStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'var(--accent, #FF4800)',
    marginBottom: 'var(--r2)',
    display: 'block',
  };
  const titleStyle = {
    fontSize: 22,
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
    marginBottom: 'var(--r3)',
  };
  const bodyStyle = {
    fontSize: 14,
    color: 'var(--ink-2)',
    lineHeight: 1.55,
    marginBottom: 'var(--r3)',
  };
  const codeStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    background: 'var(--ink)',
    color: 'var(--paper)',
    padding: 'var(--r2) var(--r3)',
    display: 'block',
    overflowX: 'auto',
    whiteSpace: 'pre',
  };

  const items = [
    {
      tag: 'A · motion',
      title: 'Motion language',
      body: 'Easing families, springs, duration tokens, scroll-linked animation detection, keyframe classification. Emits *-motion-tokens.json.',
      code: `feel: springy
durations: xs 150ms, sm 220ms, md 380ms
easings: ease-out (61%), spring (18%)
scroll-linked: yes`,
    },
    {
      tag: 'B · anatomy',
      title: 'Component anatomy v2',
      body: 'Variant × size × state matrices with slot inference. Emits typed React stubs (*-anatomy.tsx).',
      code: `interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  leadingIcon?: ReactNode;
  badge?: ReactNode;
}`,
    },
    {
      tag: 'E · voice',
      title: 'Brand voice',
      body: 'Tone, pronoun posture, heading style, CTA verbs. The words that match the paint.',
      code: `tone: technical
pronoun: we→you
headings: Sentence case (tight)
cta: start (14), ship (8), deploy (5)`,
    },
    {
      tag: 'F · lint',
      title: 'designlang lint',
      body: 'Audit your own tokens. Color sprawl, spacing variance, contrast. Exits non-zero. CI-ready.',
      code: `$ designlang lint ./tokens.json
Score 74/100 · Grade C
ERROR [contrast-wcag-aa] 2 pairs fail
WARN  [color-sprawl] 3 near-dupes`,
    },
    {
      tag: 'C · drift',
      title: 'designlang drift',
      body: 'Compare local tokens against a live site. Drifted, matched, unknown — verdict + ratio.',
      code: `$ designlang drift \\
  https://app.com \\
  --tokens ./src/tokens.json
Verdict: notable-drift (0.24)`,
    },
    {
      tag: 'D · visual-diff',
      title: 'designlang visual-diff',
      body: 'Two URLs, one HTML file. Embedded screenshots, size deltas, changed tokens. No server needed.',
      code: `$ designlang visual-diff \\
  https://staging.app.com \\
  https://app.com`,
    },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'var(--r3)',
        padding: 'var(--r5) 0',
      }}
    >
      {items.map((it) => (
        <div key={it.title} style={cardStyle}>
          <span style={tagStyle}>{it.tag}</span>
          <h3 className="display" style={titleStyle}>{it.title}</h3>
          <p style={bodyStyle}>{it.body}</p>
          <pre style={codeStyle}>{it.code}</pre>
        </div>
      ))}
    </div>
  );
}

function V10Capabilities() {
  // v10 takes the front page — six new extractors, one orchestrator, one
  // prompt pack. The design mirrors V9Capabilities but leads with a headline
  // because v10 is the current release.
  const items = [
    {
      tag: 'A · intent',
      title: 'Page intent',
      body: 'A classifier that labels the URL landing / pricing / docs / blog / product / about / dashboard / auth / legal — with confidence and ranked alternates.',
      code: `type: pricing (0.87)
signals: url /pricing, $19/mo grid,
  3 cards, 2 CTAs
alternates: landing (0.21)`,
    },
    {
      tag: 'B · sections',
      title: 'Section roles',
      body: 'Hero, feature-grid, logo-wall, stats, testimonial, pricing-table, faq, steps, comparison, gallery, bento, cta, footer. Plus extracted slot copy and reading order.',
      code: `reading order:
  hero → logo-wall → feature-grid
  → testimonial → pricing-table
  → faq → cta → footer`,
    },
    {
      tag: 'C · material',
      title: 'Material language',
      body: 'Glassmorphism, neumorphism, flat, brutalist, skeuomorphic, material-you, soft-ui — inferred from shadow complexity, backdrop-filter, saturation, and geometry.',
      code: `label: brutalist (0.78)
shadow profile: hard (blur 0)
avg radius: 2px
saturation: 0.91`,
    },
    {
      tag: 'D · imagery',
      title: 'Imagery style',
      body: 'Photography, 3d-render, isometric, flat-illustration, gradient-mesh, icon-only, screenshot — with dominant aspect ratio and image-radius profile.',
      code: `label: flat-illustration
svg: 12/14 (86%)
aspect: square-ish
radius profile: rounded`,
    },
    {
      tag: 'E · library',
      title: 'Component library',
      body: 'Identifies shadcn/ui, Radix, Headless UI, MUI, Chakra, Mantine, Ant Design, Bootstrap, HeroUI/NextUI, Tailwind UI, Vuetify, or plain Tailwind.',
      code: `library: shadcn/ui (0.82)
evidence:
  - shadcn css tokens
  - radix attributes x 4
tailwind utility density 71%`,
    },
    {
      tag: 'F · logo',
      title: 'Logo extraction',
      body: '--full pulls the live SVG (or raster bytes) and samples clearspace. Writes *-logo.svg and *-logo.json.',
      code: `kind: svg
dims: 112 x 28
aspect: 4.000
clearspace: 48/32/48/32 px`,
    },
    {
      tag: 'G · multipage',
      title: 'Multi-page crawl',
      body: '--full or --pages N auto-discovers pricing / docs / blog / about / product from nav and emits a cross-page consistency report.',
      code: `pages: 5 (+ homepage)
shared colors: 17
pairwise jaccard: 0.82 avg
per-page uniques flagged`,
    },
    {
      tag: 'H · prompts',
      title: 'Prompt pack',
      body: 'Ready-to-paste prompts for v0, Lovable, Cursor, Claude Artifacts. Tokens, section order, voice, and library all inlined so one paste is enough.',
      code: `*-prompts/
  v0.txt
  lovable.txt
  cursor.md
  claude-artifacts.md
  recipe-button.md ...`,
    },
    {
      tag: 'I · smart',
      title: '--smart classifier',
      body: 'When heuristic confidence dips below 0.6, optionally route through OpenAI or Anthropic. Zero-dep fetch; no key, no call.',
      code: `$ designlang <url> --smart
provider: anthropic
model: claude-haiku-4-5
fallback: heuristic (still prints)`,
    },
  ];

  const cardStyle = {
    border: '1px solid var(--ink)',
    padding: 'var(--r4)',
    background: 'var(--paper)',
  };
  const tagStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'var(--accent)',
    marginBottom: 'var(--r2)',
    display: 'block',
  };
  const titleStyle = {
    fontSize: 22,
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
    marginBottom: 'var(--r3)',
  };
  const bodyStyle = {
    fontSize: 14,
    color: 'var(--ink-2)',
    lineHeight: 1.55,
    marginBottom: 'var(--r3)',
  };
  const codeStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    background: 'var(--ink)',
    color: 'var(--paper)',
    padding: 'var(--r2) var(--r3)',
    display: 'block',
    overflowX: 'auto',
    whiteSpace: 'pre',
  };

  return (
    <div style={{ padding: 'var(--r5) 0' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: 'var(--r5)',
          marginBottom: 'var(--r5)',
          flexWrap: 'wrap',
        }}
      >
        <h2
          className="display"
          style={{ fontSize: 'clamp(40px, 6vw, 72px)', letterSpacing: '-0.03em', lineHeight: 1 }}
        >
          The <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Intent</em> release.
        </h2>
        <p
          className="prose"
          style={{ maxWidth: '42ch', fontSize: 16, lineHeight: 1.55, color: 'var(--ink-2)' }}
        >
          Everything else captures <em>how</em> a site looks. v10 captures <em>what it is</em> —
          the semantic layer an LLM needs to rebuild a site faithfully, not just restyle a
          generic scaffold.
        </p>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--r3)',
        }}
      >
        {items.map((it) => (
          <div key={it.title} style={cardStyle}>
            <span style={tagStyle}>{it.tag}</span>
            <h3 className="display" style={titleStyle}>{it.title}</h3>
            <p style={bodyStyle}>{it.body}</p>
            <pre style={codeStyle}>{it.code}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
