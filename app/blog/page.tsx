import AllBlogPosts from "@/app/features/blog/all/blogList";
import Contact from "@/app/features/homepage/contact";
import HeroSection from "@/app/shared/heroBackground";
import { AnimatedSection } from "@/components/animated-section";
import { client } from "@/lib/sanity/client";
import { ALL_BLOGS_QUERY } from "@/lib/queries/blog";
import { BlogPost } from "@/lib/types/blog";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Expert insights on electrical training, HVAC careers, PLC programming, and the trade industry. Guides, tips, and news from Technique Learning Solutions.",
  alternates: { canonical: "https://www.learntechnique.com/blog" },
  openGraph: {
    title: "Blog | Technique Learning Solutions",
    description:
      "Expert insights on electrical training, HVAC careers, and the trade industry.",
    url: "https://www.learntechnique.com/blog",
  },
};

export default async function BlogPage() {
  const posts = await client.fetch<BlogPost[]>(ALL_BLOGS_QUERY);

  return (
    <main>
      <AnimatedSection variant="fade-in" visibleOnLoad>
        <HeroSection title="Complete Guide to Air Conditioning Training: Start Your HVAC Career in 2026" />
      </AnimatedSection>
      <AnimatedSection variant="fade-up" className="-mt-10">
        <AllBlogPosts posts={posts} />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <Contact />
      </AnimatedSection>
    </main>
  );
}
