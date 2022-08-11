import groq from 'groq';

import { dynamicPage } from './dynamicPage';
import { staticPage } from './staticPage';

export const pageData = groq`
*[_type == $pageType && _id == $pageId][0]{
  ${staticPage},
  ${dynamicPage},
}
`;
