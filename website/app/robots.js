import { SITE_URL } from './seo-config';

export const dynamic = 'force-static';

// Explicit AI-crawler allowances. By 2026 these matter as much as Googlebot —
// being indexable by ChatGPT, Claude, Perplexity, and Google AI Overviews is
// the new SEO. We say YES to all of them; the content is documentation we want
// quoted in answers.
const AI_BOTS = [
  'GPTBot',                // OpenAI training/answers
  'OAI-SearchBot',         // OpenAI live search
  'ChatGPT-User',          // ChatGPT browsing
  'ClaudeBot',             // Anthropic training
  'Claude-Web',            // Anthropic browsing
  'anthropic-ai',          // legacy Anthropic UA
  'PerplexityBot',         // Perplexity search
  'Perplexity-User',       // Perplexity user-fetch
  'Google-Extended',       // Google AI training (separate from Googlebot)
  'Applebot-Extended',     // Apple Intelligence
  'Bytespider',            // ByteDance / Doubao
  'CCBot',                 // Common Crawl
  'cohere-ai',             // Cohere
  'meta-externalagent',    // Meta AI
  'FacebookBot',           // Meta
  'Amazonbot',             // Alexa / Rufus
  'DuckAssistBot',         // DuckDuckGo AI
  'mistral-ai-user',       // Mistral
];

export default function robots() {
  return {
    rules: [
      // Standard search engines + everyone else.
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      // Each AI bot gets its own explicit ALLOW rule. Some operators only
      // honour their named UA, not '*'. Listing them individually also signals
      // intent to publishers tracking AI-readiness.
      ...AI_BOTS.map((ua) => ({
        userAgent: ua,
        allow: '/',
        disallow: ['/api/'],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
