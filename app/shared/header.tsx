"use client";
import React, { useEffect, useState, useRef } from "react";
import LearnTechniqueLogo from "@/app/assets/svg/learntechnique.svg";
import LearnTechniqueLogoWhite from "@/app/assets/svg/learntechnique-white.png";
import Elmlogo from "@/app/assets/svg/elm.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

const megaMenuData = [
  {
    title: "ELECTRICAL",
    description:
      "We have a wide range of electrician courses aimed at different levels, whether you're looking to start a career as an electrician.",
    cardColor: "bg-[#E8F4F4]",
    subcategories: [
      {
        label: "Course Packages",
        items: ["Package A", "Package B", "Package C"],
      },
      { label: "PAT Testing", items: ["PAT Level 1", "PAT Level 2"] },
      {
        label: "Electrical Vehicle Charging",
        items: ["EV Installer", "EV Advanced"],
      },
    ],
  },
  {
    title: "AIRCON & REFRIGERATION",
    description:
      "We have a wide range of electrician courses aimed at different levels, whether you're looking to start a career as an electrician.",
    cardColor: "bg-[#FEF3DC]",
    subcategories: [
      { label: "Course Packages", items: ["TCR15", "TCR10", "TC20"] },
      { label: "Electrical Courses", items: ["Course A", "Course B"] },
      { label: "Electrical Courses", items: ["Course C", "Course D"] },
    ],
  },
  {
    title: "PLC & AUTOMATION",
    description:
      "We have a wide range of electrician courses aimed at different levels, whether you're looking to start a career as an electrician.",
    cardColor: "bg-[#E8EEF8]",
    subcategories: [
      {
        label: "Electrical Courses",
        items: ["PLC Fundamentals", "PLC Advanced"],
      },
      {
        label: "Electrical Courses",
        items: ["Automation Basics", "Automation Pro"],
      },
      { label: "Electrical Courses", items: ["SCADA Intro", "SCADA Advanced"] },
    ],
  },
  {
    title: "Electrical Courses",
    description:
      "We have a wide range of electrician courses aimed at different levels, whether you're looking to start a career as an electrician.",
    cardColor: "bg-[#E8F5E8]",
    subcategories: [
      { label: "Electrical Courses", items: ["18th Edition", "17th Edition"] },
      {
        label: "Electrical Courses",
        items: ["City & Guilds 2365", "City & Guilds 2357"],
      },
      {
        label: "Electrical Courses",
        items: ["Inspection & Testing", "Solar PV"],
      },
    ],
  },
];

function MegaMenu({ scrolled }: { scrolled: boolean }) {
  const [openSubcategory, setOpenSubcategory] = useState<string | null>(null);

  const toggleSubcategory = (key: string) => {
    setOpenSubcategory((prev) => (prev === key ? null : key));
  };

  return (
    <div
      className={`fixed left-0 right-0 bg-white shadow-2xl z-50 border-t border-gray-100 transition-all duration-500 ease-in-out ${
        scrolled ? "top-23" : "top-18"
      }`}
    >
      <div
        className={`mx-auto px-8 py-8 transition-all duration-500 ease-in-out ${
          scrolled ? "max-w-7xl" : "max-w-screen-2xl"
        }`}
      >
        <div className="grid grid-cols-4 gap-6">
          {megaMenuData.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-4">
              <div className={`${col.cardColor} rounded-2xl p-5`}>
                <h3 className="font-bold text-sm text-gray-900 mb-2">
                  {col.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {col.description}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                {col.subcategories.map((sub, subIdx) => {
                  const key = `${colIdx}-${subIdx}`;
                  const isOpen = openSubcategory === key;
                  return (
                    <div key={subIdx}>
                      <button
                        onClick={() => toggleSubcategory(key)}
                        className="w-full flex items-center justify-between py-2.5 px-1 text-sm font-semibold text-gray-800 hover:text-teal-700 transition-colors border-b border-gray-100"
                      >
                        {sub.label}
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 text-gray-500 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="bg-gray-50 rounded-lg mt-1 mb-1 py-2 px-3 flex flex-col gap-1">
                          {sub.items.map((item, itemIdx) => (
                            <Link
                              key={itemIdx}
                              href="#"
                              className="text-sm text-gray-600 hover:text-teal-700 py-0.5 transition-colors"
                            >
                              {item}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 grid grid-cols-4 gap-6 text-sm text-gray-500">
          <Link
            href="#"
            className="hover:text-teal-700 font-medium transition-colors"
          >
            Why choose us?
          </Link>
          <Link
            href="#"
            className="hover:text-teal-700 font-medium transition-colors"
          >
            Help & Support
          </Link>
          <Link
            href="#"
            className="hover:text-teal-700 font-medium transition-colors"
          >
            General FAQs
          </Link>
          <div className="flex items-center gap-3 justify-end">
            {["facebook", "instagram", "youtube", "linkedin"].map(
              (platform) => (
                <Link
                  key={platform}
                  href="#"
                  className="w-8 h-8 rounded-full bg-[#F5A623] flex items-center justify-center hover:opacity-80 transition-opacity"
                >
                  <span className="sr-only">{platform}</span>
                  <div className="w-4 h-4 bg-white rounded-sm opacity-80" />
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const megaMenuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const useWhiteStyle = !isHomePage && !scrolled && !showMegaMenu;

  const handleMouseEnter = () => {
    if (megaMenuTimeout.current) clearTimeout(megaMenuTimeout.current);
    setShowMegaMenu(true);
  };

  const handleMouseLeave = () => {
    megaMenuTimeout.current = setTimeout(() => {
      setShowMegaMenu(false);
    }, 150);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-in-out ${
        showMegaMenu ? "bg-white" : ""
      }`}
    >
      <div
        className={`w-full transition-all duration-500 ease-in-out ${
          scrolled && !showMegaMenu
            ? "max-w-7xl mt-3 mx-4 rounded-2xl bg-white/80 backdrop-blur-md shadow-lg px-6 py-2"
            : scrolled && showMegaMenu
              ? "max-w-7xl mt-3 mx-4 rounded-none px-6 py-2 shadow-none"
              : showMegaMenu
                ? "max-w-screen-2xl mt-0 mx-auto rounded-none px-8 py-0 shadow-none"
                : "max-w-screen-2xl mt-0 mx-auto rounded-none shadow-none px-8 py-0"
        }`}
      >
        <section className="flex justify-between items-center">
          <Link href="/" className="flex items-center py-4">
            <Image
              src={useWhiteStyle ? LearnTechniqueLogoWhite : LearnTechniqueLogo}
              alt="Learn Technique Logo"
              width={160}
              height={40}
            />
            <div
              className={`w-px h-9 mx-4 ${useWhiteStyle ? "bg-white" : "bg-black"}`}
            />
            <Image src={Elmlogo} alt="Elm Logo" width={80} height={40} />
          </Link>

          <nav
            className={`flex items-center gap-8 py-4 ${
              useWhiteStyle ? "text-white" : "text-black"
            }`}
          >
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center gap-1 hover:opacity-70 transition-opacity">
                <p>Courses</p>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    showMegaMenu ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showMegaMenu && <MegaMenu scrolled={scrolled} />}
            </div>

            <Link href="#">
              <p>Am2 Assessment</p>
            </Link>
            <Link href="#">
              <p>Resettlement</p>
            </Link>
            <Link href="#">
              <p>Contact</p>
            </Link>
            <Link href="#">
              <p>Blog</p>
            </Link>
          </nav>
        </section>
      </div>
    </header>
  );
}

export default Header;
