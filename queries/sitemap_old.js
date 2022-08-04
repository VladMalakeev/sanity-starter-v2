import groq from 'groq';

import { REDIRECT_TYPES, TEMPLATE_RULES } from '@/utils/constants';
import { getClient } from '@/utils/sanity/client';

import { parentRouteView, slugView } from './components/route';

const routeView = `
  _id,
  ${slugView},
  ${parentRouteView},
  useRedirect,
  redirectType,
  redirectPage,
  useTemplate,
  templateRules,
  "templateId": template._ref
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
  const findNestedRoutes = (
    currentRoute,
    routesList = [],
    parentTemplate = null,
  ) => {
    let template = parentTemplate;
    if (currentRoute.parentRoute) {
      const parentRoute = getParentRoute(currentRoute.parentRoute._id);
      if (parentRoute?.slug?.length) routesList.push(parentRoute.slug);
      if (!template && parentRoute?.useTemplate) {
        if (
          parentRoute?.templateId &&
          parentRoute?.templateRules !== TEMPLATE_RULES.dontUse
        )
          template = parentRoute?.templateId;
      }
      if (parentRoute?.parentRoute)
        template = findNestedRoutes(parentRoute, routesList, template);
    }
    return template;
  };

  // searching all static routes
  const staticRoutes = sitemap.staticPages.map((page) => {
    const pathList = [];
    let template = null;
    if (page.isHomePage) pathList.push('/');
    else {
      template = findNestedRoutes(page, pathList, template);
    }

    return {
      path: pathList.reverse(),
      pageId: page._id,
      updatedAt: page._updatedAt,
      template: template ?? 'default',
      pageType: 'staticPages',
    };
  });

  // searching all dynamic routes
  const dynamicRoutes = sitemap.dynamicPages.map((page) => {
    const pathList = [page.slug];
    let template = null;
    template = findNestedRoutes(dynamicPageRoutes[page._type], pathList, template);

    return {
      path: pathList.reverse(),
      pageId: page._id,
      updatedAt: page._updatedAt,
      template: template ?? 'default',
      pageType: page._type,
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
