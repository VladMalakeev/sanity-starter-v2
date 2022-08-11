import { LAYOUT_TYPES } from '../../../../utils/constants';
import { DEFAULT_LANGUAGE, I18N } from '../../helpers/commonfields';

const sitebar = {
  name: LAYOUT_TYPES.sitebar,
  title: 'SiteBar',
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
      name: 'menu',
      title: 'Menu items',
      type: 'array',
      of: [
        {
          name: 'item',
          title: 'Menu item',
          type: 'link',
        },
      ],
    },
  ],
};

export default sitebar;
