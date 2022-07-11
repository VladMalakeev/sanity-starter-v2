import S from '@sanity/desk-tool/structure-builder';
import { AiOutlineSetting } from 'react-icons/ai';
import { ImLink } from 'react-icons/im';

import { sanityClient } from '../../../helpers/client';

export default S.listItem()
  .title('Routes')
  .icon(ImLink)
  .child(() => {
    return S.documentTypeList('route')
      .title('Parent routes')
      .filter('_type == "route" && !defined(parentRoute)')
      .initialValueTemplates([
        S.initialValueTemplateItem('routing', { parentRoute: '' }),
      ])
      .menuItems([])
      .child(getNestedChildren);
  });

const getNestedChildren = async (parent) => {
  const route = await sanityClient.fetch(
    '*[_type == "route" && _id == $parent][0]',
    { parent },
  );

  return S.documentTypeList('route')
    .title(`/${route?.slug.current}`)
    .filter('_type == "route" && $parent == parentRoute._ref')
    .menuItems([
      S.menuItem()
        .title(`Edit ${route?.title}`)
        .icon(AiOutlineSetting)
        .intent({
          type: 'edit',
          params: [{ type: 'route', id: parent }],
        })
        .showAsAction(),
    ])
    .params({ parent })
    .initialValueTemplates([
      S.initialValueTemplateItem('routing', {
        parentRoute: parent,
      }),
    ])
    .child(getNestedChildren);
};
