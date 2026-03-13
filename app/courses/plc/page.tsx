import React from "react";
import CoursesPackage from "../sections/coursesPackage";
import Session from "../sections/session";
import Contact from "@/app/features/homepage/contact";
import { AnimatedSection } from "@/components/animated-section";
import HeroSection from "@/app/shared/heroBackground";

export default function PLCCoursesPage() {
  return (
    <main>
      <AnimatedSection variant="fade-in" visibleOnLoad>
        <HeroSection
          title="PLC Training Courses"
          description="Programmable Logic Controller training from beginner to advanced. City & Guilds and EAL accredited courses including SCADA, industrial networking, and manufacturer-specific training."
        />
      </AnimatedSection>
      <AnimatedSection variant="fade-up" className="-mt-10">
        <CoursesPackage category="plc" />
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
