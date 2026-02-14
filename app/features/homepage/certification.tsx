import React from "react";
import Image from "next/image";
import CityImage from "@/app/assets/certifications/city.png";
import Cyber from "@/app/assets/certifications/cyber.png";
import Eal from "@/app/assets/certifications/eal.png";
import Lcl from "@/app/assets/certifications/lcl.png";
import Institution from "@/app/assets/certifications/institution.png";

function Certification() {
  const certifications = [
    { src: CityImage, width: "w-20" },
    { src: Lcl, width: "w-40" },
    { src: Eal, width: "w-32" },
    { src: Cyber, width: "w-30" },
    { src: Institution, width: "w-44" },
  ];

  return (
    <section className="bg-[#ECF0F0]">
      <div className="flex justify-between items-center max-w-7xl mx-auto py-13">
        {certifications.map((item, index) => (
          <div key={index} className={`relative ${item.width} h-20`}>
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
