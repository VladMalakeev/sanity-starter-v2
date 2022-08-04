import groq from 'groq';

import { LAYOUT_TYPES } from '@/utils/sanity/consants';

import { link } from '../components/link';

export const header = groq`
  *[_type == "${LAYOUT_TYPES['header.layout']}" && __i18n_lang == $locale][0]{
    ...,
    menu []{
      ${link}
    }
  }
`;
