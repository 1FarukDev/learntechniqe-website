import React from "react";
import Image from "next/image";
import FacilityImage1 from "@/app/assets/png/clay.png";
import FacilityImage2 from "@/app/assets/png/striling.jpg";

function AboutSection() {
    return (
        <section className="relative bg-white py-10 sm:py-24 overflow-hidden">
            {/* Left Image - Extreme side */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[15%] lg:w-[20%] hidden md:block">
                <div className="aspect-[3/4] rounded-r-3xl overflow-hidden shadow-2xl">
                    <Image
                        src={FacilityImage1}
                        alt="Training facility"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Right Image - Extreme side */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[15%] lg:w-[20%] hidden md:block">
                <div className="aspect-[3/4] rounded-l-3xl overflow-hidden shadow-2xl">
                    <Image
                        src={FacilityImage2}
                        alt="Training centre"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 text-center z-10 relative">
                {/* Mobile Images - shown only on mobile */}
                <div className="flex md:hidden gap-4 mb-8">
                    <div className="w-1/2 rounded-xl overflow-hidden shadow-lg">
                        <Image
                            src={FacilityImage1}
                            alt="Training facility"
                            className="w-full h-48 sm:h-64 object-cover"
                        />
                    </div>
                    <div className="w-1/2 rounded-xl overflow-hidden shadow-lg mt-6">
                        <Image
                            src={FacilityImage2}
                            alt="Training centre"
                            className="w-full h-48 sm:h-64 object-cover"
                        />
                    </div>
                </div>

                {/* Text Content */}
                <div className="flex flex-col gap-6">
                    <h2 className="text-[#01656B] font-semibold text-2xl sm:text-3xl md:text-[40px] leading-tight max-w-2xl mx-auto">
                        We take a lot of pride in our centres and you&apos;ll see for
                        yourself the time and effort we have invested in them.
                    </h2>
                    <div className="space-y-4 max-w-3xl mx-auto text-black/80">
                        <p className="text-sm sm:text-base leading-relaxed">
                            With a central centre focusing on PLC training in the north we work hard to supply
                            the very best training as close to you as possible. Our ever-expanding business and
                            centres show how committed we are to the very best professional training and we
                            don&apos;t stop there. With our comfortable lounge areas fitted with plenty of sofas, chairs,
                            dining areas, vending machines, hair preparers, magazines and a large TV for your
                            entertainment. Our classrooms are kitted out with the latest projector screens,
                            heating/cooling systems and all the technical gear you will need to learn whichever
                            course you team on your visit.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;
