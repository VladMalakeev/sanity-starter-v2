const siteConfig = {
  name: 'siteConfig',
  type: 'document',
  title: 'Site configuration',
  // https://www.sanity.io/docs/experimental/ui-affordances-for-actions
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Site title',
    },
    {
      title: 'URL',
      name: 'url',
      type: 'url',
      description: 'The main site url. Used to create canonical url',
    },
    {
      title: 'Site language',
      name: 'lang',
      type: 'string',
    },
    {
      title: 'Brand logo',
      description:
        'Best choice is to use an SVG where the color are set with currentColor',
      name: 'logo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessiblity.',
          options: {
            isHighlighted: true,
          },
        },
      ],
    },
    {
      title: 'Footer logo',
      name: 'footerLogo',
      type: 'image',
    },
    {
      name: 'menuLinkArr',
      type: 'array',
      title: 'Array of links',
      of: [
        {
          name: 'navItem',
          title: 'Nav Item',
          type: 'object',
          fields: [
            {
              name: 'navName',
              type: 'string',
              title: 'Link title',
            },
            {
              name: 'navLink',
              type: 'slug',
              title: 'Link Adress',
            },
          ],
        },
      ],
    },
    {
      name: 'buttonObj',
      title: 'Button Item',
      type: 'object',
      fields: [
        {
          name: 'buttonText',
          type: 'string',
          title: 'Button title',
        },
        {
          name: 'buttonLink',
          type: 'slug',
          title: 'Button Link',
        },
      ],
    },
    {
      name: 'technicalLinkArr',
      type: 'array',
      title: 'Array of technical links',
      of: [
        {
          name: 'navItem',
          title: 'Nav Item',
          type: 'object',
          fields: [
            {
              name: 'navName',
              type: 'string',
              title: 'Link title',
            },
            {
              name: 'navLink',
              type: 'slug',
              title: 'Link Adress',
            },
          ],
        },
      ],
    },
    {
      name: 'contactLinkObj',
      type: 'object',
      title: 'List of contacts',
      fields: [
        {
          name: 'emailAddress',
          type: 'string',
          title: 'Email',
        },
        {
          name: 'phoneNumber',
          type: 'string',
          title: 'Phone',
        },
      ],
    },
    {
      name: 'footerCopyrightText',
      title: 'Footer copytright text',
      type: 'string',
    },
    {
      name: 'socials',
      type: 'object',
      title: 'Socials',
      fields: [
        {
          name: 'instagram',
          type: 'object',
          title: 'Instagram',
          fields: [
            {
              name: 'instagramLink',
              title: 'Instagram Link',
              type: 'slug',
            },
            {
              name: 'instagramIcon',
              title: 'Instagram Icon',
              type: 'image',
            },
          ],
        },
        {
          name: 'dribble',
          type: 'object',
          title: 'Dribble',
          fields: [
            {
              name: 'dribbleLink',
              title: 'Dribble Link',
              type: 'slug',
            },
            {
              name: 'dribbleIcon',
              title: 'Dribble Icon',
              type: 'image',
            },
          ],
        },
        {
          name: 'twitter',
          type: 'object',
          title: 'Twitter',
          fields: [
            {
              name: 'twitterLink',
              title: 'Twitter Link',
              type: 'slug',
            },
            {
              name: 'twitterIcon',
              title: 'Twitter Icon',
              type: 'image',
            },
          ],
        },
        {
          name: 'youtube',
          type: 'object',
          title: 'Youtube',
          fields: [
            {
              name: 'youtubeLink',
              title: 'Youtube Link',
              type: 'slug',
            },
            {
              name: 'youtubeIcon',
              title: 'Youtube Icon',
              type: 'image',
            },
          ],
        },
      ],
    },
  ],
};

export default siteConfig;
