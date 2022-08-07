import { FcDocument } from 'react-icons/fc';

import { sanityClient } from '../../../helpers/client';
import { PageReference } from '../../../src/components/routing/RouteReferenceItem';
import { DEFAULT_LANGUAGE, I18N, pageGroups } from '../../helpers/commonfields';
import { langRefFilter, pagesSlugValidation } from '../../helpers/functions';
import {
  EXCLUDE_SITEMAP,
  PAGE_REDIRECT,
  PAGE_SEO,
  PAGE_SLUG,
  PAGE_TITLE,
} from '../../helpers/pageFields';
import modules from '../modules/schema';

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
          filter: `_type == "page" && !home && nesting && _id != $id && !(_id in path("drafts.**"))`,
          params: { id: document._id.split('.').pop() },
        }),
      },
    },
    {
      name: 'modules',
      title: 'List of modules',
      type: 'array',
      description:
        'select any modules to create page content, also you can change the order of modules',
      group: 'general',
      of: modules.map((module) => ({
        title: module.title,
        name: module.name,
        type: 'reference',
        to: [
          {
            type: module.name,
          },
        ],
        options: {
          filter: langRefFilter,
        },
      })),
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
      // slug validation
      const slugError = await pagesSlugValidation(fields);
      if (slugError) return slugError;
      // home gage validation
      const isHomePageAssigned = await sanityClient.fetch(
        '*[_type == "page" && home == true && !(_id match "drafts.**")]',
      );

      if (isHomePageAssigned.length) {
        const currentPage = isHomePageAssigned.find(
          (page) => String(fields._id).indexOf(page._id) !== -1,
        );

        if (!currentPage && fields.home)
          return 'Only one home page entity must be defined!';
      }

      // dynamic type validation
      if (
        fields?.dynamicConfig?.dynamicParent &&
        !fields?.dynamicConfig?.dynamicType
      )
        return 'Please select dynamic type';

      // redirects validation
      if (fields?.redirect?.useRedirect && !fields?.redirect?.redirectPage)
        return 'Please select redirect page';

      // templates validation
      if (
        fields?.templateConfig?.useTemplate &&
        !fields?.templateConfig?.currentPage &&
        !fields?.templateConfig?.childPages
      )
        return 'Please select template';

      return true;
    }),
};

export default pageSchema;
