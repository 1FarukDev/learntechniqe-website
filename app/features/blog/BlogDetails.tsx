"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  X,
} from "lucide-react";
import BlogCard from "@/components/blog-card";
import BackgroundImage from "@/app/assets/png/featuredcard.png";
import { FormInput } from "@/components/Input";
import { useForm, FormProvider } from "react-hook-form";

interface BlogPost {
  id: number;
  title: string;
  author: string;
  date: string;
  category: string;
  image: string;
}

const morePosts: BlogPost[] = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  title: "PH Origins: Air Conditioning",
  author: "MANAGER_NEW",
  date: "18/01/2026",
  category: "air conditioning and refrigeration",
  image: BackgroundImage.src ?? (BackgroundImage as unknown as string),
}));

const categories = [
  "Air Conditioning",
  "Refrigeration",
  "Industry News",
  "PLC",
  "Uncategorized",
];

const recentPosts = Array.from({ length: 7 }, (_, i) => ({
  id: i + 1,
  title: "BS 5839 2025: Key Changes to Fire Alarm Standards You Need to Know",
}));

function BlogDetailPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [recentOpen, setRecentOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const methods = useForm({
    defaultValues: { search: "" },
  });

  const { handleSubmit } = methods;

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -400 : 400,
      behavior: "smooth",
    });
  };

  const SidebarContent = (
    <div className="flex flex-col gap-4">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <FormInput
            name="search"
            placeholder="Search by topic"
            iconRight={<Search className="w-4 h-4 text-gray-400" />}
            className="border border-gray-200 rounded-lg text-sm text-gray-700 placeholder:text-gray-400"
            wrapperClassName="mb-4"
          />
        </form>
      </FormProvider>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => setCategoriesOpen((p) => !p)}
          className="w-full flex items-center justify-between px-4 py-3 bg-[#627080] text-sm font-semibold hover:bg-[#627080]/90 transition"
        >
          <span className="text-white">Categories</span>
          <ChevronDown
            size={16}
            className={`transition-transform text-white ${categoriesOpen ? "rotate-180" : ""}`}
          />
        </button>
        {categoriesOpen && (
          <ul className="px-4 pb-4 pt-1 flex flex-col gap-2 mt-4 text-[#0088FF]">
            {categories.map((cat) => (
              <li
                key={cat}
                className="flex items-center gap-2 text-sm cursor-pointer transition"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#0088FF] flex-shrink-0" />
                {cat}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => setRecentOpen((p) => !p)}
          className="w-full flex items-center justify-between px-4 py-3 bg-[#627080] text-sm font-semibold hover:bg-[#627080]/90 transition"
        >
          <span className="text-white">Recent Posts</span>
          <ChevronDown
            size={16}
            className={`transition-transform text-white ${recentOpen ? "rotate-180" : ""}`}
          />
        </button>
        {recentOpen && (
          <ul className="px-4 pb-4 pt-1 flex flex-col mt-4 gap-3">
            {recentPosts.map((p) => (
              <li
                key={p.id}
                className="text-xs text-[#0088FF] font-medium leading-snug hover:underline cursor-pointer"
              >
                {p.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  return (
    <main className="bg-white min-h-screen">
      {drawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setDrawerOpen(false)}
          />

          <div
            className="fixed top-0 left-0 h-full w-[80vw] max-w-xs bg-white z-50 flex flex-col shadow-2xl overflow-y-auto lg:hidden"
            style={{
              animation: "slideInLeft 250ms ease forwards",
            }}
          >
            <style>{`
              @keyframes slideInLeft {
                from { transform: translateX(-100%); }
                to { transform: translateX(0); }
              }
            `}</style>

            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800 text-sm">
                Categories & Recent Posts
              </h3>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <X size={18} className="text-gray-600" />
              </button>
            </div>

            <div className="px-5 py-5 flex-1">{SidebarContent}</div>
          </div>
        </>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <button
          className="lg:hidden mb-4 flex items-center gap-2 text-sm font-semibold text-[#016068] border border-[#016068] rounded-lg px-4 py-2 hover:bg-[#016068]/5 transition"
          onClick={() => setDrawerOpen(true)}
        >
          <SlidersHorizontal size={16} />
          Options
        </button>

        <div className="flex flex-col lg:flex-row gap-8 items-start mb-10">
          <div className="w-full lg:flex-1">
            <div className="rounded-xl overflow-hidden">
              <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-110">
                <Image
                  src={BackgroundImage.src ?? BackgroundImage}
                  alt="Blog hero"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div className="text-sm text-gray-800 leading-relaxed space-y-4 my-8 sm:my-16">
              <p>
                The UK's air conditioning and refrigeration industry is booming.
                With rising demand for skilled technicians across commercial,
                industrial, and residential sectors, now is the perfect time to
                launch or advance your career in this essential trade.
              </p>
              <p>
                Whether you're looking to change careers, upskill as an existing
                tradesperson, or train your workforce, the right air
                conditioning and refrigeration course can transform your earning
                potential and open doors to a stable, in-demand profession.
              </p>
              <p>
                This guide breaks down everything you need to know about air
                conditioning and refrigeration training in the UK — from course
                types and certifications to what makes quality training stand
                out.
              </p>
              <p>
                The UK's air conditioning and refrigeration industry is booming.
                With rising demand for skilled technicians across commercial,
                industrial, and residential sectors, now is the perfect time to
                launch or advance your career in this essential trade.
              </p>
              <p>
                Whether you're looking to change careers, upskill as an existing
                tradesperson, or train your workforce, the right air
                conditioning and refrigeration course can transform your earning
                potential and open doors to a stable, in-demand profession.
              </p>
              <p>
                This guide breaks down everything you need to know about air
                conditioning and refrigeration training in the UK — from course
                types and certifications to what makes quality training stand
                out.
              </p>
            </div>
          </div>

          <aside className="hidden lg:flex w-[220px] flex-shrink-0 flex-col gap-4">
            {SidebarContent}
          </aside>
        </div>

        <section>
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-black">
              More like this
            </h2>
            <div className="flex items-center gap-3 sm:gap-5">
              <button
                onClick={() => scroll("left")}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0D7377] flex items-center justify-center text-white hover:bg-[#0a5f63] transition"
              >
                <ChevronRight size={16} />
              </button>
              <Button className="hidden sm:flex bg-[#0D7377] hover:bg-[#0a5f63] text-white px-6 sm:px-8 tracking-widest text-xs sm:text-sm">
                SEE ALL BLOG POSTS
              </Button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {morePosts.map((post) => (
              <BlogCard key={post.id} post={post} variant="small" />
            ))}
          </div>

          <Button className="flex sm:hidden w-full mt-4 bg-[#0D7377] hover:bg-[#0a5f63] text-white tracking-widest text-sm">
            SEE ALL BLOG POSTS
          </Button>
        </section>
      </div>
    </main>
  );
}

export default BlogDetailPage;
