export const metadata = {
  title: 'Build — designlang',
  description:
    'Generate a working Next.js page in any brand. Paste a URL, give a prompt, get a runnable repo using the actually-extracted tokens, anatomy and voice — not a guess.',
  alternates: { canonical: 'https://designlang.app/build' },
  openGraph: {
    title: 'designlang · build',
    description: 'AI UI generator that uses *your* brand. Not a guess.',
  },
};

const TEMPLATES = [
  { id: 'pricing',  title: 'Pricing page',     body: '3 tiers + comparison table + FAQ in the extracted brand.' },
  { id: 'landing',  title: 'Landing page',     body: 'Hero, features grid, testimonials, CTA — using the extracted voice.' },
  { id: 'docs',     title: 'Docs site',        body: 'Sidebar nav, prose layout, code blocks, all wired to the brand tokens.' },
  { id: 'dashboard', title: 'Dashboard skin',  body: 'Sidebar + topbar + stat cards + table — themed to the brand.' },
  { id: 'auth',     title: 'Auth flow',        body: 'Sign-in / sign-up / magic-link in the brand colour and type.' },
  { id: 'blog',     title: 'Blog index',       body: 'Card list + featured post + author chips, using the brand serif.' },
];

export default function BuildPage() {
  return (
    <main>
      <section className="section" style={{ paddingTop: 64, paddingBottom: 32 }}>
        <div className="wrap">
          <p className="eyebrow">build · early access</p>
          <h1 className="h1" style={{ fontSize: 'clamp(40px, 6vw, 72px)', maxWidth: '15ch' }}>
            Generate UI in <em style={{ fontStyle: 'normal', color: 'var(--red-3)' }}>your</em> brand. Not a guess.
          </h1>
          <p className="lede" style={{ marginTop: 20 }}>
            Paste a URL. Pick a template. designlang extracts the real tokens, anatomy and voice,
            then scaffolds a runnable Next.js page that looks like <em>you</em> — not generic AI slop.
          </p>
          <div className="row" style={{ marginTop: 22, gap: 12, flexWrap: 'wrap' }}>
            <a href="#templates" className="btn btn-primary">Pick a template</a>
            <a href="https://github.com/Manavarya09/design-extract/blob/main/src/clone.js" className="btn btn-ghost" target="_blank" rel="noreferrer">CLI version</a>
          </div>
        </div>
      </section>

      <section id="templates" className="section" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <h2 className="h2" style={{ fontSize: 28, marginBottom: 22 }}>Templates.</h2>
          <div className="grid-3">
            {TEMPLATES.map(t => (
              <a key={t.id} href={`#cli-${t.id}`} className="feature">
                <span className="feature-tag">{t.id}</span>
                <h3>{t.title}</h3>
                <p>{t.body}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <h2 className="h2" style={{ fontSize: 28, marginBottom: 14 }}>Or run it from the CLI right now.</h2>
          <p className="lede" style={{ marginBottom: 22 }}>
            The hosted builder is in early access — the CLI version ships in v12.12.0 today.
          </p>
          <div className="card" style={{ padding: '24px 28px' }}>
            <code className="kbd" style={{ fontSize: 13, padding: '8px 14px' }}>
              npx designlang clone stripe.com --template pricing
            </code>
            <p className="muted" style={{ marginTop: 14, fontSize: 14 }}>
              Outputs a runnable <code className="kbd" style={{ fontSize: 12 }}>./stripe-com-clone/</code> directory:
              a Next.js 16 app with the Stripe palette wired into a Tailwind theme, the actual extracted
              type scale, the real CTA voice, and the picked template's layout.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <div className="card" style={{ padding: '28px 28px' }}>
            <h2 className="h2" style={{ fontSize: 22, margin: 0 }}>Why this beats v0 / Subframe / Lovable for brand work</h2>
            <ul style={{ marginTop: 14, paddingLeft: 22, color: 'var(--fg-2)', lineHeight: 1.7 }}>
              <li>v0 / Lovable invent a palette. designlang reads the real one off the live site.</li>
              <li>Subframe needs a designer in their canvas. designlang needs a URL.</li>
              <li>Generic AI UI looks AI. UI built from real brand tokens looks like the brand.</li>
              <li>Output is a vanilla Next.js repo you can <code>git init</code> in, not a hosted-only artefact.</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
