import type { BlogPost } from "@/lib/types/blog";
import legacyWordpressBlogs from "./data/legacy-wordpress-blogs.json";

export type LegacyWpBlogRecord = (typeof legacyWordpressBlogs)[number];

const legacyList = legacyWordpressBlogs as LegacyWpBlogRecord[];

/**
 * When `false`, legacy WordPress posts are not listed, not routable at `/blog/[slug]`,
 * and not added to the sitemap. Sanity posts are unaffected.
 * Server-only (no `NEXT_PUBLIC_` prefix).
 */
export function isLegacyWordPressBlogsVisible(): boolean {
  return process.env.LEGACY_WORDPRESS_BLOGS_VISIBLE !== "false";
}

export function getLegacyWpBlogs(): LegacyWpBlogRecord[] {
  return isLegacyWordPressBlogsVisible() ? legacyList : [];
}

export function getLegacyWpBlogBySlug(slug: string): LegacyWpBlogRecord | undefined {
  if (!isLegacyWordPressBlogsVisible()) return undefined;
  return legacyList.find((p) => p.slug === slug);
}

export function getLegacyWpSlugSet(): Set<string> {
  return new Set(legacyList.map((p) => p.slug));
}

/** Map WordPress category labels to the blog filter chips on /blog. */
export function normalizeLegacyBlogCategory(wpCategory: string): string {
  const t = wpCategory.toLowerCase();
  if (t.includes("plc")) return "PLC";
  if (t.includes("electrical")) return "Electrical";
  if (t.includes("air conditioning")) return "Air Conditioning";
  if (t.includes("refrigeration")) return "Refrigeration";
  if (
    t.includes("industry") ||
    t.includes("company news") ||
    t === "news" ||
    t.includes("blog") ||
    t.includes("case stud")
  ) {
    return "Industry News";
  }
  return "Uncategorized";
}

export function legacyWpRecordToBlogPost(record: LegacyWpBlogRecord): BlogPost {
  const dateIso = record.date
    ? new Date(record.date.replace(" ", "T")).toISOString()
    : new Date().toISOString();

  return {
    _id: `legacy-wp-${record.slug}`,
    title: record.title,
    slug: { current: record.slug },
    author: record.author || "Technique Learning Solutions",
    date: dateIso,
    category: normalizeLegacyBlogCategory(record.category),
    heroImage: {
      asset: { _ref: "legacy-wp-placeholder", _type: "reference" },
      alt: record.title,
    },
    heroTitle: record.title,
    coverImage: {
      asset: { _ref: "legacy-wp-placeholder", _type: "reference" },
      alt: record.title,
    },
    body: [],
    highlighted: false,
    isPublished: true,
  };
}

export function mergeSanityAndLegacyBlogs(sanityPosts: BlogPost[]): BlogPost[] {
  if (!isLegacyWordPressBlogsVisible()) {
    return sanityPosts;
  }
  const sanitySlugs = new Set(
    sanityPosts.map((p) => p.slug.current.toLowerCase()),
  );
  const legacyAdapted = legacyList
    .filter((l) => !sanitySlugs.has(l.slug.toLowerCase()))
    .map(legacyWpRecordToBlogPost);

  return [...sanityPosts, ...legacyAdapted].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
