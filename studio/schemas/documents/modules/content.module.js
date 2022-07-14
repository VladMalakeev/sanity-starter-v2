import { MODULE_TYPES } from '../../../../utils/sanity/consants';

const contentModule = {
  name: MODULE_TYPES['content.module'],
  type: 'document',
  title: 'Content module',
  fields: [
    {
      name: 'title',
      title: 'Module title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Page description',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Preview image',
      type: 'image',
    },
  ],
};

export default contentModule;
