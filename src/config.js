import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const CONFIG_FILES = ['.designlangrc', 'designlang.config.json', '.designlangrc.json'];

export function loadConfig(dir = process.cwd()) {
  for (const name of CONFIG_FILES) {
    const path = join(dir, name);
    if (existsSync(path)) {
      try {
        return JSON.parse(readFileSync(path, 'utf-8'));
      } catch { return {}; }
    }
  }
  return {};
}

export function mergeConfig(cliOpts, config) {
  // CLI flags take precedence over config file
  return {
    ignore: cliOpts.ignore || config.ignore || [],
    width: cliOpts.width || config.width || 1280,
    height: cliOpts.height || config.height || 800,
    wait: cliOpts.wait || config.wait || 0,
    dark: cliOpts.dark || config.dark || false,
    depth: cliOpts.depth || config.depth || 0,
    screenshots: cliOpts.screenshots || config.screenshots || false,
    framework: cliOpts.framework || config.framework,
    responsive: cliOpts.responsive || config.responsive || false,
    interactions: cliOpts.interactions || config.interactions || false,
    full: cliOpts.full || config.full || false,
    cookie: cliOpts.cookie || config.cookies,
    header: cliOpts.header || config.headers,
    out: cliOpts.out || config.out || './design-extract-output',
    tokensLegacy: cliOpts.tokensLegacy || config.tokensLegacy || false,
  };
}
