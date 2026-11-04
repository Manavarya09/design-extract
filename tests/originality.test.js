import { test } from 'node:test';
import assert from 'node:assert/strict';
import { scoreOriginality, entryDistance } from '../src/slop/originality.js';

const entry = (domain, primary, accent, fonts, typeScale, radii, band = 'distinct') => ({
  domain, colors: { primary, secondary: null, accent, neutrals: [] }, fonts, typeScale, radii, spacingBase: 8, slop: { score: 10, band },
});

const mine = entry('fernwood.example', '#2f5d3a', '#e2683c', ['Fraunces', 'Work Sans'], [64, 32, 20, 16], [4, 10]);
const twin = entry('copycat.example', '#2f5d3a', '#e2683c', ['Fraunces', 'Work Sans'], [64, 32, 20, 16], [4, 10]);
const far1 = entry('neon.example', '#ff00aa', '#00e5ff', ['Space Grotesk'], [96, 48, 18], [24]);
const far2 = entry('corp.example', '#0047ab', '#ffcc00', ['Helvetica Neue'], [40, 24, 14], [0]);

test('an entry identical to a competitor scores under 15 and names it', () => {
  const r = scoreOriginality(mine, [far1, twin, far2]);
  assert.ok(r.score < 15, String(r.score));
  assert.equal(r.closest[0].domain, 'copycat.example');
  assert.equal(r.generic, 'distinct');
});

test('an entry far from every competitor scores over 70', () => {
  const r = scoreOriginality(mine, [far1, far2]);
  assert.ok(r.score > 70, String(r.score));
  assert.equal(r.closest.length, 2);
  assert.ok(r.closest[0].distance <= r.closest[1].distance);
});

test('distance is symmetric and zero for the same entry', () => {
  assert.equal(entryDistance(mine, twin), 0);
  assert.equal(Math.round(entryDistance(mine, far1) * 1000), Math.round(entryDistance(far1, mine) * 1000));
});

test('no competitors means nothing to be close to', () => {
  const r = scoreOriginality(mine, []);
  assert.equal(r.score, 100);
  assert.deepEqual(r.closest, []);
});
