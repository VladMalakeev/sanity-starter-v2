import groq from 'groq';

import about from './about';
import blog from './blog';
import contacts from './contacts';
import content from './content';
import hero from './hero';
import product from './product';

export const modulesView = groq`{
  ${hero},
  ${about},
  ${contacts},
  ${content},
  ${blog},
  ${product}
}`;
