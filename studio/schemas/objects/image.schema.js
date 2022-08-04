const image = {
  name: "image.simple",
  title: "Image",
  type: "object",
  fields: [
    {
      name: "source",
      title: "Source",
      type: "image",
    },
    {
      name: "alt",
      type: "string",
      title: "Alternative text",
      description:
        "The alternative text is used to describe the image for screen readers.",
    },
    {
      name: "caption",
      title: "Caption",
      type: "string",
      description:
        "Optional caption to display with the image. Only shown on the website.",
    },
  ],
};

export default image;
