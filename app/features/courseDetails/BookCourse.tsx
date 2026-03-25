"use client";
import React from "react";
import Image from "next/image";
import { BookCourseData } from "@/lib/types/course";
import { defaultBookCourseData } from "@/lib/constants/course";
import { CademyBookingIframe } from "./CademyBookingIframe";

interface BookCourseProps {
  data?: BookCourseData | null;
}

function BookCourse({ data }: BookCourseProps) {
  const course = data ?? defaultBookCourseData;

  const title = course.title ?? defaultBookCourseData.title;
  const prerequisites =
    course.prerequisites ?? defaultBookCourseData.prerequisites;
  const completionRewards =
    course.completionRewards ?? defaultBookCourseData.completionRewards ?? [];
  const qualifications =
    course.qualifications ?? defaultBookCourseData.qualifications ?? [];
  const cademyEmbedUrl = course.cademyEmbedUrl;

  if (typeof cademyEmbedUrl !== "string" || !cademyEmbedUrl.trim()) {
    return null;
  }

  return (
    <div className="bg-white" id="bookSection">
      <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="font-outfit font-bold text-3xl sm:text-4xl text-black mb-6 sm:mb-8">
          Book Course
        </h2>

        <div className="flex flex-col md:flex-row gap-6 md:gap-15 mb-8 sm:mb-10">
          <div className="flex items-stretch gap-3 flex-wrap sm:flex-nowrap">
            {prerequisites && (
              <div className="border border-gray-200 rounded-xl p-4 w-full sm:w-44 flex flex-col justify-between bg-gray-50">
                <p className="text-gray-800 font-semibold text-sm leading-snug mb-3">
                  Course <br /> Pre-Requisites:
                </p>
                <p className="text-gray-500 text-xs leading-5">
                  {prerequisites}
                </p>
              </div>
            )}

            {qualifications.slice(0, 1).map((q, i) =>
              q.accreditationLogo ? (
                <div
                  key={i}
                  className="border border-gray-200 rounded-xl p-4 w-36 flex flex-col items-center justify-between bg-gray-50"
                >
                  <Image
                    src={q.accreditationLogo}
                    alt={
                      q.accreditationLogoAlt ||
                      q.accreditedBy ||
                      "Accreditation"
                    }
                    width={90}
                    height={50}
                    className="object-contain"
                  />
                  <p className="text-[#14AE5C] bg-[#DCF2E9] p-2 py-1 rounded-full text-xs font-normal mt-4">
                    Accredited
                  </p>
                </div>
              ) : null,
            )}
          </div>

          {completionRewards.length > 0 && (
            <div className="flex flex-col justify-center">
              <p className="font-bold text-gray-800 text-base leading-snug mb-3">
                Upon completion of <br /> {title} participants receive:
              </p>
              {completionRewards.map((reward, i) => (
                <p key={i} className="text-gray-500 text-sm mb-2">
                  {reward}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="max-w-3xl mx-auto overflow-hidden">
          <CademyBookingIframe
            key={cademyEmbedUrl}
            src={cademyEmbedUrl}
            title="Course booking dates"
          />
        </div>
      </section>
    </div>
  );
}

export default BookCourse;
