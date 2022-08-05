import { TEMPLATE_RULES, TEMPLATE_TYPES } from '../../../utils/constants';
import { convertObjectToList, convertObjectToReference } from '../helpers/functions';

const templateConfigSchema = {
  name: 'templateConfig',
  title: 'Template',
  type: 'object',
  fields: [
    {
      name: 'useTemplate',
      title: 'Use template?',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'templateRules',
      title: 'Apply template for:',
      type: 'string',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: convertObjectToList(TEMPLATE_RULES),
      },
      initialValue: TEMPLATE_RULES.allChildrenRoutes,
      hidden: ({ parent }) => !parent.useTemplate,
    },
    {
      name: 'template',
      title: 'Select template',
      type: 'reference',
      to: convertObjectToReference(TEMPLATE_TYPES),
      hidden: ({ parent }) => !parent.useTemplate,
    },
  ],
};

export default templateConfigSchema;
