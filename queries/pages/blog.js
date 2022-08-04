import groq from 'groq';

import { DYNAMIC_TYPES } from '@/utils/constants';

import { seo } from '../components/seo';
import { modulesView } from '../modules';

export const blog = groq`
  _type == "${DYNAMIC_TYPES.blog}" => {
    ...,
    ${seo},
    "modules": parent->dynamicConfig.dynamicModules []-> ${modulesView}
  },
`;
