import { parseCSSValue, detectScale } from '../utils.js';

function naturalBreakCluster(values) {
  if (values.length <= 1) return values;
  const sorted = [...values].sort((a, b) => a - b);
  if (sorted.length <= 2) return sorted;

  // Compute gaps between consecutive values
  const gaps = [];
  for (let i = 1; i < sorted.length; i++) {
    gaps.push(sorted[i] - sorted[i - 1]);
  }

  // Find median gap
  const sortedGaps = [...gaps].sort((a, b) => a - b);
  const medianGap = sortedGaps[Math.floor(sortedGaps.length / 2)];

  // Split into clusters at gaps larger than the median
  const clusters = [[sorted[0]]];
  for (let i = 1; i < sorted.length; i++) {
    if (gaps[i - 1] > medianGap) {
      clusters.push([sorted[i]]);
    } else {
      clusters[clusters.length - 1].push(sorted[i]);
    }
  }

  // Use the first (smallest) value in each cluster as representative
  return clusters.map(c => c[0]);
}

// Spacing is weighted by use: a value on 80 elements says more about the
// grid than a 1px hairline or a one-off 366px margin.
const BASES = [4, 5, 6, 8, 10, 12, 16];

function weightedBase(counts) {
  const total = [...counts.values()].reduce((a, b) => a + b, 0);
  if (!total) return null;
  const fit = (b) => [...counts].reduce((n, [v, c]) => n + (v % b === 0 ? c : 0), 0) / total;
  const fits = BASES.map((b) => [b, fit(b)]);
  const best = Math.max(...fits.map(([, f]) => f));
  if (best < 0.6) return fit(2) >= 0.8 ? 2 : null;
  // The largest base that fits nearly as well as the best one: a site on 8s
  // also fits 4, and the coarser grid is the one its designers chose.
  return fits.filter(([, f]) => f >= best - 0.08).map(([b]) => b).sort((a, b) => b - a)[0];
}

export function extractSpacing(computedStyles) {
  const counts = new Map();

  for (const el of computedStyles) {
    for (const prop of ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'gap']) {
      const val = parseCSSValue(el[prop]);
      if (val && val.value > 0 && val.value < 500) {
        const v = Math.round(val.value);
        counts.set(v, (counts.get(v) || 0) + 1);
      }
    }
  }

  const sorted = [...counts.keys()].sort((a, b) => a - b);
  const total = [...counts.values()].reduce((a, b) => a + b, 0);
  // Hairlines (1px) are borders in disguise; values used once or twice on a
  // big page are one-offs.
  const minUse = total >= 50 ? Math.max(2, Math.min(3, Math.round(total * 0.004))) : 1;
  const used = new Map([...counts].filter(([v, c]) => v > 1 && c >= minUse));
  let base = weightedBase(used.size >= 3 ? used : counts);
  let scale = [...(used.size >= 3 ? used : counts)]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 16)
    .map(([v]) => v)
    .sort((a, b) => a - b);
  // With a grid found, the scale is the steps on it; off-grid values stay in raw.
  if (base) {
    const onGrid = scale.filter((v) => v % base === 0);
    if (onGrid.length >= 4) scale = onGrid;
  }
  // Too few distinct values to call it a system: fall back to the old reading.
  if (scale.length < 3) {
    const r = detectScale(naturalBreakCluster(sorted));
    base = r.base;
    scale = r.scale;
  }

  // Build named tokens
  const tokens = {};
  if (base) {
    for (const v of scale) {
      const step = v / base;
      if (Number.isInteger(step)) {
        tokens[String(step)] = `${v}px`;
      } else {
        tokens[`${v}px`] = `${v}px`;
      }
    }
  } else {
    for (let i = 0; i < scale.length; i++) {
      tokens[String(i)] = `${scale[i]}px`;
    }
  }

  return { base, scale, tokens, raw: sorted };
}
