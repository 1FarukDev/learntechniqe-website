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
    <section className="bg-[#D4D8DB99] py-20">
      <div className="mx-auto max-w-7xl flex justify-between items-center mb-6 px-4">
        <h1 className="text-black font-semibold text-[28px]">
          Our Most Popular Courses
        </h1>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-5">
            <div
              onClick={() => scroll("left")}
              className="h-10 w-10 bg-[#9A9A9A] flex items-center justify-center rounded-full hover:bg-[#016068] cursor-pointer"
            >
              <Image src={ArrowBack} alt="Arrow Back" />
            </div>
            <div
              onClick={() => scroll("right")}
              className="h-10 w-10 bg-[#9A9A9A] flex items-center justify-center rounded-full hover:bg-[#016068] cursor-pointer"
            >
              <Image src={ArrowRight} alt="Arrow Right" />
            </div>
          </div>
          <Button className="uppercase bg-[#016068] h-17.25 px-15">
            See All Courses
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 py-4 no-scrollbar"
        style={{
          paddingLeft: "calc((100vw - 80rem) / 2 + 1rem)",
          paddingRight: "1rem",
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