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
    <section className="bg-[#FFFFFF] min-w-[280px] sm:min-w-70 max-w-[320px] sm:max-w-117 shrink-0 rounded-bl-md rounded-br-md rounded-tl-md rounded-tr-md">
      <div className="relative">
        <div className="w-full relative h-56 sm:h-70 md:h-80 ">
          <Image
            src={CardImage}
            alt="Course Card"
            fill
            className="object-cover rounded-t-md"
          />
        </div>
        <div className="absolute top-3 left-3">
          <p className="bg-[#14AE5C] text-white p-5 w-max py-1 text-xs font-bold rounded-md">
            Beginner
          </p>
        </div>
      </div>

      <div className=" items-center justify-between px-4 sm:px-5">
        <h2 className="font-semibold text-[18px] sm:text-[20px] md:text-[22px] text-black mt-3">
          Total Electrical 20 New
        </h2>
        <p className="text-[#9A9A9A] font-normal text-xs">ELECTRICAL</p>
      </div>
      <div className=" items-center justify-between px-4 sm:px-5 mt-7">
        <h2 className="font-semibold text-[18px] sm:text-[20px] md:text-[22px] text-[#14AE5C] ">
          £1,430 <span className="font-normal"> (£1630 + VAT)</span>
        </h2>
        <p className="text-black font-semibold text-xs flex gap-1">
          Course duration:{" "}
          <span className="text-[#9A9A9A] font-normal">2 weeks</span>
        </p>
      </div>

      <div className="mx-4 sm:mx-5 pb-4 sm:pb-5">
        <Button className="bg-[#14AE5C] w-full h-12 sm:h-14.25 uppercase mt-6 sm:mt-8 text-sm sm:text-base">
          More Information
        </Button>
      </div>
    </section>
  );
}

export default CourseCard;
