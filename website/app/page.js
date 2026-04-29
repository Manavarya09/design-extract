import HeroExtractor from './components/HeroExtractor';

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
              <span style={{ color: 'var(--ink-3)', marginLeft: 12 }}>v12.1</span>
            </span>
          </span>
          <nav
            className="mono"
            style={{ display: 'flex', gap: 'var(--r5)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}
          >
            <a href="/gallery" style={{ borderBottom: 0 }}>Gallery</a>
            <a href="/spec" style={{ borderBottom: 0 }}>Spec</a>
            <a href="/features" style={{ borderBottom: 0 }}>Features</a>
            <a href="/vs/design-extractor" style={{ borderBottom: 0, color: 'var(--accent)' }}>vs</a>
            <a href="https://github.com/Manavarya09/design-extract" style={{ borderBottom: 0 }}>GitHub</a>
          </nav>
        </div>
      </header>

      {/* ── HERO — single anchor, paste a URL, see the system ─ */}
      <section
        id="extract"
        style={{ paddingBlock: 'var(--r8) var(--r7)', textAlign: 'center', borderTop: 0 }}
      >
        <div className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 'var(--r4)' }}>
          $0 · MIT · no account · CLI + MCP + studio
        </div>
        <h1
          className="display hero-title"
          style={{ marginBottom: 'var(--r5)', fontSize: 'clamp(48px, 8vw, 104px)', letterSpacing: '-0.035em', lineHeight: 0.95 }}
        >
          Extract any website&rsquo;s<br />
          <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>design system</em>.
        </h1>
        <p
          className="prose"
          style={{ fontSize: 19, lineHeight: 1.5, maxWidth: '52ch', margin: '0 auto var(--r6)', color: 'var(--ink-2)' }}
        >
          Paste a URL. Get DTCG tokens, Tailwind config, CSS vars, Figma variables,
          motion, anatomy, voice — and a single agent-native <code className="mono">DESIGN.md</code> —
          back in seconds. <a href="/features" style={{ color: 'var(--ink)' }}>See everything →</a>
        </p>

        <HeroExtractor />

        <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)', marginTop: 'var(--r5)' }}>
          1 free demo per day · unlimited via <code style={{ color: 'var(--ink)' }}>npx designlang &lt;url&gt;</code>
        </div>
      </section>

      {/* ── CTA STRIP — three doors into the deeper site ─── */}
      <section style={{ paddingBlock: 'var(--r6) var(--r9)', borderTop: '1px solid var(--ink)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 0,
            borderBottom: '1px solid var(--ink)',
          }}
        >
          {[
            { num: '01', tag: 'new · v12.1', headline: 'Grade any site — shareable report card', href: '/features#grade' },
            { num: '02', tag: 'features', headline: 'Every capability, one page', href: '/features' },
            { num: '03', tag: 'vs', headline: 'vs. design-extractor.com', href: '/vs/design-extractor' },
            { num: '04', tag: 'install', headline: 'CLI · MCP · agent rules · Chrome', href: '/features#install' },
          ].map((c, i) => (
            <a
              key={c.num}
              href={c.href}
              style={{
                display: 'block',
                padding: 'var(--r5) var(--r4)',
                borderLeft: i === 0 ? 'none' : '1px solid var(--ink)',
                borderBottom: 0,
              }}
            >
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
                {c.num} · {c.tag}
              </div>
              <div className="display" style={{ fontSize: 24, letterSpacing: '-0.02em', lineHeight: 1.1, marginTop: 8 }}>
                {c.headline} <span style={{ color: 'var(--accent)' }}>→</span>
              </div>
            </a>
          ))}
        </div>

        <div
          className="mono"
          style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.04em', paddingTop: 'var(--r5)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}
        >
          <div>v12.1 · MIT · Manav Arya Singh · 2026</div>
          <div>Extracted, not generated.</div>
        </div>
      </section>
    </main>
  );
}

