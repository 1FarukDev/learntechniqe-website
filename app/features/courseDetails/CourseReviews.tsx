"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ArrowRight from "@/app/assets/svg/arrow-front.svg";
import ArrowBack from "@/app/assets/svg/arrow-back.svg";
import type { CoursecheckReview } from "@/lib/coursecheck/types";
import { Star } from "lucide-react";

const CARDS_PER_VIEW = 5;
const REVIEW_TRUNCATE_CHARS = 220;

const FALLBACK_REVIEWS: CoursecheckReview[] = [
  {
    name: "Michael B",
    date: "2026-03-27",
    rating: "5",
    comment:
      "The course tutor is a consummate Gentleman and is a good tutor. Highly recommended experience overall.",
  },
  {
    name: "Brandon C",
    date: "2026-03-27",
    rating: "5",
    comment:
      "Chris was absolutely brilliant. Explained everything clearly and made the course enjoyable from start to finish.",
  },
  {
    name: "Will D",
    date: "2026-03-20",
    rating: "5",
    comment:
      "Kingsley was a great tutor. Very knowledgeable and good at explaining points that seemed confusing in the handouts.",
  },
  {
    name: "Arnoldas M",
    date: "2026-03-13",
    rating: "5",
    comment:
      "Great course that will help me in my field of work. The practical sessions were hands-on and really valuable.",
  },
  {
    name: "Jamie T",
    date: "2026-02-28",
    rating: "5",
    comment:
      "Fantastic training centre with state-of-the-art equipment. The instructors genuinely care about your progress and make sure you leave confident.",
  },
];

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-300 text-gray-300"
            }`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: CoursecheckReview }) {
  const [expanded, setExpanded] = useState(false);
  const rating = parseInt(review.rating, 10) || 5;
  const initials = review.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const body = review.comment.replace(/\n+/g, " ").trim();
  const isLong = body.length > REVIEW_TRUNCATE_CHARS;

  return (
    <div className="bg-[#2E364B] p-5 md:p-6 rounded-lg flex flex-col text-white h-full w-full min-h-[200px] min-w-0">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-[#016068] flex items-center justify-center text-sm font-semibold shrink-0">
          {initials}
        </div>
        <div className="min-w-0">
          <h4 className="font-semibold text-sm leading-tight truncate">
            {review.name}
          </h4>
          <p className="text-xs text-gray-400">{formatDate(review.date)}</p>
        </div>
      </div>
      <StarRating rating={rating} />
      <hr className="border-gray-600 my-3" />
      <div className="flex flex-col flex-1 min-h-0">
        <p
          className={`text-sm text-gray-300 leading-relaxed ${!expanded && isLong
            ? "line-clamp-5"
            : expanded && isLong
              ? "max-h-48 sm:max-h-56 overflow-y-auto overscroll-y-contain pr-1 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.35)_transparent]"
              : ""
            }`}
        >
          &quot;{body}&quot;
        </p>
        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="mt-2 text-left text-xs font-semibold text-[#4DD9AC] hover:text-[#6EE4BC] underline underline-offset-2 shrink-0"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        )}
      </div>
    </div>
  );
}

interface CourseReviewsProps {
  reviews: CoursecheckReview[];
  companyId?: string | number;
  courseId?: string | number;
}

function getBentoClass(i: number): string {
  if (i < 3) return "col-span-1 sm:col-span-2";
  return "col-span-1 sm:col-span-3";
}

export default function CourseReviews({
  reviews,
  companyId = 188,
  courseId,
}: CourseReviewsProps) {
  const hasCourseReviews = reviews.length > 0;
  const displayedReviews = hasCourseReviews ? reviews : FALLBACK_REVIEWS;

  const totalPages = Math.max(1, Math.ceil(displayedReviews.length / CARDS_PER_VIEW));
  const [startIndex, setStartIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToPage = (page: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStartIndex(page * CARDS_PER_VIEW);
      setIsTransitioning(false);
    }, 150);
  };

  const goPrev = () => {
    const prevPage =
      (Math.floor(startIndex / CARDS_PER_VIEW) - 1 + totalPages) % totalPages;
    goToPage(prevPage);
  };

  const goNext = () => {
    const nextPage =
      (Math.floor(startIndex / CARDS_PER_VIEW) + 1) % totalPages;
    goToPage(nextPage);
  };

  const visibleReviews = displayedReviews.slice(startIndex, startIndex + CARDS_PER_VIEW);
  const currentPage = Math.floor(startIndex / CARDS_PER_VIEW);

  const coursecheckUrl = hasCourseReviews && courseId
    ? `https://www.coursecheck.com/reviews/course/${courseId}?utm_source=website`
    : `https://www.coursecheck.com/reviews/provider/${companyId}?utm_source=website`;

  return (
    <section className="max-w-7xl mx-auto py-15 sm:py-30 md:px-0 px-4">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between md:items-start items-center gap-4 mb-6 px-0">
        <h2 className="text-black font-semibold text-[26px] sm:text-[30px] md:text-[34px]">
          {hasCourseReviews
            ? "What Our Students Say About This Course"
            : "What Our Students Say About Us"}
        </h2>
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-5">
            <div
              onClick={totalPages > 1 ? goPrev : undefined}
              className={`h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-full shrink-0 transition-colors ${totalPages > 1
                ? "bg-[#9A9A9A] hover:bg-[#016068] active:bg-[#0E7377] cursor-pointer"
                : "bg-[#9A9A9A] opacity-50 cursor-not-allowed"
                }`}
              aria-label="Previous reviews"
            >
              <Image src={ArrowBack} alt="Previous" />
            </div>
            <div
              onClick={totalPages > 1 ? goNext : undefined}
              className={`h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-full shrink-0 transition-colors ${totalPages > 1
                ? "bg-[#9A9A9A] hover:bg-[#016068] active:bg-[#0E7377] cursor-pointer"
                : "bg-[#9A9A9A] opacity-50 cursor-not-allowed"
                }`}
              aria-label="Next reviews"
            >
              <Image src={ArrowRight} alt="Next" />
            </div>
          </div>
          <Button
            asChild
            className="uppercase bg-[#016068] h-12 sm:h-17.25 px-8 sm:px-15 text-sm sm:text-base"
          >
            <Link
              href={coursecheckUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              See All Reviews
            </Link>
          </Button>
        </div>
      </div>

      <div
        className={`grid grid-cols-1 sm:grid-cols-6 gap-4 sm:gap-6 mt-6 sm:mt-10 transition-opacity duration-300 ease-in-out ${isTransitioning ? "opacity-0" : "opacity-100"
          }`}
      >
        {visibleReviews.map((review, i) => (
          <div
            key={`${startIndex}-${i}-${review.name}-${review.date}`}
            className={`min-w-0 flex h-full ${getBentoClass(i)}`}
          >
            <ReviewCard review={review} />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i)}
              className="w-2.5 h-2.5 rounded-full transition-all duration-200"
              style={{
                backgroundColor:
                  currentPage === i ? "#016068" : "rgba(0,0,0,0.2)",
              }}
              aria-label={`Go to review page ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
