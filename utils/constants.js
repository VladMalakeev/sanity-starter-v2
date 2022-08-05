export const TEMPLATE_RULES = {
  allChildrenRoutes: 'allChildrenRoutes',
  onlyCurrentRoute: 'onlyCurrentRoute',
};

export const LAYOUT_POSITIONS = {
  header: 'header',
  sitebar: 'sitebar',
  footer: 'footer',
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
  'default.template': 'defaultTemplate',
  'blog.template': 'blogTemplate',
  'product.template': 'productTemplate',
};

export const LANGUAGES = [{ locale: 'en', title: 'English', isDefault: true }];

export const BASIC_LOCALE = LANGUAGES.find((language) => language.isDefault).locale;
