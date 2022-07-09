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
};
