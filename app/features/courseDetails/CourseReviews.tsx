"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ArrowRight from "@/app/assets/svg/arrow-front.svg";
import ArrowBack from "@/app/assets/svg/arrow-back.svg";
import type { CoursecheckReview } from "@/lib/coursecheck/types";
import { Star } from "lucide-react";

const CARDS_PER_VIEW = 4;

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
          className={`w-4 h-4 ${
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-300 text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: CoursecheckReview }) {
  const rating = parseInt(review.rating, 10) || 5;
  const initials = review.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="bg-[#2E364B] p-5 md:p-6 rounded-lg flex flex-col text-white h-full min-h-[200px]">
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
      <p className="text-sm text-gray-300 line-clamp-5 flex-1">
        &quot;{review.comment.replace(/\n+/g, " ").trim()}&quot;
      </p>
    </div>
  );
}

interface CourseReviewsProps {
  reviews: CoursecheckReview[];
  companyId?: string | number;
  courseId?: string | number;
}

export default function CourseReviews({
  reviews,
  companyId = 188,
  courseId,
}: CourseReviewsProps) {
  const totalPages = Math.max(1, Math.ceil(reviews.length / CARDS_PER_VIEW));
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

  const visibleReviews = reviews.slice(startIndex, startIndex + CARDS_PER_VIEW);
  const currentPage = Math.floor(startIndex / CARDS_PER_VIEW);

  const coursecheckUrl = courseId
    ? `https://www.coursecheck.com/reviews/course/${courseId}?utm_source=website`
    : `https://www.coursecheck.com/reviews/provider/${companyId}?utm_source=website`;

  if (reviews.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto py-15 sm:py-30 md:px-0 px-4">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between md:items-start items-center gap-4 mb-6 px-0">
        <h2 className="text-black font-semibold text-[26px] sm:text-[30px] md:text-[34px]">
          What Our Students Say About This Course
        </h2>
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-5">
            <div
              onClick={totalPages > 1 ? goPrev : undefined}
              className={`h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-full shrink-0 transition-colors ${
                totalPages > 1
                  ? "bg-[#9A9A9A] hover:bg-[#016068] active:bg-[#0E7377] cursor-pointer"
                  : "bg-[#9A9A9A] opacity-50 cursor-not-allowed"
              }`}
              aria-label="Previous reviews"
            >
              <Image src={ArrowBack} alt="Previous" />
            </div>
            <div
              onClick={totalPages > 1 ? goNext : undefined}
              className={`h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-full shrink-0 transition-colors ${
                totalPages > 1
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
            <Link href={coursecheckUrl} target="_blank" rel="noopener noreferrer">
              See All Reviews
            </Link>
          </Button>
        </div>
      </div>

      <div
        className={`grid md:grid-cols-5 gap-4 sm:gap-6 px-0 mt-6 sm:mt-10 transition-opacity duration-300 ease-in-out ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {visibleReviews.map((review, i) => {
          const span =
            i === 0 || i === 3 ? "md:col-span-3" : "md:col-span-2";
          return (
            <div key={`${review.name}-${review.date}-${i}`} className={span}>
              <ReviewCard review={review} />
            </div>
          );
        })}
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
