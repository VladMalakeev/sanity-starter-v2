import { DYNAMIC_TYPES } from '../../utils/constants';

export default function resolveProductionUrl(prosp) {
  const { _id, _type } = prosp;
  if (![...Object.values(DYNAMIC_TYPES), 'page'].includes(_type)) return null;
  const domain = process.env.SANITY_STUDIO_PROJECT_PATH ?? 'http://localhost:3000/';

  const params = new URLSearchParams();
  params.set('id', _id);
  params.set('type', _type);

  return `${domain ?? '/'}api/sanity/preview?${params.toString()}`;
}
