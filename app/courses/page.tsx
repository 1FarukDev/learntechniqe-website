import React from "react";

import CoursesPackage from "./sections/coursesPackage";
import Session from "./sections/session";
import Contact from "../features/homepage/contact";
import { AnimatedSection } from "@/components/animated-section";
import HeroSection from "../shared/heroBackground";

function page() {
  return (
    <main>
      <AnimatedSection variant="fade-in" visibleOnLoad>
        <HeroSection
          title="Electrical Courses"
          description="Carefully put-together data-backed courses taught by seasoned experts. 
Our processes and facilities are word-class with multiple credible accreditations."
        />
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
