import groq from 'groq';

import { getClient } from '@/utils/sanity';

const pageQuery = groq`
  *[_type in ['post', 'page'] && _id == $id][0]{
    ...
  }
`;

export const fetchPage = async (id) => {
  return getClient().fetch(pageQuery, { id });
};
