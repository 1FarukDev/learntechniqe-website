"use client";
import React from "react";
import Image from "next/image";
import { BookCourseData } from "@/lib/types/course";
import { defaultBookCourseData } from "@/lib/constants/course";

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
  const cademyEmbedUrl =
    course.cademyEmbedUrl ?? defaultBookCourseData.cademyEmbedUrl;

  return (
    <div className="bg-white">
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

        <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border-gray-100">
          {cademyEmbedUrl ? (
            <iframe
              src={cademyEmbedUrl}
              frameBorder="0"
              className="w-full"
              style={{
                minHeight: "clamp(400px, 80vh, 1000px)",
                height: "auto",
              }}
              scrolling="no"
              onLoad={(e) => {
                const iframe = e.currentTarget;
                try {
                  const height =
                    iframe.contentWindow?.document.body.scrollHeight;
                  if (height) iframe.style.height = height + "px";
                } catch {
                  // cross-origin fallback
                }
              }}
              sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-forms allow-modals allow-pointer-lock allow-storage-access-by-user-activation allow-top-navigation allow-top-navigation-by-user-activation allow-top-navigation-to-custom-protocols allow-presentation"
              title="Course booking dates"
            />
          ) : (
            <p className="text-center text-gray-500 py-10">
              No dates currently available. Please check back soon.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default BookCourse;
