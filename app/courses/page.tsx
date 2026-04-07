import React, { Suspense } from "react";
import type { Metadata } from "next";
import { AnimatedSection } from "@/components/animated-section";
import HeroSection from "../shared/heroBackground";
import Session from "./sections/session";
import Contact from "../features/homepage/contact";
import { client } from "@/lib/sanity/client";
import { courseCardsQuery } from "@/lib/queries/courses";
import { headerQuery } from "@/lib/queries/navigation";
import { categoriseFromHeader } from "@/lib/course-categories";
import type { CourseCardData } from "@/lib/course-categories";
import type { HeaderData } from "@/types/header";
import CoursesPackage from "./sections/coursesPackage";

export const metadata: Metadata = {
  title: "All Courses",
  description:
    "Browse our full range of accredited electrical, HVAC, and PLC courses. From beginner packages to specialist qualifications — City & Guilds and EAL accredited training at world-class facilities.",
  alternates: { canonical: "https://www.learntechnique.com/courses" },
  openGraph: {
    title: "All Courses | Technique Learning Solutions",
    description:
      "Browse accredited electrical, HVAC, and PLC courses. Beginner to specialist qualifications.",
    url: "https://www.learntechnique.com/courses",
  },
};

export default async function CoursesPage() {
  const [allCourses, headerData] = await Promise.all([
    client.fetch<CourseCardData[]>(courseCardsQuery),
    client.fetch<HeaderData>(headerQuery),
  ]);

  const allGrouped: { value: string; label: string; courses: CourseCardData[]; courseType: string }[] = [];
  const courseTypes: { label: string; value: string }[] = [];

  for (const col of headerData.megaMenuColumns) {
    const category = col.title.toLowerCase().includes("plc")
      ? "plc"
      : col.title.toLowerCase().includes("air con") || col.title.toLowerCase().includes("refrigeration")
        ? "aircon-refrigeration"
        : "electrical";

    const groups = categoriseFromHeader(headerData.megaMenuColumns, allCourses, category);
    for (const g of groups) {
      allGrouped.push({ ...g, value: `${category}--${g.value}`, courseType: col.title });
    }
    courseTypes.push({ label: col.title, value: col.title });
  }

  return (
    <main>
      <AnimatedSection variant="fade-in" visibleOnLoad className="relative z-0">
        <HeroSection
          title="All Courses"
          description="Browse our full range of accredited electrical, HVAC, and PLC courses — from beginner packages to specialist qualifications."
        />
      </AnimatedSection>

      <Suspense>
        <CoursesPackage
          category="all"
          grouped={allGrouped}
          courseTypes={courseTypes}
        />
      </Suspense>


      <Session />

      <AnimatedSection variant="fade-up">
        <Contact />
      </AnimatedSection>
    </main>
  );
}
