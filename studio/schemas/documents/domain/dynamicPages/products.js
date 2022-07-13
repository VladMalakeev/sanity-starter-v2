import { SLUG_FIELD, TITLE_FIELD } from '../../../helpers/fields';

const products = {
  name: 'products',
  type: 'document',
  title: 'Products',
  fields: [TITLE_FIELD, SLUG_FIELD],

  preview: {
    select: {
      title: 'title',
    },
  },
};

export default products;
