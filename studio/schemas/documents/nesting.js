const nesting = {
  name: 'nesting',
  title: 'Nesting',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'level',
      title: 'Level',
      type: 'number',
    },
  ],
  ordering: [
    {
      title: 'By level',
      name: 'orderLevel',
      by: [{ field: 'level', direction: 'asc' }],
    },
  ],
};

export default nesting;
