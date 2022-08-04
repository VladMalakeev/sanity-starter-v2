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

export const PAGE_TEMPLATE = {
  name: 'template',
  title: 'Template',
  type: 'templateConfig',
  group: 'settings',
};
