import { sanityClient } from '../../../helpers/client';

const staticPages = {
  name: 'staticPages',
  title: 'Static pages',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'isHomePage',
      title: 'Home page',
      type: 'boolean',
      description:
        'The page will be accessible by "/" path, the parent route is not used ',
      initialValue: false,
    },
    {
      name: 'parentRoute',
      title: 'Page path',
      type: 'reference',
      to: [{ type: 'route' }],
      readOnly: ({ parent }) => parent.isHomePage,
    },
  ],
  validation: (Rule) =>
    Rule.custom(async (fields) => {
      const isHomePageAssigned = await sanityClient.fetch(
        '*[_type == "staticPages" && isHomePage == true && !(_id match "drafts*")]',
      );

      if (isHomePageAssigned.length) {
        const currentPage = isHomePageAssigned.find(
          (page) => String(fields._id).indexOf(page._id) !== -1,
        );

        if (!currentPage && fields.isHomePage)
          return 'Only one home page entity must be defined!';
      }
      return true;
    }),
};

export default staticPages;
