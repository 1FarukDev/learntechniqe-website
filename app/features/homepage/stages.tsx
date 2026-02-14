import React from "react";
import FirstStar from "@/app/assets/svg/1star.svg";
import SecondStar from "@/app/assets/svg/2card.svg";
import ThirdStar from "@/app/assets/svg/3stars.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function Stages() {
  return (
    <main className="flex flex-col items-center justify-center gap-6 w-full mt-10 text-center max-w-7xl mx-auto">
      <h1 className="font-outfit font-semibold text-[62px] leading-tight text-black">
        There’s a course for everyone
      </h1>
      <p className="font-normal text-base text-black ">
        Whether you are new to the electrical industry, an experienced
        electrician,
        <br /> or in an allied trade, we can help find the right course for you
      </p>
      <section className="flex flex-col lg:flex-row items-stretch justify-center gap-10 w-full my-10">
        <div className="bg-[#D4D8DB] w-full lg:w-1/2 pt-15 pb-5 px-10 rounded-2xl border border-[#bcbdbd] flex flex-col">
          <div>
            <div className="flex items-center justify-between mb-8 h-25 ">
              <h1 className="text-black font-semibold text-[36px]">Beginner</h1>
              <Image src={FirstStar} alt="1 Star" />
            </div>

            <p className="text-start mb-8">
              You’re new to the game but a keen learner <br />
              looking for the right institution to hone your skills.
            </p>

            <h5 className="text-start font-semibold uppercase text-base">
              What you’re looking for
            </h5>
          </div>

          <Button className="bg-[#01636B] h-17.25 uppercase mt-auto">
            Find courses
          </Button>
        </div>

        <div className="bg-[#011430] w-full lg:w-1/2 relative pt-15 pb-5 px-10 rounded-2xl flex flex-col">
          <div>
            <div className="flex items-center justify-between mb-8  h-25">
              <h1 className="text-white text-[36px] font-semibold text-start">
                Existing <br /> Electrician
              </h1>
              <Image src={ThirdStar} alt="3 Stars" className="z-100"/>
            </div>

            <p className="text-start text-white mb-8">
              You’re new to the game but a keen learner <br />
              looking for the right institution to hone your skills.
            </p>

            <h5 className="text-start font-semibold uppercase text-base text-white mb-10">
              What you’re looking for
            </h5>
          </div>

          <Button className="bg-[#E99E20] h-17.25 uppercase mt-auto">
            Find courses
          </Button>

          <Image
            src={SecondStar}
            alt="2 Stars"
            className="absolute top-0 right-0"
          />
        </div>
      </section>
    </main>
  );
}

export default Stages;
