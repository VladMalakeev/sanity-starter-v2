import S from '@sanity/desk-tool/structure-builder';
import { FcNews } from 'react-icons/fc';

import { sanityClient } from '../../../helpers/client';
import { getTemplateName } from '../../../helpers/functions';
import { dynamicPages } from '../../../schemas/documents/pages/schema';

export const getDynamicDocuments = async () => {
  let query = ``;
  dynamicPages.forEach((page) => {
    query += `{ "type": "${page.name}", "documents": *[_type == "page" && dynamicConfig.dynamicParent == true && dynamicConfig.dynamicType == "${page.name}" && !(_id in path("drafts.**"))] },`;
  });
  return sanityClient.fetch(`[${query}]`);
};

export const getDynamicPages = (documents) => {
  return documents
    .filter((item) => item.documents.length)
    .map((item) => {
      return item.documents.map((document) => {
        return S.listItem()
          .icon(FcNews)
          .title(document.title)
          .child(
            S.documentTypeList(item.type)
              .title(document.title)
              .filter(`_type == $type && parent._ref == $parent`)
              .params({ type: item.type, parent: document._id })
              .initialValueTemplates([
                S.initialValueTemplateItem(getTemplateName(item.type), {
                  parentId: document._id,
                }),
              ]),
          );
      });
    })
    .flat();
};
