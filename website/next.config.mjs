// STATIC_SITE=1 builds a plain static site (no server) for Cloudflare Pages.
// See scripts/build-static.mjs, which also sets aside the server-only routes.
const staticSite = process.env.STATIC_SITE === '1';

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(staticSite && { output: 'export', images: { unoptimized: true } }),
  turbopack: {},
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Don't bundle playwright — emit require('playwright-core') at runtime instead
      config.externals.push({
        'playwright': 'commonjs playwright-core',
      });
    }
    return config;
  },
  // Friendly badge URLs: /badge/stripe.com → /api/badge/stripe.com
  ...(!staticSite && {
    async rewrites() {
      return [
        { source: '/badge/:host', destination: '/api/badge/:host' },
        { source: '/badge/:host.svg', destination: '/api/badge/:host' },
      ];
    },
  }),
};

export default nextConfig;
