import React from "react";
import CoursesPackage from "../sections/coursesPackage";
import Session from "../sections/session";
import Contact from "@/app/features/homepage/contact";
import { AnimatedSection } from "@/components/animated-section";
import HeroSection from "@/app/shared/heroBackground";
import { client } from "@/lib/sanity/client";
import { courseCardsQuery } from "@/lib/queries/courses";
import { headerQuery } from "@/lib/queries/navigation";
import { categoriseFromHeader } from "@/lib/course-categories";
import type { CourseCardData } from "@/lib/course-categories";
import type { HeaderData } from "@/types/header";

export default async function PLCCoursesPage() {
  const [allCourses, headerData] = await Promise.all([
    client.fetch<CourseCardData[]>(courseCardsQuery),
    client.fetch<HeaderData>(headerQuery),
  ]);
  const grouped = categoriseFromHeader(
    headerData.megaMenuColumns,
    allCourses,
    "plc",
  );

  return (
    <main>
      <AnimatedSection variant="fade-in" visibleOnLoad className="relative z-0">
        <HeroSection
          title="PLC Training Courses"
          description="Programmable Logic Controller training from beginner to advanced. City & Guilds and EAL accredited courses including SCADA, industrial networking, and manufacturer-specific training."
        />
      </AnimatedSection>
      <CoursesPackage category="plc" grouped={grouped} />
      <Session />
      <Contact />
    </main>
  );
}
