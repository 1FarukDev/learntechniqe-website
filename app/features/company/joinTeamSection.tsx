"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import JoinImage from "@/app/assets/team/join.jpg";
interface Job {
  id: string;
  title: string;
  tags: { label: string; color: string }[];
  description: string;
  image?: string | StaticImageData;
  videoUrl?: string;
}

const jobs: Job[] = [
  {
    id: "plc-trainer",
    title: "PLC Trainer",
    tags: [
      { label: "TUTOR", color: "#22c55e" },
      { label: "CHESTERFIELD", color: "#2563EB" },
    ],
    description:
      "We are seeking candidates who are passionate about the PLC Engineering Industry and have the drive and motivation to help learners to progress in their careers, enabling them to increase their employability and/or knowledge of PLC's. The ideal candidate will have a strong background in PLC, whether it be through an Industrial maintenance or programming background, experience of teaching is a bonus, but not necessary as full training will be given, you must have strong organisational and communication skills in order to inspire and educate learners.",
    image: JoinImage,
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    tags: [
      { label: "DESIGN", color: "#a855f7" },
      { label: "REMOTE", color: "#0ea5e9" },
    ],
    description:
      "We are looking for a talented UI/UX Designer to join our growing team. You will be responsible for designing intuitive and visually appealing user interfaces for our digital platforms. The ideal candidate has a strong portfolio demonstrating experience in user-centred design, wireframing, prototyping, and working closely with development teams to bring designs to life.",
    image: JoinImage,
  },
];

export default function JoinOurTeam() {
  const [selectedId, setSelectedId] = useState(jobs[0].id);
  const selectedJob = jobs.find((j) => j.id === selectedId)!;

  return (
    <section
      className="w-full px-16 py-16"
      style={{ backgroundColor: "#0d1b2e" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className="text-white text-5xl font-semibold mb-3">
            Join Our Team
          </h2>
          <p
            className=" text-base font-normal max-w-xl  leading-relaxed text-white"
            style={{ opacity: 0.75 }}
          >
            If you're looking for your next challenge and want to join a
            progressive company then we would love to hear from you.
          </p>
        </div>

        <div className="mb-10">
          {jobs.map((job) => {
            const isActive = job.id === selectedId;
            return (
              <div key={job.id}>
                <button
                  onClick={() => setSelectedId(job.id)}
                  className="w-full text-left py-4 transition-all duration-200"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <span
                    className="text-lg font-bold"
                    style={{
                      color: isActive ? "#22c55e" : "rgba(255,255,255,0.85)",
                      fontFamily: "'Barlow', sans-serif",
                      transition: "color 0.2s",
                    }}
                  >
                    {job.title}
                  </span>
                </button>
                <div
                  style={{
                    height: 1,
                    backgroundColor: "rgba(255,255,255,0.15)",
                  }}
                />
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-6 items-stretch">
          <div
            className="rounded-2xl p-8 flex flex-col gap-5"
            style={{ backgroundColor: "#ffffff" }}
          >
            <div className="flex gap-2 flex-wrap">
              {selectedJob.tags.map((tag) => (
                <span
                  key={tag.label}
                  className="text-white text-xs font-bold px-3 py-1 rounded-sm"
                  style={{ backgroundColor: tag.color }}
                >
                  {tag.label}
                </span>
              ))}
            </div>

            <h3
              className="text-gray-900 text-2xl font-black"
              style={{ fontFamily: "'Barlow Condensed', 'Barlow', sans-serif" }}
            >
              {selectedJob.title}
            </h3>

            <div style={{ height: 1, backgroundColor: "#e5e7eb" }} />

            <p className="text-gray-600 text-sm leading-relaxed flex-1">
              {selectedJob.description}
            </p>

            <button
              className="w-full py-4 rounded-xl text-white text-sm font-bold tracking-widest transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "#E99E20",
                letterSpacing: "0.12em",
              }}
            >
              APPLY NOW
            </button>
          </div>

          <div
            className="rounded-2xl overflow-hidden relative"
            style={{ minHeight: "400px" }}
          >
            {selectedJob.image ? (
              <>
                <Image
                  src={selectedJob.image}
                  alt={selectedJob.title}
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="flex items-center justify-center rounded-full"
                    style={{
                      width: 72,
                      height: 72,
                      backgroundColor: "#ef4444",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                    }}
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="white"
                      style={{ marginLeft: 4 }}
                    >
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </div>
                </div>
              </>
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              >
                <p className="text-white text-sm" style={{ opacity: 0.4 }}>
                  No image available
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
