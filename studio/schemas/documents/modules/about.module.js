import { MODULE_TYPES } from '../../../../utils/sanity/consants';

const aboutModule = {
  name: MODULE_TYPES['about.module'],
  type: 'document',
  title: 'About module',
  fields: [
    {
      name: 'title',
      title: 'About title',
      type: 'string',
    },
    {
      name: 'services',
      title: 'Our services',
      type: 'array',
      of: [
        {
          name: 'service',
          type: 'object',
          title: 'Service',
          fields: [
            {
              name: 'title',
              title: 'Service name',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Service description',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
};

export default aboutModule;
