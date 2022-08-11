import { MODULE_TYPES } from '../../../../utils/constants';
import { DEFAULT_LANGUAGE, I18N } from '../../helpers/commonfields';

const blogSchema = {
  name: MODULE_TYPES.blog,
  title: 'Blog content',
  type: 'document',
  i18n: I18N,
  initialValue: {
    ...DEFAULT_LANGUAGE,
  },
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
