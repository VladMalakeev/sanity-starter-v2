import React from 'react';

import { LAYOUT_POSITIONS } from '@/utils/constants';

import { LayoutItem } from '../../builders/layout.builder';
import { PageBuilder } from '../../builders/pageBuilder';

import styles from './styles.module.scss';

export const BlogTemplate = ({ page, layouts }) => {
  return (
    <div>
      <header>
        <LayoutItem
          layouts={layouts}
          positionId={LAYOUT_POSITIONS['default-header']}
        />
      </header>
      <div className={styles.contentWrapper}>
        <div className={styles.sitebarWraper}>
          <LayoutItem
            layouts={layouts}
            positionId={LAYOUT_POSITIONS['left-sitebar']}
          />
        </div>
        <div className={styles.moduleWrapper}>
          <PageBuilder page={page} />
        </div>
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
