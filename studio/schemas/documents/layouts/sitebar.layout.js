import { LAYOUT_TYPES } from '../../../../utils/constants';
import { DEFAULT_LANGUAGE } from '../../helpers/commonfields';

const sitebar = {
  name: LAYOUT_TYPES['sitebar.layout'],
  title: 'SiteBar',
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
      name: 'linksList',
      type: 'array',
      options: {
        list: [
          { title: 'Building', value: 'building' },
          { title: 'Master plan', value: 'masterPlan' },
          { title: 'Infrastructure', value: 'infrastructure' },
          { title: 'Private Home', value: 'privateHome' },
        ],
      },
      of: [{ type: 'string' }],
    },
  ],
};

export default sitebar;
