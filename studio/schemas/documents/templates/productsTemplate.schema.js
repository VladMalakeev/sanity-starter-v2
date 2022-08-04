import { TEMPLATE_TYPES } from '../../../../utils/constants';

const productTemplate = {
  name: TEMPLATE_TYPES['product.template'],
  title: 'Product Template',
  type: 'document',
  fields: [
    {
      name: 'text',
      title: 'Text',
      type: 'string',
    },
  ],
};

export default productTemplate;
