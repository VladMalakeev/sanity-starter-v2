// helper for searching parent page by id
const getParentPage = (parentId, sitemap) => {
  return sitemap?.find((route) => route._id === parentId);
};

// helper for recursive searching nested pages
export const findNestedPages = (
  page,
  routesList = [],
  sitemap,
  template = { id: null },
) => {
  if (page?.parent) {
    const parentPage = getParentPage(page.parent?._id, sitemap);
    if (parentPage?.slug?.length && !parentPage.home)
      routesList.push(parentPage.slug);
    if (!template?.id && parentPage?.templateConfig?.useTemplate) {
      // eslint-disable-next-line no-param-reassign
      template.id = parentPage?.templateConfig?.childPages ?? null;
    }
    if (parentPage?.parent)
      findNestedPages(parentPage, routesList, sitemap, template);
  }
};
