// Where verify-ui gets the brand: a local DESIGN.md / DTCG / brand JSON file,
// or a confirmed brand file on designlang (its id, read with the brand token
// in DESIGNLANG_BRAND_TOKEN).

import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { parseBrand } from '../slop/brand.js';

const ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function loadBrand(spec, { env = process.env, fetchImpl = fetch } = {}) {
  if (!spec) throw new Error('Pass a brand: a DESIGN.md or tokens file, or your brand id from designlang.app/brand.');
  if (ID.test(spec) && !existsSync(spec)) {
    const token = env.DESIGNLANG_BRAND_TOKEN;
    if (!token) throw new Error('Set DESIGNLANG_BRAND_TOKEN to the token shown when you confirmed your brand.');
    const base = (env.DESIGNLANG_API || 'https://api.designlang.app').replace(/\/$/, '');
    const res = await fetchImpl(`${base}/api/brand/${spec}/tokens.json`, { headers: { authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error(res.status === 404 ? 'Brand not found, not confirmed yet, or the token does not match it.' : `Could not load the brand (HTTP ${res.status}).`);
    return parseBrand(await res.text(), 'tokens.json');
  }
  const path = resolve(spec);
  return parseBrand(readFileSync(path, 'utf-8'), path);
}
