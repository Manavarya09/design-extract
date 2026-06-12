// POST /api/extract
// Streaming NDJSON: one JSON event per line.
// Events:
//   { type:'cache', cached:true }               — if served from Blob
//   { type:'stage', name:'crawl'|... }           — progress markers
//   { type:'token', category, path, value, $type } — one per semantic token
//   { type:'summary', summary }
//   { type:'files', files }                      — final, full file map
//   { type:'error', error }                      — terminal failure

import { extractDesignLanguage } from '../../../../src/index.js';
import { validateTargetUrl } from '../../../../website/lib/url-safety.js';
import { checkRate, checkRateBlob } from '../../../../website/lib/rate-limit.js';
import { cacheKey, getCached, putCached } from '../../../../website/lib/cache.js';
import { buildFiles, buildSummary } from '../../../../website/lib/build-files.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const STAGES = [
  'crawl',
  'colors',
  'typography',
  'spacing',
  'shadows',
  'borders',
  'components',
  'regions',
  'a11y',
  'score',
];

// Bundled Chromium via @sparticuz on Vercel/Lambda; bare launch in dev.
async function getLocalBrowserOptions() {
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    const chromium = (await import('@sparticuz/chromium')).default;
    return {
      executablePath: await chromium.executablePath(),
      browserArgs: chromium.args,
    };
  }
  return {};
}

async function getBrowserOptions() {
  // Preferred path: connect to a remote Playwright browser (Browserless v2).
  // No Chromium binary on the function — cold starts drop from ~3s to ~50ms,
  // and the heavy work runs on Browserless's infra, not Vercel CPU minutes.
  if (process.env.BROWSERLESS_TOKEN) {
    const region = process.env.BROWSERLESS_REGION || 'production-sfo';
    return {
      wsEndpoint: `wss://${region}.browserless.io/?token=${process.env.BROWSERLESS_TOKEN}`,
    };
  }
  return getLocalBrowserOptions();
}

// A Browserless failure (quota exhausted → 401, region down, ws error)
// should not break extraction — it just means we fall back to the
// bundled Chromium for that request.
function isBrowserlessFailure(err) {
  const m = String(err?.message || err || '').toLowerCase();
  return (
    m.includes('browserless') ||
    m.includes('401') ||
    m.includes('unauthorized') ||
    m.includes('usage limit') ||
    m.includes('connectovercdp') ||
    m.includes('websocket')
  );
}

function ndjson(obj) {
  return new TextEncoder().encode(JSON.stringify(obj) + '\n');
}

// Walk a DTCG token tree and yield every leaf ({ $value, $type }).
function* walkDtcgTokens(tree, path = []) {
  if (!tree || typeof tree !== 'object') return;
  if (tree.$value !== undefined && tree.$type !== undefined) {
    yield { path: path.join('.'), value: tree.$value, $type: tree.$type };
    return;
  }
  for (const key of Object.keys(tree)) {
    if (key.startsWith('$')) continue;
    yield* walkDtcgTokens(tree[key], [...path, key]);
  }
}

function extractIp(request) {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  const real = request.headers.get('x-real-ip');
  if (real) return real.trim();
  return 'unknown';
}

// Emit cached payload as a simulated stream so the hero paints consistently.
async function streamCached(controller, cached, targetUrl, hash) {
  controller.enqueue(ndjson({ type: 'cache', cached: true }));
  // Permalink up front — the client can rewrite the URL bar to /x/<hash>
  // before any heavy paint, so refresh-and-share works during the stream.
  controller.enqueue(ndjson({ type: 'permalink', hash }));
  for (const stage of STAGES) {
    controller.enqueue(ndjson({ type: 'stage', name: stage }));
    await new Promise((r) => setTimeout(r, 40));
  }
  // Re-derive DTCG tokens from the cached design so the token-by-token paint
  // still happens on a cache hit.
  const { files, dtcg } = buildFiles(cached.design, targetUrl);
  for (const { path, value, $type } of walkDtcgTokens(dtcg)) {
    const category = path.split('.')[1] || 'misc';
    controller.enqueue(ndjson({ type: 'token', category, path, value, $type }));
  }
  controller.enqueue(ndjson({ type: 'summary', summary: buildSummary(cached.design) }));
  controller.enqueue(ndjson({ type: 'files', files }));
}

