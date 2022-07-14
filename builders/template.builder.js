import React from 'react';

import { BlogTemplate } from '../templates/blog/blog.template';
import { DefaultTemplate } from '../templates/default/default.template';
import { ProductsTemplate } from '../templates/products/products.template';
import ModuleBuilder from './module.builder';

export const TemplatesBuilder = ({ page }) => {
  const { template, pageData } = page;

  if (!template) return <ModuleBuilder modules={pageData.modules} />;
  return (
    <>
      {template?.slug === 'default-template' && (
        <DefaultTemplate page={pageData} layouts={template?.layouts} />
      )}
      {template?.slug === 'blog-template' && (
        <BlogTemplate page={pageData} layouts={template?.layouts} />
      )}
      {template?.slug === 'products-template' && (
        <ProductsTemplate page={pageData} layouts={template?.layouts} />
      )}
    </>
  );
};
