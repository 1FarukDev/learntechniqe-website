"use client";

import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

// Placeholder images
import placeholder1 from "@/app/assets/png/session.jpg"; // User 1
import placeholder2 from "@/app/assets/png/courses.jpg"; // User 2

interface Leader {
    name: string;
    role: string;
    image: any; // using any for static import type
}

const leaders: Leader[] = [
    { name: "John Doe", role: "CEO", image: placeholder1 },
    { name: "Jane Smith", role: "Managing Director", image: placeholder2 },
    { name: "Mike Johnson", role: "Head of Training", image: placeholder1 },
    // Fill the rest with grey mock outlines as per design or reuse images
    { name: "Sarah Williams", role: "Director", image: null },
    { name: "David Brown", role: "Head of Operations", image: null },
    { name: "Emily Davis", role: "HR Manager", image: null },
    { name: "Tom Wilson", role: "Lead Assessor", image: null },
    { name: "Lucy Taylor", role: "Finance Director", image: null },
    { name: "Mark Thomas", role: "Marketing Head", image: null },
];

function LeadershipSection() {
    return (
        <section className="bg-[#01656B] text-white pt-24 pb-32 px-4 rounded-t-[100px] sm:rounded-t-[150px] rounded-b-[100px] sm:rounded-b-[150px] -mt-10 relative z-10 w-full overflow-hidden">

            {/* Top Text Columns */}
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-16 mb-24">
                <div className="flex-1 text-white/90 text-sm sm:text-base leading-relaxed">
                    <p>
                        Technique Learning Solutions is a leading provider of electrical training courses.
                        We offer a wide range of courses, from domestic installer training to advanced
                        industrial qualifications. Our facilities are state-of-the-art, and our tutors
                        are industry experts with years of hands-on experience.
                    </p>
                </div>
                <div className="flex-1 text-white/90 text-sm sm:text-base leading-relaxed">
                    <p>
                        Our mission is to empower individuals with the skills and knowledge they need
                        to succeed in the electrical industry. Whether you're just starting your career
                        or looking to upskill, we have the right course for you. We take pride in our
                        high success rates and the positive feedback we receive from our learners.
                    </p>
                </div>
            </div>

            {/* Leadership Grid */}
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-2 text-[#E99E20]">
                    Our Leadership Team
                </h2>
                <div className="w-16 h-1 bg-[#E99E20] mx-auto mb-16 rounded-full" />

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 sm:gap-x-12 gap-y-12">
                    {leaders.map((leader, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <h3 className="font-bold text-lg sm:text-xl uppercase">{leader.name}</h3>
                            <p className="text-sm sm:text-base text-white/80 mb-4">{leader.role}</p>

                            {/* The specific card styling from the design */}
                            <div className="w-full max-w-[220px] aspect-[4/5] bg-[#025055] p-2 rounded-md mb-4 flex flex-col items-center justify-end relative">
                                <Icon icon="jam:linkedin-circle" width="32" height="32" className="text-[#14AE5C] absolute top-4 right-4 z-20" />

                                {leader.image ? (
                                    <Image
                                        src={leader.image}
                                        alt={leader.name}
                                        fill
                                        className="object-cover rounded inline-block p-1"
                                    />
                                ) : (
                                    // Silhouette placeholder matching the design
                                    <div className="w-full h-full bg-[#01656B] flex flex-col justify-end items-center rounded overflow-hidden p-1">
                                        <div className="w-20 h-20 bg-[#025055] rounded-full mb-2 shrink-0"></div>
                                        <div className="w-32 h-32 bg-[#025055] rounded-t-[50px] translate-y-8"></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default LeadershipSection;
