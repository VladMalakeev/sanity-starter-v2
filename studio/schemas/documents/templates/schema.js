import { TEMPLATE_TYPES_LIST } from '../../../../utils/constants';
import blogTemplate from './blogTemplate.schema';
import productTemplate from './productsTemplate.schema';

const templates = [blogTemplate, productTemplate];

export default templates.filter((template) =>
  TEMPLATE_TYPES_LIST.includes(template.name),
);
