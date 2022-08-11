import T from '@sanity/base/initial-value-template-builder';

import { getTemplateName, nameFromType } from '../../helpers/functions';

export default (type) =>
  T.template({
    id: getTemplateName(type),
    title: nameFromType(type),
    schemaType: type,
    parameters: [{ name: 'parentId', type: 'string' }],
    value: (params) => {
      return {
        parent: { _type: 'reference', _ref: params.parentId },
      };
    },
  });
