import Hero from "./features/homepage/hero";
import Stages from "./features/homepage/stages";
import TradeCourses from "./features/homepage/tradeCourses";
import Courses from "./features/homepage/courses";
import Location from "./features/homepage/location";
import Brochure from "./features/homepage/brochure";
import Ratings from "./features/homepage/ratings";
import Certification from "./features/homepage/certification";
import Discount from "./features/homepage/discount";
import Contact from "./features/homepage/contact";
import { AnimatedSection } from "@/components/animated-section";

export default function Home() {
  return (
    <div className="overflow-hidden px-5">
      <AnimatedSection variant="fade-in" visibleOnLoad>
        <Hero />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <Stages />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <TradeCourses />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <Courses />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <Location />
      </AnimatedSection>
      <AnimatedSection variant="scale">
        <Brochure />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <Ratings />
      </AnimatedSection>
      <AnimatedSection variant="fade-left">
        <Certification />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <Discount />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <Contact />
      </AnimatedSection>
    </div>
  );
}
