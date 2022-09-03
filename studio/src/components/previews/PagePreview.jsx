import React from 'react';

import styles from './preview.module.css';

export default function ProductsPreview({ document }) {
  const { _type, _id, slug } = document.displayed;

  if (!slug?.current) {
    return (
      <div>You must specify a slug for the page before it can be previewed.</div>
    );
  }

  const url = `${process.env.SANITY_STUDIO_PROJECT_PATH}api/sanity/preview?_id=${_id}&_type=${_type}&secret=${process.env.SANITY_STUDIO_PREVIEW_SECRET}`;

  return (
    <div className={styles.iframeContainer}>
      <iframe title="preview" src={url} />
    </div>
  );
}
