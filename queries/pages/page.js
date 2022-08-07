import groq from 'groq';

import { seo } from '../components/seo';
import { modulesView } from '../modules';

export const page = groq`
  _type == "page" => {
    ...,
    ${seo},
    modules []-> ${modulesView}
  }
`;
