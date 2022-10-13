import S from '@sanity/desk-tool/structure-builder';
import { FcServices } from 'react-icons/fc';

import { DYNAMIC_TYPES } from '../../../utils/constants';
import PagePreview from '../components/previews/PagePreview';
import { singleton } from './helpers/singleton';
import { getDynamicDocuments, getDynamicPages } from './nodes/dynamic.structure';
import layouts from './nodes/layouts.structure';
import modules from './nodes/modules.structure';
import pages from './nodes/pages.structure';
import { withTemplates } from './nodes/template.structure';

const deskStructure = async () => {
  const dynamicDocuments = await getDynamicDocuments();

  const items = [
    singleton({
      title: 'Site configuration',
      type: 'siteConfig',
      icon: FcServices,
    }),
    S.divider(),
    layouts,
    modules,
    S.divider(),
    pages,
    ...getDynamicPages(dynamicDocuments),
  ];

  return S.list().title('Halo starter').items(withTemplates(items));
};

export const getDefaultDocumentNode = ({ schemaType }) => {
  /**
   * Here you can define fallback views for document types without
   * a structure definition for the document node. If you want different
   * fallbacks for different types, or document values (e.g. if there is a slug present)
   * you can set up that logic in here too.
   * https://www.sanity.io/docs/structure-builder-reference#getdefaultdocumentnode-97e44ce262c9
   */
  const typesList = [...Object.values(DYNAMIC_TYPES), 'page'];

  if (typesList.includes(schemaType)) {
    return S.document().views([
      S.view.form(),
      S.view.component(PagePreview).title('Preview'),
    ]);
  }
  return S.document().views([S.view.form()]);
};

export default deskStructure;
