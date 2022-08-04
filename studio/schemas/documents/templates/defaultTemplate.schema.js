import { TEMPLATE_TYPES } from '../../../../utils/constants';

const defaultTemplate = {
  name: TEMPLATE_TYPES['default.template'],
  title: 'Default Template',
  type: 'document',
  fields: [
    {
      name: 'text',
      title: 'Text',
      type: 'string',
    },
  ],
};

export default defaultTemplate;
