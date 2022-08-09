import { FcDocument } from 'react-icons/fc';

import { MAX_NESTING_LEVEL } from '../../../../utils/constants';
import { PageReference } from '../../../src/components/routing/RouteReferenceItem';
import { DEFAULT_LANGUAGE, I18N, pageGroups } from '../../helpers/commonfields';
import { getLoopPreventionFilter } from '../../helpers/functions';
import {
  EXCLUDE_SITEMAP,
  PAGE_REDIRECT,
  PAGE_SEO,
  PAGE_SLUG,
  PAGE_TITLE,
} from '../../helpers/pageFields';
import {
  dynamicPageValidation,
  homePageValidation,
  pageRedirectValidation,
  pagesSlugValidation,
  pageTemplatesValidation,
} from '../../helpers/validation';
import { commonModules as modules } from '../modules/schema';

const nestingFilter = getLoopPreventionFilter(MAX_NESTING_LEVEL);

const pageSchema = {
  type: 'document',
  name: 'page',
  title: 'Page',
  i18n: I18N,
  initialValue: {
    ...DEFAULT_LANGUAGE,
    home: false,
    nesting: false,
  },
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
        media: FcDocument,
      };
    },
    component: PageReference,
  },
  groups: pageGroups,
  fields: [
    PAGE_TITLE,
    PAGE_SLUG,
    PAGE_SEO,
    EXCLUDE_SITEMAP,
    {
      name: 'home',
      title: 'Set as home page',
      description: 'Only one home page should be defined. Home page must be root',
      type: 'boolean',
      initialValue: false,
      group: 'settings',
      readOnly: ({ document }) => document.parent || document.nesting,
    },
    {
      name: 'nesting',
      title: 'Apply nesting',
      description:
        'the current page will be added as a parent category to Child pages',
      type: 'boolean',
      group: 'settings',
      readOnly: ({ document }) => document.home,
      initialValue: false,
    },
    {
      name: 'parent',
      type: 'reference',
      description: 'Select the parent route for this page',
      to: [{ type: 'page' }],
      group: 'general',
      readOnly: ({ document }) => !document?._createdAt || document.home,
      options: {
        filter: ({ document }) => ({
          filter: `_type == "page" && !home && nesting && _id != $id && !(_id in path("drafts.**")) && ${nestingFilter}`,
          params: {
            id: document._id.split('.').pop(),
          },
        }),
      },
    },
    {
      name: 'modules',
      title: 'List of modules',
      type: 'modules',
      description:
        'select any modules to create page content, also you can change the order of modules',
      group: 'general',
    },
    {
      name: 'dynamicConfig',
      title: 'Dynamic pages',
      type: 'dynamicConfig',
      group: 'settings',
    },
    PAGE_REDIRECT,
  ],
  validation: (Rule) =>
    Rule.custom(async (fields) => {
      const errorsList = [];
      const slugError = await pagesSlugValidation(fields);
      if (slugError) errorsList.push(slugError);

      const homePageError = await homePageValidation(fields);
      if (homePageError) errorsList.push(homePageError);

      const dynamicPageError = dynamicPageValidation(fields);
      if (dynamicPageError) errorsList.push(dynamicPageError);

      const redirectError = pageRedirectValidation(fields);
      if (redirectError) errorsList.push(redirectError);

      const templateError = pageTemplatesValidation(fields);
      if (templateError) errorsList.push(templateError);

      return errorsList;
    }),
};

export default pageSchema;
