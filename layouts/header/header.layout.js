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
            {item.link === 'blog' && (
              <Link href="blog/pellentesque-habitant-morbi-tristique-senectus-et-netus">
                {item.title}
              </Link>
            )}
            {item.link === 'products' && (
              <Link href="products/sonny-playstation-5">{item.title}</Link>
            )}
            {!['products', 'blog'].includes(item.link) && (
              <Link href={item.link}>{item.title}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
