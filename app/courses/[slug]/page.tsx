import PricingBanner from "@/app/features/courseDetails/Banner";
import BookCourse from "@/app/features/courseDetails/BookCourse";
import CourseDetails from "@/app/features/courseDetails/CourseDetails";
import CourseHero from "@/app/features/courseDetails/heroSection";
import Contact from "@/app/features/homepage/contact";
import Ratings from "@/app/features/homepage/ratings";
import React from "react";
import Session from "../sections/session";

function CourseDetail() {
  return (
    <main>
      <CourseHero />
      <CourseDetails />
      <PricingBanner />
      <BookCourse />
      <Ratings />
      <Session />
      <Contact />
    </main>
  );
}

export default CourseDetail;
