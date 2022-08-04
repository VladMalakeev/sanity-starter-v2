import T from '@sanity/base/initial-value-template-builder';

export default T.template({
  id: 'pages',
  title: 'Page',
  schemaType: 'page',
  parameters: [{ name: 'parentId', type: 'string' }],
  value: (params) => {
    return {
      parent: { _type: 'reference', _ref: params.parentId },
      nesting: false,
      dynamicConfig: {
        dynamicParent: false,
      },
    };
  },
});
