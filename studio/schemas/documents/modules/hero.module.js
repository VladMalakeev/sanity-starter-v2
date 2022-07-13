const heroModule = {
  name: 'hero.module',
  type: 'document',
  title: 'Hero module',
  fields: [
    {
      name: 'title',
      title: 'Page title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Page description',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Preview image',
      type: 'image',
    },
  ],
};

export default heroModule;
