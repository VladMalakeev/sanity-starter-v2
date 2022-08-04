import { LAYOUT_POSITIONS } from '../../../../utils/constants';
import { sanityClient } from '../../../helpers/client';
import { SLUG_FIELD, TITLE_FIELD } from '../../helpers/commonfields';
import { convertObjectToList } from '../../helpers/functions';
import layouts from '../layouts/schema';

const templates = {
  name: 'template',
  title: 'Templates',
  type: 'document',
  fields: [
    TITLE_FIELD,
    SLUG_FIELD,
    {
      name: 'isDefault',
      title: 'Select as default template',
      type: 'boolean',
      description: 'This template will apply to all pages without a template',
      initialValue: false,
    },
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
              options: {
                list: convertObjectToList(LAYOUT_POSITIONS),
              },
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
  validation: (Rule) =>
    Rule.custom(async (fields) => {
      const isDefaultAssigned = await sanityClient.fetch(
        '*[_type == "template" && isDefault == true && !(_id match "drafts*")]',
      );

      if (isDefaultAssigned.length) {
        const currentPage = isDefaultAssigned.find(
          (page) => String(fields._id).indexOf(page._id) !== -1,
        );

        if (!currentPage && fields.isDefault)
          return 'Only one default template must be defined!';
      }
      return true;
    }),
};

export default templates;
