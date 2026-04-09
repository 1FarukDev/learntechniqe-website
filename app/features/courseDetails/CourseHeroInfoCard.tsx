"use client";

import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Clock from "@/app/assets/svg/clock.svg";
import Cap from "@/app/assets/svg/cap.svg";
import {
  CourseEnquiryForm,
  type CourseEnquiryFormHandle,
} from "./CourseEnquiryForm";
import type { CourseQualification, CourseTag } from "@/lib/types/course";
import { ChevronDown, ChevronUp } from "lucide-react";

const COLLAPSED_MAX_HEIGHT_PX = 380;

interface CourseHeroInfoCardProps {
  title: string;
  slug: string;
  price: string;
  expertiseTags?: CourseTag[];
  qualifications: CourseQualification[];
  duration?: string;
  durationNote?: string;
  durationNoteLink?: string;
  requestOverviewLink?: string;
  onBookNow?: () => void;
  bookingAvailable?: boolean;
  isPathway?: boolean;
}

function CourseHeroInfoCard({
  title,
  slug,
  price,
  expertiseTags = [],
  qualifications,
  duration,
  durationNote,
  durationNoteLink = "Please get in touch",
  requestOverviewLink: _requestOverviewLink = "#",
  onBookNow,
  bookingAvailable = true,
  isPathway = false,
}: CourseHeroInfoCardProps) {
  const scrollableRef = useRef<HTMLDivElement>(null);
  const enquiryFormRef = useRef<CourseEnquiryFormHandle>(null);
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);

  const measureOverflow = useCallback(() => {
    const el = scrollableRef.current;
    if (!el || expanded || qualifications.length === 0) return;
    setCanExpand(el.scrollHeight > el.clientHeight + 2);
  }, [expanded, qualifications.length]);

  useLayoutEffect(() => {
    measureOverflow();
  }, [measureOverflow, qualifications]);

  useLayoutEffect(() => {
    if (expanded) return;
    const el = scrollableRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => measureOverflow());
    ro.observe(el);
    return () => ro.disconnect();
  }, [expanded, measureOverflow]);

  return (
    <div className="w-full lg:w-[50%] p-6 sm:p-8 flex flex-col gap-5 bg-white rounded-2xl overflow-hidden min-h-0">
      <div className="flex flex-row items-start justify-between gap-2 sm:gap-4">
        <div className="min-w-0 flex-1 pr-2">
          <p className="text-[#14AE5C] font-outfit font-bold text-4xl sm:text-5xl">
            {price.split("+")[0].trim()}
            {price.includes("+") && (
              <span className="text-base font-semibold ml-2 text-black/80">
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
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })} + VAT`}
              )
            </p>
          )}
        </div>
        {expertiseTags.length > 0 && (
          <div className="flex max-w-[50%] shrink-0 flex-wrap items-start justify-end gap-1.5 pt-0.5 sm:max-w-[55%] sm:gap-2 sm:pt-1">
            {expertiseTags.map((tag, i) => (
              <span
                key={i}
                className="text-xs font-semibold px-4 py-1.5 rounded-sm bg-[#E9FDFF] text-[#016068] border border-[#016068]/20"
              >
                {tag.label}
              </span>
            ))}
          </div>
        )}
      </div>

      {qualifications.length > 0 && (
        <div className="flex flex-col gap-3 min-h-0">
          <div className="flex shrink-0 items-center gap-2">
            <span className="text-[#016068]">
              <Image src={Cap} alt="cap icon" width={20} height={20} />
            </span>
            <h3 className="text-[#016068] font-outfit font-bold text-sm sm:text-base">
              What is Obtained/Achieved?
            </h3>
          </div>

          <div
            ref={scrollableRef}
            className={
              expanded
                ? "min-h-0"
                : "min-h-0 max-h-[min(28vh,var(--hero-card-max))] overflow-y-auto overscroll-contain pr-1 -mr-1 [scrollbar-gutter:stable] scroll-smooth"
            }
            style={
              {
                "--hero-card-max": `${COLLAPSED_MAX_HEIGHT_PX}px`,
              } as React.CSSProperties
            }
          >
            <div className="space-y-4">
              {qualifications.map((q, i) => (
                <div
                  key={i}
                  className="flex flex-row items-start sm:items-center justify-between gap-3 sm:gap-4"
                >
                  <p className="text-black font-semibold text-sm leading-snug flex-1">
                    {q.title}
                  </p>
                  {q.accreditationLogo && (
                    <div className="shrink-0 border-[.5px] border-gray-200 rounded-md px-3 py-2 flex md:flex-row flex-col gap-3 items-center gap-1.5 text-xs text-gray-400">
                      {q.accreditedBy && <span>Accredited by</span>}
                      <Image
                        src={q.accreditationLogo}
                        alt={
                          q.accreditationLogoAlt ||
                          q.accreditedBy ||
                          "Accreditation"
                        }
                        width={(q.accreditationLogoAlt === 'EAL logo') ? 150 : 60}
                        height={(q.accreditationLogoAlt === 'EAL logo') ? 80 : 40}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {(canExpand || expanded) && (
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#016068]/25 bg-[#016068]/5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#016068] transition hover:bg-[#016068]/10"
            >
              {expanded ? (
                <>
                  Show less
                  <ChevronUp className="h-4 w-4" aria-hidden />
                </>
              ) : (
                <>
                  Show all qualifications
                  <ChevronDown className="h-4 w-4" aria-hidden />
                </>
              )}
            </button>
          )}
        </div>
      )}

      {duration && (
        <div className="shrink-0">
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
        <div className="shrink-0 bg-[#E9FDFF] rounded-md">
          <p className="text-black text-xs leading-6 p-3">
            {durationNote}{" "}
            <button
              type="button"
              onClick={() => enquiryFormRef.current?.open()}
              className="text-green-600 underline hover:opacity-80 p-0 align-baseline font-inherit text-xs leading-6 bg-transparent border-0 cursor-pointer"
            >
              {durationNoteLink}
            </button>{" "}
            if you would like to discuss the exact course dates for each module.
          </p>
        </div>
      )}

      <div className={`grid ${isPathway ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"} gap-3 sm:gap-5 shrink-0`}>
        <Button
          type="button"
          onClick={onBookNow}
          className="bg-[#F5A623] hover:bg-[#e09410] text-white font-outfit font-semibold uppercase tracking-widest text-xs sm:text-sm h-12 sm:h-14"
        >
          {isPathway ? "Enquire Now" : bookingAvailable ? "Book Now" : "Request course overview"}
        </Button>
        {!isPathway && (
          <CourseEnquiryForm
            ref={enquiryFormRef}
            courseName={title}
            courseUrl={`/courses/${slug}`}
          />
        )}
      </div>
    </div>
  );
}

export default CourseHeroInfoCard;