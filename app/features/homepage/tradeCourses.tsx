import React from "react";
import BackgroundImage from "@/app/assets/png/881da83f746febd0519b1816f0e94e64c9dbca31.jpg";
import ElectricalIcon from "@/app/assets/svg/electrical.svg";
import AirconIcon from "@/app/assets/svg/fridge.svg";
import AssessmentIcon from "@/app/assets/svg/healthicons.svg";
import PLCIcon from "@/app/assets/svg/healthicons_training.svg";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

function TradeCourses() {
  return (
    <section className="relative mt-10 overflow-hidden px-4 md:px-0">
      <Image
        src={BackgroundImage}
        alt=""
        aria-hidden="true"
        fill
        className="absolute inset-0 object-cover object-center z-0"
        sizes="100vw"
        quality={80}
        placeholder="blur"
      />

      <div
        className="absolute inset-0 bg-linear-to-b  
    from-[#014757]/95 
    via-[#014757]/90 
    via-80%
    to-black/80 "
      />

      <div className="relative z-10 py-15 sm:py-25 max-w-7xl mx-auto md:px-0 px-4 ">
        <h2 className="font-semibold text-[32px] sm:text-[44px] md:text-[52px] leading-tight text-white text-center">
          Our Trade Courses
        </h2>

        <p className="font-normal text-sm sm:text-base md:text-lg text-center text-white mt-2">
          See information on all the courses we offer at Technique
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mt-10 sm:mt-15">
          <div className="bg-[#E99E20] flex items-center justify-between rounded-lg p-4 sm:p-5 shadow-xl gap-4">
            <div className="flex flex-col gap-4 sm:gap-10 w-1/2 min-w-0">
              <h3 className="text-white text-[24px] sm:text-[30px] md:text-[36px] leading-tight font-normal">
                Electrical <br /> Courses
              </h3>
              <Button asChild className="uppercase bg-[#01636B] w-full h-12 sm:h-16 text-sm sm:text-base">
                <Link href="/courses/electrical">More Information</Link>
              </Button>
            </div>
            <Image
              src={ElectricalIcon}
              alt="Electrical Icon"
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-auto md:h-auto shrink-0"
            />
          </div>

          <div className="bg-[#01636B] flex items-center justify-between rounded-lg p-4 sm:p-5 shadow-xl gap-4">
            <div className="flex flex-col gap-4 sm:gap-10 w-1/2 min-w-0">
              <h3 className="text-white text-[24px] sm:text-[30px] md:text-[36px] leading-tight font-normal">
                Air-con and <br /> Refrigeration Courses
              </h3>
              <Button
                asChild
                variant={"secondary"}
                className="uppercase bg-[#ECF0F0] w-full h-12 sm:h-16 text-black text-sm sm:text-base"
              >
                <Link href="/courses/aircon-refrigeration">More Information</Link>
              </Button>
            </div>
            <Image
              src={AirconIcon}
              alt="Air-con Icon"
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-auto md:h-auto shrink-0"
            />
          </div>
          <div className="bg-[#01636B] flex items-center justify-between rounded-lg p-4 sm:p-5 shadow-xl gap-4">
            <div className="flex flex-col gap-4 sm:gap-10 w-1/2 min-w-0">
              <h3 className="text-white text-[24px] sm:text-[30px] md:text-[36px] leading-tight font-normal">
                PLC Training <br /> Courses
              </h3>
              <Button
                asChild
                variant={"secondary"}
                className="uppercase bg-[#ECF0F0] text-black w-full h-12 sm:h-16 text-sm sm:text-base"
              >
                <Link href="/courses/plc">More Information</Link>
              </Button>
            </div>
            <Image
              src={PLCIcon}
              alt="PLC Icon"
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-auto md:h-auto shrink-0"
            />
          </div>
          <div className="bg-[#01636B] flex items-center justify-between rounded-lg p-4 sm:p-5 shadow-xl gap-4">
            <div className="flex flex-col gap-4 sm:gap-10 w-1/2 min-w-0">
              <h3 className="text-white text-[24px] sm:text-[30px] md:text-[36px] leading-tight font-normal">
                AM2 <br /> Assessment
              </h3>
              <Button
                asChild
                variant={"secondary"}
                className="uppercase bg-[#ECF0F0] text-black w-full h-12 sm:h-16 text-sm sm:text-base"
              >
                <Link href="/courses/am2-assessment">More Information</Link>
              </Button>
            </div>
            <Image
              src={AssessmentIcon}
              alt="Assessment Icon"
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-auto md:h-auto shrink-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TradeCourses;
