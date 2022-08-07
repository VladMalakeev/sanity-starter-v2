import S from '@sanity/desk-tool/structure-builder';
import { FcTemplate } from 'react-icons/fc';

import { TEMPLATE_TYPES_LIST } from '../../../../utils/constants';
import { nameFromType } from '../../../helpers/functions';
import { singleton } from '../helpers/singleton';

const templateStructure = S.listItem()
  .title('Templates')
  .icon(FcTemplate)
  .child(
    S.list()
      .title('Templates')
      .items(
        TEMPLATE_TYPES_LIST.map((template) =>
          singleton({
            title: nameFromType(template),
            type: template,
            icon: FcTemplate,
          }),
        ),
      ),
  );

export const withTemplates = (items) => {
  if (TEMPLATE_TYPES_LIST?.length) items.push(templateStructure);
  return items;
};
