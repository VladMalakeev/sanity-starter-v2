import { MODULE_TYPES } from '../../../../utils/constants';
import { DEFAULT_LANGUAGE } from '../../helpers/commonfields';

const contentModule = {
  name: MODULE_TYPES['content.module'],
  type: 'document',
  title: 'Content module',
  initialValue: {
    ...DEFAULT_LANGUAGE,
  },
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
