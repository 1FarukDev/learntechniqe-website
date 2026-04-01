import PricingBanner from "@/app/features/courseDetails/Banner";
import BookCourse from "@/app/features/courseDetails/BookCourse";
import CourseDetails from "@/app/features/courseDetails/CourseDetails";
import CourseHero from "@/app/features/courseDetails/heroSection";
import CourseReviews from "@/app/features/courseDetails/CourseReviews";
import Contact from "@/app/features/homepage/contact";
import { AnimatedSection } from "@/components/animated-section";
import { client } from "@/lib/sanity/client";
import { courseBySlugQuery, coursesQuery } from "@/lib/queries/courses";
import {
  defaultBookCourseData,
  defaultCourseDetailsData,
  defaultCourseHeroData,
  defaultPricingBannerData,
} from "@/lib/constants/course";
import {
  AM2_COURSE_SLUG,
  getAm2SanityFallback,
} from "@/lib/constants/am2-course";
import { getCademyDates } from "@/lib/cademy";
import { fetchCoursecheckReviews } from "@/lib/coursecheck/fetchers";
import { notFound } from "next/navigation";
import React from "react";
import Session from "../sections/session";

interface CoursePageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const courses = await client.fetch(coursesQuery);
  const slugs = courses.map((course: { slug: string }) => ({
    slug: course.slug,
  }));
  if (!slugs.some((s: { slug: string }) => s.slug === AM2_COURSE_SLUG)) {
    slugs.push({ slug: AM2_COURSE_SLUG });
  }
  return slugs;
}

async function CourseDetail({ params }: CoursePageProps) {
  const { slug } = await params;
  let rawCourse = await client.fetch(courseBySlugQuery, { slug });
  console.log("Fetched course data:", rawCourse);
  if (!rawCourse && slug === AM2_COURSE_SLUG) {
    rawCourse = getAm2SanityFallback();
  }

  if (!rawCourse) return notFound();

  const cademyEmbedRaw = rawCourse?.cademyEmbedUrl;
  const cademyEmbedFromCms =
    typeof cademyEmbedRaw === "string" ? cademyEmbedRaw.trim() : "";
  const bookingAvailable = cademyEmbedFromCms.length > 0;

  const cademyDates =
    bookingAvailable && rawCourse?.cademyDirectUrl
      ? await getCademyDates(cademyEmbedFromCms, rawCourse.cademyDirectUrl)
      : [];

  const coursecheckCourseId = rawCourse?.courseReviewId || 4368;
  const companyId = 188;
  const { reviews: coursecheckReviews } = await fetchCoursecheckReviews({
    companyId,
    courseId: coursecheckCourseId,
  });

  const heroData = {
    ...defaultCourseHeroData,
    ...rawCourse,
    tags: rawCourse?.tags ?? defaultCourseHeroData.tags,
    description: rawCourse?.description ?? defaultCourseHeroData.description,
    qualifications:
      rawCourse?.qualifications ?? defaultCourseHeroData.qualifications,
    bookingAvailable,
  };

  const detailsData = {
    ...defaultCourseDetailsData,
    courseGoals: rawCourse?.courseGoals ?? defaultCourseDetailsData.courseGoals,
    entryRequirements:
      rawCourse?.entryRequirements ??
      defaultCourseDetailsData.entryRequirements,
    syllabus: rawCourse?.syllabus ?? defaultCourseDetailsData.syllabus,
  };

  const pricingData = {
    ...defaultPricingBannerData,
    price: rawCourse?.price ?? defaultPricingBannerData.price,
    originalPrice:
      rawCourse?.originalPrice ?? defaultPricingBannerData.originalPrice,
    pricingTagline:
      rawCourse?.pricingTagline ?? defaultPricingBannerData.pricingTagline,
  };

  const bookData = {
    ...defaultBookCourseData,
    title: rawCourse?.title ?? defaultBookCourseData.title,
    prerequisites:
      rawCourse?.prerequisites ?? defaultBookCourseData.prerequisites,
    completionRewards:
      rawCourse?.completionRewards ?? defaultBookCourseData.completionRewards,
    qualifications:
      rawCourse?.qualifications ?? defaultBookCourseData.qualifications,
    cademyEmbedUrl: bookingAvailable ? cademyEmbedFromCms : undefined,
    cademyDirectUrl:
      rawCourse?.cademyDirectUrl ?? defaultBookCourseData.cademyDirectUrl,
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
        <BookCourse data={bookData} courseUrl={`/courses/${slug}`} />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <CourseReviews
          reviews={coursecheckReviews}
          companyId={companyId}
          courseId={coursecheckCourseId}
        />
      </AnimatedSection>
      {/* <AnimatedSection variant="fade-up">
        <Session />
      </AnimatedSection> */}
      <AnimatedSection variant="fade-up">
        <Contact />
      </AnimatedSection>
    </main>
  );
}

export default CourseDetail;
