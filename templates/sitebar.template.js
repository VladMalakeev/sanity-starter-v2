import React from 'react';

import { LayoutBuilder, LayoutItem } from '../builders/layout.builder';

export const SiteBarTemplate = ({ modules, layouts }) => {
  return (
    <div>
      <header>
        <LayoutItem layouts={layouts} positionId="default_header" />
      </header>
      <div>
        <div>
          <LayoutItem layouts={layouts} positionId="left_sitebar" />
        </div>
        <div>{modules}</div>
      </div>
      <footer>
        <LayoutItem layouts={layouts} positionId="default_footer" />
      </footer>
    </div>
  );
};
