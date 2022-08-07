import groq from 'groq';

import { LAYOUT_TYPES } from '@/utils/constants';

import { link } from '../components/link';

export const sitebar = groq`
  _type == "${LAYOUT_TYPES.sitebar}" => {
    ...,
    menu []{
      ${link}
    }
  }
`;
