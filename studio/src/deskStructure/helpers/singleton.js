import S from '@sanity/desk-tool/structure-builder';

export const singleton = ({ type, title, icon }) => {
  return S.listItem()
    .title(title)
    .icon(icon)
    .child(() => S.document().title(title).schemaType(type).documentId(type));
};
