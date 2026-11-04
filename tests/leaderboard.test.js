import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createBudget, BudgetExceeded } from '../leaderboard/cost.js';
import { classifyOutput, scoreRun, buildTable } from '../leaderboard/core.js';

const brand = { colors: { primary: '#b3261e', neutrals: [] }, fonts: ['Archivo'], radii: [6] };

test('empty, non-HTML and unrenderable outputs are failed runs', async () => {
  assert.deepEqual(classifyOutput(''), { ok: false, failure: 'empty' });
  assert.deepEqual(classifyOutput('   \n'), { ok: false, failure: 'empty' });
  assert.deepEqual(classifyOutput('Sure! Here is a description of a page.'), { ok: false, failure: 'not-html' });
  // Cut off mid-file (the model ran out of tokens): not a usable page.
  assert.deepEqual(classifyOutput('```html\n<!DOCTYPE html><html><head><style>:root{--x:1}'), { ok: false, failure: 'not-html' });
  const fenced = classifyOutput('Here you go:\n```html\n<!doctype html><html><body><h1>Hi</h1></body></html>\n```');
  assert.equal(fenced.ok, true);
  assert.match(fenced.html, /^<!doctype html>/);
  const bad = await scoreRun({ html: '<html><body>x</body></html>', brand, read: async () => { throw new Error('boom'); } });
  assert.deepEqual(bad, { ok: false, failure: 'render-error' });
  const slow = await scoreRun({ html: '<html></html>', brand, read: async () => { const e = new Error('Timeout 30000ms exceeded'); e.name = 'TimeoutError'; throw e; } });
  assert.deepEqual(slow, { ok: false, failure: 'timeout' });
});

test('a rendered run gets both scores', async () => {
  const design = { colors: { primary: { hex: '#b3261e' }, all: [1, 2, 3, 4] }, typography: { families: [{ name: 'Archivo' }] }, borders: { radii: [{ value: 6, count: 3 }] }, meta: { title: 'Ember' }, voice: { sampleHeadings: ['Hot sauce'] } };
  const r = await scoreRun({ html: '<html></html>', brand, read: async () => design });
  assert.equal(r.ok, true);
  assert.ok(r.onBrand >= 90);
  assert.equal(typeof r.generic, 'number');
});

test('the budget stops spending past the cap', () => {
  const b = createBudget({ capUsd: 0.01 });
  b.charge({ prompt_tokens: 1000, completion_tokens: 0 }, 'openai/gpt-6.1-sol');
  assert.ok(b.spent() > 0);
  assert.throws(() => b.charge({ prompt_tokens: 0, completion_tokens: 10_000 }, 'openai/gpt-6.1-sol'), BudgetExceeded);
  assert.ok(b.spent() > 0.01);
  assert.throws(() => b.check(), BudgetExceeded);
});

test('table means skip failures but n counts every run', () => {
  const runs = [
    { model: 'm1', ok: true, onBrand: 80, generic: 20 },
    { model: 'm1', ok: true, onBrand: 60, generic: 40 },
    { model: 'm1', ok: false, failure: 'empty' },
    { model: 'm2', ok: false, failure: 'not-html' },
  ];
  const t = buildTable(runs, [{ id: 'm1', label: 'One' }, { id: 'm2', label: 'Two' }]);
  const m1 = t.find((r) => r.model === 'm1');
  assert.deepEqual({ onBrand: m1.onBrand, generic: m1.generic, failures: m1.failures, n: m1.n }, { onBrand: 70, generic: 30, failures: 1, n: 3 });
  const m2 = t.find((r) => r.model === 'm2');
  assert.equal(m2.onBrand, null);
  assert.equal(m2.failures, 1);
  assert.equal(t[0].model, 'm1');
});

test('a model with too many failed runs is listed but not ranked', () => {
  const runs = [
    { model: 'flaky', ok: true, onBrand: 99, generic: 1 },
    ...Array.from({ length: 9 }, () => ({ model: 'flaky', ok: false, failure: 'no-response' })),
    ...Array.from({ length: 10 }, () => ({ model: 'steady', ok: true, onBrand: 90, generic: 5 })),
  ];
  const t = buildTable(runs, [{ id: 'flaky', label: 'Flaky' }, { id: 'steady', label: 'Steady' }]);
  assert.equal(t[0].model, 'steady');
  assert.equal(t[0].ranked, true);
  assert.equal(t[1].model, 'flaky');
  assert.equal(t[1].ranked, false);
});

test('merging a retry replaces failed runs with their new result', async () => {
  const { mergeRetries } = await import('../leaderboard/core.js');
  const first = [{ model: 'm', brief: 'b', prompt: 'p', ok: false, failure: 'no-response' }, { model: 'm', brief: 'b', prompt: 'q', ok: true, onBrand: 80, generic: 2 }];
  const retry = [{ model: 'm', brief: 'b', prompt: 'p', ok: true, onBrand: 70, generic: 4 }];
  const merged = mergeRetries(first, retry);
  assert.equal(merged.length, 2);
  assert.equal(merged.find((r) => r.prompt === 'p').ok, true);
  assert.equal(merged.find((r) => r.prompt === 'p').retried, true);
});

test('only runs the provider dropped are retried; a model\'s own failure stays on its record', async () => {
  const { retryable, mergeRetries } = await import('../leaderboard/core.js');
  assert.equal(retryable({ ok: false, failure: 'no-response' }), true);
  assert.equal(retryable({ ok: false, failure: 'timeout' }), true);
  assert.equal(retryable({ ok: false, failure: 'api-error' }), true);
  assert.equal(retryable({ ok: false, failure: 'empty', costUsd: 0 }), true, 'an empty reply with no usage is a dropped request');
  assert.equal(retryable({ ok: false, failure: 'empty', costUsd: 0.04 }), false);
  assert.equal(retryable({ ok: false, failure: 'not-html' }), false);
  assert.equal(retryable({ ok: false, failure: 'render-error' }), false);
  const first = [{ model: 'm', brief: 'b', prompt: 'p', ok: false, failure: 'not-html' }];
  const merged = mergeRetries(first, [{ model: 'm', brief: 'b', prompt: 'p', ok: true, onBrand: 90, generic: 1 }]);
  assert.equal(merged[0].ok, false, 'a non-retryable failure is never replaced');
});

test('a model that did not cover every brand and screen is not ranked', () => {
  const runs = [
    ...Array.from({ length: 4 }, (_, i) => ({ model: 'full', brief: 'b', prompt: `p${i}`, ok: true, onBrand: 80, generic: 1 })),
    { model: 'part', brief: 'b', prompt: 'p0', ok: true, onBrand: 99, generic: 1 },
  ];
  const t = buildTable(runs, [{ id: 'full', label: 'F' }, { id: 'part', label: 'P' }], { expected: 4 });
  assert.equal(t[0].model, 'full');
  assert.equal(t.find((r) => r.model === 'part').ranked, false);
  assert.equal(t.find((r) => r.model === 'part').notRun, 3);
});
