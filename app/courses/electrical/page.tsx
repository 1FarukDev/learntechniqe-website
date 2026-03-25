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

export default async function ElectricalCoursesPage() {
  const [allCourses, headerData] = await Promise.all([
    client.fetch<CourseCardData[]>(courseCardsQuery),
    client.fetch<HeaderData>(headerQuery),
  ]);
  const grouped = categoriseFromHeader(
    headerData.megaMenuColumns,
    allCourses,
    "electrical",
  );

  return (
    <main>
      <AnimatedSection variant="fade-in" visibleOnLoad className="relative z-0">
        <HeroSection
          title="Electrical Courses"
          description="Carefully put-together data-backed courses taught by seasoned experts. Our processes and facilities are word-class with multiple credible accreditations."
        />
      </AnimatedSection>
      <CoursesPackage category="electrical" grouped={grouped} />
      <Session />
      <AnimatedSection variant="fade-up">
        <Contact />
      </AnimatedSection>
    </main>
  );
}
