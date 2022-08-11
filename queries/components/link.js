import groq from 'groq';

import { MAX_NESTING_LEVEL, LANGUAGES, BASIC_LOCALE } from '@/utils/constants';

const languagesCount = Object.values(LANGUAGES).length;

const nestedRouteQuery = (maxLevel, referenceName, languages) => {
  let level = ``;
  let path = ``;
  let slug = `slug.current,`;

  const nestingPreview = (maxCount) => {
    let view =
      languages > 1
        ? `select(lang == "${BASIC_LOCALE}" => "/", "/" + lang + "/")`
        : `"/"`;
    for (let i = maxCount; i >= 0; i--) {
      view = `${view} + level${i} + "/"`;
    }
    return view;
  };

  for (let i = 0; i < maxLevel; i++) {
    level += `"level${i}": ${slug}`;
    slug = `${referenceName}->${slug}`;
    path += `defined(level${maxLevel - i - 1}) => ${nestingPreview(
      maxLevel - i - 1,
    )}, `;
  }

  return `{
    "lang": __i18n_lang,
    home,
    ${level}  
  }{
    "path":select(
      home == true =>  "/",
      ${path}
    )
  }.path`;
};

export const link = groq`
  _key,
  label,
  "url": coalesce(external, internal->${nestedRouteQuery(
    MAX_NESTING_LEVEL,
    'parent',
    languagesCount,
  )}, '')
`;
