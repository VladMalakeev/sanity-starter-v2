import { groq } from 'next-sanity';
import React from 'react';

import Layout from '@/components/Layout';
import '@/styles/index.scss';
import { getClient } from '@/utils/sanity/client';

// const configQuery = `*[_id == "siteConfig"]`;

function MyApp({ Component, pageProps, siteconfig }) {
  return (
    <Layout siteconfig={siteconfig}>
      <Component {...pageProps} />
    </Layout>
  );
}

MyApp.getInitialProps = async () => {
  const querySiteConfig = groq`*[_type=="siteConfig"][0]`;
  const LayoutData = await getClient().fetch(querySiteConfig);
  return { siteconfig: LayoutData };
};

export default MyApp;
