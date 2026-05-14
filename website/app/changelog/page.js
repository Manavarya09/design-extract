import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const revalidate = 3600;

export const metadata = {
  title: 'Changelog — designlang',
  description:
    'Every release of designlang. Brand-book PDF, MCP server, motion tokens, multi-platform emitters, CSS health audit — version by version.',
  alternates: { canonical: 'https://designlang.app/changelog' },
  openGraph: { title: 'designlang changelog', description: 'Every release of designlang, version by version.' },
};

// Tiny Markdown renderer: enough for what CHANGELOG.md actually uses.
function renderMarkdown(md) {
  const blocks = [];
  let inFence = false;
  let fenceLang = '';
  let fenceLines = [];
  let listType = null;
  let listItems = [];
  let para = [];

  function flushPara() {
    if (para.length) { blocks.push({ kind: 'p', text: para.join(' ') }); para = []; }
  }
  function flushList() {
    if (listItems.length) { blocks.push({ kind: 'list', type: listType, items: listItems }); listItems = []; listType = null; }
  }

  for (const raw of md.split('\n')) {
    const line = raw;
    if (line.startsWith('```')) {
      if (inFence) { blocks.push({ kind: 'code', lang: fenceLang, text: fenceLines.join('\n') }); fenceLines = []; fenceLang = ''; inFence = false; }
      else { flushPara(); flushList(); inFence = true; fenceLang = line.slice(3).trim(); }
      continue;
    }
    if (inFence) { fenceLines.push(raw); continue; }
    if (line.startsWith('## '))  { flushPara(); flushList(); blocks.push({ kind: 'h2', text: line.slice(3) }); continue; }
    if (line.startsWith('### ')) { flushPara(); flushList(); blocks.push({ kind: 'h3', text: line.slice(4) }); continue; }
    if (line.startsWith('# '))   { flushPara(); flushList(); blocks.push({ kind: 'h1', text: line.slice(2) }); continue; }
    const ulMatch = line.match(/^[-*] (.*)$/);
    const olMatch = line.match(/^\d+\. (.*)$/);
    if (ulMatch) { flushPara(); if (listType !== 'ul') flushList(); listType = 'ul'; listItems.push(ulMatch[1]); continue; }
    if (olMatch) { flushPara(); if (listType !== 'ol') flushList(); listType = 'ol'; listItems.push(olMatch[1]); continue; }
    if (line.trim() === '') { flushPara(); flushList(); continue; }
    flushList();
    para.push(line);
  }
  flushPara();
  flushList();
  return blocks;
}

// Render inline markdown (links, bold, code) as React nodes — no innerHTML.
function inline(text) {
  // Tokenise: split on links, bold and code in priority order.
  const out = [];
  let rest = text;
  // Use a single combined regex with capture groups; iterate greedily.
  while (rest.length > 0) {
    const linkIdx = rest.search(/\[[^\]]+\]\([^)]+\)/);
    const boldIdx = rest.search(/\*\*[^*]+\*\*/);
    const codeIdx = rest.search(/`[^`]+`/);
    const cands = [linkIdx, boldIdx, codeIdx].filter((i) => i >= 0);
    if (cands.length === 0) { out.push(rest); break; }
    const next = Math.min(...cands);
    if (next > 0) { out.push(rest.slice(0, next)); rest = rest.slice(next); }
    if (rest.startsWith('[')) {
      const m = rest.match(/^\[([^\]]+)\]\(([^)]+)\)/);
      if (m) { out.push({ link: { text: m[1], href: m[2] } }); rest = rest.slice(m[0].length); continue; }
    }
    if (rest.startsWith('**')) {
      const m = rest.match(/^\*\*([^*]+)\*\*/);
      if (m) { out.push({ bold: m[1] }); rest = rest.slice(m[0].length); continue; }
    }
    if (rest.startsWith('`')) {
      const m = rest.match(/^`([^`]+)`/);
      if (m) { out.push({ code: m[1] }); rest = rest.slice(m[0].length); continue; }
    }
    out.push(rest[0]); rest = rest.slice(1);
  }
  return out.map((seg, i) => {
    if (typeof seg === 'string') return seg;
    if (seg.link) return <a key={i} href={seg.link.href}>{seg.link.text}</a>;
    if (seg.bold) return <strong key={i}>{seg.bold}</strong>;
    if (seg.code) return <code key={i}>{seg.code}</code>;
    return null;
  });
}

function Block({ b }) {
  switch (b.kind) {
    case 'h1': return <h1 className="cl-h1">{inline(b.text)}</h1>;
    case 'h2': return <h2 className="cl-h2">{inline(b.text)}</h2>;
    case 'h3': return <h3 className="cl-h3">{inline(b.text)}</h3>;
    case 'p':  return <p  className="cl-p" >{inline(b.text)}</p>;
    case 'list': {
      const Tag = b.type === 'ol' ? 'ol' : 'ul';
      return <Tag className="cl-list">{b.items.map((it, i) => <li key={i}>{inline(it)}</li>)}</Tag>;
    }
    case 'code': return <pre className="cl-pre"><code>{b.text}</code></pre>;
    default: return null;
  }
}

async function loadChangelog() {
  // Bundled copy lives at website/public/CHANGELOG.md so it ships with the
  // build on Vercel. Fall back to the repo root for local dev.
  const candidates = [
    join(process.cwd(), 'public', 'CHANGELOG.md'),
    join(process.cwd(), 'CHANGELOG.md'),
    join(process.cwd(), '..', 'CHANGELOG.md'),
  ];
  for (const p of candidates) {
    try { return await readFile(p, 'utf-8'); } catch { /* try next */ }
  }
  return '# Changelog\n\nNo CHANGELOG.md found at build time.';
}

export default async function ChangelogPage() {
  const md = await loadChangelog();
  const blocks = renderMarkdown(md);

  return (
    <main>
      <section className="section" style={{ paddingTop: 64, paddingBottom: 32 }}>
        <div className="wrap-narrow">
          <p className="eyebrow">changelog</p>
          <h1 className="h1" style={{ fontSize: 'clamp(40px, 5.5vw, 64px)' }}>Every release.</h1>
          <p className="lede" style={{ marginTop: 20 }}>
            From v0.1.0 to v12.12.0 — every shipping change to designlang.
            Sourced live from <code className="kbd">CHANGELOG.md</code> in the repo.
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 24 }}>
        <div className="wrap-narrow">
          <article className="cl-prose">
            {blocks.map((b, i) => <Block key={i} b={b} />)}
          </article>
        </div>
      </section>
    </main>
  );
}
