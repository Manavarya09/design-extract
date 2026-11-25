// Build the website as a static site (no server) into out/, for Cloudflare Pages.
//
// A static export can't contain routes that need a server at request time, so
// they are set aside for the build (Next ignores app folders whose name starts
// with "_"), and static-overrides/ supplies stand-ins where a page is linked
// from everywhere (/watch). Everything is put back afterwards, so the Vercel
// build is unchanged.

import { renameSync, existsSync, cpSync, rmSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const SERVER_ONLY = ['app/api', 'app/x', 'app/watch'];
const OVERRIDES = ['watch'];
const aside = (dir) => dir.replace(/app\/([^/]+)$/, 'app/_static-skip-$1');

// Cloudflare Pages rules for links into the server-only routes.
const REDIRECTS = `/badge/* /badge.svg 200
/x/* /gallery 302
`;

// Next exports the OG image without an extension, so name its type.
const HEADERS = `/opengraph-image
  Content-Type: image/png
`;

const moved = [];
const placed = [];
let status = 1;
try {
  for (const dir of SERVER_ONLY) {
    if (!existsSync(dir)) continue;
    renameSync(dir, aside(dir));
    moved.push(dir);
  }
  for (const name of OVERRIDES) {
    cpSync(`static-overrides/${name}`, `app/${name}`, { recursive: true });
    placed.push(`app/${name}`);
  }
  const res = spawnSync('npx', ['next', 'build', '--webpack'], {
    stdio: 'inherit',
    env: { ...process.env, STATIC_SITE: '1', NEXT_PUBLIC_STATIC_SITE: '1' },
  });
  status = res.status ?? 1;
  if (status === 0) {
    writeFileSync('out/_redirects', REDIRECTS);
    writeFileSync('out/_headers', HEADERS);
  }
} finally {
  for (const dir of placed) rmSync(dir, { recursive: true, force: true });
  for (const dir of moved) renameSync(aside(dir), dir);
}
process.exit(status);
