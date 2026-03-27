import {
  am2BookData,
  am2DetailsData,
  am2HeroData,
  am2PricingData,
} from "@/content/am2-assessment-course";

export const AM2_COURSE_SLUG = "am2-assessment";

/**
 * Shape matches `courseBySlugQuery` enough for `[slug]/page.tsx` merges.
 * Used when no Sanity `course` document exists yet for AM2.
 */
export function getAm2SanityFallback(): Record<string, unknown> {
  return {
    title: am2HeroData.title,
    slug: am2HeroData.slug,
    tags: am2HeroData.tags,
    description: am2HeroData.description,
    qualifications: am2HeroData.qualifications,
    duration: am2HeroData.duration,
    durationNote: am2HeroData.durationNote,
    price: am2PricingData.price,
    pricingTagline: am2PricingData.pricingTagline,
    courseGoals: am2DetailsData.courseGoals,
    entryRequirements: am2DetailsData.entryRequirements,
    syllabus: am2DetailsData.syllabus,
    prerequisites: am2BookData.prerequisites,
    completionRewards: am2BookData.completionRewards,
  };
}
