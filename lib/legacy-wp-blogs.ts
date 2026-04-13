import type { BlogPost } from "@/lib/types/blog";
import { extractFirstImageUrlFromHtml } from "@/lib/legacy-wp-extract-image";

export interface LegacyWpBlogRecord {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  html: string;
}

let legacyCache: LegacyWpBlogRecord[] | null = null;
let legacyLoadPromise: Promise<LegacyWpBlogRecord[]> | null = null;

/**
 * When `false`, legacy WordPress data is never imported, listed, routed, or sitemapped.
 * Sanity is unaffected. Server-only env (no `NEXT_PUBLIC_` prefix).
 */
export function isLegacyWordPressBlogsVisible(): boolean {
  return process.env.LEGACY_WORDPRESS_BLOGS_VISIBLE !== "false";
}

async function loadLegacyRecords(): Promise<LegacyWpBlogRecord[]> {
  if (!isLegacyWordPressBlogsVisible()) {
    return [];
  }
  if (legacyCache) {
    return legacyCache;
  }
  if (!legacyLoadPromise) {
    legacyLoadPromise = import("./data/legacy-wordpress-blogs.json").then(
      (mod) => {
        const rows = mod.default as LegacyWpBlogRecord[];
        legacyCache = rows;
        return rows;
      },
    );
  }
  return legacyLoadPromise;
}

export async function getLegacyWpBlogs(): Promise<LegacyWpBlogRecord[]> {
  return loadLegacyRecords();
}

export async function getLegacyWpBlogBySlug(
  slug: string,
): Promise<LegacyWpBlogRecord | undefined> {
  if (!isLegacyWordPressBlogsVisible()) return undefined;
  const all = await loadLegacyRecords();
  return all.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
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

  const legacyCardImageUrl =
    extractFirstImageUrlFromHtml(record.html) ?? undefined;

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
    legacyCardImageUrl,
  };
}
