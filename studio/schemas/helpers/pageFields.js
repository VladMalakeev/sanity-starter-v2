import { TEMPLATE_TYPES } from '../../../utils/constants';
import { convertObjectToReference } from './functions';
import {
  dynamicSlugValidation,
  pageRedirectValidation,
  pageTemplatesValidation,
} from './validation';

export const PAGE_TITLE = {
  title: 'Page name',
  description: 'Give an obvious name to the page',
  type: 'string',
  name: 'title',
  group: 'general',
  validate: (Rule) => Rule.required().max(96),
};

export const PAGE_SLUG = {
  name: 'slug',
  type: 'slug',
  title: 'Slug',
  description: 'Set a unique URL for the page or generate from the title',
  validate: (Rule) => Rule.required(),
  group: 'general',
  options: {
    source: 'title',
    maxLength: 96,
    isUnique: () => true,
  },
};

export const PAGE_SEO = {
  name: 'seo',
  title: 'Seo',
  type: 'seo',
  group: 'seo',
};

export const EXCLUDE_SITEMAP = {
  name: 'excludeSitemap',
  title: 'Exclude from sitemap',
  description: 'Do not show page in search results',
  type: 'boolean',
  initialValue: false,
  group: 'seo',
};

export const PAGE_REDIRECT = {
  name: 'redirect',
  title: 'Page redirect',
  type: 'page.redirect',
  group: 'settings',
};

export const DYNAMIC_PAGE_PARENT = {
  name: 'parent',
  type: 'reference',
  description: 'Select the parent route for this page',
  to: [{ type: 'page' }],
  group: 'general',
  readOnly: true,
  hidden: true,
};

export const PAGE_TEMPLATE = {
  name: 'templateConfig',
  title: 'Template',
  type: 'object',
  fields: [
    {
      name: 'useTemplate',
      title: 'Use template?',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'currentPage',
      title: 'Current page template',
      type: 'reference',
      to: convertObjectToReference(TEMPLATE_TYPES),
      hidden: ({ parent }) => !parent.useTemplate,
    },
    {
      name: 'childPages',
      title: 'Child pages template',
      type: 'reference',
      to: convertObjectToReference(TEMPLATE_TYPES),
      hidden: ({ parent }) => !parent.useTemplate,
    },
  ],
  group: 'settings',
};

export const DYNAMIC_PAGE_VALIDATION = (Rule) =>
  Rule.custom(async (fields) => {
    const errorsList = [];
    const slugError = await dynamicSlugValidation(fields);
    if (slugError) errorsList.push(slugError);

    const redirectError = pageRedirectValidation(fields);
    if (redirectError) errorsList.push(redirectError);

    const templateError = pageTemplatesValidation(fields);
    if (templateError) errorsList.push(templateError);

    return errorsList;
  });
