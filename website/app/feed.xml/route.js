// GET /feed.xml — Atom feed for the changelog + the drift leaderboard.
// Designed for AI search engines and DesignSystems-Slack scrapers as much
// as for human RSS readers.

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const runtime = 'nodejs';
export const revalidate = 3600;

const SITE = 'https://designlang.app';

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function loadChangelog() {
  const candidates = [
    join(process.cwd(), 'public', 'CHANGELOG.md'),
    join(process.cwd(), 'CHANGELOG.md'),
    join(process.cwd(), '..', 'CHANGELOG.md'),
  ];
  for (const p of candidates) {
    try { return await readFile(p, 'utf-8'); } catch { /* try next */ }
  }
  return '';
}

// Parse out the top-level "## [version] — date" headings into entries.
function parseChangelog(md) {
  const lines = md.split('\n');
  const entries = [];
  let cur = null;
  let buf = [];
  for (const line of lines) {
    const m = line.match(/^##\s+\[?([^\]\s]+)\]?\s+—\s+(\d{4}-\d{2}-\d{2})/);
    if (m) {
      if (cur) { cur.body = buf.join('\n').trim(); entries.push(cur); }
      cur = { version: m[1], date: m[2] };
      buf = [];
    } else if (cur) {
      buf.push(line);
    }
  }
  if (cur) { cur.body = buf.join('\n').trim(); entries.push(cur); }
  return entries.slice(0, 30); // most recent 30
}

export async function GET() {
  const md = await loadChangelog();
  const entries = parseChangelog(md);

  const updated = entries[0]?.date
    ? new Date(entries[0].date + 'T00:00:00Z').toISOString()
    : new Date().toISOString();

  const items = entries.map((e) => {
    const isoDate = new Date(e.date + 'T00:00:00Z').toISOString();
    const id = `${SITE}/changelog#${e.version}`;
    const summary = e.body.split('\n').slice(0, 6).join('\n').slice(0, 600);
    return `
  <entry>
    <id>${esc(id)}</id>
    <title>designlang ${esc(e.version)}</title>
    <link href="${esc(id)}"/>
    <updated>${isoDate}</updated>
    <published>${isoDate}</published>
    <author><name>Manav Arya Singh</name><uri>https://manavaryasingh.com</uri></author>
    <summary type="text">${esc(summary)}</summary>
  </entry>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>designlang — releases</title>
  <subtitle>Every release of designlang. Brand-book PDF, MCP server, motion tokens, multi-platform emitters.</subtitle>
  <link href="${SITE}/feed.xml" rel="self"/>
  <link href="${SITE}/changelog"/>
  <id>${SITE}/feed.xml</id>
  <updated>${updated}</updated>
  <author><name>Manav Arya Singh</name></author>
  <generator uri="${SITE}">designlang.app</generator>${items}
</feed>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'content-type': 'application/atom+xml; charset=utf-8',
      'cache-control': 's-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
