import { describe, it } from 'node:test';
import assert from 'node:assert';

import { extractIconSystem } from '../src/extractors/icon-system.js';
import { extractBackgroundPatterns } from '../src/extractors/background-patterns.js';
import { extractStackIntel } from '../src/extractors/stack-intel.js';

describe('v10.4: icon system', () => {
  it('flags Lucide from 1.5 stroke + 24px grid + stroke-dominant', () => {
    const icons = Array.from({ length: 5 }).map(() => ({
      svg: '<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.5"><path/></svg>',
      viewBox: '0 0 24 24',
      stroke: 'currentColor',
      fill: 'none',
    }));
    const r = extractIconSystem(icons);
    assert.equal(r.library, 'lucide');
    assert.ok(r.confidence >= 0.7);
  });

  it('returns unknown on empty', () => {
    const r = extractIconSystem([]);
    assert.equal(r.library, 'unknown');
  });
});

describe('v10.4: background patterns', () => {
  it('flags gradient-mesh when multiple radial gradients stack', () => {
    const rawData = {
      light: {
        computedStyles: [
          { backgroundImage: 'radial-gradient(...), radial-gradient(...), linear-gradient(...)' },
          { backgroundImage: 'none' },
        ],
      },
    };
    const r = extractBackgroundPatterns(rawData);
    assert.ok(r.labels.includes('gradient-mesh'));
  });

  it('returns plain when no backgrounds', () => {
    const r = extractBackgroundPatterns({ light: { computedStyles: [{ backgroundImage: 'none' }] } });
    assert.ok(r.labels.includes('plain'));
  });
});

describe('v10.4: stack intel', () => {
  it('detects Shopify + GA + Optimizely', () => {
    const r = extractStackIntel({
      scripts: [
        'https://cdn.shopify.com/s/files/abc.js',
        'https://www.googletagmanager.com/gtag/js?id=G-X',
        'https://cdn.optimizely.com/js/abc.js',
      ],
      metas: [],
      classNameSample: [],
    });
    assert.ok(r.cms.includes('shopify'));
    assert.ok(r.analytics.includes('google-analytics'));
    assert.ok(r.experimentation.includes('optimizely'));
  });

  it('returns empties on clean sites', () => {
    const r = extractStackIntel({ scripts: [], metas: [], classNameSample: [] });
    assert.deepEqual(r.cms, []);
    assert.deepEqual(r.analytics, []);
  });
});
