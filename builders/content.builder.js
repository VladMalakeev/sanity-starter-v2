import React from 'react';

import { DYNAMIC_TYPES } from '@/utils/constants';

import { BlogModule } from '../modules/blog/blog.module';
import { ProductModule } from '../modules/product/product.module';
import ModuleBuilder from './module.builder';

export const ContentBuilder = ({ page }) => {
  if (!page?._type) {
    console.error('Invalid page type!!!');
    return null;
  }
  return (
    <>
      {page?._type === 'page' && <ModuleBuilder modules={page?.modules} />}
      {page?._type !== 'page' && (
        <>
          <ModuleBuilder modules={page?.modules?.before} />
          {page?._type === DYNAMIC_TYPES.product && (
            <ProductModule {...page?.content} />
          )}
          {page?._type === DYNAMIC_TYPES.blog && <BlogModule {...page?.content} />}
          <ModuleBuilder modules={page?.modules?.after} />
        </>
      )}
    </>
  );
};
