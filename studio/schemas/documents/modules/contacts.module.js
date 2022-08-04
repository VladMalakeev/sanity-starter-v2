import { MODULE_TYPES } from '../../../../utils/constants';
import { DEFAULT_LANGUAGE } from '../../helpers/commonfields';

const contactsModule = {
  name: MODULE_TYPES['contact.module'],
  type: 'document',
  title: 'Contacts module',
  initialValue: {
    ...DEFAULT_LANGUAGE,
  },
  fields: [
    {
      name: 'title',
      title: 'Contacts title',
      type: 'string',
    },
    {
      name: 'fullName',
      title: 'Full name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Phone number',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
    },
  ],
};

export default contactsModule;
