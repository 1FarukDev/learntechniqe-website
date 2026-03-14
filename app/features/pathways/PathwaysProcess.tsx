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
    <section className="bg-white overflow-hidden py-12 sm:py-20 md:px-0 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 ro">
          {/* Featured image */}
          <div className="relative min-h-[320px] lg:min-h-[480px] order-2 lg:order-1 rounded-tl-lg rounded-bl-lg overflow-hidden">
            <Image
              src={ConsultationImage}
              alt="Consultation with course advisors"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-[#016068]/20 lg:bg-transparent" />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-16 xl:px-20 order-1 lg:order-2 bg-[#E0ECED] rounded-tr-lg rounded-br-lg">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#016068] mb-6 leading-tight">
              {subtitle}
            </h2>
            <ul className="space-y-5">
              {items.map((item, i) => (
                <li key={i} className="flex gap-4 group">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#016068] text-white text-sm font-bold flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    {i + 1}
                  </span>
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed pt-1.5">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
