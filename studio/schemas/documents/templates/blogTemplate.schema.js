import { TEMPLATE_TYPES } from '../../../../utils/constants';

const blogTemplate = {
  name: TEMPLATE_TYPES['blog.template'],
  title: 'Blog Template',
  type: 'document',
  singleton: true,
  fields: [
    {
      name: 'text',
      title: 'Text',
      type: 'string',
    },
  ],
};

export default blogTemplate;
