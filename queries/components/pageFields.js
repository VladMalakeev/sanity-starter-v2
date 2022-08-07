import groq from 'groq';

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
   "currentPage":currentPage._ref,
   "childPages":childPages._ref
}
`;
