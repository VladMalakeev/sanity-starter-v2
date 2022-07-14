import { MODULE_TYPES } from '../../../../utils/sanity/consants';

const heroModule = {
  name: MODULE_TYPES['hero.module'],
  type: 'document',
  title: 'Hero module',
  fields: [
    {
      name: 'title',
      title: 'Page title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Page description',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Preview image',
      type: 'image',
    },
  ],
};

export default heroModule;
