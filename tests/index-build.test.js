import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { toIndexEntry, allowedToIndex, robotsAllows } from '../scripts/index/schema.js';

const design = JSON.parse(readFileSync(new URL('./fixtures/slop/handmade.json', import.meta.url), 'utf8'));

test('an index entry holds measurements only', () => {
  const e = toIndexEntry(design, { domain: 'fernhill.example', readAt: '2026-11-04' });
  assert.deepEqual(Object.keys(e).sort(), ['a11y', 'colors', 'domain', 'fonts', 'radii', 'readAt', 'shadows', 'slop', 'spacingBase', 'typeScale']);
  assert.deepEqual(Object.keys(e.colors).sort(), ['accent', 'neutrals', 'primary', 'secondary']);
  assert.ok(e.colors.neutrals.length <= 8);
  assert.ok(e.fonts.length <= 4);
  assert.equal(typeof e.shadows, 'number');
  assert.ok(['distinct', 'mixed', 'generic'].includes(e.slop.band));
  assert.equal(typeof e.a11y.failingPairs, 'number');
  const flat = JSON.stringify(e);
  assert.ok(!/http|data:|\.(svg|png|jpe?g|webp|gif|woff2?|ttf|otf)\b/i.test(flat), flat);
});

test('font names that look like file names are dropped', () => {
  const d = { ...design, typography: { families: [{ name: 'brand.woff2' }, { name: 'Georgia' }] } };
  assert.deepEqual(toIndexEntry(d, { domain: 'x.example', readAt: '2026-11-04' }).fonts, ['Georgia']);
});

test('robots, ai.txt, TDMRep and the opt-out list are honoured', () => {
  const base = { domain: 'a.example', robotsTxt: '', aiTxt: '', tdmrep: null, optout: [] };
  assert.equal(allowedToIndex(base).ok, true);
  assert.equal(allowedToIndex({ ...base, robotsTxt: 'User-agent: *\nDisallow: /' }).ok, false);
  assert.equal(allowedToIndex({ ...base, robotsTxt: 'User-agent: designlang\nDisallow: /' }).ok, false);
  assert.equal(allowedToIndex({ ...base, robotsTxt: 'User-agent: Googlebot\nDisallow: /' }).ok, true);
  assert.equal(allowedToIndex({ ...base, robotsTxt: 'User-agent: *\nDisallow: /admin' }).ok, true);
  assert.equal(allowedToIndex({ ...base, aiTxt: 'User-Agent: *\nDisallow: /' }).ok, false);
  assert.equal(allowedToIndex({ ...base, tdmrep: { 'tdm-reservation': 1 } }).ok, false);
  assert.equal(allowedToIndex({ ...base, tdmrep: [{ location: '/', 'tdm-reservation': 1 }] }).ok, false);
  const r = allowedToIndex({ ...base, optout: ['a.example'] });
  assert.equal(r.ok, false);
  assert.match(r.reason, /opt/);
});

test('robotsAllows reads the most specific group', () => {
  assert.equal(robotsAllows('User-agent: *\nDisallow: /\n\nUser-agent: designlang\nAllow: /', 'designlang'), true);
  assert.equal(robotsAllows('User-agent: *\nAllow: /$\nDisallow: /', 'designlang'), true);
});
