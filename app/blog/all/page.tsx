import AllBlogPosts from "@/app/features/blog/all/blogList";
import type { Metadata } from "next";
import Contact from "@/app/features/homepage/contact";
import HeroSection from "@/app/shared/heroBackground";
import { AnimatedSection } from "@/components/animated-section";
import { client } from "@/lib/sanity/client";
import { ALL_BLOGS_QUERY } from "@/lib/queries/blog";
import { BlogPost } from "@/lib/types/blog";
import React from "react";

export const metadata: Metadata = {
  title: "All Blog Posts",
  description:
    "Browse all articles from Technique Learning Solutions covering electrical training, HVAC careers, PLC programming, industry news, and career guidance.",
  alternates: { canonical: "https://www.learntechnique.com/blog/all" },
};

export default async function AllBlogsPage() {
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
