import { groq } from "next-sanity";

export const coursesQuery = groq`
  *[_type == "course"] | order(title asc) {
    title,
    "slug": slug.current,
    price,
    heroImage,
    tags,
    description,
    summary,
    duration,
  }
`;

export const courseCardsQuery = groq`
  *[_type == "course"] | order(title asc) {
    title,
    "slug": slug.current,
    price,
    duration,
    summary,
    "description": description[0],
    "heroImage": heroImage.asset->url,
    tags[]{ label, color },
  }
`;

export const courseBySlugQuery = groq`
  *[_type == "course" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    tags,
    heroImage,
    price,
    originalPrice,
    pricingTagline,
    description,
    summary,
    requestOverviewLink,
    qualifications[] {
      title,
      accreditedBy,
      accreditationLogoAlt,
      "accreditationLogo": accreditationLogo.asset->url,
    },
    duration,
    durationNote,
    durationNoteLink,
    courseGoals,
    entryRequirements,
    syllabus,
    prerequisites,
    showAccreditation,
    completionRewards,
    cademyEmbedUrl,
    cademyDirectUrl,
    courseReviewId,
    dates,
  }
`;