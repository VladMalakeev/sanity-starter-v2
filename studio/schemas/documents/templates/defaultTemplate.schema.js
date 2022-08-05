import { ImInsertTemplate } from 'react-icons/im';

import {
  LAYOUT_POSITIONS,
  TEMPLATE_TYPES,
  LAYOUT_TYPES,
} from '../../../../utils/constants';
import { convertObjectToReference } from '../../helpers/functions';

const defaultTemplate = {
  name: TEMPLATE_TYPES['default.template'],
  title: 'Default Template',
  type: 'document',
  singleton: true,
  preview: {
    prepare() {
      return {
        title: 'Default Template',
        media: ImInsertTemplate,
      };
    },
  },
  fields: [
    {
      name: 'isDefault',
      title: 'Set as default template',
      type: 'boolean',
    },
    {
      name: 'positions',
      title: 'Layout positions',
      type: 'object',
      fields: [
        {
          name: LAYOUT_POSITIONS.header,
          title: 'Header',
          type: 'reference',
          to: convertObjectToReference(LAYOUT_TYPES),
        },
        {
          name: LAYOUT_POSITIONS.footer,
          title: 'Footer',
          type: 'reference',
          to: convertObjectToReference(LAYOUT_TYPES),
        },
      ],
    },
  ],
};

export default defaultTemplate;
