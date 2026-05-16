// Smart palette compression via LAB-space k-means.
//
// Raw extractions often yield 60–200 unique colours (every minor RGB
// variation, every transparent overlay's blended result). That's noise,
// not a system. This module reduces a long input list to a short,
// perceptually distinct output palette by:
//
//   1. Converting every hex to CIELAB (perceptually uniform)
//   2. Weighting each colour by its usage count (frequency)
//   3. Running weighted k-means with k+ seeded by the most-used colours
//   4. Returning the cluster medoids (the actual real colour closest to
//      each cluster centre — not a synthesised average that doesn't
//      exist on the page).
//
// Pure functions, no dependencies. ~150 LOC.

function hexToRgb(hex) {
  const s = String(hex || '').trim().replace(/^#/, '');
  const full = s.length === 3 ? s.split('').map((c) => c + c).join('') : s.slice(0, 6);
  if (!/^[0-9a-f]{6}$/i.test(full)) return null;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

// sRGB → linear → XYZ → CIELAB (D65)
function rgbToLab(rgb) {
  const srgb = [rgb.r, rgb.g, rgb.b].map((v) => v / 255);
  const lin = srgb.map((v) => (v > 0.04045 ? ((v + 0.055) / 1.055) ** 2.4 : v / 12.92));
  const [r, g, b] = lin;
  const x = (r * 0.4124564 + g * 0.3575761 + b * 0.1804375) / 0.95047;
  const y = (r * 0.2126729 + g * 0.7151522 + b * 0.0721750) / 1.00000;
  const z = (r * 0.0193339 + g * 0.1191920 + b * 0.9503041) / 1.08883;
  const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  const fx = f(x), fy = f(y), fz = f(z);
  return {
    L: 116 * fy - 16,
    a: 500 * (fx - fy),
    b: 200 * (fy - fz),
  };
}

function dist2(p, q) {
  const dL = p.L - q.L, da = p.a - q.a, db = p.b - q.b;
  return dL * dL + da * da + db * db;
}

function weightedCentroid(members) {
  let wL = 0, wa = 0, wb = 0, w = 0;
  for (const m of members) {
    w  += m.weight;
    wL += m.lab.L * m.weight;
    wa += m.lab.a * m.weight;
    wb += m.lab.b * m.weight;
  }
  return w > 0 ? { L: wL / w, a: wa / w, b: wb / w } : members[0]?.lab || { L: 0, a: 0, b: 0 };
}

function pickFurthestSeeds(points, k) {
  if (points.length <= k) return points.map((p) => p.lab);
  // Seed with the most-used colour, then pick the k-1 colours furthest from
  // any already-seeded colour (max-min). Deterministic, no randomness, so
  // the same input gives the same output every run.
  const seeds = [];
  const sorted = [...points].sort((x, y) => y.weight - x.weight);
  seeds.push(sorted[0].lab);
  while (seeds.length < k) {
    let best = null, bestDist = -1;
    for (const p of points) {
      const minD = seeds.reduce((m, s) => Math.min(m, dist2(p.lab, s)), Infinity);
      const score = minD * Math.log1p(p.weight); // bias toward heavy + far
      if (score > bestDist) { bestDist = score; best = p; }
    }
    if (!best) break;
    seeds.push(best.lab);
  }
  return seeds;
}

function kmeans(points, k, { maxIter = 60 } = {}) {
  if (points.length === 0) return [];
  if (points.length <= k) return points.map((p) => [p]);

  let centres = pickFurthestSeeds(points, k);
  let clusters = Array.from({ length: k }, () => []);

  for (let iter = 0; iter < maxIter; iter++) {
    clusters = Array.from({ length: k }, () => []);
    for (const p of points) {
      let bestI = 0, bestD = Infinity;
      for (let i = 0; i < centres.length; i++) {
        const d = dist2(p.lab, centres[i]);
        if (d < bestD) { bestD = d; bestI = i; }
      }
      clusters[bestI].push(p);
    }
    const newCentres = clusters.map((members, i) =>
      members.length > 0 ? weightedCentroid(members) : centres[i]
    );
    // converged?
    const moved = newCentres.reduce((sum, c, i) => sum + dist2(c, centres[i]), 0);
    centres = newCentres;
    if (moved < 0.5) break;
  }
  return clusters.filter((c) => c.length > 0);
}

/**
 * @param {Array<{ hex: string, count?: number }>} input
 * @param {number} k target palette size
 */
export function compressPalette(input, k = 12) {
  const points = [];
  for (const c of input || []) {
    const rgb = hexToRgb(c.hex);
    if (!rgb) continue;
    points.push({
      hex: c.hex,
      rgb,
      lab: rgbToLab(rgb),
      weight: Math.max(1, c.count || c.weight || 1),
      original: c,
    });
  }
  if (points.length === 0) return [];
  if (points.length <= k) return points.map((p) => ({ ...p.original, hex: p.hex, count: p.weight, clusterSize: 1 }));

  const clusters = kmeans(points, k);
  // For each cluster, return the medoid — the real colour in the
  // cluster closest to the centroid. Never invent a hex that wasn't
  // on the page.
  return clusters
    .map((members) => {
      const centre = weightedCentroid(members);
      let best = members[0], bestD = Infinity;
      for (const m of members) {
        const d = dist2(m.lab, centre);
        if (d < bestD) { bestD = d; best = m; }
      }
      const totalCount = members.reduce((s, m) => s + m.weight, 0);
      return {
        ...best.original,
        hex: best.hex,
        count: totalCount,
        clusterSize: members.length,
        clusterMembers: members.map((m) => m.hex),
      };
    })
    .sort((x, y) => (y.count || 0) - (x.count || 0));
}
