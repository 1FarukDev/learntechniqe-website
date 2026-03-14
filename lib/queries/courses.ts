import { groq } from 'next-sanity'

export const coursesQuery = groq`
  *[_type == "course"] | order(title asc) {
    title,
    "slug": slug.current,
    price,
    heroImage,
    tags,
    description,
    duration,
  }
`

export const courseBySlugQuery = groq`
  *[_type == "course" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    price,
    heroImage,
    tags,
    description,
    duration,
    durationNote,
    qualifications,
    courseGoals,
    entryRequirements,
    syllabus,
    prerequisites,
    completionRewards,
    dates,
    requestOverviewLink,
  }
`