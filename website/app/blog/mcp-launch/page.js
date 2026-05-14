export const metadata = {
  title: 'designlang on Claude Code, Cursor and Windsurf — the MCP launch',
  description:
    'How to wire designlang into Claude Code, Cursor and Windsurf with one command. Live extraction tokens, accessibility findings, component anatomy and CSS health — all readable as MCP resources by your AI editor.',
  alternates: { canonical: 'https://designlang.app/blog/mcp-launch' },
  openGraph: {
    title: 'designlang × MCP — extract once, ground every prompt',
    description: 'Wire designlang into Claude Code, Cursor and Windsurf in one command.',
    type: 'article',
  },
};

export default function McpLaunchPost() {
  return (
    <main>
      <article className="section" style={{ paddingTop: 64, paddingBottom: 32 }}>
        <div className="wrap-narrow">
          <p className="eyebrow">post · 2026-05-15</p>
          <h1 className="h1" style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}>
            Extract once, ground every prompt.
          </h1>
          <p className="lede" style={{ marginTop: 18 }}>
            How to wire designlang into Claude Code, Cursor and Windsurf with one command —
            so your AI editor stops hallucinating colours, fonts and component shapes.
          </p>

          <div className="prose" style={{ marginTop: 36 }}>
            <h2>The problem</h2>
            <p>
              You ask Claude Code to &ldquo;build a pricing page in our brand.&rdquo; Claude doesn&rsquo;t know
              your brand. It guesses. The result looks like AI. You spend the next hour pasting hex
              codes and font names into the prompt.
            </p>

            <h2>The fix</h2>
            <p>
              Run <code>designlang mcp</code> once. designlang exposes your design system &mdash;
              every extracted token, every component anatomy, every WCAG remediation suggestion &mdash;
              as a Model Context Protocol resource. Claude Code reads it like a native tool. Cursor
              reads it. Windsurf reads it. The same payload, three editors.
            </p>

            <h2>Wire it up — Claude Code</h2>
            <pre>{`# .claude/mcp.json
{
  "mcpServers": {
    "designlang": {
      "command": "npx",
      "args": ["designlang", "mcp", "--url", "https://yourbrand.com"]
    }
  }
}`}</pre>

            <h2>Wire it up — Cursor</h2>
            <pre>{`# ~/.cursor/mcp.json
{
  "mcpServers": {
    "designlang": {
      "command": "npx",
      "args": ["designlang", "mcp", "--url", "https://yourbrand.com"]
    }
  }
}`}</pre>

            <h2>Wire it up — Windsurf</h2>
            <pre>{`# ~/.codeium/windsurf/mcp_config.json
{
  "mcpServers": {
    "designlang": {
      "command": "npx",
      "args": ["designlang", "mcp", "--url", "https://yourbrand.com"]
    }
  }
}`}</pre>

            <h2>What the editor sees</h2>
            <p>
              The MCP server exposes 5 resources and 4 tools:
            </p>
            <ul>
              <li><code>tokens://current</code> — the full DTCG token tree</li>
              <li><code>regions://current</code> — semantic regions detected on the live page</li>
              <li><code>components://current</code> — clustered components and their slots</li>
              <li><code>a11y://current</code> — WCAG findings + remediation suggestions</li>
              <li><code>css-health://current</code> — specificity graph, dead rules, dup count</li>
            </ul>
            <p>
              Plus tools to re-extract from a new URL, refresh the cache, query a single token by
              path and write the agent rule files (\`AGENTS.md\`, \`.cursorrules\`, Claude skills) into
              the active workspace.
            </p>

            <h2>Why this beats &ldquo;just paste tokens into the prompt&rdquo;</h2>
            <ul>
              <li>The token set updates the moment you re-extract; the prompt does not.</li>
              <li>Components, anatomy and accessibility findings are too large to fit in a system prompt.</li>
              <li>Claude Code can <em>call</em> the resource on demand instead of carrying it in every turn.</li>
            </ul>

            <h2>Try it</h2>
            <pre>{`# 1. Wire MCP into your editor (snippet above)
# 2. Restart the editor
# 3. Ask: "extract designlang.app and summarise the palette"
# 4. Watch the editor fetch from the MCP resource — no copy-paste`}</pre>

            <p>
              Full source: <a href="https://github.com/Manavarya09/design-extract/blob/main/src/mcp">src/mcp</a>.
              CLI flags: <a href="/features#mcp">features page</a>. Questions: <a href="https://github.com/Manavarya09/design-extract/issues">GitHub issues</a>.
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}
