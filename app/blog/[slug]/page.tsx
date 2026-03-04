import BlogDetailPage from "@/app/features/blog/BlogDetails";
import HeroSection from "@/app/features/blog/hero";
import Contact from "@/app/features/homepage/contact";
import { AnimatedSection } from "@/components/animated-section";
import React from "react";

function page() {
  return (
    <>
      <AnimatedSection variant="fade-in" visibleOnLoad>
        <HeroSection />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <BlogDetailPage />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <Contact />
      </AnimatedSection>
    </>
  );
}

export default page;
