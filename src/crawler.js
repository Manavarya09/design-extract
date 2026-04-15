import { chromium } from 'playwright';

const MAX_ELEMENTS = 5000;

export async function crawlPage(url, options = {}) {
  const { width = 1280, height = 800, wait = 0, dark = false } = options;

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width, height },
    colorScheme: 'light',
  });
  const page = await context.newPage();

  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  if (wait > 0) await page.waitForTimeout(wait);

  // Wait for fonts to load
  await page.evaluate(() => document.fonts.ready);

  const lightData = await extractPageData(page);

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
  }

  const title = await page.title();
  await browser.close();

  return { url, title, light: lightData, dark: darkData };
}

async function extractPageData(page) {
  return page.evaluate((maxElements) => {
    const results = {
      computedStyles: [],
      cssVariables: {},
      mediaQueries: [],
      keyframes: [],
    };

    // 1. Walk all elements and collect computed styles
    const allElements = document.querySelectorAll('*');
    const elements = allElements.length > maxElements
      ? Array.from(allElements).slice(0, maxElements)
      : Array.from(allElements);

    for (const el of elements) {
      const cs = getComputedStyle(el);
      const tag = el.tagName.toLowerCase();
      const classList = Array.from(el.classList).join(' ');
      const role = el.getAttribute('role') || '';

      // Get bounding rect for area estimation
      const rect = el.getBoundingClientRect();
      const area = rect.width * rect.height;

      results.computedStyles.push({
        tag,
        classList,
        role,
        area,
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
      });
    }

    // 2. Extract CSS custom properties from :root
    const rootStyles = getComputedStyle(document.documentElement);
    // Get all custom properties by iterating stylesheets
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
        } catch { /* cross-origin stylesheet, skip */ }
      }
    } catch { /* no stylesheets accessible */ }

    // Also get any custom properties from the computed style
    // (fallback for CSS-in-JS that sets vars on :root)
    for (let i = 0; i < rootStyles.length; i++) {
      const prop = rootStyles[i];
      if (prop.startsWith('--') && !results.cssVariables[prop]) {
        results.cssVariables[prop] = rootStyles.getPropertyValue(prop).trim();
      }
    }

    // 3. Extract media queries from stylesheets
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

    // 4. Extract keyframes
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
