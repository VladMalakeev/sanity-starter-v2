import { DYNAMIC_TYPES, TEMPLATE_TYPES_LIST } from '../../../utils/constants';
import { sanityClient } from '../../helpers/client';

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

export const defaultTemplateValidation = async (fields) => {
  if (fields?.isDefault) {
    const defaultTemplate = await sanityClient.fetch(
      '*[_type in $types && isDefault == true && __i18n_lang == $locale && !(_id in path("drafts.**"))][0]',
      {
        types: TEMPLATE_TYPES_LIST,
        locale: fields.__i18n_lang,
      },
    );

    if (defaultTemplate && defaultTemplate._id !== fields._id.split('.').pop())
      return 'Default template already defined';
  }
  return false;
};

export const pageRedirectValidation = (fields) => {
  if (fields?.redirect?.useRedirect && !fields?.redirect?.redirectPage) {
    return 'Please select redirect page';
  }
  return false;
};

export const pageTemplatesValidation = (fields) => {
  if (
    fields?.templateConfig?.useTemplate &&
    !fields?.templateConfig?.currentPage &&
    !fields?.templateConfig?.childPages
  ) {
    return 'Please select template';
  }
  return false;
};

export const dynamicPageValidation = (fields) => {
  if (fields?.dynamicConfig?.dynamicParent && !fields?.dynamicConfig?.dynamicType) {
    return 'Please select dynamic type';
  }
  return false;
};

export const homePageValidation = async (fields) => {
  const isHomePageAssigned = await sanityClient.fetch(
    '*[_type == "page" && home == true && !(_id match "drafts.**")]',
  );

  if (isHomePageAssigned.length) {
    const currentPage = isHomePageAssigned.find(
      (page) => String(fields._id).indexOf(page._id) !== -1,
    );

    if (!currentPage && fields.home)
      return 'Only one home page entity must be defined!';
  }
  return false;
};
