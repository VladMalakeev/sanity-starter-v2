import { imageView } from "./image";
import groq from "groq";

export const seo = groq`
  seo {
    title,
    description,
    ${imageView}
  }`;
