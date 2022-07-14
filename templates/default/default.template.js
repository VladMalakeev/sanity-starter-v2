import React from 'react';

import { LAYOUT_POSITIONS } from '@/utils/sanity/consants';

import { LayoutItem } from '../../builders/layout.builder';
import { PageBuilder } from '../../builders/pageBuilder';

import styles from './styles.module.scss';

export const DefaultTemplate = ({ page, layouts }) => {
  return (
    <div>
      <header>
        <LayoutItem
          layouts={layouts}
          positionId={LAYOUT_POSITIONS['default-header']}
        />
      </header>
      <div className={styles.contentWrapper}>
        <PageBuilder page={page} />
      </div>
      <footer>
        <LayoutItem
          layouts={layouts}
          positionId={LAYOUT_POSITIONS['default-footer']}
        />
      </footer>
    </div>
  );
};
