import React from 'react';

import { LAYOUT_POSITIONS } from '@/utils/sanity/consants';

import { LayoutItem } from '../../builders/layout.builder';
import { PageBuilder } from '../../builders/pageBuilder';

import styles from './styles.module.scss';

export const ProductsTemplate = ({ page, layouts }) => {
  return (
    <div>
      <header>
        <LayoutItem
          layouts={layouts}
          positionId={LAYOUT_POSITIONS['default-header']}
        />
      </header>

      <div>
        <LayoutItem layouts={layouts} positionId={LAYOUT_POSITIONS.breadcrumbs} />
      </div>

      <div className={styles.contentWrapper}>
        <PageBuilder page={page} />
      </div>
    </div>
  );
};
