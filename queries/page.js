import groq from 'groq';

import { getClient } from '@/utils/sanity';

const pageQuery = groq`
  *[_type in $pageTypes && _id == $id][0]{
    ...
  }
`;

const dynamicPagesQuery = groq`
  *[_type == "routeSettings"][0]{
    "types": routesList[].documentType,
  }.types
`;

export const fetchPage = async (id) => {
  const dynamicPageTypes = await getClient().fetch(dynamicPagesQuery);
  return getClient().fetch(pageQuery, {
    id,
    pageTypes: [...dynamicPageTypes, 'staticPages'],
  });
};
