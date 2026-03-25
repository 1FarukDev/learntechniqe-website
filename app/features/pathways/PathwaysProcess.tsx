import React from "react";
import Image from "next/image";

import ConsultationImage from "@/app/assets/png/32743f1db038b2a1c51268ee3d04b3737c7bef67.jpg";

interface PathwaysProcessProps {
  title: string;
  subtitle: string;
  items: string[];
}

export function PathwaysProcess({ subtitle, items }: PathwaysProcessProps) {
  return (
    <section className="bg-white overflow-hidden py-16 sm:py-24 md:px-0 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-xl">
          {/* Featured image */}
          <div className="relative min-h-[320px] lg:min-h-[540px] order-2 lg:order-1">
            <Image
              src={ConsultationImage}
              alt="Consultation with course advisors"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#016068]/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#E0ECED]/30" />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center py-14 sm:py-18 lg:py-20 px-6 sm:px-10 lg:px-14 xl:px-20 order-1 lg:order-2 bg-[#E0ECED]">
            <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-bold text-[#016068] mb-10 leading-tight tracking-tight">
              {subtitle}
            </h2>

            <div className="relative">
              {/* Vertical connector */}
              <div
                className="absolute left-5 top-5 bottom-5 w-px"
                style={{
                  background:
                    "repeating-linear-gradient(to bottom, #016068 0, #016068 6px, transparent 6px, transparent 12px)",
                }}
              />

              <ul className="space-y-8 relative">
                {items.map((item, i) => (
                  <li key={i} className="flex gap-5 items-start group">
                    <span className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-[#016068] text-white text-sm font-bold flex items-center justify-center shadow-lg ring-4 ring-[#E0ECED] group-hover:scale-110 group-hover:bg-[#E99E20] transition-all duration-200">
                      {i + 1}
                    </span>
                    <div className="pt-1.5">
                      <p className="text-gray-800 text-base sm:text-lg leading-relaxed font-medium">
                        {item}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
