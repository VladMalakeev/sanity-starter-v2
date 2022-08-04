import { LAYOUT_TYPES } from '../../../../utils/constants';
import { DEFAULT_LANGUAGE } from '../../helpers/commonfields';

const breadcrumbs = {
  name: LAYOUT_TYPES['breadcrumbs.layout'],
  title: 'BreadCrumbs',
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
  ],
};

export default breadcrumbs;
