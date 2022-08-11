import groq from 'groq';

import { MODULE_TYPES } from '@/utils/constants';

const product = groq`
  _type == "${MODULE_TYPES.product}" => {
    ...
  }
`;

export default product;
