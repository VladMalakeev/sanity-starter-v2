import T from '@sanity/base/initial-value-template-builder';

import blogTemplate from './templates/blog.template';
import pageTemplate from './templates/page.template';
import productTemplate from './templates/product.template';

export default [...T.defaults(), pageTemplate, productTemplate, blogTemplate];
