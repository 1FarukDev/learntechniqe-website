import React from "react";
import HeroSection from "./sections/heroSection";
import CoursesPackage from "./sections/coursesPackage";
import Session from "./sections/session";
import Contact from "../features/homepage/contact";
import { AnimatedSection } from "@/components/animated-section";

function page() {
  return (
    <main>
      <AnimatedSection variant="fade-in" visibleOnLoad>
        <HeroSection />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <CoursesPackage />
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

export default page;
