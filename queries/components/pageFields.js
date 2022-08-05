import groq from 'groq';

import { LAYOUT_POSITIONS } from '@/utils/constants';

import { layoutView } from '../layouts';

export const parentView = groq`
  "parent": {
    "slug": parent->slug.current,
    "_id": parent->_id
  }
`;

export const slugView = groq`
 "slug": coalesce(slug.current, '')
`;

export const redirectView = groq`
redirect {
    useRedirect,
    permanent,
    "slug": redirectPage->slug.current,
    "locale": redirectPage->__i18n_lang,
    "parent":{
      "_id": redirectPage->parent->_id
    }
  }
`;

export const templateView = groq`
templateConfig {
   useTemplate,
   templateRules,
   "template":template._ref
}
`;

const positions = Object.values(LAYOUT_POSITIONS).map(
  (position) => `"${position}":${position}->${layoutView},`,
);

export const templateDocument = groq`{
  ...,
  positions {
   ${positions.join('')}
  }
}`;
