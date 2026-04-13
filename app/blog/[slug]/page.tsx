import BlogDetailPage from "@/app/features/blog/BlogDetails";
import HeroSection from "@/app/features/blog/hero";
import LegacyWpBlogDetail from "@/app/features/blog/LegacyWpBlogDetail";
import Contact from "@/app/features/homepage/contact";
import { AnimatedSection } from "@/components/animated-section";
import { client } from "@/lib/sanity/client";
import {
  getLegacyWpBlogBySlug,
  normalizeLegacyBlogCategory,
} from "@/lib/legacy-wp-blogs";
import {
  BLOG_BY_SLUG_QUERY,
  RECENT_BLOGS_QUERY,
  RELATED_BLOGS_QUERY,
} from "@/lib/queries/blog";
import { BlogPost } from "@/lib/types/blog";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<BlogPost | null>(BLOG_BY_SLUG_QUERY, {
    slug,
  });

  if (post?.isPublished) {
    return {
      title: post.heroTitle || post.title,
      description: `${post.category} — ${post.title}`,
      alternates: {
        canonical: `https://www.learntechnique.com/blog/${post.slug.current}`,
      },
    };
  }

  const legacy = getLegacyWpBlogBySlug(slug);
  if (legacy) {
    return {
      title: legacy.title,
      description: `${normalizeLegacyBlogCategory(legacy.category)} — ${legacy.title}`,
      alternates: {
        canonical: `https://www.learntechnique.com/blog/${legacy.slug}`,
      },
    };
  }

  return {
    title: "Blog Post",
    description:
      "Expert insights on electrical training, HVAC careers, and the trade industry from Technique Learning Solutions.",
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const post = await client.fetch<BlogPost | null>(BLOG_BY_SLUG_QUERY, {
    slug,
  });

  if (post?.isPublished) {
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
      <main>
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
      </main>
    );
  }

  const legacy = getLegacyWpBlogBySlug(slug);
  if (legacy) {
    return (
      <main>
        <AnimatedSection variant="fade-in" visibleOnLoad>
          <HeroSection title={legacy.title} />
        </AnimatedSection>
        <AnimatedSection variant="fade-up">
          <LegacyWpBlogDetail post={legacy} />
        </AnimatedSection>
        <AnimatedSection variant="fade-up">
          <Contact />
        </AnimatedSection>
      </main>
    );
  }

  return notFound();
}
