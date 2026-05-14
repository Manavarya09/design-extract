// GET /api/stats — public JSON of designlang's growth signals.
//
// Combines GitHub repo stats + npm download stats + the Vercel Blob cache
// size into one cacheable JSON. Used by the homepage trust strip and any
// embed that wants a live count.

export const runtime = 'nodejs';
export const revalidate = 1800; // 30 min

const REPO = 'Manavarya09/design-extract';
const NPM = 'designlang';

async function gh() {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}`, {
      headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'designlang-stats' },
      next: { revalidate: 1800 },
    });
    if (!res.ok) return null;
    const d = await res.json();
    return {
      stars: d.stargazers_count ?? null,
      forks: d.forks_count ?? null,
      openIssues: d.open_issues_count ?? null,
      pushedAt: d.pushed_at ?? null,
      defaultBranch: d.default_branch ?? null,
    };
  } catch { return null; }
}

async function npm() {
  // Try the last-week point endpoint first; fall back to last-month if needed.
  try {
    const week = await fetch(`https://api.npmjs.org/downloads/point/last-week/${NPM}`, { next: { revalidate: 1800 } });
    const wk = week.ok ? await week.json() : null;
    const month = await fetch(`https://api.npmjs.org/downloads/point/last-month/${NPM}`, { next: { revalidate: 1800 } });
    const mo = month.ok ? await month.json() : null;
    return {
      lastWeek: wk?.downloads ?? null,
      lastMonth: mo?.downloads ?? null,
      package: NPM,
    };
  } catch { return null; }
}

async function cacheSize() {
  // Soft-import so a missing blob token doesn't fail the route.
  try {
    const cache = await import('../../../lib/cache.js');
    if (typeof cache.listRecent !== 'function') return null;
    const entries = await cache.listRecent(500).catch(() => []);
    return { extractions: Array.isArray(entries) ? entries.length : 0 };
  } catch { return null; }
}

export async function GET() {
  const [github, npmData, cache] = await Promise.all([gh(), npm(), cacheSize()]);
  const body = {
    project: 'designlang',
    version: '12.12.0',
    site: 'https://designlang.app',
    repo: `https://github.com/${REPO}`,
    npm: `https://www.npmjs.com/package/${NPM}`,
    github,
    npm: npmData,
    cache,
    generatedAt: new Date().toISOString(),
  };
  return new Response(JSON.stringify(body, null, 2), {
    status: 200,
    headers: {
      'content-type': 'application/json',
      'cache-control': 's-maxage=1800, stale-while-revalidate=86400',
      'access-control-allow-origin': '*',
    },
  });
}
