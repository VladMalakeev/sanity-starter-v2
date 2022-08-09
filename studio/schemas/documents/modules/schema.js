import aboutModule from './about.module';
import blogModule from './blog.module';
import contactsModule from './contacts.module';
import contentModule from './content.module';
import heroModule from './hero.module';
import productModule from './product.module';

export const commonModules = [
  heroModule,
  aboutModule,
  contactsModule,
  contentModule,
];

export const dynamicPageContent = [blogModule, productModule];

export default [...commonModules, ...dynamicPageContent];
