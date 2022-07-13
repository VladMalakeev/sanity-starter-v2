import S from '@sanity/desk-tool/structure-builder';
import { GoSettings } from 'react-icons/go';
import { HiOutlineDocumentDuplicate } from 'react-icons/hi';
import { ImInsertTemplate } from 'react-icons/im';
import { MdWeb, MdSettings } from 'react-icons/md';
import { RiArticleLine } from 'react-icons/ri';

import PagePreview from '../components/previews/PagePreview';
import { singleton } from './helpers/singleton';
import layouts from './nodes/layouts.structure';
import modules from './nodes/modules.structure';
import routes from './nodes/routes.structure';

const deskStructure = S.list()
  .title('Halo starter')
  .items([
    S.listItem()
      .title('Website')
      .icon(MdWeb)
      .child(
        S.list()
          .title('Website')
          .items([
            singleton({
              title: 'Site configuration',
              type: 'siteConfig',
              icon: MdSettings,
            }),
            routes,
            singleton({
              title: 'Route configs',
              type: 'routeSettings',
              icon: GoSettings,
            }),
            S.listItem()
              .title('Static pages')
              .icon(HiOutlineDocumentDuplicate)
              .child(S.documentTypeList('staticPages').title('Static pages')),
            layouts,
            modules,
            S.documentTypeListItem('templates')
              .title('Templates')
              .icon(ImInsertTemplate),
          ]),
      ),

    S.documentTypeListItem('blog').title('Blog').icon(RiArticleLine),
    S.documentTypeListItem('products').title('Products').icon(RiArticleLine),
  ]);

export const getDefaultDocumentNode = ({ schemaType }) => {
  /**
   * Here you can define fallback views for document types without
   * a structure definition for the document node. If you want different
   * fallbacks for different types, or document values (e.g. if there is a slug present)
   * you can set up that logic in here too.
   * https://www.sanity.io/docs/structure-builder-reference#getdefaultdocumentnode-97e44ce262c9
   */
  const typesList = ['post'];

  if (typesList.includes(schemaType)) {
    return S.document().views([
      S.view.form(),
      S.view.component(PagePreview).title('Preview'),
    ]);
  }
  return S.document().views([S.view.form()]);
};

export default deskStructure;
