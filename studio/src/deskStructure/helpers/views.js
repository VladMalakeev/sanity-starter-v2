import S from '@sanity/desk-tool/structure-builder';

import { filterByBasicLocale, nameFromType } from '../../../helpers/functions';
import { singleton } from './singleton';

export const multipleViews = (type, icon) => {
  return S.documentTypeListItem(type)
    .title(nameFromType(type))
    .icon(icon)
    .child(
      S.documentTypeList(type)
        .filter(`_type == $type && ${filterByBasicLocale}`)
        .params({ type })
        .title(nameFromType(type)),
    );
};

export const singleView = (type, icon) => {
  return singleton({
    type,
    title: nameFromType(type),
    icon,
  });
};
