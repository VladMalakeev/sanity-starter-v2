import S from '@sanity/desk-tool/structure-builder';
import { FcOpenedFolder, FcTemplate } from 'react-icons/fc';

import { TEMPLATE_TYPES_LIST } from '../../../../utils/constants';
import { multipleViews, singleView } from '../helpers/views';

const templateStructure = S.listItem()
  .title('Templates')
  .icon(FcTemplate)
  .child(
    S.list()
      .title('Templates')
      .items(
        TEMPLATE_TYPES_LIST.map((template) => {
          // !!! We can represent a template as a singleton or as a list of templates. !!!
          return multipleViews(template, FcOpenedFolder);
          // return singleView(template, FcTemplate);
        }),
      ),
  );

export const withTemplates = (items) => {
  if (TEMPLATE_TYPES_LIST?.length) {
    const index = items.findIndex((item) => item?.spec?.id === 'modules');
    items.splice(index + 1, 0, templateStructure);
  }
  return items;
};
