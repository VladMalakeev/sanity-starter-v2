import { BASIC_LOCALE, LANGUAGES } from '../../../utils/constants';

export const TITLE_FIELD = {
  name: 'title',
  type: 'string',
  title: 'Title',
  validate: (Rule) => Rule.required(),
};

export const SLUG_FIELD = {
  name: 'slug',
  type: 'slug',
  title: 'Slug',
  validate: (Rule) => Rule.required(),
  options: {
    source: 'title',
    maxLength: 96,
  },
};

export const I18N = {
  base: BASIC_LOCALE,
  languages: LANGUAGES.map((lang) => lang.locale),
  referenceBehavior: 'weak',
  fieldNames: {
    lang: '__i18n_lang',
    references: '__i18n_refs',
    baseReference: '__i18n_base',
  },
};

export const DEFAULT_LANGUAGE = {
  __i18n_lang: BASIC_LOCALE,
};

export const pageGroups = [
  {
    name: 'general',
    title: 'General',
    default: true,
  },
  {
    name: 'settings',
    title: 'Settings',
  },
  {
    name: 'seo',
    title: 'SEO',
  },
];
