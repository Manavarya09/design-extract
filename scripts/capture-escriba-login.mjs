#!/usr/bin/env node
// Capture a Playwright storageState.json for an authenticated app, so designlang
// can extract design tokens from pages behind a login.
//
// Usage:
//   ESCRIBA_USER=admin2 ESCRIBA_PASS=admin1234 \
//     node scripts/capture-escriba-login.mjs
//
// Then run:
//   npx designlang http://localhost:8080 --full --pages 5 \
//     --cookie-file ./storageState.json --insecure --out ./escriba-legal-design

import { chromium } from 'playwright';
import { writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const BASE_URL = process.env.ESCRIBA_URL || 'http://localhost:8080';
const LOGIN_PATH = process.env.ESCRIBA_LOGIN_PATH || '/login';
const USERNAME = process.env.ESCRIBA_USER || 'admin2';
const PASSWORD = process.env.ESCRIBA_PASS || 'admin1234';
const OUT_PATH = resolve(process.env.STORAGE_STATE_PATH || './storageState.json');
const HEADFUL = process.env.HEADFUL === '1';

const USER_SELECTORS = [
  'input[name="username"]',
  'input[name="user"]',
  'input[name="email"]',
  'input[type="email"]',
  'input[autocomplete="username"]',
  'input[type="text"]:not([type="hidden"])',
];
const PASS_SELECTORS = [
  'input[name="password"]',
  'input[autocomplete="current-password"]',
  'input[type="password"]',
];
const SUBMIT_SELECTORS = [
  'button[type="submit"]',
  'input[type="submit"]',
  'button:has-text("Entrar")',
  'button:has-text("Login")',
  'button:has-text("Sign in")',
  'button:has-text("Acessar")',
];

async function fillFirst(page, selectors, value, label) {
  for (const sel of selectors) {
    const loc = page.locator(sel).first();
    if (await loc.count()) {
      await loc.fill(value);
      console.log(`  filled ${label} via ${sel}`);
      return;
    }
  }
  throw new Error(`could not find ${label} field; tried: ${selectors.join(', ')}`);
}

async function clickFirst(page, selectors) {
  for (const sel of selectors) {
    const loc = page.locator(sel).first();
    if (await loc.count()) {
      await loc.click();
      console.log(`  submitted via ${sel}`);
      return true;
    }
  }
  return false;
}

async function main() {
  const loginUrl = new URL(LOGIN_PATH, BASE_URL).toString();
  console.log(`→ launching chromium (headful=${HEADFUL})`);
  const browser = await chromium.launch({ headless: !HEADFUL });
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await context.newPage();

  try {
    console.log(`→ goto ${loginUrl}`);
    await page.goto(loginUrl, { waitUntil: 'domcontentloaded', timeout: 20_000 });

    await fillFirst(page, USER_SELECTORS, USERNAME, 'username');
    await fillFirst(page, PASS_SELECTORS, PASSWORD, 'password');

    const clicked = await clickFirst(page, SUBMIT_SELECTORS);
    if (!clicked) {
      console.log('  no submit button matched; pressing Enter on password field');
      await page.locator(PASS_SELECTORS.join(', ')).first().press('Enter');
    }

    console.log('→ waiting for navigation away from login route');
    await page.waitForURL(
      (url) => !url.pathname.replace(/\/$/, '').endsWith(LOGIN_PATH.replace(/\/$/, '')),
      { timeout: 15_000 },
    );

    const state = await context.storageState();
    if (!state.cookies?.length) {
      throw new Error('login appeared to succeed but no cookies were set');
    }
    writeFileSync(OUT_PATH, JSON.stringify(state, null, 2));
    console.log(`✓ wrote ${OUT_PATH} with ${state.cookies.length} cookie(s)`);
    console.log(`  domains: ${[...new Set(state.cookies.map((c) => c.domain))].join(', ')}`);
  } catch (err) {
    const shotPath = resolve('./login-failure.png');
    try {
      await page.screenshot({ path: shotPath, fullPage: true });
      console.error(`✗ login failed; screenshot saved to ${shotPath}`);
    } catch {}
    console.error(`  current url: ${page.url()}`);
    console.error(`  error: ${err.message}`);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

if (existsSync(OUT_PATH) && process.env.FORCE !== '1') {
  console.log(`! ${OUT_PATH} already exists. Set FORCE=1 to overwrite.`);
  process.exit(0);
}

await main();
