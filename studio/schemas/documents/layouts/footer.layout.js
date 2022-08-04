import { LAYOUT_TYPES } from '../../../../utils/constants';
import { DEFAULT_LANGUAGE } from '../../helpers/commonfields';

const footer = {
  name: LAYOUT_TYPES['footer.layout'],
  title: 'Footer',
  type: 'document',
  initialValue: {
    ...DEFAULT_LANGUAGE,
  },
  fields: [
    {
      name: 'title',
      title: 'Layout name',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Copyright',
      type: 'text',
    },
  ],
};

export default footer;
