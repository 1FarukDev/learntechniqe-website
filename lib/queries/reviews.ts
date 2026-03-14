import { groq } from "next-sanity";

/**
 * GROQ query for reviews from Sanity.
 * Ensure your Sanity schema has: name, image (image), rating (number), title, text, age
 */
export const reviewsQuery = groq`
  *[_type == "review"] | order(_createdAt desc) {
    _id,
    name,
    "image": image.asset->url,
    rating,
    title,
    text,
    age
  }
`;
