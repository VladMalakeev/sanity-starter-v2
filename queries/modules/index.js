import groq from 'groq';

import about from './about';
import contacts from './contacts';
import content from './content';
import hero from './hero';

export const modulesView = groq`{
  ${hero},
  ${about},
  ${contacts},
  ${content}
}`;
