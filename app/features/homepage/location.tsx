"use client";

import { Button } from "@/components/ui/button";
import { MapPin, X } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ClayImage from "@/app/assets/png/clay.png";
import ArrowRight from "@/app/assets/svg/arrow-front.svg";
import ArrowBack from "@/app/assets/svg/arrow-back.svg";
import StirlingImage from "@/app/assets/png/striling.jpg";
import { createPortal } from "react-dom";
import { getVirtualTourEmbedUrl } from "@/lib/constants/virtual-tour";
import { Video } from "lucide-react";

const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps/d/u/0/embed?mid=1em932n3y81l82ryO6QIhmOhDGMtA4J0&ehbc=2E312F";
const tabs = ["clay", "stirling"] as const;
type Tab = (typeof tabs)[number];

const locationData: Record<
  Tab,
  {
    image: typeof ClayImage;
    subtitle: string;
    title: string;
    address: string;
  }
> = {
  clay: {
    image: ClayImage,
    subtitle: "OUR TRAINING CENTRES",
    title: "Our New Centre of Excellence",
    address:
      "Technique Tower Business Park\nHigh Street, Clay Cross\nDerbyshire, S45 9EA",
  },
  stirling: {
    image: StirlingImage,
    subtitle: "Stirling",
    title: "Our Stirling\nTraining Centre",
    address:
      "Stirling Business Centre\nWellgreen Road, Stirling\nScotland FK8 2DZ",
  },
};

