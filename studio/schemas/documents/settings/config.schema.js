import { MdSettings } from 'react-icons/md';

import { fieldTranslation } from '../../helpers/functions';

const configSchema = {
  name: 'siteConfig',
  type: 'document',
  title: 'Site configuration',
  preview: {
    select: {
      name: 'name',
    },
    prepare({ name }) {
      return {
        title: name,
        media: MdSettings,
      };
    },
  },
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name of the website',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Domain',
      name: 'domain',
      type: 'url',
      description:
        'The website domain without slash and protocol, e.g google.com. Used for the canonical url.',
      validation: (Rule) => Rule.required(),
    },
    fieldTranslation({ title: 'SEO', name: 'seo', type: 'seo' }),
    {
      name: 'gtmid',
      title: 'Google Tag Manager ID',
      type: 'string',
      description: 'Formatted as `GTM-XXXXXX`.',
    },
  ],
};

export default configSchema;
