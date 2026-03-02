"use client";
import React, { useEffect, useState, useRef } from "react";
import LearnTechniqueLogo from "@/app/assets/svg/learntechnique.svg";
import LearnTechniqueLogoWhite from "@/app/assets/svg/learntechnique-white.png";
import Elmlogo from "@/app/assets/svg/elm.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Icon } from "@iconify/react";
import type { HeaderData } from "@/types/header";

const socialIconMap: Record<string, string> = {
  facebook: "mdi:facebook",
  instagram: "mdi:instagram",
  youtube: "mdi:youtube",
  linkedin: "mdi:linkedin",
  twitter: "mdi:twitter",
  tiktok: "ic:baseline-tiktok",
};

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function MegaMenu({ scrolled, data }: { scrolled: boolean; data: HeaderData }) {
  const [openSubcategory, setOpenSubcategory] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const toggleSubcategory = (key: string) => {
    setOpenSubcategory((prev) => (prev === key ? null : key));
  };

  return (
    <div
      className={`fixed left-0 right-0 bg-white shadow-2xl z-50 border-t border-gray-100 transition-all duration-500 ease-in-out ${
        scrolled ? "top-23" : "top-18"
      }`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-12px)",
        transition: "opacity 400ms ease, transform 400ms ease",
      }}
    >
      <div
        className={`mx-auto px-8 py-8 transition-all duration-500 ease-in-out ${
          scrolled ? "max-w-7xl" : "max-w-screen-2xl"
        }`}
      >
        <div className="grid grid-cols-4 gap-6">
          {data.megaMenuColumns.map((col, colIdx) => (
            <div
              key={colIdx}
              className="flex flex-col gap-4"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(-8px)",
                transition: `opacity 400ms ease ${colIdx * 60}ms, transform 400ms ease ${colIdx * 60}ms`,
              }}
            >
              <div
                style={{ backgroundColor: col.cardColor }}
                className="rounded-2xl p-5 flex-shrink-0"
              >
                <h3 className="font-bold text-sm text-gray-900 mb-2">
                  {col.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {col.description}
                </p>
              </div>

              <div className="flex flex-col gap-1 overflow-y-auto max-h-[40vh] pr-1">
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
                      <div
                        style={{
                          display: "grid",
                          gridTemplateRows: isOpen ? "1fr" : "0fr",
                          opacity: isOpen ? 1 : 0,
                          transition:
                            "grid-template-rows 300ms ease, opacity 300ms ease",
                        }}
                      >
                        <div className="overflow-hidden">
                          <div
                            style={{
                              backgroundColor: hexToRgba(col.cardColor, 0.4),
                            }}
                            className="rounded-lg mt-1 mb-1 py-2 px-3 flex flex-col gap-1"
                          >
                            {sub.items.map((item, itemIdx) => (
                              <Link
                                key={itemIdx}
                                href={
                                  item.slug?.current
                                    ? `/courses/${item.slug.current}`
                                    : item.href
                                }
                                className="text-sm text-gray-600 hover:text-teal-700 py-0.5 transition-colors"
                                style={{
                                  opacity: isOpen ? 1 : 0,
                                  transform: isOpen
                                    ? "translateY(0)"
                                    : "translateY(-4px)",
                                  transition: `opacity 200ms ease ${itemIdx * 40}ms, transform 200ms ease ${itemIdx * 40}ms`,
                                }}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 400ms ease 300ms",
          }}
        >
          <div className="flex items-center gap-8">
            {data.megaMenuFooter.links.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="hover:text-teal-700 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {data.megaMenuFooter.socialLinks.map((social) => (
              <Link
                key={social.platform}
                href={social.href}
                className="w-8 h-8 rounded-full bg-[#F5A623] flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <span className="sr-only">{social.platform}</span>
                <Icon
                  icon={socialIconMap[social.platform]}
                  className="w-4 h-4 text-white"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Header({ data }: { data: HeaderData }) {
  const [scrolled, setScrolled] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const megaMenuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // White header only on pages with dark hero (e.g. /courses). 404 and other pages use black.
  const pagesWithDarkHero = ["/courses"];
  const useWhiteStyle =
    pagesWithDarkHero.includes(pathname) && !scrolled && !showMegaMenu;

  const handleMouseEnter = () => {
    if (megaMenuTimeout.current) clearTimeout(megaMenuTimeout.current);
    setShowMegaMenu(true);
  };

  const handleMouseLeave = () => {
    megaMenuTimeout.current = setTimeout(() => {
      setShowMegaMenu(false);
    }, 80);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center ${
        showMegaMenu ? "bg-white" : ""
      }`}
    >
      <div
        className={`w-full transition-[max-width,margin,padding,box-shadow,border-radius] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${
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
                          className={`transition-transform duration-150 ease-out ${
                    showMegaMenu ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showMegaMenu && <MegaMenu scrolled={scrolled} data={data} />}
            </div>

            {data.navLinks.map((link) => (
              <Link key={link.label} href={link.href}>
                <p>{link.label}</p>
              </Link>
            ))}
          </nav>
        </section>
      </div>
    </header>
  );
}

export default Header;
