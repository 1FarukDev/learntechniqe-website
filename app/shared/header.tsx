"use client";
import React, { useEffect, useState, useRef } from "react";
import LearnTechniqueLogo from "@/app/assets/svg/learntechnique.png";
import LearnTechniqueLogoWhite from "@/app/assets/svg/learntechnique-white.png";
import Elmlogo from "@/app/assets/svg/elm.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  X,
  Menu,
  Clock,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { Icon } from "@iconify/react";
import type { HeaderData, MegaMenuFooter } from "@/types/header";
import { categoryHrefFromMegaMenuTitle } from "@/lib/course-categories";
import type { PathwayNavItem } from "./headerWrapper";

function toTitleCase(str: string): string {
  if (!str) return str;
  return str
  // .toLowerCase()
  // .replace(/\b\w/g, (c) => c.toUpperCase());
}

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

const parsePrice = (val: string | number | undefined | null): number => {
  if (!val) return 0;
  if (typeof val === "number") return val;
  return parseFloat(val.replace(/[^0-9.]/g, "")) || 0;
};

const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);

function extractText(val: unknown): string | null {
  if (typeof val === "string") return val;
  if (val && typeof val === "object" && "children" in val) {
    const children = (val as any).children;
    if (Array.isArray(children))
      return children.map((c: any) => c.text ?? "").join("");
  }
  return null;
}

/** Scroll a subcategory block fully into the mega menu scrollport (opening dropdown stays visible). */
function scrollMegaMenuBlockIntoView(
  scroller: HTMLElement,
  block: HTMLElement,
  padding = 20,
) {
  const blockRect = block.getBoundingClientRect();
  const scrollerRect = scroller.getBoundingClientRect();
  let delta = 0;
  if (blockRect.bottom > scrollerRect.bottom - padding) {
    delta = blockRect.bottom - scrollerRect.bottom + padding;
  } else if (blockRect.top < scrollerRect.top + padding) {
    delta = blockRect.top - scrollerRect.top - padding;
  }
  if (delta !== 0) {
    scroller.scrollTo({
      top: scroller.scrollTop + delta,
      behavior: "smooth",
    });
  }
}

/* ────────────────────────────────────────────────────────────
   Desktop-only COURSES mega menu
   ──────────────────────────────────────────────────────────── */
