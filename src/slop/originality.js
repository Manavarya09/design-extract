// Originality: how far a design sits from named competitors in the Design
// Index (and whether it shows the generic AI look). Distance blends palette,
// type, scale and shape, each 0..1:
//   palette  best one-to-one match of primary/secondary/accent by ΔE (CIE76)
//   fonts    1 - Jaccard overlap of family names
//   scale    mean gap between the largest type sizes, as a ratio
//   shape    gap between typical corner radii
// A design identical to a competitor is 0; 0.5 or more reads as clearly its own.

import { deltaE, toHex } from './color.js';

const WEIGHTS = { palette: 0.45, fonts: 0.3, scale: 0.15, shape: 0.1 };
const FAR = 0.5;

const norm = (f) => String(f || '').toLowerCase().replace(/["']/g, '').replace(/\b(variable|var|vf)\b/g, '').replace(/[\s_-]+/g, '');

function brandColors(e) {
  return ['primary', 'secondary', 'accent'].map((k) => toHex(e.colors?.[k])).filter(Boolean);
}

// Small sets (≤3 each), so trying every pairing is the exact Hungarian answer.
function paletteDistance(a, b) {
  const A = brandColors(a);
  const B = brandColors(b);
  if (!A.length || !B.length) return 0.5;
  const [small, big] = A.length <= B.length ? [A, B] : [B, A];
  let best = Infinity;
  const perms = (arr, k) => (k === 0 ? [[]] : arr.flatMap((x, i) => perms([...arr.slice(0, i), ...arr.slice(i + 1)], k - 1).map((p) => [x, ...p])));
  for (const p of perms(big, small.length)) {
    const cost = small.reduce((n, c, i) => n + Math.min(1, deltaE(c, p[i]) / 50), 0) / small.length;
    best = Math.min(best, cost);
  }
  // Unmatched extra colours count as fully different.
  return (best * small.length + (big.length - small.length)) / big.length;
}

function fontDistance(a, b) {
  const A = new Set((a.fonts || []).map(norm));
  const B = new Set((b.fonts || []).map(norm));
  if (!A.size || !B.size) return 0.5;
  const inter = [...A].filter((x) => B.has(x)).length;
  return 1 - inter / new Set([...A, ...B]).size;
}

function scaleDistance(a, b) {
  const A = (a.typeScale || []).slice(0, 4);
  const B = (b.typeScale || []).slice(0, 4);
  const n = Math.min(A.length, B.length);
  if (!n) return 0.5;
  let sum = 0;
  for (let i = 0; i < n; i++) sum += Math.min(1, Math.abs(A[i] - B[i]) / Math.max(A[i], B[i]));
  return sum / n;
}

function typicalRadius(e) {
  const r = (e.radii || []).filter((x) => x < 999);
  return r.length ? r[Math.floor(r.length / 2)] : null;
}

function shapeDistance(a, b) {
  const x = typicalRadius(a);
  const y = typicalRadius(b);
  if (x == null || y == null) return 0.5;
  return Math.min(1, Math.abs(x - y) / 16);
}

export function entryDistance(a, b) {
  return WEIGHTS.palette * paletteDistance(a, b) + WEIGHTS.fonts * fontDistance(a, b) + WEIGHTS.scale * scaleDistance(a, b) + WEIGHTS.shape * shapeDistance(a, b);
}

export function scoreOriginality(entry, neighbours = []) {
  const closest = neighbours
    .filter((n) => n && n.domain !== entry.domain)
    .map((n) => ({ domain: n.domain, distance: Math.round(entryDistance(entry, n) * 1000) / 1000 }))
    .sort((x, y) => x.distance - y.distance);
  const nearest = closest.length ? closest[0].distance : FAR;
  return {
    score: Math.round(100 * Math.min(1, nearest / FAR)),
    closest,
    generic: entry.slop?.band || null,
  };
}
