import groq from 'groq';

import { footer } from './footer';
import { header } from './header';
import { sitebar } from './sitebar';

export const layoutView = groq`{ 
  ...,
  ${header}, 
  ${footer}, 
  ${sitebar}
}`;
