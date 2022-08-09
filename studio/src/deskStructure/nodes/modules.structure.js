import S from '@sanity/desk-tool/structure-builder';
import { FcDatabase } from 'react-icons/fc';

import { commonModules } from '../../../schemas/documents/modules/schema';

const modules = S.listItem()
  .title('Modules')
  .icon(FcDatabase)
  .child(
    S.list()
      .title('Modules')
      .items(
        commonModules.map((module) =>
          S.documentTypeListItem(module.name).title(module.title).icon(FcDatabase),
        ),
      ),
  );

export default modules;
