import React from 'react';

import { DYNAMIC_TYPES } from '@/utils/constants';

import ModuleBuilder from './module.builder';

export const ContentBuilder = ({ page }) => {
  if (!page?._type) {
    console.error('Invalid page type!!!');
    return null;
  }
  const dynamicTypes = Object.values(DYNAMIC_TYPES);

  return (
    <>
      {page?._type === 'page' && <ModuleBuilder modules={page?.modules} />}
      {dynamicTypes.includes(page?._type) && (
        <ModuleBuilder modules={page?.modules} />
      )}
    </>
  );
};
