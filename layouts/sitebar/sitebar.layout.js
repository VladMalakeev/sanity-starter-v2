import Link from 'next/link';
import React from 'react';

import styles from './styles.module.scss';

export const SitebarLayout = ({ title }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <div>
        <div className={styles.item}>
          <Link href="blog/pellentesque-eget-gravida-nunc">
            Pellentesque eget gravida nunc
          </Link>
        </div>
        <div className={styles.item}>
          <Link href="blog/pellentesque-habitant-morbi-tristique-senectus-et-netus">
            Pellentesque habitant morbi
          </Link>
        </div>
        <div className={styles.item}>
          <Link href="blog/in-molestie-semper-magna-non-aliquam-sapien-nam-justo-ante">
            In-molestie-semper-magna
          </Link>
        </div>
      </div>
    </div>
  );
};
