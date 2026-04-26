import { redirect } from "next/navigation";
import { cmsFetch } from "@/lib/cms/fetch";
import {
  getLegacyWpBlogBySlug,
  getLegacyWpBlogs,
  isLegacyWordPressBlogsVisible,
  legacyWpRecordToBlogPost,
  normalizeLegacyBlogCategory,
} from "@/lib/legacy-wp-blogs";
import {
  BLOG_CARDS_BY_SLUGS_QUERY,
  SANITY_BLOG_INDEX_QUERY,
} from "@/lib/queries/blog";
import type { BlogPost } from "@/lib/types/blog";

export const BLOG_LIST_PAGE_SIZE = 12;

export const BLOG_LIST_CATEGORY_FILTERS = [
  "All Categories",
  "Air Conditioning",
  "Refrigeration",
  "Electrical",
  "Industry News",
  "PLC",
  "Uncategorized",
] as const;

type SanityIndexRow = {
  slug: string;
  date: string;
  category: string;
  highlighted?: boolean;
};

type MergedRow =
  | {
      kind: "sanity";
      slug: string;
      date: string;
      category: string;
      highlighted: boolean;
    }
  | {
      kind: "legacy";
      slug: string;
      date: string;
      category: string;
      highlighted: boolean;
    };

function parsePage(raw: string | string[] | undefined): number {
  const s = Array.isArray(raw) ? raw[0] : raw;
  const n = parseInt(s ?? "1", 10);
  return Number.isFinite(n) && n >= 1 ? n : 1;
}

function normalizeCategoryParam(
  raw: string | string[] | undefined,
): string | null {
  const s = (Array.isArray(raw) ? raw[0] : raw)?.trim();
  if (!s) return null;
  if (s === "All Categories" || s === "All") return null;
  const allowed = BLOG_LIST_CATEGORY_FILTERS.filter(
    (c) => c !== "All Categories",
  ) as unknown as string[];
  return allowed.includes(s) ? s : null;
}

export function buildBlogListUrl(
  basePath: string,
  page: number,
  category: string | null,
): string {
  const params = new URLSearchParams();
  if (page > 1) params.set("page", String(page));
  if (category) params.set("category", category);
  const q = params.toString();
  return q ? `${basePath}?${q}` : basePath;
}

export async function getPaginatedBlogListing(input: {
  searchParams: Record<string, string | string[] | undefined>;
  basePath: string;
}): Promise<{
  posts: BlogPost[];
  page: number;
  totalPages: number;
  total: number;
  category: string | null;
  basePath: string;
}> {
  const pageSize = BLOG_LIST_PAGE_SIZE;
  let page = parsePage(input.searchParams.page);
  const category = normalizeCategoryParam(input.searchParams.category);

  const indexRows = await cmsFetch<SanityIndexRow[]>(
    SANITY_BLOG_INDEX_QUERY,
  );

  const sanitySlugLower = new Set(
    indexRows.map((r) => r.slug.toLowerCase()).filter(Boolean),
  );

  const sanityMerged: MergedRow[] = indexRows
    .filter((r) => r.slug?.trim())
    .map((r) => ({
      kind: "sanity" as const,
      slug: r.slug,
      date: r.date,
      category: r.category,
      highlighted: Boolean(r.highlighted),
    }))
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

  const legacyMerged: MergedRow[] = [];
  if (isLegacyWordPressBlogsVisible()) {
    const legacyList = await getLegacyWpBlogs();
    for (const rec of legacyList) {
      if (sanitySlugLower.has(rec.slug.toLowerCase())) continue;
      const dateIso = rec.date
        ? new Date(rec.date.replace(" ", "T")).toISOString()
        : new Date(0).toISOString();
      legacyMerged.push({
        kind: "legacy",
        slug: rec.slug,
        date: dateIso,
        category: normalizeLegacyBlogCategory(rec.category),
        highlighted: false,
      });
    }
    legacyMerged.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }

  const merged = [...sanityMerged, ...legacyMerged];

  const filtered = category
    ? merged.filter((r) => r.category === category)
    : merged;

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize) || 1);

  if (total > 0 && page > totalPages) {
    redirect(buildBlogListUrl(input.basePath, totalPages, category));
  }

  const slice = filtered.slice((page - 1) * pageSize, page * pageSize);

  const sanitySlugsOnPage = [
    ...new Set(
      slice.filter((r): r is MergedRow & { kind: "sanity" } => r.kind === "sanity").map((r) => r.slug),
    ),
  ];

  const sanityPosts =
    sanitySlugsOnPage.length > 0
      ? await cmsFetch<BlogPost[]>(BLOG_CARDS_BY_SLUGS_QUERY, {
          slugs: sanitySlugsOnPage,
        })
      : [];

  const sanityBySlug = new Map(
    sanityPosts.map((p) => [p.slug.current.toLowerCase(), p]),
  );

  const posts: BlogPost[] = await Promise.all(
    slice.map(async (row) => {
      if (row.kind === "sanity") {
        const p = sanityBySlug.get(row.slug.toLowerCase());
        if (!p) {
          throw new Error(`Missing Sanity blog for slug: ${row.slug}`);
        }
        return p;
      }
      const rec = await getLegacyWpBlogBySlug(row.slug);
      if (!rec) {
        throw new Error(`Missing legacy blog for slug: ${row.slug}`);
      }
      return legacyWpRecordToBlogPost(rec);
    }),
  );

  return {
    posts,
    page,
    totalPages,
    total,
    category,
    basePath: input.basePath,
  };
}
