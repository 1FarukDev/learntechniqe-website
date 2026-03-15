import PricingBanner from "@/app/features/courseDetails/Banner";
import BookCourse from "@/app/features/courseDetails/BookCourse";
import CourseDetails from "@/app/features/courseDetails/CourseDetails";
import CourseHero from "@/app/features/courseDetails/heroSection";
import Contact from "@/app/features/homepage/contact";
import Ratings from "@/app/features/homepage/ratings";
import { AnimatedSection } from "@/components/animated-section";
import { client } from "@/lib/sanity/client";
import { courseBySlugQuery } from "@/lib/queries/courses";
import { coursesQuery } from "@/lib/queries/courses";
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
  const course = await client.fetch(courseBySlugQuery, { slug });

  if (!course) return notFound();

  const courseName = course.title || "Course";
  const courseUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://learntechnique.com"}/courses/${slug}`;

  return (
    <main>
      <AnimatedSection variant="fade-in" visibleOnLoad>
        <CourseHero courseName={courseName} courseUrl={courseUrl} />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <CourseDetails
        />
      </AnimatedSection>
      <AnimatedSection variant="scale">
        <PricingBanner
        />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <BookCourse
        />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <Ratings />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <Session />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <Contact />
      </AnimatedSection>
    </main>
  );
}

export default CourseDetail;
