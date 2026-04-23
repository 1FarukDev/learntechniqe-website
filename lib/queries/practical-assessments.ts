import { groq } from "next-sanity";

export const practicalAssessmentCentresQuery = groq`
  *[_type == "practicalAssessmentCentre" && isActive == true]
  | order(order asc, title asc) {
    title,
    shortName,
    "slug": slug.current,
    "heroImageUrl": heroImage.asset->url,
    addressLines,
    assessments[isActive != false]{
      label,
      "slug": slug.current,
      embedUrl
    }
  }
`;

