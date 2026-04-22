// v10.4 — Icon System fingerprint
//
// Pure extractor — operates on the icon payload the crawler already collects.
// We can't reliably match against Lucide/Phosphor/Heroicons path-data without
// shipping the full libraries, so this extractor does the next-best thing:
// infers the *system* an icon set came from (stroke vs fill, stroke width,
// corner style, grid size, viewBox convention) and emits guidance any LLM can
// act on ("use Lucide @ 1.5 stroke, 24px grid").

const LIBRARY_HINTS = [
  { id: 'lucide', match: (ctx) => ctx.strokeDominant && ctx.avgWeight > 1.3 && ctx.avgWeight < 1.7 && ctx.grid24 && !ctx.roundedCaps, score: 0.8 },
  { id: 'heroicons-outline', match: (ctx) => ctx.strokeDominant && ctx.avgWeight >= 1.8 && ctx.avgWeight <= 2.2 && ctx.grid24, score: 0.8 },
  { id: 'heroicons-solid', match: (ctx) => ctx.fillDominant && ctx.grid24, score: 0.55 },
  { id: 'phosphor', match: (ctx) => ctx.strokeDominant && ctx.roundedCaps && ctx.grid24, score: 0.7 },
  { id: 'tabler', match: (ctx) => ctx.strokeDominant && ctx.avgWeight > 1.9 && ctx.grid24, score: 0.6 },
  { id: 'feather', match: (ctx) => ctx.strokeDominant && ctx.avgWeight > 1.8 && ctx.roundedCaps && ctx.grid24, score: 0.7 },
  { id: 'remix', match: (ctx) => ctx.mixedFillStroke && ctx.grid24, score: 0.45 },
  { id: 'material', match: (ctx) => ctx.fillDominant && ctx.grid24, score: 0.4 },
];

function parseStroke(v) {
  if (!v) return 0;
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : 0;
}

function viewBoxGrid(vb) {
  if (!vb) return null;
  const parts = vb.trim().split(/\s+/).map(Number);
  if (parts.length !== 4 || parts.some(n => !Number.isFinite(n))) return null;
  const w = parts[2], h = parts[3];
  if (w === h && [16, 20, 24, 32, 48, 64].includes(w)) return w;
  return null;
}

function detectRoundedCaps(svg) {
  // Look for `stroke-linecap="round"` or `stroke-linejoin="round"` as a
  // proxy for Phosphor/Feather-style rounded terminals.
  return /stroke-linecap="round"|stroke-linejoin="round"/i.test(svg || '');
}

export function extractIconSystem(icons = []) {
  if (!icons.length) {
    return { library: 'unknown', confidence: 0, stats: {}, signals: [], icons: [] };
  }

  let strokeCount = 0, fillCount = 0, mixed = 0, weights = [], gridHits = {};
  let rounded = 0;
  const perIconHints = [];

  for (const icon of icons) {
    const svg = icon.svg || '';
    const stroke = icon.stroke || (svg.match(/stroke="([^"]+)"/i) || [])[1];
    const fill = icon.fill || (svg.match(/fill="([^"]+)"/i) || [])[1];
    const strokeWidthMatch = svg.match(/stroke-width="([0-9.]+)"/i);
    const sw = strokeWidthMatch ? parseStroke(strokeWidthMatch[1]) : 0;

    const hasStroke = !!(stroke && stroke !== 'none');
    const hasFill = !!(fill && fill !== 'none');
    if (hasStroke && !hasFill) strokeCount++;
    else if (hasFill && !hasStroke) fillCount++;
    else if (hasStroke && hasFill) mixed++;
    if (sw > 0) weights.push(sw);
    const grid = viewBoxGrid(icon.viewBox);
    if (grid) gridHits[grid] = (gridHits[grid] || 0) + 1;
    if (detectRoundedCaps(svg)) rounded++;

    perIconHints.push({
      class: (icon.classList || '').slice(0, 80),
      grid,
      strokeWidth: sw || null,
      style: hasStroke && !hasFill ? 'stroke' : hasFill && !hasStroke ? 'fill' : 'mixed',
    });
  }

  const avgWeight = weights.length ? weights.reduce((a, b) => a + b, 0) / weights.length : 0;
  const total = icons.length;
  const ctx = {
    strokeDominant: strokeCount / total > 0.55,
    fillDominant: fillCount / total > 0.55,
    mixedFillStroke: mixed / total > 0.3,
    avgWeight,
    roundedCaps: rounded / total > 0.4,
    grid24: gridHits[24] ? gridHits[24] / total > 0.5 : false,
  };

  const scored = LIBRARY_HINTS
    .map(lib => ({ id: lib.id, score: lib.match(ctx) ? lib.score : 0 }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score);

  const primary = scored[0] || { id: 'unknown', score: 0 };

  return {
    library: primary.id,
    confidence: Number(primary.score.toFixed(3)),
    alternates: scored.slice(1, 4),
    stats: {
      count: total,
      strokeOnly: strokeCount,
      fillOnly: fillCount,
      mixed,
      avgStrokeWidth: Number(avgWeight.toFixed(2)),
      gridDistribution: gridHits,
      roundedCapsFraction: Number((rounded / total).toFixed(2)),
    },
    signals: Object.entries(ctx).filter(([, v]) => v === true).map(([k]) => k),
    icons: perIconHints.slice(0, 30),
  };
}
