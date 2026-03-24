// app/pathways/[slug]/page.tsx

import PricingBanner from "@/app/features/courseDetails/Banner";
import BookCourse from "@/app/features/courseDetails/BookCourse";
import CourseDetails from "@/app/features/courseDetails/CourseDetails";
import CourseHero from "@/app/features/courseDetails/heroSection";
import Contact from "@/app/features/homepage/contact";
import Ratings from "@/app/features/homepage/ratings";
import { AnimatedSection } from "@/components/animated-section";
import { client } from "@/lib/sanity/client";
import { PATHWAY_DETAIL_QUERY, PATHWAYS_QUERY } from "@/lib/queries/pathway";
import {
  defaultBookCourseData,
  defaultCourseDetailsData,
  defaultCourseHeroData,
  defaultPricingBannerData,
} from "@/lib/constants/course";
import { getCademyDates } from "@/lib/cademy";
import { notFound } from "next/navigation";

interface PathwayPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const pathways = await client.fetch(PATHWAYS_QUERY);
  return pathways.map((p: any) => ({ slug: p.slug }));
}

async function PathwayDetail({ params }: PathwayPageProps) {
  const { slug } = await params;
  const rawCourse = await client.fetch(PATHWAY_DETAIL_QUERY, { slug });

  if (!rawCourse) return notFound();

  const cademyDates =
    rawCourse?.cademyEmbedUrl && rawCourse?.cademyDirectUrl
      ? await getCademyDates(rawCourse.cademyEmbedUrl, rawCourse.cademyDirectUrl)
      : [];

  const heroData = {
    ...defaultCourseHeroData,
    ...rawCourse,
    tags: rawCourse?.tags ?? defaultCourseHeroData.tags,
    description: rawCourse?.description ?? defaultCourseHeroData.description,
    qualifications: rawCourse?.qualifications ?? defaultCourseHeroData.qualifications,
  };

  const detailsData = {
    ...defaultCourseDetailsData,
    courseGoals: rawCourse?.courseGoals ?? defaultCourseDetailsData.courseGoals,
    entryRequirements: rawCourse?.entryRequirements ?? defaultCourseDetailsData.entryRequirements,
    syllabus: rawCourse?.syllabus ?? defaultCourseDetailsData.syllabus,
  };

  const pricingData = {
    ...defaultPricingBannerData,
    price: rawCourse?.price ?? defaultPricingBannerData.price,
    originalPrice: rawCourse?.originalPrice ?? defaultPricingBannerData.originalPrice,
    pricingTagline: rawCourse?.pricingTagline ?? defaultPricingBannerData.pricingTagline,
  };

  const bookData = {
    ...defaultBookCourseData,
    title: rawCourse?.title ?? defaultBookCourseData.title,
    prerequisites: rawCourse?.prerequisites ?? defaultBookCourseData.prerequisites,
    completionRewards: rawCourse?.completionRewards ?? defaultBookCourseData.completionRewards,
    qualifications: rawCourse?.qualifications ?? defaultBookCourseData.qualifications,
    cademyEmbedUrl: rawCourse?.cademyEmbedUrl ?? defaultBookCourseData.cademyEmbedUrl,
    cademyDirectUrl: rawCourse?.cademyDirectUrl ?? defaultBookCourseData.cademyDirectUrl,
    dates: cademyDates.length > 0 ? cademyDates : defaultBookCourseData.dates,
  };

  return (
    <main>
      <AnimatedSection variant="fade-in" visibleOnLoad>
        <CourseHero data={heroData} />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <CourseDetails data={detailsData} />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <BookCourse data={bookData} />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <Ratings />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <Contact />
      </AnimatedSection>
    </main>
  );
}

export default PathwayDetail;