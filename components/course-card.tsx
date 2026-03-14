"use client";
import React from "react";
import Image from "next/image";
import CardImage from "@/app/assets/png/cardimage.png";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

function CourseCard() {
  const router = useRouter();

  return (
    <section className="bg-[#FFF9ED] min-w-[220px] sm:min-w-[260px] max-w-[260px] sm:max-w-[300px] shrink-0 rounded-bl-md rounded-br-md rounded-tl-md rounded-tr-md">
      <div className="w-full relative h-44 sm:h-52 md:h-56 ">
        <Image
          src={CardImage}
          alt="Course Card"
          fill
          className="object-cover rounded-t-md"
        />
      </div>

      <h2 className="font-semibold text-base sm:text-lg md:text-xl text-black mt-2 px-3 sm:px-4">
        Course Title
      </h2>

      <div className="flex items-center justify-between mt-3 sm:mt-4 mb-3 sm:mb-5 px-3 sm:px-4">
        <p className="text-[#9A9A9A] font-semibold text-xs sm:text-sm">
          Course Description
        </p>
        <Link
          href="#"
          className="bg-[#627080] border border-[#9A9A9A] text-white font-semibold text-[10px] sm:text-xs px-3 sm:px-4 py-1"
        >
          £132000
        </Link>
      </div>

      <hr className="py-2 text-[#D2C4B3]" />

      <p className="px-3 sm:px-4 text-xs sm:text-sm line-clamp-3">
        These comprehensive Total Electrical 20 training courses are aimed at
        non-electrical and electrical persons wishing to up-skill or re-train.
        The aim of the Total Electrical 20 training course is to provide a level
        of competence, which will allow work to be safely and efficiently
        carried out on Electrical Equipment and Systems all within a 4 week
        period.
      </p>

      <div className="mx-3 sm:mx-4 pb-3 sm:pb-4">
        <Button className="bg-[#14AE5C] w-full h-10 sm:h-11 uppercase mt-4 sm:mt-5 text-xs sm:text-sm">
          More Information
        </Button>
      </div>
    </section>
  );
}

export default CourseCard;