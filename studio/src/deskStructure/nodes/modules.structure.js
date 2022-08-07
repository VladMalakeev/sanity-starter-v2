import S from '@sanity/desk-tool/structure-builder';
import { FcDatabase } from 'react-icons/fc';

import modulesSchema from '../../../schemas/documents/modules/schema';

const modules = S.listItem()
  .title('Modules')
  .icon(FcDatabase)
  .child(
    S.list()
      .title('Modules')
      .items(
        modulesSchema.map((module) =>
          S.documentTypeListItem(module.name).title(module.title).icon(FcDatabase),
        ),
      ),
  );

export default modules;
