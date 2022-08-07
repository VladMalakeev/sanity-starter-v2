import groq from 'groq';

import { blog } from './blog';
import { page } from './page';
import { product } from './product';

export const pageData = groq`
*[_type == $pageType && _id == $pageId][0]{
  ${page},
  ${blog},
  ${product},
}
`;
