import Layout from '@/components/Layout';
import '@/styles/index.scss';

const configQuery = `*[_id == "siteConfig"]`;

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
