import React from 'react';

import { TEMPLATE_TYPES } from '@/utils/constants';

import { BlogTemplate } from '../templates/blog/blog.template';
import { DefaultTemplate } from '../templates/default/default.template';
import { ProductsTemplate } from '../templates/products/products.template';
import { ContentBuilder } from './content.builder';

export const TemplatesBuilder = ({ page, template }) => {
  if (!template) return <ContentBuilder page={page} />;
  return (
    <>
      {template?._type === TEMPLATE_TYPES['default.template'] && (
        <DefaultTemplate page={page} layouts={template?.layouts} />
      )}
      {template?._type === TEMPLATE_TYPES['blog.template'] && (
        <BlogTemplate page={page} positions={template?.positions} />
      )}
      {template?._type === TEMPLATE_TYPES['product.template'] && (
        <ProductsTemplate page={page} positions={template?.positions} />
      )}
    </>
  );
};
