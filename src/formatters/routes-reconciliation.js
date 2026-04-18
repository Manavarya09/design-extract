// Shared-vs-per-route reconciliation for multi-page token extraction.
// Input: [{ url, path, tokens: DTCG-shaped { primitive, semantic, ... } }]
// Output: { shared, perRoute: { <slug>: { added, changed } }, summary }
//
// "Shared" = a token path present with the same $value in ALL routes.
// "Added"  = a token path present on this route but missing from the shared set.
// "Changed"= a token path present in shared but with a different $value here.

export function slugForPath(p) {
  if (!p || p === '/' || p === '') return 'index';
  return String(p)
    .replace(/^\/+|\/+$/g, '')
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase() || 'index';
}

function isLeaf(node) {
  return node && typeof node === 'object' && '$value' in node;
}

// Walk a DTCG tree and produce a flat map of dotted-path -> serialized $value.
function flattenTokens(tree, prefix = '', out = {}) {
  if (!tree || typeof tree !== 'object') return out;
  if (isLeaf(tree)) {
    out[prefix] = JSON.stringify(tree.$value);
    return out;
  }
  for (const [k, v] of Object.entries(tree)) {
    if (k.startsWith('$')) continue;
    const p = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object') flattenTokens(v, p, out);
  }
  return out;
}

// Set a dotted-path key to a (JSON-parsed) value on a nested object (leaf as DTCG $value).
function setPath(root, dotted, jsonVal) {
  const parts = dotted.split('.');
  let cur = root;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    if (!cur[p] || typeof cur[p] !== 'object') cur[p] = {};
    cur = cur[p];
  }
  cur[parts[parts.length - 1]] = { $value: JSON.parse(jsonVal) };
}

export function reconcileRoutes(routes) {
  const safeRoutes = Array.isArray(routes) ? routes.filter(r => r && r.tokens) : [];
  if (safeRoutes.length === 0) {
    return {
      shared: {},
      perRoute: {},
      summary: { routeCount: 0, sharedTokenCount: 0, totalUnique: 0, drift: [] },
    };
  }

  // Flatten each route's tokens (combining primitive + semantic trees).
  const flat = safeRoutes.map(r => {
    const merged = {};
    flattenTokens(r.tokens.primitive || {}, 'primitive', merged);
    flattenTokens(r.tokens.semantic || {}, 'semantic', merged);
    return { route: r, flat: merged };
  });

  // Build shared set: paths present across ALL routes with identical serialized value.
  const firstKeys = Object.keys(flat[0].flat);
  const sharedFlat = {};
  for (const key of firstKeys) {
    const v = flat[0].flat[key];
    const allAgree = flat.every(f => f.flat[key] === v);
    if (allAgree) sharedFlat[key] = v;
  }

  // Rebuild shared as DTCG tree.
  const shared = {};
  for (const [k, v] of Object.entries(sharedFlat)) setPath(shared, k, v);

  // Per-route deltas.
  const perRoute = {};
  const usedSlugs = new Map();
  const drift = [];
  for (const { route, flat: f } of flat) {
    let slug = slugForPath(route.path);
    // Slug collision resolution.
    if (usedSlugs.has(slug)) {
      const n = usedSlugs.get(slug) + 1;
      usedSlugs.set(slug, n);
      slug = `${slug}-${n}`;
    } else {
      usedSlugs.set(slug, 1);
    }

    const added = {};
    const changed = {};
    for (const [k, v] of Object.entries(f)) {
      if (!(k in sharedFlat)) {
        // Not shared at all — either unique to this route or conflicts across routes.
        // If the key exists in another route with a different value, it's a "changed" vs shared is not applicable;
        // we classify as added when the token is absent from sharedFlat entirely.
        const existsInOthers = flat.some(o => o.flat !== f && (k in o.flat));
        if (!existsInOthers) {
          setPath(added, k, v);
        } else {
          // Present in multiple routes but disagreeing values -> changed relative to the shared baseline.
          setPath(changed, k, v);
          drift.push({ path: route.path, token: k, value: JSON.parse(v) });
        }
      }
    }
    perRoute[slug] = { url: route.url, path: route.path, added, changed };
  }

  const allKeys = new Set();
  for (const f of flat) for (const k of Object.keys(f.flat)) allKeys.add(k);

  return {
    shared,
    perRoute,
    summary: {
      routeCount: safeRoutes.length,
      sharedTokenCount: Object.keys(sharedFlat).length,
      totalUnique: allKeys.size,
      drift,
    },
  };
}

export function formatRoutesReport(reconciled) {
  const { summary, perRoute } = reconciled;
  const lines = [];
  lines.push('# Multi-route Token Reconciliation');
  lines.push('');
  lines.push(`- Routes crawled: **${summary.routeCount}**`);
  lines.push(`- Shared tokens: **${summary.sharedTokenCount}**`);
  lines.push(`- Total unique tokens across routes: **${summary.totalUnique}**`);
  lines.push(`- Cross-route drift entries: **${summary.drift.length}**`);
  lines.push('');
  lines.push('## Per-route contributions');
  for (const [slug, entry] of Object.entries(perRoute)) {
    const addedCount = countLeaves(entry.added);
    const changedCount = countLeaves(entry.changed);
    lines.push(`- \`${entry.path}\` (${slug}): ${addedCount} added, ${changedCount} changed`);
  }
  return lines.join('\n') + '\n';
}

function countLeaves(tree) {
  let n = 0;
  const walk = (node) => {
    if (!node || typeof node !== 'object') return;
    if (isLeaf(node)) { n++; return; }
    for (const [k, v] of Object.entries(node)) {
      if (!k.startsWith('$')) walk(v);
    }
  };
  walk(tree);
  return n;
}
