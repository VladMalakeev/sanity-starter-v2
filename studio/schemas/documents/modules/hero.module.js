import { MODULE_TYPES } from '../../../../utils/constants';
import { DEFAULT_LANGUAGE, I18N } from '../../helpers/commonfields';

const heroModule = {
  name: MODULE_TYPES['hero.module'],
  type: 'document',
  title: 'Hero module',
  i18n: I18N,
  initialValue: {
    ...DEFAULT_LANGUAGE,
  },
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
