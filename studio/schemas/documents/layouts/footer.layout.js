import { LAYOUT_TYPES } from '../../../../utils/sanity/consants';

const footer = {
  name: LAYOUT_TYPES['footer.layout'],
  title: 'Footer',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Layout name',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Copyright',
      type: 'text',
    },
  ],
};

export default footer;
