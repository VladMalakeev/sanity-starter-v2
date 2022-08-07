import React from 'react';

import { LAYOUT_TYPES } from '@/utils/constants';
import { findLayout } from '@/utils/functions';

import { ContentBuilder } from '../../builders/content.builder';
import { LayoutBuilder } from '../../builders/layout.builder';

import styles from './styles.module.scss';

export const DefaultTemplate = ({ page, layouts = [] }) => {
  return (
    <div>
      <header>
        <LayoutBuilder layout={findLayout(layouts, LAYOUT_TYPES.header)} />
      </header>
      <div className={styles.contentWrapper}>
        <ContentBuilder page={page} />
      </div>
      <footer>
        <LayoutBuilder layout={findLayout(layouts, LAYOUT_TYPES.footer)} />
      </footer>
    </div>
  );
};
