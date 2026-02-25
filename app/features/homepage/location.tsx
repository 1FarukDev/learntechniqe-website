"use client";

import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import ClayImage from "@/app/assets/png/clay.png";
import ArrowRight from "@/app/assets/svg/arrow-front.svg";
import ArrowBack from "@/app/assets/svg/arrow-back.svg";
const Location: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"clay" | "stirling">("clay");

  const baseClasses =
    "flex items-center gap-2 rounded-md p-4 px-8 cursor-pointer transition-all";

  return (
    <section className="py-15 sm:py-30 max-w-7xl mx-auto px-0">
      <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-0">
        <div
          onClick={() => setActiveTab("clay")}
          className={`${baseClasses} ${
            activeTab === "clay"
              ? "bg-[#0088FF] text-white"
              : "bg-[#ECF0F0] text-[#627080]"
          }`}
        >
          <MapPin />
          <p className="uppercase">Clay Cross</p>
        </div>

        <div
          onClick={() => setActiveTab("stirling")}
          className={`${baseClasses} sm:ml-4 ${
            activeTab === "stirling"
              ? "bg-[#0088FF] text-white"
              : "bg-[#ECF0F0] text-[#627080]"
          }`}
        >
          <MapPin />
          <p className="uppercase">Stirling</p>
        </div>
      </div>

      {/* Tab Content */}
      {/* <div className="mt-10">
        {activeTab === "clay" && (
          <div>
            <h2 className="text-xl font-semibold">Clay Cross Location</h2>
            <p className="mt-4 text-gray-600">
              Content for Clay Cross goes here.
            </p>
          </div>
        )}

        {activeTab === "stirling" && (
          <div>
            <h2 className="text-xl font-semibold">Stirling Location</h2>
            <p className="mt-4 text-gray-600">
              Content for Stirling goes here.
            </p>
          </div>
        )}
      </div> */}
      <div className="flex flex-col md:flex-row mt-6 sm:mt-10 justify-between items-center gap-6">
        <div className="flex flex-col gap-4 sm:gap-8 mt-6 sm:mt-13 w-full md:w-1/2 order-2 md:order-1">
          <h3 className="text-[#01656B] font-bold text-sm sm:text-base">
            OUR TRAINING CENTRES
          </h3>
          <h1 className="text-black font-semibold text-[32px] sm:text-[40px] md:text-5xl">
            Our New Centre of <br />
            Excellence
          </h1>
          <p className="text-black font-normal text-sm sm:text-base">
            Technique Tower Business Park <br /> High Street, Clay Cross <br />{" "}
            Derbyshire, S45 9EA
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button className="uppercase bg-[#01656B] text-white h-12 sm:h-17.25 px-8 sm:px-10 text-sm sm:text-base">
              More Info
            </Button>
            <Button className="uppercase bg-[#14AE5C] text-white h-12 sm:h-17.25 px-6 sm:px-8 text-sm sm:text-base">
              Google maps
            </Button>
          </div>
        </div>
        <div className="relative w-full md:w-1/2 h-64 sm:h-96 md:h-[450px] lg:h-[650px] order-1 md:order-2">
          <Image
            src={ClayImage}
            alt="Clay Cross Location"
            className="rounded-lg object-cover"
            fill
          />
          <div className="flex justify-between absolute w-full top-1/2 transform -translate-y-1/2">
            <div className="bg-[#E99E20] p-2 px-2.75 rounded-full -ml-3">
              <Image src={ArrowBack} alt="Arrow back" />
            </div>
            <div className="bg-[#E99E20] p-2 px-2.75 rounded-full -mr-3">
              <Image src={ArrowRight} alt="Arrow right" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
