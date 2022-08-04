import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import React from 'react';

import { BASIC_LOCALE } from '@/utils/constants';
import { getI18nPath } from '@/utils/functions';

import { TemplatesBuilder } from '../builders/template.builder';
import { fetchPage } from '../queries/page';
import { fetchSitemap } from '../queries/sitemap';

const SlugPage = ({ config, page }) => {
  if (!page) return 'loading';
  return (
    <>
      <TemplatesBuilder page={page} />
    </>
  );
};

export default SlugPage;

export const getStaticProps = async ({ params, locale = BASIC_LOCALE }) => {
  // 1. determining the requested path
  const { slug = '' } = params;
  const path = Array.isArray(slug) ? slug.join('/') : '';
  const notFound = { notFound: true, revalidate: 10 };

  // 2. fetching all existing pages
  const sitemap = await fetchSitemap(true);
  if (!sitemap.length) return notFound;

  // 3. matching the requested page with existing pages
  const findPageData = (pathString, lang) => {
    return sitemap.find(
      (page) => page.path.join('/') === pathString && page.__i18n_lang === lang,
    );
  };

  let pageData = findPageData(path, locale);
  // try to find requested page with basic locale if initial locale not found
  if (!pageData && locale !== BASIC_LOCALE) {
    pageData = findPageData(path, BASIC_LOCALE);
  }
  if (!pageData) return notFound;

  // check if page has redirect and next.js state !== production build
  if (process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD) {
    if (pageData?.redirect) {
      return {
        redirect: {
          permanent: pageData?.redirect?.permanent,
          destination: pageData?.redirect?.destination,
        },
        revalidate: 10,
      };
    }
  }

  // 4. fetching page data
  const page = await fetchPage(pageData, locale);
  if (!page) return notFound;

  const pageI18nPaths = getI18nPath(sitemap, pageData);
  const props = {
    ...page,
    pageI18nPaths,
  };

  return { props, revalidate: 10 };
};

export const getStaticPaths = async () => {
  const sitemap = await fetchSitemap();

  return {
    // eslint-disable-next-line camelcase
    paths: sitemap.pages.map(({ path, __i18n_lang }) => ({
      params: { slug: path },
      // eslint-disable-next-line camelcase
      locale: __i18n_lang,
    })),
    fallback: true,
  };
};
