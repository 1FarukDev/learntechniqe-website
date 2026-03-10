"use client";

import { MapPin } from "lucide-react";
import React, { useState } from "react";
import HotelIcon from "@/app/assets/svg/hotel.svg";
import CarIcon from "@/app/assets/svg/car.svg";
import Image from "next/image";

interface Hotel {
  name: string;
  distance: string;
  address: string[];
  phone: string;
  website: string;
  websiteLabel: string;
}

interface Location {
  id: string;
  label: string;
  hotels: Hotel[];
}

const locations: Location[] = [
  {
    id: "clay-cross",
    label: "CLAY CROSS",
    hotels: [
      {
        name: "Twin Oaks Hotel",
        distance: "5 miles to Cross",
        address: ["Church Lane,", "Palterton,", "Chesterfield,", "S44 6UZ"],
        phone: "01246 855455",
        website: "https://www.twinoakshotel.co.uk",
        websiteLabel: "www.twinoakshotel.co.uk",
      },
      {
        name: "Twin Oaks Hotel",
        distance: "5 miles to Cross",
        address: ["Church Lane,", "Palterton,", "Chesterfield,", "S44 6UZ"],
        phone: "01246 855455",
        website: "https://www.twinoakshotel.co.uk",
        websiteLabel: "www.twinoakshotel.co.uk",
      },
      {
        name: "Twin Oaks Hotel",
        distance: "5 miles to Cross",
        address: ["Church Lane,", "Palterton,", "Chesterfield,", "S44 6UZ"],
        phone: "01246 855455",
        website: "https://www.twinoakshotel.co.uk",
        websiteLabel: "www.twinoakshotel.co.uk",
      },
      {
        name: "Twin Oaks Hotel",
        distance: "5 miles to Cross",
        address: ["Church Lane,", "Palterton,", "Chesterfield,", "S44 6UZ"],
        phone: "01246 855455",
        website: "https://www.twinoakshotel.co.uk",
        websiteLabel: "www.twinoakshotel.co.uk",
      },
      {
        name: "Twin Oaks Hotel",
        distance: "5 miles to Cross",
        address: ["Church Lane,", "Palterton,", "Chesterfield,", "S44 6UZ"],
        phone: "01246 855455",
        website: "https://www.twinoakshotel.co.uk",
        websiteLabel: "www.twinoakshotel.co.uk",
      },
      {
        name: "Twin Oaks Hotel",
        distance: "5 miles to Cross",
        address: ["Church Lane,", "Palterton,", "Chesterfield,", "S44 6UZ"],
        phone: "01246 855455",
        website: "https://www.twinoakshotel.co.uk",
        websiteLabel: "www.twinoakshotel.co.uk",
      },
    ],
  },
  {
    id: "stirling",
    label: "STIRLING",
    hotels: [
      {
        name: "Stirling Court Hotel",
        distance: "2 miles to Centre",
        address: ["University of Stirling,", "Stirling,", "FK9 4LA"],
        phone: "01786 466000",
        website: "https://www.stirlingcourthotel.com",
        websiteLabel: "www.stirlingcourthotel.com",
      },
      {
        name: "Premier Inn Stirling",
        distance: "3 miles to Centre",
        address: ["Forthside Way,", "Stirling,", "FK8 1QZ"],
        phone: "0333 777 2248",
        website: "https://www.premierinn.com",
        websiteLabel: "www.premierinn.com",
      },
      {
        name: "Holiday Inn Express Stirling",
        distance: "4 miles to Centre",
        address: ["Springkerse Business Park,", "Stirling,", "FK7 7XH"],
        phone: "01786 449922",
        website: "https://www.ihg.com",
        websiteLabel: "www.ihg.com",
      },
    ],
  },
];

function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <div
      className="rounded-md overflow-hidden"
      style={{
        backgroundColor: "#f8f9fa",
        border: "1px solid #e5e7eb",
      }}
    >
      <div
        className="flex items-center gap-2 px-5 py-3 justify-center"
        style={{ backgroundColor: "#0f172a" }}
      >
        <Image src={HotelIcon} alt="Hotel icon" />
        <span
          className="text-white font-bold text-sm"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          {hotel.name}
        </span>
      </div>

      <div className="px-5 py-5 flex flex-col gap-3 items-center">
        <div className="flex items-center gap-1.5 bg-[#C8F1DB] text-[#14AE5C] py-1 px-2 rounded-xs">
          <Image src={CarIcon} alt="Hotel icon" />
          <span className="text-xs font-bold" >
            {hotel.distance}
          </span>
        </div>

        <div className="text-sm text-black leading-relaxed">
          {hotel.address.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
          <p>{hotel.phone}</p>
        </div>

        <a
          href={hotel.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold underline"
          style={{ color: "#14AE5C" }}
        >
          {hotel.websiteLabel}
        </a>
      </div>
    </div>
  );
}

export default function StudentAccommodation() {
  const [activeTab, setActiveTab] = useState("clay-cross");

  const activeLocation = locations.find((l) => l.id === activeTab)!;

  const baseClasses =
    "flex items-center gap-2 rounded-md p-4 px-8 cursor-pointer transition-all";

  return (
    <section className="w-full bg-white px-12 py-20">
      <div className="text-center mb-14">
        <h2 className="text-black text-5xl font-semibold mb-3">
          Student Accommodation
        </h2>
        <p className="text-black text-base font-normal max-w-2xl mx-auto leading-relaxed">
          A range of affordable and comfortable hotel options are conveniently
          located close to the learning facility, providing students and
          visitors with safe, accessible, and quality accommodation.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-0 mb-10">
        <div
          onClick={() => setActiveTab("clay-cross")}
          className={`${baseClasses} ${
            activeTab === "clay-cross"
              ? "bg-[#0088FF] text-white"
              : "bg-[#ECF0F0] text-[#627080]"
          }`}
        >
          <MapPin />
          <p className="uppercase">Clay Cross</p>
        </div>

        <div
          onClick={() => setActiveTab("stirling")}
          className={`${baseClasses} sm:ml-4 ${
            activeTab === "stirling"
              ? "bg-[#0088FF] text-white"
              : "bg-[#ECF0F0] text-[#627080]"
          }`}
        >
          <MapPin />
          <p className="uppercase">Stirling</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-3 gap-6">
        {activeLocation.hotels.map((hotel, i) => (
          <HotelCard key={i} hotel={hotel} />
        ))}
      </div>
    </section>
  );
}
