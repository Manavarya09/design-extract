// Browser-friendly DTCG helpers — mirrors src/formatters/_token-ref.js contract.
// resolveRef: follow {ref} chains, guard cycles.
// flattenTokens: walk primitive.*/semantic.* into a flat row list.

const REF_PATTERN = /^\{([^}]+)\}$/;

function parseRef(value) {
  if (typeof value !== 'string') return null;
  const m = value.match(REF_PATTERN);
  return m ? m[1] : null;
}

function getAtPath(tokens, path) {
  const parts = path.split('.');
  let node = tokens;
  for (const part of parts) {
    if (node == null || typeof node !== 'object') return undefined;
    node = node[part];
  }
  return node;
}

export function resolveRef(tokens, pathOrRefString, seen = new Set()) {
  if (pathOrRefString == null) return undefined;
  const refPath = parseRef(pathOrRefString);
  const path = refPath != null ? refPath : String(pathOrRefString);
  if (seen.has(path)) return undefined;
  seen.add(path);

  const node = getAtPath(tokens, path);
  if (node == null) return undefined;

  if (typeof node === 'object' && '$value' in node) {
    const inner = node.$value;
    const innerRef = parseRef(inner);
    if (innerRef) return resolveRef(tokens, innerRef, seen);
    return inner;
  }

  const innerRef = parseRef(node);
  if (innerRef) return resolveRef(tokens, innerRef, seen);

  return node;
}

// Walk a DTCG subtree and collect every leaf token (one with $value).
function walk(node, prefix, out, layer) {
  if (node == null || typeof node !== 'object') return;
  if ('$value' in node) {
    out.push({ layer, path: prefix, $type: node.$type, $value: node.$value });
    return;
  }
  for (const key of Object.keys(node)) {
    if (key.startsWith('$')) continue;
    const next = prefix ? `${prefix}.${key}` : key;
    walk(node[key], next, out, layer);
  }
}

export function flattenTokens(tokens, opts = { layer: 'all' }) {
  const layer = opts.layer || 'all';
  const rows = [];
  if (layer === 'primitive' || layer === 'all') {
    walk(tokens.primitive, 'primitive', rows, 'primitive');
  }
  if (layer === 'semantic' || layer === 'all') {
    walk(tokens.semantic, 'semantic', rows, 'semantic');
  }
  return rows;
}
