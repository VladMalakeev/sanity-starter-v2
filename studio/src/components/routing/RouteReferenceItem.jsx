import { Box, Spinner } from '@sanity/ui';
import React, { useEffect, useState } from 'react';
import { ImLink } from 'react-icons/im';

import { LANGUAGES, MAX_NESTING_LEVEL } from '../../../../utils/constants';
import { sanityClient } from '../../../helpers/client';

export const PageReference = ({ value }) => {
  const [page, setPage] = useState(null);
  useEffect(() => {
    let isMounted = true;
    getPageFullPath(value).then((pageData) => {
      if (isMounted) setPage(pageData);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const locale = LANGUAGES.length > 1 ? `${page?.lang}` : '';

  return (
    <Box padding={4} display="flex" style={{ alignItems: 'center' }}>
      <ImLink style={{ marginRight: '15px' }} />
      <span style={{ fontSize: '16px', fontWeight: '500' }}>
        {!page && <Spinner muted />}
        {page && `${locale}${page.home ? '/ (home page)' : page?.path ?? ''}`}
      </span>
    </Box>
  );
};

const nestedRouteQuery = (maxLevel, referenceName) => {
  let level = ``;
  let path = ``;
  let slug = `slug.current,`;

  const nestingPreview = (maxCount) => {
    let view = `"/"`;
    for (let i = maxCount; i >= 0; i--) {
      view = `${view} + level${i} + "/"`;
    }
    return view;
  };

  for (let i = 0; i < maxLevel; i++) {
    level += `"level${i}": ${slug}`;
    slug = `${referenceName}->${slug}`;
    path += `defined(level${maxLevel - i - 1}) => ${nestingPreview(
      maxLevel - i - 1,
    )}, `;
  }

  return `*[_type == $type && _id == $id][0]{
    "lang": __i18n_lang,
    home,
    ${level}  
  }{
    "path":select(${path}),
    home,
    lang
  }`;
};

export const getPageFullPath = async ({ _id, _type }) => {
  const query = nestedRouteQuery(MAX_NESTING_LEVEL, 'parent');
  const result = await sanityClient.fetch(query, {
    type: _type,
    id: _id,
  });

  return result;
};
