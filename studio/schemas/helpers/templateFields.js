import { LAYOUT_TYPES } from '../../../utils/constants';
import { convertObjectToReference } from './functions';
import { defaultTemplateValidation } from './validation';

export const TEMPLATE_TITLE = {
  name: 'title',
  title: 'Template title',
  type: 'string',
};

export const TEMPLATE_IS_DEFAULT = {
  name: 'isDefault',
  title: 'Set as default template',
  type: 'boolean',
  initialValue: false,
};

export const TEMPLATE_POSITIONS = (positions = []) => {
  const fields = positions.map(({ name, title }) => ({
    name,
    title,
    type: 'reference',
    to: convertObjectToReference(LAYOUT_TYPES),
  }));

  return {
    name: 'positions',
    title: 'Layout positions',
    type: 'object',
    fields,
  };
};

export const TEMPLATE_VALIDATION = (Rule) =>
  Rule.custom(async (fields) => {
    const isDefaultError = await defaultTemplateValidation(fields);
    if (isDefaultError) return isDefaultError;
    return true;
  });
