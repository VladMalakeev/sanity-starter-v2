import groq from 'groq';

import { MODULE_TYPES } from '@/utils/constants';

const hero = groq`
  _type == "${MODULE_TYPES['hero.module']}" => {
    ...
  }
`;

export default hero;
