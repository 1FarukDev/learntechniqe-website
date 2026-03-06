import React from "react";
import Image from "next/image";
import FacilityImage1 from "@/app/assets/png/clay.png";
import FacilityImage2 from "@/app/assets/png/striling.jpg";

function AboutSection() {
    return (
        <section className="max-w-7xl mx-auto py-10 sm:py-20 md:px-0 px-4">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                {/* Images */}
                <div className="w-full md:w-[45%] flex gap-4">
                    <div className="w-1/2 rounded-xl overflow-hidden">
                        <Image
                            src={FacilityImage1}
                            alt="Training facility"
                            className="w-full h-64 sm:h-80 object-cover rounded-xl"
                        />
                    </div>
                    <div className="w-1/2 rounded-xl overflow-hidden mt-8">
                        <Image
                            src={FacilityImage2}
                            alt="Training centre"
                            className="w-full h-64 sm:h-80 object-cover rounded-xl"
                        />
                    </div>
                </div>

                {/* Text Content */}
                <div className="w-full md:w-[55%] flex flex-col gap-5">
                    <h2 className="text-[#01656B] font-semibold text-2xl sm:text-3xl md:text-4xl leading-tight">
                        We take a lot of pride in our centres and you&apos;ll see for
                        yourself the time and effort we have invested in them.
                    </h2>
                    <p className="text-black/70 text-sm sm:text-base leading-relaxed">
                        With a consistent emphasis on providing expert electrical training,
                        our centres are designed for outstanding outcomes. From theory to
                        practical hands-on sessions, we go the extra mile to ensure our
                        learners have access to the best tools and resources available.
                    </p>
                    <p className="text-black/70 text-sm sm:text-base leading-relaxed">
                        We offer specialist industry-relevant practical training solutions
                        in plumbing, smart energy, green technologies, regulations and
                        testing/inspection courses. Whether you are a career changer looking
                        to start a new career path in the electrical sector or an existing
                        electrician looking to update and expand your skills, we have a
                        training solution to suit your needs.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;
