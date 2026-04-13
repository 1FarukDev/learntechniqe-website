"use client";

import { Car, Hotel as HotelIcon, MapPin } from "lucide-react";
import React, { useState } from "react";

interface Hotel {
  name: string;
  distance: string;
  address: string[];
  phone: string;
  website?: string;
  websiteLabel?: string;
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
        distance: "5 miles to Clay Cross",
        address: ["Church Lane,", "Palterton,", "Chesterfield,", "S44 6UZ"],
        phone: "01246 855455",
        website: "https://www.twinoakshotel.co.uk",
        websiteLabel: "www.twinoakshotel.co.uk",
      },
      {
        name: "Hotel Ibis",
        distance: "5 miles to Clay Cross",
        address: ["Lordsmill street,", "Palterton,", "Chesterfield,", "S41 7RW"],
        phone: "01246 385050",
        website: "https://all.accor.com/a/en.htmlk",
        websiteLabel: "all.accor.com",
      },
      {
        name: "The Shoulder At Hardstoft ",
        distance: "4 miles to Clay Cross",
        address: ["Hardstoft,", "Chesterfield,", "Chesterfield,", "S45 8AF"],
        phone: "01246 850276",
        website: "https://theshoulderathardstoft.com/",
        websiteLabel: "theshoulderathardstoft.com",
      },
      {
        name: "Casa Hotel",
        distance: "6 miles to Clay Cross",
        address: ["Lockoford Lane,", "Chesterfield,", "S41 7JB"],
        phone: "01246 245999",
        website: "https://www.casahotels.co.uk/",
        websiteLabel: "www.casahotels.co.uk",
      },
      {
        name: "Premier Inn – Chesterfield North",
        distance: "6 miles to Clay Cross",
        address: ["Tapton Lock Hill,", "Off Rotherway,", "Chesterfield,", "S41 7NJ"],
        phone: "0333 777 4593",
        website: "http://premierinn.com/gb/en/hotels/england/derbyshire/chesterfield/chesterfield-north.html",
        websiteLabel: "www.premierinn.com",
      },
      {
        name: "Forte Travelodge",
        distance: "7 miles to Clay Cross",
        address: ["Brimington Road North,", "Chesterfield,", "S41 9BE"],
        phone: "01246 455411",
        website: "https://www.travelodge.co.uk/hotels/121/Chesterfield-hotel",
        websiteLabel: "www.travelodge.co.uk",
      },
    ],
  },
  {
    id: "stirling",
    label: "STIRLING",
    hotels: [
      {
        name: "Anderson Guest House ",
        distance: "1 mile to Centre",
        address: ["8 Melville Terrace,", "Stirling,", "FK8 2NE"],
        phone: "01786 465185",
        // website: "https://www.stirlingcourthotel.com",
        // websiteLabel: "www.stirlingcourthotel.com",
      },
      {
        name: "Premier Inn (Centre) ",
        distance: ".5 mile to Centre",
        address: ["Forthside Way,", "Stirling,", "FK8 1QZ"],
        phone: "0871 527 9472",
        website: "https://www.premierinn.com/gb/en/home.html",
        websiteLabel: "www.premierinn.com",
      },
      {
        name: "Hotel Colessio ",
        distance: "1 mile to Centre",
        address: ["33 Spittal Street,", "Stirling,", "FK8 1DX"],
        phone: "01786 448880",
        website: "www.hotelcolessio.com",
        websiteLabel: "https://www.hotelcolessio.com/",
      },
      {
        name: "Cooks of Stirling Hotel  ",
        distance: ".2 mile to Centre",
        address: ["78 Upper Craigs,", "Stirling,", "FK8 2DT"],
        phone: "01786 430890",
        website: "www.cooksofstirling.co.uk",
        websiteLabel: "http://www.cooksofstirling.co.uk/",
      },
      {
        name: "The Golden Lion Flagship Hotel  ",
        distance: "1 mile to Centre",
        address: ["8 – 10 King Street,", "Stirling,", "FK8 1DQ"],
        phone: "01786 475351",
        website: "www.thegoldenlionstirling.com",
        websiteLabel: "https://www.thegoldenlionstirling.com/",
      },
      {
        name: "The Stirling Highland Hotel ",
        distance: "1 mile to Centre",
        address: ["33 Spittal Street,", "Stirling,", "FK8 1DU"],
        phone: "01786 272727",
        website: "https://www.thecairncollection.co.uk/hotels/the-stirling-highland/",
        websiteLabel: "www.thecairncollection.co.uk",
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
        <HotelIcon className="size-5 shrink-0 text-[#F5A623]" aria-hidden />
        <span
          className="text-white font-bold text-sm"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          {hotel.name}
        </span>
      </div>

      <div className="px-5 py-5 flex flex-col gap-3 items-center">
        <div className="flex items-center gap-1.5 bg-[#C8F1DB] text-[#14AE5C] py-1 px-2 rounded-xs">
          <Car className="size-4 shrink-0 text-[#F5A623]" aria-hidden />
          <span className="text-xs font-bold">{hotel.distance}</span>
        </div>

        <div className="text-sm text-black leading-relaxed text-center">
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
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeLocation = locations.find((l) => l.id === activeTab)!;

  const baseClasses =
    "flex items-center gap-2 rounded-md p-4 px-8 cursor-pointer transition-all";

  const switchTab = (newTab: string) => {
    if (newTab === activeTab) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(newTab);
      setIsTransitioning(false);
    }, 200);
  };

  return (
    <section className="w-full bg-white px-4 sm:px-8 md:px-12 py-12 md:py-20">
      <div className="text-center mb-10 md:mb-14">
        <h2 className="text-black text-3xl sm:text-4xl md:text-5xl font-semibold mb-3">
          Student Accommodation
        </h2>
        <p className="text-black text-base font-normal max-w-2xl mx-auto leading-relaxed">
          A range of affordable and comfortable hotel options are conveniently
          located close to the learning facility, providing students and
          visitors with safe, accessible, and quality accommodation.
        </p>
      </div>

      <div className="flex flex-row justify-center gap-2 mb-10">
        <div
          onClick={() => switchTab("clay-cross")}
          className={`${baseClasses} ${activeTab === "clay-cross"
            ? "bg-[#0088FF] text-white"
            : "bg-[#ECF0F0] text-[#627080]"
            }`}
        >
          <MapPin
            className={
              activeTab === "clay-cross" ? "text-white" : "text-[#F5A623]"
            }
          />
          <p className="uppercase">Clay Cross</p>
        </div>

        <div
          onClick={() => switchTab("stirling")}
          className={`${baseClasses} ${activeTab === "stirling"
            ? "bg-[#0088FF] text-white"
            : "bg-[#ECF0F0] text-[#627080]"
            }`}
        >
          <MapPin
            className={
              activeTab === "stirling" ? "text-white" : "text-[#F5A623]"
            }
          />
          <p className="uppercase">Stirling</p>
        </div>
      </div>

      <div
        className={`max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 transition-opacity duration-200 ease-in-out ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {activeLocation.hotels.map((hotel, i) => (
          <HotelCard key={i} hotel={hotel} />
        ))}
      </div>
    </section>
  );
}
