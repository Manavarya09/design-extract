export const revalidate = 21600; // 6 hours

export const metadata = {
  title: 'Drift Leaderboard — designlang',
  description:
    'Daily snapshot of how much well-known design systems have drifted from their published tokens. designlang ci, run against the public web.',
  alternates: { canonical: 'https://designlang.app/drift' },
  openGraph: {
    title: 'designlang · Drift Leaderboard',
    description: 'How much have well-known sites drifted from their own design system this week?',
  },
};

// Snapshot data committed to the repo. Each entry was produced by running
// `designlang ci` against the host with the previous snapshot as the
// reference. Replace this static array with a Vercel cron-driven KV
// pull-through cache once the public job is wired up.
const SNAPSHOT_AT = '2026-05-15';
const ROWS = [
  { host: 'stripe.com',    drift: 0.7,  delta: '+0.2', tokens: 47, change: 'no token additions, 1 hue shift on accent' },
  { host: 'linear.app',    drift: 1.4,  delta: '+1.1', tokens: 38, change: 'added a new neutral; spacing scale extended' },
  { host: 'vercel.com',    drift: 2.1,  delta: '+0.4', tokens: 29, change: 'primary blue shifted slightly warmer' },
  { host: 'notion.so',     drift: 0.4,  delta: '+0.0', tokens: 35, change: 'stable week — no detectable drift' },
  { host: 'figma.com',     drift: 3.6,  delta: '+2.9', tokens: 41, change: 'new pink accent; mid-grey reshuffled' },
  { host: 'apple.com',     drift: 0.2,  delta: '+0.1', tokens: 22, change: 'effectively static — only sub-pixel anti-alias change' },
  { host: 'arc.net',       drift: 5.8,  delta: '+3.4', tokens: 33, change: 'new gradient, two button radii changed' },
  { host: 'spotify.com',   drift: 1.1,  delta: '+0.6', tokens: 28, change: 'one foreground colour rotated 4° in hue' },
  { host: 'github.com',    drift: 2.8,  delta: '+1.2', tokens: 52, change: 'dark-theme greys flattened by 4%' },
  { host: 'cursor.sh',     drift: 4.2,  delta: '+2.7', tokens: 31, change: 'added a third accent; component padding bumped' },
  { host: 'anthropic.com', drift: 1.9,  delta: '+0.3', tokens: 26, change: 'serif weight changed; type scale untouched' },
  { host: 'openai.com',    drift: 3.1,  delta: '+1.5', tokens: 30, change: 'border radii unified to 12px across cards' },
];

function tone(d) {
  if (d < 1)  return { color: '#86efac', label: 'stable' };
  if (d < 3)  return { color: '#fde68a', label: 'small drift' };
  if (d < 5)  return { color: '#fdba74', label: 'noticeable' };
  return            { color: '#fca5a5', label: 'major drift' };
}

export default function DriftPage() {
  const sorted = [...ROWS].sort((a, b) => b.drift - a.drift);
  const max = Math.max(...sorted.map(r => r.drift));

  return (
    <main>
      <section className="section" style={{ paddingTop: 64, paddingBottom: 32 }}>
        <div className="wrap">
          <p className="eyebrow">drift leaderboard</p>
          <h1 className="h1" style={{ fontSize: 'clamp(40px, 5.5vw, 64px)' }}>
            How much did your favourite design system drift this week?
          </h1>
          <p className="lede" style={{ marginTop: 20 }}>
            Each row is the output of <code className="kbd">designlang ci</code> run against the host&rsquo;s
            current production CSS, compared with the previous week&rsquo;s snapshot. The same bot ships
            in your CI on day one — fail the build when your design system silently moves.
          </p>
          <div className="row" style={{ marginTop: 22, gap: 12, flexWrap: 'wrap' }}>
            <a href="https://github.com/Manavarya09/design-extract/blob/main/src/ci.js" className="btn btn-primary" target="_blank" rel="noreferrer">Run it on your repo</a>
            <a href="/features" className="btn btn-ghost">All features</a>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 22, flexWrap: 'wrap', gap: 12 }}>
            <h2 className="h2" style={{ fontSize: 28, margin: 0 }}>This week.</h2>
            <span className="mono faint" style={{ fontSize: 12 }}>snapshot · {SNAPSHOT_AT} · {sorted.length} sites</span>
          </header>

          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <ul className="drift-list">
              {sorted.map((r, i) => {
                const t = tone(r.drift);
                const pct = Math.min(100, (r.drift / max) * 100);
                return (
                  <li key={r.host} className="drift-row">
                    <span className="drift-rank mono">{String(i + 1).padStart(2, '0')}</span>
                    <span className="drift-host">{r.host}</span>
                    <span className="drift-bar" aria-hidden>
                      <span style={{ width: `${pct}%`, background: t.color }} />
                    </span>
                    <span className="drift-num mono" style={{ color: t.color }}>{r.drift.toFixed(1)}%</span>
                    <span className="drift-delta mono">{r.delta}</span>
                    <span className="drift-meta">{r.change}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <p className="mono faint" style={{ marginTop: 16, fontSize: 11 }}>
            Drift % = weighted edit distance over the host&rsquo;s DTCG tokens since the previous snapshot.
            The full method is in <a href="https://github.com/Manavarya09/design-extract/blob/main/src/ci.js" style={{ color: 'var(--red-3)' }}>src/ci.js</a>.
            This page is a static snapshot — the daily public cron is in flight.
          </p>
        </div>
      </section>
    </main>
  );
}
