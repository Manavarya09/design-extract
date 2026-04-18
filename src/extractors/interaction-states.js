// Structured catalog of transition styles captured by the Tier-2 interaction
// pass — hover deltas, modal appearance, menu styling.

function diffStyles(before, after) {
  const diff = {};
  if (!before || !after) return diff;
  for (const k of Object.keys(after)) {
    if (before[k] !== after[k]) {
      diff[k] = { from: before[k], to: after[k] };
    }
  }
  return diff;
}

export function extractInteractionStates(interactState) {
  if (!interactState || typeof interactState !== 'object') {
    return {
      scrollSettled: false,
      menusOpened: 0,
      hover: { sampled: 0, changed: 0, deltas: [] },
      accordionsOpened: 0,
      modals: [],
    };
  }

  const deltas = [];
  const samples = Array.isArray(interactState.hoverSamples) ? interactState.hoverSamples : [];
  for (const s of samples) {
    const d = diffStyles(s.before, s.after);
    if (Object.keys(d).length > 0) {
      deltas.push({ selector: s.selector, changes: d });
    }
  }

  const modals = Array.isArray(interactState.modals) ? interactState.modals.map(m => ({
    trigger: m.trigger || '',
    bg: m.snapshot?.bg || '',
    color: m.snapshot?.color || '',
    boxShadow: m.snapshot?.boxShadow || '',
    borderRadius: m.snapshot?.borderRadius || '',
    width: m.snapshot?.width || 0,
    height: m.snapshot?.height || 0,
    role: m.snapshot?.role || '',
  })) : [];

  return {
    scrollSettled: !!interactState.scrollSettled,
    menusOpened: interactState.menusOpened || 0,
    hover: {
      sampled: samples.length,
      changed: deltas.length,
      deltas,
    },
    accordionsOpened: interactState.accordionsOpened || 0,
    modals,
  };
}
