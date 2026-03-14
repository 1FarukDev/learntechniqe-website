import React from "react";
import HeroSection from "../features/company/heroSection";
import LeadershipSection from "../features/company/teamSection";
import TutorsSection from "../features/company/tutorSection";
import StudentAccommodation from "../features/company/accomodationSection";
import FAQSection from "../features/company/faqSection";
import JoinOurTeam from "../features/company/joinTeamSection";
import Contact from "../features/homepage/contact";
import Location from "../features/homepage/location";
import { AnimatedSection } from "@/components/animated-section";

function page() {
  return (
    <div className="overflow-x-hidden">
      <AnimatedSection variant="fade-in" visibleOnLoad>
        <HeroSection />
      </AnimatedSection>
      <AnimatedSection variant="fade-in">
        <LeadershipSection />
      </AnimatedSection>
      <AnimatedSection variant="fade-in">
        <TutorsSection />
      </AnimatedSection>
      <AnimatedSection variant="fade-in">
        <StudentAccommodation />
      </AnimatedSection>
      <AnimatedSection variant="fade-in">
        <FAQSection />
      </AnimatedSection>
      {/* <AnimatedSection variant="fade-in">
        <JoinOurTeam />
      </AnimatedSection> */}
      <AnimatedSection variant="fade-in">
        <Location />
      </AnimatedSection>
      <AnimatedSection variant="fade-in">
        <Contact />
      </AnimatedSection>
    </div>
  );
}

export default page;
