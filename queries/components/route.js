import groq from 'groq';

export const parentRouteView = groq`
  "parentRoute": {
    "slug": parentRoute->slug.current,
    "_id": parentRoute->_id
  }
`;

export const slugView = groq`
 "slug": coalesce(slug.current, '')
`;
