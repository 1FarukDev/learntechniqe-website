import React from "react";
import HeroSection from "../features/blog/hero";
import PostOfTheDay from "../features/blog/PostOfTheDay";
import Contact from "../features/homepage/contact";
import { AnimatedSection } from "@/components/animated-section";

function page() {
  return (
    <div>
      <AnimatedSection variant="fade-in" visibleOnLoad>
        <HeroSection />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <PostOfTheDay />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <Contact />
      </AnimatedSection>
    </div>
  );
}

export default page;
