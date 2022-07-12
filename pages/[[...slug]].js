import router from 'next/router';
import React from 'react';

import { fetchPage } from '../queries/page';
import { fetchSitemap } from '../queries/sitemap';

const SlugPage = ({ page }) => {
  if (!page) return 'loading';
  return <div>page title - {page.title}</div>;
};

export default SlugPage;

export const getStaticProps = async ({ params }) => {
  const { slug = '' } = params;
  const path = Array.isArray(slug) ? slug.join('/') : '/';

  const sitemap = await fetchSitemap();
  if (!sitemap.pages.length) return { notFound: true };

  // redirects take precedence over page content
  const redirect = sitemap.redirects.find((route) => route.path.join('/') === path);
  if (redirect) {
    return {
      redirect: {
        permanent: false,
        destination: `/${redirect.redirectPath.join('/')}`,
      },
    };
  }

  // if no redirects, we try to get the content of the page
  const currentRoute = sitemap.pages.find((route) => route.path.join('/') === path);
  if (!currentRoute) return { notFound: true };

  const page = await fetchPage(currentRoute.id);
  if (!page) return { notFound: true };
  const props = {
    page,
  };

  return { props, revalidate: 10 };
};

export const getStaticPaths = async () => {
  const sitemap = await fetchSitemap();

  return {
    paths: sitemap.pages.map((route) => ({
      params: { slug: route.path },
    })),
    fallback: true,
  };
};
