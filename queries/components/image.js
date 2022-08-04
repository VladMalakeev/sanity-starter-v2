import groq from "groq";

export const imageView = groq`
  image {
    source {
      "src": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
    },
    alt,
    caption,
  }
`;
