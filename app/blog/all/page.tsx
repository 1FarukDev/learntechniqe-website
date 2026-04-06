import React from "react";
import PostOfTheDay from "@/app/features/blog/PostOfTheDay";
import Contact from "@/app/features/homepage/contact";
import { AnimatedSection } from "@/components/animated-section";
import HeroSection from "@/app/shared/heroBackground";


function page() {
  return (
    <div>
      <AnimatedSection variant="fade-in" visibleOnLoad>
        <HeroSection title="Blogs" />
      </AnimatedSection>
      <AnimatedSection variant="fade-up" className="-mt-10">
        <PostOfTheDay />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <Contact />
      </AnimatedSection>
    </div>
  );
}

export default page;
