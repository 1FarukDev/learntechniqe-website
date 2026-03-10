"use client";

import React from "react";
import Image from "next/image";

// Reusing avatars
import avatar1 from "@/app/assets/png/session.jpg";
import avatar2 from "@/app/assets/png/courses.jpg";

interface Tutor {
    name: string;
    role: string;
    image: any;
    bgColor: string; // The specific background color behind the person
}

const tutors: Tutor[] = [
    { name: "John Smith", role: "Electrical Tutor", image: avatar1, bgColor: "bg-[#282828]" }, // Black/dark grey
    { name: "Michael Lee", role: "Plumbing Tutor", image: avatar2, bgColor: "bg-[#0088FF]" }, // Blue
    { name: "Robert Allen", role: "Senior Assessor", image: avatar1, bgColor: "bg-[#E99E20]" }, // Orange
    { name: "James Clark", role: "Smart Energy", image: avatar2, bgColor: "bg-[#E0E0E0]" }, // Grey
    { name: "William Davis", role: "Gas Assessor", image: avatar1, bgColor: "bg-[#0088FF]" }, // Blue
    { name: "David Evans", role: "Electrical Tutor", image: avatar2, bgColor: "bg-[#0088FF]" }, // Blue
    { name: "Richard Hall", role: "Plumbing Tutor", image: avatar1, bgColor: "bg-[#282828]" }, // Black
    { name: "Joseph King", role: "F-Gas Tutor", image: avatar2, bgColor: "bg-[#E99E20]" }, // Orange
    { name: "Thomas Scott", role: "Renewables Tutor", image: avatar1, bgColor: "bg-[#0088FF]" }, // Blue
    { name: "Charles Young", role: "Senior Tutor", image: avatar2, bgColor: "bg-[#0088FF]" }, // Blue
    { name: "Daniel Adams", role: "Electrical Assessor", image: avatar1, bgColor: "bg-[#E0E0E0]" }, // Grey
];

function TutorsSection() {
    return (
        <section className="bg-[#F3F6F6] pt-32 pb-20 px-4 -mt-32 z-0 relative">
            <div className="max-w-6xl mx-auto text-center mt-10">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 text-black">
                    Our Tutors
                </h2>
                <p className="text-black/60 text-base sm:text-lg max-w-2xl mx-auto mb-16">
                    Meet our team of experienced and dedicated tutors who are passionate about helping you succeed in your career.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                    {tutors.map((tutor, index) => (
                        <div key={index} className="flex flex-col items-center bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            {/* Image Container with colored background */}
                            <div className={`w-full aspect-square ${tutor.bgColor} relative flex items-end justify-center pt-8 px-4`}>
                                {/* Image sits at the bottom edge */}
                                <div className="relative w-[90%] h-[90%]">
                                    <Image
                                        src={tutor.image}
                                        alt={tutor.name}
                                        fill
                                        className="object-cover object-top"
                                    />
                                </div>
                            </div>

                            {/* Text Container */}
                            <div className="w-full py-5 px-4 bg-white text-center">
                                <h3 className="font-bold text-black text-sm sm:text-base uppercase">{tutor.name}</h3>
                                <p className="text-black/60 text-xs sm:text-sm mt-1">{tutor.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default TutorsSection;
