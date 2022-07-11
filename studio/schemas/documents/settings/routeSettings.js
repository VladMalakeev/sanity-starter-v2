import dynamicPageTypes from '../../dynamicPageTypes';
import { listFormat } from '../../helpers/functions';

const routeSettings = {
  type: 'document',
  title: 'Dynamic routing setting',
  name: 'routeSettings',
  singleton: true,
  fields: [
    {
      name: 'routesList',
      title: 'Routes settings',
      type: 'array',
      of: [
        {
          name: 'dynamicRoutes',
          title: 'Dynamic routes',
          type: 'object',
          fields: [
            {
              name: 'documentType',
              title: 'Dynamic pages type',
              type: 'string',
              options: {
                list: dynamicPageTypes.map((document) => listFormat(document?.name)),
              },
              validation: (Rule) =>
                Rule.required().custom((documentType) => {
                  if (!documentType) return 'Please select valid page type';
                  return true;
                }),
            },
            {
              name: 'parentRoute',
              title: 'Parent route',
              type: 'reference',
              to: [{ type: 'route' }],
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
};

export default routeSettings;
