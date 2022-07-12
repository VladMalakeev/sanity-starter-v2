import groq from 'groq';

import { getClient } from '@/utils/sanity/client';
import { REDIRECT_TYPES } from '@/utils/sanity/consants';

import { parentRouteView, slugView } from './components/route';

const routeView = `
  _id,
  ${slugView},
  ${parentRouteView},
  useRedirect,
  redirectType,
  redirectPage
`;

const staticPageView = `
  _id,
  isHomePage,
  _updatedAt,
  ${parentRouteView}
`;

const dynamicPageView = `
  _id,
  _type,
  _updatedAt,
  ${slugView},
`;

const sitemapQuery = groq`
  {
    "dynamicPages": *[_type in $pageTypes]{${dynamicPageView}},
    "staticPages": *[_type == "staticPages"]{${staticPageView}},
    "routes": *[_type == "route"]{${routeView}}
  }
`;

const dynamicPagesQuery = groq`
  *[_type == "routeSettings"][0]{
    "types": routesList[].documentType,
    "routes": routesList[]{
      documentType,
      ${parentRouteView}
    }
  }
`;

export const fetchSitemap = async () => {
  // dynamic configs using for connecting route documents with dynamic page documents like: posts, products, etc.
  const dynamicPageConfig = await getClient().fetch(dynamicPagesQuery);

  // converting in obj for convenience
  const dynamicPageRoutes = Object.fromEntries(
    dynamicPageConfig.routes.map((route) => [
      route.documentType,
      { parentRoute: route.parentRoute },
    ]),
  );

  // fetching all routes for recursive searching nesting routes
  const sitemap = await getClient().fetch(sitemapQuery, {
    pageTypes: dynamicPageConfig.types,
  });

  // helper for searching parent route by id
  const getParentRoute = (parentId) => {
    return sitemap.routes.find((route) => route._id === parentId);
  };

  // helper for recursive searching nested routes
  const findNestedRoutes = (currentRoute, routesList = []) => {
    if (currentRoute.parentRoute) {
      const parentRoute = getParentRoute(currentRoute.parentRoute._id);
      if (parentRoute?.slug?.length) routesList.push(parentRoute.slug);
      if (parentRoute?.parentRoute) findNestedRoutes(parentRoute, routesList);
    }
  };

  // searching all static routes
  const staticRoutes = sitemap.staticPages.map((page) => {
    const pathList = [];
    if (page.isHomePage) pathList.push('/');
    else findNestedRoutes(page, pathList);

    return {
      path: pathList.reverse(),
      id: page._id,
      updatedAt: page._updatedAt,
    };
  });

  // searching all dynamic routes
  const dynamicRoutes = sitemap.dynamicPages.map((page) => {
    const pathList = [page.slug];
    findNestedRoutes(dynamicPageRoutes[page._type], pathList);

    return {
      path: pathList.reverse(),
      id: page._id,
      updatedAt: page._updatedAt,
    };
  });

  const redirectPages = sitemap.routes
    .filter((route) => route.useRedirect && route.redirectType)
    .map((route) => {
      const pathList = [route.slug];
      findNestedRoutes(route, pathList);

      const redirectPathList = [];
      if (route.redirectType === REDIRECT_TYPES.customPage) {
        const redirectPage = getParentRoute(route.redirectPage._ref);
        redirectPathList.push(redirectPage.slug);
        findNestedRoutes(redirectPage, redirectPathList);
      }

      return {
        path: pathList.reverse(),
        redirectPath: redirectPathList.reverse(),
      };
    });

  return {
    pages: [...staticRoutes, ...dynamicRoutes],
    redirects: redirectPages,
  };
};
