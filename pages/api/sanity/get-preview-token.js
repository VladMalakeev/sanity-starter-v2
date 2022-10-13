// eslint-disable-next-line consistent-return
const handler = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  // https://nextjs.org/docs/advanced-features/preview-mode#works-with-api-routes
  if (!req.preview) {
    return res.status(400).json({ message: `Not in preview mode` });
  }

  return res
    .status(200)
    .json({ previewToken: process.env.SANITY_PREVIEW_API_TOKEN });
};

export default handler;
