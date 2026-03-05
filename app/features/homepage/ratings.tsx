import { Button } from "@/components/ui/button";
import React from "react";
import FirstImage from "@/app/assets/png/review1.png";
import SecondImage from "@/app/assets/png/review2.png";
import ThirdImage from "@/app/assets/png/review3.png";
import FourthImage from "@/app/assets/png/review4.png";
import ReviewStar from "@/app/assets/svg/reviewStar.svg";
import Image from "next/image";

function Ratings() {
  return (
    <section className="max-w-5xl mx-auto py-15 sm:py-30 md:px-0 px-4">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between md:items-start items-center gap-4 mb-6 px-0">
        <h1 className="text-black font-semibold text-[20px] sm:text-[30px] md:text-[34px]">
          What Our Students Say About Us
        </h1>
        <div className="flex items-center gap-8">
          <Button className="uppercase bg-[#016068] h-12 sm:h-17.25 px-8 sm:px-15 text-sm sm:text-base">
            See All Reviews
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-6 px-0 mt-6 sm:mt-10">
        {/* Card 1 — image first on both mobile and desktop */}
        <div className="flex h-full">
          <div className="flex items-stretch gap-4 w-full relative">
            <div className="relative shrink-0 w-40 sm:w-55 h-full">
              <div className="relative w-full h-full">
                <Image
                  src={FirstImage}
                  alt="Review 1"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>

              <div className="absolute bottom-4 left-0 bg-white px-4 py-2 text-black text-sm">
                <h4 className="font-semibold leading-none">Michael</h4>
                <p className="text-xs opacity-80">32</p>
              </div>
            </div>

            <div className="bg-[#2E364B] p-3 md:p-6 rounded-lg flex flex-col justify-between text-white w-full h-full">
              <div>
                <div className="flex gap-2 mb-4 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Image
                      key={star}
                      src={ReviewStar}
                      alt={`Star ${star}`}
                      className="md:w-5 md:h-5 w-3 h-3"
                    />
                  ))}
                </div>

                <hr />

                <h3 className="font-semibold text-base sm:text-lg my-2">
                  Amazing Classes
                </h3>

                <p className="text-sm text-gray-300">
                  "What can I say, will recommend this course to all my work
                  colleagues. Also Wendy was a star from start to finish."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 — text first on desktop, image first on mobile (flex-row-reverse on mobile) */}
        <div className="flex h-full">
          <div className="flex flex-row-reverse md:flex-row items-stretch gap-4 w-full">
            <div className="relative shrink-0 w-40 sm:w-55 h-full">
              <div className="relative w-full h-full">
                <Image
                  src={SecondImage}
                  alt="Review 2"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>

              <div className="absolute bottom-4 left-0 bg-white px-4 py-2 text-black text-sm">
                <h4 className="font-semibold leading-none">Max</h4>
                <p className="text-xs opacity-80">29</p>
              </div>
            </div>

            <div className="bg-[#2E364B] p-3 md:p-6 rounded-lg flex flex-col justify-between text-white w-full h-full">
              <div>
                <div className="flex gap-2 justify-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Image
                      key={star}
                      src={ReviewStar}
                      alt={`Star ${star}`}
                      className="md:w-5 md:h-5 w-3 h-3"
                    />
                  ))}
                </div>
                <hr />
                <h3 className="font-semibold text-base sm:text-lg my-2">
                  Great Learning Experience
                </h3>

                <p className="text-sm text-gray-300">
                  "The course structure was excellent and easy to follow. Highly
                  recommend to anyone wanting to level up their skills."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 — text first on desktop, image first on mobile (flex-row-reverse on mobile) */}
        <div className="flex h-full">
          <div className="flex flex-row-reverse md:flex-row items-stretch gap-4 w-full">
            <div className="bg-[#2E364B] p-3 md:p-6 rounded-lg flex flex-col justify-between text-white w-full h-full">
              <div>
                <div className="flex gap-2 justify-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Image
                      key={star}
                      src={ReviewStar}
                      alt={`Star ${star}`}
                      className="md:w-5 md:h-5 w-3 h-3"
                    />
                  ))}
                </div>
                <hr />
                <h3 className="font-semibold text-base sm:text-lg my-2">
                  Supportive Instructors
                </h3>

                <p className="text-sm text-gray-300">
                  "The instructors were incredibly helpful and supportive
                  throughout the entire journey."
                </p>
              </div>
            </div>
            <div className="relative shrink-0 w-40 sm:w-50 h-full">
              <div className="relative w-full h-full">
                <Image
                  src={ThirdImage}
                  alt="Review 3"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>

              <div className="absolute bottom-4 left-0 bg-white px-4 py-2 text-black text-sm">
                <h4 className="font-semibold leading-none">Sophia</h4>
                <p className="text-xs opacity-80">26</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4 — text first on desktop, image first on mobile (flex-row-reverse on mobile) */}
        <div className="flex h-full">
          <div className="flex items-stretch gap-4 w-full">
            <div className="bg-[#2E364B] p-3 md:p-6 rounded-lg flex flex-col justify-between text-white w-full h-full">
              <div>
                <div className="flex gap-2 justify-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Image
                      key={star}
                      src={ReviewStar}
                      alt={`Star ${star}`}
                      className="md:w-5 md:h-5 w-3 h-3"
                    />
                  ))}
                </div>
                <hr />
                <h3 className="font-semibold text-base sm:text-lg my-2">
                  Worth Every Penny
                </h3>

                <p className="text-sm text-gray-300">
                  "Excellent content and real-world examples. I feel much more
                  confident after completing this course."
                </p>
              </div>
            </div>
            <div className="relative shrink-0 w-40 sm:w-50 h-full">
              <div className="relative w-full h-full">
                <Image
                  src={FourthImage}
                  alt="Review 4"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>

              <div className="absolute bottom-4 left-0 bg-white px-4 py-2 text-black text-sm">
                <h4 className="font-semibold leading-none">Daniel</h4>
                <p className="text-xs opacity-80">35</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Ratings;
