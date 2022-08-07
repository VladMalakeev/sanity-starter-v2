import groq from 'groq';

import {
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
    *[_type in [${templateList}] && isDefault == true][0]${templateDocument},
    {
      "layouts": *[_type in [${layoutsList}]]${layoutView}
    }
  )
`;
