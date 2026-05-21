// GET /api/pdf/[hash] — render the cached extraction's brand book as PDF.
//
// Reuses the same Playwright route as /api/extract (Browserless if a
// token is set, bundled @sparticuz/chromium on Vercel otherwise) so
// the deploy doesn't need a separate browser dependency. Output is
// streamed as application/pdf, downloadable as <host>-brand.pdf.

import { getCachedByHash } from '../../../../lib/cache.js';
import { formatBrandBook } from '../../../../../src/formatters/brand-book.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

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
  if (process.env.BROWSERLESS_TOKEN) {
    const region = process.env.BROWSERLESS_REGION || 'production-sfo';
    return { wsEndpoint: `wss://${region}.browserless.io/?token=${process.env.BROWSERLESS_TOKEN}` };
  }
  return getLocalBrowserOptions();
}

// Open a browser from options; never let a dead remote browser win.
async function openBrowser(chromium, opts) {
  if (opts.wsEndpoint) return chromium.connect(opts.wsEndpoint);
  if (opts.executablePath) return chromium.launch({ executablePath: opts.executablePath, args: opts.browserArgs || [] });
  return chromium.launch();
}

function safeHost(url) {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return 'site'; }
}

function err(status, message) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

export async function GET(_req, { params }) {
  const { hash } = await params;
  if (!hash || !/^[a-z0-9-]{4,80}$/i.test(hash)) return err(400, 'bad hash');

  const cached = await getCachedByHash(hash).catch(() => null);
  if (!cached?.design) return err(404, 'extraction not found');

  const design = cached.design;
  const host = safeHost(design?.meta?.url);
  const html = formatBrandBook(design);

  // Spin up a browser via the same path /api/extract uses. If Browserless
  // is down or out of quota, fall back to the bundled Chromium.
  const { chromium } = await import('playwright-core');
  const opts = await getBrowserOptions();
  let browser;
  try {
    browser = await openBrowser(chromium, opts);
  } catch (e) {
    if (opts.wsEndpoint) {
      try {
        browser = await openBrowser(chromium, await getLocalBrowserOptions());
      } catch (e2) {
        return err(500, `browser launch failed: ${e2.message}`);
      }
    } else {
      return err(500, `browser launch failed: ${e.message}`);
    }
  }

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle' });
    const pdfBuf = await page.pdf({
      format: 'a4',
      printBackground: true,
      margin: { top: '24mm', right: '18mm', bottom: '20mm', left: '18mm' },
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate: `<div style="font-family: -apple-system, sans-serif; font-size: 9px; color: #888; width: 100%; padding: 0 18mm; display: flex; justify-content: space-between;"><span>designlang · ${host} brand guidelines</span><span><span class="pageNumber"></span> of <span class="totalPages"></span></span></div>`,
    });

    return new Response(pdfBuf, {
      status: 200,
      headers: {
        'content-type': 'application/pdf',
        'content-disposition': `attachment; filename="${host}-brand.pdf"`,
        'cache-control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    });
  } catch (e) {
    return err(500, `pdf render failed: ${e.message}`);
  } finally {
    try { await browser.close(); } catch { /* ignore */ }
  }
}
