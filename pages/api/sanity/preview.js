function warning(msg) {
  return `<p style="
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Roboto, Arial, sans-serif; 
  padding: 10px; 
  border-radius: 3px;
  background: lightyellow; 
  line-height: 1.5;
  border: 1px solid rgba(0,0,0,.1);">${msg}</p>`;
}

// eslint-disable-next-line consistent-return
const handler = async (req, res) => {
  const { id, type } = req.query;

  if (Array.isArray(id) || Array.isArray(type)) {
    return res.status(400).send(warning('invalid arguments.'));
  }

  const params = new URLSearchParams();
  params.set('id', id);
  params.set('type', type);

  const Location = `/preview?${params.toString()}`;
  res.setPreviewData({});
  res.writeHead(307, { Location });
  res.end();
};

export default handler;
