"use client";

import { Button } from "@/components/ui/button";
import React, { useRef } from "react";
import BackgroundImage from "@/app/assets/png/featuredcard.png";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BlogCard from "@/components/blog-card";
import { useRouter } from "next/navigation";

interface BlogPost {
  id: number;
  title: string;
  author: string;
  date: string;
  category: string;
  image: string;
}

interface CarouselSectionProps {
  title: string;
  posts: BlogPost[];
  variant?: "large" | "small";
}

function CarouselSection({
  title,
  posts,
  variant = "small",
}: CarouselSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = dir === "left" ? -400 : 400;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  const router = useRouter();
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-bold text-black">{title}</h2>
        <div className="flex items-center gap-7">
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 rounded-full bg-[#0D7377] flex items-center justify-center text-white hover:bg-[#0a5f63] transition"
          >
            <ChevronRight size={18} />
          </button>
          <Button
            onClick={() => router.push("/blog/all")}
            className="bg-[#0D7377] h- hover:bg-[#0a5f63] text-white px-8 tracking-widest text-sm"
          >
            SEE ALL BLOG POSTS
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {posts.map((post, index) => (
          <BlogCard
            key={post.id}
            post={post}
            variant={variant}
            // highlighted={index === 0}
          />
        ))}
      </div>
    </section>
  );
}

const trendingPosts: BlogPost[] = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  title:
    "Complete Guide to Air Conditioning Training: Start Your HVAC Career in 2026",
  author: "MANAGER_NEW",
  date: "18/01/2026",
  category: "Air Conditioning And Refrigeration",
  image: BackgroundImage.src ?? (BackgroundImage as unknown as string),
}));

const latestPosts: BlogPost[] = Array.from({ length: 5 }, (_, i) => ({
  id: i + 10,
  title: "PH Origins: Air Conditioning",
  author: "MANAGER_NEW",
  date: "18/01/2026",
  category: "air conditioning and refrigeration",
  image: BackgroundImage.src ?? (BackgroundImage as unknown as string),
}));

function PostOfTheDay() {
  const router = useRouter();
  return (
    <main className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-6 flex justify-between items-center">
        <h1 className="text-4xl font-bold">Post of the Day</h1>
        <Button className="px-10" onClick={() => router.push("/blog/all")}>
          SEE ALL BLOG POSTS
        </Button>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100 flex flex-col md:flex-row">
          <div className="md:w-[45%] shrink-0">
            <Image
              src={BackgroundImage.src ?? BackgroundImage}
              alt="HVAC technician working on electrical panel"
              className="w-full h-full object-cover"
              priority
              width={600}
              height={400}
            />
          </div>

          <div className="flex flex-col justify-between p-10 md:w-[55%]">
            <div>
              <h2 className="text-3xl font-bold leading-tight mb-4">
                <span className="font-semibold">
                  Complete Guide to Air Conditioning Training:
                </span>{" "}
                <span className="font-normal">
                  Start Your HVAC Career in 2026
                </span>
              </h2>

              <p className="text-sm text-[#9A9A9A] uppercase tracking-wide mb-1">
                BY MANAGER_NEW / 18/01/2026
              </p>
              <p className="text-base font-medium text-[#14AE5C] mb-6">
                air conditioning and refrigeration
              </p>

              <hr className="border-gray-200 mb-6" />

              <p className="text-[#000000] leading-relaxed text-base">
                The demand for skilled air conditioning engineers has never been
                higher. With climate change driving increased reliance on
                cooling systems and strict environmental regulations requiring
                qualified professionals, now is the perfect time to train in
                this rewarding field. Whether you're considering a complete
                career change or you're an existing tradesperson looking to add
                air conditioning to your skill set, this guide covers everything
                you need to know about air conditioning training in the UK.
              </p>
            </div>

            <div className="mt-8">
              <Button
                onClick={() => router.push("/blog/post-of-the-day")}
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-white font-semibold tracking-widest py-6 text-sm rounded-lg"
              >
                READ ARTICLE
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CarouselSection
        title="Trending Posts"
        posts={trendingPosts}
        variant="large"
      />

      <CarouselSection
        title="Latest Posts"
        posts={latestPosts}
        variant="small"
      />
    </main>
  );
}

export default PostOfTheDay;
