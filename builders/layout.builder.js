import React from 'react';

import { FooterLayout } from '../layouts/footer.layout';
import { HeaderLayout } from '../layouts/header.layout';

export const LayoutBuilder = ({ layout }) => {
  return (
    <>
      {layout._type === 'header.layout' && <HeaderLayout {...layout} />}
      {layout._type === 'footer.layout' && <FooterLayout {...layout} />}
    </>
  );
};

export const LayoutItem = ({ positionId, layouts }) => {
  const layout = layouts.find((item) => item.positionId === positionId);
  if (!layout) return null;
  return <LayoutBuilder layout={layout} />;
};
