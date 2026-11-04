import { test } from 'node:test';
import assert from 'node:assert/strict';
import { measureUi, verifyReport } from '../src/verify/ui.js';

const brand = { colors: { primary: '#2f5d3a', neutrals: [] }, fonts: ['Work Sans'], radii: [10] };
const page = (over = {}) => ({
  colors: { primary: { hex: '#2f5d3a' }, all: [{ hex: '#2f5d3a', count: 5 }, { hex: '#ffffff', count: 9 }] },
  typography: { families: [{ name: 'Work Sans', usage: 'all' }] },
  borders: { radii: [{ value: 10, count: 6 }] },
  components: { buttons: { baseStyle: { borderRadius: '10px' } } },
  meta: { title: 'Fernwood' }, voice: { sampleHeadings: ['Native plants'] },
  ...over,
});

test('measureUi reads every viewport and adds a dark shot when the page has one', async () => {
  const calls = [];
  const extract = async (url, opts) => { calls.push(opts.width); return page({ colors: { ...page().colors, backgrounds: ['#ffffff'] }, darkMode: { colors: { primary: { hex: '#2f5d3a' }, backgrounds: ['#111111'], all: [] } } }); };
  const { shots } = await measureUi('http://localhost:3000', { extract });
  assert.deepEqual(calls, [390, 768, 1280]);
  assert.deepEqual(shots.map((s) => `${s.viewport}/${s.scheme}/${s.state}`), ['390/light/default', '390/dark/default', '768/light/default', '768/dark/default', '1280/light/default', '1280/dark/default']);
  const noDark = await measureUi('http://localhost:3000', { extract: async () => page({ colors: { ...page().colors, backgrounds: ['#ffffff'] }, darkMode: { colors: { primary: { hex: '#2f5d3a' }, backgrounds: ['#ffffff'] } } }) });
  assert.ok(noDark.shots.every((s) => s.scheme === 'light'), 'a page with no dark mode gets no dark pass');
});

test('a 6px button against a 10px brand is an issue that names both values', () => {
  const off = page({ borders: { radii: [{ value: 6, count: 6 }] }, components: { buttons: { baseStyle: { borderRadius: '6px' } } } });
  const r = verifyReport({ shots: [{ viewport: 1280, scheme: 'light', state: 'default', design: off }], brand });
  const issue = r.issues.find((i) => i.token === 'radius');
  assert.ok(issue, JSON.stringify(r.issues));
  assert.equal(issue.expected, '10px');
  assert.equal(issue.actual, '6px');
  assert.equal(issue.where, 'button');
  assert.equal(issue.viewport, 1280);
  assert.equal(issue.fix, undefined, 'the open report carries no fix suggestions');
});

test('pass needs onBrand >= 85 and no error-level issue', () => {
  const good = verifyReport({ shots: [{ viewport: 1280, scheme: 'light', state: 'default', design: page() }], brand });
  assert.equal(good.pass, true);
  assert.ok(good.onBrand >= 85);
  const wrongPrimary = page({ colors: { primary: { hex: '#ff0000' }, all: [{ hex: '#ff0000', count: 5 }] } });
  const bad = verifyReport({ shots: [{ viewport: 1280, scheme: 'light', state: 'default', design: wrongPrimary }], brand });
  assert.equal(bad.pass, false);
  assert.ok(bad.issues.some((i) => i.severity === 'error' && i.token === 'color.primary'));
});

test('the same issue on several viewports is reported once with every viewport listed', () => {
  const off = page({ typography: { families: [{ name: 'Inter', usage: 'all' }] } });
  const shots = [390, 1280].map((viewport) => ({ viewport, scheme: 'light', state: 'default', design: off }));
  const r = verifyReport({ shots, brand });
  const fonts = r.issues.filter((i) => i.token === 'font.family');
  assert.equal(fonts.length, 1);
  assert.deepEqual(fonts[0].viewports, [390, 1280]);
});

test('a brand id is fetched with the brand token; a file is read from disk', async () => {
  const { loadBrand } = await import('../src/verify/brand-source.js');
  const id = '0f3c2d4e-1111-4222-8333-444455556666';
  await assert.rejects(loadBrand(id, { env: {} }), /DESIGNLANG_BRAND_TOKEN/);
  let seen;
  const fetchImpl = async (url, init) => { seen = { url, auth: init.headers.authorization }; return new Response(JSON.stringify({ color: { primary: { $value: '#2f5d3a', $type: 'color' } }, font: { body: { $value: ['Work Sans'], $type: 'fontFamily' } }, radius: { lg: { $value: '10px', $type: 'dimension' } } })); };
  const b = await loadBrand(id, { env: { DESIGNLANG_BRAND_TOKEN: 'dlk_x' }, fetchImpl });
  assert.equal(seen.url, `https://api.designlang.app/api/brand/${id}/tokens.json`);
  assert.equal(seen.auth, 'Bearer dlk_x');
  assert.equal(b.colors.primary, '#2f5d3a');
  assert.deepEqual(b.fonts, ['Work Sans']);
  assert.deepEqual(b.radii, [10]);
  const fromFile = await loadBrand(new URL('./fixtures/slop/brand-DESIGN.md', import.meta.url).pathname);
  assert.equal(fromFile.colors.primary, '#9c2f1c');
});

test('the verify_ui MCP tool measures with the injected browser and reports issues', async () => {
  const { buildExtractTools } = await import('../src/mcp/extract-tools.js');
  const off = page({ borders: { radii: [{ value: 6, count: 6 }] }, components: { buttons: { baseStyle: { borderRadius: '6px' } } } });
  const t = buildExtractTools({ extract: async () => off });
  assert.ok(t.list().some((d) => d.name === 'verify_ui'));
  const file = new URL('./fixtures/slop/brand-tokens.json', import.meta.url).pathname;
  const r = await t.call('verify_ui', { url: 'localhost:3000', brand: file, viewports: [1280] });
  assert.equal(typeof r.pass, 'boolean');
  assert.ok(Array.isArray(r.issues));
  await assert.rejects(t.call('verify_ui', { url: 'localhost:3000' }), /brand/);
});

test('an error, login or blank page is reported as unreadable, not as brand drift', () => {
  const err = page({ meta: { title: '500 Internal Server Error', status: 500 } });
  const r = verifyReport({ shots: [{ viewport: 1280, scheme: 'light', state: 'default', design: err }], brand });
  assert.equal(r.pass, false);
  assert.deepEqual(r.unreadable, { reason: 'error-page', viewport: 1280 });
  assert.deepEqual(r.issues, []);
});
