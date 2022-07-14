import { SLUG_FIELD, TITLE_FIELD } from '../../../helpers/fields';

const blog = {
  name: 'blog',
  type: 'document',
  title: 'Blog',
  initialValue: {},
  fields: [
    TITLE_FIELD,
    SLUG_FIELD,
    {
      name: 'author',
      title: 'Author full name',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Author image',
      type: 'image',
    },
    {
      name: 'content',
      title: 'Post content',
      type: 'text',
    },
  ],

  preview: {
    select: {
      title: 'title',
    },
  },
};

export default blog;
