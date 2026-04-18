import { SITE_URL } from './seo-config';

export default function sitemap() {
  const now = new Date();
  const anchors = [
    '',
    '#extract',
    '#features',
    '#specimens',
    '#install',
  ];
  return anchors.map((hash) => ({
    url: `${SITE_URL}/${hash}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: hash === '' ? 1 : 0.8,
  }));
}
