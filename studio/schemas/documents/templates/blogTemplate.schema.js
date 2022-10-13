import { FcTemplate } from 'react-icons/fc';

import { LAYOUT_POSITIONS, TEMPLATE_TYPES } from '../../../../utils/constants';
import { DEFAULT_LANGUAGE, I18N } from '../../helpers/commonfields';
import {
  TEMPLATE_IS_DEFAULT,
  TEMPLATE_POSITIONS,
  TEMPLATE_TITLE,
  TEMPLATE_VALIDATION,
} from '../../helpers/templateFields';

const blogTemplate = {
  name: TEMPLATE_TYPES?.blog,
  title: 'Blog Template',
  type: 'document',
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
        media: FcTemplate,
      };
    },
  },
  i18n: I18N,
  initialValue: {
    ...DEFAULT_LANGUAGE,
    isDefault: false,
  },
  fields: [
    TEMPLATE_TITLE,
    TEMPLATE_IS_DEFAULT,
    TEMPLATE_POSITIONS([
      {
        name: LAYOUT_POSITIONS.header,
        title: 'Header',
      },
      {
        name: LAYOUT_POSITIONS.sitebar,
        title: 'Sitebar',
      },
      {
        name: LAYOUT_POSITIONS.footer,
        title: 'Footer',
      },
    ]),
  ],
  validation: TEMPLATE_VALIDATION,
};

export default blogTemplate;
