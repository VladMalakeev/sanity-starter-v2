import { fetchSitemap } from '../../queries/sitemap';

const handler = async (req, res) => {
  res.setHeader('Cache-Control', 's-maxage=86400');

  const data = await fetchSitemap();
  const host = process.env.NEXT_PUBLIC_BASE_URL;

  const urlItems = data.pages.map((page) => {
    const path = page.path.join('/');
    return `
      <url>
        <loc>${host}/${path === '/' ? '' : path}</loc>
        <lastmod>${new Date(page.updatedAt).toISOString()}</lastmod>
      </url>
    `;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/TR/xhtml11/xhtml11_schema.html">
     ${urlItems.join('\n')}
  </urlset>`;

  res.status(200).send(sitemap);
};

export default handler;
