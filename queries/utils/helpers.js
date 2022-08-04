// helper for searching parent page by id
const getParentPage = (parentId, sitemap) => {
  return sitemap?.find((route) => route._id === parentId);
};

// helper for recursive searching nested pages
export const findNestedPages = (page, routesList = [], sitemap) => {
  if (page?.parent) {
    const parentPage = getParentPage(page.parent?._id, sitemap);
    if (parentPage?.slug?.length && !parentPage.home)
      routesList.push(parentPage.slug);
    if (parentPage?.parent) findNestedPages(parentPage, routesList, sitemap);
  }
};
