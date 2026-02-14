import React from "react";
import BackgroundImage from "@/app/assets/png/881da83f746febd0519b1816f0e94e64c9dbca31.jpg";
import ElectricalIcon from "@/app/assets/svg/electrical.svg";
import AirconIcon from "@/app/assets/svg/fridge.svg";
import AssessmentIcon from "@/app/assets/svg/healthicons.svg";
import PLCIcon from "@/app/assets/svg/healthicons_training.svg";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function TradeCourses() {
  return (
    <section className="relative mt-10  overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${BackgroundImage.src})` }}
      />

      <div
        className="absolute inset-0 bg-linear-to-b 
    from-[#014757]/95 
    via-[#014757]/90 
    via-80%
    to-black/80"
      />

      <div className="relative z-10 p-10 py-25 max-w-7xl mx-auto">
        <h1 className="font-outfit font-semibold text-[48px] leading-tight text-white text-center">
          Our Trade Courses
        </h1>

        <p className="font-normal text-lg text-center text-white">
          See information on all the courses we offer at Technique
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-15">
          <div className="bg-[#E99E20] flex items-center justify-between rounded-lg p-5 shadow-xl">
            <div className="flex flex-col gap-10 w-1/2">
              <h1 className="text-white text-[32px] leading-tight font-outfit font-normal">
                Electrical <br /> Courses
              </h1>
              <Button className="uppercase bg-[#01636B] w-full h-16">
                More Information
              </Button>
            </div>
            <Image src={ElectricalIcon} alt="Electrical Icon" />
          </div>

          <div className="bg-[#01636B] flex items-center justify-between rounded-lg p-5 shadow-xl">
            <div className="flex flex-col gap-10 w-1/2">
              <h1 className="text-white text-[32px] leading-tight font-outfit font-normal">
                Air-con and <br /> Refrigeration Courses
              </h1>
              <Button variant={'secondary'} className="uppercase bg-[#ECF0F0] w-full h-16 text-black ">
                More Information
              </Button>
            </div>
            <Image src={AirconIcon} alt="Air-con Icon" />
          </div>

          <div className="bg-[#01636B] flex items-center justify-between rounded-lg p-5 shadow-xl">
            <div className="flex flex-col gap-10 w-1/2">
              <h1 className="text-white text-[32px] leading-tight font-outfit font-normal">
                AM2 <br /> Assessment
              </h1>
              <Button variant={'secondary'} className="uppercase bg-[#ECF0F0] text-black  w-full h-16">
                More Information
              </Button>
            </div>
            <Image src={AssessmentIcon} alt="Assessment Icon" />
          </div>

          <div className="bg-[#01636B] flex items-center justify-between rounded-lg p-5 shadow-xl">
            <div className="flex flex-col gap-10 w-1/2">
              <h1 className="text-white text-[32px] leading-tight font-outfit font-normal">
                PLC Training <br /> Courses
              </h1>
              <Button variant={'secondary'} className="uppercase bg-[#ECF0F0] text-black  w-full h-16">
                More Information
              </Button>
            </div>
            <Image src={PLCIcon} alt="PLC Icon" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TradeCourses;
