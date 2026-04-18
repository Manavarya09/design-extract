// Thin stdio MCP server glue. Loads the latest extraction from the given
// output directory and wires buildResources + buildTools into the SDK.

import { existsSync, readdirSync, readFileSync, statSync } from 'fs';
import { join, resolve } from 'path';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { buildResources } from './resources.js';
import { buildTools } from './tools.js';

// Best-effort reconstruction of a design object from the files on disk.
// We only need what the tools/resources consume: tokens + regions +
// componentClusters + accessibility.remediation + cssHealth + colors.all.
function loadExtraction(outputDir) {
  if (!existsSync(outputDir)) return null;
  const entries = readdirSync(outputDir);
  const tokenFiles = entries
    .filter((f) => f.endsWith('-design-tokens.json'))
    .map((f) => {
      const p = join(outputDir, f);
      return { path: p, mtime: statSync(p).mtimeMs, prefix: f.replace(/-design-tokens\.json$/, '') };
    })
    .sort((a, b) => b.mtime - a.mtime);

  if (!tokenFiles.length) return null;
  const latest = tokenFiles[0];

  let tokens;
  try { tokens = JSON.parse(readFileSync(latest.path, 'utf-8')); } catch { return null; }

  // Legacy (pre-v7) tokens don't have primitive/semantic. Skip silently.
  if (!tokens?.primitive || !tokens?.semantic) {
    return { tokens: null, design: {} };
  }

  // Load the MCP companion written at extraction time (`*-mcp.json`).
  // Falls back to empty shape if absent — older extractions stay usable for
  // token resources/tools even without regions/components/health.
  const companionPath = join(outputDir, `${latest.prefix}-mcp.json`);
  let companion = null;
  if (existsSync(companionPath)) {
    try { companion = JSON.parse(readFileSync(companionPath, 'utf-8')); } catch { /* ignore */ }
  }

  const design = {
    colors: { all: companion?.colors?.all || [] },
    regions: companion?.regions || [],
    componentClusters: companion?.componentClusters || [],
    accessibility: { remediation: companion?.accessibility?.remediation || [] },
    cssHealth: companion?.cssHealth ?? null,
  };

  return { tokens, design };
}

export async function run({ outputDir }) {
  const resolved = resolve(outputDir || './design-extract-output');
  const loaded = loadExtraction(resolved);
  const tokens = loaded?.tokens ?? null;
  const design = loaded?.design ?? {};

  const resources = buildResources({ design, tokens });
  const tools = buildTools({ design, tokens });

  const server = new Server(
    { name: 'designlang', version: '7.0.0' },
    { capabilities: { resources: {}, tools: {} } },
  );

  server.setRequestHandler(ListResourcesRequestSchema, async () => ({
    resources: tokens ? resources.list() : [],
  }));

  server.setRequestHandler(ReadResourceRequestSchema, async (req) => {
    if (!tokens) throw Object.assign(new Error('no extraction loaded'), { code: -32002 });
    const { uri } = req.params;
    const r = resources.read(uri);
    return { contents: [r] };
  });

  server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: tools.list() }));

  server.setRequestHandler(CallToolRequestSchema, async (req) => {
    if (!tokens) {
      return {
        isError: true,
        content: [{ type: 'text', text: 'no extraction loaded' }],
      };
    }
    const { name, arguments: args } = req.params;
    try {
      const result = await tools.call(name, args);
      return { content: [{ type: 'text', text: JSON.stringify(result) }] };
    } catch (err) {
      return {
        isError: true,
        content: [{ type: 'text', text: err?.message || String(err) }],
      };
    }
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
}
