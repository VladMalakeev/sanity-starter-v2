import React from 'react';

import { LAYOUT_POSITIONS } from '@/utils/constants';

import { ContentBuilder } from '../../builders/content.builder';
import { LayoutBuilder } from '../../builders/layout.builder';

import styles from './styles.module.scss';

export const ProductsTemplate = ({ page, positions }) => {
  return (
    <div>
      <header>
        <LayoutBuilder layout={positions[LAYOUT_POSITIONS.header]} />
      </header>

      <div>
        <LayoutBuilder layout={positions[LAYOUT_POSITIONS.breadcrumbs]} />
      </div>

      <div className={styles.contentWrapper}>
        <ContentBuilder page={page} />
      </div>
    </div>
  );
};
