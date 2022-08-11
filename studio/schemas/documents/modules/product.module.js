import { MODULE_TYPES } from '../../../../utils/constants';
import { DEFAULT_LANGUAGE, I18N } from '../../helpers/commonfields';

const productSchema = {
  name: MODULE_TYPES.product,
  title: 'Product content',
  type: 'document',
  i18n: I18N,
  initialValue: {
    ...DEFAULT_LANGUAGE,
  },
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
