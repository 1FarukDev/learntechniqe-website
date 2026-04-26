import BlogDetailPage from "@/app/features/blog/BlogDetails";
import HeroSection from "@/app/features/blog/hero";
import Contact from "@/app/features/homepage/contact";
import { AnimatedSection } from "@/components/animated-section";
import { cmsFetch } from "@/lib/cms/fetch";
import {
  getLegacyWpBlogBySlug,
  isLegacyWordPressBlogsVisible,
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
import { cache } from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

/** One legacy fetch per request (metadata + page). No-op when legacy is disabled. */
const getLegacyPostForSlug = cache(async (slug: string) => {
  if (!isLegacyWordPressBlogsVisible()) return undefined;
  return getLegacyWpBlogBySlug(slug);
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await cmsFetch<BlogPost | null>(BLOG_BY_SLUG_QUERY, {
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

  const legacy = await getLegacyPostForSlug(slug);
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

  const post = await cmsFetch<BlogPost | null>(BLOG_BY_SLUG_QUERY, {
    slug,
  });

  if (post?.isPublished) {
    const [recentPosts, relatedPosts] = await Promise.all([
      cmsFetch<{ _id: string; title: string; slug: { current: string } }[]>(
        RECENT_BLOGS_QUERY,
      ),
      cmsFetch<BlogPost[]>(RELATED_BLOGS_QUERY, {
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

  const legacy = await getLegacyPostForSlug(slug);
  if (legacy) {
    const { default: LegacyWpBlogDetail } = await import(
      "@/app/features/blog/LegacyWpBlogDetail"
    );
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
