import Link from "next/link";
import type { LegacyWpBlogRecord } from "@/lib/legacy-wp-blogs";
import { normalizeLegacyBlogCategory } from "@/lib/legacy-wp-blogs";

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
          className="prose prose-zinc max-w-none text-gray-800 prose-headings:text-black prose-a:text-[#016068]"
          dangerouslySetInnerHTML={{ __html: post.html }}
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
