import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
} from '../seo-config';

// JSON-LD structured data. All content is server-literal — no user input is
// interpolated into the JSON string. This matches the Next.js App Router
// metadata docs' recommended inline-script pattern.
// https://nextjs.org/docs/app/building-your-application/optimizing/metadata#json-ld
export default function StructuredData() {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE_URL}/#software`,
        name: 'designlang',
        alternateName: ['design-extract', 'designlang CLI'],
        description: SITE_DESCRIPTION,
        applicationCategory: 'DeveloperApplication',
        applicationSubCategory: 'Design System Extractor',
        operatingSystem: 'macOS, Windows, Linux',
        softwareVersion: '7.0.0',
        downloadUrl: 'https://www.npmjs.com/package/designlang',
        installUrl: 'https://www.npmjs.com/package/designlang',
        url: SITE_URL,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        license: 'https://opensource.org/licenses/MIT',
        codeRepository: 'https://github.com/Manavarya09/design-extract',
        programmingLanguage: ['JavaScript', 'TypeScript'],
        runtimePlatform: 'Node.js 20+',
        featureList: [
          'Reverse-engineer any website into a W3C DTCG design system',
          'Emits primitive, semantic, and composite tokens',
          'Multi-platform output: Tailwind, CSS variables, Figma variables, shadcn/ui, React, Vue, Svelte, iOS SwiftUI, Android Compose, Flutter, WordPress block theme',
          'Stdio MCP server exposing tokens, regions, components, CSS health, and remediation',
          'Agent rule emitter for Cursor, Claude Code, Windsurf, AGENTS.md',
          'CSS health audit: specificity graph, !important count, unused CSS via Coverage API, @keyframes catalog',
          'WCAG accessibility remediation with nearest passing palette color',
          'Semantic region classifier (nav, hero, pricing, testimonials, footer, and more)',
          'Reusable component clustering with variant detection',
          'Dark mode diff, authenticated page crawling, responsive breakpoint capture',
        ],
        keywords: SITE_KEYWORDS.slice(0, 25).join(', '),
        author: {
          '@type': 'Person',
          name: 'Manav Arya Singh',
          url: 'https://manavaryasingh.com',
        },
        publisher: {
          '@type': 'Person',
          name: 'Manav Arya Singh',
          url: 'https://manavaryasingh.com',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        publisher: { '@id': `${SITE_URL}/#person` },
        inLanguage: 'en-US',
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Manav Arya Singh',
        url: 'https://manavaryasingh.com',
        sameAs: [
          'https://github.com/Manavarya09',
          'https://www.npmjs.com/~manavarya0909',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Extract', item: `${SITE_URL}/#extract` },
          { '@type': 'ListItem', position: 3, name: 'Features', item: `${SITE_URL}/#features` },
          { '@type': 'ListItem', position: 4, name: 'Specimens', item: `${SITE_URL}/#specimens` },
          { '@type': 'ListItem', position: 5, name: 'Install', item: `${SITE_URL}/#install` },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is designlang?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'designlang is an open-source CLI tool that crawls any live website with Playwright and emits its complete design system in W3C DTCG token format, plus Tailwind, CSS variables, Figma variables, shadcn/ui theme, and native emitters for iOS SwiftUI, Android Compose, Flutter, and WordPress block themes.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does designlang work with AI coding agents like Claude Code and Cursor?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. designlang ships a stdio MCP server (designlang mcp) that exposes extracted tokens, regions, components, CSS health, and accessibility remediation as MCP resources and tools, plus an --emit-agent-rules flag that writes .cursor/rules/designlang.mdc, .claude/skills/designlang/SKILL.md, CLAUDE.md.fragment, and agents.md.',
            },
          },
          {
            '@type': 'Question',
            name: 'How is designlang different from Style Dictionary, Subframe, v0, Builder.io, and Project Wallace?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'designlang extracts from a live rendered URL, not a Figma file or a manually-authored token source. It outputs strict DTCG with a semantic/primitive layering and composite tokens, ships multi-platform emitters (iOS, Android, Flutter, WordPress) from one extraction, runs a CSS health audit plus a11y remediation, classifies page regions, and detects reusable components automatically. It is open-source under MIT and runs locally as a CLI or MCP server.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is designlang free and open source?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. designlang is MIT-licensed, free, and fully open-source. The CLI installs with npx designlang <url> and requires only Node.js 20 or later. The website at designlang.manavaryasingh.com offers a free rate-limited extraction for quick demos.',
            },
          },
          {
            '@type': 'Question',
            name: 'What output formats does designlang support?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'W3C DTCG JSON (primitive, semantic, composite layers), Tailwind CSS config, CSS custom properties, Figma Variables JSON, shadcn/ui theme, React / Vue / Svelte theme objects, iOS SwiftUI Color + CGFloat extensions, Android Jetpack Compose Theme.kt and colors.xml, Flutter ThemeData, and a WordPress block theme skeleton (theme.json, style.css, templates).',
            },
          },
        ],
      },
    ],
  };

  const json = JSON.stringify(graph).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
