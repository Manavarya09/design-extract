// Verify a UI against a brand: render it at phone, tablet and desktop widths
// (and in dark mode when the page has one), read each with designlang, and
// list where it drifts from the brand and which generic AI tells it shows.
// Local Chromium, so localhost and dev servers work. The hosted version adds
// fix suggestions on top of this report.

import { scoreGeneric, scoreOnBrand, unreadable } from '../slop/index.js';

export const VIEWPORTS = [390, 768, 1280];
const ERROR_TOKENS = new Set(['color.primary', 'font.family']);

export async function measureUi(url, { viewports = VIEWPORTS, dark = true, extract } = {}) {
  const read = extract || (async (u, o) => (await import('../index.js')).extractDesignLanguage(u, o));
  const shots = [];
  for (const width of viewports) {
    const design = await read(url, { width, height: width < 768 ? 844 : 900, ...(dark && { dark: true }) });
    shots.push({ viewport: width, scheme: 'light', state: 'default', design });
    // Only a page that really changes in dark mode gets a dark pass.
    const hexOf = (c) => (c && typeof c === 'object' ? c.hex : c) || null;
    const darkBg = hexOf(design.darkMode?.colors?.backgrounds?.[0]);
    const lightBg = hexOf(design.colors?.backgrounds?.[0]);
    if (dark && design.darkMode?.colors?.primary && darkBg && darkBg !== lightBg) {
      shots.push({ viewport: width, scheme: 'dark', state: 'default', design: { ...design, colors: design.darkMode.colors } });
    }
  }
  return { shots };
}

// Which component carries a radius, so an issue can say "button" not "radius".
function radiusOwner(design, px) {
  const comps = design.components || {};
  for (const [kind, c] of Object.entries(comps)) {
    const r = parseFloat(c?.baseStyle?.borderRadius);
    if (Number.isFinite(r) && Math.round(r) === Math.round(parseFloat(px))) return kind.replace(/s$/, '');
  }
  return 'element';
}

export function verifyReport({ shots, brand }) {
  // A dev-server error overlay, a 500 or a login redirect is not the screen
  // that was built; drift measured on it would send the editor the wrong way.
  for (const shot of shots) {
    const blocked = unreadable(shot.design);
    if (blocked) {
      return { pass: false, onBrand: null, generic: null, tells: [], issues: [], unreadable: { reason: blocked.reason, viewport: shot.viewport } };
    }
  }
  const byKey = new Map();
  const onBrandScores = [];
  for (const shot of shots) {
    const { score, diffs } = scoreOnBrand(shot.design, brand);
    onBrandScores.push(score);
    for (const d of diffs) {
      const where = d.token === 'radius' ? radiusOwner(shot.design, d.actual) : d.token.split('.')[0] === 'color' ? `${d.token.split('.')[1]} colour` : d.token;
      // Fonts and radii don't change with the colour scheme: report them once.
      const key = `${d.token}|${d.expected}|${d.actual}|${d.token.startsWith('color.') ? shot.scheme : ''}`;
      const seen = byKey.get(key);
      if (seen) {
        if (!seen.viewports.includes(shot.viewport)) seen.viewports.push(shot.viewport);
        continue;
      }
      byKey.set(key, {
        token: d.token,
        where,
        viewport: shot.viewport,
        viewports: [shot.viewport],
        scheme: shot.scheme,
        state: shot.state,
        expected: d.expected,
        actual: d.actual,
        severity: ERROR_TOKENS.has(d.token) ? 'error' : 'warn',
      });
    }
  }
  const issues = [...byKey.values()].sort((a, b) => (a.severity === b.severity ? 0 : a.severity === 'error' ? -1 : 1));
  const onBrand = onBrandScores.length ? Math.min(...onBrandScores) : 0;
  const lead = shots.find((s) => s.scheme === 'light' && s.viewport === Math.max(...shots.map((x) => x.viewport))) || shots[0];
  const generic = lead ? scoreGeneric(lead.design) : { score: 0, band: 'distinct', flags: [] };
  return {
    pass: onBrand >= 85 && !issues.some((i) => i.severity === 'error'),
    onBrand,
    generic: generic.score,
    genericBand: generic.band,
    tells: generic.flags.map((f) => ({ id: f.id, label: f.label, evidence: f.evidence.slice(0, 2) })),
    issues,
  };
}

// Only what the scores read, for sending a measurement to the hosted check.
export function slimDesign(d) {
  return {
    meta: { title: d.meta?.title, url: d.meta?.url },
    colors: { primary: d.colors?.primary, secondary: d.colors?.secondary, accent: d.colors?.accent, all: (d.colors?.all || []).slice(0, 24).map((c) => ({ hex: c.hex, count: c.count })) },
    typography: { families: (d.typography?.families || []).map((f) => ({ name: f.name, usage: f.usage })) },
    borders: { radii: d.borders?.radii || [] },
    spacing: { base: d.spacing?.base ?? null },
    shadows: { values: (d.shadows?.values || []).slice(0, 12) },
    gradients: { gradients: (d.gradients?.gradients || []).slice(0, 8) },
    sectionRoles: { sections: (d.sectionRoles?.sections || []).slice(0, 12).map(({ index, role, heading, cardCount, slots }) => ({ index, role, heading, cardCount, slots: slots ? { lede: slots.lede, subheadings: slots.subheadings } : undefined })) },
    voice: { sampleHeadings: (d.voice?.sampleHeadings || []).slice(0, 12) },
    layout: { gridColumns: d.layout?.gridColumns || [] },
    surface: d.surface || null,
    components: Object.fromEntries(Object.entries(d.components || {}).map(([k, c]) => [k, { baseStyle: { borderRadius: c?.baseStyle?.borderRadius } }])),
  };
}

// The brand-file route of verify_ui: measure here, then let the hosted check
// add fix suggestions (paid plans) and record the run. Falls back to the local
// report when the hosted check can't be reached.
export async function verifyWithBrandFile({ shots, brandId, token, brand, api = 'https://api.designlang.app', fetchImpl = fetch }) {
  const local = verifyReport({ shots, brand });
  try {
    const res = await fetchImpl(`${api.replace(/\/$/, '')}/api/verify`, {
      method: 'POST',
      headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
      body: JSON.stringify({ brandId, shots: shots.map((s) => ({ viewport: s.viewport, scheme: s.scheme, state: s.state, design: slimDesign(s.design) })) }),
    });
    const body = await res.json().catch(() => null);
    if (res.status === 402) return { ...local, hosted: false, notice: body?.error || 'Your free hosted checks for this month are used up.' };
    if (!res.ok || !body?.report) return { ...local, hosted: false };
    return { ...body.report, hosted: true };
  } catch {
    return { ...local, hosted: false };
  }
}
