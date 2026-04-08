"use client";

import React from "react";
import Image from "next/image";
import HeroImage from "@/app/assets/png/coursedetails.jpg";
import { RequestCourseOverview } from "./RequestCourseOverview";
import CourseHeroInfoCard from "./CourseHeroInfoCard";
import { CourseHeroData } from "@/lib/types/course";
import { defaultCourseHeroData } from "@/lib/constants/course";
import { urlFor } from "@/lib/sanity/image";
import { getCategoryTag } from "@/lib/course-categories";

interface CourseHeroProps {
  data?: CourseHeroData | null;
  isPathway?: boolean;
}

function CourseHero({ data, isPathway = false }: CourseHeroProps) {
  const course = data ?? defaultCourseHeroData;

  const {
    title,
    slug,
    heroImage,
    price,
    duration,
    durationNote,
    durationNoteLink = "Please get in touch",
    requestOverviewLink = "#",
    bookingAvailable = true,
  } = course;

  const tags = course.tags ?? [];
  const categoryTag = getCategoryTag(slug);
  const expertiseTags = tags.filter(
    (t) => !/popular/i.test((t.label ?? "").trim()),
  );
  const description = course.description ?? [];
  const qualifications = course.qualifications ?? [];

  const handleBookNow = () => {
    if (isPathway) {
      const enquirySection = document.getElementById("enquirySection");
      if (enquirySection) {
        enquirySection.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }
    const bookSection = document.getElementById("bookSection");
    if (bookSection) {
      bookSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleEnquireClick = () => {
    const enquirySection = document.getElementById("enquirySection");
    if (enquirySection) {
      enquirySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full overflow-hidden">
      <Image
        src={heroImage ? urlFor(heroImage).url() : HeroImage}
        alt={title}
        fill
        className="object-cover object-center z-0"
      />

      <div className="absolute inset-0 z-10 bg-linear-to-br from-[rgba(0,140,140,0.90)] via-[rgba(0,100,110,0.95)] to-[rgba(0,60,80,1)]" />

      <div className="relative z-20 max-w-7xl mx-auto md:px-0 px-4 sm:px-6 py-20 sm:py-28 lg:py-35 flex flex-col lg:justify-between lg:flex-row items-start gap-8 lg:gap-12">
        <div className="w-full lg:w-[50%]  text-white">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5 sm:mb-6">
            <span
              className="text-white text-xs font-semibold px-4 py-1.5 rounded-sm"
              style={{ backgroundColor: categoryTag.color }}
            >
              {categoryTag.label}
            </span>
            {expertiseTags.map((tag, i) => (
              <span
                key={i}
                className="text-xs font-semibold px-4 py-1.5 rounded-sm bg-white/85 backdrop-blur-sm text-gray-900 border border-white/50"
              >
                {tag.label}
              </span>
            ))}
          </div>

          <h1 className="font-outfit font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight mb-5 sm:mb-6">
            {title}
          </h1>

          {description.length > 0 && (
            <div className="space-y-3 text-white text-sm sm:text-base leading-7">
              {description.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          )}
          {course.summary && (
            <p className="mt-4 text-white/70 text-sm sm:text-base leading-7 italic">
              {course.summary}
            </p>
          )}

          {isPathway ? (
            <button
              type="button"
              onClick={handleEnquireClick}
              className="inline-block mt-6 sm:mt-8 text-[#4DD9AC] font-semibold text-sm underline underline-offset-4 hover:text-white transition-colors text-left"
            >
              Enquire Now
            </button>
          ) : (
            bookingAvailable && (
              <RequestCourseOverview
                courseName={title}
                courseUrl={`/courses/${slug}`}
              />
            )
          )}
        </div>

        <CourseHeroInfoCard
          title={title}
          slug={slug}
          price={price}
          qualifications={qualifications}
          duration={duration}
          durationNote={durationNote}
          durationNoteLink={durationNoteLink}
          requestOverviewLink={requestOverviewLink}
          onBookNow={handleBookNow}
          bookingAvailable={bookingAvailable}
          isPathway={isPathway}
        />
      </div>
    </section>
  );
}

export default CourseHero;
