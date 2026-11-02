// Vercel Blob-backed cache for extraction payloads.
//
// TTL: 24h, enforced on read by checking `generatedAt` in the stored payload.
// Key: normalized URL → SHA-256 hex.
// Gracefully no-ops when BLOB_READ_WRITE_TOKEN is absent (local dev).

import { createHash } from 'node:crypto';
import { readBlobJson } from './blob-json.js';

const TTL_MS = 24 * 60 * 60 * 1000;
let warnedMissingToken = false;

export function cacheKey(url) {
  const normalized = String(url).trim().toLowerCase();
  return createHash('sha256').update(normalized).digest('hex');
}

function hasBlob() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    if (!warnedMissingToken) {
      console.log('[cache] BLOB_READ_WRITE_TOKEN not set — skipping cache');
      warnedMissingToken = true;
    }
    return false;
  }
  return true;
}

function blobPath(key) {
  return `extract-cache/${key}.json`;
}

export async function getCached(key) {
  if (!hasBlob()) return null;
  try {
    const payload = await readBlobJson(blobPath(key));
    if (!payload) return null;

    const generatedAt = typeof payload?.generatedAt === 'number' ? payload.generatedAt : 0;
    if (Date.now() - generatedAt > TTL_MS) return null;
    if (!payload?.design) return null;
    return { design: payload.design };
  } catch (err) {
    console.error('[cache] read failed', err?.message);
    return null;
  }
}

export async function putCached(key, { design }) {
  if (!hasBlob()) return;
  try {
    const { put } = await import('@vercel/blob');
    const payload = {
      generatedAt: Date.now(),
      expiresAt: Date.now() + TTL_MS,
      design,
    };
    await put(blobPath(key), JSON.stringify(payload), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true,
    });
  } catch (err) {
    console.error('[cache] write failed', err?.message);
  }
}

// ─── Public permalink helpers — used by /x/[hash] and /gallery ───
//
// Permalinks are forever (well, 24h while the Blob entry exists). The page
// re-derives files from the cached `design` object on each request — same
// pipeline the streaming /api/extract uses on a cache hit.

export async function getCachedByHash(hash) {
  if (!/^[a-f0-9]{64}$/.test(hash)) return null;
  const cached = await getCached(hash);
  return cached;
}

export async function listRecent(limit = 24) {
  if (!hasBlob()) return [];
  try {
    const { list } = await import('@vercel/blob');
    // Pull more than we need so we can drop expired ones.
    const result = await list({ prefix: 'extract-cache/', limit: limit * 2 });
    const entries = await Promise.all(
      (result.blobs || [])
        .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
        .slice(0, limit * 2)
        .map(async (blob) => {
          try {
            const m = blob.pathname.match(/^extract-cache\/([a-f0-9]{64})\.json$/);
            if (!m) return null;
            const res = await fetch(blob.url, { cache: 'no-store' });
            if (!res.ok) return null;
            const payload = await res.json();
            const generatedAt = typeof payload?.generatedAt === 'number' ? payload.generatedAt : 0;
            if (Date.now() - generatedAt > TTL_MS) return null;
            const design = payload?.design;
            if (!design) return null;
            return {
              hash: m[1],
              url: design.meta?.url || '',
              title: design.meta?.title || '',
              generatedAt,
              colors: design.colors?.all?.length ?? 0,
              primary: design.colors?.primary?.hex || null,
              secondary: design.colors?.secondary?.hex || null,
              accent: design.colors?.accent?.hex || null,
              foreground: design.colors?.text?.[0] || null,
              background: design.colors?.backgrounds?.[0] || null,
              fontFamily: design.typography?.families?.[0]?.name || null,
              intent: design.pageIntent?.type || null,
              material: design.materialLanguage?.label || null,
              library: design.componentLibrary?.library || null,
              score: design.score?.overall ?? null,
              grade: design.score?.grade ?? null,
            };
          } catch { return null; }
        })
    );
    return entries.filter(Boolean).slice(0, limit);
  } catch (err) {
    console.error('[cache] listRecent failed', err?.message);
    return [];
  }
}
