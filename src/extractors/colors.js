import { parseColor, rgbToHex, rgbToHsl, clusterColors, isSaturated, colorDistance } from '../utils.js';
import { buildRamp, buildSemanticPairs } from './color-ramps.js';

const INTERACTIVE_TAGS = new Set(['a', 'button']);
const INTERACTIVE_ROLES = new Set(['button', 'link', 'menuitem', 'tab']);
const INTERACTIVE_CLASS_RE = /\b(btn|button|cta|primary|action)\b/i;

function isInteractive(el) {
  if (!el) return false;
  if (INTERACTIVE_TAGS.has(el.tag)) return true;
  if (el.role && INTERACTIVE_ROLES.has(el.role)) return true;
  if (el.classList && INTERACTIVE_CLASS_RE.test(el.classList)) return true;
  return false;
}

// A link around a whole card or a full-width banner is a surface, not a
// button: linear.app's customer-story tile is an <a> 432x480 painted #e4f222.
// Elements without a measured box (older captures) keep counting.
const MAX_CTA_WIDTH = 800;
const MAX_CTA_HEIGHT = 120;
function isCtaSized(el) {
  if (typeof el.width !== 'number' || typeof el.height !== 'number') return true;
  return el.width <= MAX_CTA_WIDTH && el.height <= MAX_CTA_HEIGHT;
}

// Variables a site names for its own brand colour: --brand, --color-primary,
// --color-brand-bg, --color-accent. Not --color-text-primary or
// --color-bg-primary, which are roles for other things.
const BRAND_VAR_RE = /^--(?:(?:color|colors|clr|theme)-)?(brand|primary|accent)(?:-(?:bg|background|color|default|base|main|500|600))?$/i;
const BRAND_VAR_WEIGHT = { brand: 1, primary: 1, accent: 0.6 };
const BRAND_VAR_BONUS = 120;

function resolveVar(value, vars, depth = 0) {
  const m = typeof value === 'string' && value.trim().match(/^var\(\s*(--[\w-]+)\s*(?:,[^)]*)?\)$/);
  if (!m || depth > 3 || vars[m[1]] === undefined) return value;
  return resolveVar(vars[m[1]], vars, depth + 1);
}

// The colours the site's own CSS calls brand, as { parsed, weight }.
function declaredBrandColors(cssVariables) {
  const found = [];
  for (const [name, raw] of Object.entries(cssVariables || {})) {
    const m = BRAND_VAR_RE.exec(name);
    if (!m) continue;
    const parsed = parseColor(resolveVar(raw, cssVariables));
    // --color-brand names the brand; --color-brand-600 is one shade of a ramp
    // built from it (supabase.com: brand #3ecf8e, brand-600 a dark green).
    const shade = /-\d{2,4}$/.test(name);
    if (parsed && parsed.a > 0) found.push({ parsed, weight: BRAND_VAR_WEIGHT[m[1].toLowerCase()] * (shade ? 0.5 : 1) });
  }
  return found;
}

