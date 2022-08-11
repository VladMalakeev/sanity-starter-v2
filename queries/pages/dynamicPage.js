import groq from 'groq';

import { DYNAMIC_TYPES } from '@/utils/constants';

import { seo } from '../components/seo';
import { modulesView } from '../modules';

const dynamicPages = Object.values(DYNAMIC_TYPES).map((type) => `"${type}"`);

export const dynamicPage = groq`
  _type in [${dynamicPages}] => {
    ...,
    ${seo},
    "modules": {
        "before":parent->dynamicConfig.before []-> ${modulesView},
        "content": [content ${modulesView}],
        "after":parent->dynamicConfig.after []-> ${modulesView}
    }
  }
`;
