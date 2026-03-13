import React from "react";
import CoursesPackage from "../sections/coursesPackage";
import Session from "../sections/session";
import Contact from "@/app/features/homepage/contact";
import { AnimatedSection } from "@/components/animated-section";
import HeroSection from "@/app/shared/heroBackground";

export default function AirconRefrigerationCoursesPage() {
  return (
    <main>
      <AnimatedSection variant="fade-in" visibleOnLoad>
        <HeroSection
          title="Air Conditioning & Refrigeration Courses"
          description="Comprehensive HVAC and refrigeration training from F-Gas certification to total air conditioning packages. Learn from industry experts with hands-on practical experience."
        />
      </AnimatedSection>
      <AnimatedSection variant="fade-up" className="-mt-10">
        <CoursesPackage category="aircon-refrigeration" />
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
