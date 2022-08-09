import { MODULE_TYPES } from '../../../../utils/constants';

const blogSchema = {
  name: MODULE_TYPES.blog,
  title: 'Blog content',
  type: 'document',
  fields: [
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
};

export default blogSchema;
