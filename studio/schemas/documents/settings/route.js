import { ImLink } from 'react-icons/im';

import { sanityClient } from '../../../helpers/client';
import { RouteReferenceItem } from '../../../src/components/routing/RouteReferenceItem';
import { TITLE_FIELD } from '../../helpers/fields';

const route = {
  name: 'route',
  type: 'document',
  title: 'Routes',
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
      name: 'redirect',
      type: 'string',
      title: 'Redirect settings',
      options: {
        list: [
          {
            title: 'Load first created child',
            value: 'firstChild',
          },
          {
            title: 'Load last created child',
            value: 'lastChild',
          },
          {
            title: 'Select custom child',
            value: 'customPage',
          },
        ],
      },
    },
    {
      name: 'redirectPage',
      title: 'Select page for redirect',
      type: 'reference',
      to: [{ type: 'route' }],
      hidden: ({ parent }) => parent.redirect !== 'customPage',
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
      if (!fields?.slug?.current) return 'Please set slug value';
      const slugError =
        'Such a slug value already exists at the selected routing level, you must change the slug or the parent route';
      if (!fields?.parentRoute) {
        const isSlugExist = await sanityClient.fetch(
          '*[_type == "route" && !defined(parentRoute) && slug.current == $slug && _id != $id][0]',
          { slug: fields.slug.current, id: fields._id },
        );

        if (isSlugExist) return slugError;
      }
      if (fields?.parentRoute) {
        const isSlugExist = await sanityClient.fetch(
          '*[_type == "route" && parentRoute._ref == $parentRoute && slug.current == $slug && _id != $id][0]',
          {
            parentRoute: fields?.parentRoute._ref,
            slug: fields.slug.current,
            id: fields._id,
          },
        );
        if (isSlugExist) return slugError;
      }
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
