import groq from 'groq';

import { LAYOUT_TYPES } from '@/utils/sanity/consants';

export const footer = groq`
*[_type == "${LAYOUT_TYPES['footer.layout']}" && __i18n_lang == $locale][0]
`;
