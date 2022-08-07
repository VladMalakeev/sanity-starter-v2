import { TEMPLATE_TYPES_LIST } from '../../../../utils/constants';
import { PAGE_TEMPLATE } from '../../helpers/pageFields';
import blog from './blog.schema';
import page from './page.schema';
import product from './product.schema';

export const dynamicPages = [blog, product];

export default [page, ...dynamicPages].map((pageSchema) => {
  if (TEMPLATE_TYPES_LIST?.length) {
    const pageTemplate = pageSchema.fields.find(
      (field) => field.name === PAGE_TEMPLATE.name,
    );
    if (!pageTemplate) pageSchema.fields.push(PAGE_TEMPLATE);
  }
  return pageSchema;
});
