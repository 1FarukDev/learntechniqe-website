import React from "react";
import type { Metadata } from "next";
import HeroSection from "../features/company/heroSection";
import LeadershipSection from "../features/company/teamSection";
import TutorsSection from "../features/company/tutorSection";
import StudentAccommodation from "../features/company/accomodationSection";
import FAQSection from "../features/company/faqSection";
import JoinOurTeam from "../features/company/joinTeamSection";
import Contact from "../features/homepage/contact";
import Location from "../features/homepage/location";
import { AnimatedSection } from "@/components/animated-section";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Discover Technique Learning Solutions — world-class electrical, HVAC, and PLC training centres in Chesterfield and Stirling. Meet our expert tutors, explore our facilities, and learn about student accommodation.",
  alternates: { canonical: "https://www.learntechnique.com/company" },
  openGraph: {
    title: "About Technique Learning Solutions",
    description:
      "World-class electrical and trade training centres with expert tutors and state-of-the-art facilities.",
    url: "https://www.learntechnique.com/company",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can I really become an electrician with no experience?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, absolutely. Most of our students start with zero electrical experience. Our courses are specifically designed for complete beginners with individual workstations, over 50% hands-on training, small class sizes (1-10 students), and experienced tutors with decades of real-world experience.",
      },
    },
    {
      "@type": "Question",
      name: "How do I pay for the course? Can I pay monthly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we offer flexible payment options including full payment upfront (often with early booking discounts), monthly payment plans to spread the cost, employer sponsorship, and finance options. Call us on 0800 112 3310 to discuss your situation.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if I fail the course or assessment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can retake assessments at a small cost set by awarding bodies, receive extra one-on-one trainer sessions, and work at your own pace. Our pass rate is 98% on first attempt, but we never give up on students who are committed to learning.",
      },
    },
    {
      "@type": "Question",
      name: "Will the course actually run? I've heard training companies cancel courses.",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We never cancel courses. Even if only one student books, the course runs. We have multiple training centres with dedicated facilities, full-time tutors on staff, and extensive equipment.",
      },
    },
    {
      "@type": "Question",
      name: "I'm 45 years old. Am I too old to retrain as an electrician?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not at all. The average age of our career-changing students is 38. We regularly train people in their 40s, 50s, and even 60s. Age is actually an advantage — life experience, motivation, and financial stability help career changers succeed.",
      },
    },
    {
      "@type": "Question",
      name: "How quickly can I start earning money after the course?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most students secure work during or within weeks of completing training. First year earnings range from £28k-£35k employed or £35k+ self-employed. Specialisations like PLC programming can earn £30k-£80k+.",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between your courses and a traditional apprenticeship?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our fast-track courses get you qualified in 10-20 days instead of 3-4 years. Both routes lead to the same qualifications and career opportunities. Fast-track is ideal for career changers who need to earn proper money quickly.",
      },
    },
  ],
};

function CompanyPage() {
  return (
    <main className="overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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
        <div id="location">
          <Location />
        </div>
      </AnimatedSection>
      <AnimatedSection variant="fade-in">
        <Contact />
      </AnimatedSection>
    </main>
  );
}

export default CompanyPage;
