import React from 'react';

import { TEMPLATE_TYPES } from '@/utils/constants';

import { BlogTemplate } from '../templates/blog/blog.template';
import { DefaultTemplate } from '../templates/default/default.template';
import { ProductsTemplate } from '../templates/products/products.template';

const initialTemplate = {
  _type: TEMPLATE_TYPES.default,
};

export const TemplatesBuilder = ({ page, template = initialTemplate }) => {
  if (!template?._type) {
    return <DefaultTemplate page={page} layouts={template?.layouts} />;
  }

  return (
    <>
      {template?._type === TEMPLATE_TYPES.blog && (
        <BlogTemplate page={page} positions={template?.positions} />
      )}
      {template?._type === TEMPLATE_TYPES.product && (
        <ProductsTemplate page={page} positions={template?.positions} />
      )}
    </>
  );
};
