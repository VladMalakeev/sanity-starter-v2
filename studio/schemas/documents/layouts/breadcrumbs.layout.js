import { LAYOUT_TYPES } from '../../../../utils/constants';
import { DEFAULT_LANGUAGE, I18N } from '../../helpers/commonfields';

const breadcrumbs = {
  name: LAYOUT_TYPES.breadcrumbs,
  title: 'BreadCrumbs',
  type: 'document',
  i18n: I18N,
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