const Location: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("clay");
  const [mapOpen, setMapOpen] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const virtualTourEmbedUrl = getVirtualTourEmbedUrl();

  useEffect(() => {
    document.body.style.overflow = mapOpen || tourOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mapOpen, tourOpen]);

  const baseClasses =
    "flex items-center gap-2 rounded-md p-4 px-8 cursor-pointer transition-all";

  const switchTab = (newTab: Tab) => {
    if (newTab === activeTab) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(newTab);
      setIsTransitioning(false);
    }, 200);
  };

  const handlePrev = () => {
    const currentIndex = tabs.indexOf(activeTab);
    switchTab(tabs[(currentIndex - 1 + tabs.length) % tabs.length]);
  };

  const handleNext = () => {
    const currentIndex = tabs.indexOf(activeTab);
    switchTab(tabs[(currentIndex + 1) % tabs.length]);
  };

  const current = locationData[activeTab];

  return (
    <section className="py-15 sm:py-30 max-w-7xl mx-auto md:px-0 px-4">
      <div className="flex flex-row justify-center sm:justify-end gap-2">
        <button
          type="button"
          onClick={() => switchTab("clay")}
          className={`${baseClasses} ${
            activeTab === "clay"
              ? "bg-[#0088FF] text-white"
              : "bg-[#ECF0F0] text-[#627080]"
          }`}
        >
          <MapPin
            className={
              activeTab === "clay" ? "text-white" : "text-[#F5A623]"
            }
          />
          <span className="uppercase">Clay Cross</span>
        </button>

        <button
          type="button"
          onClick={() => switchTab("stirling")}
          className={`${baseClasses} ${
            activeTab === "stirling"
              ? "bg-[#0088FF] text-white"
              : "bg-[#ECF0F0] text-[#627080]"
          }`}
        >
          <MapPin
            className={
              activeTab === "stirling" ? "text-white" : "text-[#F5A623]"
            }
          />
          <span className="uppercase">Stirling</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row mt-6 sm:mt-10 justify-between items-center gap-6">
        <div
          className={`flex flex-col gap-4 sm:gap-8 mt-6 sm:mt-13 w-full md:w-1/2 order-2 md:order-1 transition-opacity duration-200 ease-in-out ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          <h3 className="text-[#01656B] font-bold text-sm sm:text-base">
            {current.subtitle}
          </h3>
          <h2 className="text-black font-semibold text-[32px] sm:text-[40px] md:text-5xl whitespace-pre-line">
            {current.title}
          </h2>
          <p className="text-black font-normal text-sm sm:text-base whitespace-pre-line">
            {current.address}
          </p>

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
            <Button
              asChild
              className="uppercase bg-[#01656B] text-white h-12 sm:h-17.25 px-8 sm:px-10 text-sm sm:text-base"
            >
              <Link href="/contact">Training centre contact</Link>
            </Button>
            <Button
              onClick={() => setMapOpen(true)}
              className="uppercase bg-[#14AE5C] text-white h-12 sm:h-17.25 px-6 sm:px-8 text-sm sm:text-base"
            >
              Google Maps
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setTourOpen(true)}
              className="uppercase border-2 border-[#01656B] text-[#01656B] bg-white hover:bg-[#01656B]/5 h-12 sm:h-17.25 px-6 sm:px-8 text-sm sm:text-base gap-2"
            >
              <Video className="size-4 shrink-0" aria-hidden />
              Take a virtual tour of our centre
            </Button>
          </div>

          {mapOpen &&
            createPortal(
              <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
                onClick={() => setMapOpen(false)}
              >
                <div
                  className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="font-semibold text-lg">
                      Our Training Centres
                    </h3>
                    <button
                      onClick={() => setMapOpen(false)}
                      className="p-2 rounded-lg hover:bg-gray-100 transition"
                      aria-label="Close map"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <div className="aspect-video w-full">
                    <iframe
                      src={GOOGLE_MAPS_EMBED_URL}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Technique Training Centres Map"
                    />
                  </div>
                </div>
              </div>,
              document.body,
            )}

          {tourOpen &&
            createPortal(
              <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-modal-overlay"
                onClick={() => setTourOpen(false)}
              >
                <div
                  className="relative bg-white rounded-lg shadow-2xl max-w-5xl w-full overflow-hidden max-h-[90vh] flex flex-col animate-modal-panel-pop"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between p-4 border-b shrink-0">
                    <h3 className="font-semibold text-lg pr-4">
                      Virtual tour of our training centre
                    </h3>
                    <button
                      type="button"
                      onClick={() => setTourOpen(false)}
                      className="p-2 rounded-lg hover:bg-gray-100 transition shrink-0"
                      aria-label="Close virtual tour"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  {virtualTourEmbedUrl ? (
                    <div className="aspect-video w-full bg-black shrink-0">
                      <iframe
                        src={virtualTourEmbedUrl}
                        title="Virtual tour of our training centre"
                        className="h-full w-full"
                        style={{ border: 0 }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  ) : (
                    <div className="p-8 sm:p-10 text-center space-y-4">
                      <p className="text-black/80 text-sm sm:text-base leading-relaxed">
                        We&apos;re preparing a virtual tour of our facilities.
                        Contact us to arrange a visit or to find out more about
                        our training centres.
                      </p>
                      <Button
                        asChild
                        className="uppercase bg-[#01656B] text-white h-12 px-8"
                      >
                        <Link href="/contact">Contact us</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>,
              document.body,
            )}
        </div>

        <div
          className={`relative w-full md:w-1/2 aspect-[626.32/488.05] max-w-[626.32px] max-h-[488.05px] order-1 md:order-2 transition-opacity duration-200 ease-in-out ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          <Image
            src={current.image}
            alt={current.title}
            className="rounded-lg object-cover"
            fill
          />
          <div className="flex justify-between absolute w-full top-1/2 transform -translate-y-1/2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous location"
              className="bg-[#E99E20] p-2 px-2.75 rounded-full -ml-3 cursor-pointer hover:opacity-80 transition"
            >
              <Image src={ArrowBack} alt="" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next location"
              className="bg-[#E99E20] p-2 px-2.75 rounded-full -mr-3 cursor-pointer hover:opacity-80 transition"
            >
              <Image src={ArrowRight} alt="" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
