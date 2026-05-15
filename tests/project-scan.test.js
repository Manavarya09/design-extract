import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { scanProjectDesignFiles } from '../src/mcp/project-scan.js';

function makeTmpDir() {
  return mkdtempSync(join(tmpdir(), 'designlang-scan-'));
}

describe('project-scan: design-tokens.json', () => {
  it('loads DTCG tokens with primitive/semantic keys', () => {
    const dir = makeTmpDir();
    writeFileSync(join(dir, 'design-tokens.json'), JSON.stringify({
      primitive: { color: { red: { $value: '#ff0000', $type: 'color' } } },
      semantic: { action: { primary: { $value: '{color.red}', $type: 'color' } } },
    }));
    const result = scanProjectDesignFiles(dir);
    assert.ok(result);
    assert.deepStrictEqual(result.tokens.primitive.color.red, { $value: '#ff0000', $type: 'color' });
    assert.ok(result.tokens.semantic.action);
    rmSync(dir, { recursive: true, force: true });
  });

  it('wraps flat token objects as primitive tier', () => {
    const dir = makeTmpDir();
    writeFileSync(join(dir, 'design-tokens.json'), JSON.stringify({
      color: { brand: { $value: '#000', $type: 'color' } },
    }));
    const result = scanProjectDesignFiles(dir);
    assert.ok(result);
    assert.ok(result.tokens.primitive.color);
    assert.deepStrictEqual(result.tokens.semantic, {});
    rmSync(dir, { recursive: true, force: true });
  });

  it('finds design-tokens.json in app/ subdirectory', () => {
    const dir = makeTmpDir();
    const appDir = join(dir, 'app');
    mkdirSync(appDir);
    writeFileSync(join(appDir, 'design-tokens.json'), JSON.stringify({
      primitive: { spacing: { sm: { $value: '4px', $type: 'dimension' } } },
      semantic: {},
    }));
    const result = scanProjectDesignFiles(dir);
    assert.ok(result);
    assert.ok(result.tokens.primitive.spacing);
    rmSync(dir, { recursive: true, force: true });
  });
});

describe('project-scan: tailwind.config', () => {
  it('extracts colors from tailwind.config.js', () => {
    const dir = makeTmpDir();
    writeFileSync(join(dir, 'tailwind.config.js'), `
module.exports = {
  theme: {
    extend: {
      colors: {
        'primary': '#3b82f6',
        'secondary': '#10b981',
      },
    },
  },
};`);
    const result = scanProjectDesignFiles(dir);
    assert.ok(result);
    assert.deepStrictEqual(result.tokens.primitive.color.primary, { $value: '#3b82f6', $type: 'color' });
    assert.deepStrictEqual(result.tokens.primitive.color.secondary, { $value: '#10b981', $type: 'color' });
    rmSync(dir, { recursive: true, force: true });
  });

  it('extracts fontFamily from tailwind.config.ts', () => {
    const dir = makeTmpDir();
    writeFileSync(join(dir, 'tailwind.config.ts'), `
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
};`);
    const result = scanProjectDesignFiles(dir);
    assert.ok(result);
    assert.deepStrictEqual(result.tokens.primitive.fontFamily.sans, { $value: 'Inter, sans-serif', $type: 'fontFamily' });
    assert.deepStrictEqual(result.tokens.primitive.fontFamily.mono, { $value: 'Fira Code, monospace', $type: 'fontFamily' });
    rmSync(dir, { recursive: true, force: true });
  });

  it('extracts spacing values', () => {
    const dir = makeTmpDir();
    writeFileSync(join(dir, 'tailwind.config.js'), `
module.exports = {
  theme: {
    extend: {
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
      },
    },
  },
};`);
    const result = scanProjectDesignFiles(dir);
    assert.ok(result);
    assert.deepStrictEqual(result.tokens.primitive.spacing['18'], { $value: '4.5rem', $type: 'dimension' });
    rmSync(dir, { recursive: true, force: true });
  });
});

describe('project-scan: globals.css', () => {
  it('extracts CSS custom properties from :root', () => {
    const dir = makeTmpDir();
    writeFileSync(join(dir, 'globals.css'), `
:root {
  --primary: #3b82f6;
  --spacing-md: 1rem;
  --font-sans: Inter, sans-serif;
}`);
    const result = scanProjectDesignFiles(dir);
    assert.ok(result);
    assert.deepStrictEqual(result.tokens.primitive.cssVar.primary, { $value: '#3b82f6', $type: 'color' });
    assert.deepStrictEqual(result.tokens.primitive.cssVar['spacing-md'], { $value: '1rem', $type: 'color' });
    rmSync(dir, { recursive: true, force: true });
  });

  it('extracts from multiple :root blocks', () => {
    const dir = makeTmpDir();
    writeFileSync(join(dir, 'globals.css'), `
:root { --bg: #fff; }
:root { --fg: #000; }`);
    const result = scanProjectDesignFiles(dir);
    assert.ok(result);
    assert.ok(result.tokens.primitive.cssVar.bg);
    assert.ok(result.tokens.primitive.cssVar.fg);
    rmSync(dir, { recursive: true, force: true });
  });
});

describe('project-scan: priority and merging', () => {
  it('design-tokens.json takes priority, globals.css fills gaps', () => {
    const dir = makeTmpDir();
    writeFileSync(join(dir, 'design-tokens.json'), JSON.stringify({
      primitive: { color: { brand: { $value: '#000', $type: 'color' } } },
      semantic: {},
    }));
    writeFileSync(join(dir, 'globals.css'), ':root { --accent: #ff0; }');
    const result = scanProjectDesignFiles(dir);
    assert.ok(result);
    assert.ok(result.tokens.primitive.color, 'should have color from design-tokens.json');
    assert.ok(result.tokens.primitive.cssVar, 'should have cssVar from globals.css');
    rmSync(dir, { recursive: true, force: true });
  });

  it('design-tokens.json color is not overwritten by tailwind colors', () => {
    const dir = makeTmpDir();
    writeFileSync(join(dir, 'design-tokens.json'), JSON.stringify({
      primitive: { color: { brand: { $value: '#000', $type: 'color' } } },
      semantic: {},
    }));
    writeFileSync(join(dir, 'tailwind.config.js'), `
module.exports = { theme: { extend: { colors: { 'brand': '#fff' } } } };`);
    const result = scanProjectDesignFiles(dir);
    assert.ok(result);
    assert.deepStrictEqual(result.tokens.primitive.color.brand, { $value: '#000', $type: 'color' },
      'design-tokens.json color should win over tailwind');
    rmSync(dir, { recursive: true, force: true });
  });
});

describe('project-scan: empty / missing', () => {
  it('returns null for empty directory', () => {
    const dir = makeTmpDir();
    const result = scanProjectDesignFiles(dir);
    assert.equal(result, null);
    rmSync(dir, { recursive: true, force: true });
  });

  it('returns null for malformed design-tokens.json', () => {
    const dir = makeTmpDir();
    writeFileSync(join(dir, 'design-tokens.json'), 'not json{{{');
    const result = scanProjectDesignFiles(dir);
    assert.equal(result, null);
    rmSync(dir, { recursive: true, force: true });
  });

  it('returns null for globals.css with no :root block', () => {
    const dir = makeTmpDir();
    writeFileSync(join(dir, 'globals.css'), 'body { margin: 0; }');
    const result = scanProjectDesignFiles(dir);
    assert.equal(result, null);
    rmSync(dir, { recursive: true, force: true });
  });
});
