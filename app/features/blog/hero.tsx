import React from "react";
import BackgroundImage from "@/app/assets/png/courses.jpg";

function HeroSection() {
  return (
    <section className="relative w-full h-80 sm:h-96 md:h-120 overflow-hidden">
      <img
        src={BackgroundImage.src ?? BackgroundImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-top z-0"
      />

      <div className="absolute inset-0 z-10 bg-linear-to-b from-[#00000061] to-[#016068]" />

      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center text-center px-4 sm:px-8 md:px-6 pb-16 sm:pb-20 text-white">
        <h1 className="font-outfit text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-wide mb-4">
          Complete Guide to Air Conditioning <br className="hidden sm:block" />
          Training: Start Your HVAC Career in 2026
        </h1>
      </div>

      <svg
        viewBox="0 0 1440 160"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 left-0 w-full h-20 sm:h-28 md:h-40 z-30 block"
        preserveAspectRatio="none"
      >
        <path d="M0,0 Q720,160 1440,0 L1440,160 L0,160 Z" fill="#ffffff" />
      </svg>
    </section>
  );
}

export default HeroSection;