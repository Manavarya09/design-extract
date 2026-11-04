// Pure scoring for the extraction benchmark. Kept apart from the runner so the
// numbers we publish are unit-tested, not just printed.

export { toHex, deltaE } from '../src/slop/color.js';
import { toHex, deltaE } from '../src/slop/color.js';

// ΔE ≤ 10 is "the same brand colour" (#0070f3 vs #0072f5 is under 1), while
// neighbouring hues on a brand's palette sit well above it.
export const COLOR_TOLERANCE = 10;

export function colorHit(predicted, truths, tolerance = COLOR_TOLERANCE) {
  const hex = toHex(predicted);
  if (!hex) return false;
  return truths.some((t) => {
    const truth = toHex(t);
    return truth != null && deltaE(hex, truth) <= tolerance;
  });
}

// "sohne-var" and "Söhne", "Inter Variable" and "Inter", "Mona Sans VF" and
// "Mona Sans" name the same family.
export function normalizeFont(name) {
  return String(name || '')
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/["']/g, '')
    .replace(/\b(variable|var|vf)\b/g, '')
    .replace(/[\s_-]+/g, '');
}

export function fontHit(predicted, truths) {
  const p = normalizeFont(predicted);
  if (!p) return false;
  return truths.some((t) => {
    const n = normalizeFont(t);
    return n.length > 0 && (p.includes(n) || n.includes(p));
  });
}

function mostUsed(entries, nameKey) {
  const counts = new Map();
  for (const e of entries) {
    const name = e?.[nameKey];
    if (name) counts.set(name, (counts.get(name) || 0) + (e.count || 1));
  }
  let best = null;
  for (const [name, count] of counts) if (!best || count > best[1]) best = [name, count];
  return best?.[0] ?? null;
}

// Both readers apply the same rule: the most used of the families each tool
// says sets body text, else its most used family overall. Neither tool is
// judged on its heading face.
export function readDesignlang(design) {
  const families = design?.typography?.families || [];
  // designlang marks a family used for both headings and body as "all".
  const body = families.filter((f) => f.usage === 'body' || f.usage === 'all');
  return {
    primary: toHex(design?.colors?.primary),
    font: mostUsed(body, 'name') ?? mostUsed(families, 'name'),
  };
}

export function readDembrandt(output) {
  const styles = output?.typography?.styles || [];
  const body = styles.filter((s) => s.context === 'body');
  return {
    primary: toHex(output?.colors?.semantic?.primary),
    font: mostUsed(body, 'family') ?? mostUsed(styles, 'family'),
  };
}

// A dimension with no ground truth (a monochrome brand, a system body font)
// scores null: not counted, rather than counted against either tool.
export function scoreSite(truth, predicted) {
  return {
    color: truth.primary?.length ? colorHit(predicted?.primary, truth.primary) : null,
    font: truth.font?.length ? fontHit(predicted?.font, truth.font) : null,
  };
}

function median(nums) {
  if (!nums.length) return null;
  const s = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

// rows: [{ site, ok, seconds, score: { color, font } }] for one tool. A failed
// run keeps its false scores, so it counts as a miss wherever truth exists.
export function summarize(rows) {
  const ran = rows.filter((r) => r.ok);
  return {
    sites: rows.length,
    failures: rows.length - ran.length,
    colorSites: rows.filter((r) => r.score.color !== null).length,
    colorHits: rows.filter((r) => r.score.color === true).length,
    fontSites: rows.filter((r) => r.score.font !== null).length,
    fontHits: rows.filter((r) => r.score.font === true).length,
    medianSeconds: median(ran.map((r) => r.seconds)),
  };
}
