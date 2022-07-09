import S from '@sanity/desk-tool/structure-builder';
import React from 'react';
import { MdWeb } from 'react-icons/md';

import { sanityClient } from '../../../helpers/client';

export default S.listItem()
  .title('Routes')
  .child(() => {
    return S.documentTypeList('route')
      .title('Parent routes')
      .filter('_type == "route" && !defined(parentRoute)')
      .menuItems([
        S.menuItem()
          .title('Add parent route')
          .icon(MdWeb)
          .intent({
            type: 'create',
            params: [{ type: 'route', template: 'routing' }, { parentRoute: '' }],
          })
          .showAsAction(),
      ])
      .child(getNestedChildren);
  });

const getNestedChildren = async (parent) => {
  const route = await sanityClient.fetch(
    '*[_type == "route" && _id == $parent][0]',
    { parent },
  );
  return S.documentList()
    .id(parent)
    .title(route?.title)
    .filter('_type == "route" && $parent == parentRoute._ref')
    .menuItems([
      S.menuItem()
        .title(`Create ${route?.title}`)
        .icon(MdWeb)
        .intent({
          type: 'create',
          params: [
            { type: 'route', template: 'routing' },
            { parentRoute: parent, parentLevel: route.level },
          ],
        })
        .showAsAction(),
      S.menuItem()
        .title(`Edit ${route?.title}`)
        .icon(MdWeb)
        .intent({
          type: 'edit',
          params: [{ type: 'route', id: parent }],
        })
        .showAsAction(),
    ])
    .params({ parent })
    .child(getNestedChildren);
};
