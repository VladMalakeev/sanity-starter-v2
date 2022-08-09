import { MODULE_TYPES } from '../../../../utils/constants';

const productSchema = {
  name: MODULE_TYPES.product,
  title: 'Product content',
  type: 'document',
  fields: [
    {
      name: 'shortDescription',
      title: 'Short description',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Preview image',
      type: 'image',
    },
    {
      name: 'fullDescription',
      title: 'Full description',
      type: 'text',
    },
  ],
};
export default productSchema;
