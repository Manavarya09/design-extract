// The Design Index stores measurements only: token values and counts. No
// URLs, logos, screenshots or font files ever reach an entry.

import { scoreGeneric } from '../../src/slop/index.js';
import { toHex } from '../../src/slop/color.js';

const FILEISH = /\.(svg|png|jpe?g|webp|gif|avif|woff2?|ttf|otf|eot)\b|https?:|data:|\/\//i;
const clean = (s) => (typeof s === 'string' && s && !FILEISH.test(s) ? s.trim().slice(0, 60) : null);

export function toIndexEntry(design, { domain, readAt }) {
  const c = design.colors || {};
  const neutrals = [...new Set((c.neutrals || []).map(toHex).filter(Boolean))].slice(0, 8);
  const fonts = [...new Set((design.typography?.families || []).map((f) => clean(f.name)).filter(Boolean))].slice(0, 4);
  const typeScale = [...new Set((design.typography?.scale || []).map((s) => Math.round(s.size)).filter((n) => n > 0))]
    .sort((a, b) => b - a).slice(0, 12);
  const radii = [...new Set((design.borders?.radii || []).map((r) => Math.round(r.value)).filter((n) => Number.isFinite(n) && n >= 0))]
    .sort((a, b) => a - b).slice(0, 8);
  const slop = scoreGeneric(design);
  return {
    domain,
    readAt,
    colors: { primary: toHex(c.primary), secondary: toHex(c.secondary), accent: toHex(c.accent), neutrals },
    fonts,
    typeScale,
    spacingBase: Number.isFinite(design.spacing?.base) ? design.spacing.base : null,
    radii,
    shadows: (design.shadows?.values || []).length,
    slop: { score: slop.score, band: slop.band },
    a11y: { failingPairs: (design.accessibility?.failingPairs || []).length },
  };
}

// Groups of `User-agent` lines followed by rules, the way crawlers read them.
function groups(text) {
  const out = [];
  let current = null;
  let lastWasAgent = false;
  for (const raw of String(text || '').split(/\r?\n/)) {
    const line = raw.replace(/#.*/, '').trim();
    const m = line.match(/^([a-z-]+)\s*:\s*(.*)$/i);
    if (!m) continue;
    const key = m[1].toLowerCase();
    const value = m[2].trim();
    if (key === 'user-agent') {
      if (!lastWasAgent) { current = { agents: [], rules: [] }; out.push(current); }
      current.agents.push(value.toLowerCase());
      lastWasAgent = true;
    } else if (current && (key === 'allow' || key === 'disallow')) {
      current.rules.push({ allow: key === 'allow', path: value });
      lastWasAgent = false;
    } else {
      lastWasAgent = false;
    }
  }
  return out;
}

function matches(pattern, path) {
  if (!pattern) return false;
  const re = new RegExp('^' + pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\\\$$/, '$'));
  return re.test(path);
}

// May `agent` fetch `path`? Most specific agent group wins, then longest rule.
export function robotsAllows(text, agent = 'designlang', path = '/') {
  const all = groups(text);
  const mine = all.filter((g) => g.agents.some((a) => a !== '*' && agent.toLowerCase().includes(a)));
  const chosen = mine.length ? mine : all.filter((g) => g.agents.includes('*'));
  const rules = chosen.flatMap((g) => g.rules).filter((r) => r.path && matches(r.path, path));
  if (!rules.length) return true;
  rules.sort((a, b) => b.path.length - a.path.length || (a.allow ? -1 : 1));
  return rules[0].allow;
}

export function allowedToIndex({ robotsTxt, aiTxt, tdmrep, domain, optout = [] }) {
  const d = String(domain || '').toLowerCase().replace(/^www\./, '');
  if (optout.map((o) => o.toLowerCase().replace(/^www\./, '')).includes(d)) return { ok: false, reason: 'opted out' };
  if (!robotsAllows(robotsTxt, 'designlang')) return { ok: false, reason: 'robots.txt disallows' };
  if (aiTxt && !robotsAllows(aiTxt, 'designlang')) return { ok: false, reason: 'ai.txt disallows' };
  const reservations = Array.isArray(tdmrep) ? tdmrep : tdmrep ? [tdmrep] : [];
  if (reservations.some((r) => Number(r?.['tdm-reservation']) === 1 && (!r.location || r.location === '/' || r.location === '*'))) {
    return { ok: false, reason: 'TDMRep reserves text and data mining' };
  }
  return { ok: true };
}
