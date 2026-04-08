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

/**
 * Sanity course document by slug. Includes optional detailsSummary (see CourseDetailsData)
 * and bookASession (boolean) for the on-site “Book a session” banner on course pages.
 */
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
    detailsSummary,
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
    bookASession,
  }
`;
