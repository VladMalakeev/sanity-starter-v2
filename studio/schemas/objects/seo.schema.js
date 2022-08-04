const seo = {
  name: "seo",
  title: "Seo",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "Around 55-60 characters long.",
    },
    {
      name: "description",
      title: "Description",
      description: "Around 150-160 characters long.",
      type: "text",
      rows: 3,
    },
    {
      name: "image",
      title: "Image",
      type: "image.simple",
    },
  ],
};

export default seo;
