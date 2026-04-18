import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { join } from 'path';

const MAX_ELEMENTS = 5000;

async function gotoWithRetry(page, url, opts, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      await page.goto(url, opts);
      return;
    } catch (err) {
      if (i === retries - 1) throw err;
      await page.waitForTimeout(2000 * (i + 1));
    }
  }
}

export async function crawlPage(url, options = {}) {
  const { width = 1280, height = 800, wait = 0, dark = false, depth = 0, screenshots = false, outDir = '', executablePath, browserArgs, cookies, headers, ignore } = options;

  const browser = await chromium.launch({
    headless: true,
    ...(executablePath && { executablePath }),
    ...(browserArgs && { args: browserArgs }),
  });
  try {
    const context = await browser.newContext({
      viewport: { width, height },
      colorScheme: 'light',
      ...(headers && { extraHTTPHeaders: headers }),
    });

    // Set cookies if provided
    if (cookies && cookies.length > 0) {
      await context.addCookies(cookies.map(c => {
        if (typeof c === 'string') {
          const [name, ...rest] = c.split('=');
          return { name, value: rest.join('='), url };
        }
        return c;
      }));
    }
    const page = await context.newPage();

    // Start CSS coverage for css-health audit. Not supported on all targets —
    // fail gracefully and set empty coverage if the API is unavailable.
    let cssCoverageAvailable = true;
    try {
      await page.coverage.startCSSCoverage();
    } catch { cssCoverageAvailable = false; }

    await gotoWithRetry(page, url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    // Wait for network to settle — but don't hang on sites with persistent connections
    await page.waitForLoadState('networkidle').catch(() => {});
    if (wait > 0) await page.waitForTimeout(wait);
    await page.evaluate(() => document.fonts.ready).catch(() => {});

    // Capture CSS coverage after the page has settled.
    let cssCoverage = [];
    if (cssCoverageAvailable) {
      try {
        const raw = await page.coverage.stopCSSCoverage();
        cssCoverage = raw.map(c => ({
          url: c.url,
          text: c.text,
          totalBytes: (c.text || '').length,
          ranges: c.ranges || [],
        }));
      } catch { cssCoverage = []; }
    }

    const title = await page.title();
    const lightData = await extractPageData(page, ignore);
    lightData.cssCoverage = cssCoverage;

    // Component screenshots
    let componentScreenshots = {};
    if (screenshots && outDir) {
      componentScreenshots = await captureComponentScreenshots(page, outDir);
    }

    // Multi-page crawl: discover internal links and extract from them
    let additionalPages = [];
    if (depth > 0) {
      const internalLinks = await discoverInternalLinks(page, url, depth);
      for (const link of internalLinks) {
        try {
          await gotoWithRetry(page, link, { waitUntil: 'domcontentloaded', timeout: 20000 });
          await page.waitForLoadState('networkidle').catch(() => {});
          await page.evaluate(() => document.fonts.ready).catch(() => {});
          const pageData = await extractPageData(page);
          additionalPages.push({ url: link, data: pageData });
        } catch { /* skip failed pages */ }
      }
    }

    // Dark mode extraction
    let darkData = null;
    if (dark) {
      await context.close();
      const darkContext = await browser.newContext({
        viewport: { width, height },
        colorScheme: 'dark',
      });
      const darkPage = await darkContext.newPage();
      await gotoWithRetry(darkPage, url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await darkPage.waitForLoadState('networkidle').catch(() => {});
      await darkPage.evaluate(() => document.fonts.ready).catch(() => {});
      darkData = await extractPageData(darkPage);
      await darkContext.close();
    } else {
      await context.close();
    }

    // Merge additional page data into light data
    if (additionalPages.length > 0) {
      lightData.computedStyles = mergeStyles(lightData.computedStyles, additionalPages);
      for (const ap of additionalPages) {
        Object.assign(lightData.cssVariables, ap.data.cssVariables);
        lightData.mediaQueries.push(...ap.data.mediaQueries);
        lightData.keyframes.push(...ap.data.keyframes);
      }
      // Deduplicate media queries and keyframes
      lightData.mediaQueries = [...new Set(lightData.mediaQueries)];
      const seenKf = new Set();
      lightData.keyframes = lightData.keyframes.filter(kf => {
        if (seenKf.has(kf.name)) return false;
        seenKf.add(kf.name);
        return true;
      });
    }

    return {
      url, title,
      light: lightData,
      dark: darkData,
      pagesAnalyzed: 1 + additionalPages.length,
      componentScreenshots,
    };
  } finally {
    await browser.close();
  }
}

function mergeStyles(primary, additionalPages) {
  // Add styles from additional pages, capping total
  const all = [...primary];
  for (const ap of additionalPages) {
    if (all.length >= MAX_ELEMENTS * 2) break;
    all.push(...ap.data.computedStyles);
  }
  return all;
}

async function discoverInternalLinks(page, baseUrl, maxLinks) {
  const base = new URL(baseUrl);
  const links = await page.evaluate((hostname) => {
    return Array.from(document.querySelectorAll('a[href]'))
      .map(a => a.href)
      .filter(href => {
        try {
          const u = new URL(href);
          return u.hostname === hostname && !href.includes('#') && !href.match(/\.(png|jpg|jpeg|gif|svg|pdf|zip|mp4|mp3)$/i);
        } catch { return false; }
      });
  }, base.hostname);

  // Deduplicate and limit
  const unique = [...new Set(links)].filter(l => l !== baseUrl);
  return unique.slice(0, Math.min(maxLinks * 3, 15)); // crawl up to 15 pages max
}

export async function captureComponentScreenshots(page, outDir) {
  const screenshotDir = join(outDir, 'screenshots');
  mkdirSync(screenshotDir, { recursive: true });

  const result = {};

  // Find representative elements for each component type
  const selectors = [
    { name: 'button', selector: 'button:not(:empty), a[role="button"], [class*="btn"]:not(:empty)', label: 'Buttons' },
    { name: 'card', selector: '[class*="card"]:not(:empty)', label: 'Cards' },
    { name: 'input', selector: 'input[type="text"], input[type="email"], input[type="search"], textarea', label: 'Inputs' },
    { name: 'nav', selector: 'nav, [role="navigation"]', label: 'Navigation' },
    { name: 'hero', selector: '[class*="hero"], section:first-of-type', label: 'Hero Section' },
  ];

  for (const { name, selector, label } of selectors) {
    try {
      const el = await page.$(selector);
      if (el) {
        const box = await el.boundingBox();
        if (box && box.width > 20 && box.height > 10) {
          const path = join(screenshotDir, `${name}.png`);
          await el.screenshot({ path });
          result[name] = { path: `screenshots/${name}.png`, label };
        }
      }
    } catch { /* skip if screenshot fails */ }
  }

  // Full page screenshot
  try {
    const fullPath = join(screenshotDir, 'full-page.png');
    await page.screenshot({ path: fullPath, fullPage: true });
    result.fullPage = { path: 'screenshots/full-page.png', label: 'Full Page' };
  } catch { /* skip */ }

  return result;
}

async function extractPageData(page, ignoreSelectors) {
  const data = await page.evaluate(({ maxElements, ignoreSelectors }) => {
    // Remove ignored elements before extraction
    if (ignoreSelectors && ignoreSelectors.length > 0) {
      for (const sel of ignoreSelectors) {
        try {
          for (const el of document.querySelectorAll(sel)) {
            el.remove();
          }
        } catch { /* invalid selector */ }
      }
    }

    const results = {
      computedStyles: [],
      cssVariables: {},
      mediaQueries: [],
      keyframes: [],
      crossOriginSheets: [],
    };

    // Collect elements including shadow DOM contents
    function collectElements(root, collected) {
      for (const el of root.querySelectorAll('*')) {
        if (collected.length >= maxElements) break;
        collected.push(el);
        if (el.shadowRoot) {
          collectElements(el.shadowRoot, collected);
        }
      }
      return collected;
    }
    const elements = collectElements(document, []);

    for (const el of elements) {
      const cs = getComputedStyle(el);
      const tag = el.tagName.toLowerCase();
      const classList = Array.from(el.classList).join(' ');
      const role = el.getAttribute('role') || '';
      const rect = el.getBoundingClientRect();
      const area = rect.width * rect.height;

      results.computedStyles.push({
        tag, classList, role, area,
        color: cs.color,
        backgroundColor: cs.backgroundColor,
        backgroundImage: cs.backgroundImage,
        borderColor: cs.borderColor,
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        lineHeight: cs.lineHeight,
        letterSpacing: cs.letterSpacing,
        paddingTop: cs.paddingTop,
        paddingRight: cs.paddingRight,
        paddingBottom: cs.paddingBottom,
        paddingLeft: cs.paddingLeft,
        marginTop: cs.marginTop,
        marginRight: cs.marginRight,
        marginBottom: cs.marginBottom,
        marginLeft: cs.marginLeft,
        gap: cs.gap,
        borderRadius: cs.borderRadius,
        borderWidth: cs.borderWidth,
        borderStyle: cs.borderStyle,
        boxShadow: cs.boxShadow,
        textShadow: cs.textShadow,
        zIndex: cs.zIndex,
        transition: cs.transition,
        animation: cs.animation,
        display: cs.display,
        position: cs.position,
        flexDirection: cs.flexDirection,
        flexWrap: cs.flexWrap,
        justifyContent: cs.justifyContent,
        alignItems: cs.alignItems,
        gridTemplateColumns: cs.gridTemplateColumns,
        gridTemplateRows: cs.gridTemplateRows,
        maxWidth: cs.maxWidth,
      });
    }

    // CSS custom properties
    const rootStyles = getComputedStyle(document.documentElement);
    try {
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (rule.selectorText === ':root' || rule.selectorText === ':host') {
              for (let i = 0; i < rule.style.length; i++) {
                const prop = rule.style[i];
                if (prop.startsWith('--')) {
                  results.cssVariables[prop] = rule.style.getPropertyValue(prop).trim();
                }
              }
            }
          }
        } catch { if (sheet.href) results.crossOriginSheets.push(sheet.href); }
      }
    } catch { /* no access */ }

    for (let i = 0; i < rootStyles.length; i++) {
      const prop = rootStyles[i];
      if (prop.startsWith('--') && !results.cssVariables[prop]) {
        results.cssVariables[prop] = rootStyles.getPropertyValue(prop).trim();
      }
    }

    // Media queries
    try {
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (rule instanceof CSSMediaRule) {
              results.mediaQueries.push(rule.conditionText || rule.media.mediaText);
            }
          }
        } catch { /* cross-origin — already tracked */ }
      }
    } catch { /* no access */ }

    // Keyframes
    try {
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (rule instanceof CSSKeyframesRule) {
              const steps = [];
              for (const kf of rule.cssRules) {
                steps.push({ offset: kf.keyText, style: kf.style.cssText });
              }
              results.keyframes.push({ name: rule.name, steps });
            }
          }
        } catch { /* cross-origin — already tracked */ }
      }
    } catch { /* no access */ }

    // Component clusters (v7): per-element features for similarity-based grouping.
    function colorToChannels(str) {
      if (!str) return [0, 0, 0, 0];
      const m = String(str).match(/rgba?\(([^)]+)\)/i);
      if (!m) return [0, 0, 0, 0];
      const parts = m[1].split(',').map(s => parseFloat(s));
      return [parts[0] || 0, parts[1] || 0, parts[2] || 0, parts[3] === undefined ? 1 : parts[3]];
    }
    function structuralHashOf(el) {
      const parts = [el.tagName.toLowerCase()];
      for (const c of el.children) {
        parts.push(c.tagName.toLowerCase());
      }
      return parts.slice(0, 6).join('>');
    }
    const candidateSelector = 'button, a[role="button"], .btn, [class*="button"], input[type="text"], input[type="email"], input[type="search"], textarea, [class*="card"]';
    results.componentCandidates = [];
    const seenCandidates = new Set();
    for (const el of document.querySelectorAll(candidateSelector)) {
      if (results.componentCandidates.length >= 300) break;
      const rect = el.getBoundingClientRect();
      if (rect.width < 4 || rect.height < 4) continue;
      if (seenCandidates.has(el)) continue;
      seenCandidates.add(el);
      const cs = getComputedStyle(el);
      const tag = el.tagName.toLowerCase();
      let kind = 'other';
      const cls = typeof el.className === 'string' ? el.className.toLowerCase() : '';
      if (tag === 'button' || el.getAttribute('role') === 'button' || /\bbtn\b|button/.test(cls)) kind = 'button';
      else if (tag === 'input' || tag === 'textarea') kind = 'input';
      else if (tag === 'a') kind = 'link';
      else if (/card/.test(cls)) kind = 'card';
      const bg = colorToChannels(cs.backgroundColor);
      const fg = colorToChannels(cs.color);
      const styleVector = [
        parseFloat(cs.paddingTop) || 0,
        parseFloat(cs.paddingRight) || 0,
        parseFloat(cs.paddingBottom) || 0,
        parseFloat(cs.paddingLeft) || 0,
        bg[0], bg[1], bg[2], bg[3] * 255,
        fg[0], fg[1], fg[2], fg[3] * 255,
        parseFloat(cs.borderTopLeftRadius) || 0,
        parseFloat(cs.borderWidth) || 0,
        parseFloat(cs.fontSize) || 0,
        parseFloat(cs.fontWeight) || 0,
      ];
      results.componentCandidates.push({
        kind,
        structuralHash: structuralHashOf(el),
        styleVector,
        css: {
          background: cs.backgroundColor,
          color: cs.color,
          padding: `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`,
          borderRadius: cs.borderTopLeftRadius,
          border: `${cs.borderWidth} ${cs.borderStyle} ${cs.borderColor}`,
          fontSize: cs.fontSize,
          fontWeight: cs.fontWeight,
        },
      });
    }

    // Semantic regions (v7): landmark + heading + bounds data for classifier.
    results.sections = Array.from(document.querySelectorAll(
      'header, nav, main, section, footer, aside, [role="banner"], [role="contentinfo"], [role="complementary"], [role="navigation"]'
    )).slice(0, 100).map(el => {
      const r = el.getBoundingClientRect();
      return {
        tag: el.tagName.toLowerCase(),
        role: el.getAttribute('role') || '',
        className: typeof el.className === 'string' ? el.className : '',
        id: el.id || '',
        text: (el.innerText || '').slice(0, 2000),
        headings: Array.from(el.querySelectorAll('h1,h2,h3')).slice(0, 5).map(h => h.innerText || ''),
        buttonCount: el.querySelectorAll('button, a[role="button"], .btn, [class*="button"]').length,
        cardCount: el.querySelectorAll('article, li, [class*="card"], [class*="item"]').length,
        bounds: { x: r.x, y: r.y, w: r.width, h: r.height },
      };
    });

    // Stack fingerprint signals (v7)
    results.stack = {
      scripts: Array.from(document.scripts).map(s => s.src).filter(Boolean).slice(0, 50),
      metas: Array.from(document.querySelectorAll('meta[name],meta[property]'))
        .map(m => ({ name: m.name || m.getAttribute('property'), content: m.content }))
        .slice(0, 50),
      classNameSample: Array.from(document.querySelectorAll('[class]'))
        .slice(0, 500)
        .map(e => typeof e.className === 'string' ? e.className : '')
        .filter(Boolean),
      windowGlobals: ['React', 'Vue', '__NEXT_DATA__', '__NUXT__', '___gatsby', '_remixContext', 'Shopify', 'wp']
        .filter(k => typeof window[k] !== 'undefined'),
    };

    // SVG icons
    results.icons = [];
    for (const svg of document.querySelectorAll('svg')) {
      const rect = svg.getBoundingClientRect();
      if (rect.width > 4 && rect.width < 200 && rect.height > 4 && rect.height < 200) {
        results.icons.push({
          svg: svg.outerHTML,
          width: rect.width,
          height: rect.height,
          viewBox: svg.getAttribute('viewBox') || '',
          classList: Array.from(svg.classList).join(' '),
          fill: svg.getAttribute('fill') || getComputedStyle(svg).fill || '',
          stroke: svg.getAttribute('stroke') || getComputedStyle(svg).stroke || '',
        });
      }
    }

    // Font data
    results.fontData = { fontFaces: [], googleFontsLinks: [], documentFonts: [] };
    try {
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (rule instanceof CSSFontFaceRule) {
              results.fontData.fontFaces.push({
                family: rule.style.getPropertyValue('font-family').replace(/['"]/g, ''),
                style: rule.style.getPropertyValue('font-style') || 'normal',
                weight: rule.style.getPropertyValue('font-weight') || '400',
                src: rule.style.getPropertyValue('src') || '',
              });
            }
          }
        } catch { /* cross-origin — already tracked */ }
      }
    } catch {}
    for (const link of document.querySelectorAll('link[href*="fonts.googleapis.com"]')) {
      results.fontData.googleFontsLinks.push(link.href);
    }
    for (const font of document.fonts) {
      results.fontData.documentFonts.push({ family: font.family.replace(/['"]/g, ''), style: font.style, weight: font.weight, status: font.status });
    }

    // Image data
    results.images = [];
    for (const img of document.querySelectorAll('img, picture img, [role="img"]')) {
      const rect = img.getBoundingClientRect();
      if (rect.width < 5 || rect.height < 5) continue;
      const cs = getComputedStyle(img);
      results.images.push({
        tag: img.tagName.toLowerCase(),
        src: img.src || '',
        width: rect.width,
        height: rect.height,
        objectFit: cs.objectFit,
        objectPosition: cs.objectPosition,
        borderRadius: cs.borderRadius,
        filter: cs.filter,
        opacity: cs.opacity,
        aspectRatio: cs.aspectRatio,
        classList: Array.from(img.classList).join(' '),
      });
    }

    return results;
  }, { maxElements: MAX_ELEMENTS, ignoreSelectors: ignoreSelectors || [] });

  // Fetch and parse cross-origin stylesheets
  if (data.crossOriginSheets && data.crossOriginSheets.length > 0) {
    const seen = new Set();
    for (const href of data.crossOriginSheets) {
      if (seen.has(href)) continue;
      seen.add(href);
      try {
        const cssText = await page.evaluate(async (url) => {
          const res = await fetch(url, { mode: 'cors' });
          return res.text();
        }, href);
        parseCrossOriginCSS(cssText, data);
      } catch { /* fetch failed too */ }
    }
  }
  delete data.crossOriginSheets;

  return data;
}

function parseCrossOriginCSS(cssText, data) {
  // Media queries
  for (const m of cssText.matchAll(/@media\s*([^{]+)\{/g)) {
    data.mediaQueries.push(m[1].trim());
  }
  // Keyframes
  for (const m of cssText.matchAll(/@keyframes\s+([\w-]+)\s*\{([\s\S]*?)\n\}/g)) {
    const steps = [];
    for (const s of m[2].matchAll(/([\d%,\s]+|from|to)\s*\{([^}]*)\}/g)) {
      steps.push({ offset: s[1].trim(), style: s[2].trim() });
    }
    if (steps.length > 0) data.keyframes.push({ name: m[1], steps });
  }
  // :root variables
  for (const rootBlock of cssText.matchAll(/:root\s*\{([^}]+)\}/g)) {
    for (const v of rootBlock[1].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
      if (!data.cssVariables[v[1]]) data.cssVariables[v[1]] = v[2].trim();
    }
  }
  // @font-face
  for (const m of cssText.matchAll(/@font-face\s*\{([^}]+)\}/g)) {
    const block = m[1];
    const family = block.match(/font-family\s*:\s*['"]?([^'";]+)/)?.[1]?.trim();
    const style = block.match(/font-style\s*:\s*([^;]+)/)?.[1]?.trim() || 'normal';
    const weight = block.match(/font-weight\s*:\s*([^;]+)/)?.[1]?.trim() || '400';
    const src = block.match(/src\s*:\s*([^;]+)/)?.[1]?.trim() || '';
    if (family) data.fontData.fontFaces.push({ family, style, weight, src });
  }
}
