import React from 'react';

import { urlFor } from '@/utils/sanity/client';

import styles from './styles.module.scss';

export const ContentModule = ({ title, description, image }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
      <img className={styles.image} width={600} src={urlFor(image.asset._ref)} />
    </div>
  );
};
