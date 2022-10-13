import React from 'react';

import styles from './preview.module.css';

export default function ProductsPreview({ document }) {
  const { _type, _id, slug } = document.displayed;

  if (!slug?.current) {
    return (
      <div>You must specify a slug for the page before it can be previewed.</div>
    );
  }

  const domain = process.env.SANITY_STUDIO_PROJECT_PATH ?? 'http://localhost:3000/';
  const url = `${domain ?? ''}/api/sanity/preview?id=${_id}&type=${_type}`;

  return (
    <div className={styles.iframeContainer}>
      <iframe title="preview" src={url} />
    </div>
  );
}
