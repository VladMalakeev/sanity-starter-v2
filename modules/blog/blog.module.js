import React from 'react';

import { urlFor } from '@/utils/sanity/client';

import styles from './styles.module.scss';

export const BlogModule = ({ author, image, content }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.authorWrap}>
        <img
          className={styles.authorImage}
          width={60}
          src={urlFor(image.asset._ref)}
        />
        <span className={styles.authorName}>{author}</span>
      </div>
      <div className={styles.contentWrapper}>{content}</div>
    </div>
  );
};
