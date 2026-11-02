import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync, openSync, closeSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, join } from 'node:path';
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

  it('shows the version from package.json', async () => {
    const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf-8'));
    const output = execFileSync('node', [CLI_PATH, '--version'], { encoding: 'utf-8' });
    assert.equal(output.trim(), pkg.version);
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

  it('registers the fidelity command with a required --clone option', () => {
    const output = execFileSync('node', [CLI_PATH, 'fidelity', '--help'], { encoding: 'utf-8' });
    assert.ok(output.includes('Measure how faithfully a clone reproduces'));
    assert.ok(output.includes('--clone'));
    assert.ok(output.includes('--min'));
  });

  it('fidelity exits non-zero when --clone is missing', () => {
    try {
      execFileSync('node', [CLI_PATH, 'fidelity', 'https://example.com'], { encoding: 'utf-8', stdio: 'pipe' });
      assert.fail('Should have thrown');
    } catch (err) {
      assert.ok(err.status !== 0);
    }
  });

  it('registers the gallery command', () => {
    const output = execFileSync('node', [CLI_PATH, 'gallery', '--help'], { encoding: 'utf-8' });
    assert.ok(output.includes('Build a static, shareable gallery'));
    assert.ok(output.includes('--base-url'));
  });

  it('clone exposes a --fidelity flag', () => {
    const output = execFileSync('node', [CLI_PATH, 'clone', '--help'], { encoding: 'utf-8' });
    assert.ok(output.includes('--fidelity'));
    assert.ok(output.includes('FIDELITY.md') || output.includes('token-fidelity'));
  });

  it('gallery exits non-zero when no reports are found', () => {
    try {
      execFileSync('node', [CLI_PATH, 'gallery', resolve(import.meta.dirname, '..', 'src')], { encoding: 'utf-8', stdio: 'pipe' });
      assert.fail('Should have thrown');
    } catch (err) {
      assert.ok(err.status !== 0);
    }
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

describe('doctor command', () => {
  const runDoctor = (args = []) => {
    try {
      return { status: 0, output: execFileSync('node', [CLI_PATH, 'doctor', ...args], { encoding: 'utf-8', stdio: 'pipe' }) };
    } catch (err) {
      return { status: err.status, output: (err.stdout || '') + (err.stderr || '') };
    }
  };

  it('registers the doctor command in help output', () => {
    // Redirect to a file rather than a pipe: commander exits before a piped
    // stdout flushes, which truncates the tail of the command list.
    const tmp = join(tmpdir(), `designlang-help-${process.pid}.txt`);
    const fd = openSync(tmp, 'w');
    try {
      execFileSync('node', [CLI_PATH, '--help'], { stdio: ['ignore', fd, 'ignore'] });
    } finally {
      closeSync(fd);
    }
    const output = readFileSync(tmp, 'utf-8');
    rmSync(tmp, { force: true });
    assert.ok(output.includes('doctor'));
  });

  it('describes itself under doctor --help', () => {
    const output = execFileSync('node', [CLI_PATH, 'doctor', '--help'], { encoding: 'utf-8' });
    assert.ok(output.includes('health check'));
  });

  it('prints a row for every environment check', () => {
    const { output } = runDoctor();
    for (const label of ['Node', 'designlang', 'playwright', 'Chromium binary', 'Output dir', 'Network']) {
      assert.ok(output.includes(label), `missing check row: ${label}`);
    }
  });

  it('reports the running designlang version', () => {
    const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf-8'));
    const { output } = runDoctor();
    assert.ok(output.includes(pkg.version));
  });

  it('exits 0 if and only if every check passed', () => {
    const { status, output } = runDoctor();
    assert.equal(status === 0, output.includes('All checks passed'));
  });

  it('prints a fix hint for each failing check', () => {
    const { output } = runDoctor();
    const failed = output.split('\n').filter(l => /\bFAIL\b/.test(l));
    if (failed.length) assert.ok(output.includes('fix:'), 'a failing check must print a fix hint');
  });
});

describe('quiet flag on subcommands (#108)', () => {
  it('exposes -q, --quiet on the brand command', () => {
    const output = execFileSync('node', [CLI_PATH, 'brand', '--help'], { encoding: 'utf-8' });
    assert.ok(output.includes('-q, --quiet'));
  });

  it('exposes -q, --quiet on the pair command', () => {
    const output = execFileSync('node', [CLI_PATH, 'pair', '--help'], { encoding: 'utf-8' });
    assert.ok(output.includes('-q, --quiet'));
  });

  it('exposes -q, --quiet on the brands command', () => {
    const output = execFileSync('node', [CLI_PATH, 'brands', '--help'], { encoding: 'utf-8' });
    assert.ok(output.includes('-q, --quiet'));
  });

  it('exposes -q on the ci command', () => {
    const output = execFileSync('node', [CLI_PATH, 'ci', '--help'], { encoding: 'utf-8' });
    assert.ok(output.includes('-q, --quiet'));
  });

  it('suppresses stdout on invalid URL under -q and prints to stderr', () => {
    try {
      execFileSync('node', [CLI_PATH, 'brand', 'not a url', '-q'], { encoding: 'utf-8', stdio: 'pipe' });
      assert.fail('Should have exited with error');
    } catch (err) {
      assert.equal(err.status, 1);
      assert.equal(err.stdout.trim(), '');
      assert.ok(err.stderr.includes('Invalid URL'));
    }
  });
});
