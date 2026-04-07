import React from "react";
import type { Metadata } from "next";
import AboutSection from "../features/contact/aboutSection";
import ContactForm from "../features/contact/contactForm";
import MapSection from "../features/contact/mapSection";
import NewsletterSection from "../features/contact/newsletterSection";
import { AnimatedSection } from "@/components/animated-section";
import HeroSection from "../shared/heroBackground";

export const metadata: Metadata = {
    title: "Contact Us",
    description:
        "Get in touch with Technique Learning Solutions. Visit our training centres in Chesterfield or Stirling, send us a message, or call 0800 112 3310 for course enquiries.",
    alternates: { canonical: "https://www.learntechnique.com/contact" },
    openGraph: {
        title: "Contact Us | Technique Learning Solutions",
        description:
            "Get in touch with our team. Visit our centres, call 0800 112 3310, or send us a message.",
        url: "https://www.learntechnique.com/contact",
    },
};

function ContactPage() {
    return (
        <main>
            <AnimatedSection variant="fade-in" visibleOnLoad>
                <HeroSection
                    title="Contact"
                    description="Get in touch with our team. We'd love to hear from you."
                />
            </AnimatedSection>
            <AnimatedSection variant="fade-up">
                <AboutSection />
            </AnimatedSection>
            <AnimatedSection variant="fade-up">
                <ContactForm />
            </AnimatedSection>
            <AnimatedSection variant="fade-up">
                <MapSection />
            </AnimatedSection>
            <AnimatedSection variant="scale">
                <NewsletterSection />
            </AnimatedSection>
        </main>
    );
}

export default ContactPage;
