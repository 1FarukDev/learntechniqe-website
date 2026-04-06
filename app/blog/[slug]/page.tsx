// app/blog/[slug]/page.tsx
import BlogDetailPage from "@/app/features/blog/BlogDetails";
import HeroSection from "@/app/features/blog/hero";
import Contact from "@/app/features/homepage/contact";
import { AnimatedSection } from "@/components/animated-section";
import { client } from "@/lib/sanity/client";
import {
  BLOG_BY_SLUG_QUERY,
  RECENT_BLOGS_QUERY,
  RELATED_BLOGS_QUERY,
} from "@/lib/queries/blog";
import { BlogPost } from "@/lib/types/blog";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

async function page({ params }: Props) {
  const { slug } = await params;

  const post = await client.fetch<BlogPost>(BLOG_BY_SLUG_QUERY, {
    slug: slug,
  });

  if (!post) {
    return notFound();
  }

  if (!post.isPublished) {
    return notFound();
  }

  const [recentPosts, relatedPosts] = await Promise.all([
    client.fetch<{ _id: string; title: string; slug: { current: string } }[]>(
      RECENT_BLOGS_QUERY,
    ),
    client.fetch<BlogPost[]>(RELATED_BLOGS_QUERY, {
      category: post.category,
      currentId: post._id,
    }),
  ]);

  return (
    <>
      <AnimatedSection variant="fade-in" visibleOnLoad>
        <HeroSection title={post.heroTitle} image={post.heroImage} />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <BlogDetailPage
          post={post}
          recentPosts={recentPosts}
          relatedPosts={relatedPosts}
        />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <Contact />
      </AnimatedSection>
    </>
  );
}

export default page;
