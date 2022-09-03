export default function resolveProductionUrl({ _id, _type }) {
  return `${process.env.SANITY_STUDIO_PROJECT_PATH}api/sanity/preview?_id=${_id}&_type=${_type}&secret=${process.env.SANITY_STUDIO_PREVIEW_SECRET}`;
}
