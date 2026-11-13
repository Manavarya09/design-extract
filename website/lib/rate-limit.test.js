import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { checkRate, _resetRateLimit } from './rate-limit.js';

beforeEach(() => _resetRateLimit());

test('first three requests allowed, fourth blocked', () => {
  const key = 'ip-1';
  assert.equal(checkRate(key).allowed, true);
  assert.equal(checkRate(key).allowed, true);
  assert.equal(checkRate(key).allowed, true);
  assert.equal(checkRate(key).allowed, false);
});

test('remaining counts down', () => {
  const key = 'ip-2';
  assert.equal(checkRate(key).remaining, 2);
  assert.equal(checkRate(key).remaining, 1);
  assert.equal(checkRate(key).remaining, 0);
  assert.equal(checkRate(key).remaining, 0);
});

test('different keys have independent budgets', () => {
  checkRate('a');
  checkRate('a');
  checkRate('a');
  assert.equal(checkRate('a').allowed, false);
  assert.equal(checkRate('b').allowed, true);
});

test('window reset after expiry', async () => {
  const key = 'ip-3';
  const opts = { limit: 2, windowMs: 30 };
  assert.equal(checkRate(key, opts).allowed, true);
  assert.equal(checkRate(key, opts).allowed, true);
  assert.equal(checkRate(key, opts).allowed, false);
  await new Promise((r) => setTimeout(r, 40));
  const after = checkRate(key, opts);
  assert.equal(after.allowed, true);
  assert.equal(after.remaining, 1);
});

test('custom limit respected', () => {
  const key = 'ip-4';
  const opts = { limit: 5, windowMs: 60000 };
  for (let i = 0; i < 5; i++) assert.equal(checkRate(key, opts).allowed, true);
  assert.equal(checkRate(key, opts).allowed, false);
});

test('resetAt advances with the first-seen time', () => {
  const key = 'ip-5';
  const { resetAt: a } = checkRate(key, { limit: 3, windowMs: 60000 });
  const { resetAt: b } = checkRate(key, { limit: 3, windowMs: 60000 });
  assert.equal(a, b);
});

test('live-read budget is site-wide and holds without Blob', async () => {
  const { checkLiveReadBudget, LIVE_READS_PER_DAY } = await import('./rate-limit.js');
  const saved = process.env.BLOB_READ_WRITE_TOKEN;
  delete process.env.BLOB_READ_WRITE_TOKEN; // Blob blocked or absent must not lift the cap
  try {
    for (let i = 0; i < LIVE_READS_PER_DAY; i++) {
      assert.equal((await checkLiveReadBudget()).allowed, true, `read ${i + 1}`);
    }
    assert.equal((await checkLiveReadBudget()).allowed, false);
  } finally {
    if (saved !== undefined) process.env.BLOB_READ_WRITE_TOKEN = saved;
  }
});
