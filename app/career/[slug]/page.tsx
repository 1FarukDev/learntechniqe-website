import type { Metadata } from "next";
import JobDetail from "@/app/features/career/jobdetails";
import Brochure from "@/app/features/homepage/brochure";
import Contact from "@/app/features/homepage/contact";
import HeroSection from "@/app/shared/heroBackground";
import { AnimatedSection } from "@/components/animated-section";
import React from "react";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the Technique Learning Solutions team. View current job openings and career opportunities in electrical and trade training.",
  alternates: { canonical: "https://www.learntechnique.com/career" },
};

function CareerPage() {
  return (
    <main>
      <AnimatedSection variant="fade-in" visibleOnLoad>
        <HeroSection
          title="Careers"
          // description="Get in touch with our team. We'd love to hear from you."
        />
      </AnimatedSection>
      <JobDetail />
      <Contact />
      <Brochure />
    </main>
  );
}

export default CareerPage;
