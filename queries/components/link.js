import groq from "groq";

const internalLink = groq`{
"locale": internal->__i18n_lang,
"level0": internal->slug.current,
"level1": internal->parent->slug.current,
"level2": internal->parent->parent->slug.current,
}{
"path": select(
   defined(level2) => "/"+ locale + "/"+ level2 +"/"+ level1 + "/"+ level0,
   defined(level1) => "/"+ locale + "/"+ level1 +"/"+ level0,
   defined(level0) => "/"+ locale + "/"+ level0,
)
}.path
`;

export const link = groq`
  _key,
  label,
  "url": coalesce(external, ${internalLink}, '')
`;
