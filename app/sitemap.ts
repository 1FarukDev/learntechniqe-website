import type { MetadataRoute } from "next";
import { client } from "@/lib/sanity/client";
import {
  getLegacyWpBlogs,
  isLegacyWordPressBlogsVisible,
} from "@/lib/legacy-wp-blogs";
import { BLOG_SLUGS_FOR_SITEMAP_QUERY } from "@/lib/queries/blog";
import { coursesQuery } from "@/lib/queries/courses";
import { PATHWAYS_QUERY } from "@/lib/queries/pathway";

const BASE_URL = "https://www.learntechnique.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [courses, pathways, blogRows] = await Promise.all([
    client.fetch<{ slug: string }[]>(coursesQuery).catch(() => []),
    client.fetch<{ slug: string }[]>(PATHWAYS_QUERY).catch(() => []),
    client.fetch<{ slug: string | null }[]>(BLOG_SLUGS_FOR_SITEMAP_QUERY).catch(() => []),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/courses`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/courses/electrical`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }, 
    {
      url: `${BASE_URL}/courses/plc`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/courses/aircon-refrigeration`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/pathways`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/company`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/blog/all`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const coursePages: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${BASE_URL}/courses/${course.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly", 
    priority: 0.8,
  }));

  const pathwayPages: MetadataRoute.Sitemap = pathways.map((pathway) => ({
    url: `${BASE_URL}/pathways/${pathway.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const sanityBlogSlugs = new Set<string>();
  const blogPages: MetadataRoute.Sitemap = blogRows
    .map((row) => row.slug?.trim())
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => {
      sanityBlogSlugs.add(slug.toLowerCase());
      return {
        url: `${BASE_URL}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.55,
      };
    });

  const legacyRows = isLegacyWordPressBlogsVisible()
    ? await getLegacyWpBlogs()
    : [];
  const legacyBlogPages: MetadataRoute.Sitemap = legacyRows
    .filter((p) => !sanityBlogSlugs.has(p.slug.toLowerCase()))
    .map((p) => ({
      url: `${BASE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.date.replace(" ", "T")),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }));

  return [
    ...staticPages,
    ...coursePages,
    ...pathwayPages,
    ...blogPages,
    ...legacyBlogPages,
  ];
}
