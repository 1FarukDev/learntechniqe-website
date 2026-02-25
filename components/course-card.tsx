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
    <section className="bg-[#FFF9ED] min-w-70 max-w-117 shrink-0 rounded-bl-md rounded-br-md">
      <div className="w-full relative h-70 md:h-80">
        <Image
          src={CardImage}
          alt="Course Card"
          fill
          className="object-cover"
        />
      </div>

      <h2 className="font-semibold text-[20px] text-black mt-3 px-5">
        Course Title
      </h2>

      <div className="flex items-center justify-between mt-5 mb-7 px-5">
        <p className="text-[#9A9A9A] font-semibold text-base">
          Course Description
        </p>
        <Link
          href="#"
          className="bg-[#627080] border border-[#9A9A9A] text-white font-semibold text-xs px-4 py-1"
        >
          More Information
        </Link>
      </div>

      <hr className="py-3 text-[#D2C4B3]" />

      <p className="px-5">
        These comprehensive Total Electrical 20 training courses are aimed at
        non-electrical and electrical persons wishing to up-skill or re-train.
        The aim of the Total Electrical 20 training course is to provide a level
        of competence, which will allow work to be safely and efficiently
        carried out on Electrical Equipment and Systems all within a 4 week
        period.
      </p>

      <div className="mx-5 pb-5">
        <Button
          className="bg-[#14AE5C] w-full h-14.25 uppercase mt-8"
          onClick={() => router.push("/courses/1")}
        >
          More Information
        </Button>
      </div>
    </section>
  );
}

export default CourseCard;