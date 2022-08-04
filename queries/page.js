import groq from 'groq';

import { getClient } from '@/utils/sanity/client';

import { templateView } from './components/pageFields';
import { configData } from './config';
import { layoutView } from './layouts';
import { pagesView } from './pages';

const pageQuery = groq`
  {
    "config": ${configData},
    "page": ${pagesView},
    "template": coalesce(
        *[_type == "template" && _id == $templateId][0]${templateView},
        *[_type == "template" && isDefault == true][0]${templateView},
        ${layoutView}
      )
  }
`;

export const fetchPage = async (route) => {
  return getClient().fetch(pageQuery, {
    templateId: route.template,
    pageId: route.pageId,
    pageType: route.pageType,
  });
};
