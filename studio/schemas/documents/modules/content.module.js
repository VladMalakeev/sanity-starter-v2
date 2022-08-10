import { MODULE_TYPES } from '../../../../utils/constants';
import { DEFAULT_LANGUAGE, I18N } from '../../helpers/commonfields';

const contentModule = {
  name: MODULE_TYPES.content,
  type: 'document',
  title: 'Content module',
  i18n: I18N,
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