export async function POST(request) {
  let body;
  try { body = await request.json(); } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const validation = validateTargetUrl(body?.url);
  if (!validation.ok) {
    return Response.json({ error: validation.reason }, { status: validation.status });
  }
  const targetUrl = validation.url;

  const ip = extractIp(request);

  // Cache hit serves free — no rate-limit accounting, repeats cost nothing.
  const key = cacheKey(targetUrl);
  const cached = await getCached(key);

  if (!cached) {
    // First-line per-instance memory guard (cheap, blunts hammering within an instance).
    const memRate = checkRate(`extract:${ip}`, { limit: 2 });
    if (!memRate.allowed) {
      return Response.json(
        {
          error: 'Free demo: 2 extractions per day. Use the CLI for unlimited: npx designlang ' + new URL(targetUrl).hostname,
          resetAt: memRate.resetAt,
          cli: 'npx designlang ' + new URL(targetUrl).hostname,
        },
        { status: 429, headers: { 'retry-after': String(Math.ceil((memRate.resetAt - Date.now()) / 1000)) } }
      );
    }
    // Persistent Blob-backed limit (survives cold starts, real cross-instance enforcement).
    const blobRate = await checkRateBlob(`extract:${ip}`, { limit: 2 });
    if (!blobRate.allowed) {
      return Response.json(
        {
          error: 'Free demo: 2 extractions per day. Use the CLI for unlimited: npx designlang ' + new URL(targetUrl).hostname,
          resetAt: blobRate.resetAt,
          cli: 'npx designlang ' + new URL(targetUrl).hostname,
        },
        { status: 429, headers: { 'retry-after': String(Math.ceil((blobRate.resetAt - Date.now()) / 1000)) } }
      );
    }
  }

  const stream = new ReadableStream({
    async start(controller) {
      try {
        if (cached) {
          await streamCached(controller, cached, targetUrl, key);
          controller.close();
          return;
        }

        // Pre-stage markers — best-effort progress since extraction is atomic.
        // Emit the permalink hash early so the URL bar can rewrite to /x/<hash>
        // before the heavy paint begins.
        controller.enqueue(ndjson({ type: 'permalink', hash: key }));
        controller.enqueue(ndjson({ type: 'stage', name: 'crawl' }));

        const browserOpts = await getBrowserOptions();
        let design;
        try {
          design = await extractDesignLanguage(targetUrl, browserOpts);
        } catch (err) {
          // Browserless quota / auth / connection failure — retry once on
          // the bundled Chromium so a dead remote browser never takes the
          // whole extractor down.
          if (browserOpts.wsEndpoint && isBrowserlessFailure(err)) {
            console.warn('[extract] browserless failed, falling back to bundled chromium', err?.message);
            const fallback = await getLocalBrowserOptions();
            design = await extractDesignLanguage(targetUrl, fallback);
          } else {
            throw err;
          }
        }

        // Post-stage markers once extraction resolves.
        for (const stage of STAGES.slice(1)) {
          controller.enqueue(ndjson({ type: 'stage', name: stage }));
        }

        const { files, dtcg } = buildFiles(design, targetUrl);

        // Token-by-token paint — every DTCG leaf becomes its own event.
        for (const { path, value, $type } of walkDtcgTokens(dtcg)) {
          const category = path.split('.')[1] || 'misc';
          controller.enqueue(ndjson({ type: 'token', category, path, value, $type }));
        }

        controller.enqueue(ndjson({ type: 'summary', summary: buildSummary(design) }));
        controller.enqueue(ndjson({ type: 'files', files }));

        // Persist BEFORE the stream closes. On serverless the instance is
        // frozen once the response ends, so a fire-and-forget write gets
        // killed mid-flight — leaving /x/<hash> and /api/pdf/<hash> with no
        // cached design to render (the source of "downloaded PDF won't open").
        await putCached(key, { design });
      } catch (err) {
        console.error('[extract] failed', { url: targetUrl, ip, message: err?.message });
        controller.enqueue(ndjson({ type: 'error', error: err?.message || 'Extraction failed' }));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'content-type': 'application/x-ndjson; charset=utf-8',
      'cache-control': 'no-store',
      'x-accel-buffering': 'no',
    },
  });
}
