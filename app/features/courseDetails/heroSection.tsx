import React from "react";
import Image from "next/image";
import HeroImage from "@/app/assets/png/coursedetails.jpg";
import { Button } from "@/components/ui/button";
import CityGuildsLogo from "@/app/assets/svg/city.svg";
import Clock from "@/app/assets/svg/clock.svg";
import Cap from "@/app/assets/svg/cap.svg";

function CourseHero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      <Image
        src={HeroImage}
        alt="Course background"
        fill
        className="object-cover object-center z-0"
      />


      <div className="absolute inset-0 z-10 bg-linear-to-br from-[rgba(0,140,140,0.90)] via-[rgba(0,100,110,0.95)] to-[rgba(0,60,80,1)]" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 lg:py-35 flex flex-col lg:flex-row items-start gap-8 lg:gap-12">

        
        <div className="w-full lg:w-[55%] text-white">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5 sm:mb-6">
            <span className="bg-[#016068] text-white text-xs font-semibold px-4 py-1.5 rounded-sm">
              Existing Electrician
            </span>
            <span className="bg-[#F5A623] text-white text-xs font-semibold px-4 py-1.5 rounded-sm">
              Popular Course
            </span>
          </div>

          <h1 className="font-outfit font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight mb-5 sm:mb-6">
            Total Industrial Electrical <br className="hidden sm:block" /> Maintenance 10
          </h1>

          <div className="space-y-3 text-white text-sm sm:text-base leading-7">
            <p>
              The Total Industrial Electrical Maintenance 10-day course (TIEM10)
              is a hands-on, intensive training programme offered by Technique
              Learning Solutions. It is designed for participants with some
              basic electrical understanding who wish to acquire a recognised
              qualification and gain the practical skills needed to work as an
              industrial electrician.
            </p>
            <p>
              Throughout the course, you will combine theory and practical work
              to develop competence in industrial wiring, control systems, motor
              control, fault-finding, maintenance and safety procedures.
            </p>
            <p>
              At the end of the ten days you will receive an external
              certificate (the EAL Level 3 Award in Industrial &amp; Panel
              Wiring), giving you a recognised credential in industrial
              electrical maintenance.
            </p>
          </div>

          <a
            href="#"
            className="inline-block mt-6 sm:mt-8 text-[#4DD9AC] font-semibold text-sm underline underline-offset-4 hover:text-white transition-colors"
          >
            Request Course Overview
          </a>
        </div>

        
        <div className="w-full lg:w-[42%] p-6 sm:p-8 flex flex-col gap-5 bg-white rounded-2xl overflow-hidden">
          <div>
            <p className="text-[#14AE5C] font-outfit font-bold text-4xl sm:text-5xl">
              £1,450
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#016068]">
                <Image src={Cap} alt="cap icon" width={20} height={20} />
              </span>
              <h3 className="text-[#016068] font-outfit font-bold text-sm sm:text-base">
                What is Obtained/Achieved?
              </h3>
            </div>

            <div className="space-y-4 mt-2">
              {[
                "Fundamental Electrical Principles for Industrial Practices (MOD1)",
                "Fundamental Electrical Principles for Industrial Practices (MOD1)",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4"
                >
                  <p className="text-black font-semibold text-sm leading-snug flex-1">
                    {item}
                  </p>
                  <div className="shrink-0 border border-gray-200 rounded-md px-3 py-2 flex items-center gap-1.5 text-xs text-gray-400">
                    <span>Accredited by</span>
                    <Image
                      src={CityGuildsLogo}
                      alt="City & Guilds logo"
                      width={60}
                      height={40}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#016068]">
                <Image src={Clock} alt="clock icon" width={20} height={20} />
              </span>
              <h3 className="text-[#016068] font-outfit font-bold text-sm sm:text-base">
                Course Duration:
              </h3>
            </div>
            <p className="text-black font-bold text-sm">
              20 Days (19 days in Scotland if no Part P 2393-10 required)
            </p>
          </div>

          <div className="bg-[#E9FDFF] rounded-md">
            <p className="text-black text-xs leading-6 p-3">
              Please note the course dates may not run consecutively. We will be
              in touch to confirm subsequent dates on this package course after
              registration.{" "}
              <a href="#" className="text-green-600 underline hover:opacity-80">
                Please get in touch
              </a>{" "}
              if you would like to discuss the exact course dates for each
              module.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            <Button className="bg-[#F5A623] hover:bg-[#e09410] text-white font-outfit font-semibold uppercase tracking-widest text-xs sm:text-sm h-12 sm:h-14">
              Book Now
            </Button>
            <Button className="bg-[#016068] hover:bg-[#014d54] text-white font-outfit font-semibold uppercase tracking-widest text-xs sm:text-sm h-12 sm:h-14">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CourseHero;