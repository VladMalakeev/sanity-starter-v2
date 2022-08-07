import { LAYOUT_TYPES } from '../../../../utils/constants';
import { DEFAULT_LANGUAGE } from '../../helpers/commonfields';

const sitebar = {
  name: LAYOUT_TYPES.sitebar,
  title: 'SiteBar',
  type: 'document',
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
