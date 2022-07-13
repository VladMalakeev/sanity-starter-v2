const header = {
  name: 'header.layout',
  title: 'Header',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
    },
    {
      name: 'menu',
      title: 'Menu items',
      type: 'array',
      of: [
        {
          name: 'item',
          title: 'Menu item',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Item title',
              type: 'string',
            },
            {
              name: 'link',
              title: 'Item link',
              type: 'reference',
              to: [{ type: 'route' }],
            },
          ],
        },
      ],
    },
  ],
};

export default header;
