// Per-key in-memory rate limiter.
//
// Vercel Fluid Compute reuses function instances across concurrent requests
// within a region, so this Map is *per-instance*, not global. An attacker can
// spread requests across regions to bypass it — that's acceptable for Wave 2
// because we pair this at the middleware layer with Vercel BotID (out of scope
// for PR B). The per-instance bound still blunts accidental hammering.

const hits = new Map();

export function checkRate(key, { limit = 3, windowMs = 24 * 60 * 60 * 1000 } = {}) {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now - entry.firstAt >= windowMs) {
    hits.set(key, { count: 1, firstAt: now });
    return { allowed: true, remaining: Math.max(0, limit - 1), resetAt: now + windowMs };
  }

  entry.count += 1;
  const resetAt = entry.firstAt + windowMs;
  const allowed = entry.count <= limit;
  const remaining = Math.max(0, limit - entry.count);
  return { allowed, remaining, resetAt };
}

// Test-only: wipe state. Safe to call from production code — no-op effect.
export function _resetRateLimit() {
  hits.clear();
}

// ─── Blob-backed persistent rate limiter ─────────────────────
//
// The in-memory limiter above resets on every cold start, so on Vercel Fluid
// it doesn't actually bound traffic. checkRateBlob persists per-key state in
// Vercel Blob (already used for the extraction cache), giving a real
// cross-instance counter without adding Upstash/KV.
//
// Layout: ratelimit/{sha256(key)}.json containing { count, firstAt }.
// Cost: a few hundred bytes per IP per day. Negligible.

import { createHash } from 'node:crypto';
import { readBlobJson } from './blob-json.js';

function rlPath(key) {
  return `ratelimit/${createHash('sha256').update(String(key)).digest('hex')}.json`;
}

async function readCounter(path) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  try {
    return await readBlobJson(path, { fresh: true });
  } catch { return null; }
}

async function writeBlobJson(path, payload) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return;
  try {
    const { put } = await import('@vercel/blob');
    await put(path, JSON.stringify(payload), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true,
    });
  } catch { /* swallow — better to allow than 500 on Blob outage */ }
}

export async function checkRateBlob(
  key,
  { limit = 1, windowMs = 24 * 60 * 60 * 1000 } = {}
) {
  const now = Date.now();
  const path = rlPath(key);

  // No Blob configured (local dev) → permissive fallback.
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs, persistent: false };
  }

  const entry = await readCounter(path);

  if (!entry || typeof entry.firstAt !== 'number' || now - entry.firstAt >= windowMs) {
    await writeBlobJson(path, { count: 1, firstAt: now });
    return { allowed: true, remaining: Math.max(0, limit - 1), resetAt: now + windowMs, persistent: true };
  }

  const newCount = (entry.count || 0) + 1;
  const resetAt = entry.firstAt + windowMs;
  const allowed = newCount <= limit;

  // Only write back if we're allowing — denies don't need state updates.
  if (allowed) {
    await writeBlobJson(path, { count: newCount, firstAt: entry.firstAt });
  }

  return {
    allowed,
    remaining: Math.max(0, limit - newCount),
    resetAt,
    persistent: true,
  };
}

// Site-wide budget for reads that launch a browser (extract, motion, studio).
// The per-IP limit doesn't bound the total, and every live read costs Vercel
// CPU: the Hobby allowance ran out on 2026-11-02 and paused the account. The
// in-memory check comes first so the cap still holds when Blob is unavailable.
export const LIVE_READS_PER_DAY = 20;

export async function checkLiveReadBudget() {
  const mem = checkRate('live-reads:all', { limit: LIVE_READS_PER_DAY });
  if (!mem.allowed) return mem;
  return checkRateBlob('live-reads:all', { limit: LIVE_READS_PER_DAY });
}
