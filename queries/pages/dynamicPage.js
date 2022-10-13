import groq from 'groq';

import { DYNAMIC_TYPES } from '@/utils/constants';

import { seo } from '../components/seo';
import { modulesView } from '../modules';

export const dynamicPageTypesQuery = Object.values(DYNAMIC_TYPES).map(
  (type) => `"${type}"`,
);

export const dynamicPage = groq`
  _type in [${dynamicPageTypesQuery}] => {
    ...,
    ${seo},
    "modules": [
        ...parent->dynamicConfig.before []-> ${modulesView},
        ...[content ${modulesView}],
        ...parent->dynamicConfig.after []-> ${modulesView}
    ]
  }
`;
