import React from 'react';

import { LAYOUT_TYPES } from '@/utils/constants';

import { BreadcrumbsLayout } from '../layouts/breadcrumbs/breadcrumbs.layout';
import { FooterLayout } from '../layouts/footer/footer.layout';
import { HeaderLayout } from '../layouts/header/header.layout';
import { SitebarLayout } from '../layouts/sitebar/sitebar.layout';

export const LayoutBuilder = ({ layout }) => {
  if (!layout?._type) return null;
  return (
    <>
      {layout?._type === LAYOUT_TYPES?.header && <HeaderLayout {...layout} />}
      {layout?._type === LAYOUT_TYPES?.footer && <FooterLayout {...layout} />}
      {layout?._type === LAYOUT_TYPES?.sitebar && <SitebarLayout {...layout} />}
      {layout?._type === LAYOUT_TYPES?.breadcrumbs && (
        <BreadcrumbsLayout {...layout} />
      )}
    </>
  );
};
