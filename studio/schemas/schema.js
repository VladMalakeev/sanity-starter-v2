import schemaTypes from 'all:part:@sanity/base/schema-type';
import createSchema from 'part:@sanity/base/schema-creator';

import dynamicPages from './documents/domain/dynamicPages/schema';
import layouts from './documents/layouts/schema';
import modules from './documents/modules/schema';
import settings from './documents/settings/schema';
import templates from './documents/templates/schema';
import objects from './objects/schema';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat(
    [settings, dynamicPages, layouts, modules, objects, templates].flat(),
  ),
});
