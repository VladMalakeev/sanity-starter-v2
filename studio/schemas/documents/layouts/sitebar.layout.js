import { LAYOUT_TYPES } from '../../../../utils/sanity/consants';

const sitebar = {
  name: LAYOUT_TYPES['sitebar.layout'],
  title: 'SiteBar',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Layout name',
      type: 'string',
    },
    {
      name: 'linksList',
      type: 'array',
      of: [
        {
          name: 'link',
          title: 'Link Item',
          type: 'reference',
          to: [{ type: 'route' }],
        },
      ],
    },
  ],
};

export default sitebar;
