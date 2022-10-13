import React from 'react';

import { LAYOUT_POSITIONS } from '@/utils/constants';

import { ContentBuilder } from '../../builders/content.builder';
import { LayoutBuilder } from '../../builders/layout.builder';

import styles from './styles.module.scss';

export const BlogTemplate = ({ page, positions }) => {
  return (
    <div>
      {positions && (
        <header>
          <LayoutBuilder layout={positions[LAYOUT_POSITIONS.header]} />
        </header>
      )}
      <div className={styles.contentWrapper}>
        {positions && (
          <div className={styles.sitebarWraper}>
            <LayoutBuilder layout={positions[LAYOUT_POSITIONS.sitebar]} />
          </div>
        )}
        <div className={styles.moduleWrapper}>
          <ContentBuilder page={page} />
        </div>
      </div>

      {positions && (
        <footer>
          <LayoutBuilder layout={positions[LAYOUT_POSITIONS.footer]} />
        </footer>
      )}
    </div>
  );
};
