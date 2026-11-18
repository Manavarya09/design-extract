// POST /api/studio
// Extract a site's design language and return a fully self-contained,
// interactive studio document (HTML) that the page renders in an iframe.
// Reuses the exact same `studioHtml` engine that powers `designlang studio`
// on the CLI, so both surfaces stay in lock-step.
//
// Body:  { url: string }
// 200:   { html, hostname, cached }
// 429:   { error, resetAt, cli }   — shared 2/day demo budget with /api/extract

import { extractDesignLanguage } from '../../../../src/index.js';
import { formatDtcgTokens } from '../../../../src/formatters/dtcg-tokens.js';
import { studioHtml } from '../../../../src/studio.js';
import { validateTargetUrl } from '../../../../website/lib/url-safety.js';
import { checkRate, checkRateBlob, checkLiveReadBudget } from '../../../../website/lib/rate-limit.js';
import { cacheKey, getCached, putCached } from '../../../../website/lib/cache.js';
import { getBrowserOptions, getLocalBrowserOptions, isBrowserlessFailure } from '../../../../website/lib/browser.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

function hostPrefix(u) {
  try { return new URL(u).hostname.replace(/^www\./, '').replace(/[^a-z0-9]+/gi, '-'); }
  catch { return 'site'; }
}

function extractIp(request) {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  const real = request.headers.get('x-real-ip');
  return real ? real.trim() : 'unknown';
}

// Shape the extraction's `design` object into what `studioHtml` expects.
// Missing side-panel fields degrade gracefully inside the studio.
function buildStudioData(design, targetUrl) {
  return {
    prefix: hostPrefix(targetUrl),
    tokens: formatDtcgTokens(design),
    intent: { pageIntent: design.pageIntent, sectionRoles: design.sectionRoles },
    visualDna: design.visualDna || { materialLanguage: design.materialLanguage, imageryStyle: design.imageryStyle },
    library: design.componentLibrary,
    voice: design.voice,
    motion: design.motion,
  };
}

function rateLimited(targetUrl, resetAt) {
  let host = 'site';
  try { host = new URL(targetUrl).hostname; } catch {}
  return Response.json(
    {
      error: 'Free demo: 2 extractions per day. Use the CLI for unlimited: npx designlang ' + host + ' && designlang studio',
      resetAt,
      cli: 'npx designlang ' + host,
    },
    { status: 429, headers: { 'retry-after': String(Math.ceil((resetAt - Date.now()) / 1000)) } }
  );
}

export async function POST(request) {
  let body;
  try { body = await request.json(); }
  catch { return Response.json({ error: 'Invalid JSON body' }, { status: 400 }); }

  const validation = validateTargetUrl(body?.url);
  if (!validation.ok) return Response.json({ error: validation.reason }, { status: validation.status });
  const targetUrl = validation.url;
  const ip = extractIp(request);

  // Cache hit serves free — repeats cost nothing and skip rate accounting.
  const key = cacheKey(targetUrl);
  const cached = await getCached(key);

  let design;
  let wasCached = false;
  try {
    if (cached) {
      design = cached.design;
      wasCached = true;
    } else {
      // Shared 2/day budget with /api/extract (a studio IS an extraction).
      const memRate = checkRate(`extract:${ip}`, { limit: 2 });
      if (!memRate.allowed) return rateLimited(targetUrl, memRate.resetAt);
      const blobRate = await checkRateBlob(`extract:${ip}`, { limit: 2 });
      if (!blobRate.allowed) return rateLimited(targetUrl, blobRate.resetAt);
      const budget = await checkLiveReadBudget();
      if (!budget.allowed) return rateLimited(targetUrl, budget.resetAt);

      const browserOpts = await getBrowserOptions();
      try {
        design = await extractDesignLanguage(targetUrl, browserOpts);
      } catch (err) {
        // Browserless quota/auth/connection failure — retry once on bundled Chromium.
        if (browserOpts.wsEndpoint && isBrowserlessFailure(err)) {
          design = await extractDesignLanguage(targetUrl, await getLocalBrowserOptions());
        } else {
          throw err;
        }
      }
      await putCached(key, { design });
    }

    const html = studioHtml(buildStudioData(design, targetUrl));
    return Response.json({ html, hostname: hostPrefix(targetUrl), cached: wasCached });
  } catch (err) {
    console.error('[studio] failed', { url: targetUrl, ip, message: err?.message });
    return Response.json({ error: err?.message || 'Extraction failed' }, { status: 500 });
  }
}
