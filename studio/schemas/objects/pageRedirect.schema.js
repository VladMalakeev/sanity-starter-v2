import { DYNAMIC_TYPES } from '../../../utils/constants';

const pageRedirectSchema = {
  name: 'page.redirect',
  title: 'Page redirect',
  type: 'object',
  fields: [
    {
      name: 'useRedirect',
      type: 'boolean',
      title: 'Use a redirect for this page?',
      initialValue: false,
    },
    {
      name: 'permanent',
      type: 'boolean',
      title: 'Make this redirect permanent?',
      description: 'Do not enable this option if the redirect is temporary',
      initialValue: false,
      hidden: ({ parent }) => !parent.useRedirect,
    },
    {
      name: 'redirectPage',
      title: 'Select page for redirect',
      type: 'reference',
      to: [
        { type: 'page' },
        ...Object.values(DYNAMIC_TYPES).map((type) => ({ type })),
      ],
      hidden: ({ parent }) => !parent.useRedirect,
      options: {
        filter: ({ document }) => ({
          filter: `_id != $id && !(_id in path("drafts.**"))`,
          params: { id: document._id.split('.').pop() },
        }),
      },
    },
  ],
};

export default pageRedirectSchema;
