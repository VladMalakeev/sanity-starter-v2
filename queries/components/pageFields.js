import groq from 'groq';

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

export const templateView = groq`{
  ...,
  "slug": slug.current,
  layouts []{
    positionId,
      "layout": layout-> ${layoutView}
    }
  }
`;
