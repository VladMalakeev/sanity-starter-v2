export const TITLE_FIELD = {
  name: 'title',
  type: 'string',
  title: 'Title',
  validate: (Rule) => Rule.required(),
};

export const SLUG_FIELD = {
  name: 'slug',
  type: 'slug',
  title: 'Slug',
  validate: (Rule) => Rule.required(),
  options: {
    source: 'title',
    maxLength: 96,
  },
};
