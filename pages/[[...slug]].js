import React from 'react';

import { fetchPage } from '../queries/page';
import { fetchSitemap } from '../queries/sitemap';

const SlugPage = ({ page }) => {
  console.log(page);
  if (!page) return 'loading';
  return <div>author {page.author}</div>;
};

export default SlugPage;

export const getStaticProps = async ({ params }) => {
  const { slug = '' } = params;
  const path = Array.isArray(slug) ? slug.join('/') : '/';
  console.log('path', path);
  const sitemap = await fetchSitemap();
  console.log('sitemap', sitemap);
  if (!sitemap.length) return { notFound: true };

  const currentRoute = sitemap.find((route) => route.path.join('/') === path);
  console.log('currentRoute', currentRoute);
  if (!currentRoute) return { notFound: true };
  const page = await fetchPage(currentRoute.id);
  console.log('page', page);
  if (!page) return { notFound: true };
  const props = {
    page,
  };

  return { props, revalidate: 10 };
};

export const getStaticPaths = async () => {
  const sitemap = await fetchSitemap();

  return {
    paths: sitemap.map((route) => ({
      params: { slug: route.path },
    })),
    fallback: true,
  };
};
