import React from 'react';

import styles from './styles.module.scss';

export const FooterLayout = ({ description }) => {
  return <div className={styles.wrapper}>{description}</div>;
};
