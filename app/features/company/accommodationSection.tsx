"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Reusing location images for the tabs
import ClayImage from "@/app/assets/png/clay.png";
import StirlingImage from "@/app/assets/png/striling.jpg";

type Tab = "chesterfield" | "leeds" | "stirling";

interface Hotel {
    name: string;
    image: any;
    price: string;
    distance: string;
}

const hotelsData: Record<Tab, Hotel[]> = {
    chesterfield: [
        { name: "Bateman's Mill Hotel", image: ClayImage, price: "£75.00/Night", distance: "4.5 miles Away" },
        { name: "Casa Hotel", image: StirlingImage, price: "£85.00/Night", distance: "2.5 miles Away" },
        { name: "Ringwood Hall Hotel", image: ClayImage, price: "£90.00/Night", distance: "5.0 miles Away" },
    ],
    leeds: [
        { name: "Premier Inn Leeds", image: StirlingImage, price: "£60.00/Night", distance: "1.2 miles Away" },
        { name: "Hilton Leeds City", image: ClayImage, price: "£110.00/Night", distance: "0.5 miles Away" },
        { name: "Malmaison Leeds", image: StirlingImage, price: "£95.00/Night", distance: "2.0 miles Away" },
    ],
    stirling: [
        { name: "Hotel Colessio", image: ClayImage, price: "£80.00/Night", distance: "3.5 miles Away" },
        { name: "Stirling Highland Hotel", image: StirlingImage, price: "£120.00/Night", distance: "1.0 miles Away" },
        { name: "Golden Lion Hotel", image: ClayImage, price: "£70.00/Night", distance: "1.8 miles Away" },
    ]
};

function AccommodationSection() {
    const [activeTab, setActiveTab] = useState<Tab>("chesterfield");

    const tabs: { id: Tab; label: string }[] = [
        { id: "chesterfield", label: "Chesterfield" },
        { id: "leeds", label: "Leeds" },
        { id: "stirling", label: "Stirling" },
    ];

    const currentHotels = hotelsData[activeTab];

    return (
        <section className="bg-white py-20 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 text-black">
                        Discount Accommodation
                    </h2>
                    <p className="text-black/60 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
                        Travelling to one of our centres? We have partnered with local hotels to provide
                        discounted rates for our learners. Select your training centre location below to see
                        available accommodation options.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center gap-4 mb-16">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-2 rounded-full font-bold text-sm uppercase transition-all shadow-sm ${activeTab === tab.id
                                    ? "bg-[#0088FF] text-white"
                                    : "bg-[#F3F6F6] text-[#627080] hover:bg-gray-200"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {currentHotels.map((hotel, index) => (
                        <div key={index} className="bg-white border flex flex-col items-center">
                            {/* Card Header (Logo placeholder) */}
                            <div className="w-full h-16 bg-[#1A2238] flex items-center justify-center p-3">
                                <span className="text-white font-semibold flex items-center gap-2">
                                    <span className="text-[#E99E20] text-xl">🏠</span>
                                    <span className="text-xs">{hotel.name.toUpperCase()}</span>
                                </span>
                            </div>

                            {/* Image with Tag */}
                            <div className="relative w-full aspect-video">
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-[#14AE5C]/10 text-[#14AE5C] px-4 py-1 rounded-full text-xs font-bold border border-[#14AE5C]/20">
                                    DISCOUNTED
                                </div>
                                <Image
                                    src={hotel.image}
                                    alt={hotel.name}
                                    fill
                                    className="object-cover opacity-60"
                                />
                                {/* Centered Pricing info over image */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-6">
                                    <p className="text-xs font-bold text-black uppercase mb-1">BOOK FOR</p>
                                    <p className="text-4xl font-black text-black">{hotel.price}</p>
                                    <p className="text-xs font-bold text-[#0088FF] uppercase mt-2">{hotel.distance}</p>
                                </div>
                            </div>

                            {/* Footer / Button Area */}
                            <div className="w-full bg-[#F3F6F6] p-4 flex justify-center">
                                <Button className="bg-[#14AE5C] hover:bg-[#14AE5C]/90 text-white rounded text-sm px-8 font-bold h-10 w-full max-w-[200px]">
                                    BOOK NOW
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default AccommodationSection;
