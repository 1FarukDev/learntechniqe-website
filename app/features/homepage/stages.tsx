import React from "react";
import FirstStar from "@/app/assets/svg/1star.svg";
import SecondStar from "@/app/assets/svg/2card.svg";
import ThirdStar from "@/app/assets/svg/3stars.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function Stages() {
  return (
    <main className="flex md:px-0 px-4 flex-col items-center justify-center gap-6 w-full mt-20 sm:mt-16 md:mt-35 text-center max-w-7xl mx-auto ">
      <h1 className="font-semibold text-[32px] sm:text-[44px] md:text-[56px] lg:text-[68px] leading-tight text-black px-2">
        There’s a Course For Everyone
      </h1>
      <p className="font-normal text-sm sm:text-base text-black px-2">
        Whether you are new to the electrical industry, an experienced
        electrician,
        <br className="hidden sm:block" /> or in an allied trade, we can help find the right course for you
      </p>
      <section className="flex flex-col lg:flex-row items-stretch justify-center gap-6 sm:gap-10 w-full my-12 sm:my-16 md:my-20">
        <div className="bg-[#D4D8DB] w-full lg:w-1/2 pt-10 sm:pt-15 pb-5 px-6 sm:px-10 rounded-2xl border border-[#bcbdbd] flex flex-col">
          <div>
            <div className="flex items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-8 h-20 sm:h-25">
              <h1 className="text-black font-semibold text-[26px] sm:text-[36px] leading-tight shrink-0">Beginner</h1>
              <Image src={FirstStar} alt="1 Star" className="shrink-0 w-10 h-10 sm:w-auto sm:h-auto" />
            </div>

            <p className="text-start mb-4 sm:mb-8 text-sm sm:text-base leading-relaxed">
              You’re new to the game but a keen learner <br />
              looking for the right institution to hone your skills.
            </p>

            <h5 className="text-start font-semibold uppercase text-sm sm:text-base mb-4 sm:mb-0">
              What you’re looking for
            </h5>
          </div>

          <Button className="bg-[#01636B] h-14 sm:h-17.25 uppercase mt-auto text-sm sm:text-base">
            Find courses
          </Button>
        </div>

        <div className="bg-[#01636B] w-full lg:w-1/2 relative pt-10 sm:pt-15 pb-5 px-6 sm:px-10 rounded-2xl flex flex-col">
          <Image
            src={SecondStar}
            alt="2 Stars"
            className="absolute top-0 right-0 z-0"
          />
          <div className="relative z-10">
            <div className="flex items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-8 h-20 sm:h-25">
              <h1 className="text-white text-[26px] sm:text-[36px] font-semibold text-start leading-tight shrink-0">
                Existing <br /> Electrician
              </h1>
              <Image src={ThirdStar} alt="3 Stars" className="shrink-0 w-30 h-30 sm:w-auto sm:h-auto" />
            </div>

            <p className="text-start text-white mb-4 sm:mb-8 text-sm sm:text-base leading-relaxed">
              You’re new to the game but a keen learner <br />
              looking for the right institution to hone your skills.
            </p>

            <h5 className="text-start font-semibold uppercase text-sm sm:text-base text-white mb-4 sm:mb-10">
              What you’re looking for
            </h5>
          </div>

          <Button className="bg-[#E99E20] h-14 sm:h-17.25 uppercase mt-auto text-sm sm:text-base relative z-10">
            Find courses
          </Button>
        </div>
      </section>
    </main>
  );
}

export default Stages;
