import React from 'react';

import { BreadCrumbsTemplate } from '../templates/breadcrunbs.template';
import { DefaultTemplate } from '../templates/default.template';
import { SiteBarTemplate } from '../templates/sitebar.template';

export const TemplatesBuilder = ({ page }) => {
  const { template } = page;
  return (
    <>
      {template.slug === 'default-template' && <DefaultTemplate {...template} />}
      {template.slug === 'sitebar-template' && <SiteBarTemplate {...template} />}
      {template.slug === 'bread-crumbs-template' && (
        <BreadCrumbsTemplate {...template} />
      )}
    </>
  );
};
