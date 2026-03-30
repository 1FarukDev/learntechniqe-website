import Hero from "./features/homepage/hero";
import Stages from "./features/homepage/stages";
import TradeCourses from "./features/homepage/tradeCourses";
import Courses from "./features/homepage/courses";
import Location from "./features/homepage/location";
import Brochure from "./features/homepage/brochure";
import Ratings from "./features/homepage/ratings";
import Certification from "./features/homepage/certification";
import CampaignBanner from "./features/homepage/campaignBanner";
import Contact from "./features/homepage/contact";
import { AnimatedSection } from "@/components/animated-section";
import { client } from "@/lib/sanity/client";
import { courseCardsQuery } from "@/lib/queries/courses";
import type { CourseCardData } from "@/lib/course-categories";
import { pickPopularCourses } from "@/lib/constants/popular-courses";

export default async function Home() {
  const allCourses = await client.fetch<CourseCardData[]>(courseCardsQuery);
  const popularCourses = pickPopularCourses(allCourses);
  return (
    <div className="overflow-hidden ">
      <AnimatedSection variant="fade-in" visibleOnLoad>
        <Hero courses={allCourses} />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <Stages />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <TradeCourses />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <Courses courses={popularCourses} />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <Location />
      </AnimatedSection>
      <AnimatedSection variant="scale">
        <Brochure />
      <AnimatedSection variant="fade-left">
        <Certification />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <CampaignBanner />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <Contact />
      </AnimatedSection>   </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <Ratings />
      </AnimatedSection>
   
    </div>
  );
}
