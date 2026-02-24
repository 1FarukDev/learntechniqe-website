import React from "react";
import Image from "next/image";
import SessionImage from "@/app/assets/png/session.jpg"; // update path to your actual image
import { Button } from "@/components/ui/button";

function Session() {
  return (
    <section className="relative w-full min-h-170 flex items-center justify-center overflow-hidden">
      <Image
        src={SessionImage}
        alt="Training session background"
        fill
        className="object-cover object-center z-0"
      />

      <div className="absolute inset-0 z-10 bg-linear-to-br from-[rgba(0,140,140,0.55)] via-[rgba(0,100,110,0.70)] to-[rgba(0,60,80,0.88)]" />

      <div className="relative z-20 flex flex-col items-center text-center text-white px-6 max-w-2xl mx-auto gap-6">
        <h2 className="font-outfit font-semibold text-4xl md:text-5xl leading-tight">
          Want To Do The Training <br className="hidden md:block" />
          At Your Premises?
        </h2>

        <p className="text-white/85 font-outfit text-sm md:text-base leading-7 font-normal">
          We bring the full training experience to your location, saving you
          time while <br /> delivering hands-on, results-driven sessions built around
          your environment and <br /> goals, and available for direct staff training
          when needed.
        </p>

       <div className="mx-4 w-full">
         <Button className="mt-4 h-17.25 w-full  bg-[#F5A623] hover:bg-[#e09410] text-white font-outfit font-semibold uppercase tracking-widest text-sm px-16 py-6 rounded-md">
          Book Session
        </Button>
       </div>
      </div>
    </section>
  );
}

export default Session;
