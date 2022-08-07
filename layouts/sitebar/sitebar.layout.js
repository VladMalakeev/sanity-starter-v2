import Link from 'next/link';
import React from 'react';

import styles from './styles.module.scss';

export const SitebarLayout = ({ title, menu }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <ul>
        {menu.map((item) => (
          <li key={item._key} className={styles.item}>
            <Link href={item.url}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
