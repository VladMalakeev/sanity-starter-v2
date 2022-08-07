import { FcTemplate } from 'react-icons/fc';

import {
  LAYOUT_POSITIONS,
  LAYOUT_TYPES,
  TEMPLATE_TYPES,
} from '../../../../utils/constants';
import {
  convertObjectToReference,
  defaultTemplateValidation,
} from '../../helpers/functions';

const blogTemplate = {
  name: TEMPLATE_TYPES?.blog,
  title: 'Blog Template',
  type: 'document',
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
        media: FcTemplate,
      };
    },
  },
  initialValue: {
    isDefault: false,
  },
  fields: [
    {
      name: 'title',
      title: 'Template title',
      type: 'string',
    },
    {
      name: 'isDefault',
      title: 'Set as default template',
      type: 'boolean',
      initialValue: false,
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
  validation: (Rule) =>
    Rule.custom(async (fields) => {
      const isDefaultError = await defaultTemplateValidation(fields);
      if (isDefaultError) return isDefaultError;
      return true;
    }),
};

export default blogTemplate;
