import dynamicTypes from '../documents/domain/dynamicPages/schema';
import modules from '../documents/modules/schema';
import { langRefFilter, listFormat } from '../helpers/functions';

const dynamicConfigSchema = {
  name: 'dynamicConfig',
  title: 'Dynamic pages',
  type: 'object',
  fields: [
    {
      name: 'dynamicParent',
      type: 'boolean',
      title: 'Use page as Dynamic page parent',
      description: 'You will be able to add resources for this parent page',
      initialValue: false,
    },
    {
      name: 'dynamicType',
      type: 'string',
      title: 'Select dynamic page type',
      options: {
        list: dynamicTypes.map((type) => listFormat(type.name)),
      },
      hidden: ({ parent }) => !parent.dynamicParent,
    },
    {
      name: 'dynamicModules',
      title: 'Select modules for Dynamic page',
      description: 'You can set up modules for dynamic page',
      type: 'array',
      hidden: ({ parent }) => !parent.dynamicParent,
      of: modules.map((module) => ({
        title: module.title,
        name: module.name,
        type: 'reference',
        to: [
          {
            type: module.name,
          },
        ],
        options: {
          filter: langRefFilter,
        },
      })),
    },
  ],
};

export default dynamicConfigSchema;
