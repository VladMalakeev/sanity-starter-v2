import { SLUG_FIELD, TITLE_FIELD } from '../../helpers/fields';
import layouts from '../layouts/schema';

const templates = {
  name: 'templates',
  title: 'Templates',
  type: 'document',
  fields: [
    TITLE_FIELD,
    SLUG_FIELD,
    {
      name: 'layouts',
      title: 'Layouts',
      type: 'array',
      of: [
        {
          name: 'layoutItem',
          title: 'Layout',
          type: 'object',
          fields: [
            {
              name: 'positionId',
              title: 'Layout position id',
              description: 'Set special id to connect layout with frontend',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'layout',
              title: 'Layout',
              type: 'reference',
              to: layouts.map((layout) => ({ type: layout.name })),
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
};

export default templates;
