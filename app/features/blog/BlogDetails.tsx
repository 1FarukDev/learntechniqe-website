"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Search,
  ChevronDown,
  SlidersHorizontal,
  X,
} from "lucide-react";
import BlogCard from "@/components/blog-card";
import BackgroundImage from "@/app/assets/png/featuredcard.png";
import ArrowRight from "@/app/assets/svg/arrow-front.svg";
import ArrowBack from "@/app/assets/svg/arrow-back.svg";
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

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const methods = useForm({
    defaultValues: { search: "" },
  });

  const { handleSubmit } = methods;

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const scrollAmount = isMobile
      ? Math.min(320, Math.floor(window.innerWidth * 0.88))
      : clientWidth;
    scrollRef.current.scrollTo({
      left:
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount,
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
      {drawerOpen &&
        createPortal(
          <>
            <div
              className="fixed inset-0 bg-black/40 z-[60] lg:hidden"
              onClick={() => setDrawerOpen(false)}
            />

            <div
              className="fixed inset-y-0 left-0 w-[80vw] max-w-xs bg-white z-[70] flex flex-col shadow-2xl overflow-y-auto overscroll-y-contain lg:hidden"
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
          </>,
          document.body
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
            <div className="flex items-center gap-4 sm:gap-8">
              <div className="flex items-center gap-3 sm:gap-5">
                <div
                  onClick={() => scroll("left")}
                  className="h-9 w-9 sm:h-10 sm:w-10 bg-[#9A9A9A] flex items-center justify-center rounded-full hover:bg-[#016068] active:bg-[#0E7377] cursor-pointer shrink-0 transition-colors"
                >
                  <Image src={ArrowBack} alt="Scroll left" />
                </div>
                <div
                  onClick={() => scroll("right")}
                  className="h-9 w-9 sm:h-10 sm:w-10 bg-[#9A9A9A] flex items-center justify-center rounded-full hover:bg-[#016068] active:bg-[#0E7377] cursor-pointer shrink-0 transition-colors"
                >
                  <Image src={ArrowRight} alt="Scroll right" />
                </div>
              </div>
              <Button className="hidden sm:flex uppercase bg-[#016068] h-12 sm:h-17.25 px-8 sm:px-15 text-sm sm:text-base">
                See All Blog Posts
              </Button>
            </div>
          </div>

          <Button className="flex sm:hidden w-full uppercase bg-[#016068] hover:bg-[#014d54] text-white tracking-widest text-sm mb-4 h-12">
            See All Blog Posts
          </Button>

          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 py-4 no-scrollbar snap-x snap-mandatory overscroll-x-contain md:snap-none"
            style={{ scrollPaddingLeft: "1rem", scrollPaddingRight: "1rem" }}
          >
            {morePosts.map((post) => (
              <div
                key={post.id}
                className="snap-start shrink-0 w-[max(280px,min(320px,calc(100vw-56px)))] md:w-auto md:min-w-0"
              >
                <BlogCard post={post} variant="small" fluid />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default BlogDetailPage;
