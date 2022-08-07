import groq from 'groq';

import { DYNAMIC_TYPES } from '@/utils/constants';
import { getClient } from '@/utils/sanity/client';

import {
  parentView,
  redirectView,
  slugView,
  templateView,
} from './components/pageFields';
import { findNestedPages } from './utils/helpers';

const basicFields = `
  _id,
  _type,
  _updatedAt,
  __i18n_lang,
  excludeSitemap,
  ${redirectView},
  ${templateView}
`;

const staticPageView = `
  ${basicFields},
  ${slugView},
  ${parentView},
  home,
`;

const dynamicPageView = `
  ${basicFields},
  ${slugView},
  ${parentView},
`;

const sitemapQuery = groq`
  {
    "dynamicPages": *[_type in $dynamicTypes]{${dynamicPageView}},
    "staticPages": *[_type == "page"]{${staticPageView}},
  }
`;

export const fetchSitemap = async (withRedirects = false) => {
  const dynamicTypes = Object.values(DYNAMIC_TYPES);
  const sitemap = await getClient().fetch(sitemapQuery, { dynamicTypes });

  const getRedirect = (isRedirect, redirect) => {
    if (isRedirect && redirect?.useRedirect) {
      const redirectList = [redirect?.slug];
      findNestedPages(redirect, redirectList, sitemap?.staticPages);
      redirectList.push(redirect?.locale);
      return {
        permanent: redirect?.permanent ?? false,
        destination: `/${redirectList.reverse().join('/')}`,
      };
    }
    return null;
  };

  const initialTemplate = (page) => {
    if (page?.templateConfig?.useTemplate) {
      return page?.templateConfig?.currentPage ?? null;
    }
    return null;
  };

  // searching all static routes
  const staticPages = sitemap?.staticPages
    ?.map((page) => {
      const pathList = [];
      const template = {
        id: initialTemplate(page),
      };

      if (!page?.home) {
        pathList.push(page?.slug ?? '');
        findNestedPages(page, pathList, sitemap?.staticPages, template);
      }

      return {
        path: pathList.reverse(),
        id: page._id,
        updatedAt: page._updatedAt,
        type: 'page',
        locale: page.__i18n_lang,
        excludeSitemap: page.excludeSitemap,
        redirect: getRedirect(withRedirects, page?.redirect),
        template: template.id,
      };
    })
    .sort((a, b) => a.path.length - b.path.length);

  const dynamicPages = sitemap?.dynamicPages?.map((page) => {
    const pathList = [page?.slug ?? ''];
    const template = {
      id: initialTemplate(page),
    };

    findNestedPages(page, pathList, sitemap?.staticPages, template);

    return {
      path: pathList.reverse(),
      id: page._id,
      updatedAt: page._updatedAt,
      type: page._type,
      locale: page.__i18n_lang,
      excludeSitemap: page.excludeSitemap,
      redirect: getRedirect(withRedirects, page?.redirect),
      template: template.id,
    };
  });

  return [...staticPages, ...dynamicPages];
};
