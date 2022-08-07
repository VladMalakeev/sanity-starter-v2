import { FcKindle } from 'react-icons/fc';

import { DYNAMIC_TYPES } from '../../../../utils/constants';
import { PageReference } from '../../../src/components/routing/RouteReferenceItem';
import { DEFAULT_LANGUAGE, I18N, pageGroups } from '../../helpers/commonfields';
import { dynamicSlugValidation } from '../../helpers/functions';
import {
  EXCLUDE_SITEMAP,
  PAGE_REDIRECT,
  PAGE_SEO,
  PAGE_SLUG,
  PAGE_TITLE,
} from '../../helpers/pageFields';

const blog = {
  name: DYNAMIC_TYPES.blog,
  type: 'document',
  title: 'Blog',
  i18n: I18N,
  initialValue: {
    ...DEFAULT_LANGUAGE,
  },
  groups: pageGroups,
  fields: [
    PAGE_TITLE,
    PAGE_SLUG,
    PAGE_SEO,
    EXCLUDE_SITEMAP,
    {
      name: 'parent',
      type: 'reference',
      description: 'Select the parent route for this page',
      to: [{ type: 'page' }],
      group: 'general',
      readOnly: true,
      options: {
        filter: ({ document }) => {
          return {
            filter:
              'dynamicConfig.dynamicParent == true && dynamicConfig.dynamicType == $type',
            params: { type: document._type },
          };
        },
      },
    },
    {
      name: 'content',
      title: 'Blog content',
      type: 'object',
      group: 'general',
      fields: [
        {
          name: 'author',
          title: 'Author full name',
          type: 'string',
        },
        {
          name: 'image',
          title: 'Author image',
          type: 'image',
        },
        {
          name: 'content',
          title: 'Post content',
          type: 'text',
        },
      ],
    },
    PAGE_REDIRECT,
  ],
  validation: (Rule) =>
    Rule.custom(async (fields) => {
      // slug validation
      const slugError = await dynamicSlugValidation(fields);
      if (slugError) return slugError;

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
  preview: {
    select: {
      title: 'title',
      content: 'content',
    },
    prepare({ title, content }) {
      return {
        title,
        media: content?.image ?? FcKindle,
      };
    },
    component: PageReference,
  },
};

export default blog;