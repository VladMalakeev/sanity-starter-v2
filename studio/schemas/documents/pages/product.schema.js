import { FcShop } from 'react-icons/fc';

import { DYNAMIC_TYPES, MODULE_TYPES } from '../../../../utils/constants';
import { PageReference } from '../../../src/components/routing/RouteReferenceItem';
import { DEFAULT_LANGUAGE, I18N, pageGroups } from '../../helpers/commonfields';
import {
  DYNAMIC_PAGE_PARENT,
  DYNAMIC_PAGE_VALIDATION,
  EXCLUDE_SITEMAP,
  PAGE_REDIRECT,
  PAGE_SEO,
  PAGE_SLUG,
  PAGE_TITLE,
} from '../../helpers/pageFields';

const products = {
  name: DYNAMIC_TYPES.product,
  type: 'document',
  title: 'Products',
  i18n: I18N,
  initialValue: {
    ...DEFAULT_LANGUAGE,
  },
  groups: pageGroups,
  fields: [
    PAGE_TITLE,
    PAGE_SLUG,
    PAGE_SEO,
    EXCLUDE_SITEMAP,
    DYNAMIC_PAGE_PARENT,
    {
      name: 'content',
      title: 'Product content',
      type: MODULE_TYPES.product,
      group: 'general',
    },
    PAGE_REDIRECT,
  ],
  validation: DYNAMIC_PAGE_VALIDATION,
  preview: {
    select: {
      title: 'title',
      content: 'content',
    },
    prepare({ title, content }) {
      return {
        title,
        media: content?.image ?? FcShop,
      };
    },
    component: PageReference,
  },
};

export default products;
