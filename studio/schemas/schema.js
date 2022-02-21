// First, we must import the schema creator
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';
import createSchema from 'part:@sanity/base/schema-creator';

import blog from './documents/blog';
// We import object and document schemas
import category from './documents/category';
import home from './documents/home';
import post from './documents/post';
import siteConfig from './documents/siteConfig';
import about from './objects/about';
import blockContent from './objects/blockContent';
import features from './objects/features';
import hero from './objects/hero';
import partners from './objects/partners';
import testimonial from './objects/testimonial';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    post,
    partners,
    category,
    siteConfig,
    home,
    blog,
    hero,
    about,
    features,
    testimonial,
    blockContent,
  ]),
});
