import Link from 'next/link';
import React from 'react';

import { urlFor } from '@/utils/sanity/client';

import styles from './styles.module.scss';

export const HeaderLayout = ({ title, logo, menu }) => {
  return (
    <div className={styles.wrapper}>
      <img width={70} src={urlFor(logo.asset._ref)} />
      <span className={styles.title}>
        <Link href="/">{title}</Link>
      </span>
      <ul className={styles.list}>
        {menu.map((item) => (
          <li key={item._key} className={styles.item}>
            <Link href={item.link}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
