import groq from 'groq';

import { LAYOUT_TYPES } from '@/utils/constants';

import { link } from '../components/link';

export const header = groq`
  _type == "${LAYOUT_TYPES.header}" => {
    ...,
    menu []{
      ${link}
    }
  }
`;
