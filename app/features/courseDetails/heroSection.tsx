import React from "react";
import Image from "next/image";
import HeroImage from "@/app/assets/png/coursedetails.jpg";
import { Button } from "@/components/ui/button";
import Clock from "@/app/assets/svg/clock.svg";
import Cap from "@/app/assets/svg/cap.svg";
import { CourseEnquiryForm } from "./CourseEnquiryForm";
import { RequestCourseOverview } from "./RequestCourseOverview";
import { CourseHeroData } from "@/lib/types/course";
import { defaultCourseHeroData } from "@/lib/constants/course";
import { urlFor } from "@/lib/sanity/image";

interface CourseHeroProps {
  data?: CourseHeroData | null;
}

function CourseHero({ data }: CourseHeroProps) {
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
  } = course;

  const tags = course.tags ?? [];
  const description = course.description ?? [];
  const qualifications = course.qualifications ?? [];

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
          {tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5 sm:mb-6">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-white text-xs font-semibold px-4 py-1.5 rounded-sm"
                  style={{ backgroundColor: tag.color }}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          )}

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

          <RequestCourseOverview
            courseName={title}
            courseUrl={`/courses/${slug}`}
          />
        </div>

        <div className="w-full lg:w-[50%] p-6 sm:p-8 flex flex-col gap-5 bg-white rounded-2xl overflow-hidden">
          <div>
            <p className="text-[#14AE5C] font-outfit font-bold text-4xl sm:text-5xl">
              {price.split("+")[0].trim()}
              {price.includes("+") && (
                <span className="text-base   font-semibold ml-2 text-black/80">
                  +{price.split("+")[1]}
                </span>
              )}
            </p>
            {price.includes("+") && (
              <p className="text-black font-semibold text-sm mt-1">
                (
                {price
                  .split("+")[0]
                  .trim()
                  .replace(/[^0-9.]/g, "") &&
                  `£${(
                    parseFloat(
                      price
                        .split("+")[0]
                        .trim()
                        .replace(/[^0-9.,]/g, "")
                        .replace(",", ""),
                    ) * 1.2
                  ).toLocaleString("en-GB", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })} inc VAT`}
                )
              </p>
            )}
          </div>

          {qualifications.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#016068]">
                  <Image src={Cap} alt="cap icon" width={20} height={20} />
                </span>
                <h3 className="text-[#016068] font-outfit font-bold text-sm sm:text-base">
                  What is Obtained/Achieved?
                </h3>
              </div>

              <div className="space-y-4 mt-2">
                {qualifications.map((q, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4"
                  >
                    <p className="text-black font-semibold text-sm leading-snug flex-1">
                      {q.title}
                    </p>
                    {q.accreditationLogo && (
                      <div className="shrink-0 border-[.5px] border-gray-200 rounded-md px-3 py-2 flex items-center gap-1.5 text-xs text-gray-400">
                        {q.accreditedBy && <span>Accredited by</span>}
                        <Image
                          src={q.accreditationLogo}
                          alt={
                            q.accreditationLogoAlt ||
                            q.accreditedBy ||
                            "Accreditation"
                          }
                          width={60}
                          height={40}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {duration && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#016068]">
                  <Image src={Clock} alt="clock icon" width={20} height={20} />
                </span>
                <h3 className="text-[#016068] font-outfit font-bold text-sm sm:text-base">
                  Course Duration:
                </h3>
              </div>
              <p className="text-black font-bold text-sm">{duration}</p>
            </div>
          )}

          {durationNote && (
            <div className="bg-[#E9FDFF] rounded-md">
              <p className="text-black text-xs leading-6 p-3">
                {durationNote}{" "}
                <a
                  href={requestOverviewLink}
                  className="text-green-600 underline hover:opacity-80"
                >
                  {durationNoteLink}
                </a>{" "}
                if you would like to discuss the exact course dates for each
                module.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
            <Button className="bg-[#F5A623] hover:bg-[#e09410] text-white font-outfit font-semibold uppercase tracking-widest text-xs sm:text-sm h-12 sm:h-14">
              Book Now
            </Button>
            <CourseEnquiryForm
              courseName={title}
              courseUrl={`/courses/${slug}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CourseHero;
