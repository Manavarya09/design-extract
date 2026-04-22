import { describe, it } from 'node:test';
import assert from 'node:assert';

import { captureComponentScreenshotsV10 } from '../src/extractors/component-screenshots.js';

describe('v10.1: component screenshots module', () => {
  it('exports the capture function', () => {
    assert.equal(typeof captureComponentScreenshotsV10, 'function');
  });

  it('accepts two arguments (url, outDir) — no throw on inspection', () => {
    assert.equal(captureComponentScreenshotsV10.length, 2);
  });
});
