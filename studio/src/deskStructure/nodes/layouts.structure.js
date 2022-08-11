import S from '@sanity/desk-tool/structure-builder';
import { FcViewDetails } from 'react-icons/fc';

import layoutsSchema from '../../../schemas/documents/layouts/schema';
import { multipleViews, singleView } from '../helpers/views';

const layouts = S.listItem()
  .title('Layouts')
  .icon(FcViewDetails)
  .child(
    S.list()
      .title('Layouts')
      .items(
        layoutsSchema.map((layout) => {
          // !!! We can represent a layouts as a singleton or as a list of layouts. !!!
          // return multipleViews(layout.name, FcViewDetails);
          return singleView(layout.name, FcViewDetails);
        }),
      ),
  );

export default layouts;
