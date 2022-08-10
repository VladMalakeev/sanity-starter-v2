import { LAYOUT_TYPES } from '../../../../utils/constants';
import { DEFAULT_LANGUAGE, I18N } from '../../helpers/commonfields';

const footer = {
  name: LAYOUT_TYPES.footer,
  title: 'Footer',
  type: 'document',
  i18n: I18N,
  initialValue: {
    ...DEFAULT_LANGUAGE,
  },
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
