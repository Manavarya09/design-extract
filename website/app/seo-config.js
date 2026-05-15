export const SITE_URL = 'https://designlang.app';
export const SITE_NAME = 'designlang';
export const TWITTER = '@manavaryasingh';

export const SITE_TITLE =
  "designlang — Open-source design extractor (design-extractor.com alternative). Tokens, Tailwind, Figma, MCP, iOS, Android, Flutter, WordPress.";

export const SITE_DESCRIPTION =
  'designlang is the open-source design extractor that turns any URL into a complete design system in seconds. ' +
  'A free, MIT-licensed alternative to design-extractor.com — same DESIGN.md output, no signup, scriptable CLI, ' +
  'plus W3C DTCG tokens (primitive · semantic · composite), Tailwind config, CSS variables, Figma variables, shadcn/ui theme, ' +
  'React / Vue / Svelte themes, iOS SwiftUI, Android Jetpack Compose, Flutter, WordPress block themes, and a print-ready brand-book PDF. ' +
  'Ships a stdio MCP server for Claude Code, Cursor, and Windsurf, plus auto-generated AGENTS.md / .cursorrules for AI agents. ' +
  'Includes a CSS health audit, WCAG contrast remediation, semantic region classifier, reusable component clustering, dark-mode pairing, ' +
  'and a CI drift bot. 2,500+ stars on GitHub.';

export const SITE_KEYWORDS = [
  // Primary product terms
  'design system extractor', 'extract design system from website', 'extract design tokens from url', 'website to design tokens',
  'designlang', 'designlang.app', 'design extractor', 'design extractor cli', 'design extractor open source', 'design extractor free',
  // DTCG / W3C
  'W3C DTCG', 'W3C design tokens', 'DTCG tokens', 'DTCG format', 'design tokens format', 'design tokens generator', 'design token extractor',
  'primitive tokens', 'semantic tokens', 'composite tokens', 'alias tokens',
  // Output formats
  'website to tailwind config', 'tailwind config generator', 'tailwind preset from website',
  'website to css variables', 'website to figma variables', 'figma variables generator', 'figma tokens import',
  'website to shadcn theme', 'shadcn theme generator', 'shadcn/ui theme extractor',
  'react theme from website', 'vue theme from website', 'svelte theme from website',
  'iOS SwiftUI tokens', 'Android Jetpack Compose tokens', 'Flutter theme from website', 'WordPress block theme generator',
  'multi-platform design tokens',
  // PDF brand books
  'brand book PDF', 'brand guidelines PDF', 'brand book generator', 'auto generate brand book',
  // MCP and AI agents
  'MCP server design tokens', 'MCP server Claude Code', 'MCP server Cursor', 'MCP server Windsurf',
  'Claude Code design rules', 'Claude Code skills', 'Cursor project rules', 'Windsurf rules',
  'AGENTS.md design system', 'agent rules emitter', 'design tokens for AI agents', 'AI coding agents design system',
  'Claude Artifacts design tokens', 'Lovable design tokens', 'Cursor design tokens', 'v0 design tokens',
  'design tokens MCP', 'DESIGN.md generator', 'DESIGN.md extractor', 'agent-native design system',
  // Audits
  'CSS health audit', 'CSS specificity audit', 'unused CSS analyzer',
  'WCAG contrast remediation', 'accessibility remediation', 'color contrast fixer', 'WCAG AA',
  'semantic regions classifier', 'component cluster detection', 'reusable component detection',
  'dark mode diff', 'dark-mode pairing', 'responsive breakpoint capture', 'interaction state capture',
  // Tooling adjacency / alternatives
  'style dictionary alternative', 'tokens studio alternative', 'subframe alternative', 'v0 alternative',
  'builder.io alternative', 'project wallace alternative', 'supernova alternative', 'specify alternative',
  'dembrandt alternative', 'html.to.design alternative',
  // design-extractor.com — every search variant we want to outrank
  'design-extractor.com', 'design-extractor.com alternative', 'design-extractor.com vs designlang',
  'design extractor', 'design extractor alternative', 'design extractor open source', 'design extractor cli',
  'design extractor free', 'design extractor without signup', 'design extractor no signup',
  'design extractor github', 'design extractor npm', 'design extractor mcp',
  'design extractor with PDF', 'design extractor with Tailwind', 'design extractor for Cursor',
  'design extractor for Claude Code', 'design extractor figma',
  'best design extractor', 'free design extractor cli', 'open source design extractor 2026',
  'extract design system from url free', 'extract DESIGN.md from website', 'auto generate DESIGN.md',
  'designextractor', 'design-extractor com',
  // CI / studio
  'design regression CI', 'design drift CI', 'design system CI', 'token drift detection',
  'website to Storybook', 'website to Next.js', 'clone website design', 'one click website clone',
  // CSS / browser tech
  'css extractor', 'extract css from website', 'Playwright design extractor', 'headless browser design extraction',
  'open source design system tool', 'CLI design system tool', 'npx designlang', 'free design tokens cli',
  // Author
  'Manav Arya Singh',
];

