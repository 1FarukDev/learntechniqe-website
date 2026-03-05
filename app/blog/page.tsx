import React from "react";
import PostOfTheDay from "../features/blog/PostOfTheDay";
import Contact from "../features/homepage/contact";
import { AnimatedSection } from "@/components/animated-section";
import HeroSection from "../shared/heroBackground";

function page() {
  return (
    <div>
      <AnimatedSection variant="fade-in" visibleOnLoad>
        <HeroSection title="Complete Guide to Air Conditioning Training: Start Your HVAC Career in 2026" />
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
