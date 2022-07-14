import groq from 'groq';

import { getClient } from '@/utils/sanity/client';

const pageQuery = groq`
  {
    "pageData": *[_type == $pageType && _id == $pageId][0]{
      ...,
      modules []->
    },
    "template": coalesce(
        *[_type == "template" && _id == $templateId][0],
        *[_type == "template" && isDefault == true][0]
      ){
      ...,
      "slug": slug.current,
      layouts []{
        positionId,
        "layout": layout-> {
          _type == 'header.layout' => {
            ...,
            menu []{
              ...,
              "link": link->slug.current
            }
          },
          _type == 'footer.layout' => {
            ...,
          },
          _type == 'sitebar.layout' => {
            ...,
          },
          _type == 'breadcrumbs.layout' => {
            ...
          },
        }
      }
    }
  }
`;

export const fetchPage = async (route) => {
  return getClient().fetch(pageQuery, {
    templateId: route.template,
    pageId: route.pageId,
    pageType: route.pageType,
  });
};
