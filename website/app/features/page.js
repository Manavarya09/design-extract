import Rule from '../components/Rule';
import TokenBrowser from '../components/TokenBrowser';
import McpSection from '../components/McpSection';
import PlatformTabs from '../components/PlatformTabs';
import CssHealth from '../components/CssHealth';
import A11ySlider from '../components/A11ySlider';
import RegionsComponents from '../components/RegionsComponents';
import Specimens from '../components/Specimens';
import Comparison from '../components/Comparison';
import {
  V11Showcase,
  V10Capabilities,
  V9Capabilities,
  InstallTracks,
  SiteFooter,
} from '../page';

export const metadata = {
  title: 'Features — designlang',
  description:
    'Every capability behind designlang: clone, ci, studio (v11), the v10 semantic layer (intent · sections · material · library), motion · anatomy · voice (v9), DTCG token browser, MCP server, multi-platform emitters, CSS health, A11y remediation, regions + components, install tracks.',
  alternates: { canonical: 'https://designlang.app/features' },
  openGraph: {
    title: 'Features — designlang',
    description: 'Everything designlang ships, on one page.',
  },
};

export default function Features() {
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
          <a href="/" className="mono" style={{ fontSize: 13, letterSpacing: '0.02em', borderBottom: 0, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mark.svg" alt="" width={22} height={22} style={{ display: 'block' }} />
            designlang <span style={{ color: 'var(--ink-3)', marginLeft: 12 }}>v12.1</span>
          </a>
          <nav
            className="mono"
            style={{ display: 'flex', gap: 'var(--r5)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}
          >
            <a href="/" style={{ borderBottom: 0 }}>Home</a>
            <a href="/features" style={{ borderBottom: 0, color: 'var(--accent)' }}>Features</a>
            <a href="/vs/design-extractor" style={{ borderBottom: 0 }}>vs</a>
            <a href="https://github.com/Manavarya09/design-extract" style={{ borderBottom: 0 }}>GitHub</a>
            <a href="https://www.npmjs.com/package/designlang" style={{ borderBottom: 0 }}>npm</a>
          </nav>
        </div>
      </header>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{ paddingBlock: 'var(--r7) var(--r8)' }}>
        <div className="section-label" style={{ marginBottom: 'var(--r6)' }}>
          <span>§00 — features</span>
        </div>
        <h1 className="display" style={{ fontSize: 'clamp(48px, 8vw, 96px)', letterSpacing: '-0.035em', lineHeight: 0.96, marginBottom: 'var(--r6)' }}>
          Every capability,<br />
          <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>one page</em>.
        </h1>
        <p className="prose" style={{ fontSize: 19, lineHeight: 1.5, maxWidth: '54ch', color: 'var(--ink-2)' }}>
          Three commands at the top — <code className="mono">clone</code>, <code className="mono">ci</code>, <code className="mono">studio</code> — sit on a stack of nine semantic classifiers, six v9 tools, an editorial token browser, a live MCP server, multi-platform emitters, CSS health, A11y remediation, and four install tracks. Everything below this line is real, shipped, and free.
        </p>
      </section>

      {/* ── §01 v12.1 — GRADE ────────────────────────────── */}
      <section id="grade">
        <Rule number="01" label="v12.1 — grade" />
        <div style={{ padding: 'var(--r6) 0', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 'var(--r6)', alignItems: 'start' }}>
          <div>
            <h2 className="display" style={{ fontSize: 'clamp(32px, 4vw, 56px)', letterSpacing: '-0.02em', lineHeight: 1.04, marginBottom: 'var(--r4)' }}>
              A shareable<br /><em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>report card</em> for any site.
            </h2>
            <p className="prose" style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--ink-2)', marginBottom: 'var(--r4)', maxWidth: '46ch' }}>
              <code className="mono">designlang grade &lt;url&gt;</code> emits a self-contained HTML audit page —
              big serif letter grade, eight scored dimensions, evidence pulled from the site itself
              (palette, type specimen, spacing rhythm), and a strengths / what-to-fix ledger.
              Editorial layout, dark-mode toggle, print-ready, OG meta. Post the file. Send it to a client.
            </p>
            <pre className="mono" style={{ background: 'var(--ink)', color: 'var(--paper)', padding: 'var(--r4) var(--r5)', fontSize: 13, lineHeight: 1.7, overflowX: 'auto' }}>
{`$ npx designlang grade https://stripe.com

  Grade B · 87/100 · https://stripe.com
  ✓ stripe-com.grade.html
  ✓ stripe-com.grade.md
  ✓ stripe-com.grade.json`}
            </pre>
          </div>
          <ul className="mono" style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 12, lineHeight: 1.7, letterSpacing: '0.02em' }}>
            {[
              ['8 dimensions', 'color · typography · spacing · elevation · radii · a11y · tokenization · css health'],
              ['Evidence', 'real palette swatches · type specimen in the site’s own font · spacing rhythm bars'],
              ['Self-contained', 'one HTML file · no API · no build step · OG meta for shareable links'],
              ['CI-ready', '--format json | md | html | all · exits 0 with the grade'],
              ['Themes', 'paper / ink with dark-mode toggle · print-ready'],
            ].map(([k, v]) => (
              <li key={k} style={{ paddingBlock: 'var(--r3)', borderTop: '1px solid var(--ink-3)' }}>
                <span style={{ textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--ink-3)', fontSize: 10, display: 'block', marginBottom: 4 }}>{k}</span>
                <span style={{ color: 'var(--ink)' }}>{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── §02 v11 — CLONE · CI · STUDIO ────────────────── */}
      <section id="v11">
        <Rule number="02" label="v11 — clone · ci · studio" />
        <V11Showcase />
      </section>

      {/* ── §02 v10 — SEMANTIC INTELLIGENCE ──────────────── */}
      <section id="v10">
        <Rule number="03" label="v10 — semantic intelligence" />
        <V10Capabilities />
      </section>

      {/* ── §03 v9 — MOTION · ANATOMY · VOICE ────────────── */}
      <section id="v9">
        <Rule number="04" label="v9 — motion · anatomy · voice" />
        <V9Capabilities />
      </section>

      {/* ── §04 DTCG BROWSER ─────────────────────────────── */}
      <section id="tokens">
        <Rule number="05" label="DTCG token browser" />
        <div style={{ padding: 'var(--r6) 0' }}>
          <TokenBrowser />
        </div>
      </section>

      {/* ── §05 MCP ──────────────────────────────────────── */}
      <section id="mcp">
        <Rule number="06" label="MCP server" />
        <McpSection />
      </section>

      {/* ── §06 MULTI-PLATFORM ───────────────────────────── */}
      <section id="platforms">
        <Rule number="07" label="multi-platform emitters" />
        <PlatformTabs />
      </section>

      {/* ── §07 HEALTH ───────────────────────────────────── */}
      <section id="health">
        <CssHealth />
      </section>

      {/* ── §08 REMEDIATION ──────────────────────────────── */}
      <section id="a11y">
        <A11ySlider />
      </section>

      {/* ── §09 REGIONS + COMPONENTS ─────────────────────── */}
      <section id="regions">
        <RegionsComponents />
      </section>

      {/* ── §10 SPECIMENS ────────────────────────────────── */}
      <section id="specimens">
        <Rule number="10" label="specimens" />
        <Specimens />
      </section>

      {/* ── §11 COMPARISON ───────────────────────────────── */}
      <section id="compared">
        <Rule number="11" label="compared" />
        <Comparison />
      </section>

      {/* ── §12 INSTALL ──────────────────────────────────── */}
      <section id="install" style={{ paddingBottom: 'var(--r9)' }}>
        <Rule number="12" label="install" />
        <InstallTracks />
      </section>

      <SiteFooter />
    </main>
  );
}
