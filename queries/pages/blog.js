import groq from 'groq';

import { DYNAMIC_TYPES } from '@/utils/constants';

import { seo } from '../components/seo';
import { modulesView } from '../modules';

export const blog = groq`
  _type == "${DYNAMIC_TYPES.blog}" => {
    ...,
    ${seo},
    "modules": {
        "before":parent->dynamicConfig.before []-> ${modulesView},
        "after":parent->dynamicConfig.after []-> ${modulesView}
    }
  }
`;
