// Static-site stand-in for /watch (see scripts/build-static.mjs). The live page
// needs a server and a browser; here it says so and hands over the CLI command.
import { SITE_URL } from '../seo-config';
import PausedCommand from './PausedCommand';

export const metadata = {
  title: 'Watch — live reads are paused',
  description: 'Live reads on designlang.app are paused. Run any site through designlang on your own machine with one command.',
  alternates: { canonical: `${SITE_URL}/watch` },
};

export default function WatchPage() {
  return (
    <main>
      <section className="section" style={{ paddingTop: 72, paddingBottom: 72 }}>
        <div className="wrap">
          <p className="eyebrow">watch · paused</p>
          <h1 className="h1" style={{ fontSize: 'clamp(38px, 6vw, 68px)', maxWidth: '16ch' }}>
            Live reads are paused.
          </h1>
          <p className="lede" style={{ marginTop: 18, maxWidth: '52ch' }}>
            This site can't run a browser right now. The same extraction runs on your
            machine in about ten seconds, free, with nothing to sign up for.
          </p>
          <PausedCommand />
          <p style={{ marginTop: 28 }}>
            <a className="btn btn-ghost" href="/gallery">Browse the gallery</a>
          </p>
        </div>
      </section>
    </main>
  );
}
