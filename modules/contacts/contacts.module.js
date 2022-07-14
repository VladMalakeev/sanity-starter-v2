import React from 'react';

import styles from './styles.module.scss';

export const ContactsModule = ({ title, fullName, email, phone, address }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <div className={styles.text}>
        <p>
          <span>Name:</span>
          <span className={styles.fields}>{fullName}</span>
        </p>
        <p>
          <span>Email:</span>
          <span className={styles.fields}>{email}</span>
        </p>
        <p>
          <span>Phone:</span>
          <span className={styles.fields}>{phone}</span>
        </p>
        <p>
          <span>Address:</span>
          <span className={styles.fields}>{address}</span>
        </p>
      </div>
    </div>
  );
};
