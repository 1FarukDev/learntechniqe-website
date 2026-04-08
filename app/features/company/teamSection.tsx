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

const CARD_H_MOBILE = 428;
const CARD_H_DESKTOP = 420;

export function TeamCard({ member }: TeamCardProps) {
  const [hovered, setHovered] = useState(false);
  const bio = member.bio ?? "";

  return (
    <div
      className="w-full"
      style={{
        perspective: "1000px",
        height: `${CARD_H_MOBILE}px`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <style>{`@media(min-width:768px){[data-team-card]{height:${CARD_H_DESKTOP}px!important}}`}</style>
      <div
        data-team-card=""
        className="relative w-full"
        style={{
          height: "inherit",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: hovered ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 flex flex-col rounded-2xl overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            backgroundColor: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <div className="shrink-0 flex flex-col items-center text-center px-3 md:px-5 pt-6 pb-4 md:pt-7 md:pb-4 gap-2 md:gap-0">
            <h3 className="text-white text-lg md:text-2xl font-semibold leading-tight mb-0 md:mb-0.5">
              {member.name}
            </h3>
            <p className="text-white/75 text-xs md:text-sm">
              {member.role}
            </p>
          </div>

          <div className="relative flex-1 min-h-[200px] md:min-h-0 mx-3 md:mx-4 mt-1 mb-4 md:mt-0 md:mb-4 rounded-xl overflow-hidden">
            {member.image ? (
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover object-center"
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

          <div className="shrink-0 flex items-center justify-center pt-2 pb-5 md:hidden">
            <span
              className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-white text-xs font-semibold"
              style={{ backgroundColor: "#22c55e" }}
            >
              Flip card for full profile
            </span>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-2xl overflow-y-auto overscroll-y-contain md:overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            backgroundColor: "#0d2a3a",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <div className="min-h-full flex flex-col items-center justify-center text-center gap-4 md:justify-start p-5 md:p-8">
            <h3 className="text-white text-lg md:text-2xl font-black leading-tight shrink-0 pt-1 md:pt-2">
              {member.name}
            </h3>
            <p
              className="text-white text-xs font-semibold tracking-wider uppercase shrink-0 mt-1 md:mt-0"
              style={{ opacity: 0.6 }}
            >
              {member.role}
            </p>

            {member.bio ? (
              <p
                className="text-white text-xs md:text-sm leading-relaxed w-full max-w-none"
                style={{ opacity: 0.9 }}
              >
                {member.bio}
              </p>
            ) : (
              <p
                className="text-white text-sm leading-relaxed"
                style={{ opacity: 0.5, fontStyle: "italic" }}
              >
                Bio coming soon.
              </p>
            )}
          </div>
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
    bio: "Oliver is our Commercial Manager, and forms part of the senior management team. He is responsible for identifying and pursuing new business opportunities, building strategic partnerships, and overseeing contracts. He leads the company’s sales and marketing strategy with a strong focus on growth and profitability. He works closely with our Operations Manager to ensure that all employees adhere to company policies and procedures, monitors compliance with regulations, and works continuously to enhance operational processes, systems, and management practices across the organisation.  ",
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
      className="w-full px-4 sm:px-8 md:px-12 pt-12 md:pt-16 pb-24 md:pb-36"
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

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-2 sm:gap-x-3 md:gap-x-4 gap-y-0 md:gap-y-20 lg:gap-y-24 pb-6 md:pb-12">
        {team.map((member) => (
          <div
            key={member.name}
            className="min-w-0 py-0 mb-8 last:mb-0 md:mb-0 md:py-3"
            style={{ isolation: "isolate" }}
          >
            <TeamCard member={member} />
          </div>
        ))}
      </div>
    </section>
  );
}
