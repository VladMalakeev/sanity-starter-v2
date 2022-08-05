import React from 'react';

import { LAYOUT_TYPES } from '@/utils/constants';

import { ContentBuilder } from '../../builders/content.builder';
import { LayoutBuilder } from '../../builders/layout.builder';

import styles from './styles.module.scss';

export const DefaultTemplate = ({ page, layouts }) => {
  return (
    <div>
      <header>
        <LayoutBuilder
          layout={layouts.find(
            (layout) => layout._type === LAYOUT_TYPES['header.layout'],
          )}
        />
      </header>
      <div className={styles.contentWrapper}>
        <ContentBuilder page={page} />
      </div>
      <footer>
        <LayoutBuilder
          layout={layouts.find(
            (layout) => layout._type === LAYOUT_TYPES['footer.layout'],
          )}
        />
      </footer>
    </div>
  );
};
