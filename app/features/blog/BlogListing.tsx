import Link from "next/link";
import BlogCard from "@/components/blog-card";
import defaultLegacyBlogCover from "@/app/assets/png/courses.jpg";
import {
  BLOG_LIST_CATEGORY_FILTERS,
  BLOG_LIST_PAGE_SIZE,
  buildBlogListUrl,
} from "@/lib/blog-listing";
import { urlFor } from "@/lib/sanity/image";
import type { BlogPost } from "@/lib/types/blog";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

const PAGE_WINDOW = 10;

function paginationWindow(
  page: number,
  totalPages: number,
  windowSize: number,
) {
  const idx = Math.floor((page - 1) / windowSize);
  const start = idx * windowSize + 1;
  const end = Math.min(start + windowSize - 1, totalPages);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  return {
    pages,
    showJumpBack: start > 1,
    showJumpForward: end < totalPages,
    jumpBackPage: Math.max(1, start - windowSize),
    jumpForwardPage: Math.min(totalPages, end + 1),
  };
}

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
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${active
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
          {posts.map((post) => {
            const isLegacy = post._id.startsWith("legacy-wp-");
            const cardImage = isLegacy
              ? (post.legacyCardImageUrl ?? defaultLegacyBlogCover)
              : urlFor(post.coverImage).url();
            return (
              <BlogCard
                key={post._id}
                post={{
                  id: post._id,
                  title: post.title,
                  author: post.author,
                  date: new Date(post.date).toLocaleDateString("en-GB"),
                  category: post.category,
                  image: cardImage,
                  slug: post.slug,
                }}
                fluid
                noBorder
                highlighted={post.highlighted}
                imageUnoptimized={Boolean(post.legacyCardImageUrl)}
              />
            );
          })}
        </div>

        {totalPages > 1 && (
          <nav
            className="mt-12 flex flex-col items-center gap-3"
            aria-label="Blog pagination"
          >
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              {page > 1 ? (
                <Link
                  href={buildBlogListUrl(basePath, page - 1, category)}
                  scroll
                  className="min-h-10 min-w-10 inline-flex items-center justify-center rounded-lg border border-gray-200 text-sm font-semibold text-[#016068] hover:bg-gray-50 sm:px-3"
                  aria-label="Previous page"
                >
                  <ArrowLeftIcon className="size-4" />
                </Link>
              ) : (
                <span
                  className="min-h-10 min-w-10 inline-flex items-center justify-center rounded-lg border border-gray-100 text-sm text-gray-300"
                  aria-hidden
                >
                  <ArrowLeftIcon className="size-4" />
                </span>
              )}

              {(() => {
                const w = paginationWindow(page, totalPages, PAGE_WINDOW);
                return (
                  <>
                    {w.showJumpBack ? (
                      <Link
                        href={buildBlogListUrl(
                          basePath,
                          w.jumpBackPage,
                          category,
                        )}
                        scroll
                        className="min-h-10 min-w-10 inline-flex items-center justify-center rounded-lg border border-gray-200 text-sm font-bold text-[#016068] hover:bg-[#016068]/5"
                        aria-label={`Go to page ${w.jumpBackPage}`}
                      >
                        {"<<"}
                      </Link>
                    ) : null}

                    {w.pages.map((n) => (
                      <Link
                        key={n}
                        href={buildBlogListUrl(basePath, n, category)}
                        scroll
                        aria-label={`Page ${n}`}
                        aria-current={n === page ? "page" : undefined}
                        className={`min-h-10 min-w-10 inline-flex items-center justify-center rounded-lg text-sm font-semibold tabular-nums transition sm:min-w-[2.25rem] ${n === page
                            ? "bg-[#016068] text-white shadow-sm"
                            : "border border-gray-200 text-gray-800 hover:bg-gray-50"
                          }`}
                      >
                        {n}
                      </Link>
                    ))}

                    {w.showJumpForward ? (
                      <Link
                        href={buildBlogListUrl(
                          basePath,
                          w.jumpForwardPage,
                          category,
                        )}
                        scroll
                        className="min-h-10 min-w-10 inline-flex items-center justify-center rounded-lg border border-gray-200 text-sm font-bold text-[#016068] hover:bg-[#016068]/5"
                        aria-label={`Go to page ${w.jumpForwardPage}`}
                      >
                        {">>"}
                      </Link>
                    ) : null}
                  </>
                );
              })()}

              {page < totalPages ? (
                <Link
                  href={buildBlogListUrl(basePath, page + 1, category)}
                  scroll
                  className="min-h-10 min-w-10 inline-flex items-center justify-center rounded-lg border border-gray-200 text-sm font-semibold text-[#016068] hover:bg-gray-50 sm:px-3"
                  aria-label="Next page"
                >
                  <ArrowRightIcon className="size-4" />
                </Link>
              ) : (
                <span
                  className="min-h-10 min-w-10 inline-flex items-center justify-center rounded-lg border border-gray-100 text-sm text-gray-300"
                  aria-hidden
                >
                  <ArrowRightIcon className="size-4" />
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 tabular-nums">
              Page {page} of {totalPages}
            </p>
          </nav>
        )}
      </div>
    </section>
  );
}
