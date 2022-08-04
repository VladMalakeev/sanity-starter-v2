import groq from 'groq';

import hero from './hero';

export const modulesView = groq`{
  ${hero}
}`;
