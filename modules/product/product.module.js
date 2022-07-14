import React from 'react';

import { urlFor } from '@/utils/sanity/client';

import styles from './styles.module.scss';

export const ProductModule = ({
  title,
  shortDescription,
  fullDescription,
  image,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <div className={styles.shortDescription}>
        <img width={500} src={urlFor(image.asset._ref)} />
        <span>{shortDescription}</span>
      </div>
      <div className={styles.fullDescription}>{fullDescription}</div>
    </div>
  );
};
