// Two scores over a designlang extraction: how generic it looks (the known AI
// tells) and, given a brand, how close it is to that brand's tokens.

import { DETECTORS } from './detectors.js';
import { toHex, deltaE } from './color.js';

export const BANDS = { distinct: [0, 34], mixed: [35, 64], generic: [65, 100] };

export function bandOf(score) {
  if (score >= BANDS.generic[0]) return 'generic';
  if (score >= BANDS.mixed[0]) return 'mixed';
  return 'distinct';
}

export function scoreGeneric(design, detectors = DETECTORS) {
  const flags = [];
  let hitWeight = 0;
  const total = detectors.reduce((n, d) => n + d.weight, 0);
  for (const d of detectors) {
    let result;
    try { result = d.test(design || {}); } catch { result = { hit: false, evidence: [] }; }
    if (result.hit && result.evidence.length) {
      hitWeight += d.weight;
      flags.push({ id: d.id, label: d.label, why: d.why, weight: d.weight, evidence: result.evidence });
    }
  }
  const score = total ? Math.round((100 * hitWeight) / total) : 0;
  return { score, band: bandOf(score), flags };
}

function normFont(name) {
  return String(name || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/["']/g, '').replace(/\b(variable|var|vf)\b/g, '').replace(/[\s_-]+/g, '');
}

function colorPart(token, expected, actual) {
  const e = toHex(expected);
  if (!e) return null;
  const a = toHex(actual);
  if (!a) return { fit: 0, diff: { token, expected: e, actual: null } };
  const d = deltaE(e, a);
  const fit = Math.max(0, 1 - d / 30);
  return { fit, diff: d > 3 ? { token, expected: e, actual: a, deltaE: Math.round(d * 10) / 10 } : null };
}

// brand: { colors: { primary, secondary?, accent?, neutrals[] }, fonts[], radii[], spacingBase? }
export function scoreOnBrand(design, brand) {
  const parts = [];
  const diffs = [];
  const add = (weight, part) => {
    if (!part) return;
    parts.push({ weight, fit: part.fit });
    if (part.diff) diffs.push(part.diff);
  };
  add(40, colorPart('color.primary', brand.colors?.primary, design.colors?.primary));
  for (const role of ['secondary', 'accent']) {
    if (brand.colors?.[role]) {
      // A brand accent can sit in any of the page's chosen colours.
      const candidates = ['primary', 'secondary', 'accent'].map((r) => design.colors?.[r]).filter(Boolean);
      const best = candidates.map((c) => colorPart(`color.${role}`, brand.colors[role], c)).sort((a, b) => b.fit - a.fit)[0]
        || colorPart(`color.${role}`, brand.colors[role], null);
      add(10, best);
    }
  }
  if (brand.fonts?.length) {
    const want = brand.fonts.map(normFont);
    const got = (design.typography?.families || []).filter((f) => f.usage !== 'mono').map((f) => f.name);
    const off = got.filter((g) => !want.includes(normFont(g)));
    const fit = got.length ? (got.length - off.length) / got.length : 0;
    parts.push({ weight: 30, fit });
    if (off.length || !got.length) diffs.push({ token: 'font.family', expected: brand.fonts.join(', '), actual: off.join(', ') || null });
  }
  if (brand.radii?.length) {
    const used = (design.borders?.radii || []).filter((r) => r.value > 0 && r.value < 100);
    if (used.length) {
      let fitSum = 0;
      let n = 0;
      for (const r of used) {
        const nearest = brand.radii.reduce((a, b) => (Math.abs(b - r.value) < Math.abs(a - r.value) ? b : a));
        const gap = Math.abs(nearest - r.value);
        fitSum += Math.max(0, 1 - gap / 8) * (r.count || 1);
        n += r.count || 1;
        if (gap > 2) diffs.push({ token: 'radius', expected: `${nearest}px`, actual: `${r.value}px` });
      }
      parts.push({ weight: 15, fit: fitSum / n });
    } else {
      parts.push({ weight: 15, fit: 1 });
    }
  }
  if (brand.spacingBase && design.spacing?.base) {
    const gap = Math.abs(brand.spacingBase - design.spacing.base);
    parts.push({ weight: 5, fit: gap === 0 ? 1 : gap <= 1 ? 0.7 : 0 });
    if (gap > 1) diffs.push({ token: 'spacing.base', expected: `${brand.spacingBase}px`, actual: `${design.spacing.base}px` });
  }
  const totalWeight = parts.reduce((n, p) => n + p.weight, 0);
  const score = totalWeight ? Math.round((100 * parts.reduce((n, p) => n + p.weight * p.fit, 0)) / totalWeight) : 0;
  return { score, diffs };
}

const ERROR_TEXT = /\b(403|404|429|500|502|503)\b|access denied|forbidden|page not found|just a moment|verify you are (a )?human|attention required|are you a robot|checking your browser|captcha|request blocked|site can.t be reached/i;
const LOGIN_TEXT = /^(sign in|log in|login|sign into)\b|sign in to continue|log in to continue|please (sign|log) in/i;
const CONSENT_TEXT = /before you continue|we value your privacy|cookie (consent|settings|preferences)|your privacy choices|consent to cookies/i;

export function unreadable(design) {
  if (!design) return { reason: 'blank' };
  const meta = design.meta || {};
  if (Number(meta.status) >= 400) return { reason: 'error-page' };
  const title = String(meta.title || '').trim();
  const heads = (design.voice?.sampleHeadings || []).map(String);
  const few = heads.length <= 2;
  const firstHead = heads[0] || '';
  if (ERROR_TEXT.test(title) || (few && ERROR_TEXT.test(firstHead))) return { reason: 'error-page' };
  if (LOGIN_TEXT.test(title) || (few && LOGIN_TEXT.test(firstHead))) return { reason: 'login-wall' };
  if (CONSENT_TEXT.test(title) || (few && CONSENT_TEXT.test(firstHead))) return { reason: 'consent-wall' };
  const colors = design.colors?.all?.length || 0;
  const hasText = heads.length > 0 || (design.typography?.families || []).length > 0;
  if (colors < 3 && !hasText) return { reason: 'blank' };
  return null;
}
