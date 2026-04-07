import React, { Suspense } from "react";
import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "PLC Training Courses",
  description:
    "Programmable Logic Controller training from beginner to advanced. City & Guilds and EAL accredited courses including SCADA, industrial networking, and manufacturer-specific PLC training.",
  alternates: { canonical: "https://www.learntechnique.com/courses/plc" },
  openGraph: {
    title: "PLC Training Courses | Technique Learning Solutions",
    description:
      "City & Guilds and EAL accredited PLC training from beginner to advanced levels.",
    url: "https://www.learntechnique.com/courses/plc",
  },
};

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
      <Suspense>
        <CoursesPackage category="plc" grouped={grouped} />
      </Suspense>
      <Session />
      <Contact />
    </main>
  );
}
