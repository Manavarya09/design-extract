// Theatre reels — record the live screencast once, replay it forever.
//
// A fresh extraction is the only time a real browser runs. We capture its
// frames into a "reel" and persist it to Blob keyed by the same URL hash the
// design cache uses. Cached runs then REPLAY the reel (frames merged with the
// token paint, timed) so /watch and /x/<hash> still look live without paying
// for another browser.
//
// Storage is best-effort and degrades to no-op without a Blob token (local dev).

import { frameEvent } from './theatre.js';
import { readBlobJson } from './blob-json.js';

const TTL_MS = 24 * 60 * 60 * 1000;
const MAX_REEL_FRAMES = 150; // bound the stored payload size

function hasBlob() {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

function reelPath(hash) {
  return `theatre-reel/${hash}.json`;
}

/**
 * Persist a reel of captured frames for a URL hash. Best-effort.
 * @param {string} hash
 * @param {Array<{seq:number,t:number,data:string,w?:number,h?:number}>} frames
 */
export async function recordReel(hash, frames) {
  if (!hasBlob() || !Array.isArray(frames) || frames.length === 0) return;
  try {
    const { put } = await import('@vercel/blob');
    const trimmed = capFrames(frames, MAX_REEL_FRAMES);
    const payload = {
      generatedAt: Date.now(),
      durationMs: trimmed.length ? trimmed[trimmed.length - 1].t : 0,
      frameCount: trimmed.length,
      frames: trimmed,
    };
    await put(reelPath(hash), JSON.stringify(payload), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true,
    });
  } catch (err) {
    console.error('[reel] write failed', err?.message);
  }
}

/**
 * Load a reel's frames for a URL hash, or null if none / expired.
 * @param {string} hash
 * @returns {Promise<null|{frames:Array, durationMs:number}>}
 */
export async function loadReel(hash) {
  if (!hasBlob() || !/^[a-f0-9]{64}$/.test(hash)) return null;
  try {
    const payload = await readBlobJson(reelPath(hash));
    if (!payload) return null;
    if (Date.now() - (payload?.generatedAt || 0) > TTL_MS) return null;
    if (!Array.isArray(payload?.frames) || payload.frames.length === 0) return null;
    return { frames: payload.frames, durationMs: payload.durationMs || 0 };
  } catch (err) {
    console.error('[reel] read failed', err?.message);
    return null;
  }
}

// Evenly subsample frames down to a cap, always keeping the first and last so
// the reel still spans the full load.
export function capFrames(frames, cap) {
  if (frames.length <= cap) return frames;
  const step = frames.length / cap;
  const out = [];
  for (let i = 0; i < cap; i++) out.push(frames[Math.floor(i * step)]);
  out[out.length - 1] = frames[frames.length - 1];
  return out;
}

/**
 * Merge captured frames with the token paint into a single, sorted, delay-
 * annotated timeline a replayer can stream. Pure — no Blob, no clock.
 *
 * Frames keep their real `t`. Stages land in the first third, tokens spread
 * across most of the span so the system rail fills while the browser plays.
 * The whole thing is optionally compressed to `maxDurationMs` so a cached hit
 * doesn't tie the function up for the full original capture length.
 *
 * @returns {{steps:Array<{delayMs:number,event:object}>, durationMs:number}}
 */
export function buildReplayTimeline({
  frames = [],
  tokens = [],
  stages = [],
  summary,
  files,
  maxDurationMs = 12_000,
} = {}) {
  const rawSpan = frames.length
    ? Math.max(...frames.map((f) => f.t || 0))
    : Math.max(tokens.length * 40, 1);
  const factor = rawSpan > maxDurationMs ? maxDurationMs / rawSpan : 1;
  const at = (t) => Math.round(t * factor);

  const timed = [];
  for (const f of frames) {
    timed.push({ t: at(f.t || 0), event: frameEvent(f) });
  }
  stages.forEach((name, i) => {
    const frac = stages.length > 1 ? i / (stages.length - 1) : 0;
    timed.push({ t: Math.round(rawSpan * factor * 0.3 * frac), event: { type: 'stage', name } });
  });
  tokens.forEach((tok, i) => {
    const frac = tokens.length > 1 ? i / (tokens.length - 1) : 0;
    timed.push({ t: Math.round(rawSpan * factor * (0.15 + 0.8 * frac)), event: { type: 'token', ...tok } });
  });

  timed.sort((a, b) => a.t - b.t);

  const steps = [];
  let prev = 0;
  for (const { t, event } of timed) {
    steps.push({ delayMs: Math.max(0, t - prev), event });
    prev = t;
  }
  if (summary !== undefined) steps.push({ delayMs: 30, event: { type: 'summary', summary } });
  if (files !== undefined) steps.push({ delayMs: 30, event: { type: 'files', files } });

  return { steps, durationMs: prev };
}
