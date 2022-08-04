export const TEMPLATE_RULES = {
  allChildrenRoutes: 'allChildrenRoutes',
  onlyCurrentRoute: 'onlyCurrentRoute',
  dontUse: 'dontUse',
};

export const LAYOUT_POSITIONS = {
  'default-header': 'default-header',
  'left-sitebar': 'left-sitebar',
  'default-footer': 'default-footer',
  breadcrumbs: 'breadcrumbs',
};

export const DYNAMIC_TYPES = {
  blog: 'blog',
  products: 'products',
};

export const MODULE_TYPES = {
  'hero.module': 'hero.module',
  'about.module': 'about.module',
  'content.module': 'content.module',
  'contact.module': 'contact.module',
};

export const LAYOUT_TYPES = {
  'header.layout': 'header.layout',
  'footer.layout': 'footer.layout',
  'sitebar.layout': 'sitebar.layout',
  'breadcrumbs.layout': 'breadcrumbs.layout',
};

export const TEMPLATE_TYPES = {
  'default.template': 'default.template',
  'blog.template': 'blog.template',
  'product.template': 'product.template',
};

export const LANGUAGES = [{ locale: 'en', title: 'English', isDefault: true }];

export const BASIC_LOCALE = LANGUAGES.find((language) => language.isDefault).locale;
