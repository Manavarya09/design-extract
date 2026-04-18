import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { extractInteractionStates } from '../src/extractors/interaction-states.js';

describe('extractInteractionStates', () => {
  it('returns a default shape on empty input', () => {
    const r = extractInteractionStates(null);
    assert.equal(r.scrollSettled, false);
    assert.equal(r.menusOpened, 0);
    assert.deepEqual(r.modals, []);
    assert.equal(r.hover.sampled, 0);
  });

  it('computes hover deltas between before/after style snapshots', () => {
    const r = extractInteractionStates({
      scrollSettled: true,
      menusOpened: 2,
      hoverSamples: [
        {
          selector: 'button:nth-of-type(1)',
          before: { color: 'rgb(0,0,0)', backgroundColor: 'rgb(255,255,255)' },
          after: { color: 'rgb(0,0,0)', backgroundColor: 'rgb(240,240,240)' },
        },
        {
          selector: 'a:nth-of-type(1)',
          before: { color: 'rgb(0,0,0)' },
          after: { color: 'rgb(0,0,0)' },
        },
      ],
      accordionsOpened: 3,
      modals: [],
    });
    assert.equal(r.hover.sampled, 2);
    assert.equal(r.hover.changed, 1);
    assert.equal(r.hover.deltas[0].changes.backgroundColor.from, 'rgb(255,255,255)');
    assert.equal(r.hover.deltas[0].changes.backgroundColor.to, 'rgb(240,240,240)');
    assert.equal(r.accordionsOpened, 3);
    assert.equal(r.menusOpened, 2);
    assert.equal(r.scrollSettled, true);
  });

  it('normalizes modal snapshots', () => {
    const r = extractInteractionStates({
      modals: [
        { trigger: 'Sign in', snapshot: { tag: 'dialog', role: 'dialog', bg: 'rgb(255,255,255)', color: 'rgb(17,17,17)', boxShadow: '0 10px 30px rgba(0,0,0,.2)', borderRadius: '12px', width: 400, height: 300 } },
      ],
    });
    assert.equal(r.modals.length, 1);
    assert.equal(r.modals[0].trigger, 'Sign in');
    assert.equal(r.modals[0].bg, 'rgb(255,255,255)');
    assert.equal(r.modals[0].width, 400);
  });

  it('handles missing snapshot fields gracefully', () => {
    const r = extractInteractionStates({
      hoverSamples: [{ selector: 'x', before: null, after: null }],
      modals: [{ trigger: 'Menu' }],
    });
    assert.equal(r.hover.changed, 0);
    assert.equal(r.modals[0].bg, '');
  });
});
