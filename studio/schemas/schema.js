// First, we must import the schema creator
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';
import createSchema from 'part:@sanity/base/schema-creator';

import dynamicPages from './documents/domain/dynamicPages/schema';
import layouts from './documents/layouts/schema';
import modules from './documents/modules/schema';
import settings from './documents/settings/schema';
import objects from './objects/schema';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  name: 'default',
  types: schemaTypes.concat(
    [settings, dynamicPages, layouts, modules, objects].flat(),
  ),
});
