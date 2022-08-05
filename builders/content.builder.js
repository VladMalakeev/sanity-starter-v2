import React from 'react';

import { BlogModule } from '../modules/blog/blog.module';
import { ProductModule } from '../modules/product/product.module';
import ModuleBuilder from './module.builder';

export const ContentBuilder = ({ page }) => {
  if (!page?._type) return 'Invalid page type!!!';
  return (
    <>
      {page._type === 'page' && <ModuleBuilder modules={page.modules} />}
      {page._type !== 'page' && (
        <>
          <ModuleBuilder modules={page.modules.before} />
          {page._type === 'products' && <ProductModule {...page.content} />}
          {page._type === 'blog' && <BlogModule {...page.content} />}
          <ModuleBuilder modules={page.modules.after} />
        </>
      )}
    </>
  );
};
