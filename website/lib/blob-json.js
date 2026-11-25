// Read a JSON blob by pathname without calling list().
//
// list() is a Blob "advanced operation" with a small Hobby allowance; every
// cache, rate-limit and replay read used to call it, which used up the quota
// and blocked Blob. get() fetches the blob's URL directly. `fresh` skips the
// CDN copy for data that changes between reads (rate-limit counters).
export async function readBlobJson(pathname, { fresh = false } = {}) {
  const { get } = await import('@vercel/blob');
  const result = await get(pathname, { access: 'public', ...(fresh && { useCache: false }) });
  if (!result?.stream) return null;
  return new Response(result.stream).json();
}
