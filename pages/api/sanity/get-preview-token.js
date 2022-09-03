// eslint-disable-next-line consistent-return
const handler = async (req, res) => {
  // if (req.method !== 'POST') return res.status(405).end();

  // https://nextjs.org/docs/advanced-features/preview-mode#works-with-api-routes
  // if (!req.preview) {
  //   return res.status(400).json({ message: `Not in preview mode` });
  // }

  const userReq = await fetch(
    `https://${process.env.SANITY_STUDIO_API_PROJECT_ID}.api.sanity.io/v1/users/me`,
    { credentials: 'include' },
  );
  const user = await userReq.json();
  res.json(user);
  // if (!user?.id) {
  //   return res.status(400).json({ message: `Not a Sanity authenticated user` });
  // }
  //
  // return res
  //   .status(200)
  //   .json({ previewToken: `${user.id}${process.env.SANITY_API_TOKEN}` });
};

export default handler;
