import React from "react";
import CoursesPackage from "../sections/coursesPackage";
import Session from "../sections/session";
import Contact from "@/app/features/homepage/contact";
import { AnimatedSection } from "@/components/animated-section";
import HeroSection from "@/app/shared/heroBackground";

export default function ElectricalCoursesPage() {
  return (
    <main>
      <AnimatedSection variant="fade-in" visibleOnLoad>
        <HeroSection
          title="Electrical Courses"
          description="Carefully put-together data-backed courses taught by seasoned experts. Our processes and facilities are word-class with multiple credible accreditations."
        />
      </AnimatedSection>
      <AnimatedSection variant="fade-up" className="-mt-10">
        <CoursesPackage category="electrical" />
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
