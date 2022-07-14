import React from 'react';

import { MODULE_TYPES } from '@/utils/sanity/consants';

import { AboutModule } from '../modules/about/about.module';
import { ContactsModule } from '../modules/contacts/contacts.module';
import { ContentModule } from '../modules/content/content.module';
import { HeroModule } from '../modules/hero/hero.module';

const ModuleBuilder = ({ modules = [] }) => {
  if (!modules) return null;
  return modules.map((module) => <ModuleItem key={module._key} module={module} />);
};

const ModuleItem = ({ module }) => {
  return (
    <>
      {module._type === MODULE_TYPES['hero.module'] && <HeroModule {...module} />}
      {module._type === MODULE_TYPES['about.module'] && <AboutModule {...module} />}
      {module._type === MODULE_TYPES['contact.module'] && (
        <ContactsModule {...module} />
      )}
      {module._type === MODULE_TYPES['content.module'] && (
        <ContentModule {...module} />
      )}
    </>
  );
};

export default ModuleBuilder;
