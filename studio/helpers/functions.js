import { BASIC_LOCALE } from '../../utils/constants';

export const getTemplateName = (type) => `${type}_template`;

export const nameFromType = (type) => type.replace(/_/, ' ');

export const filterByBasicLocale = `__i18n_lang == "${BASIC_LOCALE}"`;
