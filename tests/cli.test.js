import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { parsePlatforms, mergeConfig } from '../src/config.js';

const CLI_PATH = resolve(import.meta.dirname, '..', 'bin', 'design-extract.js');

describe('CLI', () => {
  it('shows help with --help', () => {
    const output = execFileSync('node', [CLI_PATH, '--help'], { encoding: 'utf-8' });
    assert.ok(output.includes('designlang'));
    assert.ok(output.includes('Extract'));
  });

  it('shows version with --version', () => {
    const output = execFileSync('node', [CLI_PATH, '--version'], { encoding: 'utf-8' });
    assert.ok(output.trim().match(/^\d+\.\d+\.\d+$/));
  });

  it('shows version number 6.0.0', () => {
    const output = execFileSync('node', [CLI_PATH, '--version'], { encoding: 'utf-8' });
    assert.equal(output.trim(), '6.0.0');
  });

  it('exits with error when no arguments provided', () => {
    try {
      execFileSync('node', [CLI_PATH], { encoding: 'utf-8', stdio: 'pipe' });
      assert.fail('Should have thrown');
    } catch (err) {
      // Commander exits with code 1 when required argument is missing
      assert.ok(err.status !== 0);
    }
  });

  it('lists --platforms option in help output', () => {
    const output = execFileSync('node', [CLI_PATH, '--help'], { encoding: 'utf-8' });
    assert.ok(output.includes('--platforms'));
  });
});

describe('parsePlatforms', () => {
  it('defaults to web only', () => {
    assert.deepEqual(parsePlatforms('web'), ['web']);
  });

  it('parses comma-separated values', () => {
    assert.deepEqual(parsePlatforms('ios,android'), ['web', 'ios', 'android']);
  });

  it('expands "all" to every known platform', () => {
    assert.deepEqual(parsePlatforms('all'), ['web', 'ios', 'android', 'flutter', 'wordpress']);
  });

  it('always includes web (additive)', () => {
    assert.ok(parsePlatforms('ios').includes('web'));
    assert.ok(parsePlatforms('wordpress').includes('web'));
  });

  it('ignores unknown platforms', () => {
    assert.deepEqual(parsePlatforms('ios,badplatform,android'), ['web', 'ios', 'android']);
  });

  it('accepts arrays', () => {
    assert.deepEqual(parsePlatforms(['ios', 'flutter']), ['web', 'ios', 'flutter']);
  });
});

describe('mergeConfig platforms', () => {
  it('threads CLI --platforms through mergeConfig', () => {
    const merged = mergeConfig({ platforms: 'ios,flutter' }, {});
    assert.deepEqual(merged.platforms, ['web', 'ios', 'flutter']);
  });

  it('honors platforms from config file', () => {
    const merged = mergeConfig({}, { platforms: 'android' });
    assert.deepEqual(merged.platforms, ['web', 'android']);
  });

  it('defaults to [web] when neither CLI nor config provides platforms', () => {
    const merged = mergeConfig({}, {});
    assert.deepEqual(merged.platforms, ['web']);
  });
});
