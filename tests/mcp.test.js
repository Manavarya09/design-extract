import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildResources } from '../src/mcp/resources.js';
import { buildTools } from '../src/mcp/tools.js';

const tokens = {
  $metadata: { source: 'https://x.com' },
  primitive: { color: { brand: { primary: { $value: '#3b82f6', $type: 'color' } } } },
  semantic: { color: { action: { primary: { $value: '{primitive.color.brand.primary}', $type: 'color' } } } },
};
const design = {
  colors: { all: ['#000', '#111', '#555', '#fff'] },
  regions: [{ role: 'hero', bounds: { x:0,y:0,w:1280,h:600 }, heading: 'Build' }],
  componentClusters: [{ kind: 'button', instanceCount: 5, variants: [{ css: { bg: '#3b82f6' }, instanceCount: 3 }] }],
  accessibility: { remediation: [{ fg:'#eee', bg:'#fff', ratio:1.1, rule:'AA-normal', suggestion:{replace:'fg',color:'#000',newRatio:21}}] },
  cssHealth: null,
};

describe('MCP resources', () => {
  it('lists five URIs', () => {
    const r = buildResources({ design, tokens });
    assert.equal(r.list().length, 5);
    assert.ok(r.list().find(x => x.uri === 'designlang://tokens/semantic'));
  });
  it('reads semantic tokens', () => {
    const r = buildResources({ design, tokens });
    const out = r.read('designlang://tokens/semantic');
    const body = JSON.parse(out.text);
    assert.ok(body.color?.action?.primary);
  });
  it('throws for unknown uri', () => {
    const r = buildResources({ design, tokens });
    assert.throws(() => r.read('designlang://nope'));
  });
});

describe('MCP tools', () => {
  it('search_tokens finds semantic token by substring', async () => {
    const t = buildTools({ design, tokens });
    const res = await t.call('search_tokens', { query: 'action.primary' });
    assert.ok(JSON.stringify(res.matches).includes('action.primary'));
  });
  it('find_nearest_color returns a palette color passing AA', async () => {
    const t = buildTools({ design, tokens });
    const res = await t.call('find_nearest_color', { hex: '#ffffff', level: 'AA-normal' });
    assert.ok(res.color);
    assert.ok(res.newRatio >= 4.5);
  });
  it('get_region returns hero', async () => {
    const t = buildTools({ design, tokens });
    const res = await t.call('get_region', { name: 'hero' });
    assert.equal(res.role, 'hero');
  });
  it('get_component returns button cluster', async () => {
    const t = buildTools({ design, tokens });
    const res = await t.call('get_component', { name: 'button' });
    assert.equal(res.kind, 'button');
  });
  it('list_failing_contrast_pairs returns remediation array', async () => {
    const t = buildTools({ design, tokens });
    const res = await t.call('list_failing_contrast_pairs');
    assert.equal(res.length, 1);
  });
  it('throws on unknown tool', async () => {
    const t = buildTools({ design, tokens });
    await assert.rejects(() => t.call('nope', {}));
  });
});
