import { ImLink } from 'react-icons/im';

import { REDIRECT_TYPES } from '../../../../utils/sanity/consants';
import { sanityClient } from '../../../helpers/client';
import { RouteReferenceItem } from '../../../src/components/routing/RouteReferenceItem';
import { TITLE_FIELD } from '../../helpers/fields';
import { listFormat } from '../../helpers/functions';

const route = {
  name: 'route',
  type: 'document',
  title: 'Routes',
  fieldsets: [
    {
      title: 'Redirect settings',
      name: 'redirect',
      options: {
        collapsed: true,
        collapsable: true,
      },
    },
  ],
  fields: [
    TITLE_FIELD,
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      validate: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: () => true,
      },
    },
    {
      name: 'useRedirect',
      type: 'boolean',
      title: 'Use a redirect for this route?',
      description: "If redirect is enabled, you won't see page content",
      fieldset: 'redirect',
      initialValue: false,
    },
    {
      name: 'redirectType',
      type: 'string',
      title: 'Redirect type',
      options: {
        // TODO:create auto redirect for child pages
        list: Object.values(REDIRECT_TYPES).map((value) => listFormat(value)),
      },
      hidden: ({ parent }) => !parent.useRedirect,
      initialValue: REDIRECT_TYPES.customPage,
      fieldset: 'redirect',
    },
    {
      // TODO: add redirects for dynamic pages
      // now works only static pages
      name: 'redirectPage',
      title: 'Select page for redirect',
      type: 'reference',
      to: [{ type: 'route' }],
      hidden: ({ parent }) => parent.redirectType !== REDIRECT_TYPES.customPage,
      fieldset: 'redirect',
    },
    {
      name: 'parentRoute',
      type: 'reference',
      title: 'Parent route',
      to: [{ type: 'route' }],
      readOnly: ({ parent }) => !parent?._createdAt,
      options: {
        filter: ({ document }) => ({
          filter: '_type == "route" ',
          params: {
            level: document?.level ? document?.level - 1 : null,
          },
        }),
      },
    },
  ],
  validation: (Rule) =>
    Rule.custom(async (fields) => {
      // slug validation
      if (!fields?.slug?.current) return 'Please set slug value';

      let query = '';
      if (!fields?.parentRoute) {
        query =
          '*[_type == "route" && !defined(parentRoute) && slug.current == $slug][0]';
      } else if (fields?.parentRoute) {
        query =
          '*[_type == "route" && parentRoute._ref == $parentRoute && slug.current == $slug][0]';
      }

      const resultValue = await sanityClient.fetch(query, {
        slug: fields.slug.current,
        parentRoute: fields?.parentRoute?._ref ?? '',
      });

      if (!resultValue) return true;

      const fieldId = fields._id.split('.').pop();
      const valueId = resultValue._id.split('.').pop();

      if (fieldId !== valueId)
        return 'Such a slug value already exists at the selected routing level, you must change the slug or the parent route';

      // redirect validation
      if (fields.useRedirect && !fields.redirectType)
        return 'Set valid redirect type';

      return true;
    }),
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
        media: ImLink,
      };
    },
    component: RouteReferenceItem,
  },
};

export default route;
