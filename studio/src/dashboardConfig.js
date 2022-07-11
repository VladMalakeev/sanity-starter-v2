export default {
  widgets: [
    { name: 'structure-menu' },
    { name: 'project-users', layout: { height: 'auto' } },
    {
      name: 'document-list',
      options: {
        title: 'Recent products',
        order: '_createdAt desc',
        types: ['product'],
      },
      layout: { width: 'medium' },
    },
  ],
};
