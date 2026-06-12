// POST /api/motion — motion-only analysis for a URL.
//
// Reuses the same extraction + Blob cache as /api/extract, so a site
// already extracted anywhere on the site loads here for free (cache hit,
// no rate-limit accounting). On a miss it runs one extraction, persists
// it to the shared cache, and returns just the motion slice plus a few
// ready-to-copy exports.

import { extractDesignLanguage } from '../../../../src/index.js';
import { validateTargetUrl } from '../../../lib/url-safety.js';
import { checkRate, checkRateBlob } from '../../../lib/rate-limit.js';
import { cacheKey, getCached, putCached } from '../../../lib/cache.js';
import { getBrowserOptions, getLocalBrowserOptions, isBrowserlessFailure } from '../../../lib/browser.js';
import { formatMotionTokens } from '../../../../src/formatters/motion-tokens.js';
import { formatFramerMotion } from '../../../../src/formatters/framer-motion.js';
import { formatMotionCss } from '../../../../src/formatters/motion-css.js';
import { formatMotionOne } from '../../../../src/formatters/motion-one.js';
import { formatMotionTailwind } from '../../../../src/formatters/motion-tailwind.js';
import { formatMotionGsap } from '../../../../src/formatters/motion-gsap.js';
import { formatMotionWaapi } from '../../../../src/formatters/motion-waapi.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

function err(status, message, extra) {
  return Response.json({ error: message, ...extra }, { status });
}

function extractIp(request) {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}

// Pull the accent color + meta the dashboard uses for curve/dot tinting.
function present(design, cached) {
  return {
    url: design.meta?.url || '',
    title: design.meta?.title || design.meta?.url || '',
    primary: design.colors?.primary?.hex || design.colors?.accent?.hex || '#ef4444',
    motion: design.motion || null,
    cached: Boolean(cached),
    exports: {
      tokens: formatMotionTokens(design.motion),
      framer: formatFramerMotion(design),
      css: formatMotionCss(design),
      motionone: formatMotionOne(design),
      tailwind: formatMotionTailwind(design),
      gsap: formatMotionGsap(design),
      waapi: formatMotionWaapi(design),
    },
  };
}

export async function POST(request) {
  let body;
  try { body = await request.json(); } catch { return err(400, 'Invalid JSON body'); }

  const validation = validateTargetUrl(body?.url);
  if (!validation.ok) return err(validation.status, validation.reason);
  const targetUrl = validation.url;

  // Cache hit serves free — shared with /api/extract and /x/<hash>.
  const key = cacheKey(targetUrl);
  const cached = await getCached(key);
  if (cached?.design) return Response.json(present(cached.design, true));

  // Same free-demo limit as /api/extract (motion runs the full extraction).
  const ip = extractIp(request);
  const host = new URL(targetUrl).hostname;
  const limited = () => err(429,
    `Free demo: 2 extractions per day. Use the CLI for unlimited: npx designlang ${host}`,
    { cli: `npx designlang ${host}` },
  );
  if (!checkRate(`extract:${ip}`, { limit: 2 }).allowed) return limited();
  if (!(await checkRateBlob(`extract:${ip}`, { limit: 2 })).allowed) return limited();

  const browserOpts = await getBrowserOptions();
  let design;
  try {
    design = await extractDesignLanguage(targetUrl, browserOpts);
  } catch (e) {
    if (browserOpts.wsEndpoint && isBrowserlessFailure(e)) {
      design = await extractDesignLanguage(targetUrl, await getLocalBrowserOptions());
    } else {
      return err(500, e?.message || 'Extraction failed');
    }
  }

  // Persist to the shared cache so the home page / permalink / PDF all hit it.
  await putCached(key, { design });
  return Response.json(present(design, false));
}
