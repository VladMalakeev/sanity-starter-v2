import React from 'react';

import { HeroModule } from '../modules/hero.module';

const ModuleBuilder = ({ modules }) => {
  return modules.map((module) => (
    <ModuleItem key={module._key} item={module.item} />
  ));
};

const ModuleItem = ({ item }) => {
  return <>{item._type === 'hero.module' && <HeroModule {...item} />}</>;
};

export default ModuleBuilder;
