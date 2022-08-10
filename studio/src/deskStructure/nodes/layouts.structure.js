import S from '@sanity/desk-tool/structure-builder';
import { FcViewDetails } from 'react-icons/fc';

import { filterByBasicLocale, nameFromType } from '../../../helpers/functions';
import layoutsSchema from '../../../schemas/documents/layouts/schema';
import { singleton } from '../helpers/singleton';

const multipleLayouts = (layout) => {
  return S.documentTypeListItem(layout.name)
    .title(layout.title)
    .icon(FcViewDetails)
    .child(
      S.documentTypeList(layout.name)
        .filter(`_type == $type && ${filterByBasicLocale}`)
        .params({ type: layout.name }),
    );
};

const singleLayout = (layout) => {
  return singleton({
    type: layout.name,
    title: nameFromType(layout.name),
    icon: FcViewDetails,
  });
};

const layouts = S.listItem()
  .title('Layouts')
  .icon(FcViewDetails)
  .child(
    S.list()
      .title('Layouts')
      .items(
        layoutsSchema.map((layout) => {
          // !!! We can represent a layouts as a singleton or as a list of layouts. !!!
          // return multipleLayouts(layout);
          return singleLayout(layout);
        }),
      ),
  );

export default layouts;
