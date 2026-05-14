import CopyCmd from '../../components/CopyCmd';

export const metadata = {
  title: 'designlang vs design-extractor.com — honest comparison',
  description:
    'design-extractor.com ships a DESIGN.md. designlang ships the design system — DESIGN.md plus DTCG tokens, multi-platform emitters, anatomy, voice, motion, drift CI, clone, studio, MCP and a Figma plugin.',
  openGraph: {
    title: 'designlang vs design-extractor.com',
    description: 'They sell the spec. We ship the system. Honest feature comparison.',
  },
};

const ROWS = [
  ['DESIGN.md (single-file, 8-section, YAML front matter)',     true,  true,  'They invented this format. We emit it too.'],
  ['Account / email signup required',                            false, true,  'They gate behind email.'],
  ['Public pricing',                                              true,  false, '$0 vs. undisclosed.'],
  ['CLI',                                                         true,  false, 'npx designlang <url> — no signup, scriptable.'],
  ['MCP server (Claude Code / Cursor / Windsurf)',                true,  false, 'Editor reads the extraction as a live resource.'],
  ['DTCG W3C tokens',                                             true,  false, 'Industry-standard token spec.'],
  ['Tailwind + CSS vars + React/Vue/Svelte themes',               true,  false, 'Generated alongside the markdown.'],
  ['iOS / Android / Flutter / WordPress',                         true,  false, 'Multi-platform emitters.'],
  ['Figma variables + Figma plugin',                              true,  false, 'Figma-side import takes one click.'],
  ['Component anatomy (typed React stubs)',                       true,  false, 'Variant × size × state matrices, typed.'],
  ['Voice extraction (tone, CTA verbs, heading style)',           true,  false, 'The words that match the paint.'],
  ['Motion tokens + scripted WebM replay',                        true,  false, 'Transitions and keyframes captured.'],
  ['Brand-book PDF (chapter breaks, footers, attached tokens)',   true,  false, 'New in v12.11.'],
  ['CI drift bot (PR comment + scored tokens)',                   true,  false, 'designlang ci. Works in any CI.'],
  ['Clone — runnable Next.js repo from a URL',                    true,  false, 'designlang clone. One command, real project.'],
  ['Local studio (clickable swatches, zero account)',             true,  false, 'designlang studio → localhost:4837.'],
  ['Open source',                                                  true,  false, 'github.com/Manavarya09/design-extract.'],
];

export default function Vs() {
  return (
    <main>
      <section className="section" style={{ paddingTop: 64, paddingBottom: 32 }}>
        <div className="wrap">
          <p className="eyebrow">vs · design-extractor.com</p>
          <h1 className="h1" style={{ fontSize: 'clamp(40px, 6vw, 76px)', maxWidth: '15ch' }}>
            They sell the spec.<br />We ship the system.
          </h1>
          <p className="lede" style={{ marginTop: 20 }}>
            <a href="https://www.design-extractor.com" rel="nofollow noopener" style={{ color: 'var(--red-3)' }}>design-extractor.com</a>{' '}
            ships a one-file DESIGN.md for AI coding agents — clever positioning, single artifact.
            designlang ships DESIGN.md too, plus everything you actually need to <em>build</em> the design.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <p className="eyebrow">feature comparison · 2026-04-25</p>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table className="cmp">
                <thead>
                  <tr>
                    <th>Capability</th>
                    <th style={{ textAlign: 'center', width: 130 }}>designlang</th>
                    <th style={{ textAlign: 'center', width: 160 }}>design-extractor</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map(([cap, us, them, note]) => (
                    <tr key={cap}>
                      <td>{cap}</td>
                      <td style={{ textAlign: 'center' }} className={us ? 'yes' : 'no'}>{us ? '●' : '○'}</td>
                      <td style={{ textAlign: 'center' }} className={them ? 'yes' : 'no'}>{them ? '●' : '○'}</td>
                      <td className="muted" style={{ fontSize: 13 }}>{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mono faint" style={{ fontSize: 11, marginTop: 14 }}>
            Open a PR if anything above is wrong: github.com/Manavarya09/design-extract
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="card" style={{ padding: '32px 28px', textAlign: 'center' }}>
            <h2 className="h2" style={{ fontSize: 28 }}>Run them both. Decide for yourself.</h2>
            <p className="lede" style={{ margin: '0 auto 20px' }}>
              No signup, no API key. The whole CLI lives behind <code className="kbd">npx</code>.
            </p>
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