// Common questions (used both in JSON-LD FAQPage and the visible FAQ section).
// Phrasing is optimised for AI-Overview / Perplexity citation: each answer is
// self-contained, avoids "we" / "you", and starts with the noun.
export const FAQ = [
  {
    q: 'What is designlang?',
    a: 'designlang is an open-source CLI that crawls any live website with a headless browser and emits its complete design system: W3C DTCG tokens (primitive, semantic, composite), Tailwind config, CSS variables, Figma variables, shadcn/ui theme, plus native emitters for iOS SwiftUI, Android Jetpack Compose, Flutter and WordPress, and a print-ready brand-book PDF. It runs locally and ships an MCP server so Claude Code, Cursor and Windsurf can read live extractions as native tools.',
  },
  {
    q: 'How do I install designlang?',
    a: 'Run `npx designlang <url>` — no install, no account, no API key. The package is on npm as `designlang` and requires Node.js 20 or later. The full source is on GitHub at github.com/Manavarya09/design-extract under the MIT licence.',
  },
  {
    q: 'How is designlang different from Style Dictionary, Tokens Studio, Subframe, v0 and Builder.io?',
    a: 'Those tools take a Figma file or hand-authored tokens as input. designlang takes a live URL. It reads what your browser actually computes — colours, spacing, typography, motion, shadows, anatomy — directly from the rendered DOM. It outputs strict W3C DTCG with proper primitive / semantic / composite layering, runs a CSS health audit, performs WCAG remediation, and ships multi-platform emitters from one run.',
  },
  {
    q: 'Does designlang work with Claude Code, Cursor and Windsurf?',
    a: 'Yes. designlang ships a stdio MCP server (`designlang mcp`) that exposes extracted tokens, semantic regions, component clusters, CSS health and accessibility remediation as MCP resources and tools. The CLI also auto-generates `.cursor/rules/designlang.mdc`, `.claude/skills/designlang/SKILL.md`, `CLAUDE.md` fragments and `AGENTS.md` so any AI coding agent can read the system natively.',
  },
  {
    q: 'Is designlang free and open source?',
    a: 'Yes. designlang is MIT-licensed and fully open source on GitHub. The CLI is free with no signup. The hosted demo at designlang.app is rate-limited to one extraction per IP per day; the CLI is unlimited.',
  },
  {
    q: 'What output formats does designlang support?',
    a: 'W3C DTCG JSON, Tailwind CSS config, CSS custom properties, Figma Variables JSON, shadcn/ui theme, React / Vue / Svelte theme objects, iOS SwiftUI extensions, Android Compose Theme.kt + colors.xml, Flutter ThemeData, WordPress block theme (theme.json + style.css), agent rules (AGENTS.md, .cursorrules, Claude skills, MCP), motion tokens, typed component anatomy stubs, a brand voice/CTA pack, and a print-ready brand-book PDF with chapter bookmarks and an embedded tokens attachment.',
  },
  {
    q: 'Can I generate a brand-book PDF for any URL?',
    a: 'Yes. `npx designlang brand <url> --pdf` produces a 13-chapter brand-guidelines PDF with chapter page breaks, a running footer, an extracted-primary cover band, and (with `--attach-tokens`) the DTCG tokens JSON embedded as a PDF file attachment.',
  },
  {
    q: 'Does designlang extract motion, hover states and interaction design?',
    a: 'Yes. With the `--interactions` flag designlang captures hover, focus and active states for buttons, links and inputs, and reads all CSS transitions, easing functions and `@keyframes` animations into a motion-tokens DTCG file.',
  },
];
