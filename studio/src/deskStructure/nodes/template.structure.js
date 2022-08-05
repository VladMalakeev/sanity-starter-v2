import S from '@sanity/desk-tool/structure-builder';
import { ImInsertTemplate } from 'react-icons/im';

import { TEMPLATE_TYPES } from '../../../../utils/constants';
import { singleton } from '../helpers/singleton';

export default S.listItem()
  .title('Templates')
  .icon(ImInsertTemplate)
  .child(
    S.list()
      .title('Templates')
      .items([
        singleton({
          title: 'Default Template',
          type: TEMPLATE_TYPES['default.template'],
          icon: ImInsertTemplate,
        }),
        singleton({
          title: 'Blog Template',
          type: TEMPLATE_TYPES['blog.template'],
          icon: ImInsertTemplate,
        }),
        singleton({
          title: 'Product Template',
          type: TEMPLATE_TYPES['product.template'],
          icon: ImInsertTemplate,
        }),
      ]),
  );
