import T from '@sanity/base/initial-value-template-builder';

export default T.template({
  id: 'routing',
  title: 'Routing',
  schemaType: 'route',
  parameters: [{ name: 'parentRoute', type: 'string' }],
  value: (params) => {
    return {
      parentRoute: { _type: 'reference', _ref: params.parentRoute },
    };
  },
});
