import { ImInsertTemplate } from 'react-icons/im';

import {
  LAYOUT_POSITIONS,
  LAYOUT_TYPES,
  TEMPLATE_TYPES,
} from '../../../../utils/constants';
import { convertObjectToReference } from '../../helpers/functions';

const productTemplate = {
  name: TEMPLATE_TYPES['product.template'],
  title: 'Product Template',
  type: 'document',
  singleton: true,
  preview: {
    prepare() {
      return {
        title: 'Product Template',
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
          name: LAYOUT_POSITIONS.breadcrumbs,
          title: 'Breadcrumbs',
          type: 'reference',
          to: convertObjectToReference(LAYOUT_TYPES),
        },
      ],
    },
  ],
};

export default productTemplate;
