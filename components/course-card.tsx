"use client";
import React from "react";
import Image from "next/image";
import CardImage from "@/app/assets/png/cardimage.png";
import Link from "next/link";
import { Button } from "./ui/button";
import type { CourseCardData } from "@/lib/course-categories";
import { getCategoryTag } from "@/lib/course-categories";

interface CourseCardProps {
  course?: CourseCardData;
  hrefPrefix?: string;
}

function CourseCard({ course, hrefPrefix = "/courses" }: CourseCardProps) {
  const title = course?.title ?? "Course Title";
  const slug = course?.slug ?? "#";
  const price = course?.price ?? "";
  const duration = course?.duration ?? "";
  const description = course?.description ?? "";
  const heroImage = course?.heroImage;
  const tags = course?.tags ?? [];

  const categoryTag = getCategoryTag(slug);
  const firstTag = tags[0];

  return (
    <Link
      href={`${hrefPrefix}/${slug}`}
      className="flex flex-col bg-[#FFF9ED] min-w-[220px] sm:min-w-[260px] max-w-[260px] sm:max-w-[300px] shrink-0 rounded-md overflow-hidden hover:shadow-lg transition-shadow h-full"
    >
      <div className="w-full relative h-44 sm:h-52 md:h-56">
        <Image
          src={heroImage || CardImage}
          alt={title}
          fill
          className="object-cover"
          sizes="300px"
          {...(heroImage ? { unoptimized: true } : {})}
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span
            className="text-white text-[10px] font-semibold px-2.5 py-1 rounded-sm"
            style={{ backgroundColor: categoryTag.color }}
          >
            {categoryTag.label}
          </span>
          {firstTag && (
            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-sm bg-white/85 backdrop-blur-sm text-gray-800 border border-white/50">
              {firstTag.label}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-1 px-3 sm:px-4 pb-3 sm:pb-4 pt-2">
        <h2 className="font-semibold text-base sm:text-lg text-black line-clamp-2 min-h-[2.75rem]">
          {title}
        </h2>

        <div className="flex items-start justify-between gap-2 mt-3 mb-3 min-w-0">
          {duration && (
            <p className="min-w-0 flex-1 text-[#9A9A9A] font-semibold text-xs sm:text-sm leading-snug line-clamp-3">
              {duration}
            </p>
          )}
          {price && (
            <span className="shrink-0 text-right text-[#14AE5C] font-bold text-sm sm:text-base">
              {price}
            </span>
          )}
        </div>

        <hr className="text-[#D2C4B3] mb-2" />

        {description ? (
          <p className="text-xs sm:text-sm line-clamp-3 flex-1">{description}</p>
        ) : (
          <p className="text-xs sm:text-sm text-gray-400 italic flex-1">
            Details coming soon.
          </p>
        )}

        <div className="mt-auto pt-4">
          <Button className="bg-[#14AE5C] w-full h-auto min-h-10 sm:min-h-11 normal-case text-xs sm:text-sm pointer-events-none px-2 py-2 leading-snug line-clamp-2">
            View More
          </Button>
        </div>
      </div>
    </Link>
  );
}

export default CourseCard;
