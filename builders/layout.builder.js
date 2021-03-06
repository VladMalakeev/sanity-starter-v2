import React from 'react';

import { LAYOUT_TYPES } from '@/utils/sanity/consants';

import { BreadcrumbsLayout } from '../layouts/breadcrumbs/breadcrumbs.layout';
import { FooterLayout } from '../layouts/footer/footer.layout';
import { HeaderLayout } from '../layouts/header/header.layout';
import { SitebarLayout } from '../layouts/sitebar/sitebar.layout';

export const LayoutBuilder = ({ layout }) => {
  return (
    <>
      {layout._type === LAYOUT_TYPES['header.layout'] && (
        <HeaderLayout {...layout} />
      )}
      {layout._type === LAYOUT_TYPES['footer.layout'] && (
        <FooterLayout {...layout} />
      )}
      {layout._type === LAYOUT_TYPES['sitebar.layout'] && (
        <SitebarLayout {...layout} />
      )}
      {layout._type === LAYOUT_TYPES['breadcrumbs.layout'] && (
        <BreadcrumbsLayout {...layout} />
      )}
    </>
  );
};

export const LayoutItem = ({ positionId, layouts }) => {
  const layoutObj = layouts.find((item) => item.positionId === positionId);
  if (!layoutObj) return null;
  return <LayoutBuilder layout={layoutObj.layout} />;
};
