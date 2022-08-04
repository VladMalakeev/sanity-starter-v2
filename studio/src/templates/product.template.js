import T from '@sanity/base/initial-value-template-builder';

import { DYNAMIC_TYPES } from '../../../utils/constants';
import { getTemplateName } from '../../helpers/functions';

export default T.template({
  id: getTemplateName(DYNAMIC_TYPES.products),
  title: 'Products Template',
  schemaType: DYNAMIC_TYPES.products,
  parameters: [{ name: 'parentId', type: 'string' }],
  value: (params) => {
    return {
      parent: { _type: 'reference', _ref: params.parentId },
    };
  },
});
