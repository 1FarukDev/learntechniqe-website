import Link from "next/link";
import BlogCard from "@/components/blog-card";
import {
  BLOG_LIST_CATEGORY_FILTERS,
  BLOG_LIST_PAGE_SIZE,
  buildBlogListUrl,
} from "@/lib/blog-listing";
import { urlFor } from "@/lib/sanity/image";
import type { BlogPost } from "@/lib/types/blog";

type Props = {
  posts: BlogPost[];
  basePath: string;
  page: number;
  totalPages: number;
  total: number;
  category: string | null;
};

export default function BlogListing({
  posts,
  basePath,
  page,
  totalPages,
  total,
  category,
}: Props) {
  const start = total === 0 ? 0 : (page - 1) * BLOG_LIST_PAGE_SIZE + 1;
  const end =
    total === 0
      ? 0
      : Math.min(total, (page - 1) * BLOG_LIST_PAGE_SIZE + posts.length);

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-16 sm:pb-20 md:pb-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-black">
              All Blog Posts
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              {total === 0
                ? "No posts match this filter."
                : `Showing ${start}–${end} of ${total}`}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {BLOG_LIST_CATEGORY_FILTERS.map((label) => {
            const isAll = label === "All Categories";
            const active = isAll ? !category : category === label;
            const href = buildBlogListUrl(
              basePath,
              1,
              isAll ? null : label,
            );
            return (
              <Link
                key={label}
                href={href}
                scroll
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-[#016068] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {posts.map((post) => (
            <BlogCard
              key={post._id}
              post={{
                id: post._id,
                title: post.title,
                author: post.author,
                date: new Date(post.date).toLocaleDateString("en-GB"),
                category: post.category,
                image: post._id.startsWith("legacy-wp-")
                  ? "/window.svg"
                  : urlFor(post.coverImage).url(),
                slug: post.slug,
              }}
              fluid
              noBorder
              highlighted={post.highlighted}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <nav
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
            aria-label="Blog pagination"
          >
            {page > 1 ? (
              <Link
                href={buildBlogListUrl(basePath, page - 1, category)}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-[#016068] hover:bg-gray-50"
              >
                Previous
              </Link>
            ) : (
              <span className="px-4 py-2 text-sm text-gray-300">Previous</span>
            )}
            <span className="text-sm text-gray-600 tabular-nums">
              Page {page} of {totalPages}
            </span>
            {page < totalPages ? (
              <Link
                href={buildBlogListUrl(basePath, page + 1, category)}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-[#016068] hover:bg-gray-50"
              >
                Next
              </Link>
            ) : (
              <span className="px-4 py-2 text-sm text-gray-300">Next</span>
            )}
          </nav>
        )}
      </div>
    </section>
  );
}
