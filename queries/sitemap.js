import groq from 'groq';

import { getClient } from '@/utils/sanity';

const routeView = `
  _id,
  "slug": coalesce(slug.current, ''),
  "parent": {
    "slug": parentRoute->slug.current,
    "_id": parentRoute->_id
  }
`;

const sitemapQuery = groq`
  {
    "pages": *[_type in ["post", "page"]]{${routeView}},
    "routes": *[_type == "route"]{${routeView}}
  }
  
`;

export const fetchSitemap = async () => {
  const sitemap = await getClient().fetch(sitemapQuery);
  const getParentRoute = (parentId) => {
    return sitemap.routes.find((route) => route._id === parentId);
  };

  return sitemap.pages.map((page) => {
    const pathElements = [page.slug];
    const findNestedRoutes = (currentRoute) => {
      if (currentRoute.parent) {
        const parentRoute = getParentRoute(currentRoute.parent._id);
        if (parentRoute?.slug?.length) pathElements.push(parentRoute.slug);
        if (parentRoute?.parent) findNestedRoutes(parentRoute);
      }
    };
    findNestedRoutes(page);

    return {
      path: pathElements.reverse(),
      id: page._id,
    };
  });
};
