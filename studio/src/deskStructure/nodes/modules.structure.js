import S from '@sanity/desk-tool/structure-builder';
import { FcDatabase, FcViewDetails } from 'react-icons/fc';

import { commonModules } from '../../../schemas/documents/modules/schema';
import { multipleViews, singleView } from '../helpers/views';

const modules = S.listItem()
  .title('Modules')
  .icon(FcDatabase)
  .child(
    S.list()
      .title('Modules')
      .items(
        commonModules.map((module) => {
          return multipleViews(module.name, FcViewDetails);
          // return singleView(module.name, FcDatabase);
        }),
      ),
  );

export default modules;
