import S from '@sanity/desk-tool/structure-builder';
import { FcOpenedFolder, FcTemplate } from 'react-icons/fc';

import { TEMPLATE_TYPES_LIST } from '../../../../utils/constants';
import { filterByBasicLocale, nameFromType } from '../../../helpers/functions';
import { singleton } from '../helpers/singleton';

const singleTemplate = (template) => {
  return singleton({
    type: template,
    title: nameFromType(template),
    icon: FcTemplate,
  });
};

const multipleTemplates = (template) => {
  return S.listItem()
    .title(nameFromType(template))
    .icon(FcOpenedFolder)
    .child(
      S.documentTypeList(template)
        .filter(`_type == $type && ${filterByBasicLocale}`)
        .params({ type: template })
        .title(nameFromType(template)),
    );
};

const templateStructure = S.listItem()
  .title('Templates')
  .icon(FcTemplate)
  .child(
    S.list()
      .title('Templates')
      .items(
        TEMPLATE_TYPES_LIST.map((template) => {
          // !!! We can represent a template as a singleton or as a list of templates. !!!
          // return singleTemplate(template);
          return multipleTemplates(template);
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
