"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ArrowRight from "@/app/assets/svg/arrow-front.svg";
import ArrowBack from "@/app/assets/svg/arrow-back.svg";
import ReviewStar from "@/app/assets/svg/reviewStar.svg";
import { DEFAULT_REVIEWS, type Review } from "@/data/reviews";

const CARDS_PER_VIEW = 4;

/** Exact flex classes from original for each card index (0-3) */
const CARD_FLEX_CLASSES = [
  "flex items-stretch gap-4 w-full relative",
  "flex flex-row-reverse md:flex-row items-stretch gap-4 w-full",
  "flex flex-row-reverse md:flex-row items-stretch gap-4 w-full",
  "flex items-stretch gap-4 w-full",
];

/** For cards 0,1: image first. For cards 2,3: text first. */
const CARD_ORDER: ("image-first" | "text-first")[] = [
  "image-first",
  "image-first",
  "text-first",
  "text-first",
];

function ReviewCard({
  review,
  flexClass,
  order,
}: {
  review: Review;
  flexClass: string;
  order: "image-first" | "text-first";
}) {
  const imageEl = (
    <div className="relative shrink-0 w-40 sm:w-55 h-[200px] sm:h-[220px]">
      <div className="relative w-full h-full">
        <Image
          src={review.image}
          alt={review.name}
          fill
          className="rounded-lg object-cover"
        />
      </div>
      <div className="absolute bottom-4 left-0 bg-white px-4 py-2 text-black text-sm">
        <h4 className="font-semibold leading-none">{review.name}</h4>
        <p className="text-xs opacity-80">{review.age ?? ""}</p>
      </div>
    </div>
  );

  const contentEl = (
    <div className="bg-[#2E364B] p-3 md:p-6 rounded-lg flex flex-col justify-between text-white w-full min-h-[200px] sm:min-h-[220px]">
      <div className="flex flex-col min-h-0">
        <div className="flex gap-2 mb-4 justify-start shrink-0">
          {Array.from({ length: review.rating }).map((_, i) => (
            <Image
              key={i}
              src={ReviewStar}
              alt={`Star ${i + 1}`}
              className="md:w-5 md:h-5 w-3 h-3"
            />
          ))}
        </div>
        <hr className="shrink-0" />
        <h3 className="font-semibold text-base sm:text-lg my-2 shrink-0 line-clamp-1">{review.title}</h3>
        <p className="text-sm text-gray-300 line-clamp-4 flex-1 min-h-0">&quot;{review.text}&quot;</p>
      </div>
    </div>
  );

  return (
    <div className="flex h-full">
      <div className={flexClass}>
        {order === "image-first" ? (
          <>
            {imageEl}
            {contentEl}
          </>
        ) : (
          <>
            {contentEl}
            {imageEl}
          </>
        )}
      </div>
    </div>
  );
}

const TOTAL_PAGES = Math.ceil(DEFAULT_REVIEWS.length / CARDS_PER_VIEW);

function Ratings() {
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
    const prevPage = (Math.floor(startIndex / CARDS_PER_VIEW) - 1 + TOTAL_PAGES) % TOTAL_PAGES;
    goToPage(prevPage);
  };

  const goNext = () => {
    const nextPage = (Math.floor(startIndex / CARDS_PER_VIEW) + 1) % TOTAL_PAGES;
    goToPage(nextPage);
  };

  const visibleReviews = Array.from({ length: CARDS_PER_VIEW }, (_, i) => {
    const idx = (startIndex + i) % DEFAULT_REVIEWS.length;
    return DEFAULT_REVIEWS[idx];
  });

  const currentPage = Math.floor(startIndex / CARDS_PER_VIEW);

  return (
    <section className="max-w-7xl mx-auto py-15 sm:py-30 md:px-0 px-4">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between md:items-start items-center gap-4 mb-6 px-0">
        <h1 className="text-black font-semibold text-[26px] sm:text-[30px] md:text-[34px]">
          What Our Students Say About Us
        </h1>
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-5">
            <div
              onClick={TOTAL_PAGES > 1 ? goPrev : undefined}
              className={`h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-full shrink-0 transition-colors ${TOTAL_PAGES > 1
                  ? "bg-[#9A9A9A] hover:bg-[#016068] active:bg-[#0E7377] cursor-pointer"
                  : "bg-[#9A9A9A] opacity-50 cursor-not-allowed"
                }`}
              aria-label="Previous reviews"
            >
              <Image src={ArrowBack} alt="Previous" />
            </div>
            <div
              onClick={TOTAL_PAGES > 1 ? goNext : undefined}
              className={`h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-full shrink-0 transition-colors ${TOTAL_PAGES > 1
                  ? "bg-[#9A9A9A] hover:bg-[#016068] active:bg-[#0E7377] cursor-pointer"
                  : "bg-[#9A9A9A] opacity-50 cursor-not-allowed"
                }`}
              aria-label="Next reviews"
            >
              <Image src={ArrowRight} alt="Next" />
            </div>
          </div>
          <Button asChild className="uppercase bg-[#016068] h-12 sm:h-17.25 px-8 sm:px-15 text-sm sm:text-base">
            <Link
              href="https://www.coursecheck.com/provider/188/technique-training-ltd"
              target="_blank"
              rel="noopener noreferrer"
            >
              See All Reviews
            </Link>
          </Button>
        </div>
      </div>

      <div
        className={`grid md:grid-cols-2 gap-4 sm:gap-6 px-0 mt-6 sm:mt-10 transition-opacity duration-300 ease-in-out ${isTransitioning ? "opacity-0" : "opacity-100"
          }`}
      >
        {visibleReviews.map((review, i) => (
          <ReviewCard
            key={`${review.name}-${startIndex}-${i}`}
            review={review}
            flexClass={CARD_FLEX_CLASSES[i]}
            order={CARD_ORDER[i]}
          />
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i)}
            className="w-2.5 h-2.5 rounded-full transition-all duration-200"
            style={{
              backgroundColor: currentPage === i ? "#016068" : "rgba(0,0,0,0.2)",
            }}
            aria-label={`Go to review page ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default Ratings;
