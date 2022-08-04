import groq from 'groq';

import { MODULE_TYPES } from '@/utils/sanity/consants';

const hero = groq`
  _type == "${MODULE_TYPES['hero.module']}" => {
    ...
  }
`;

export default hero;
