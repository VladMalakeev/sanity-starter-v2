import { DYNAMIC_TYPES, LANGUAGES } from '../../../utils/constants';
import { sanityClient } from '../../helpers/client';

export const listFormat = (value) => ({ title: value, value });

export const convertObjectToList = (object) =>
  Object.values(object).map((value) => listFormat(value));

export const langRefFilter = ({ document }) => ({
  filter: `__i18n_lang == "${document.__i18n_lang}"`,
});

export const fieldTranslation = ({ title, name, type }) => {
  return {
    title,
    name,
    type: 'object',
    fields: LANGUAGES.map((lang) => ({
      title: lang.title,
      name: lang.locale,
      type,
      options: {
        collapsible: !lang.isDefault,
      },
    })),
  };
};

export const dynamicSlugValidation = async (fields) => {
  if (!fields?.slug?.current) return 'Please set slug value';

  // check if exist slug on current blog level and on page document with same nesting level
  const query = `{
        "pageType": *[_type == "page" && _id == $blogParent][0]{
          "result": select(
            defined(parent->parent) => null,
            home == true => *[_type == "page" && !defined(parent) && slug.current == $slug && !(_id match "drafts.*") && __i18n_lang == $locale][0],
            *[_type == "page" && parent._ref == ^._id && slug.current == $slug && !(_id match "drafts.**") && __i18n_lang == $locale][0]
          ),
        }.result,
        "dynamicType": *[_type in $dynamicTypes && parent._ref == $blogParent && slug.current == $slug && _id != $id && !(_id in path("drafts.**")) && __i18n_lang == $locale][0]
      }`;

  const result = await sanityClient.fetch(query, {
    id: fields._id?.split('.').pop(),
    slug: fields.slug.current,
    blogParent: fields?.parent?._ref ?? null,
    locale: fields?.__i18n_lang,
    dynamicTypes: Object.values(DYNAMIC_TYPES),
  });

  if (result.dynamicType)
    return 'Such a slug already exists at the level of one of the dynamic types. Please set a unique slug value';
  if (result.pageType)
    return 'Such slug already exists on the current pages level. Please set a unique slug value';
  return false;
};

export const pagesSlugValidation = async (fields) => {
  if (!fields?.slug?.current) return 'Please set slug value';

  // check if exist slug on current page level and on blog document with same nesting level
  const query = `{
        "dynamicType": select(
          $pageParent == null => *[_type in $dynamicTypes && parent->home == true && slug.current == $slug && !(_id match "drafts.") && __i18n_lang == $locale][0],
          *[_type in $dynamicTypes && parent._ref == $pageParent && slug.current == $slug && !(_id match "drafts.") && __i18n_lang == $locale][0]
        ),
        "pageType":*[_type == "page" && parent._ref == $pageParent && slug.current == $slug  && _id != $id && !(_id in path("drafts.**")) && __i18n_lang == $locale][0]
      }`;

  const result = await sanityClient.fetch(query, {
    id: fields._id?.split('.').pop(),
    slug: fields.slug.current,
    pageParent: fields?.parent?._ref ?? null,
    locale: fields?.__i18n_lang,
    dynamicTypes: Object.values(DYNAMIC_TYPES),
  });

  if (result.dynamicType)
    return 'Such a slug already exists at the level of one of the dynamic types. Please set a unique slug value';
  if (result.pageType)
    return 'Such slug already exists on the current pages level. Please set a unique slug value';
  return false;
};
