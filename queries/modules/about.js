import groq from 'groq';

import { MODULE_TYPES } from '@/utils/constants';

const about = groq`
  _type == "${MODULE_TYPES['about.module']}" => {
    ...
  }
`;

export default about;
