import { DYNAMIC_TYPES } from '../../../utils/constants';

const link = {
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
    },
    {
      name: 'external',
      title: 'External link',
      description: 'Link to a website, e.g https://www.example.com.',
      type: 'url',
      hidden: ({ parent, value }) => !value && parent?.internal,
    },
    {
      name: 'internal',
      title: 'Internal link',
      type: 'reference',
      description: 'Internal link to a page or blog.',
      to: [
        { type: 'page' },
        ...Object.values(DYNAMIC_TYPES).map((type) => ({ type })),
      ],
      options: {
        filter: `!(_id in path("drafts.**"))`,
      },
      hidden: ({ parent, value }) => !value && parent?.external,
    },
  ],
};

export default link;
