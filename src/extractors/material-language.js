// Classify a site's "material language" — the visual tactility vocabulary it
// uses. Signals are the already-extracted shadows, borders, backdrop filters,
// saturation, and geometry. Output: one dominant label + secondary signals.

const LABELS = [
  'glassmorphism', 'neumorphism', 'flat', 'brutalist',
  'skeuomorphic', 'material-you', 'soft-ui', 'mixed',
];

function parseHexToRgb(hex) {
  if (!hex || !hex.startsWith('#')) return null;
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  if (full.length !== 6) return null;
  return { r: parseInt(full.slice(0, 2), 16), g: parseInt(full.slice(2, 4), 16), b: parseInt(full.slice(4, 6), 16) };
}

function rgbSaturation(rgb) {
  if (!rgb) return 0;
  const max = Math.max(rgb.r, rgb.g, rgb.b) / 255;
  const min = Math.min(rgb.r, rgb.g, rgb.b) / 255;
  if (max === 0) return 0;
  return (max - min) / max;
}

function avgSaturation(colors) {
  if (!colors.length) return 0;
  let total = 0, count = 0;
  for (const c of colors) {
    const rgb = parseHexToRgb(c.hex || c);
    if (!rgb) continue;
    total += rgbSaturation(rgb);
    count++;
  }
  return count > 0 ? total / count : 0;
}

function detectBackdropBlur(modernCss = {}, variables = {}) {
  // modernCss.pseudoElements might contain backdrop-filter samples; also look
  // at css-variables for `--backdrop`.
  const samples = [
    ...((modernCss.pseudoElements && modernCss.pseudoElements.samples) || []),
    ...Object.values(variables || {}).flatMap(v => typeof v === 'string' ? [v] : []),
  ].join(' ');
  return /backdrop-filter|backdrop-blur|blur\(\s*\d+px\s*\)/i.test(samples);
}

function shadowComplexity(shadowValues) {
  // Soft-UI / neumorphism use pair-shadows (inset + outer) with low blur and
  // low-saturation grays. Brutalism uses hard black shadows with 0 blur.
  if (!shadowValues.length) return { profile: 'none', avgBlur: 0, maxBlur: 0, insetCount: 0, hardShadowCount: 0, hasPair: false };
  let insetCount = 0, hardShadowCount = 0, totalBlur = 0, maxBlur = 0, pairCount = 0;
  for (const v of shadowValues) {
    const raw = typeof v === 'string' ? v : (v.value || '');
    if (/inset/i.test(raw)) insetCount++;
    // Blur is the third length in `offset-x offset-y blur [spread] color`. The
    // `px` unit is common but optional — `0 0` is a valid zero-blur shadow.
    const blurs = [...raw.matchAll(/(-?\d+(?:\.\d+)?)(?:px)?\s+(-?\d+(?:\.\d+)?)(?:px)?\s+(\d+(?:\.\d+)?)(?:px)?/g)];
    for (const m of blurs) {
      const blur = parseFloat(m[3]);
      totalBlur += blur;
      if (blur > maxBlur) maxBlur = blur;
      if (blur === 0) hardShadowCount++;
    }
    if ((raw.match(/,/g) || []).length >= 1) pairCount++;
  }
  const avgBlur = totalBlur / Math.max(1, shadowValues.length);
  let profile = 'soft';
  if (hardShadowCount > shadowValues.length * 0.5) profile = 'hard';
  else if (maxBlur > 40) profile = 'diffuse';
  return { profile, avgBlur, maxBlur, insetCount, hardShadowCount, hasPair: pairCount > 0 };
}

function borderProfile(radii = [], borderValues = []) {
  const nums = radii.map(r => {
    if (typeof r === 'number') return r;
    if (typeof r === 'string') return parseFloat(r) || 0;
    if (r && typeof r === 'object') return parseFloat(r.value || r.px || 0) || 0;
    return 0;
  }).filter(n => !isNaN(n));
  const avg = nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;
  const max = nums.length ? Math.max(...nums) : 0;
  const pill = nums.some(n => n >= 9999 || n >= 500);
  const sharp = nums.length && max < 4;
  return { avg, max, pill, sharp };
}

export function extractMaterialLanguage(design = {}) {
  const colors = design.colors?.all || [];
  const shadows = design.shadows?.values || [];
  const radii = design.borders?.radii || [];
  const variables = design.variables || {};
  const modernCss = design.modernCss || {};

  const sat = avgSaturation(colors);
  const hasBackdropBlur = detectBackdropBlur(modernCss, variables);
  const sh = shadowComplexity(shadows);
  const br = borderProfile(radii);
  const gradientCount = design.gradients?.count || 0;

  const scores = Object.fromEntries(LABELS.map(l => [l, 0]));
  const signals = [];

  if (hasBackdropBlur) {
    scores.glassmorphism += 0.6; signals.push({ label: 'glassmorphism', weight: 0.6, detail: 'backdrop-filter present' });
  }
  if (sh.avgBlur > 30 && sat < 0.3 && sh.insetCount > 0 && sh.hasPair) {
    scores.neumorphism += 0.7; signals.push({ label: 'neumorphism', weight: 0.7, detail: 'paired blur + inset + low saturation' });
  }
  if (sh.profile === 'hard' && br.sharp && sat > 0.4) {
    scores.brutalist += 0.75; signals.push({ label: 'brutalist', weight: 0.75, detail: 'hard shadows + sharp corners + saturated' });
  }
  if (shadows.length === 0 && sh.insetCount === 0 && br.avg < 12 && gradientCount < 2) {
    scores.flat += 0.55; signals.push({ label: 'flat', weight: 0.55, detail: 'no shadows, simple radii' });
  }
  if (sh.avgBlur > 60 && sat < 0.4 && !hasBackdropBlur) {
    scores['soft-ui'] += 0.5; signals.push({ label: 'soft-ui', weight: 0.5, detail: 'soft diffuse shadows' });
  }
  if (br.pill && sh.profile === 'soft' && sat > 0.3) {
    scores['material-you'] += 0.45; signals.push({ label: 'material-you', weight: 0.45, detail: 'pill shapes + soft shadows' });
  }
  if (gradientCount > 6 && sat > 0.5) {
    scores.skeuomorphic += 0.35; signals.push({ label: 'skeuomorphic', weight: 0.35, detail: 'heavy gradient usage' });
  }

  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [winner, winScore] = ranked[0];
  const [, second] = ranked[1] || [null, 0];
  let label = winScore === 0 ? 'flat' : winner;
  // If top two are close, it's "mixed".
  if (winScore > 0 && second > 0 && (winScore - second) < 0.15) label = 'mixed';
  const confidence = Math.min(1, winScore);

  return {
    label,
    confidence: Number(confidence.toFixed(3)),
    signals,
    metrics: {
      saturation: Number(sat.toFixed(3)),
      shadowProfile: sh.profile,
      avgShadowBlur: Number(sh.avgBlur.toFixed(1)),
      maxShadowBlur: Number(sh.maxBlur.toFixed(1)),
      insetShadows: sh.insetCount,
      avgRadius: Number(br.avg.toFixed(1)),
      maxRadius: Number(br.max.toFixed(1)),
      hasPill: br.pill,
      hasBackdropBlur,
      gradientCount,
    },
    alternates: ranked.filter(([, s]) => s > 0 && s !== winScore).slice(0, 3).map(([l, s]) => ({ label: l, score: Number(s.toFixed(3)) })),
  };
}
