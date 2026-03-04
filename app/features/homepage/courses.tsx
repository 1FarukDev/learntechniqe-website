"use client";
import React, { useRef, useEffect } from "react";
import ArrowRight from "@/app/assets/svg/arrow-front.svg";
import ArrowBack from "@/app/assets/svg/arrow-back.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CourseCard from "@/components/course-card";

const Courses: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ left: 0 });
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const { scrollLeft, clientWidth } = scrollRef.current;
    // On mobile, scroll by one card width (min 280px, ~85vw for peek effect)
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const scrollAmount = isMobile
      ? Math.min(320, Math.floor(window.innerWidth * 0.88))
      : clientWidth;

    if (direction === "left") {
      scrollRef.current.scrollTo({
        left: scrollLeft - scrollAmount,
        behavior: "smooth",
      });
    } else {
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-[#D4D8DB99] py-10 sm:py-20 -mx-5 md:px-0 px-4">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 px-4 sm:px-6">
        <h1 className="text-black font-semibold text-[26px] sm:text-[30px] md:text-[34px]">
          Our Most Popular Courses
        </h1>
        <div className="flex items-center gap-4 sm:gap-8 w-full sm:w-auto">
          <div className="flex items-center gap-3 sm:gap-5">
            <div
              onClick={() => scroll("left")}
              className="h-9 w-9 sm:h-10 sm:w-10 bg-[#9A9A9A] flex items-center justify-center rounded-full hover:bg-[#016068] active:bg-[#0E7377] cursor-pointer shrink-0 transition-colors"
            >
              <Image src={ArrowBack} alt="Arrow Back" />
            </div>
            <div
              onClick={() => scroll("right")}
              className="h-9 w-9 sm:h-10 sm:w-10 bg-[#9A9A9A] flex items-center justify-center rounded-full hover:bg-[#016068] active:bg-[#0E7377] cursor-pointer shrink-0 transition-colors"
            >
              <Image src={ArrowRight} alt="Arrow Right" />
            </div>
          </div>
          <Button className="uppercase bg-[#016068] h-12 sm:h-17.25 px-8 sm:px-15 text-sm sm:text-base flex-1 sm:flex-initial">
            See All Courses
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 py-4 no-scrollbar snap-x snap-mandatory overscroll-x-contain md:snap-none pl-4 sm:pl-6 md:pl-[max(1.5rem,calc((100vw_-_1280px)_/_2_+_1.5rem))] pr-4 sm:pr-6"
        style={{
          scrollPaddingLeft: "1rem",
          scrollPaddingRight: "1rem",
        }}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="snap-start shrink-0 w-[max(280px,min(320px,calc(100vw-56px)))] md:w-auto md:min-w-0"
          >
            <CourseCard />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Courses;