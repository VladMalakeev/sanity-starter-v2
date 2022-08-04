import { DYNAMIC_TYPES } from '../../../../../utils/constants';
import { PageReference } from '../../../../src/components/routing/RouteReferenceItem';
import { DEFAULT_LANGUAGE, I18N, pageGroups } from '../../../helpers/commonfields';
import { dynamicSlugValidation } from '../../../helpers/functions';
import {
  EXCLUDE_SITEMAP,
  PAGE_REDIRECT,
  PAGE_SEO,
  PAGE_SLUG,
  PAGE_TEMPLATE,
  PAGE_TITLE,
} from '../../../helpers/pageFields';

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
      name: 'author',
      title: 'Author full name',
      type: 'string',
      group: 'general',
    },
    {
      name: 'image',
      title: 'Author image',
      type: 'image',
      group: 'general',
    },
    {
      name: 'content',
      title: 'Post content',
      type: 'text',
      group: 'general',
    },
    PAGE_REDIRECT,
    PAGE_TEMPLATE,
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
      if (fields?.template?.useTemplate && !fields?.template?.template)
        return 'Please select template';

      return true;
    }),
  preview: {
    select: {
      title: 'title',
    },
    component: PageReference,
  },
};

export default blog;
