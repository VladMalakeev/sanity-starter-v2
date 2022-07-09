import { RouteReferenceItem } from '../../src/components/routing/RouteReferenceItem';

const route = {
  name: 'route',
  type: 'document',
  title: 'Routes',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      initialValue: '',
    },
    {
      name: 'level',
      title: 'Nesting level',
      type: 'number',
      readOnly: ({ parent }) => !parent?._createdAt,
      validation: (Rule) => Rule.integer().positive().max(5),
      options: {
        list: [
          { title: '0', value: 0 },
          { title: '1', value: 1 },
          { title: '2', value: 2 },
        ],
      },
    },
    {
      name: 'parentRoute',
      type: 'reference',
      title: 'Parent route',
      to: [{ type: 'route' }],
      readOnly: ({ parent }) => !parent?._createdAt,
      options: {
        filter: ({ document }) => ({
          filter: '_type == "route" && level == $level',
          params: {
            level: document?.level ? document?.level - 1 : null,
          },
        }),
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
      };
    },
    component: RouteReferenceItem,
  },
};

export default route;
