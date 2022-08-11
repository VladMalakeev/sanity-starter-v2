import AssetSource from 'part:sanity-plugin-media-library/asset-source';

import { LAYOUT_TYPES } from '../../../../utils/constants';
import { DEFAULT_LANGUAGE, I18N } from '../../helpers/commonfields';

const header = {
  name: LAYOUT_TYPES.header,
  title: 'Header',
  type: 'document',
  i18n: I18N,
  initialValue: {
    ...DEFAULT_LANGUAGE,
  },
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { sources: [AssetSource] },
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

export default header;
