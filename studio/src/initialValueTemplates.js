import T from '@sanity/base/initial-value-template-builder';

import { DYNAMIC_TYPES } from '../../utils/constants';
import dynamicPageTemplate from './templates/dynamicPage.template';
import pageTemplate from './templates/page.template';

const dynamicPageTemplates = Object.values(DYNAMIC_TYPES).map((type) =>
  dynamicPageTemplate(type),
);

export default [...T.defaults(), pageTemplate, ...dynamicPageTemplates];
