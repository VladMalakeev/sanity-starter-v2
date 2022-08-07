import React from 'react';

import { urlFor } from '@/utils/sanity/client';

import styles from './styles.module.scss';

export const HeroModule = ({ image, title, description }) => {
  return (
    <div
      className={styles.wrapper}
      style={{ backgroundImage: `url(${urlFor(image.asset._ref)})` }}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
};
