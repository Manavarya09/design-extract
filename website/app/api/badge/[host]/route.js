// GET /api/badge/[host]
//
// Returns a shields.io-style SVG badge with the design grade for `host`, read
// from the cache /api/extract writes to. It never launches a browser: badges
// are fetched by GitHub's image proxy and bots on every README view, and
// extracting on a cache miss used up the whole Hobby CPU allowance. A host
// with no cached grade gets the neutral badge.
//
// Edge cache headers ensure GitHub's image proxy and any CDN respect the
// 24h TTL — same as the cache itself.

import { formatScoreBadge } from '../../../../../src/formatters/badge.js';
import { validateTargetUrl } from '../../../../lib/url-safety.js';
import { cacheKey, getCached } from '../../../../lib/cache.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const CACHE_HEADERS = {
  // Edge: 6h fresh, 24h stale-while-revalidate. Browser: 1h.
  'cache-control': 'public, max-age=3600, s-maxage=21600, stale-while-revalidate=86400',
  'content-type': 'image/svg+xml; charset=utf-8',
};

const ERROR_HEADERS = {
  // Don't cache errors — bad host should get a fresh chance after rotation.
  'cache-control': 'public, max-age=60, s-maxage=60',
  'content-type': 'image/svg+xml; charset=utf-8',
};

const MISS_HEADERS = {
  // No grade yet: keep the edge serving the neutral badge for an hour.
  'cache-control': 'public, max-age=3600, s-maxage=3600',
  'content-type': 'image/svg+xml; charset=utf-8',
};

function svgResponse(svg, headers) {
  return new Response(svg, { status: 200, headers });
}

export async function GET(_request, { params }) {
  const resolvedParams = await params;
  const rawHost = String(resolvedParams?.host || '').trim();

  // Strip leading scheme if someone double-encoded it; allow path suffixes.
  const cleanHost = rawHost.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  if (!cleanHost) {
    return svgResponse(formatScoreBadge(null, { label: 'design' }), ERROR_HEADERS);
  }

  const targetUrl = `https://${cleanHost}`;
  const validation = validateTargetUrl(targetUrl);
  if (!validation.ok) {
    return svgResponse(
      formatScoreBadge(null, { label: 'design' }),
      ERROR_HEADERS,
    );
  }

  const key = cacheKey(validation.url);

  // Cache hit — fast path.
  try {
    const cached = await getCached(key);
    if (cached?.design?.score) {
      return svgResponse(formatScoreBadge(cached.design.score), CACHE_HEADERS);
    }
  } catch (err) {
    console.error('[badge] cache read failed', err?.message);
  }

  return svgResponse(formatScoreBadge(null, { label: 'design' }), MISS_HEADERS);
}
