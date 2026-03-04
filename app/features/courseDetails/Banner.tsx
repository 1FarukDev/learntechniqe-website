import React from "react";
import Image from "next/image";
import ElectricianImage from "@/app/assets/png/coursedetailbanner.png";

function PricingBanner() {
  return (
    <div className="bg-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-80 sm:min-h-100 md:min-h-120 relative">
          {/* Left: Pricing content */}
          <div
            className="px-6 sm:px-10 py-10 sm:py-14 flex flex-col justify-between relative"
            style={{
              background:
                "linear-gradient(to bottom, #001734 0%, #001734 10%, #016068 100%)",
            }}
          >
            <div>
              <h2 className="font-outfit font-bold text-2xl sm:text-3xl md:text-4xl text-white leading-tight mb-6 sm:mb-10">
                Take the <span className="text-[#4DD9AC]">First Step</span>
                <br />
                Towards Your <span className="text-[#4DD9AC]">New Career</span>
              </h2>

              <div className="flex justify-center gap-6 mb-6 sm:mb-8">
                <div className="text-center">
                  <p className="text-white font-outfit text-3xl sm:text-4xl font-normal line-through decoration-red-400 decoration-2 mb-2">
                    £1,950
                  </p>
                  <p className="text-white font-outfit font-black text-6xl sm:text-7xl leading-none">
                    £1,450
                  </p>
                </div>
              </div>
            </div>

            <p className="text-[#FEFEFE] font-outfit font-semibold text-base sm:text-xl text-center leading-7">
              That's £500 in savings, plus you gain skills that can fast-track
              your earning potential for years to come.
            </p>
          </div>

  
          <div className="relative h-64 sm:h-80 md:h-auto">
            <Image
              src={ElectricianImage}
              alt="Electrician working on panel"
              fill
              className="object-cover object-center"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 40% 60% at 0% 50%, rgba(1,96,104,0.6) 0%, transparent 100%)",
              }}
            />
          </div>
          <div className="absolute left-1/2 bottom-45 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 p-4 px-10 md:p-5 md:py-13  rounded-full bg-[#E99E20] flex flex-col items-center justify-center w-16 sm:w-20 md:w-auto">
            <span className="text-white font-outfit text-xs font-normal">
              Save
            </span>
            <span className="text-white font-outfit font-black text-xl md:text-2xl sm:text-4xl leading-tight">
              £500
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PricingBanner;