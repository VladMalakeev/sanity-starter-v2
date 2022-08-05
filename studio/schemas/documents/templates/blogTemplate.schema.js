import { ImInsertTemplate } from 'react-icons/im';

import {
  LAYOUT_POSITIONS,
  LAYOUT_TYPES,
  TEMPLATE_TYPES,
} from '../../../../utils/constants';
import { convertObjectToReference } from '../../helpers/functions';

const blogTemplate = {
  name: TEMPLATE_TYPES['blog.template'],
  title: 'Blog Template',
  type: 'document',

  preview: {
    prepare() {
      return {
        title: 'Blog Template',
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
          name: LAYOUT_POSITIONS.sitebar,
          title: 'Sitebar',
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

export default blogTemplate;
