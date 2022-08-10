import { MODULE_TYPES } from '../../../../utils/constants';
import { DEFAULT_LANGUAGE, I18N } from '../../helpers/commonfields';

const aboutModule = {
  name: MODULE_TYPES.about,
  type: 'document',
  title: 'About module',
  i18n: I18N,
  initialValue: {
    ...DEFAULT_LANGUAGE,
  },
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
