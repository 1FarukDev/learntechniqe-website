"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import JoinImage from "@/app/assets/team/join.jpg";
interface JobDetailProps {
  tags?: { label: string; color: string }[];
  title?: string;
  intro?: string;
  bullets?: string[];
  outro?: string[];
  image?: string | StaticImageData;
  onApply?: () => void;
}

const defaultJob: JobDetailProps = {
  tags: [
    { label: "TUTOR", color: "#22c55e" },
    { label: "CHESTERFIELD", color: "#2563EB" },
  ],
  title: "PLC Trainer",
  intro:
    "We are seeking candidates who are passionate about the PLC Engineering Industry and have the drive and motivation to help learners to progress in their careers, enabling them to increase their employability and/or knowledge of PLC's. The ideal candidate will have a strong background in PLC, whether it be through an Industrial maintenance or programming background, experience of teaching is a bonus, but not necessary as full training will be given, you must have strong organisational and communication skills in order to inspire and educate learners.\nThe role is based in our Chesterfield training centre but may involve occasional training in our clients premises or covering for holidays etc, so flexibility is key.\nWhat skills and experience will I need to be successful?",
  bullets: [
    "Be conversant with PLC's to at least an intermediate level.",
    "Knowledge and experience on plant and process control systems would be an advantage but is not essential.",
    "Have a sound knowledge of Electrical & Instrumentation engineering principles",
    "Good numeracy, literacy and computer skills",
    "Communicates effectively, both orally, and in writing, with learners, employers and other professionals",
    "Full UK Driving Licence",
  ],
  outro: [
    "The role is based in our Chesterfield training centre but may involve occasional training in our clients premises or covering for holidays etc, so flexibility is key.",
    "What skills and experience will I need to be successful?",
  ],
  image: JoinImage,
};


export default function JobDetail({
  tags = defaultJob.tags,
  title = defaultJob.title,
  intro = defaultJob.intro,
  bullets = defaultJob.bullets,
  outro = defaultJob.outro,
  image = defaultJob.image,
  onApply,
}: JobDetailProps) {
  return (
    <section className="w-full bg-white px-16 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Tags row + share icon */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            {tags?.map((tag) => (
              <span
                key={tag.label}
                className="text-white text-xs font-bold px-3 py-1 rounded-full"
                style={{ backgroundColor: tag.color }}
              >
                {tag.label}
              </span>
            ))}
          </div>
         
        </div>

        {/* Title */}
        <h1
          className="text-gray-900 text-4xl font-black mb-6"
          style={{ fontFamily: "'Barlow Condensed', 'Barlow', sans-serif" }}
        >
          {title}
        </h1>

        {/* Two-column layout */}
        <div className="grid grid-cols-2 gap-12 items-start">
          {/* Left: text content */}
          <div>
            {/* Intro paragraphs */}
            {intro && (
              <div className="mb-5">
                {intro.split("\n").map((para, i) => (
                  <p
                    key={i}
                    className="text-gray-700 text-sm leading-relaxed mb-1"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            )}

            {/* Bullet points */}
            {bullets && bullets.length > 0 && (
              <ul className="mb-5 flex flex-col gap-2">
                {bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span
                      className="mt-1.5 text-blue-600 font-bold text-xs flex-shrink-0"
                      style={{ fontSize: "16px", lineHeight: 1 }}
                    >
                      ·
                    </span>
                    <span
                      className="text-sm leading-relaxed"
                      style={{
                        color: "#2563EB",
                        fontFamily: "'Barlow', sans-serif",
                      }}
                    >
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {/* Outro paragraphs */}
            {outro && (
              <div className="flex flex-col gap-1">
                {outro.map((para, i) => (
                  <p
                    key={i}
                    className="text-gray-700 text-sm leading-relaxed"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Right: image with play button */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{ height: "320px" }}
          >
            {image ? (
              <>
                <Image
                  src={image}
                  alt={title ?? "Job image"}
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    className="flex items-center justify-center rounded-full transition-transform hover:scale-105"
                    style={{
                      width: 68,
                      height: 68,
                      backgroundColor: "#ef4444",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
                    }}
                    aria-label="Play video"
                  >
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="white"
                      style={{ marginLeft: 4 }}
                    >
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center rounded-2xl"
                style={{ backgroundColor: "#f3f4f6" }}
              >
                <p className="text-gray-400 text-sm">No image available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
