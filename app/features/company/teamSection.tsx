"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import MarkImage from "@/app/assets/team/mark.png";
import SimonImage from "@/app/assets/team/simon.png";
interface TeamMember {
  name: string;
  role: string;
  image?: string | StaticImageData;
  bio?: string;
}

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ perspective: "1000px", minHeight: "420px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          minHeight: "420px",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: hovered ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderRadius: "1rem",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <div className="flex flex-col items-center text-center px-6 pt-8 pb-5">
            <h3 className="text-white text-3xl font-semibold mb-1 leading-tight">
              {member.name.split(" ").map((word, i) => (
                <span key={i} className="block">
                  {word}
                </span>
              ))}
            </h3>
            <p className="text-white text-sm mb-4" style={{ opacity: 0.75 }}>
              {member.role}
            </p>
            <button
              className="flex items-center md:hidden  justify-center px-4 py-1.5 rounded-full text-white text-xs font-semibold"
              style={{ backgroundColor: "#22c55e", minWidth: "130px" }}
            >
              More Information
            </button>
          </div>
          <div
            className="flex-1 relative mx-4 mb-4 rounded-xl overflow-hidden"
            style={{ minHeight: "220px" }}
          >
            {member.image ? (
              <Image
                src={member.image}
                alt={member.name}
                fill
                style={{ objectFit: "cover", objectPosition: "top center" }}
              />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ backgroundColor: "rgba(0,80,90,0.5)" }}
              >
                <svg
                  viewBox="0 0 100 120"
                  width="60%"
                  style={{ opacity: 0.4 }}
                  fill="currentColor"
                  className="text-teal-300"
                >
                  <ellipse cx="50" cy="35" rx="22" ry="26" />
                  <path d="M10 110 Q10 70 50 70 Q90 70 90 110 Z" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: "1rem",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0d2a3a",
            border: "1px solid rgba(255,255,255,0.15)",
            padding: "2rem",
            gap: "1.25rem",
          }}
        >
          <h3
            className="text-white text-2xl font-black leading-tight text-center"
            style={{ fontFamily: "'Barlow Condensed', 'Barlow', sans-serif" }}
          >
            {member.name.split(" ").map((word, i) => (
              <span key={i} className="block">
                {word}
              </span>
            ))}
          </h3>
          <p
            className="text-white text-xs font-semibold tracking-wider uppercase"
            style={{ opacity: 0.6 }}
          >
            {member.role}
          </p>

          {member.bio ? (
            <p
              className="text-white text-sm text-center leading-relaxed"
              style={{ fontFamily: "'Barlow', sans-serif", opacity: 0.9 }}
            >
              {member.bio}
            </p>
          ) : (
            <p
              className="text-white text-sm text-center leading-relaxed"
              style={{ opacity: 0.5, fontStyle: "italic" }}
            >
              Bio coming soon.
            </p>
          )}

          <button
            className="flex items-center justify-center gap-2 px-4 py-1.5 rounded-full text-white text-xs font-semibold mt-2"
            style={{ backgroundColor: "#22c55e", minWidth: "130px" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

const team: TeamMember[] = [
  {
    name: "Mark Crook",
    role: "Company Director",
    image: MarkImage,
    bio: "Mark co-founded Technique Learning Solutions with a vision to deliver world-class vocational training across the UK.",
  },
  {
    name: "Simon Marples",
    role: "Company Director",
    image: SimonImage,
    bio: "Simon brings decades of industry experience to TLS, driving strategic growth and ensuring the highest training standards.",
  },
  {
    name: "Andy Sharp",
    role: "Commercial Manager",
    bio: "Andy oversees commercial operations and partnerships, helping TLS expand its reach across industries nationwide.",
  },
  {
    name: "Mic Barber",
    role: "Office Manager",
    bio: "Mic heads up the office, managing day to day admin and sales. Mic is first point of contact for course enquiries and queries at Technique Learning Solutions and is always praised for his customer service.",
  },
  {
    name: "Alex Miller",
    role: "Centre Course & Certification Coordinator",
    bio: "Alex ensures all courses run smoothly from booking to certification, coordinating across multiple centres and awarding bodies.",
  },
  {
    name: "Niki Wilde",
    role: "Centre Administration",
    bio: "Niki keeps the centre running day to day, supporting candidates and staff with a friendly and professional approach.",
  },
];

export default function LeadershipSection() {
  return (
    <section
      className="w-full px-12 py-16"
      style={{ backgroundColor: "#016068" }}
    >
      <div className="text-center mb-12">
        <h2 className="text-white text-5xl font-semibold mb-3">
          Our Leadership Team
        </h2>
        <p
          className="text-white text-sm font-outfit font-normal"
          style={{ opacity: 0.8 }}
        >
          Our staff pride themselves in the up most professionalism and
          experience
          <br />
          to guarantee a happy customer service!
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-3 gap-6">
        {team.map((member) => (
          <TeamCard key={member.name} member={member} />
        ))}
      </div>
    </section>
  );
}
