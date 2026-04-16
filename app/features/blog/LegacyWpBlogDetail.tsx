import Link from "next/link";
import type { LegacyWpBlogRecord } from "@/lib/legacy-wp-blogs";
import { normalizeLegacyBlogCategory } from "@/lib/legacy-wp-blogs";
import { sanitizeLegacyBlogBodyHtml } from "@/lib/sanitize-legacy-blog-html";

export default function LegacyWpBlogDetail({ post }: { post: LegacyWpBlogRecord }) {
  const displayDate = post.date
    ? new Date(post.date.replace(" ", "T")).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <div className="bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <p className="text-sm text-[#016068] font-medium mb-2">
          {normalizeLegacyBlogCategory(post.category)}
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">
          {post.title}
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          {post.author ? `${post.author} · ` : ""}
          {displayDate}
        </p>

        <div
          className="legacy-wp-html prose prose-zinc prose-lg max-w-none text-gray-800
            prose-headings:scroll-mt-24 prose-headings:font-bold prose-headings:text-gray-900
            prose-h1:text-3xl prose-h1:mb-4 prose-h1:mt-0
            prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-2xl
            prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-xl
            prose-h4:mt-6 prose-h4:mb-2
            prose-p:leading-relaxed prose-p:my-4
            prose-a:text-[#016068] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900
            prose-ul:my-4 prose-ol:my-4 prose-li:my-1.5 prose-li:marker:text-[#016068]
            prose-blockquote:border-l-[#016068] prose-blockquote:border-l-[3px]
            prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
            prose-blockquote:not-italic prose-blockquote:text-gray-700
            prose-img:rounded-lg prose-img:shadow-sm
            prose-hr:border-gray-200 prose-hr:my-10
            prose-code:text-[#016068] prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-gray-900 prose-pre:text-gray-100
            prose-table:text-sm prose-th:bg-gray-100 prose-th:text-gray-900 prose-td:border-gray-200"
          dangerouslySetInnerHTML={{
            __html: sanitizeLegacyBlogBodyHtml(post.html, post.title),
          }}
        />
        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link
            href="/blog/all"
            className="text-[#016068] font-semibold hover:underline"
          >
            ← Back to all blog posts
          </Link>
        </div>
      </div>
    </div>
  );
}
