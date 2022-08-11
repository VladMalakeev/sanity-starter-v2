import groq from 'groq';

import { MODULE_TYPES } from '@/utils/constants';

const blog = groq`
  _type == "${MODULE_TYPES.blog}" => {
    ...
  }
`;

export default blog;
