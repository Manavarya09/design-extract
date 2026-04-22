// v10.4 — Stack Intel
//
// Extends stack-fingerprint.js with detectors for CMS platforms (Webflow,
// Framer, Shopify, Ghost, Sanity, Contentful, Wix, Squarespace, WordPress),
// analytics (GA, Segment, Mixpanel, PostHog, Amplitude, Heap), and
// experimentation platforms (Optimizely, Statsig, GrowthBook, LaunchDarkly,
// Split, Eppo). All signals come from script URLs + meta + known globals.

const CMS = [
  { id: 'webflow', re: /webflow\.com|wf-|\.webflow\./i },
  { id: 'framer', re: /framer\.(?:com|website)|__framer|framer-motion\b/i },
  { id: 'shopify', re: /cdn\.shopify|shopify\.com|x-shopify/i },
  { id: 'ghost', re: /ghost\.io|__ghost_|ghost-url/i },
  { id: 'sanity', re: /cdn\.sanity\.io|sanity-studio/i },
  { id: 'contentful', re: /cdn\.contentful\.com|ctfassets\.net/i },
  { id: 'wix', re: /parastorage\.com|\.wix\.com/i },
  { id: 'squarespace', re: /squarespace\.com|sqspcdn\.com|squarespace-cdn/i },
  { id: 'wordpress', re: /wp-content|wp-includes|wordpress/i },
  { id: 'hashnode', re: /hashnode\.com/i },
  { id: 'notion', re: /notion\.so\/image|notion-static/i },
  { id: 'bubble', re: /bubble\.io|bubble-cdn/i },
];

const ANALYTICS = [
  { id: 'google-analytics', re: /google-analytics\.com|googletagmanager\.com|gtag\(/ },
  { id: 'segment', re: /segment\.com\/analytics|cdn\.segment\.io/i },
  { id: 'mixpanel', re: /cdn\.mxpnl\.com|mixpanel\.com\/lib/i },
  { id: 'amplitude', re: /amplitude\.com|cdn\.amplitude\.com/i },
  { id: 'posthog', re: /posthog\.com|ph\.posthog\.com/i },
  { id: 'heap', re: /heapanalytics\.com/i },
  { id: 'fullstory', re: /fullstory\.com/i },
  { id: 'hotjar', re: /static\.hotjar\.com|hj\.contentsquare/i },
  { id: 'vercel-analytics', re: /_vercel\/insights|vercel\/analytics/i },
  { id: 'plausible', re: /plausible\.io\/js|plausible\.io\/api/i },
  { id: 'fathom', re: /usefathom\.com/i },
  { id: 'sentry', re: /sentry\.io|sentry-cdn/i },
  { id: 'datadog', re: /datadoghq\.com|datadog-rum/i },
];

const EXPERIMENTATION = [
  { id: 'optimizely', re: /optimizely\.com|cdn\.optimizely\./i },
  { id: 'statsig', re: /statsig\.com/i },
  { id: 'growthbook', re: /growthbook\.io/i },
  { id: 'launchdarkly', re: /launchdarkly\.com/i },
  { id: 'split', re: /split\.io|sdk\.split\.io/i },
  { id: 'eppo', re: /eppo\.cloud/i },
  { id: 'vercel-flags', re: /vercel\/flags|flags\.sdk/i },
];

function fingerprint(haystack, list) {
  const hits = [];
  for (const entry of list) {
    if (entry.re.test(haystack)) hits.push(entry.id);
  }
  return hits;
}

export function extractStackIntel(stack = {}) {
  const scripts = (stack.scripts || []).join(' \n');
  const metas = (stack.metas || []).map(m => `${m.name || ''} ${m.content || ''}`).join(' ');
  const classes = (stack.classNameSample || []).join(' ');
  const haystack = `${scripts}\n${metas}\n${classes}`;

  return {
    cms: fingerprint(haystack, CMS),
    analytics: fingerprint(haystack, ANALYTICS),
    experimentation: fingerprint(haystack, EXPERIMENTATION),
    signals: {
      scriptCount: (stack.scripts || []).length,
      metaCount: (stack.metas || []).length,
    },
  };
}
