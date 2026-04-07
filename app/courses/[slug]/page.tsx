import type { Metadata } from "next";
import PricingBanner from "@/app/features/courseDetails/Banner";
import BookCourse from "@/app/features/courseDetails/BookCourse";
import Am2ResitSection from "@/app/features/courseDetails/Am2ResitSection";
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

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  let course = await client.fetch(courseBySlugQuery, { slug });
  if (!course && slug === AM2_COURSE_SLUG) course = getAm2SanityFallback();
  if (!course) return {};

  const title = course.title ?? "Course Details";
  const description =
    Array.isArray(course.description) && course.description.length > 0
      ? typeof course.description[0] === "string"
        ? course.description[0]
        : course.description[0]?.children?.[0]?.text ?? ""
      : typeof course.description === "string"
        ? course.description
        : `${title} — accredited training course at Technique Learning Solutions. Expert-led, hands-on training at world-class facilities.`;

  const metaDescription = description.length > 155
    ? `${description.slice(0, 152)}...`
    : description || `${title} — accredited training course at Technique Learning Solutions.`;

  return {
    title,
    description: metaDescription,
    alternates: { canonical: `https://www.learntechnique.com/courses/${slug}` },
    openGraph: {
      title: `${title} | Technique Learning Solutions`,
      description: metaDescription,
      url: `https://www.learntechnique.com/courses/${slug}`,
      type: "website",
    },
  };
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

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: rawCourse?.title ?? "Course",
    description:
      Array.isArray(rawCourse?.description) && rawCourse.description.length > 0
        ? typeof rawCourse.description[0] === "string"
          ? rawCourse.description[0]
          : rawCourse.description[0]?.children?.[0]?.text ?? ""
        : typeof rawCourse?.description === "string"
          ? rawCourse.description
          : "",
    provider: {
      "@type": "EducationalOrganization",
      name: "Technique Learning Solutions",
      url: "https://www.learntechnique.com",
    },
    url: `https://www.learntechnique.com/courses/${slug}`,
    ...(rawCourse?.duration && { timeRequired: rawCourse.duration }),
    ...(rawCourse?.price && {
      offers: {
        "@type": "Offer",
        price: rawCourse.price,
        priceCurrency: "GBP",
        availability: "https://schema.org/InStock",
      },
    }),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <AnimatedSection variant="fade-in" visibleOnLoad>
        <CourseHero data={heroData} />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <CourseDetails data={detailsData} />
      </AnimatedSection>
      {slug === AM2_COURSE_SLUG && (
        <AnimatedSection variant="fade-up">
          <Am2ResitSection />
        </AnimatedSection>
      )}
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
