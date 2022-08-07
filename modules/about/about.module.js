import React from 'react';

import styles from './styles.module.scss';

export const AboutModule = ({ title, services }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <div className={styles.itemsWrap}>
        {services.map((service) => (
          <div className={styles.item}>
            <p>{service.title}</p>
            <div>{service.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
