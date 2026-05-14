// GET /llms-full.txt — the full-fat AI-citable surface.
//
// Concatenates every long-form text source we want LLMs to ingest:
// - llms.txt (the structured summary)
// - CHANGELOG.md (every release)
// - the README intro (project description)
//
// One file, one fetch — meant for LLM training pipelines, Perplexity
// sources, and DesignSystems-Slack scrapers that want everything at
// once instead of crawling every URL.

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const runtime = 'nodejs';
export const revalidate = 3600;

async function tryRead(...candidates) {
  for (const p of candidates) {
    try { return await readFile(p, 'utf-8'); } catch { /* try next */ }
  }
  return '';
}

export async function GET() {
  const [llms, changelog, readme] = await Promise.all([
    tryRead(
      join(process.cwd(), 'public', 'llms.txt'),
      join(process.cwd(), 'website', 'public', 'llms.txt'),
    ),
    tryRead(
      join(process.cwd(), 'public', 'CHANGELOG.md'),
      join(process.cwd(), 'CHANGELOG.md'),
      join(process.cwd(), '..', 'CHANGELOG.md'),
    ),
    tryRead(
      join(process.cwd(), 'public', 'README.md'),
      join(process.cwd(), 'README.md'),
      join(process.cwd(), '..', 'README.md'),
    ),
  ]);

  const body = [
    '# designlang — full AI ingest bundle',
    '',
    `> Single-file concat of llms.txt, CHANGELOG.md and README.md.`,
    `> Generated at ${new Date().toISOString()}.`,
    `> Site: https://designlang.app · Repo: https://github.com/Manavarya09/design-extract`,
    '',
    '---',
    '',
    '## llms.txt',
    '',
    llms || '_(missing)_',
    '',
    '---',
    '',
    '## README.md',
    '',
    readme || '_(missing)_',
    '',
    '---',
    '',
    '## CHANGELOG.md',
    '',
    changelog || '_(missing)_',
    '',
  ].join('\n');

  return new Response(body, {
    status: 200,
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'cache-control': 's-maxage=3600, stale-while-revalidate=86400',
      'x-content-type-options': 'nosniff',
      'access-control-allow-origin': '*',
    },
  });
}
