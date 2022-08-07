import { BASIC_LOCALE, LANGUAGES } from '@/utils/constants';

import { fetchSitemap } from '../../queries/sitemap';

const handler = async (req, res) => {
  res.setHeader('Cache-Control', 's-maxage=86400');

  const data = await fetchSitemap();
  const host = process.env.NEXT_PUBLIC_BASE_URL;
  const hasAlternate = LANGUAGES.length > 1;

  const getLocalePath = (value) =>
    BASIC_LOCALE !== value && hasAlternate ? `${value}/` : '';

  const removeI18nString = (value) => value.split('__i18n')[0];

  const findAlternate = (id) => {
    return data
      .filter(
        (item) =>
          removeI18nString(item.id) === removeI18nString(id) &&
          !item?.excludeSitemap,
      )
      .map(({ locale, path }) => {
        const route = path.join('/');
        return `
            <xhtml:link
               rel="alternate"
               hreflang="${locale}"
               href="${host}/${getLocalePath(locale)}${route}"/>
        `;
      });
  };

  const urlItems = data
    .filter((page) => !page?.excludeSitemap)
    .map(({ path, locale, updatedAt, id }) => {
      const route = path.join('/');
      return `
      <url>
        <loc>${host}/${getLocalePath(locale)}${route}</loc>
        ${hasAlternate && findAlternate(id).join('\n')}
        <lastmod>${new Date(updatedAt).toISOString()}</lastmod>
      </url>
    `;
    });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/TR/xhtml11/xhtml11_schema.html">
     ${urlItems.join('\n')}
  </urlset>`;

  res.status(200).send(sitemap);
};

export default handler;
