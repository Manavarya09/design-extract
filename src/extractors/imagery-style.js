// Classify the imagery style of a site from the sampled <img> list. No image
// downloads — we work from the src URL, displayed dimensions, and styling
// already captured by the crawler. The goal is a fingerprint an LLM can use:
// "photography-heavy with abstract gradients" vs "flat illustration only".

const LABELS = [
  'photography', '3d-render', 'isometric', 'flat-illustration',
  'gradient-mesh', 'icon-only', 'screenshot', 'mixed', 'none',
];

function isSvg(img) {
  const src = (img.src || '').toLowerCase();
  return src.endsWith('.svg') || src.startsWith('data:image/svg+xml') || img.tag === 'svg';
}

function aspectBucket(img) {
  if (!img.width || !img.height) return 'unknown';
  const r = img.width / img.height;
  if (r > 2.2) return 'ultra-wide';
  if (r > 1.4) return 'landscape';
  if (r > 0.85) return 'square-ish';
  if (r > 0.5) return 'portrait';
  return 'tall';
}

function filenameHint(src) {
  const lower = (src || '').toLowerCase();
  const hints = [];
  if (/\b(screenshot|screen-shot|dashboard|ui-|product-ui)\b/.test(lower)) hints.push('screenshot');
  if (/\b(hero|cover|banner)\b/.test(lower)) hints.push('hero');
  if (/\b(3d|render|gltf|iso|isometric)\b/.test(lower)) hints.push('3d');
  if (/\b(illust|illustr|character|mascot)\b/.test(lower)) hints.push('illustration');
  if (/\b(photo|portrait|team|headshot)\b/.test(lower)) hints.push('photo');
  if (/\b(icon|symbol|logo)\b/.test(lower)) hints.push('icon');
  if (/\b(gradient|mesh|blob)\b/.test(lower)) hints.push('mesh');
  return hints;
}

function scoreLabels(images) {
  const tally = Object.fromEntries(LABELS.map(l => [l, 0]));
  const reasons = [];
  let photoish = 0, svgCount = 0, iconCount = 0, heroCount = 0, screenshotCount = 0;

  for (const img of images) {
    const svg = isSvg(img);
    if (svg) svgCount++;
    const maxSide = Math.max(img.width || 0, img.height || 0);
    if (maxSide < 40 && maxSide > 0) iconCount++;
    const hints = filenameHint(img.src);
    if (hints.includes('screenshot')) { tally.screenshot += 0.4; screenshotCount++; }
    if (hints.includes('3d')) tally['3d-render'] += 0.6;
    if (hints.includes('iso')) tally['isometric'] += 0.6;
    if (hints.includes('illustration')) tally['flat-illustration'] += 0.5;
    if (hints.includes('photo')) { tally.photography += 0.5; photoish++; }
    if (hints.includes('mesh')) tally['gradient-mesh'] += 0.5;
    if (hints.includes('icon')) iconCount++;
    if (hints.includes('hero')) heroCount++;

    // Ext-based heuristics.
    const src = (img.src || '').toLowerCase();
    if (/\.(jpe?g|webp|avif)(\?|$)/.test(src) && maxSide > 200) {
      tally.photography += 0.15; photoish++;
      reasons.push('raster photo-ext');
    }
    if (src.endsWith('.png') && maxSide > 150 && !svg) {
      tally.photography += 0.05;
    }
    if (svg && maxSide > 100) {
      tally['flat-illustration'] += 0.15;
    }
  }

  // Normalization heuristics.
  const total = Math.max(1, images.length);
  if (svgCount / total > 0.6) { tally['flat-illustration'] += 0.4; reasons.push('svg-heavy'); }
  if (iconCount / total > 0.7) tally['icon-only'] += 0.6;
  if (photoish / total > 0.5) tally.photography += 0.3;
  if (screenshotCount > 0) reasons.push(`${screenshotCount} screenshot-like`);

  return { tally, reasons, counts: { total, svgCount, iconCount, heroCount, screenshotCount, photoish } };
}

function dominantAspect(images) {
  const buckets = {};
  for (const img of images) {
    const b = aspectBucket(img);
    buckets[b] = (buckets[b] || 0) + 1;
  }
  const sorted = Object.entries(buckets).sort((a, b) => b[1] - a[1]);
  return sorted[0] ? sorted[0][0] : 'unknown';
}

function borderRadiusProfile(images) {
  const radii = images.map(i => parseFloat(i.borderRadius) || 0).filter(n => !isNaN(n));
  if (!radii.length) return 'none';
  const avg = radii.reduce((a, b) => a + b, 0) / radii.length;
  if (avg > 9999) return 'full';
  if (avg > 20) return 'rounded';
  if (avg > 4) return 'soft';
  return 'square';
}

export function extractImageryStyle(images = []) {
  if (!images.length) {
    return { label: 'none', confidence: 0, counts: {}, aspectRatios: [], radiusProfile: 'none', signals: [] };
  }
  const { tally, reasons, counts } = scoreLabels(images);
  const ranked = Object.entries(tally).sort((a, b) => b[1] - a[1]);
  const [winner, winScore] = ranked[0];
  const [, second] = ranked[1] || [null, 0];
  let label = winScore === 0 ? 'mixed' : winner;
  if (winScore > 0 && second > 0 && (winScore - second) < 0.2) label = 'mixed';
  const confidence = Math.min(1, winScore / Math.max(1, images.length * 0.3));

  return {
    label,
    confidence: Number(confidence.toFixed(3)),
    counts: {
      total: counts.total,
      svg: counts.svgCount,
      icon: counts.iconCount,
      hero: counts.heroCount,
      screenshot: counts.screenshotCount,
      photoLike: counts.photoish,
    },
    dominantAspect: dominantAspect(images),
    radiusProfile: borderRadiusProfile(images),
    alternates: ranked.filter(([, s]) => s > 0 && s !== winScore).slice(0, 3).map(([l, s]) => ({ label: l, score: Number(s.toFixed(3)) })),
    signals: reasons.slice(0, 10),
  };
}
