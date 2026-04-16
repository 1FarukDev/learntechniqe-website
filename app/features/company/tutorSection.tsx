"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import KingsImage from "@/app/assets/team/Kings.png";

interface Tutor {
  name: string;
  role: string;
  image?: string | StaticImageData;
  accentColor: string;
}

const tutors: Tutor[] = [
  {
    name: "Andy Polkinghorne",
    role: "Electrical Tutor",
    accentColor: "#2563EB",
  },
  {
    name: "Allan Morrison",
    role: "Electrical Tutor",
    accentColor: "#7C3AED",
  },
  {
    name: "Chris Harrison",
    role: "Electrical Tutor",
    accentColor: "#F59E0B",
  },
  {
    name: "Kingsley Owomero",
    role: "Electrical Tutor",
    image: KingsImage,
    accentColor: "#16A34A",
  },
  {
    name: "Paul Batty",
    role: "Electrical Tutor",
    accentColor: "#DC2626",
  },
  {
    name: "Dave Brenton",
    role: "AM2 Assessor",
    accentColor: "#0891B2",
  },
  {
    name: "Adam Wood",
    role: "AM2 Assessor",
    accentColor: "#D97706",
  },
  {
    name: "Arsham Hassanpour",
    role: "PLC & Automation Tutor",
    accentColor: "#4F46E5",
  },
  {
    name: "Paria Faramarzi",
    role: "PLC & Automation Tutor",
    accentColor: "#BE185D",
  },
  {
    name: "Tim Morris",
    role: "Air Conditioning and Refrigeration Tutor",
    accentColor: "#059669",
  },

];

function TutorCard({ tutor }: { tutor: Tutor }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full pt-8 sm:pt-[52px]">
        {/* Colored card background */}
        <div
          className="w-full rounded-2xl h-32 sm:h-[190px]"
          style={{ backgroundColor: tutor.accentColor }}
        />

        {/* Figure overlay */}
        {/* Figure overlay */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-40 sm:h-[240px] overflow-visible pointer-events-none flex items-end justify-center">
          {tutor.image ? (
            <div className="relative w-full h-[115%]">
              <Image
                src={tutor.image}
                alt={tutor.name}
                fill
                style={{
                  objectFit: "contain",
                  objectPosition: "bottom center",
                }}
              />
            </div>
          ) : (
            <svg
              viewBox="0 0 100 120"
              width="100%"
              height="100%"
              fill="rgba(255,255,255,.8)"
              style={{ display: "block" }}
              preserveAspectRatio="xMidYMax meet"
            >
              <ellipse cx="50" cy="28" rx="20" ry="22" />
              <path d="M10 120 Q10 68 50 68 Q90 68 90 120 Z" />
            </svg>
          )}
        </div>
      </div>

      <div className="text-center mt-3 px-1">
        <p className="font-bold text-[#000000] text-base sm:text-xl leading-snug">
          {tutor.name}
        </p>
        <p className="text-black font-normal text-sm mt-0.5">{tutor.role}</p>
      </div>
    </div>
  );
}

export default function TutorsSection() {
  return (
    <section
      className="w-full px-4 sm:px-8 md:px-12 py-12 md:py-16"
      style={{ backgroundColor: "#dff0f0" }}
    >
      <div className="text-center mb-10 md:mb-14">
        <h2 className="text-black text-3xl sm:text-4xl md:text-5xl font-semibold mb-3">
          Our Tutors
        </h2>
        <p className="text-black text-base font-normal max-w-xl mx-auto leading-relaxed">
          Our tutors are dedicated to providing expert guidance, patience, and
          personalized attention to help every student learn with confidence.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {tutors.map((tutor) => (
          <TutorCard key={tutor.name} tutor={tutor} />
        ))}
      </div>
    </section>
  );
}
