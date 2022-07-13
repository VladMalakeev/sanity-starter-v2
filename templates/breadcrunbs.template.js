import React from 'react';

import { LayoutBuilder, LayoutItem } from '../builders/layout.builder';

export const BreadCrumbsTemplate = ({ modules, layouts }) => {
  return (
    <div>
      <header>
        <LayoutItem layouts={layouts} positionId="default_header" />
      </header>

      <div>
        <LayoutItem layouts={layouts} positionId="breadcrumbs_nav" />
      </div>

      <div>{modules}</div>
    </div>
  );
};
