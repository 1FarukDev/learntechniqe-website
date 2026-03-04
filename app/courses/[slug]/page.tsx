import PricingBanner from "@/app/features/courseDetails/Banner";
import BookCourse from "@/app/features/courseDetails/BookCourse";
import CourseDetails from "@/app/features/courseDetails/CourseDetails";
import CourseHero from "@/app/features/courseDetails/heroSection";
import Contact from "@/app/features/homepage/contact";
import Ratings from "@/app/features/homepage/ratings";
import { AnimatedSection } from "@/components/animated-section";
import React from "react";
import Session from "../sections/session";

function CourseDetail() {
  return (
    <main>
      <AnimatedSection variant="fade-in" visibleOnLoad>
        <CourseHero />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <CourseDetails />
      </AnimatedSection>
      <AnimatedSection variant="scale">
        <PricingBanner />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <BookCourse />
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
