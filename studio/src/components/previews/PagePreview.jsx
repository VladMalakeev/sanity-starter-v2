import React from 'react';

import styles from './preview.module.css';

export default function ProductsPreview({ document }) {
  const { _type, slug } = document.displayed;

  if (!slug?.current) {
    return (
      <div>You must specify a slug for the page before it can be previewed.</div>
    );
  }

  const pageSlug = _type === 'home' ? '' : slug.current;
  const url =
    process.env.NODE_ENV === 'production'
      ? `../../${pageSlug}?preview`
      : `http://localhost:3000/${pageSlug}?preview`;

  return (
    <div className={styles.iframeContainer}>
      <iframe title="preview" src={url} />
    </div>
  );
}
