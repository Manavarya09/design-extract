import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { scoreGeneric, scoreOnBrand, unreadable, DETECTORS, BANDS } from '../src/slop/index.js';

const load = (name) => JSON.parse(readFileSync(new URL(`./fixtures/slop/${name}.json`, import.meta.url), 'utf8'));
const genericAi = load('generic-ai');
const handmade = load('handmade');
const errorPage = load('error-page');

test('detector ids are the published set', () => {
  assert.deepEqual(DETECTORS.map((d) => d.id).sort(), [
    'centered-everything', 'default-face-only', 'default-palette', 'emoji-icons', 'glow-shadows',
    'hero-three-cards', 'indigo-gradient', 'left-border-accent', 'stock-copy', 'uniform-radius',
  ]);
  assert.deepEqual(BANDS, { distinct: [0, 34], mixed: [35, 64], generic: [65, 100] });
});

test('a vibe-coded page lands in the generic band with the classic tells', () => {
  const r = scoreGeneric(genericAi);
  assert.equal(r.band, 'generic');
  const ids = r.flags.map((f) => f.id);
  for (const id of ['indigo-gradient', 'default-face-only', 'hero-three-cards']) assert.ok(ids.includes(id), id);
});

test('a hand-made page is distinct', () => {
  const r = scoreGeneric(handmade);
  assert.equal(r.band, 'distinct');
  assert.ok(r.flags.length <= 1, JSON.stringify(r.flags.map((f) => f.id)));
});

test('every flag cites what was measured and where', () => {
  for (const f of scoreGeneric(genericAi).flags) {
    assert.ok(f.evidence.length >= 1, f.id);
    for (const e of f.evidence) {
      assert.ok(e.where && e.where.length, `${f.id} where`);
      assert.ok(e.value && String(e.value).length, `${f.id} value`);
    }
  }
});

test('on-brand score: matching brand scores high, a wrong primary shows a diff', () => {
  const design = { colors: { primary: { hex: '#533afd' }, neutrals: [] }, typography: { families: [{ name: 'sohne-var', usage: 'all' }] }, borders: { radii: [{ value: 8, count: 4 }] } };
  const brand = { colors: { primary: '#533afd', neutrals: [] }, fonts: ['sohne-var'], radii: [8] };
  assert.ok(scoreOnBrand(design, brand).score >= 90);
  const off = { ...design, colors: { primary: { hex: '#ff0000' }, neutrals: [] } };
  const r = scoreOnBrand(off, brand);
  assert.ok(r.score < 70, String(r.score));
  assert.ok(r.diffs.some((d) => d.token === 'color.primary' && d.expected === '#533afd' && d.actual === '#ff0000'));
});

test('a brand colour used on the page counts even when another colour ranks primary', () => {
  const brand = { colors: { primary: '#0b6e4f', neutrals: [] }, fonts: [], radii: [] };
  const design = { colors: { primary: { hex: '#0d1b1e' }, all: [{ hex: '#0d1b1e', count: 16 }, { hex: '#0b6e4f', count: 6 }, { hex: '#ffffff', count: 1 }] } };
  assert.ok(scoreOnBrand(design, brand).score >= 90, String(scoreOnBrand(design, brand).score));
  const absent = { colors: { primary: { hex: '#0d1b1e' }, all: [{ hex: '#0d1b1e', count: 16 }, { hex: '#ffffff', count: 1 }] } };
  assert.ok(scoreOnBrand(absent, brand).score < 50);
});

test('error, consent and login pages are not scored', () => {
  assert.deepEqual(unreadable(errorPage), { reason: 'error-page' });
  assert.equal(unreadable(handmade), null);
  assert.equal(unreadable(genericAi), null);
  assert.deepEqual(unreadable({ meta: { title: 'Just a moment...' }, colors: { all: [] } }), { reason: 'error-page' });
  assert.deepEqual(unreadable({ meta: { title: 'Sign in to continue' }, voice: { sampleHeadings: ['Sign in'] }, colors: { all: [1, 2, 3, 4] } }), { reason: 'login-wall' });
  assert.deepEqual(unreadable({ meta: { title: 'Before you continue' }, voice: { sampleHeadings: ['We value your privacy'] }, colors: { all: [1, 2, 3, 4] } }), { reason: 'consent-wall' });
  assert.deepEqual(unreadable({ meta: { title: '' }, colors: { all: [1] }, voice: { sampleHeadings: [] }, typography: { families: [] } }), { reason: 'blank' });
});

test('a brand loads from DESIGN.md, DTCG tokens or plain brand JSON', async () => {
  const { parseBrand } = await import('../src/slop/brand.js');
  const md = parseBrand(readFileSync(new URL('./fixtures/slop/brand-DESIGN.md', import.meta.url), 'utf8'), 'DESIGN.md');
  assert.equal(md.colors.primary, '#9c2f1c');
  assert.deepEqual(md.fonts, ['Georgia']);
  assert.ok(md.radii.includes(2));
  const dtcg = parseBrand(readFileSync(new URL('./fixtures/slop/brand-tokens.json', import.meta.url), 'utf8'), 'tokens.json');
  assert.equal(dtcg.colors.primary, '#9c2f1c');
  assert.ok(dtcg.fonts.includes('Georgia'), JSON.stringify(dtcg.fonts));
  const plain = parseBrand(JSON.stringify({ colors: { primary: '#533afd' }, fonts: ['Söhne'], radii: [8] }), 'brand.json');
  assert.equal(plain.colors.primary, '#533afd');
  assert.throws(() => parseBrand('{}', 'x.json'), /primary/);
});

test('calibration: no more than 5% of hand-made sites land in the generic band', async () => {
  const { readdirSync } = await import('node:fs');
  const dir = new URL('../bench/results/', import.meta.url);
  const latest = readdirSync(dir).filter((f) => /^slop-\d{4}-\d{2}-\d{2}\.json$/.test(f)).sort().pop();
  const cal = JSON.parse(readFileSync(new URL(latest, dir), 'utf8'));
  assert.ok(cal.n.human >= 40, `only ${cal.n.human} hand-made sites were read`);
  assert.ok(cal.falseAlarmRate <= 0.05, String(cal.falseAlarmRate));
});

test('next/font family names count as the face they wrap', async () => {
  const { plainFamily } = await import('../src/slop/detectors.js');
  assert.equal(plainFamily('__Inter_d65c78'), 'Inter');
  assert.equal(plainFamily('__Inter_Fallback_d65c78'), 'Inter');
  assert.equal(plainFamily('Inter Variable'), 'Inter');
});
