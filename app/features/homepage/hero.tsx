"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import FirstImage from "@/app/assets/png/010763a3052b54b4c1698aa779c00ac7c6ee3d6e.jpg";
import SecondImage from "@/app/assets/png/22d5c2b039b0485213666e8075a240a93aa4bb9d.png";
import ThirdImage from "@/app/assets/png/32743f1db038b2a1c51268ee3d04b3737c7bef67.jpg";
import FourthImage from "@/app/assets/png/91724f879c93c0ea71a0732a9edf9f8fd2673dd9.jpg";
import FifthImage from "@/app/assets/png/c32f5d071246d318f77f18e8eb2891dfc0c3db1d.jpg";
import Image from "next/image";
import { CourseSearchModal } from "@/components/course-search-modal";

const allImages = [
  ThirdImage,
  SecondImage,
  FifthImage,
  FirstImage,
  FourthImage,
];

const cards = [
  { height: "500px", flex: "1.8", margin: "0 -40px 0 0" },
  { height: "340px", flex: "1.3", margin: "0 0px 0 0px" },
  { height: "300px", flex: "1", margin: "0 0px 0 0px" },
  { height: "340px", flex: "1.3", margin: "0 -36px 0 0px" },
  { height: "500px", flex: "1.8", margin: "0 0 0 0px" },
];

const transforms = [
  "perspective(200px) rotateY(15deg) rotateX(0deg) translateZ(-30px)",
  "perspective(300px) rotateY(8deg) rotateX(-1deg) translateZ(-20px)",
  "perspective(2000px) rotateY(0deg) rotateX(0deg) translateZ(0px)",
  "perspective(300px) rotateY(-8deg) rotateX(-1deg) translateZ(-20px)",
  "perspective(200px) rotateY(-15deg) rotateX(0deg) translateZ(-20px)",
];

function Hero() {
  const [offset, setOffset] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="pt-40">
      <section className="flex flex-col items-center justify-center gap-5 text-center z-10 relative">
        <h1 className="font-outfit font-semibold text-[40px] sm:text-[44px] md:text-[56px] lg:text-[68px] leading-tight text-black">
          Electrical Skills for <br /> Everyone, by Experts.
        </h1>
        <p className="font-normal text-base text-black">
          Carefully put-together data-backed courses taught by seasoned experts.{" "}
          <br />
          Our processes and facilities are word-class with multiple credible
          accreditations.
        </p>
        <div className="mb-12 md:mb-16">
          <Button
            onClick={() => setSearchOpen(true)}
            className="px-12 py-7 bg-[#01636B] text-[#F5F5F5] rounded-md uppercase"
          >
            Find a course
          </Button>
        </div>
      </section>

      {/* Mobile: single image wheel carousel - one at a time with wheel-style dots */}
      <section className="md:hidden relative w-full px-4 -mt-4">
        <div
          className="relative w-full max-w-sm mx-auto aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
          style={{
            perspective: "1200px",
            perspectiveOrigin: "center center",
          }}
        >
          <div className="absolute inset-0 rounded-2xl bg-black/5">
            {allImages.map((src, imgIdx) => {
              const isActive = (offset % allImages.length) === imgIdx;
              return (
                <Image
                  key={imgIdx}
                  src={src}
                  alt={`Training facility ${imgIdx + 1}`}
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl transition-opacity duration-700 ease-in-out"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: "translateZ(0)",
                  }}
                  fill
                  sizes="100vw"
                />
              );
            })}
          </div>
        </div>
        {/* Wheel-style circular dot indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {allImages.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                (offset % allImages.length) === i
                  ? "bg-[#01636B] scale-125"
                  : "bg-[#9A9A9A]/60"
              }`}
              onClick={() => setOffset(i)}
            />
          ))}
        </div>
      </section>

      {/* Desktop: 3-card wheel layout (left, center, right) */}
      <section className="hidden md:block relative w-full -my-10 -mt-30">
        <div
          className="flex items-center justify-center w-full"
          style={{
            perspective: "2000px",
            perspectiveOrigin: "center center",
          }}
        >
          {cards.map((card, index) => {
            const imageIndex = (index + offset) % allImages.length;

            return (
              <div
                key={index}
                className="relative overflow-hidden shadow-2xl"
                style={{
                  height: card.height,
                  flex: card.flex,
                  borderRadius: "15px",
                  margin: card.margin,
                  transform: transforms[index],
                  transformStyle: "preserve-3d",
                }}
              >
                {allImages.map((src, imgIdx) => (
                  <Image
                    key={imgIdx}
                    src={src}
                    alt={`Training facility ${imgIdx + 1}`}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
                    style={{
                      opacity: imgIdx === imageIndex ? 1 : 0,
                    }}
                    fill
                    sizes="33vw"
                  />
                ))}
              </div>
            );
          })}
        </div>
      </section>

      <CourseSearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
}

export default Hero;
