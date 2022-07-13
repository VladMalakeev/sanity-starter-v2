import React from 'react';

import { LayoutBuilder, LayoutItem } from '../builders/layout.builder';

export const DefaultTemplate = ({ modules, layouts }) => {
  return (
    <div>
      <header>
        <LayoutItem layouts={layouts} positionId="default_header" />
      </header>
      <div>{modules}</div>
      <footer>
        <LayoutItem layouts={layouts} positionId="default_footer" />
      </footer>
    </div>
  );
};
