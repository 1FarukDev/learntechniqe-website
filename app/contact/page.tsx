import React from "react";
import AboutSection from "../features/contact/aboutSection";
import ContactForm from "../features/contact/contactForm";
import MapSection from "../features/contact/mapSection";
import NewsletterSection from "../features/contact/newsletterSection";
import { AnimatedSection } from "@/components/animated-section";
import HeroSection from "../shared/heroBackground";

export const metadata = {
    title: "Contact Us | Technique Learning Solutions",
    description:
        "Get in touch with Technique Learning Solutions. Visit our head office, send us a message, or subscribe to our newsletter for the latest course updates.",
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
