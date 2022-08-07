import S from '@sanity/desk-tool/structure-builder';
import { FcRules, FcOpenedFolder } from 'react-icons/fc';

import { sanityClient } from '../../../helpers/client';

const pageItem = async (parentId) => {
  const page = await sanityClient.fetch(
    '*[_type == "page" && _id == $parentId][0]',
    { parentId },
  );
  if (page) {
    return S.documentTypeList('page')
      .title(page?.title ?? 'untitled')
      .filter(`_type == "page" && parent._ref == $parentId`)
      .params({ parentId })
      .initialValueTemplates([
        S.initialValueTemplateItem('pages', {
          parentId,
        }),
      ]);
  }
  return S.document().schemaType('page');
};

const createPagesQuery = (type, maxLevel, referenceName) => {
  let query = ``;
  let referenceNesting = ``;

  for (let i = 2; i < maxLevel; i++) {
    let condition = ``;

    if (i === 2) {
      referenceNesting = `${referenceName}`;
      condition = `!defined(${referenceNesting}) && nesting == true`;
    } else {
      condition = `defined(${referenceNesting}) && !defined(${referenceNesting}->${referenceName}) && nesting == true`;
      referenceNesting = `${referenceNesting}->${referenceName}`;
    }
    query += `{
      "documents": *[_type == "page" && ${condition} ]._id,
      "level": ${i} 
    },`;
  }
  return `[${query}]`;
};

export default S.listItem()
  .title('Pages')
  .icon(FcRules)
  .child(async () => {
    const query = createPagesQuery('page', 10, 'parent');
    const pages = await sanityClient.fetch(query);
    return S.list()
      .title('Pages')
      .items([
        S.listItem()
          .title('Level 1')
          .icon(FcOpenedFolder)
          .child(
            S.documentTypeList('page')
              .title('Level 1')
              .filter('_type == "page" && !defined(parent)'),
          ),
        ...pages
          .filter((page) => page.documents.length)
          .map((page) =>
            S.listItem()
              .title(`Level ${page.level}`)
              .icon(FcOpenedFolder)
              .child(
                S.documentTypeList('page')
                  .title(`Level ${page.level}`)
                  .filter(`_type == "page" && _id in $documents && nesting == true`)
                  .params({ documents: page.documents })
                  .child(pageItem),
              ),
          ),
      ]);
  });
