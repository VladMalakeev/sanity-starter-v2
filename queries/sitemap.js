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
  const dynamicTypes = Object.keys(DYNAMIC_TYPES);
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

  // searching all static routes
  const staticPages = sitemap?.staticPages
    ?.map((page) => {
      const pathList = [];
      let template = page?.templateConfig?.useTemplate
        ? page?.templateConfig?.template ?? null
        : null;

      if (!page?.home) {
        pathList.push(page?.slug ?? '');
        template = findNestedPages(page, pathList, sitemap?.staticPages, template);
      }

      return {
        path: pathList.reverse(),
        id: page._id,
        updatedAt: page._updatedAt,
        type: 'page',
        locale: page.__i18n_lang,
        excludeSitemap: page.excludeSitemap,
        redirect: getRedirect(withRedirects, page?.redirect),
        template,
      };
    })
    .sort((a, b) => a.path.length - b.path.length);

  const dynamicPages = sitemap?.dynamicPages?.map((page) => {
    const pathList = [page?.slug ?? ''];
    let template = page?.templateConfig?.useTemplate
      ? page?.templateConfig?.template ?? null
      : null;
    template = findNestedPages(page, pathList, sitemap?.staticPages, template);

    return {
      path: pathList.reverse(),
      id: page._id,
      updatedAt: page._updatedAt,
      type: page._type,
      locale: page.__i18n_lang,
      excludeSitemap: page.excludeSitemap,
      redirect: getRedirect(withRedirects, page?.redirect),
      template,
    };
  });

  return [...staticPages, ...dynamicPages];
};
