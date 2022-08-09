import { commonModules } from '../documents/modules/schema';
import { langRefFilter } from '../helpers/functions';

const modulesSchema = {
  name: 'modules',
  title: 'Lost of modules',
  type: 'array',
  of: commonModules.map((module) => ({
    title: module.title,
    name: module.name,
    type: 'reference',
    to: [
      {
        type: module.name,
      },
    ],
    options: {
      filter: langRefFilter,
    },
  })),
};
export default modulesSchema;
