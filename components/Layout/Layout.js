import React from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

const Layout = ({ siteconfig, children }) => {
  return (
    <div>
      <Header LayoutData={siteconfig} />
      <main>{children}</main>
      <Footer LayoutData={siteconfig} />
    </div>
  );
};

export default Layout;
