export const getAlternatePath = (sitemap, sitemapItem) => {
  const pageId = sitemapItem.id.split('__i18n_')[0];

  return sitemap.reduce((result = {}, item) => {
    // eslint-disable-next-line no-bitwise,no-param-reassign
    if (~item.id.indexOf(pageId)) result[item.__i18n_lang] = item.path?.join('/');
    return result;
  }, {});
};
