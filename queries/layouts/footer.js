import groq from 'groq';

import { LAYOUT_TYPES } from '@/utils/constants';

export const footer = groq`
  _type == "${LAYOUT_TYPES['footer.layout']}" => {
    ...
  }
`;
