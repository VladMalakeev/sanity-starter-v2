export const MAX_NESTING_LEVEL = 10;

export const DYNAMIC_TYPES = {
  blog: 'blog_page',
  product: 'product_page',
};

export const MODULE_TYPES = {
  hero: 'hero_module',
  about: 'about_module',
  content: 'content_module',
  contact: 'contact_module',
  blog: 'blog_module',
  product: 'product_module',
};

// layouts
export const LAYOUT_TYPES = {
  header: 'header_layout',
  footer: 'footer_layout',
  sitebar: 'sitebar_layout',
  breadcrumbs: 'breadcrumbs_layout',
};

export const LAYOUT_POSITIONS = {
  header: 'header_position',
  sitebar: 'sitebar_position',
  footer: 'footer_position',
  breadcrumbs: 'breadcrumbs_position',
};

// templates
export const TEMPLATE_TYPES = {
  blog: 'blog_template',
  product: 'product_template',
};

export const TEMPLATE_TYPES_LIST = Object.values(TEMPLATE_TYPES);

// languages
export const LANGUAGES = [{ locale: 'en', title: 'English', isDefault: true }];

export const BASIC_LOCALE = LANGUAGES.find((language) => language.isDefault).locale;
