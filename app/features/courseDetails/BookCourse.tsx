"use client";
import React, { useState } from "react";
import { MapPin, Globe, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import CityGuildsLogo from "@/app/assets/certifications/city.png";
import EalLogo from "@/app/assets/certifications/eal.svg";
import Image from "next/image";

type CourseDate = {
  month: string;
  day: number;
  from: string;
  to: string;
  spaces: number;
  location: string;
  price: string;
};

const courseDates: CourseDate[] = [
  {
    month: "FEB",
    day: 16,
    from: "16/02/26, 08:30 GMT",
    to: "27/02/26, 14:00 GMT",
    spaces: 2,
    location: "Clay Cross",
    price: "£1,450 + VAT",
  },
  {
    month: "MAR",
    day: 2,
    from: "02/03/26, 08:30 GMT",
    to: "13/03/26, 14:00 GMT",
    spaces: 8,
    location: "Clay Cross",
    price: "£1,450 + VAT",
  },
  {
    month: "MAR",
    day: 16,
    from: "16/03/26, 08:30 GMT",
    to: "27/03/26, 14:00 GMT",
    spaces: 11,
    location: "Clay Cross",
    price: "£1,450 + VAT",
  },
  {
    month: "MAR",
    day: 30,
    from: "30/03/26, 08:30 BST",
    to: "10/04/26, 14:00 BST",
    spaces: 10,
    location: "Clay Cross",
    price: "£1,450 + VAT",
  },
  {
    month: "APR",
    day: 27,
    from: "27/04/26, 08:30 BST",
    to: "08/05/26, 14:00 BST",
    spaces: 9,
    location: "Clay Cross",
    price: "£1,450 + VAT",
  },
  {
    month: "MAY",
    day: 11,
    from: "11/05/26, 08:30 BST",
    to: "22/05/26, 14:00 BST",
    spaces: 12,
    location: "Stirling",
    price: "£1,450 + VAT",
  },
  {
    month: "MAY",
    day: 25,
    from: "25/05/26, 08:30 BST",
    to: "05/06/26, 14:00 BST",
    spaces: 6,
    location: "Clay Cross",
    price: "£1,450 + VAT",
  },
  {
    month: "JUN",
    day: 8,
    from: "08/06/26, 08:30 BST",
    to: "19/06/26, 14:00 BST",
    spaces: 14,
    location: "Stirling",
    price: "£1,450 + VAT",
  },
  {
    month: "JUN",
    day: 22,
    from: "22/06/26, 08:30 BST",
    to: "03/07/26, 14:00 BST",
    spaces: 3,
    location: "Clay Cross",
    price: "£1,450 + VAT",
  },
  {
    month: "JUL",
    day: 6,
    from: "06/07/26, 08:30 BST",
    to: "17/07/26, 14:00 BST",
    spaces: 7,
    location: "Clay Cross",
    price: "£1,450 + VAT",
  },
  {
    month: "JUL",
    day: 20,
    from: "20/07/26, 08:30 BST",
    to: "31/07/26, 14:00 BST",
    spaces: 5,
    location: "Stirling",
    price: "£1,450 + VAT",
  },
  {
    month: "AUG",
    day: 3,
    from: "03/08/26, 08:30 BST",
    to: "14/08/26, 14:00 BST",
    spaces: 9,
    location: "Clay Cross",
    price: "£1,450 + VAT",
  },
  {
    month: "AUG",
    day: 17,
    from: "17/08/26, 08:30 BST",
    to: "28/08/26, 14:00 BST",
    spaces: 11,
    location: "Stirling",
    price: "£1,450 + VAT",
  },
  {
    month: "SEP",
    day: 7,
    from: "07/09/26, 08:30 BST",
    to: "18/09/26, 14:00 BST",
    spaces: 4,
    location: "Clay Cross",
    price: "£1,450 + VAT",
  },
  {
    month: "SEP",
    day: 21,
    from: "21/09/26, 08:30 BST",
    to: "02/10/26, 14:00 BST",
    spaces: 8,
    location: "Stirling",
    price: "£1,450 + VAT",
  },
  {
    month: "OCT",
    day: 5,
    from: "05/10/26, 08:30 BST",
    to: "16/10/26, 14:00 BST",
    spaces: 13,
    location: "Clay Cross",
    price: "£1,450 + VAT",
  },
  {
    month: "OCT",
    day: 19,
    from: "19/10/26, 08:30 GMT",
    to: "30/10/26, 14:00 GMT",
    spaces: 2,
    location: "Clay Cross",
    price: "£1,450 + VAT",
  },
];

const INITIAL_SHOW = 5;

const CADEMY_EMBED_URL =
  "https://cademy.io/embed/learntechnique/cg-2391-52-initial-and-periodic-inspection-and-testing-of-electrical-installations/dates";

const CADEMY_DIRECT_URL =
  "https://learntechnique.cademy.io/cg-2391-52-initial-and-periodic-inspection-and-testing-of-electrical-installations?utm_source=ref_link&utm_medium=checkout_embed&utm_campaign=category_link&utm_term=learntechnique";

function BookCourse() {
  const [showAll, setShowAll] = useState(false);
  const [location, setLocation] = useState("All locations");

  const filtered =
    location === "All locations"
      ? courseDates
      : courseDates.filter((d) => d.location === location);

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_SHOW);
  const remaining = filtered.length - INITIAL_SHOW;




  return (
    <div className="bg-white">
      <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="font-outfit font-bold text-3xl sm:text-4xl text-black mb-6 sm:mb-8">
          Book Course
        </h2>

        {/* Prerequisites & Accreditation */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-15 mb-8 sm:mb-10">
          <div className="flex items-stretch gap-3 flex-wrap sm:flex-nowrap">
            <div className="border border-gray-200 rounded-xl p-4 w-full sm:w-44 flex flex-col justify-between bg-gray-50">
              <p className="text-gray-800 font-semibold text-sm leading-snug mb-3">
                Course <br /> Pre-Requisites:
              </p>
              <p className="text-gray-500 text-xs leading-5">
                Understanding of Basic Electrical Principles
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-4 w-36 flex flex-col items-center justify-between bg-gray-50">
              <Image
                src={CityGuildsLogo}
                alt="City & Guilds"
                width={90}
                height={50}
                className="object-contain"
              />
              <p className="text-[#14AE5C] bg-[#DCF2E9] p-2 py-1 rounded-full text-xs font-normal mt-4">
                Accredited
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-4 w-36 flex flex-col items-center justify-between bg-gray-50">
              <Image
                src={EalLogo}
                alt="EAL"
                width={80}
                height={50}
                className="object-contain"
              />
              <p className="text-[#14AE5C] bg-[#DCF2E9] text-xs p-2 py-1 rounded-full font-normal mt-3">
                Accredited
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="font-bold text-gray-800 text-base leading-snug mb-3">
              Upon completion of <br /> TIEM10 participants receive:
            </p>
            <p className="text-gray-500 text-sm mb-2">
              The EAL Level 3 Award in Industrial & Panel Wiring certification.
            </p>
            <p className="text-gray-500 text-sm">
              Fundamental Electrical Principles for Industrial Practices (PLC)
            </p>
          </div>
        </div>

        {/* Location filter */}
        <div className="flex justify-center mb-6 sm:mb-8 py-3 sm:py-5">
          <div className="relative w-full max-w-md">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setShowAll(false);
              }}
              className="w-full appearance-none bg-gray-100 border border-gray-200 rounded-full pl-10 pr-10 py-3.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#016068] cursor-pointer"
            >
              <option>All locations</option>
              <option>Clay Cross</option>
              <option>Stirling</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Course date cards */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-3 mb-8">
            {visible.map((date, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 bg-gray-50 border border-gray-100 rounded-xl px-4 sm:px-5 py-4"
              >
                {/* Date badge + info */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-14 shrink-0 rounded-lg overflow-hidden text-center shadow-sm">
                    <div className="bg-red-500 text-white text-xs font-bold py-1 uppercase tracking-wider">
                      {date.month}
                    </div>
                    <div className="bg-white text-gray-800 font-bold text-xl py-1.5 border border-t-0 border-gray-200 rounded-b-lg">
                      {date.day}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-gray-700 text-sm font-medium">
                      <span className="text-gray-500">From: </span>
                      {date.from}
                    </p>
                    <p className="text-gray-700 text-sm font-medium">
                      <span className="text-gray-500">To: </span>
                      {date.to}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      {date.spaces} spaces left
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                  <div className="flex items-center gap-1.5 bg-[#e6f7f4] text-[#016068] text-xs font-semibold px-3 py-1.5 rounded-full shrink-0">
                    <MapPin className="w-3 h-3" />
                    {date.location}
                  </div>

                  <p className="text-gray-700 font-semibold text-sm sm:w-28 text-center shrink-0">
                    {date.price}
                  </p>
                  <Button
                    onClick={() => window.open(CADEMY_DIRECT_URL, "_blank")}
                    className="bg-[#016068] hover:bg-[#014d54] text-white font-semibold rounded-full px-5 sm:px-6 h-9 sm:h-10 shrink-0 text-xs sm:text-sm"
                  >
                    Book
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {!showAll && remaining > 0 && (
            <div className="flex justify-center">
              <Button
                onClick={() => setShowAll(true)}
                className="bg-[#016068] hover:bg-[#014d54] text-white font-semibold px-12 sm:px-20 h-12 w-full sm:w-auto"
              >
                See {remaining} more
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default BookCourse;