function CoursesMegaMenu({
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
  const megaMenuScrollRef = useRef<HTMLDivElement>(null);
  const subcategoryBlockRefs = useRef<Map<string, HTMLDivElement | null>>(
    new Map(),
  );

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  const toggleSubcategory = (key: string) => {
    setOpenSubcategory((prev) => {
      const next = prev === key ? null : key;
      if (next !== null) {
        window.setTimeout(() => {
          const scroller = megaMenuScrollRef.current;
          const block = subcategoryBlockRefs.current.get(next);
          if (scroller && block) {
            scrollMegaMenuBlockIntoView(scroller, block);
          }
        }, 380);
      }
      return next;
    });
  };

  return (
    <div
      className={`hidden md:flex fixed left-0 right-0 z-50 flex-col overflow-hidden bg-white shadow-2xl border-t border-gray-100 max-h-[87vh] ${scrolled ? "top-[4.5rem]" : "top-[4.25rem]"
        }`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-12px)",
        transition: "opacity 400ms ease, transform 400ms ease",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-0 py-4 md:py-4 w-full flex flex-col flex-1 min-h-0 overflow-hidden">
        <div
          ref={megaMenuScrollRef}
          data-mega-menu-courses-scroll
          className="grid grid-cols-3 gap-6 flex-1 min-h-0 overflow-y-auto overscroll-contain pr-1 -mr-1 [scrollbar-gutter:stable]"
        >
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
                className="rounded-2xl p-4 shrink-0"
              >
                <h3 className="font-bold text-sm text-gray-900 mb-2">
                  <Link
                    href={categoryHrefFromMegaMenuTitle(col.title)}
                    onClick={onClose}
                    className="inline-block rounded-sm text-gray-900 underline-offset-2 hover:underline hover:text-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
                  >
                    {toTitleCase(col.title)}
                  </Link>
                </h3>
                <p className="text-[12px] text-gray-600 leading-relaxed">
                  {col.description}
                </p>
              </div>

              <div className="flex flex-col gap-1 min-h-0">
                {col.subcategories.map((sub, subIdx) => {
                  const key = `${colIdx}-${subIdx}`;
                  const isOpen = openSubcategory === key;
                  return (
                    <div
                      key={subIdx}
                      className="shrink-0"
                      ref={(el) => {
                        const m = subcategoryBlockRefs.current;
                        if (el) m.set(key, el);
                        else m.delete(key);
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => toggleSubcategory(key)}
                        className="w-full flex items-center justify-between py-1 px-1 text-sm font-semibold text-gray-800 hover:text-teal-700 transition-colors border-gray-100"
                      >
                        {toTitleCase(sub.label)}
                        <ChevronDown
                          size={16}
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
                                {toTitleCase(item.label)}
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
          className="mt-6 pt-4 md:mt-8 md:pt-6 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500 shrink-0"
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
                {toTitleCase(link.label)}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {data.megaMenuFooter.socialLinks.map((social) => (
              <Link
                key={social.platform}
                href={social.href}
                onClick={onClose}
                target="_blank"
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

/* ────────────────────────────────────────────────────────────
   Desktop-only PATHWAYS mega menu
   ──────────────────────────────────────────────────────────── */
function PathwaysMegaMenu({
  scrolled,
  pathways,
  megaMenuFooter,
  onClose,
}: {
  scrolled: boolean;
  pathways: PathwayNavItem[];
  megaMenuFooter: MegaMenuFooter;
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className={`hidden md:flex fixed left-0 right-0 z-50 flex-col overflow-hidden bg-white shadow-2xl border-t border-gray-100 ${scrolled ? "top-[4.5rem]" : "top-[4.25rem]"
        }`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-12px)",
        transition: "opacity 400ms ease, transform 400ms ease",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-0 py-6 md:py-8 w-full">
        {/* Top heading row */}
        <div
          className="flex items-center justify-between mb-6"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 400ms ease 100ms",
          }}
        >
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Career Pathways
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">
              Choose your career journey — from complete beginner to fully
              qualified electrician
            </p>
          </div>
          <Link
            href="/pathways"
            onClick={onClose}
            className="flex items-center gap-1.5 text-sm font-semibold text-[#016068] hover:text-[#014d54] transition-colors shrink-0"
          >
            View All Pathways
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Pathway cards */}
        <div className="grid grid-cols-4 gap-4">
          {pathways.map((p, idx) => {
            const pw = p.pathway;
            const price = parsePrice(pw.priceIncVat);
            const desc = extractText(pw.description);
            const href = p.href ?? `/pathways/${pw.slug}`;

            return (
              <Link
                key={pw.slug}
                href={href}
                onClick={onClose}
                className="group text-left rounded-2xl border-2 border-gray-200 overflow-hidden transition-all duration-200 hover:border-[#016068]/40 hover:shadow-md"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(10px)",
                  transition: `opacity 400ms ease ${idx * 70 + 120}ms, transform 400ms ease ${idx * 70 + 120}ms, border-color 200ms, box-shadow 200ms`,
                }}
              >
                {pw.heroImage && (
                  <div className="relative w-full h-28 overflow-hidden">
                    <Image
                      src={pw.heroImage}
                      alt={pw.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="280px"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    {p.badge && (
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-[#E99E20] text-white text-[10px] font-bold rounded-sm tracking-wide">
                        {p.badge}
                      </span>
                    )}
                  </div>
                )}

                <div className="p-3.5">
                  <h4 className="text-sm font-bold leading-snug mb-1 line-clamp-2 text-gray-900 group-hover:text-[#016068] transition-colors">
                    {pw.title}
                  </h4>

                  {desc && (
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-2.5">
                      {desc}
                    </p>
                  )}

                  <div className="flex items-center justify-between gap-2">
                    {price > 0 && (
                      <span className="text-sm font-bold text-[#016068]">
                        {formatPrice(price)}
                        <span className="text-[10px] font-normal text-gray-400 ml-0.5">
                          + VAT
                        </span>
                      </span>
                    )}
                    {pw.duration && (
                      <span className="flex items-center gap-1 text-[11px] text-gray-400">
                        <Clock size={11} />
                        {pw.duration}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Support links + social (matches site footer intent) */}
        <div
          className="mt-6 pt-5 md:mt-8 md:pt-6 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shrink-0"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 400ms ease 280ms",
          }}
        >
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
            <Link
              href="/company"
              onClick={onClose}
              className="font-medium hover:text-teal-700 transition-colors"
            >
              Why Choose Us?
            </Link>
            <Link
              href="/contact"
              onClick={onClose}
              className="font-medium hover:text-teal-700 transition-colors"
            >
              Help & Support
            </Link>
            <Link
              href="/company#general-faqs"
              onClick={onClose}
              className="font-medium hover:text-teal-700 transition-colors"
            >
              General FAQs
            </Link>
          </div>
          <div className="flex items-center gap-3">
            {megaMenuFooter.socialLinks.map((social) => (
              <Link
                key={social.platform}
                href={social.href}
                onClick={onClose}
                target="_blank"
                rel="noopener noreferrer"
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

/* ────────────────────────────────────────────────────────────
   Mobile drawer
   ──────────────────────────────────────────────────────────── */
function MobileDrawer({
  data,
  pathwayNavItems,
  onClose,
}: {
  data: HeaderData;
  pathwayNavItems: PathwayNavItem[];
  onClose: () => void;
}) {
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [pathwaysOpen, setPathwaysOpen] = useState(false);
  const [openColumn, setOpenColumn] = useState<number | null>(null);
  const [openSubcategory, setOpenSubcategory] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const otherNavLinks = data.navLinks.filter(
    (link) =>
      link.label.toLowerCase() !== "career pathways" &&
      link.label.toLowerCase() !== "contact",
  );

  const contactLink = data.navLinks.find(
    (link) => link.label.toLowerCase() === "contact",
  );

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-40 animate-mobile-menu-overlay"
        onClick={onClose}
      />

      <div className="fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-white z-50 flex flex-col shadow-2xl animate-mobile-menu-panel">
        {/* Drawer header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 shrink-0">
          <Link href="/" onClick={onClose}>
            <Image
              src={LearnTechniqueLogo}
              alt="Learn Technique"
              width={130}
              height={34}
              className="w-28"
            />
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-xl hover:bg-gray-100 transition"
          >
            <X size={24} strokeWidth={2.25} className="text-gray-600" />
          </button>
        </div>

        {/* Scrollable nav body */}
        <nav className="flex flex-col px-3 py-3 gap-0.5 flex-1 overflow-y-auto overscroll-contain">
          {/* Courses accordion */}
          <div>
            <button
              onClick={() => setCoursesOpen((p) => !p)}
              className="w-full flex items-center justify-between px-3 py-3 text-sm font-semibold text-gray-900 hover:text-teal-700 rounded-lg transition-colors border-b border-gray-100"
            >
              Courses
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ease-out text-gray-500 ${coursesOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${coursesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
            >
              <div className="ml-2 mt-1 flex flex-col gap-0.5 min-h-0 overflow-hidden">
                {data.megaMenuColumns.map((col, colIdx) => (
                  <div key={colIdx}>
                    <button
                      type="button"
                      aria-expanded={openColumn === colIdx}
                      aria-label={`${openColumn === colIdx ? "Collapse" : "Expand"} ${col.title}`}
                      onClick={() =>
                        setOpenColumn((p) =>
                          p === colIdx ? null : colIdx,
                        )
                      }
                      className="w-full flex min-h-11 items-center justify-between gap-2 px-3 py-2 text-left text-sm font-semibold text-gray-800 hover:text-teal-700 active:bg-gray-50 rounded-lg transition-colors border-b border-gray-100"
                    >
                      <span className="min-w-0 flex-1">
                        {toTitleCase(col.title)}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`shrink-0 text-gray-500 transition-transform duration-200 ease-out ${openColumn === colIdx ? "rotate-180" : ""
                          }`}
                        aria-hidden
                      />
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${openColumn === colIdx
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                        }`}
                    >
                      <div className="ml-2 flex flex-col gap-0.5 mb-1 min-h-0 overflow-hidden">
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
                                className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-800 hover:text-teal-700 transition-colors border-b border-gray-100"
                              >
                                {toTitleCase(sub.label)}
                                <ChevronDown
                                  size={16}
                                  className={`transition-transform duration-200 ease-out text-gray-400 ${isOpen ? "rotate-180" : ""
                                    }`}
                                />
                              </button>
                              <div
                                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen
                                  ? "grid-rows-[1fr]"
                                  : "grid-rows-[0fr]"
                                  }`}
                              >
                                <div
                                  className="ml-2 flex flex-col gap-0.5 mb-1 min-h-0 overflow-hidden rounded-lg px-3"
                                  style={{
                                    backgroundColor: hexToRgba(
                                      col.cardColor,
                                      0.4,
                                    ),
                                  }}
                                >
                                  {sub.items.map((item, itemIdx) => (
                                    <Link
                                      key={itemIdx}
                                      href={item.href}
                                      onClick={onClose}
                                      className="px-2 py-1.5 text-sm text-gray-600 hover:text-teal-700 rounded-lg transition-colors"
                                    >
                                      {toTitleCase(item.label)}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pathways accordion */}
          {pathwayNavItems.length > 0 && (
            <div>
              <button
                onClick={() => setPathwaysOpen((p) => !p)}
                className="w-full flex items-center justify-between px-3 py-3 text-sm font-semibold text-gray-900 hover:text-teal-700 rounded-lg transition-colors border-b border-gray-100"
              >
                Career Pathways
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ease-out text-gray-500 ${pathwaysOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${pathwaysOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
              >
                <div className="ml-2 mt-1 flex flex-col gap-1 min-h-0 overflow-hidden">
                  {pathwayNavItems.map((p) => {
                    const pw = p.pathway;
                    const price = parsePrice(pw.priceIncVat);
                    return (
                      <Link
                        key={pw.slug}
                        href={p.href ?? `/pathways/${pw.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
                      >
                        {pw.heroImage && (
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                            <Image
                              src={pw.heroImage}
                              alt={pw.title}
                              fill
                              className="object-cover"
                              sizes="48px"
                              unoptimized
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">
                            {pw.title}
                          </p>
                          {price > 0 && (
                            <p className="text-xs font-bold text-[#016068]">
                              {formatPrice(price)}
                              <span className="font-normal text-gray-400 ml-0.5">
                                + VAT
                              </span>
                            </p>
                          )}
                        </div>
                        <ArrowRight
                          size={14}
                          className="text-gray-400 shrink-0"
                        />
                      </Link>
                    );
                  })}
                  <Link
                    href="/pathways"
                    onClick={onClose}
                    className="flex items-center gap-2 px-3 py-2.5 text-sm font-semibold text-[#016068] hover:text-[#014d54] transition-colors"
                  >
                    View All Pathways
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Other nav links (excluding Career Pathways & Contact) */}
          {otherNavLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={onClose}
              className="px-3 py-3 text-sm font-semibold text-gray-800 hover:text-teal-700 rounded-lg transition-colors"
            >
              {toTitleCase(link.label)}
            </Link>
          ))}

          {contactLink && (
            <Link
              href={contactLink.href}
              onClick={onClose}
              className="mx-3 mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#E99E20] px-4 py-3 text-sm font-bold text-white hover:bg-[#d48e1a] active:bg-[#c07f15] transition-colors"
            >
              Contact Us
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </Link>
          )}
        </nav>

        {/* Drawer Footer */}
        <div className="px-4 py-3 border-t border-gray-100 shrink-0">
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

/* ────────────────────────────────────────────────────────────
   Main header
   ──────────────────────────────────────────────────────────── */
function Header({
  data,
  pathwayNavItems = [],
}: {
  data: HeaderData;
  pathwayNavItems?: PathwayNavItem[];
}) {
  const [scrolled, setScrolled] = useState(false);
  const [showCoursesMega, setShowCoursesMega] = useState(false);
  const [showPathwaysMega, setShowPathwaysMega] = useState(false);
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);
  const coursesTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathwaysTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  const noNavbarPages = ["/", "/not-found", "/company"];
  const isHomePage = noNavbarPages.includes(pathname);

  const showMegaMenu = showCoursesMega || showPathwaysMega;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setShowCoursesMega(false);
    setShowPathwaysMega(false);
    setShowMobileDrawer(false);
  }, [pathname]);

  const useWhiteStyle = !isHomePage && !scrolled && !showMegaMenu;

  const closeAll = () => {
    setShowCoursesMega(false);
    setShowPathwaysMega(false);
  };

  const handleCoursesEnter = () => {
    if (coursesTimeout.current) clearTimeout(coursesTimeout.current);
    setShowPathwaysMega(false);
    setShowCoursesMega(true);
  };
  const handleCoursesLeave = () => {
    coursesTimeout.current = setTimeout(() => setShowCoursesMega(false), 80);
  };

  const handlePathwaysEnter = () => {
    if (pathwaysTimeout.current) clearTimeout(pathwaysTimeout.current);
    setShowCoursesMega(false);
    setShowPathwaysMega(true);
  };
  const handlePathwaysLeave = () => {
    pathwaysTimeout.current = setTimeout(
      () => setShowPathwaysMega(false),
      80,
    );
  };

  const navLinksWithoutPathways = data.navLinks.filter(
    (link) =>
      link.label.toLowerCase() !== "career pathways" &&
      link.label.toLowerCase() !== "contact",
  );

  const contactLink = data.navLinks.find(
    (link) => link.label.toLowerCase() === "contact",
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center ${showMegaMenu ? "bg-white" : ""
        }`}
    >
      <div
        className={`w-full transition-[max-width,margin,padding,box-shadow,border-radius] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled && !showMegaMenu
          ? "max-w-7xl mt-2 md:mt-3 mx-3 md:mx-auto rounded-2xl bg-white/80 backdrop-blur-md shadow-lg px-3 md:px-6 py-px md:py-1"
          : scrolled && showMegaMenu
            ? "max-w-7xl mt-2 md:mt-3 mx-3 md:mx-auto rounded-none px-3 md:px-6 py-1 md:py-1 shadow-none"
            : showMegaMenu
              ? "max-w-7xl mt-0 mx-auto rounded-none px-3 md:px-0 py-0 shadow-none"
              : "max-w-7xl mt-0 mx-auto rounded-none shadow-none px-3 md:px-0 py-0"
          }`}
      >
        <section className="flex justify-between items-center">
          <Link
            href="/"
            className={`flex items-center transition-[padding] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled ? "py-2 md:py-2.5" : "py-3 md:py-4"
              }`}
            onClick={closeAll}
          >
            <Image
              src={useWhiteStyle ? LearnTechniqueLogoWhite : LearnTechniqueLogo}
              alt="Learn Technique Logo"
              width={160}
              height={40}
              className={`transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] h-auto w-24 ${scrolled ? "md:w-28" : "md:w-38"
                }`}
            />

            <Image
              src={Elmlogo}
              alt="Elm Logo"
              width={160}
              height={40}
              className={`transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] h-auto w-24 ml-2 ${scrolled ? "md:w-28" : "md:w-38"
                }`}
            />
          </Link>

          {/* Desktop nav */}
          <nav
            className={`hidden md:flex items-center gap-8 transition-[padding] duration-300 ${scrolled ? "py-2" : "py-4"
              } ${useWhiteStyle ? "text-white" : "text-black"}`}
          >
            {/* Courses dropdown */}
            <div
              className="relative"
              onMouseEnter={handleCoursesEnter}
              onMouseLeave={handleCoursesLeave}
            >
              <button className="flex items-center gap-1 text-sm font-semibold hover:text-[#E99E20] active:text-[#c9861a] transition-colors">
                <p>Courses</p>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-150 ease-out ${showCoursesMega ? "rotate-180" : ""
                    }`}
                />
              </button>
              {showCoursesMega && (
                <CoursesMegaMenu
                  scrolled={scrolled}
                  data={data}
                  onClose={closeAll}
                />
              )}
            </div>

            {/* Career Pathways dropdown */}
            {pathwayNavItems.length > 0 && (
              <div
                className="relative"
                onMouseEnter={handlePathwaysEnter}
                onMouseLeave={handlePathwaysLeave}
              >
                <button className="flex items-center gap-1 text-sm font-semibold hover:text-[#E99E20] active:text-[#c9861a] transition-colors">
                  <p>Career Pathways</p>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-150 ease-out ${showPathwaysMega ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {showPathwaysMega && (
                  <PathwaysMegaMenu
                    scrolled={scrolled}
                    pathways={pathwayNavItems}
                    megaMenuFooter={data.megaMenuFooter}
                    onClose={closeAll}
                  />
                )}
              </div>
            )}

            {/* Other nav links (excluding Career Pathways & Contact) */}
            {navLinksWithoutPathways.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeAll}
                className="text-sm font-semibold hover:text-[#E99E20] active:text-[#c9861a] transition-colors"
              >
                <p>{toTitleCase(link.label)}</p>
              </Link>
            ))}

            {contactLink && (
              <Link
                href={contactLink.href}
                onClick={closeAll}
                className="flex items-center gap-1.5 text-sm font-semibold text-[#E99E20] hover:text-[#c9861a] active:text-[#b07816] transition-colors"
              >
                <p>Contact</p>
                <ArrowUpRight size={15} strokeWidth={2.5} />
              </Link>
            )}
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Open menu"
            className="md:hidden flex items-center justify-center min-h-11 min-w-11 -mr-1 rounded-xl hover:bg-black/5 active:bg-black/10 transition"
            onClick={() => setShowMobileDrawer(true)}
          >
            <Menu
              size={30}
              strokeWidth={2.25}
              className={useWhiteStyle ? "text-white" : "text-gray-800"}
            />
          </button>
        </section>
      </div>

      {showMobileDrawer && (
        <MobileDrawer
          data={data}
          pathwayNavItems={pathwayNavItems}
          onClose={() => setShowMobileDrawer(false)}
        />
      )}
    </header>
  );
}

export default Header;