export function InstallTracks() {
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

export function SiteFooter() {
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

export function V9Capabilities() {
  const items = [
    {
      tag: 'A · motion',
      title: 'Motion language',
      body: 'Easing families, springs, duration tokens, scroll-linked detection, keyframe classification. Emits *-motion-tokens.json.',
      code: `feel: springy
durations: xs 150ms · sm 220ms · md 380ms
easings: ease-out 61% · spring 18%
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
      body: 'Two URLs, one HTML file. Embedded screenshots, size deltas, changed tokens. No server.',
      code: `$ designlang visual-diff \\
  https://staging.app.com \\
  https://app.com`,
    },
    {
      tag: 'E · voice',
      title: 'Brand voice',
      body: 'Tone, pronoun posture, heading style, CTA verbs. The words that match the paint.',
      code: `tone: technical
pronoun: we → you
headings: Sentence case (tight)
cta: start 14 · ship 8 · deploy 5`,
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
  ];

  return (
    <div className="v9" style={{ padding: 'var(--r6) 0 var(--r7)' }}>
      <div className="v9-head">
        <div>
          <span className="section-label" style={{ display: 'block', marginBottom: 'var(--r3)' }}>
            <span>§00.9 — v9 · supporting tools</span>
          </span>
          <h2
            className="display"
            style={{ fontSize: 'clamp(32px, 4.4vw, 56px)', letterSpacing: '-0.025em', lineHeight: 1.02 }}
          >
            The <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>how</em> it looks. <br />
            And how it moves, reads, <br /> and drifts.
          </h2>
        </div>
        <p
          className="prose"
          style={{ maxWidth: '38ch', fontSize: 15, lineHeight: 1.55, color: 'var(--ink-2)', alignSelf: 'end' }}
        >
          Six extractors that sit under v10 — motion, anatomy, drift,
          visual-diff, voice, lint. Each writes a single file. Each exits non-zero
          when it matters.
        </p>
      </div>

      <ol className="v9-list">
        {items.map((it, i) => (
          <li key={it.title} className="v9-row">
            <div className="v9-num mono">{String(i + 1).padStart(2, '0')}</div>
            <div className="v9-text">
              <div className="v9-tag mono">{it.tag}</div>
              <h3 className="display v9-title">{it.title}</h3>
              <p className="v9-body">{it.body}</p>
            </div>
            <pre className="v9-code mono">{it.code}</pre>
          </li>
        ))}
      </ol>

      <style>{`
        .v9-head {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: var(--r6);
          align-items: end;
          padding-bottom: var(--r6);
          border-bottom: 1px solid var(--ink);
        }
        .v9-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .v9-row {
          display: grid;
          grid-template-columns: 56px minmax(0, 1.1fr) minmax(0, 1fr);
          gap: var(--r5);
          align-items: start;
          padding: var(--r5) 0;
          border-bottom: 1px solid var(--paper-3);
        }
        .v9-row:last-child { border-bottom: 1px solid var(--ink); }
        .v9-num {
          font-size: 40px;
          line-height: 1;
          color: var(--ink-3);
          letter-spacing: -0.02em;
          font-variant-numeric: tabular-nums;
        }
        .v9-tag {
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 6px;
        }
        .v9-title {
          font-size: 26px;
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
        }
        .v9-body {
          font-size: 14px;
          line-height: 1.55;
          color: var(--ink-2);
          max-width: 42ch;
        }
        .v9-code {
          font-size: 11px;
          line-height: 1.7;
          background: var(--ink);
          color: var(--paper);
          padding: var(--r3) var(--r4);
          overflow-x: auto;
          white-space: pre;
          margin: 0;
          align-self: start;
        }
        @media (max-width: 900px) {
          .v9-head { grid-template-columns: 1fr; gap: var(--r4); }
          .v9-row { grid-template-columns: 40px 1fr; }
          .v9-code { grid-column: 1 / -1; margin-top: var(--r3); }
          .v9-num { font-size: 28px; }
        }
      `}</style>
    </div>
  );
}

export function V11Showcase() {
  const tracks = [
    {
      num: '01',
      tag: 'clone',
      headline: 'A working Next.js repo. From any URL. In one command.',
      kicker: 'v0, Lovable, Locofy, Builder — all hand you prompts or styled scaffolds. We hand you a project.',
      command: '$ npx designlang clone stripe.com',
      effect: [
        'Reading intent . . . . . . . . . pricing (0.87)',
        'Reading sections . . . . hero → logo-wall',
        '                         → feature-grid → pricing',
        '                         → faq → cta → footer',
        'Reading voice  . . . . . . . . . technical · we→you',
        'Writing package.json, globals.css, layout.js,',
        '        page.js (7 sections), README.md',
        '',
        'cd cloned-design && npm install && npm run dev',
      ].join('\n'),
      kill: 'Paid peers: $200+/mo · output = styled scaffold. designlang: $0 · output = the repo.',
    },
    {
      num: '02',
      tag: 'ci',
      headline: 'A design regression bot. On every pull request. Free.',
      kicker: 'Chromatic for a design system you don\'t own yet. Drift + score + markdown comment. Any CI — GitHub, GitLab, CircleCI, local.',
      command: '$ npx designlang ci app.yoursite.com \\\n    --tokens ./tokens.json \\\n    --fail-on notable-drift',
      effect: [
        '## designlang · regression guard',
        '',
        'Overall  🟢 92/100  grade A',
        'Drift    ≠ notable-drift (ratio 0.24)',
        '',
        '| token          | local   | live    |',
        '|----------------|---------|---------|',
        '| color.primary  | #3b82f6 | #533afd |',
        '| radius.md      | 6px     | 8px     |',
        '',
        '→ wrote .designlang-ci/ci-report.md (exit 1)',
      ].join('\n'),
      kill: 'No dashboard. No subscription. No account. The report is a file you can paste anywhere.',
    },
    {
      num: '03',
      tag: 'studio',
      headline: 'A local studio. For the extraction you just ran.',
      kicker: 'Click swatches to copy hex. Read your reading order. Inspect voice, motion, DNA. All on localhost, all from the last extraction on disk.',
      command: '$ npx designlang studio',
      effect: [
        '  designlang studio',
        '  serving ./design-extract-output',
        '  prefix: stripe-com',
        '',
        '  → http://localhost:4837',
        '',
        '  §01 DNA      pricing · brutalist · shadcn',
        '  §02 Tokens   48 colors · 12 sizes · 7 radii',
        '  §03 Voice    technical · we→you · start·ship',
        '  §04 Motion   ease-out 61% · 220ms · springy',
      ].join('\n'),
      kill: 'Figma Tokens Studio is $100+/seat. This is zero-dep Node + your browser.',
    },
  ];

  return (
    <div style={{ padding: 'var(--r5) 0 var(--r7)' }}>
      <div className="v11-head">
        <div>
          <span className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)' }}>
            The release that kills the competition
          </span>
          <h2
            className="display"
            style={{ fontSize: 'clamp(44px, 7vw, 88px)', letterSpacing: '-0.035em', lineHeight: 0.98, marginTop: 'var(--r4)' }}
          >
            Stop shipping <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>tokens</em>.<br />
            Start shipping the <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>outcome</em>.
          </h2>
        </div>
        <p
          className="prose"
          style={{ maxWidth: '42ch', fontSize: 17, lineHeight: 1.5, color: 'var(--ink-2)', alignSelf: 'end', fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
        >
          v11 is three commands that end three paid categories.
          A working clone. A regression bot. A local studio.
          One CLI, no account, no keys.
        </p>
      </div>

      <div className="v11-tracks">
        {tracks.map((t) => (
          <article key={t.num} className="v11-track">
            <div className="v11-meta">
              <div className="v11-num mono">{t.num}</div>
              <div className="v11-tag mono">designlang {t.tag}</div>
            </div>
            <div className="v11-body">
              <h3 className="display v11-headline">{t.headline}</h3>
              <p className="v11-kicker">{t.kicker}</p>
              <pre className="v11-cmd mono">{t.command}</pre>
              <pre className="v11-effect mono">{t.effect}</pre>
              <p className="v11-kill mono">{t.kill}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="v11-coda">
        <p className="display" style={{ fontSize: 'clamp(22px, 2.4vw, 30px)', lineHeight: 1.3, fontStyle: 'italic', maxWidth: '46ch' }}>
          Everyone else sells the <span style={{ color: 'var(--accent)' }}>inputs</span>. designlang ships the <span style={{ color: 'var(--accent)' }}>outputs</span>.
        </p>
        <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
          $0 · MIT · one CLI · no account
        </div>
      </div>

      <style>{`
        .v11-head {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: var(--r6);
          align-items: end;
          padding: var(--r5) 0 var(--r6);
          border-bottom: 2px solid var(--ink);
        }
        .v11-tracks { display: block; }
        .v11-track {
          display: grid;
          grid-template-columns: 140px 1fr;
          gap: var(--r5);
          padding: var(--r6) 0;
          border-bottom: 1px solid var(--ink);
          align-items: start;
        }
        .v11-meta { display: flex; flex-direction: column; gap: var(--r3); position: sticky; top: 24px; }
        .v11-num {
          font-size: 72px;
          line-height: 0.9;
          font-weight: 400;
          letter-spacing: -0.04em;
          color: var(--ink);
          font-variant-numeric: tabular-nums;
        }
        .v11-tag {
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent);
        }
        .v11-body { display: grid; gap: var(--r4); min-width: 0; }
        .v11-headline {
          font-size: clamp(26px, 3.4vw, 44px);
          letter-spacing: -0.025em;
          line-height: 1.05;
          max-width: 22ch;
          margin: 0;
        }
        .v11-kicker {
          font-size: 16px;
          line-height: 1.55;
          color: var(--ink-2);
          max-width: 58ch;
          margin: 0;
        }
        .v11-cmd {
          font-size: 13px;
          line-height: 1.6;
          background: var(--ink);
          color: var(--accent);
          padding: var(--r4) var(--r5);
          white-space: pre;
          overflow-x: auto;
          margin: var(--r2) 0 0;
        }
        .v11-effect {
          font-size: 12px;
          line-height: 1.65;
          background: var(--paper-2);
          color: var(--ink);
          padding: var(--r4) var(--r5);
          white-space: pre;
          overflow-x: auto;
          border-left: 2px solid var(--accent);
          margin: 0;
        }
        .v11-kill {
          font-size: 11px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--ink-2);
          border-top: 1px solid var(--paper-3);
          padding-top: var(--r3);
          margin: var(--r2) 0 0;
          line-height: 1.7;
        }
        .v11-coda {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: var(--r5);
          padding: var(--r7) 0 var(--r3);
          flex-wrap: wrap;
        }
        @media (max-width: 860px) {
          .v11-head { grid-template-columns: 1fr; gap: var(--r4); }
          .v11-track { grid-template-columns: 1fr; gap: var(--r4); }
          .v11-meta { position: static; flex-direction: row; align-items: baseline; gap: var(--r4); }
          .v11-num { font-size: 48px; }
        }
      `}</style>
    </div>
  );
}

export function V10Capabilities() {
  // v10 is now supporting intelligence beneath the v11 trio. Compact
  // editorial strip — not a uniform card grid.
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

  return (
    <div style={{ padding: 'var(--r5) 0 var(--r6)' }}>
      <div className="v10-head">
        <div>
          <span className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
            powers v11 from the inside
          </span>
          <h2
            className="display"
            style={{ fontSize: 'clamp(28px, 3.6vw, 44px)', letterSpacing: '-0.02em', lineHeight: 1.05, marginTop: 'var(--r3)' }}
          >
            The <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>semantic</em> layer.
          </h2>
        </div>
        <p className="prose" style={{ maxWidth: '42ch', fontSize: 15, lineHeight: 1.55, color: 'var(--ink-2)', alignSelf: 'end' }}>
          What clone, ci, and studio read under the hood: nine classifiers
          that label <em>what a site is</em>, not just how it looks.
        </p>
      </div>

      <ol className="v10-list">
        {items.map((it) => {
          const [letter, name] = it.tag.split(' · ');
          return (
            <li key={it.title} className="v10-row">
              <div className="v10-letter mono">{letter}</div>
              <div className="v10-text">
                <div className="v10-tag mono">{name}</div>
                <h3 className="display v10-title">{it.title}</h3>
                <p className="v10-body">{it.body}</p>
              </div>
              <pre className="v10-code mono">{it.code}</pre>
            </li>
          );
        })}
      </ol>

      <style>{`
        .v10-head {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: var(--r5);
          align-items: end;
          padding-bottom: var(--r5);
          border-bottom: 1px solid var(--ink);
        }
        .v10-list { list-style: none; padding: 0; margin: 0; }
        .v10-row {
          display: grid;
          grid-template-columns: 48px minmax(0, 1.1fr) minmax(0, 1fr);
          gap: var(--r4);
          align-items: start;
          padding: var(--r4) 0;
          border-bottom: 1px solid var(--paper-3);
        }
        .v10-row:last-child { border-bottom: 1px solid var(--ink); }
        .v10-letter {
          font-size: 24px;
          line-height: 1;
          color: var(--accent);
          letter-spacing: -0.02em;
        }
        .v10-tag {
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink-3);
          margin-bottom: 4px;
        }
        .v10-title {
          font-size: 20px;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 6px;
        }
        .v10-body {
          font-size: 13px;
          line-height: 1.55;
          color: var(--ink-2);
          max-width: 48ch;
        }
        .v10-code {
          font-size: 10.5px;
          line-height: 1.7;
          background: var(--paper-2);
          color: var(--ink);
          padding: var(--r3) var(--r4);
          overflow-x: auto;
          white-space: pre;
          margin: 0;
          border-left: 1px solid var(--ink);
          align-self: start;
        }
        @media (max-width: 900px) {
          .v10-head { grid-template-columns: 1fr; gap: var(--r4); }
          .v10-row { grid-template-columns: 36px 1fr; }
          .v10-code { grid-column: 1 / -1; margin-top: var(--r2); }
          .v10-letter { font-size: 18px; }
        }
      `}</style>
    </div>
  );
}
