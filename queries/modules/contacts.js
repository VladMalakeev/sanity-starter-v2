import groq from 'groq';

import { MODULE_TYPES } from '@/utils/constants';

const contacts = groq`
  _type == "${MODULE_TYPES['contact.module']}" => {
    ...
  }
`;

export default contacts;
