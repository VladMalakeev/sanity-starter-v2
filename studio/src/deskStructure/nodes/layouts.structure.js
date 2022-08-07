import S from '@sanity/desk-tool/structure-builder';
import { FcViewDetails } from 'react-icons/fc';

import layoutsSchema from '../../../schemas/documents/layouts/schema';

const layouts = S.listItem()
  .title('Layouts')
  .icon(FcViewDetails)
  .child(
    S.list()
      .title('Layouts')
      .items(
        layoutsSchema.map((layout) =>
          S.documentTypeListItem(layout.name)
            .title(layout.title)
            .icon(FcViewDetails),
        ),
      ),
  );

export default layouts;
