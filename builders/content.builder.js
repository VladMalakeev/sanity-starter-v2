import React from 'react';

import ModuleBuilder from './module.builder';

export const ContentBuilder = ({ page }) => {
  if (!page?._type) {
    console.error('Invalid page type!!!');
    return null;
  }

  return (
    <>
      {page?._type === 'page' && <ModuleBuilder modules={page?.modules} />}
      {page?._type !== 'page' && (
        <>
          <ModuleBuilder modules={page?.modules?.before} />
          <ModuleBuilder modules={page?.modules?.content} />
          <ModuleBuilder modules={page?.modules?.after} />
        </>
      )}
    </>
  );
};
