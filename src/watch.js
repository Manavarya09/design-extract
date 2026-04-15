// Watch command — monitor a site for design changes on a schedule

import { extractDesignLanguage } from './index.js';
import { saveSnapshot, getHistory } from './history.js';

export async function watchSite(url, options = {}) {
  const { intervalMs = 3600000 } = options; // default 1 hour

  const design = await extractDesignLanguage(url);
  const history = getHistory(url);
  const previous = history.length > 0 ? history[history.length - 1] : null;

  const snapshot = saveSnapshot(design);
  const changes = [];

  if (previous) {
    if (previous.colors.primary !== design.colors.primary?.hex) {
      changes.push({ type: 'color', what: 'Primary color', from: previous.colors.primary, to: design.colors.primary?.hex });
    }
    if (previous.colors.secondary !== design.colors.secondary?.hex) {
      changes.push({ type: 'color', what: 'Secondary color', from: previous.colors.secondary, to: design.colors.secondary?.hex });
    }
    if (previous.colors.count !== design.colors.all.length) {
      changes.push({ type: 'color', what: 'Color count', from: String(previous.colors.count), to: String(design.colors.all.length) });
    }
    if (previous.typography.families.join(',') !== design.typography.families.map(f => f.name).join(',')) {
      changes.push({ type: 'typography', what: 'Font families', from: previous.typography.families.join(', '), to: design.typography.families.map(f => f.name).join(', ') });
    }
    if (previous.a11yScore !== design.accessibility?.score) {
      changes.push({ type: 'accessibility', what: 'A11y score', from: `${previous.a11yScore}%`, to: `${design.accessibility?.score}%` });
    }
    if (previous.spacing.base !== design.spacing.base) {
      changes.push({ type: 'spacing', what: 'Spacing base', from: `${previous.spacing.base}px`, to: `${design.spacing.base}px` });
    }
    if (Math.abs(previous.cssVarCount - Object.values(design.variables).reduce((s, v) => s + Object.keys(v).length, 0)) > 10) {
      const newCount = Object.values(design.variables).reduce((s, v) => s + Object.keys(v).length, 0);
      changes.push({ type: 'tokens', what: 'CSS var count', from: String(previous.cssVarCount), to: String(newCount) });
    }
  }

  return {
    changes,
    isFirstRun: !previous,
    snapshot,
    design,
  };
}
