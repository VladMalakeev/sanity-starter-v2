import S from '@sanity/desk-tool/structure-builder';
import { AiOutlineLayout } from 'react-icons/ai';

import layoutsSchema from '../../../schemas/documents/layouts/schema';

const layouts = S.listItem()
  .title('Layouts')
  .icon(AiOutlineLayout)
  .child(
    S.list()
      .title('Layouts')
      .items(
        layoutsSchema.map((layout) =>
          S.documentTypeListItem(layout.name)
            .title(layout.title)
            .icon(AiOutlineLayout),
        ),
      ),
  );

export default layouts;
