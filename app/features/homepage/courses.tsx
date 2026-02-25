"use client";
import React, { useRef } from "react";
import ArrowRight from "@/app/assets/svg/arrow-front.svg";
import ArrowBack from "@/app/assets/svg/arrow-back.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CourseCard from "@/components/course-card";

const Courses: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const { scrollLeft, clientWidth } = scrollRef.current;
    const scrollAmount = clientWidth;

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
    <section className="bg-[#D4D8DB99] py-10 sm:py-20 -mx-5 px-0">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 px-4 sm:px-6">
        <h1 className="text-black font-semibold text-[26px] sm:text-[30px] md:text-[34px]">
          Our Most Popular Courses
        </h1>
        <div className="flex items-center gap-4 sm:gap-8 w-full sm:w-auto">
          <div className="flex items-center gap-3 sm:gap-5">
            <div
              onClick={() => scroll("left")}
              className="h-9 w-9 sm:h-10 sm:w-10 bg-[#9A9A9A] flex items-center justify-center rounded-full hover:bg-[#016068] cursor-pointer shrink-0"
            >
              <Image src={ArrowBack} alt="Arrow Back" />
            </div>
            <div
              onClick={() => scroll("right")}
              className="h-9 w-9 sm:h-10 sm:w-10 bg-[#9A9A9A] flex items-center justify-center rounded-full hover:bg-[#016068] cursor-pointer shrink-0"
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
        className="flex overflow-x-auto gap-4 py-4 no-scrollbar"
        style={{
          paddingLeft: "max(20px, calc((100vw - 80rem) / 2 + 20px))",
          paddingRight: "20px",
        }}
      >
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </section>
  );
};

export default Courses;