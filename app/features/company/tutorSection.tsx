"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import Andie from "@/app/assets/tutor/andie.png";
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
    image: Andie,
    accentColor: "#2563EB",
  },
  {
    name: "Allan Morrison",
    role: "Electrical Tutor",
    image: Andie,
    accentColor: "#2563EB",
  },
  {
    name: "Stephen Rush",
    role: "Air Conditioning and Refrigeration Tutor",
    image: Andie,
    accentColor: "#F59E0B",
  },
  {
    name: "David Brenton",
    role: "AM2 Tutor/Assessor",
    image: Andie,
    accentColor: "#16A34A",
  },
  {
    name: "John Burton",
    role: "Electrical Tutor",
    image: Andie,
    accentColor: "#2563EB",
  },
  {
    name: "Simon Baker",
    role: "Electrical Tutor",
    image: Andie,
    accentColor: "#2563EB",
  },
  {
    name: "Tim Morris",
    role: "Air Conditioning and Refrigeration Tutor",
    image: Andie,
    accentColor: "#F59E0B",
  },
  {
    name: "Mohammadali Hassanpour",
    role: "PLC Tutor",
    image: Andie,
    accentColor: "#F59E0B",
  },
];

function TutorCard({ tutor }: { tutor: Tutor }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full pt-8 sm:pt-[52px]">
        <div
          className="w-full rounded-2xl h-32 sm:h-[190px] relative"
          style={{
            backgroundColor: tutor.accentColor,
          }}
        />

        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-40 sm:h-[240px] overflow-hidden pointer-events-none"
        >
          {tutor.image ? (
            <Image
              src={tutor.image}
              alt={tutor.name}
              fill
              style={{ objectFit: "contain", objectPosition: "bottom center" }}
            />
          ) : (
            // Placeholder silhouette
            <div className="w-full h-full flex items-end justify-center pb-2">
              <svg
                viewBox="0 0 100 120"
                width="55%"
                fill="rgba(255,255,255,0.35)"
              >
                <ellipse cx="50" cy="32" rx="22" ry="26" />
                <path d="M10 110 Q10 68 50 68 Q90 68 90 110 Z" />
              </svg>
            </div>
          )}
        </div>
      </div>

      <div className="text-center mt-3 px-1">
        <p
          className="font-bold text-[#000000] text-base sm:text-xl leading-snug"
        >
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
        <h2
          className="text-black text-3xl sm:text-4xl md:text-5xl font-semibold mb-3"
        >
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
