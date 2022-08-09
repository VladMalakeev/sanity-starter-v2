import React from 'react';

import { MODULE_TYPES } from '@/utils/constants';

import { AboutModule } from '../modules/about/about.module';
import { BlogModule } from '../modules/blog/blog.module';
import { ContactsModule } from '../modules/contacts/contacts.module';
import { ContentModule } from '../modules/content/content.module';
import { HeroModule } from '../modules/hero/hero.module';
import { ProductModule } from '../modules/product/product.module';

const ModuleBuilder = ({ modules = [] }) => {
  if (!modules) return null;
  return modules.map((module) => <ModuleItem key={module?._id} module={module} />);
};

const ModuleItem = ({ module }) => {
  if (!module?._type) return null;
  return (
    <>
      {module?._type === MODULE_TYPES.hero && <HeroModule {...module} />}
      {module?._type === MODULE_TYPES.about && <AboutModule {...module} />}
      {module?._type === MODULE_TYPES.contact && <ContactsModule {...module} />}
      {module?._type === MODULE_TYPES.content && <ContentModule {...module} />}
      {module?._type === MODULE_TYPES.blog && <BlogModule {...module} />}
      {module?._type === MODULE_TYPES.product && <ProductModule {...module} />}
    </>
  );
};

export default ModuleBuilder;
