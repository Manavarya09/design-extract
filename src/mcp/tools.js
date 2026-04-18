// MCP tools builder. Pure/testable — returns { list, call } over the
// loaded design + tokens. No transport concerns here.

import { remediateFailingPairs } from '../extractors/a11y-remediation.js';

function rpcError(code, message) {
  const e = new Error(message);
  e.code = code;
  return e;
}

// Flatten a DTCG token tree to [{ path, $type, $value }] leaves.
function flattenTokens(tree, prefix, out) {
  if (tree == null || typeof tree !== 'object') return;
  if ('$value' in tree) {
    out.push({ path: prefix, $type: tree.$type, $value: tree.$value });
    return;
  }
  for (const key of Object.keys(tree)) {
    const next = prefix ? `${prefix}.${key}` : key;
    flattenTokens(tree[key], next, out);
  }
}

function paletteHexes(design) {
  const all = design?.colors?.all || [];
  const out = [];
  for (const entry of all) {
    if (!entry) continue;
    if (typeof entry === 'string') out.push(entry);
    else if (typeof entry === 'object' && typeof entry.hex === 'string') out.push(entry.hex);
  }
  return out;
}

const TOOL_DEFS = [
  {
    name: 'search_tokens',
    description: 'Case-insensitive substring match over all token dot-paths.',
    inputSchema: {
      type: 'object',
      properties: { query: { type: 'string', description: 'substring to search for' } },
      required: ['query'],
    },
  },
  {
    name: 'find_nearest_color',
    description: 'Find the nearest palette color that passes the requested WCAG contrast rule against the given hex.',
    inputSchema: {
      type: 'object',
      properties: {
        hex: { type: 'string', description: 'background hex (e.g. #ffffff)' },
        level: { type: 'string', enum: ['AA-normal', 'AA-large', 'AAA-normal', 'AAA-large'] },
      },
      required: ['hex', 'level'],
    },
  },
  {
    name: 'get_region',
    description: 'Return the region with the given role (e.g. hero, nav, footer).',
    inputSchema: {
      type: 'object',
      properties: { name: { type: 'string' } },
      required: ['name'],
    },
  },
  {
    name: 'get_component',
    description: 'Return the component cluster with matching kind, optionally narrowed to a variant index.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        variant: { type: 'number' },
      },
      required: ['name'],
    },
  },
  {
    name: 'list_failing_contrast_pairs',
    description: 'Return the accessibility remediation array (failing fg/bg pairs with suggestions).',
    inputSchema: { type: 'object', properties: {} },
  },
];

export function buildTools({ design, tokens }) {
  // Pre-flatten for search.
  const flat = [];
  flattenTokens(tokens?.primitive, 'primitive', flat);
  flattenTokens(tokens?.semantic, 'semantic', flat);

  async function searchTokens(args) {
    if (!args || typeof args.query !== 'string') throw rpcError(-32602, 'search_tokens: query must be a string');
    const q = args.query.toLowerCase();
    const matches = flat.filter(t => t.path.toLowerCase().includes(q));
    return { matches };
  }

  async function findNearestColor(args) {
    if (!args || typeof args.hex !== 'string') throw rpcError(-32602, 'find_nearest_color: hex must be a string');
    const validLevels = new Set(['AA-normal', 'AA-large', 'AAA-normal', 'AAA-large']);
    if (!validLevels.has(args.level)) throw rpcError(-32602, 'find_nearest_color: level must be one of AA-normal|AA-large|AAA-normal|AAA-large');
    const palette = paletteHexes(design);
    const [res] = remediateFailingPairs(
      [{ fg: '#000000', bg: args.hex, ratio: 0, rule: args.level }],
      palette,
    );
    if (!res?.suggestion) return { color: null, newRatio: null };
    return { color: res.suggestion.color, newRatio: res.suggestion.newRatio, replace: res.suggestion.replace };
  }

  async function getRegion(args) {
    if (!args || typeof args.name !== 'string') throw rpcError(-32602, 'get_region: name must be a string');
    const regions = design?.regions || [];
    return regions.find(r => r && (r.role === args.name || r.name === args.name)) || null;
  }

  async function getComponent(args) {
    if (!args || typeof args.name !== 'string') throw rpcError(-32602, 'get_component: name must be a string');
    const clusters = design?.componentClusters || [];
    const found = clusters.find(c => c && c.kind === args.name);
    if (!found) return null;
    if (typeof args.variant === 'number' && Array.isArray(found.variants)) {
      return found.variants[args.variant] ?? null;
    }
    return found;
  }

  async function listFailing() {
    return design?.accessibility?.remediation || [];
  }

  const dispatch = {
    search_tokens: searchTokens,
    find_nearest_color: findNearestColor,
    get_region: getRegion,
    get_component: getComponent,
    list_failing_contrast_pairs: listFailing,
  };

  return {
    list() { return TOOL_DEFS.slice(); },
    async call(name, args) {
      const fn = dispatch[name];
      if (!fn) throw rpcError(-32602, `Unknown tool: ${name}`);
      return await fn(args || {});
    },
  };
}
