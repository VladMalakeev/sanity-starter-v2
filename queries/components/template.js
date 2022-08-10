import groq from 'groq';

import {
  BASIC_LOCALE,
  LAYOUT_POSITIONS,
  LAYOUT_TYPES,
  TEMPLATE_TYPES_LIST,
} from '@/utils/constants';

import { layoutView } from '../layouts';

const positions = Object.values(LAYOUT_POSITIONS).map(
  (position) => `"${position}":${position}->${layoutView},`,
);

const templateDocument = groq`{
  ...,
  positions {
   ${positions.join('')}
  }
}`;

const templateList = TEMPLATE_TYPES_LIST.map((template) => `"${template}"`);
const layoutsList = Object.values(LAYOUT_TYPES).map((layout) => `"${layout}"`);

export const templateData = groq`
  coalesce(
    *[_type in [${templateList}] && _id == $templateId][0]${templateDocument},
    *[_type in [${templateList}] && isDefault == true && __i18n_lang == $locale][0]${templateDocument},
    {
      "layouts": *[_type in [${layoutsList}] && __i18n_lang in [$locale, "${BASIC_LOCALE}"]]${layoutView}
    }
  )
`;
