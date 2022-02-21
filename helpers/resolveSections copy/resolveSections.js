import { upperFirst } from 'lodash';

import * as SectionComponents from '@/components/sections';

const resolveSections = section => {
  // eslint-disable-next-line no-underscore-dangle
  const SectionComponent = SectionComponents[upperFirst(section._type)];

  if (SectionComponent) return SectionComponent;

  console.error('Cant find section', section);  // eslint-disable-line no-console
  return null;
};

export default resolveSections;