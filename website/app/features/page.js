import CopyCmd from '../components/CopyCmd';

export const metadata = {
  title: 'Features — designlang',
  description:
    'Every capability behind designlang: extractors, emitters, MCP server, CSS health, WCAG remediation, brand books, drift CI.',
  alternates: { canonical: 'https://designlang.app/features' },
  openGraph: { title: 'Features — designlang', description: 'Everything designlang ships, on one page.' },
};

const GROUPS = [
  {
    title: 'Extractors',
    body: 'Nine extractors run against any URL — they read what your browser actually sees.',
    items: [
      ['palette',     'All colours from computed styles, deduped, named, with primary inferred from frequency × position × contrast.'],
      ['typography',  'Font families, weights, sizes, line-heights, letter-spacing — flagged primitive, semantic, or composite.'],
      ['spacing',     'Margin / padding / gap rhythm, snapped to a base scale and quantised to the nearest token.'],
      ['shadows',     'Box-shadows captured layer-by-layer with offset, blur, spread, alpha — emit as DTCG composite tokens.'],
      ['borders',     'Radius scale, border styles and widths — recovered from real DOM, not guessed from a class name.'],
      ['motion',      'Transitions and keyframe animations: durations, easing curves, stagger.'],
      ['anatomy',     'Components clustered by structural similarity. Slots, props and variants typed.'],
      ['voice',       'Headline, subhead and CTA samples lifted from the page — your real product voice, not Lorem.'],
      ['a11y',        'WCAG contrast audit with the smallest hue-shift remediation that passes AA.'],
    ],
  },
  {
    title: 'Emitters',
    body: 'One run, every output. Pipe wherever your stack lives.',
    items: [
      ['DTCG',        'W3C Design Tokens Community Group format. Primitive · semantic · composite, fully linked.'],
      ['Tailwind',    'Drop-in tailwind.config.js with theme.extend wired to the extracted tokens.'],
      ['CSS vars',    ':root { --color-primary: … } — copy-paste into any project.'],
      ['Figma',       'Figma Variables JSON. Imports clean into Figma\'s native variables panel.'],
      ['shadcn/ui',   'shadcn theme.json with colours, radii and font-family already mapped.'],
      ['React/Vue',   'Theme objects for React, Vue and Svelte that read like you wrote them by hand.'],
      ['iOS',         'SwiftUI Color, Font and CGFloat scales. Builds straight into Xcode.'],
      ['Android',     'Jetpack Compose ColorScheme, Typography, Shapes — no manual translation.'],
      ['Flutter',     'Dart ThemeData with light + dark generated from the extracted pair.'],
      ['WordPress',   'A block theme.json with palette, type, spacing — drop in any wp-content/themes folder.'],
      ['PDF',         'A 13-chapter brand book PDF with chapter breaks, running footers, optional embedded tokens.'],
    ],
  },
  {
    title: 'Agent surface',
    body: 'Built for the editor, not just the terminal.',
    items: [
      ['MCP server',  'Stdio MCP for Claude Code, Cursor and Windsurf. Your editor speaks tokens natively.'],
      ['AGENTS.md',   'Auto-generated AGENTS.md / .cursorrules / Claude skills with the extracted system embedded.'],
      ['DESIGN.md',   'Single-file, 8-section spec — agent-readable, repo-checkable, badge-verifiable.'],
      ['Studio',      'Local browser studio. Inspect every token, every spec, every emitter output.'],
      ['CI drift',    'Snapshots tokens. Fails the build when your design system silently drifts.'],
      ['Permalinks',  'Every extraction gets a /x/<hash> permalink. Share without re-running.'],
    ],
  },
];

export default function Features() {
  return (
    <main>
      <section className="section" style={{ paddingTop: 64, paddingBottom: 32 }}>
        <div className="wrap">
          <p className="eyebrow">features</p>
          <h1 className="h1" style={{ fontSize: 'clamp(40px, 5.5vw, 64px)', maxWidth: '14ch' }}>
            Everything designlang ships.
          </h1>
          <p className="lede" style={{ marginTop: 20 }}>
            Twenty-six capabilities. One CLI. No paid tier, no API keys, no signup.
            Plug into Tailwind, shadcn, Figma, your iOS app, your build pipeline, or your editor — same run.
          </p>
        </div>
      </section>

      {GROUPS.map((g) => (
        <section className="section" key={g.title} style={{ paddingTop: 24 }}>
          <div className="wrap">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 28, gap: 24, flexWrap: 'wrap' }}>
              <div>
                <p className="eyebrow">{g.title.toLowerCase()}</p>
                <h2 className="h2">{g.title}.</h2>
                <p className="lede" style={{ marginTop: 6 }}>{g.body}</p>
              </div>
              <span className="mono faint" style={{ fontSize: 12 }}>{g.items.length} items</span>
            </header>
            <div className="grid-3">
              {g.items.map(([tag, body]) => (
                <article key={tag} className="feature">
                  <span className="feature-tag">{tag}</span>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section">
        <div className="wrap">
          <div className="card" style={{ padding: '32px 28px', textAlign: 'center' }}>
            <h2 className="h2" style={{ fontSize: 28 }}>One command.</h2>
            <p className="lede" style={{ margin: '0 auto 20px' }}>Every output above lands in <code className="kbd">./design-extract-output</code> in seconds.</p>
            <div className="row" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
              <CopyCmd cmd="npx designlang stripe.com" hint="" />
              <a href="/" className="btn btn-primary">Try it live</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
