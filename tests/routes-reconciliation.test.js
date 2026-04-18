import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { reconcileRoutes, slugForPath, formatRoutesReport } from '../src/formatters/routes-reconciliation.js';

function leaf(v) { return { $value: v, $type: 'color' }; }

const baseTokens = {
  primitive: {
    color: {
      brand: { primary: leaf('#ff0000'), secondary: leaf('#00ff00') },
      neutral: { 100: leaf('#ffffff') },
    },
  },
  semantic: {},
};

describe('slugForPath', () => {
  it('treats / and empty as index', () => {
    assert.equal(slugForPath('/'), 'index');
    assert.equal(slugForPath(''), 'index');
    assert.equal(slugForPath(null), 'index');
  });
  it('slugifies standard paths', () => {
    assert.equal(slugForPath('/pricing'), 'pricing');
    assert.equal(slugForPath('/docs/getting-started'), 'docs-getting-started');
  });
});

describe('reconcileRoutes', () => {
  it('returns empty-safe output for no routes', () => {
    const r = reconcileRoutes([]);
    assert.equal(r.summary.routeCount, 0);
    assert.equal(r.summary.sharedTokenCount, 0);
    assert.deepEqual(r.perRoute, {});
  });

  it('intersects identical tokens across routes into shared', () => {
    const routes = [
      { url: 'https://x.com/', path: '/', tokens: baseTokens },
      { url: 'https://x.com/about', path: '/about', tokens: baseTokens },
    ];
    const r = reconcileRoutes(routes);
    assert.equal(r.summary.routeCount, 2);
    assert.ok(r.summary.sharedTokenCount >= 3);
    // shared tree has the primitive.color.brand.primary leaf
    assert.equal(r.shared.primitive.color.brand.primary.$value, '#ff0000');
    // neither route should have "added" or "changed" entries
    assert.deepEqual(r.perRoute.index.added, {});
    assert.deepEqual(r.perRoute.index.changed, {});
    assert.deepEqual(r.perRoute.about.added, {});
  });

  it('emits `added` tokens for a route that has unique tokens', () => {
    const priceTokens = {
      primitive: {
        color: {
          brand: { primary: leaf('#ff0000'), secondary: leaf('#00ff00') },
          neutral: { 100: leaf('#ffffff') },
          accent: { gold: leaf('#ffd700') }, // unique to /pricing
        },
      },
      semantic: {},
    };
    const routes = [
      { url: 'https://x.com/', path: '/', tokens: baseTokens },
      { url: 'https://x.com/pricing', path: '/pricing', tokens: priceTokens },
    ];
    const r = reconcileRoutes(routes);
    assert.equal(r.perRoute.pricing.added.primitive.color.accent.gold.$value, '#ffd700');
    // The base route has no "added" since all its tokens are shared or absent.
    assert.deepEqual(r.perRoute.index.added, {});
  });

  it('emits `changed` when a route overrides an otherwise-shared token value', () => {
    const darkTokens = {
      primitive: {
        color: {
          brand: { primary: leaf('#aa0000'), secondary: leaf('#00ff00') }, // primary differs
          neutral: { 100: leaf('#ffffff') },
        },
      },
      semantic: {},
    };
    const routes = [
      { url: 'https://x.com/', path: '/', tokens: baseTokens },
      { url: 'https://x.com/dark', path: '/dark', tokens: darkTokens },
    ];
    const r = reconcileRoutes(routes);
    // primary shouldn't be shared because values disagree
    assert.ok(!('primary' in (r.shared.primitive?.color?.brand || {})),
      'disagreeing primary should not be shared');
    // both routes should have primary in their `changed` bucket
    assert.equal(r.perRoute.index.changed.primitive.color.brand.primary.$value, '#ff0000');
    assert.equal(r.perRoute.dark.changed.primitive.color.brand.primary.$value, '#aa0000');
    assert.ok(r.summary.drift.length >= 2);
  });

  it('resolves slug collisions by appending a numeric suffix', () => {
    const routes = [
      { url: 'https://x.com/docs/a', path: '/docs-a', tokens: baseTokens },
      { url: 'https://x.com/docs-a/', path: '/docs-a', tokens: baseTokens },
    ];
    const r = reconcileRoutes(routes);
    const slugs = Object.keys(r.perRoute);
    assert.equal(slugs.length, 2);
    assert.ok(slugs.includes('docs-a'));
    assert.ok(slugs.some(s => s.startsWith('docs-a-')));
  });

  it('formatRoutesReport produces readable markdown', () => {
    const routes = [
      { url: 'https://x.com/', path: '/', tokens: baseTokens },
      { url: 'https://x.com/pricing', path: '/pricing', tokens: baseTokens },
    ];
    const md = formatRoutesReport(reconcileRoutes(routes));
    assert.match(md, /Routes crawled.*2/);
    assert.match(md, /Shared tokens/);
    assert.match(md, /pricing/);
  });
});
