import BlogListing from "@/app/features/blog/BlogListing";
import type { Metadata } from "next";
import Contact from "@/app/features/homepage/contact";
import HeroSection from "@/app/shared/heroBackground";
import { AnimatedSection } from "@/components/animated-section";
import { getPaginatedBlogListing } from "@/lib/blog-listing";
import React from "react";

const BASE = "/blog/all";

type Search = { page?: string; category?: string };

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Search>;
}): Promise<Metadata> {
  const sp = await searchParams;
  const params = new URLSearchParams();
  const page = parseInt(sp.page ?? "1", 10);
  if (Number.isFinite(page) && page > 1) params.set("page", String(page));
  if (sp.category?.trim()) params.set("category", sp.category.trim());
  const q = params.toString();
  const canonical = `https://www.learntechnique.com${BASE}${q ? `?${q}` : ""}`;

  return {
    title: "All Blog Posts",
    description:
      "Browse all articles from Technique Learning Solutions covering electrical training, HVAC careers, PLC programming, industry news, and career guidance.",
    alternates: { canonical },
  };
}

export default async function AllBlogsPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const sp = await searchParams;
  const listing = await getPaginatedBlogListing({
    searchParams: sp,
    basePath: BASE,
  });

  return (
    <main>
      <AnimatedSection variant="fade-in" visibleOnLoad>
        <HeroSection title="Complete Guide to Air Conditioning Training: Start Your HVAC Career in 2026" />
      </AnimatedSection>
      <AnimatedSection variant="fade-up" className="-mt-10">
        <BlogListing
          posts={listing.posts}
          basePath={listing.basePath}
          page={listing.page}
          totalPages={listing.totalPages}
          total={listing.total}
          category={listing.category}
        />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <Contact />
      </AnimatedSection>
    </main>
  );
}
