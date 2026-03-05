"use client";
import React, { useEffect, useState, useRef } from "react";
import LearnTechniqueLogo from "@/app/assets/svg/learntechnique.png";
import LearnTechniqueLogoWhite from "@/app/assets/svg/learntechnique-white.png";
import Elmlogo from "@/app/assets/svg/elm.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, X, Menu } from "lucide-react";
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

function MegaMenu({
  scrolled,
  data,
  onClose,
}: {
  scrolled: boolean;
  data: HeaderData;
  onClose: () => void;
}) {
  const [openSubcategory, setOpenSubcategory] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  const toggleSubcategory = (key: string) => {
    setOpenSubcategory((prev) => (prev === key ? null : key));
  };

  return (
    <div
      className={`fixed left-0 right-0 bg-white shadow-2xl z-50 border-t border-gray-100 ${scrolled ? "top-23" : "top-18"
        }`}
      style={{
        height: "calc(90vh - (scrolled ? 5.75rem : 4.5rem))",
        maxHeight: "90vh",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-12px)",
        transition: "opacity 400ms ease, transform 400ms ease",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className={`mx-auto px-4 md:px-8 py-8 w-full flex flex-col flex-1 min-h-0 transition-all duration-500 ease-in-out ${scrolled ? "max-w-7xl" : "max-w-screen-2xl"
          }`}
      >
        <div className="grid grid-cols-3 gap-6 flex-1 min-h-0">
          {data.megaMenuColumns.map((col, colIdx) => (
            <div
              key={colIdx}
              className="flex flex-col gap-4 min-h-0"
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

              <div className="flex flex-col gap-1 overflow-y-auto flex-1 min-h-0 pr-1">
                {col.subcategories.map((sub, subIdx) => {
                  const key = `${colIdx}-${subIdx}`;
                  const isOpen = openSubcategory === key;
                  return (
                    <div key={subIdx} className="flex-shrink-0">
                      <button
                        onClick={() => toggleSubcategory(key)}
                        className="w-full flex items-center justify-between py-2.5 px-1 text-sm font-semibold text-gray-800 hover:text-teal-700 transition-colors border-b border-gray-100"
                      >
                        {sub.label}
                        <ChevronDown
                          size={20}
                          className={`transition-transform duration-200 text-gray-500 ${isOpen ? "rotate-180" : ""
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
                                href={item.href}
                                onClick={onClose}
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

        <div
          className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500 flex-shrink-0"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 400ms ease 300ms",
          }}
        >
          <div className="flex items-center gap-8">
            {data.megaMenuFooter.links.map((link, idx) => (
              <Link
                key={idx}
                href={`${link.href}`}
                onClick={onClose}
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
                onClick={onClose}
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

function MobileDrawer({
  data,
  onClose,
}: {
  data: HeaderData;
  onClose: () => void;
}) {
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [openColumn, setOpenColumn] = useState<number | null>(null);
  const [openSubcategory, setOpenSubcategory] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-white z-50 flex flex-col shadow-2xl overflow-y-auto">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <Link href="/" onClick={onClose}>
            <Image
              src={LearnTechniqueLogo}
              alt="Learn Technique"
              width={130}
              height={34}
            />
          </Link>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col px-4 py-4 gap-1 flex-1">
          {/* Courses accordion */}
          <div>
            <button
              onClick={() => setCoursesOpen((p) => !p)}
              className="w-full flex items-center justify-between px-3 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 rounded-lg transition"
            >
              COURSES
              <ChevronDown
                size={20}
                className={`transition-transform text-gray-500 f ${coursesOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            {coursesOpen && (
              <div className="ml-3 mt-1 flex flex-col gap-1">
                {data.megaMenuColumns.map((col, colIdx) => (
                  <div key={colIdx}>
                    <button
                      onClick={() =>
                        setOpenColumn((p) => (p === colIdx ? null : colIdx))
                      }
                      className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-lg transition"
                    >
                      {col.title}
                      <ChevronDown
                        size={20}
                        className={`transition-transform text-gray-400 ${openColumn === colIdx ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    {openColumn === colIdx && (
                      <div className="ml-3 flex flex-col gap-1 mb-1">
                        {col.subcategories.map((sub, subIdx) => {
                          const key = `${colIdx}-${subIdx}`;
                          const isOpen = openSubcategory === key;
                          return (
                            <div key={subIdx}>
                              <button
                                onClick={() =>
                                  setOpenSubcategory((p) =>
                                    p === key ? null : key,
                                  )
                                }
                                className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-600 hover:text-[#016068] hover:bg-gray-50 rounded-lg transition"
                              >
                                {sub.label}
                                <ChevronDown
                                  size={20}
                                  className={`transition-transform text-gray-400 ${isOpen ? "rotate-180" : ""
                                    }`}
                                />
                              </button>
                              {isOpen && (
                                <div className="ml-3 flex flex-col gap-0.5 mb-1">
                                  {sub.items.map((item, itemIdx) => (
                                    <Link
                                      key={itemIdx}
                                      href={item.href}
                                      onClick={onClose}
                                      className="px-3 py-1.5 text-xs text-gray-500 hover:text-[#016068] rounded-lg hover:bg-gray-50 transition"
                                    >
                                      {item.label}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Other nav links */}
          {data.navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={onClose}
              className="px-3 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 rounded-lg transition uppercase"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Drawer Footer */}
        <div className="px-5 py-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            {data.megaMenuFooter.socialLinks.map((social) => (
              <Link
                key={social.platform}
                href={social.href}
                onClick={onClose}
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
    </>
  );
}

function Header({ data }: { data: HeaderData }) {
  const [scrolled, setScrolled] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);
  const megaMenuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  const noNavbarPages = ["/", "/not-found"];
  const isHomePage = noNavbarPages.includes(pathname);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setShowMegaMenu(false);
    setShowMobileDrawer(false);
  }, [pathname]);

  const useWhiteStyle = !isHomePage && !scrolled && !showMegaMenu;
  const handleClose = () => setShowMegaMenu(false);

  const handleMouseEnter = () => {
    if (megaMenuTimeout.current) clearTimeout(megaMenuTimeout.current);
    setShowMegaMenu(true);
  };

  const handleMouseLeave = () => {
    megaMenuTimeout.current = setTimeout(() => setShowMegaMenu(false), 80);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center ${showMegaMenu ? "bg-white" : ""
        }`}
    >
      <div
        className={`w-full transition-[max-width,margin,padding,box-shadow,border-radius] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled && !showMegaMenu
            ? "max-w-7xl mt-3 mx-4 rounded-2xl bg-white/80 backdrop-blur-md shadow-lg px-4 md:px-6 py-px md:py-2"
            : scrolled && showMegaMenu
              ? "max-w-7xl mt-3 mx-4 rounded-none px-6 py-2 shadow-none"
              : showMegaMenu
                ? "max-w-screen-2xl mt-0 mx-auto rounded-none px-4 md:px-8 py-0 shadow-none"
                : "max-w-screen-2xl mt-0 mx-auto rounded-none shadow-none px-4 md:px-8 py-0"
          }`}
      >
        <section className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center py-4"
            onClick={handleClose}
          >
            <Image
              src={useWhiteStyle ? LearnTechniqueLogoWhite : LearnTechniqueLogo}
              alt="Learn Technique Logo"
              width={160}
              height={40}
              className="w-18 md:w-38"
            />
            <div
              className={`w-px h-7 md:h-9 mx-2 md:mx-4 ${useWhiteStyle ? "bg-white" : "bg-black"}`}
            />
            <Image
              src={Elmlogo}
              alt="Elm Logo"
              width={160}
              height={40}
              className="w-18 md:w-38"
            />
          </Link>

          {/* Desktop Nav */}
          <nav
            className={`hidden md:flex items-center gap-8 py-4 ${useWhiteStyle ? "text-white" : "text-black"
              }`}
          >
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center gap-1 font-bold hover:text-[#E99E20] active:text-[#c9861a] transition-colors">
                <p>COURSES</p>
                <ChevronDown
                  size={20}
                  className={`transition-transform duration-150 ease-out ${showMegaMenu ? "rotate-180" : ""
                    }`}
                />
              </button>
              {showMegaMenu && (
                <MegaMenu
                  scrolled={scrolled}
                  data={data}
                  onClose={handleClose}
                />
              )}
            </div>

            {data.navLinks.map((link) => (
              <Link key={link.label} href={link.href} onClick={handleClose} className="font-bold uppercase hover:text-[#E99E20] active:text-[#c9861a] transition-colors">
                <p>{link.label}</p>
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden p-1 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setShowMobileDrawer(true)}
          >
            <Menu
              size={24}
              className={useWhiteStyle ? "text-white" : "text-gray-800"}
            />
          </button>
        </section>
      </div>

      {/* Mobile Drawer */}
      {showMobileDrawer && (
        <MobileDrawer data={data} onClose={() => setShowMobileDrawer(false)} />
      )}
    </header>
  );
}

export default Header;
