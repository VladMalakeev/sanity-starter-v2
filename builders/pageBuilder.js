import React from 'react';

import { BlogModule } from '../modules/blog/blog.module';
import { ProductModule } from '../modules/product/product.module';
import ModuleBuilder from './module.builder';

export const PageBuilder = ({ page }) => {
  if (!page?._type) return 'Invalid page type!!!';
  return (
    <>
      {page._type === 'staticPages' && <ModuleBuilder modules={page.modules} />}
      {page._type === 'products' && <ProductModule {...page} />}
      {page._type === 'blog' && <BlogModule {...page} />}
    </>
  );
};
