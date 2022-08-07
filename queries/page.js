import groq from 'groq';

import { getClient } from '@/utils/sanity/client';

import { templateData } from './components/template';
import { configData } from './config';
import { pageData } from './pages';

const pageQuery = groq`
  {
    "config": ${configData},
    "page": ${pageData},
    "template": ${templateData}
  }
`;

export const fetchPage = async (page) => {
  return getClient().fetch(pageQuery, {
    templateId: page.template,
    pageId: page.id,
    pageType: page.type,
    locale: page.locale,
  });
};
