import Rule from './components/Rule';
import Marginalia from './components/Marginalia';
import HeroExtractor from './components/HeroExtractor';
import TokenBrowser from './components/TokenBrowser';
import McpSection from './components/McpSection';

export default function Home() {
  return (
    <main className="page">
      {/* ── HEAD SLUG ─────────────────────────────────────── */}
      <header style={{ paddingTop: 'var(--r6)', paddingBottom: 'var(--r7)' }}>
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
          <span className="mono" style={{ fontSize: 13, letterSpacing: '0.02em' }}>
            designlang
            <span style={{ color: 'var(--ink-3)', marginLeft: 12 }}>v7.0</span>
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
      <section id="extract" style={{ paddingBlock: 'var(--r10) var(--r9)', borderTop: 0 }}>
        <div className="with-margin">
          <div>
            <div className="section-label" style={{ marginBottom: 'var(--r6)' }}>
              <span>§00 — Entry</span>
            </div>
            <h1
              className="display"
              style={{
                fontSize: 'clamp(64px, 11vw, 200px)',
                marginBottom: 'var(--r7)',
              }}
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
        <div style={{ padding: 'var(--r6) 0' }}>
          <h2 className="display">One token. Five languages.</h2>
          <p className="prose" style={{ marginTop: 'var(--r4)', fontSize: 18 }}>
            <code className="mono">--platforms all</code> writes SwiftUI, Compose,
            Flutter, WordPress, plus the existing web outputs. Interactive tabs
            in the next pass.
          </p>
        </div>
      </section>

      {/* ── §04 HEALTH ────────────────────────────────────── */}
      <section>
        <Rule number="04" label="CSS health audit" />
      </section>

      {/* ── §05 REMEDIATION ───────────────────────────────── */}
      <section>
        <Rule number="05" label="A11y remediation" />
      </section>

      {/* ── §06 REGIONS + COMPONENTS ──────────────────────── */}
      <section>
        <Rule number="06" label="Regions and components" />
      </section>

      {/* ── §07 SPECIMENS ─────────────────────────────────── */}
      <section id="specimens">
        <Rule number="07" label="Specimens" />
      </section>

      {/* ── §08 COMPARISON ────────────────────────────────── */}
      <section>
        <Rule number="08" label="Compared" />
      </section>

      {/* ── §09 INSTALL ───────────────────────────────────── */}
      <section id="install" style={{ paddingBottom: 'var(--r10)' }}>
        <Rule number="09" label="Install" />
        <div className="with-margin" style={{ marginTop: 'var(--r5)' }}>
          <div>
            <pre
              className="mono"
              style={{
                padding: 'var(--r4) var(--r5)',
                background: 'var(--ink)',
                color: 'var(--paper)',
                fontSize: 14,
                overflowX: 'auto',
              }}
            >{`$ npx designlang https://stripe.com
$ npx designlang https://stripe.com --platforms all
$ npx designlang https://stripe.com --emit-agent-rules
$ designlang mcp --output-dir ./design-extract-output`}</pre>
          </div>
          <Marginalia>
            <div>Node</div>
            <div><code>≥ 20</code></div>
            <div style={{ marginTop: 10 }}>License</div>
            <div><code>MIT</code></div>
          </Marginalia>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer
        className="mono"
        style={{
          borderTop: 'var(--hair)',
          padding: 'var(--r5) 0 var(--r7)',
          fontSize: 12,
          color: 'var(--ink-2)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--r6)',
          justifyContent: 'space-between',
        }}
      >
        <span>designlang / built in Node, Playwright, and opinion.</span>
        <span>
          <a href="https://github.com/Manavarya09/design-extract">github</a> ·{' '}
          <a href="https://www.npmjs.com/package/designlang">npm</a> ·{' '}
          <a href="https://github.com/Manavarya09/design-extract/discussions">discussions</a>
        </span>
      </footer>
    </main>
  );
}
