'use client';

import { useEffect, useRef, useState } from 'react';
import Marginalia from './Marginalia';

const CURSOR_RULE = `---
description: Design system extracted from https://stripe.com — use these tokens, do not invent new ones.
globs: **/*.{ts,tsx,jsx,js,css,scss,html,vue,svelte,swift,kt,dart,php}
alwaysApply: true
---

# Design system reference

Source: https://stripe.com
Extracted by designlang v7.0.0 on 2026-04-18T12:00:00Z

## Semantic tokens (use these)
- color.action.primary: #533afd
- color.surface.default: #ffffff
- color.text.body: #0a2540
- radius.control: 8px
- typography.body.fontFamily: sohne-var, Helvetica Neue, Arial, sans-serif

## How to use
- Prefer \`semantic.*\` tokens over \`primitive.*\`.
- Never invent new tokens or hex values; reuse the ones above.
- When a value is missing, pick the closest existing semantic token and flag the gap.
- Reference tokens by their dotted path (e.g. \`semantic.color.action.primary\`).
`;

// The transcript. Each step is either typed (user input) or printed (server output).
const TRANSCRIPT = [
  { kind: 'typed', text: '$ designlang mcp --output-dir ./design-extract-output' },
  { kind: 'print', text: '{"jsonrpc":"2.0","id":1,"result":{"serverInfo":{"name":"designlang","version":"7.0.0"}}}' },
  { kind: 'typed', text: '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"search_tokens","arguments":{"query":"action.primary"}}}' },
  { kind: 'print', text: '{"jsonrpc":"2.0","id":2,"result":{"matches":[{"path":"semantic.color.action.primary","$type":"color","$value":"#533afd"}]}}' },
];

function Terminal({ reduced }) {
  const [lines, setLines] = useState(() =>
    reduced ? TRANSCRIPT.map((t) => ({ ...t, rendered: t.text })) : []
  );
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);

  // IntersectionObserver to pause when offscreen.
  useEffect(() => {
    if (reduced) return;
    if (!containerRef.current) return;
    const el = containerRef.current;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  // Typewriter runner.
  useEffect(() => {
    if (reduced) return;
    if (!inView) return;
    const controller = new AbortController();
    const signal = controller.signal;

    async function run() {
      while (!signal.aborted) {
        setLines([]);
        for (let i = 0; i < TRANSCRIPT.length; i++) {
          if (signal.aborted) return;
          const step = TRANSCRIPT[i];
          if (step.kind === 'typed') {
            // ~55 cps ≈ 18ms per char
            for (let j = 0; j <= step.text.length; j++) {
              if (signal.aborted) return;
              await wait(18, signal);
              setLines((prev) => {
                const next = [...prev];
                next[i] = { ...step, rendered: step.text.slice(0, j) };
                return next;
              });
            }
            await wait(280, signal);
          } else {
            await wait(220, signal);
            if (signal.aborted) return;
            setLines((prev) => {
              const next = [...prev];
              next[i] = { ...step, rendered: step.text };
              return next;
            });
          }
        }
        await wait(2000, signal);
      }
    }

    run().catch(() => {});
    return () => controller.abort();
  }, [inView, reduced]);

  return (
    <div
      ref={containerRef}
      aria-label="designlang MCP terminal transcript"
      style={{
        background: 'var(--ink)',
        color: 'var(--paper)',
        border: 'var(--hair)',
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        lineHeight: 1.55,
        padding: 'var(--r4) var(--r5)',
        minHeight: 320,
        overflow: 'auto',
      }}
    >
      <div style={{ color: 'var(--ink-3)', marginBottom: 8 }}>
        designlang-mcp · stdio
      </div>
      {TRANSCRIPT.map((step, i) => {
        const line = lines[i];
        const rendered = line?.rendered ?? '';
        const done = rendered.length === step.text.length;
        return (
          <pre
            key={i}
            style={{
              margin: 0,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
              color: step.kind === 'typed' ? 'var(--paper)' : 'var(--ink-3)',
            }}
          >
            {step.kind === 'print' && rendered ? <span style={{ color: 'var(--accent)' }}>» </span> : null}
            {rendered}
            {!done && !reduced ? <span style={{ opacity: 0.7 }}>▍</span> : null}
          </pre>
        );
      })}
    </div>
  );
}

function wait(ms, signal) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(resolve, ms);
    signal.addEventListener('abort', () => {
      clearTimeout(t);
      reject(new Error('aborted'));
    }, { once: true });
  });
}

export default function McpSection() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  return (
    <div>
      <div style={{ padding: 'var(--r5) 0 var(--r6)' }}>
        <h2 className="display">Your editor reads this.</h2>
        <p className="prose" style={{ marginTop: 'var(--r4)', fontSize: 18, maxWidth: '52ch' }}>
          The MCP server exposes five resources and five tools over stdio, speaking
          JSON-RPC to Claude Code, Cursor, and Windsurf. See <a href="#install">§09</a> for install.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 7fr) minmax(0, 5fr)',
          columnGap: 0,
          alignItems: 'stretch',
        }}
      >
        {/* Left: rule file */}
        <div
          style={{
            background: 'var(--paper-2)',
            border: 'var(--hair)',
            borderRight: 0,
            padding: 'var(--r4) var(--r5)',
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            lineHeight: 1.55,
            overflow: 'auto',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--r3)' }}>
            <span style={{ color: 'var(--ink-3)' }}>.cursor/rules/designlang.mdc</span>
            <span className="chip" style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}>
              alwaysApply: true
            </span>
          </div>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: 'var(--ink)' }}>
            {CURSOR_RULE}
          </pre>
        </div>

        {/* Right: terminal */}
        <Terminal reduced={reduced} />
      </div>

      <div style={{ marginTop: 'var(--r6)' }}>
        <Marginalia>
          <div>install</div>
          <div>
            <code>{'{ "mcpServers": { "designlang": { "command": "npx", "args": ["designlang","mcp"] } } }'}</code>
          </div>
          <hr style={{ margin: '12px 0', border: 0, borderTop: '1px solid var(--ink-3)' }} />
          <div>Zero-config for any MCP-aware agent.</div>
        </Marginalia>
      </div>
    </div>
  );
}
