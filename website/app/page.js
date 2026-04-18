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
      <section id="extract" style={{ paddingBlock: 'var(--r7) var(--r8)', borderTop: 0 }}>
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
4  $ npx designlang <url> --tokens-legacy
5  $ npx designlang <url> --dark`}
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
      </div>

      <style>{`
        .install-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0;
        }
        .install-col {
          padding: 0 var(--r5);
        }
        .install-col:first-child { padding-left: 0; }
        .install-col:last-child { padding-right: 0; }
        .install-col + .install-col {
          border-left: 1px solid var(--ink);
        }
        @media (max-width: 860px) {
          .install-grid { grid-template-columns: 1fr; gap: var(--r6); }
          .install-col { padding: 0; }
          .install-col + .install-col { border-left: 0; border-top: 1px solid var(--ink); padding-top: var(--r5); }
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
            v7.0 · MIT · Manav Arya Singh · 2026.
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
