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
  const [bioExpanded, setBioExpanded] = useState(false);
  const bio = member.bio ?? "";
  const isLongBio = bio.length > 200;

  return (
    <div
      className="min-h-[320px] md:min-h-[420px]"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="min-h-[320px] md:min-h-[420px]"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: hovered ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          className="flex flex-col items-center"
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderRadius: "1rem",
            overflow: "hidden",
            backgroundColor: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <div className="flex flex-col items-center text-center px-3 md:px-6 pt-4 md:pt-8 pb-3 md:pb-5">
            <h3 className="text-white text-xl md:text-3xl font-semibold mb-1 leading-tight">
              {member.name.split(" ").map((word, i) => (
                <span key={i} className="block">
                  {word}
                </span>
              ))}
            </h3>
            <p
              className="text-white text-xs md:text-sm mb-2 md:mb-4"
              style={{ opacity: 0.75 }}
            >
              {member.role}
            </p>
            <button
              className="flex items-center md:hidden  justify-center px-4 py-1.5 rounded-full text-white text-xs font-semibold"
              style={{ backgroundColor: "#22c55e", minWidth: "130px" }}
            >
              More Information
            </button>
          </div>
          <div className="flex-1 relative mx-2 md:mx-4 mb-2 md:mb-4 rounded-xl overflow-hidden min-h-[140px] md:min-h-[220px] w-full max-w-full ">
            {member.image ? (
              <Image
                src={member.image}
                alt={member.name}
                fill
                style={{ objectFit: "cover", objectPosition: "center center", paddingRight: "15px", paddingLeft: "15px"}}
              />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center pr-15 pl-15"
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
          }}
          className="p-4 md:p-8 flex flex-col items-center justify-center gap-2 md:gap-5"
        >
          <h3
            className="text-white text-lg md:text-2xl font-black leading-tight text-center"
            style={{ fontFamily: "'Barlow Condensed', 'Barlow', sans-serif" }}
          >
            {member.name.split(" ").map((word, i) => (
              <span key={i} className="block">
                {word}
              </span>
            ))}
          </h3>
          <p
            className="text-white text-xs font-semibold tracking-wider uppercase text-center"
            style={{ opacity: 0.6 }}
          >
            {member.role}
          </p>

          {member.bio ? (
            <div className="flex flex-col items-center w-full flex-1 min-h-0 overflow-hidden">
              <p
                className={`text-white text-xs md:text-sm text-center leading-relaxed w-full ${!bioExpanded && isLongBio ? "line-clamp-5" : "overflow-y-auto"
                  }`}
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  opacity: 0.9,
                  maxHeight: bioExpanded ? "12rem" : "8.5rem",
                }}
              >
                {member.bio}
              </p>
              {isLongBio && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setBioExpanded(!bioExpanded);
                  }}
                  className="mt-2 text-xs font-semibold text-[#22c55e] hover:text-[#16a34a] transition-colors shrink-0"
                >
                  {bioExpanded ? "Show less" : "Read more"}
                </button>
              )}
            </div>
          ) : (
            <p
              className="text-white text-sm text-center leading-relaxed"
              style={{ opacity: 0.5, fontStyle: "italic" }}
            >
              Bio coming soon.
            </p>
          )}
{/* 
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
          </button> */}
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
    bio: "With over 30 years of experience in the training sector, Mark is a fully qualified, time-served  engineer bringing a wealth of expertise to Technique Learning Solutions.  Mark is known for his innovative approach to training, which is deeply embedded in the  ethos of Technique Learning Solutions. He remains actively involved in both delivering  training and overseeing and leading the day-to-day operations of the centre, ensuring the  highest standards of learning and service. During your course, you may have the opportunity to meet Mark or attend one of his training  sessions. He is always happy to answer questions and share his insights, so don’t hesitate to  reach out. ",
  },
  {
    name: "Simon Marples",
    role: "National Operations Manager ",
    image: SimonImage,
    bio: "Simon is our Operations Manager, and forms a part of the senior management team. He  provides inspired leadership for our organisation and maintains good quality standards for the  products, productivity and efficiency of our organisation, and oversees the management of  labour, policy decisions and quality and safety control.  He works close with our Commercial Manager to ensure that all employees observe company  policies and procedures. They concentrate on matters concerning the company’s regulations  and work to improve the operational procedures, principles and systems in the  management areas. ",
  },
  {
    name: "Oliver Crook",
    role: "Commercial Manager",
    bio: "Oliver is our Commercial Manager, and forms part of the senior management team. He is responsible for identifying and pursuing new business opportunities, building strategic partnerships, and overseeing contracts. He leads the company’s sales and marketing strategy with a strong focus on growth and profitability. Oliver’s excellent interpersonal and communication skills enable him to develop and maintain effective relationships with clients and partners. He works closely with our Operations Manager to ensure that all employees adhere to company policies and procedures, monitors compliance with regulations, and works continuously to enhance operational processes, systems, and management practices across the organisation.  ",
  },
  {
    name: "Mic Barber",
    role: "Centre Course & Certification Coordinator ",
    bio: "Mic ensures all courses run smoothly from booking to certification, coordinating across multiple centres and awarding bodies. ",
  },
  {
    name: "Georgina Thompson",
    role: "Sales & Administration ",
    bio: "Georgina forms part of our Sales & Administration team. She is customer-focused Sales and Administration Advisor, skilled in managing client accounts, supporting the team, providing expert advice on all of our courses and guiding you down the right path. ",
  },
  {
    name: "Paige Campbell",
    role: "Sales & Administration ",
    bio: "Paige forms part of our Sales & Administration team. An organised and experienced Sales professional, skilled in supporting our team, managing client accounts and providing expert advice on all of our courses and guiding you down the right path. ",
  },
];

export default function LeadershipSection() {
  return (
    <section
      className="w-full px-4 sm:px-8 md:px-12 py-12 md:py-16"
      style={{ backgroundColor: "#016068" }}
    >
      <div className="text-center mb-10 md:mb-12">
        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-semibold mb-3">
          Our Leadership Team
        </h2>
        <p
          className="text-white text-sm font-outfit font-normal"
          style={{ opacity: 0.8 }}
        >
          Our staff pride themselves in the up most professionalism and
          experience
          <br className="hidden md:block" />
          to guarantee a happy customer service!
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {team.map((member) => (
          <TeamCard key={member.name} member={member} />
        ))}
      </div>
    </section>
  );
}
