import React from "react";
import Image from "next/image";
import { client } from "@/lib/sanity/client";
import { CertificationType } from "@/lib/types/certification";
import { CERTIFICATION_QUERY } from "@/lib/queries/certification";
import { urlFor } from "@/lib/sanity/image";

async function Certification() {
  const data = await client.fetch<CertificationType>(CERTIFICATION_QUERY);

  if (!data?.isActive || !data?.certifications?.length) return null;

  return (
    <section className="bg-[#FFFFFF] overflow-x-auto -mx-5 md:px-0 px-4">
      <div className="flex flex-wrap justify-center sm:justify-between items-center gap-6 sm:gap-4 max-w-7xl mx-auto py-8 sm:py-13 px-4 sm:px-6">
        {data.certifications.map((item) => (
          <div
            key={item._key}
            className={`relative ${item.width} h-12 sm:h-16 md:h-40 shrink-0`}
          >
            <Image
              src={urlFor(item.image).url()}
              alt={item.alt}
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