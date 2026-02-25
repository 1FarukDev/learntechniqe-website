"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import FirstImage from "@/app/assets/png/010763a3052b54b4c1698aa779c00ac7c6ee3d6e.jpg";
import SecondImage from "@/app/assets/png/22d5c2b039b0485213666e8075a240a93aa4bb9d.png";
import ThirdImage from "@/app/assets/png/32743f1db038b2a1c51268ee3d04b3737c7bef67.jpg";
import FourthImage from "@/app/assets/png/91724f879c93c0ea71a0732a9edf9f8fd2673dd9.jpg";
import FifthImage from "@/app/assets/png/c32f5d071246d318f77f18e8eb2891dfc0c3db1d.jpg";
import Image from "next/image";

const allImages = [
  ThirdImage,
  SecondImage,
  FifthImage,
  FirstImage,
  FourthImage,
];

const CARD_WIDTH = 280;
const CARD_GAP = 10;
const CARD_TOTAL = CARD_WIDTH + CARD_GAP;
const CARD_HEIGHT = 380;
const AUTO_SCROLL_SPEED = 1;
const AUTO_SCROLL_INTERVAL = 40;

const SET_WIDTH = allImages.length * CARD_TOTAL - CARD_GAP;
const LOOP_LENGTH = SET_WIDTH + CARD_GAP;

// Wheel effect: center = smaller (far), edges = bigger (close). Layout stays fixed; only transform changes.
function getWheelStyle(
  cardIndex: number,
  setIndex: number,
  scrollLeft: number,
  viewportWidth: number
) {
  const cardCenter = cardIndex * CARD_TOTAL + CARD_WIDTH / 2 + setIndex * LOOP_LENGTH;
  const viewportCenter = scrollLeft + viewportWidth / 2;
  const distanceFromCenter = cardCenter - viewportCenter;
  const halfWidth = viewportWidth / 2;
  const normalizedDist = Math.max(-1, Math.min(1, distanceFromCenter / halfWidth));

  const absDist = Math.abs(normalizedDist);
  const scale = 0.88 + absDist * 0.12;
  const rotateY = -normalizedDist * 10;

  return {
    transform: `perspective(1400px) rotateY(${rotateY}deg) scale(${scale})`,
    transformStyle: "preserve-3d" as const,
    transformOrigin: "center center",
  };
}

function Hero() {
  const [scrollPos, setScrollPos] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    let pos = el.scrollLeft;
    if (pos >= LOOP_LENGTH) {
      pos -= LOOP_LENGTH;
      el.scrollLeft = pos;
    }
    setScrollPos(pos);
    setViewportWidth(el.clientWidth);
  };

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateScrollState);
    };

    const onResize = () => setViewportWidth(scrollEl.clientWidth);
    setViewportWidth(scrollEl.clientWidth);

    const intervalId = setInterval(() => {
      const maxScroll = scrollEl.scrollWidth - scrollEl.clientWidth;
      if (maxScroll <= 0) return;

      let next = scrollEl.scrollLeft + AUTO_SCROLL_SPEED;
      if (next >= LOOP_LENGTH) next -= LOOP_LENGTH;
      scrollEl.scrollLeft = next;
    }, AUTO_SCROLL_INTERVAL);

    scrollEl.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      clearInterval(intervalId);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      scrollEl.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const renderImageCard = (
    src: (typeof allImages)[0],
    cardIndex: number,
    setIndex: number
  ) => {
    const wheelStyle =
      viewportWidth > 0
        ? getWheelStyle(cardIndex, setIndex, scrollPos, viewportWidth)
        : { transform: "scale(1)", transformStyle: "preserve-3d" as const };

    return (
      <div
        key={`${setIndex}-${cardIndex}`}
        className="relative overflow-hidden shrink-0 rounded-[15px] will-change-transform shadow-2xl"
        style={{
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          ...wheelStyle,
        }}
      >
        <Image
          src={src}
          alt={`Training facility ${cardIndex + 1}`}
          className="object-cover"
          fill
          sizes={`${CARD_WIDTH}px`}
        />
      </div>
    );
  };

  const imageRow = (setIndex: number) => (
    <div
      className="flex items-center shrink-0"
      style={{ width: SET_WIDTH, gap: CARD_GAP }}
    >
      {allImages.map((src, i) => renderImageCard(src, i, setIndex))}
    </div>
  );

  return (
    <div className="flex flex-col h-screen">
      <section className="flex flex-col items-center justify-center gap-5 text-center flex-shrink-0 pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-6 z-10 relative px-0">
        <h1 className="font-semibold text-[32px] sm:text-[44px] md:text-[56px] lg:text-[68px] leading-tight text-black">
          Electrical Skills for <br /> Everyone, by Experts.
        </h1>
        <p className="font-normal text-sm sm:text-base text-black max-w-2xl">
          Carefully put-together data-backed courses taught by seasoned experts.{" "}
          <br className="hidden sm:block" />
          Our processes and facilities are word-class with multiple credible
          accreditations.
        </p>
        <Button className="px-8 sm:px-12 py-5 sm:py-7 bg-[#01636B] text-[#F5F5F5] rounded-md uppercase text-sm sm:text-base">
          Find a course
        </Button>
      </section>

      <section
        className="relative w-full overflow-hidden flex-1 flex flex-col justify-center min-h-0"
        style={{ perspective: "2000px", perspectiveOrigin: "center center" }}
      >
        <div
          ref={scrollRef}
          className="w-full overflow-x-auto overflow-y-hidden no-scrollbar touch-pan-x py-6 flex-1 flex items-center"
          style={{ scrollBehavior: "auto", WebkitOverflowScrolling: "touch" }}
        >
          <div
            className="flex shrink-0"
            style={{ width: "max-content", gap: CARD_GAP }}
          >
            {imageRow(0)}
            {imageRow(1)}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;