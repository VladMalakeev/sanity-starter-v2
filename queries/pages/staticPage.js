import groq from 'groq';

import { seo } from '../components/seo';
import { modulesView } from '../modules';

export const staticPage = groq`
  _type == "page" => {
    ...,
    ${seo},
    modules []-> ${modulesView}
  }
`;
