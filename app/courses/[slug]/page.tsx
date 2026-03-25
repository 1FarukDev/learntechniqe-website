import PricingBanner from "@/app/features/courseDetails/Banner";
import BookCourse from "@/app/features/courseDetails/BookCourse";
import CourseDetails from "@/app/features/courseDetails/CourseDetails";
import CourseHero from "@/app/features/courseDetails/heroSection";
import Contact from "@/app/features/homepage/contact";
import Ratings from "@/app/features/homepage/ratings";
import { AnimatedSection } from "@/components/animated-section";
import { client } from "@/lib/sanity/client";
import { courseBySlugQuery, coursesQuery } from "@/lib/queries/courses";
import {
  defaultBookCourseData,
  defaultCourseDetailsData,
  defaultCourseHeroData,
  defaultPricingBannerData,
} from "@/lib/constants/course";
import { getCademyDates } from "@/lib/cademy";
import { notFound } from "next/navigation";
import React from "react";
import Session from "../sections/session";

interface CoursePageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const courses = await client.fetch(coursesQuery);
  return courses.map((course: any) => ({ slug: course.slug }));
}

async function CourseDetail({ params }: CoursePageProps) {
  const { slug } = await params;
  const rawCourse = await client.fetch(courseBySlugQuery, { slug });

  if (!rawCourse) return notFound();

  const cademyEmbedRaw = rawCourse?.cademyEmbedUrl;
  const cademyEmbedFromCms =
    typeof cademyEmbedRaw === "string" ? cademyEmbedRaw.trim() : "";
  const bookingAvailable = cademyEmbedFromCms.length > 0;

  const cademyDates =
    bookingAvailable && rawCourse?.cademyDirectUrl
      ? await getCademyDates(
          cademyEmbedFromCms,
          rawCourse.cademyDirectUrl,
        )
      : [];

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
      {bookingAvailable && (
        <AnimatedSection variant="fade-up">
          <BookCourse data={bookData} />
        </AnimatedSection>
      )}
      <AnimatedSection variant="fade-up">
        <Ratings />
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
