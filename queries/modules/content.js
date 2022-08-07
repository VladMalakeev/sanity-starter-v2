import groq from 'groq';

import { MODULE_TYPES } from '@/utils/constants';

const content = groq`
  _type == "${MODULE_TYPES.content}" => {
    ...
  }
`;

export default content;
