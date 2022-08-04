import React from 'react';

import { TEMPLATE_TYPES } from '@/utils/constants';

import { BlogTemplate } from '../templates/blog/blog.template';
import { DefaultTemplate } from '../templates/default/default.template';
import { ProductsTemplate } from '../templates/products/products.template';
import ModuleBuilder from './module.builder';

export const TemplatesBuilder = ({ page }) => {
  const { template, pageData } = page;

  if (!template) return <ModuleBuilder modules={pageData.modules} />;
  return (
    <>
      {template?._type === TEMPLATE_TYPES['default.template'] && (
        <DefaultTemplate page={pageData} layouts={template?.layouts} />
      )}
      {template?._type === TEMPLATE_TYPES['blog.template'] && (
        <BlogTemplate page={pageData} layouts={template?.layouts} />
      )}
      {template?._type === TEMPLATE_TYPES['product.template'] && (
        <ProductsTemplate page={pageData} layouts={template?.layouts} />
      )}
    </>
  );
};
