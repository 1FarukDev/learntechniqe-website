import React from "react";
import Image from "next/image";
import CityImage from "@/app/assets/certifications/city.png";
import Cyber from "@/app/assets/certifications/cyber.png";
import Eal from "@/app/assets/certifications/eal.png";
import Lcl from "@/app/assets/certifications/lcl.png";
import Institution from "@/app/assets/certifications/institution.png";
import CitationImage from "@/app/assets/certifications/citation.png";

function Certification() {
  const certifications = [
    { src: CityImage, width: "w-20" },
    { src: Lcl, width: "w-40" },
    { src: Eal, width: "w-32" },
    { src: Cyber, width: "w-30" },
    { src: Institution, width: "w-44" },
    { src: CitationImage, width: "w-44" },
  ];

  return (
    <section className="bg-[#FFFFFF] overflow-hidden px-4 md:px-0">
      <div className="flex flex-wrap justify-center sm:justify-between items-center gap-6 sm:gap-4 max-w-7xl mx-auto py-8 sm:py-13 px-4 sm:px-6">
        {certifications.map((item, index) => (
          <div
            key={index}
            className={`relative ${item.width} h-12 sm:h-16 md:h-40 shrink-0`}
          >
            <Image
              src={item.src}
          
              alt={`Certification ${index + 1}`}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Certification;
