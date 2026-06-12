// Render a re-styled component clone on a clean canvas and return its PNG.
//
// The clone keeps its DOM structure and text but loses the site's stylesheet
// (we never load it). We pin the root to the captured box and apply ONLY the
// token-snapped inline styles, so the screenshot is "this component as the
// extracted token system would express it" — nothing more. Children inherit
// the token body font/colour; author classes resolve to nothing, by design.

import { styledToCss } from './restyle.js';

// browser: a launched Playwright Browser. comp: { outerHTML, box:{w,h}, dpr, styled }.
// tokens: used only for the page's inherited body font/colour defaults.
export async function renderComponent(browser, comp, tokens = {}) {
  const { outerHTML, box, dpr = 2, styled } = comp;
  const w = Math.max(1, Math.ceil(box?.w || 1));
  const h = Math.max(1, Math.ceil(box?.h || 1));
  const css = styledToCss(styled);

  const context = await browser.newContext({
    viewport: { width: w + 8, height: h + 8 },
    deviceScaleFactor: dpr,
    colorScheme: 'light',
  });
  try {
    const page = await context.newPage();
    const html = `<!doctype html><html><head><meta charset="utf-8"><style>
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { background: ${tokens.bodyBg || '#ffffff'}; }
body { font-family: ${tokens.bodyFamily || 'sans-serif'}; color: ${tokens.bodyColor || '#111'}; padding: 4px; }
#dl-host > * { width: ${w}px; height: ${h}px; box-sizing: border-box; overflow: hidden; display: flex; align-items: center; justify-content: center; ${css}; }
</style></head><body><div id="dl-host"></div></body></html>`;
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    await page.evaluate(({ outer, inline }) => {
      const host = document.getElementById('dl-host');
      host.innerHTML = outer;
      const root = host.firstElementChild;
      if (root) root.setAttribute('style', `${root.getAttribute('style') || ''};${inline}`);
    }, { outer: outerHTML, inline: css });
    await page.evaluate(() => document.fonts.ready).catch(() => {});
    const root = page.locator('#dl-host > *').first();
    return await root.screenshot({ type: 'png' });
  } finally {
    await context.close();
  }
}
