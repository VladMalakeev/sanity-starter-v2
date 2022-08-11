import { dynamicPages } from '../documents/pages/schema';
import { listFormat } from '../helpers/functions';

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
        list: dynamicPages.map((type) => listFormat(type.name)),
      },
      hidden: ({ parent }) => !parent.dynamicParent,
    },
    {
      name: 'before',
      title: 'Add modules before dynamic page content',
      hidden: ({ parent }) => !parent.dynamicParent,
      type: 'modules',
    },
    {
      name: 'after',
      title: 'Add modules after dynamic page content',
      type: 'modules',
      hidden: ({ parent }) => !parent.dynamicParent,
    },
  ],
};

export default dynamicConfigSchema;
