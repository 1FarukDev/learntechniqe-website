'use client'
import React, { useState } from "react";
import BackgroundImage from "@/app/assets/png/featuredcard.png";
import { ChevronDown } from "lucide-react";
import BlogCard from "@/components/blog-card";

interface BlogPost {
  id: number;
  title: string;
  author: string;
  date: string;
  category: string;
  image: string;
}

const allPosts: BlogPost[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: "PH Origins: Air Conditioning",
  author: "MANAGER_NEW",
  date: "18/01/2026",
  category: "air conditioning and refrigeration",
  image: BackgroundImage.src ?? (BackgroundImage as unknown as string),
}));

const filterOptions = [
  "All Categories",
  "Air Conditioning And Refrigeration",
  "Heating",
  "Ventilation",
  "Plumbing",
];

function AllBlogPosts() {
  const [selectedFilter, setSelectedFilter] = useState("Filter by");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-bold text-black">All Blog Posts</h1>

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

       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allPosts.map((post) => (
            <BlogCard key={post.id} post={post} fluid />
          ))}
        </div>
      </div>
    </main>
  );
}

export default AllBlogPosts;
