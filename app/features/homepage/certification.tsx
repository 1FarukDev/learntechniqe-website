import React from "react";
import Image from "next/image";
import { client } from "@/lib/sanity/client";
import type { CertificationItem, CertificationType } from "@/lib/types/certification";
import { CERTIFICATION_QUERY } from "@/lib/queries/certification";
import { urlFor } from "@/lib/sanity/image";

/** Apply fixed widths from Sanity only at md+ so mobile can use flex-1 and stay on one row */
const WIDTH_MD: Record<CertificationItem["width"], string> = {
  "w-20": "md:w-20",
  "w-30": "md:w-30",
  "w-32": "md:w-32",
  "w-40": "md:w-40",
  "w-44": "md:w-44",
};

async function Certification() {
  const data = await client.fetch<CertificationType>(CERTIFICATION_QUERY);

  if (!data?.isActive || !data?.certifications?.length) return null;

  return (
    <section className="bg-[#FFFFFF] overflow-hidden px-4 md:px-0">
      <div className="max-w-7xl mx-auto py-8 sm:py-13 px-4 sm:px-6 my-6">
        <div className="flex flex-nowrap items-center justify-between gap-1.5 sm:gap-3 md:gap-4 w-full">
          {data.certifications.map((item) => (
            <div
              key={item._key}
              className={`relative h-8 sm:h-12 md:h-40 min-w-0 flex-1 basis-0 shrink md:flex-none ${WIDTH_MD[item.width]}`}
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
      </div>
    </section>
  );
}

export default Certification;