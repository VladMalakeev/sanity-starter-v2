import T from '@sanity/base/initial-value-template-builder';

export default T.template({
  id: 'routing',
  title: 'Routing',
  schemaType: 'route',
  parameters: [
    { name: 'parentRoute', type: 'string' },
    { name: 'parentLevel', type: 'number' },
  ],
  value: (params) => {
    if (!params.parentRoute.length)
      return {
        level: 0,
      };
    return {
      parentRoute: { _type: 'reference', _ref: params.parentRoute },
      level: params.parentLevel + 1,
    };
  },
});
