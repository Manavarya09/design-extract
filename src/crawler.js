import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { join } from 'path';

const MAX_ELEMENTS = 5000;

export async function crawlPage(url, options = {}) {
  const { width = 1280, height = 800, wait = 0, dark = false, depth = 0, screenshots = false, outDir = '' } = options;

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width, height },
    colorScheme: 'light',
  });
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
  } catch {
    // Sites with websockets/long-polling never reach networkidle — fall back to load
    await page.goto(url, { waitUntil: 'load', timeout: 30000 });
  }
  if (wait > 0) await page.waitForTimeout(wait);
  await page.evaluate(() => document.fonts.ready);

  const title = await page.title();
  const lightData = await extractPageData(page);

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
        await page.goto(link, { waitUntil: 'networkidle', timeout: 20000 });
        await page.evaluate(() => document.fonts.ready);
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
    await darkPage.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await darkPage.evaluate(() => document.fonts.ready);
    darkData = await extractPageData(darkPage);
    await darkContext.close();
  } else {
    await context.close();
  }

  await browser.close();

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

async function extractPageData(page) {
  return page.evaluate((maxElements) => {
    const results = {
      computedStyles: [],
      cssVariables: {},
      mediaQueries: [],
      keyframes: [],
    };

    const allElements = document.querySelectorAll('*');
    const elements = allElements.length > maxElements
      ? Array.from(allElements).slice(0, maxElements)
      : Array.from(allElements);

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
        boxShadow: cs.boxShadow,
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
        } catch { /* cross-origin */ }
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
        } catch { /* cross-origin */ }
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
        } catch { /* cross-origin */ }
      }
    } catch { /* no access */ }

    return results;
  }, MAX_ELEMENTS);
}
