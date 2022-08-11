import { LANGUAGES } from '../../../utils/constants';
import { nameFromType } from '../../helpers/functions';

export const listFormat = (value) => ({
  title: nameFromType(value),
  value,
});

export const convertObjectToList = (object) =>
  Object.values(object).map((value) => listFormat(value));

export const convertObjectToReference = (object) =>
  Object.values(object).map((value) => ({ type: value }));

export const langRefFilter = ({ document }) => ({
  filter: `__i18n_lang == "${document.__i18n_lang}"`,
});

export const fieldTranslation = ({ title, name, type }) => {
  return {
    title,
    name,
    type: 'object',
    fields: LANGUAGES.map((lang) => ({
      title: lang.title,
      name: lang.locale,
      type,
      options: {
        collapsible: !lang.isDefault,
      },
    })),
  };
};

export const getLoopPreventionFilter = (maxLimit) => {
  let result = `parent->_id != $id`;
  let filter = result;
  for (let i = 0; i < maxLimit; i++) {
    if (i > 0) {
      filter = `parent->${filter}`;
      result += ` && ${filter}`;
    }
  }
  return result;
};
