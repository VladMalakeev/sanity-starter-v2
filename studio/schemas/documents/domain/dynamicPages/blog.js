import { SLUG_FIELD, TITLE_FIELD } from '../../../helpers/fields';

const blog = {
  name: 'blog',
  type: 'document',
  title: 'Blog',
  initialValue: {
    slug: '',
  },
  fields: [TITLE_FIELD, SLUG_FIELD],

  preview: {
    select: {
      title: 'title',
    },
  },
};

export default blog;
