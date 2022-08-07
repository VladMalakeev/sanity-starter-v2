import groq from 'groq';

import { imageView } from './components/image';

export const configData = groq`
*[_type == "siteConfig"][0]{
    ...,
    "seo":seo[$locale]{
      title,
      description,
      ${imageView}
    }
  }
`;