export function extractColors(computedStyles, { cssVariables } = {}) {
  const colorMap = new Map(); // hex -> { hex, parsed, count, contexts: Set, interactiveBg: number }

  function addColor(value, context, { interactive = false, area = 0 } = {}) {
    const parsed = parseColor(value);
    if (!parsed || parsed.a === 0) return;
    const hex = rgbToHex(parsed);
    if (!colorMap.has(hex)) {
      colorMap.set(hex, { hex, parsed, count: 0, contexts: new Set(), interactiveBg: 0, interactiveText: 0, area: 0 });
    }
    const entry = colorMap.get(hex);
    entry.count++;
    entry.contexts.add(context);
    // Painted area, not element count: one hero background outweighs two
    // hundred 16px icons, which is how a person reads a page.
    if (context === 'background') entry.area += area;
    if (interactive && context === 'background') entry.interactiveBg++;
    if (interactive && context === 'text') entry.interactiveText++;
  }

  const gradients = new Set();

  for (const el of computedStyles) {
    const interactive = isInteractive(el);
    addColor(el.color, 'text', { interactive });
    addColor(el.backgroundColor, 'background', { interactive: interactive && isCtaSized(el), area: el.area || 0 });
    addColor(el.borderColor, 'border');

    if (el.backgroundImage && el.backgroundImage !== 'none' && el.backgroundImage.includes('gradient')) {
      gradients.add(el.backgroundImage);
    }
  }

  const allColors = Array.from(colorMap.values());
  const clusters = clusterColors(allColors, 15);

  // Aggregate interactive-bg score per cluster (sum across members)
  const totalArea = allColors.reduce((s, c) => s + (c.area || 0), 0);
  for (const cluster of clusters) {
    cluster.interactiveBg = cluster.members.reduce((s, m) => s + (m.interactiveBg || 0), 0);
    cluster.interactiveText = cluster.members.reduce((s, m) => s + (m.interactiveText || 0), 0);
    cluster.area = cluster.members.reduce((s, m) => s + (m.area || 0), 0);
    cluster.areaShare = totalArea > 0 ? cluster.area / totalArea : 0;
    const { s: sat, l: lit } = rgbToHsl(cluster.representative);
    cluster.saturation = sat;
    cluster.lightness = lit;
  }

  // Classify roles — tighten chromatic threshold so pale grays (hsl sat < 25) don't qualify
  const neutrals = [];
  const chromatic = [];

  for (const cluster of clusters) {
    const chromaticEnough = cluster.saturation > 25 && cluster.lightness > 5 && cluster.lightness < 95;
    if (chromaticEnough || (isSaturated(cluster.representative) && cluster.interactiveBg > 0)) {
      chromatic.push(cluster);
    } else {
      neutrals.push(cluster);
    }
  }

  // Background colors: found on large-area elements
  const bgColors = [];
  for (const el of computedStyles) {
    if (el.area > 50000) {
      const parsed = parseColor(el.backgroundColor);
      if (parsed && parsed.a > 0) bgColors.push(rgbToHex(parsed));
    }
  }

  // Text colors, most prominent first. The first colour in document order is
  // the <html> default (stripe.com: #000000, which no visible text uses), so
  // order by the area of text actually painted. Headings count four times:
  // they carry the page's ink (stripe: #061b31 on headings, #50617a on links).
  // Elements without hasText/area (older captures) count as one unit of text.
  const textWeight = new Map();
  const textOrder = [];
  for (const el of computedStyles) {
    const parsed = parseColor(el.color);
    if (!parsed || parsed.a === 0) continue;
    const hex = rgbToHex(parsed);
    if (!textWeight.has(hex)) { textWeight.set(hex, 0); textOrder.push(hex); }
    if (el.hasText === false || el.area === 0) continue;
    const painted = typeof el.area === 'number' ? el.area : 1;
    textWeight.set(hex, textWeight.get(hex) + painted * (/^h[1-6]$/.test(el.tag) ? 4 : 1));
  }
  const textColors = textOrder
    .map((hex, i) => ({ hex, i, w: textWeight.get(hex) }))
    .sort((a, b) => b.w - a.w || a.i - b.i)
    .map((c) => c.hex);

  // Rank chromatic clusters by brand-likelihood. Measured on real sites
  // (bench/), linear weights let one button decide: 100 points per interactive
  // background against at most ~3 for usage and area, so gov.uk's CTA green
  // (4 buttons) beat the GOV.UK blue and a one-off #0066ff beat Framer Blue
  // used 44 times.
  //   interactive backgrounds: a strong signal, with diminishing returns
  //   interactive text (links, text buttons): weaker, also diminishing
  //   chroma, not HSL saturation: near-black #002533 has s=100 but reads dark
  //   usage and painted area: a brand colour is repeated across the page
  // Evidence of use counts only in proportion to how colourful the cluster is:
  // near-black #101214 on atlassian.com (chroma 1.5) got in through two dark
  // buttons and then won on 702 uses. Area has diminishing returns, since one
  // full-page background (84% of discord.com) is a surface, not repetition.
  // The site's own CSS naming a colour as brand/primary/accent is the best
  // evidence there is (linear.app: --color-brand-bg #5e6ad2, painted on one
  // banner), so it outweighs what usage statistics can say about a code diff.
  const declared = declaredBrandColors(cssVariables);
  for (const c of clusters) {
    c.declared = declared.reduce(
      (best, d) => (colorDistance(c.representative, d.parsed) < 15 ? Math.max(best, d.weight) : best), 0);
  }

  const chromaOf = (c) => ((100 - Math.abs(2 * c.lightness - 100)) * c.saturation) / 100;
  function brandScore(c) {
    const chroma = chromaOf(c);
    const colourful = Math.min(1, chroma / 30);
    return chroma + colourful * (
      40 * Math.log2(1 + c.interactiveBg)
      // Links painted in a colour are the brand's voice across a page
      // (atlassian.com: 27 blue links lost to 4 yellow buttons without this).
      + 15 * Math.log2(1 + c.interactiveText)
      + 25 * Math.log10(Math.max(1, c.count))
      + 60 * Math.sqrt(c.areaShare || 0)
    ) + BRAND_VAR_BONUS * c.declared;
  }
  // The browser's default link colours say nothing about the brand.
  const UA_LINK_COLORS = new Set(['#0000ee', '#551a8b']);
  const scored = [...chromatic]
    .filter((c) => !UA_LINK_COLORS.has(c.hex))
    .sort((a, b) => brandScore(b) - brandScore(a));

  // Chroma alone ranks any pure primary first: linear.app's code-diff
  // highlights (#00ff05 on 19 spans, #ff0000 on 6, under 0.03% of the painted
  // area) came out as secondary and accent. A colour is a candidate for a role
  // only if something other than saturation vouches for it: it fills a button
  // or is a link colour, or covers a visible share of the page, or is declared.
  // Near-black and near-white surfaces never qualify on their own account
  // (github.com's #0d1117 canvas is nobody's accent). A page where nothing
  // qualifies keeps the old order.
  const MIN_ROLE_AREA_SHARE = 0.005;
  const MIN_ROLE_CHROMA = 15;
  const vouched = (c) => c.declared > 0 || (chromaOf(c) >= MIN_ROLE_CHROMA
    && (c.interactiveBg > 0 || c.interactiveText > 0 || (c.areaShare || 0) >= MIN_ROLE_AREA_SHARE));
  const evidenced = scored.filter(vouched);
  const ranked = evidenced.length ? evidenced : scored;

  const primary = ranked[0] || null;
  // secondary: distinct hue from primary
  const secondary = ranked.find(c => {
    if (!primary || c === primary) return false;
    return colorDistance(c.representative, primary.representative) > 60;
  }) || ranked[1] || null;
  // accent: sparse chromatic, prefers background context
  const accent = ranked.find(c => {
    if (c === primary || c === secondary) return false;
    const pct = c.count / Math.max(1, allColors.reduce((s, a) => s + a.count, 0));
    return pct < 0.05 && c.members.some(m => m.contexts.has('background'));
  }) || ranked.find(c => c !== primary && c !== secondary) || null;

  // Primary detection confidence — useful signal for downstream consumers
  // that may want to warn the user when extraction is uncertain (e.g. a
  // monochrome site where there's no clear brand colour). We compute it
  // from the score gap between rank 1 and rank 2: a runaway leader is
  // confident, a near-tie is not.
  let primaryConfidence = null;
  if (primary) {
    const top = brandScore(primary);
    const next = ranked[1] ? brandScore(ranked[1]) : 0;
    if (top <= 0) {
      primaryConfidence = 0;
    } else if (next <= 0) {
      primaryConfidence = primary.interactiveBg > 0 ? 1 : 0.6;
    } else {
      const gap = (top - next) / top;
      // Anchor: gap >= 0.5 → 1.0 (runaway). gap 0 → 0.3 (near-tie).
      primaryConfidence = Math.max(0.3, Math.min(1, 0.3 + gap * 1.4));
    }
    primaryConfidence = Math.round(primaryConfidence * 100) / 100;
  }

  const result = {
    primary: primary ? { hex: primary.hex, rgb: primary.representative, hsl: rgbToHsl(primary.representative), count: primary.count, confidence: primaryConfidence } : null,
    secondary: secondary ? { hex: secondary.hex, rgb: secondary.representative, hsl: rgbToHsl(secondary.representative), count: secondary.count } : null,
    accent: accent ? { hex: accent.hex, rgb: accent.representative, hsl: rgbToHsl(accent.representative), count: accent.count } : null,
    neutrals: neutrals.map(c => ({ hex: c.hex, rgb: c.representative, hsl: rgbToHsl(c.representative), count: c.count })),
    backgrounds: [...new Set(bgColors)],
    text: textColors.slice(0, 10),
    gradients: [...gradients],
    all: clusters.map(c => ({
      hex: c.hex,
      rgb: c.representative,
      hsl: rgbToHsl(c.representative),
      count: c.count,
      areaShare: Math.round((c.areaShare || 0) * 1000) / 1000,
      contexts: [...new Set(c.members.flatMap(m => [...m.contexts]))],
    })),
    // Why the primary won: the top candidates and what counted for each.
    ranking: ranked.slice(0, 6).map((c) => ({
      hex: c.hex,
      score: Math.round(brandScore(c) * 10) / 10,
      chroma: Math.round(chromaOf(c)),
      interactiveBg: c.interactiveBg,
      interactiveText: c.interactiveText,
      count: c.count,
      areaShare: Math.round((c.areaShare || 0) * 1000) / 1000,
      declared: c.declared,
    })),
    // Colours ranked by painted area — what the page actually looks like,
    // as opposed to what it declares most often.
    dominance: clusters
      .filter(c => (c.areaShare || 0) > 0)
      .sort((a, b) => b.areaShare - a.areaShare)
      .slice(0, 8)
      .map(c => ({ hex: c.hex, areaShare: Math.round(c.areaShare * 1000) / 1000 })),
  };

  // Tonal ramps for every named role plus the dominant neutral — one hex is
  // not a palette, and every downstream consumer (hover states, tinted
  // surfaces, borders) was left to invent the rest.
  result.ramps = {};
  for (const [role, entry] of [['primary', result.primary], ['secondary', result.secondary], ['accent', result.accent]]) {
    if (!entry?.hex) continue;
    const ramp = buildRamp(entry.hex);
    if (ramp) result.ramps[role] = ramp;
  }
  const neutralSeed = result.neutrals.slice().sort((a, b) => b.count - a.count)
    .find(n => n.hsl && n.hsl.l > 10 && n.hsl.l < 90);
  if (neutralSeed) {
    const ramp = buildRamp(neutralSeed.hex);
    if (ramp) result.ramps.neutral = ramp;
  }

  result.pairs = buildSemanticPairs(result);

  return result;
}
