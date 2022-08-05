import groq from 'groq';

import { footer } from './footer';
import { header } from './header';

export const layoutView = groq`{ 
  ...,
  ${header}, 
  ${footer}, 
}`;
