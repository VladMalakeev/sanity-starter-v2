import { SLUG_FIELD, TITLE_FIELD } from '../../../helpers/fields';

const products = {
  name: 'products',
  type: 'document',
  title: 'Products',
  fields: [
    TITLE_FIELD,
    SLUG_FIELD,
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

  preview: {
    select: {
      title: 'title',
    },
  },
};

export default products;
