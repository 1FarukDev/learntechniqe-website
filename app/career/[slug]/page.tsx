import JobDetail from "@/app/features/career/jobdetails";
import Brochure from "@/app/features/homepage/brochure";
import Contact from "@/app/features/homepage/contact";
import HeroSection from "@/app/shared/heroBackground";
import { AnimatedSection } from "@/components/animated-section";
import React from "react";

function page() {
  return (
    <section>
      <AnimatedSection variant="fade-in" visibleOnLoad>
        <HeroSection
          title="Careers"
          // description="Get in touch with our team. We'd love to hear from you."
        />
      </AnimatedSection>
      <JobDetail />
      <Contact />
      <Brochure />
    </section>
  );
}

export default page;
