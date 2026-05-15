import { SITE_URL } from './seo-config';

const GALLERY_SLUGS = [
  'stripe-com',
  'linear-app',
  'vercel-com',
  'notion-so',
  'figma-com',
  'apple-com',
  'arc-net',
  'spotify-com',
];

export default function sitemap() {
  const now = new Date();
  const routes = [
    { path: '',                       priority: 1.0,  freq: 'daily'   },
    { path: '/features',              priority: 0.9,  freq: 'weekly'  },
    { path: '/gallery',               priority: 0.9,  freq: 'hourly'  },
    { path: '/spec',                  priority: 0.9,  freq: 'monthly' },
    { path: '/vs/design-extractor',   priority: 0.9,  freq: 'weekly'  },
    { path: '/changelog',             priority: 0.7,  freq: 'weekly'  },
    { path: '/drift',                 priority: 0.8,  freq: 'daily'   },
    { path: '/build',                 priority: 0.8,  freq: 'weekly'  },
    { path: '/#faq',                  priority: 0.7,  freq: 'monthly' },
    { path: '/#about',                priority: 0.7,  freq: 'monthly' },
  ];

  const base = routes.map(({ path, priority, freq }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: freq,
    priority,
  }));

  const galleryPages = GALLERY_SLUGS.flatMap((slug) => ([
    {
      url: `${SITE_URL}/gallery/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/gallery/${slug}/brand.html`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]));

  return [...base, ...galleryPages];
}
