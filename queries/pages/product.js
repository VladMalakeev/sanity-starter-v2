import groq from 'groq';

import { DYNAMIC_TYPES } from '@/utils/constants';

import { seo } from '../components/seo';
import { modulesView } from '../modules';

export const product = groq`
  _type == "${DYNAMIC_TYPES.products}" => {
    ...,
    ${seo},
    "modules": parent->dynamicConfig.dynamicModules []-> ${modulesView}
  },
`;
