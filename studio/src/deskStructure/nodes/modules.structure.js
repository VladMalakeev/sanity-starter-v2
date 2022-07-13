import S from '@sanity/desk-tool/structure-builder';
import { BsLayoutTextWindowReverse } from 'react-icons/bs';

import modulesSchema from '../../../schemas/documents/modules/schema';

const modules = S.listItem()
  .title('Modules')
  .icon(BsLayoutTextWindowReverse)
  .child(
    S.list()
      .title('Modules')
      .items(
        modulesSchema.map((module) =>
          S.documentTypeListItem(module.name)
            .title(module.title)
            .icon(BsLayoutTextWindowReverse),
        ),
      ),
  );

export default modules;
