// First, we must import the schema creator
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';
import createSchema from 'part:@sanity/base/schema-creator';

// We import object and document schemas
import route from './documents/settings/route';
import routeSettings from './documents/settings/routeSettings';
import siteConfig from './documents/settings/siteConfig';
import staticPages from './documents/settings/staticPages';
import dynamicPageTypes from './dynamicPageTypes';
import blockContent from './objects/blockContent';

const settings = [siteConfig, route, routeSettings, staticPages];

const objects = [blockContent];

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  name: 'default',
  types: schemaTypes.concat([...settings, ...dynamicPageTypes, ...objects]),
});
