import groq from 'groq';

import { LAYOUT_TYPES, TEMPLATE_TYPES } from '@/utils/constants';
import { getClient } from '@/utils/sanity/client';

import { templateDocument } from './components/pageFields';
import { configData } from './config';
import { layoutView } from './layouts';
import { pagesView } from './pages';

const pageQuery = groq`
  {
    "config": ${configData},
    "page": ${pagesView},
    "template": coalesce(
      *[_type == $template][0]${templateDocument},
      *[_type in $templateList && isDefault == true][0]${templateDocument},
      {
      "_type": "${TEMPLATE_TYPES['default.template']}",
       "layouts": *[_type in $layoutsList]${layoutView}
      }
    )
  }
`;

export const fetchPage = async (page) => {
  return getClient().fetch(pageQuery, {
    template: page.template,
    templateList: Object.values(TEMPLATE_TYPES),
    layoutsList: Object.values(LAYOUT_TYPES),
    pageId: page.id,
    pageType: page.type,
    locale: page.locale,
  });
};
