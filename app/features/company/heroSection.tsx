"use client";

import React, { useState } from "react";
import ThirdImage from "@/app/assets/png/32743f1db038b2a1c51268ee3d04b3737c7bef67.jpg";
import Image from "next/image";
import ArrowRight from "@/app/assets/svg/arrow-front.svg";
import ArrowBack from "@/app/assets/svg/arrow-back.svg";

const slides = [
  {
    quote:
      '"Our motivation is to ensure that all our candidates will obtain the highest level of training and attain nationally recognized qualifications, giving the ability to exceed national standards and contribute to the professionalism of the industry"',
    label: "WHAT DRIVES US",
  },
  {
    quote:
      '"We believe in hands-on, real-world experience that prepares every candidate to meet the demands of modern industry with confidence and expertise."',
    label: "WHAT DRIVES US",
  },
  {
    quote:
      '"Our commitment to excellence means we continuously invest in our facilities, our people, and our programmes to stay ahead of industry developments."',
    label: "WHAT DRIVES US",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(2);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <div className="w-full">
      <div className="relative w-full bg-[white] overflow-hidden">
        <div className="relative h-full flex flex-col">
          <div className="relative flex-none pt-24 md:pt-30 z-20">
            <div className="relative max-w-6xl mx-auto">
              <div className="z-10 px-4 sm:px-12 md:px-24 max-w-5xl mx-auto text-center">
                <p
                  className="text-sm font-bold tracking-widest mb-6 "
                  style={{ color: "#1a9b8a", letterSpacing: "0.2em" }}
                >
                  {slides[current].label}
                </p>
                <blockquote
                  className="text-xl sm:text-2xl md:text-3xl font-black leading-snug text-gray-900"
                  style={{
                    fontFamily: "'Barlow Condensed', 'Barlow', sans-serif",
                  }}
                >
                  {slides[current].quote}
                </blockquote>
              </div>

              <button
                onClick={prev}
                className="absolute left-2 sm:left-6 top-0 bottom-0 my-auto z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#9A9A9A] hover:bg-[#E99E20] active:bg-[#E99E20] cursor-pointer flex items-center justify-center text-white transition-colors"
                aria-label="Previous"
              >
                <Image src={ArrowBack} alt="Arrow back" />
              </button>
              <button
                onClick={next}
                className="absolute right-2 sm:right-6 top-0 bottom-0 my-auto z-20 w-9 h-9 sm:w-10 sm:h-10 bg-[#9A9A9A] hover:bg-[#E99E20] active:bg-[#E99E20] cursor-pointer rounded-full flex items-center justify-center text-white transition-colors"
                aria-label="Next"
              >
                <Image src={ArrowRight} alt="Arrow back" />
              </button>
            </div>
          </div>

          <div
            className="w-full -mt-16 md:-mt-30"
            style={{ position: "relative" }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "200px",
                background: "#ffffff",
                clipPath: "ellipse(55% 100% at 50% 0%)",
                zIndex: 2,
              }}
            />

            <div className="mx-0 md:-mx-[60px] h-[45vh] md:h-[60vh] lg:h-[65vh] relative">
              <Image
                src={ThirdImage}
                alt="Training workshop"
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
                priority
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "200px",
                  background: "#016068",
                  clipPath: "ellipse(55% 100% at 50% 100%)",
                  zIndex: 2,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="w-full px-4 sm:px-8 md:px-16 pb-14"
        style={{ backgroundColor: "#016068" }}
      >
        <div
          className="flex justify-center gap-3 py-4 z-100"
          style={{ backgroundColor: "#016068" }}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="w-5 h-5 rounded-sm transition-colors"
              style={{
                backgroundColor:
                  i === current ? "#1a1a1a" : "rgba(255,255,255,0.5)",
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 text-white text-sm leading-relaxed">
          <p className="font-normal text-base text-[#FEFEFE]">
            We take great pride in our training centres, and you’ll quickly see
            the time, care, and investment that has gone into creating an
            environment designed for effective learning. Our facilities have
            been developed to provide high-quality training across a range of
            disciplines, including Electrical, HVAC, and PLC & Automation
            courses. With our dedicated centre of excellence, we work hard to
            deliver the very best training as close to you as possible. Our
            continually expanding centres reflect our commitment to delivering
            industry-leading professional training and supporting learners at
            every stage of their careers.
          </p>
          <p className="font-normal text-base text-[#FEFEFE]">
            To ensure a comfortable and welcoming experience, our centres
            include several spacious lounge areas equipped with sofas, seating
            areas, dining spaces, vending machines, magazines, tool promotions,
            and a large TV for relaxation during breaks. Our classrooms are
            fully equipped with modern projector screens, climate control
            systems, and all the technical equipment required to support
            hands-on learning across our Electrical, HVAC, and PLC & Automation
            courses.
          </p>
          <div>
            <p className="font-normal text-base text-[#FEFEFE]">
              Since the formation of Technique Learning Solutions, ongoing
              reinvestment and development have demonstrated our strong
              commitment to our clients, staff, and the future of technical
              training. Our flagship facility in Derbyshire showcases these
              standards, featuring modern classrooms, practical workshops, and a
              dedicated IT suite. These spaces make use of a wide range of test
              rigs and training equipment, allowing candidates to experience
              realistic, real- world scenarios in a controlled learning
              environment.
            </p>
            <p>
              Whether you are a sole trader, part of an established engineering
              or facilities company, currently unemployed, or looking to
              retrain, we offer a range of Electrical, HVAC, and PLC &
              Automation courses designed to support your goals and help you
              take the next step in your career.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
