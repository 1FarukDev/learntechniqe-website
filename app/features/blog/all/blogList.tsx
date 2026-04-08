// components/AllBlogPosts.tsx
'use client'
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import BlogCard from "@/components/blog-card";
import { urlFor } from "@/lib/sanity/image";
import { BlogPost } from "@/lib/types/blog";

const filterOptions = [
  "All Categories",
  "Air Conditioning",
  "Refrigeration",
  "Industry News",
  "PLC",
  "Uncategorized",
];

interface Props {
  posts: BlogPost[];
}

function AllBlogPosts({ posts }: Props) {
  const [selectedFilter, setSelectedFilter] = useState("Filter by");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filteredPosts =
    selectedFilter === "Filter by" || selectedFilter === "All Categories"
      ? posts
      : posts.filter((post) => post.category === selectedFilter);

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-16 sm:pb-20 md:pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-4xl font-bold text-black">All Blog Posts</h2>

          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-3 bg-[#4A5568] text-white text-sm font-medium px-5 py-3 rounded-lg min-w-[160px] justify-between hover:bg-[#3a4455] transition"
            >
              <span>{selectedFilter}</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedFilter(option);
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {filteredPosts.map((post) => (
            <BlogCard
              key={post._id}
              post={{
                id: post._id,
                title: post.title,
                author: post.author,
                date: new Date(post.date).toLocaleDateString("en-GB"),
                category: post.category,
                image: urlFor(post.coverImage).url(),
                slug: post.slug,
              }}
              fluid
              noBorder
              highlighted={post.highlighted}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AllBlogPosts;