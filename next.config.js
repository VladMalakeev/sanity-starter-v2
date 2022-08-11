module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return {
      afterFiles: [
        { source: '/sitemap.xml', destination: '/api/sitemap' },
        { source: '/cms', destination: '/cms/index.html' },
        { source: '/cms/:path*', destination: '/cms/index.html' },
      ],
    };
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'en',
    localeDetection: true,
  },
};
