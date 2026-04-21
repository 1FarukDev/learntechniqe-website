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
  GraduationCap,
} from "lucide-react";
import type { HeaderData } from "@/types/header";
import { categoryHrefFromMegaMenuTitle } from "@/lib/course-categories";
import type { PathwayNavItem } from "./headerWrapper";

/** Set `NEXT_PUBLIC_SHOW_LEARNER_LOGIN=false` in `.env` to hide the header link. */
const showLearnerLoginInHeader =
  process.env.NEXT_PUBLIC_SHOW_LEARNER_LOGIN !== "false";

function toTitleCase(str: string): string {
  if (!str) return str;
  return str;
  // .toLowerCase()
  // .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Labels hidden from header nav and courses mega menu footer (CMS-driven). */
function isExcludedHeaderNavLabel(label: string): boolean {
  const l = label.trim();
  return /why choose/i.test(l) || /help\s*(&|and)\s*support/i.test(l);
}

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

function MegaMenuLegalFooter({ onClose }: { onClose: () => void }) {
  const year = new Date().getFullYear();
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between shrink-0 text-[11px] sm:text-xs text-zinc-500">
      <p className="text-center sm:text-left">
        Copyright &copy; {year} Technique Learning Solutions | All Rights
        Reserved
      </p>
      <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-1">
        <Link
          href="/terms-and-conditions"
          onClick={onClose}
          className="font-medium text-zinc-600 hover:text-[#016068] underline underline-offset-2 transition-colors"
        >
          Terms &amp; Conditions
        </Link>
        <Link
          href="/privacy-policy"
          onClick={onClose}
          className="font-medium text-zinc-600 hover:text-[#016068] underline underline-offset-2 transition-colors"
        >
          Privacy Policy
        </Link>
      </div>
    </div>
  );
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

  const footerLinks = data.megaMenuFooter.links.filter(
    (link) => !isExcludedHeaderNavLabel(link.label),
  );

  return (
    <div
      className={`hidden md:flex fixed left-0 right-0 z-50 flex-col overflow-hidden bg-white shadow-[0_12px_40px_-16px_rgba(0,0,0,0.18)] border-t border-zinc-200/90 max-h-[87vh] ${
        scrolled ? "top-[4.5rem]" : "top-[4.25rem]"
      }`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-8px)",
        transition: "opacity 280ms ease, transform 280ms ease",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 w-full flex flex-col flex-1 min-h-0 overflow-hidden">
        <div
          ref={megaMenuScrollRef}
          data-mega-menu-courses-scroll
          className="grid grid-cols-3 gap-0 flex-1 min-h-0 overflow-y-auto overscroll-contain pr-1 -mr-1 [scrollbar-gutter:stable]"
        >
          {data.megaMenuColumns.map((col, colIdx) => (
            <div
              key={colIdx}
              className={`flex flex-col gap-5 min-h-0 px-5 first:pl-0 last:pr-0 md:max-w-none ${
                colIdx > 0 ? "md:border-l md:border-zinc-200/80" : ""
              }`}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(-6px)",
                transition: `opacity 280ms ease ${colIdx * 45}ms, transform 280ms ease ${colIdx * 45}ms`,
              }}
            >
              <div
                className="shrink-0 pl-3.5 border-l-[3px]"
                style={{ borderLeftColor: col.cardColor }}
              >
                <h3 className="font-semibold text-[15px] text-zinc-900 tracking-tight">
                  <Link
                    href={categoryHrefFromMegaMenuTitle(col.title)}
                    onClick={onClose}
                    className="rounded-sm text-zinc-900 hover:text-[#016068] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#016068] "
                  >
                    {toTitleCase(col.title)}
                  </Link>
                </h3>
                <p className="text-[13px] text-zinc-500 leading-snug mt-1.5">
                  {col.description}
                </p>
              </div>

              <div className="flex flex-col min-h-0 divide-y divide-zinc-200/70">
                {col.subcategories.map((sub, subIdx) => {
                  const key = `${colIdx}-${subIdx}`;
                  const isOpen = openSubcategory === key;
                  return (
                    <div
                      key={subIdx}
                      className="shrink-0 pt-2 first:pt-0 pb-2 last:pb-0"
                      ref={(el) => {
                        const m = subcategoryBlockRefs.current;
                        if (el) m.set(key, el);
                        else m.delete(key);
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => toggleSubcategory(key)}
                        className="w-full flex items-center justify-between gap-2 py-1.5 text-left text-sm font-medium text-zinc-800 hover:text-[#016068] transition-colors"
                      >
                        {toTitleCase(sub.label)}
                        <ChevronDown
                          size={15}
                          strokeWidth={2}
                          className={`shrink-0 transition-transform duration-200 text-zinc-400 ${
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
                            "grid-template-rows 280ms ease, opacity 280ms ease",
                        }}
                      >
                        <div className="overflow-hidden">
                          <div
                            className="mt-1.5 mb-0.5 ml-0.5 pl-3 border-l-2 border-zinc-200 bg-white/70 rounded-r-md py-2 pr-2 flex flex-col gap-0.5"
                            style={{ borderLeftColor: col.cardColor }}
                          >
                            {sub.items.map((item, itemIdx) => (
                              <Link
                                key={itemIdx}
                                href={item.href}
                                onClick={onClose}
                                className="text-[13px] text-zinc-600 hover:text-[#016068] py-1 rounded-md px-1 -mx-1 hover:bg-zinc-50/90 transition-colors"
                                style={{
                                  opacity: isOpen ? 1 : 0,
                                  transform: isOpen
                                    ? "translateY(0)"
                                    : "translateY(-3px)",
                                  transition: `opacity 180ms ease ${itemIdx * 28}ms, transform 180ms ease ${itemIdx * 28}ms`,
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
          className="mt-5 pt-5 border-t border-zinc-200/80 shrink-0 space-y-4"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 280ms ease 220ms",
          }}
        >
          {footerLinks.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              {footerLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={`${link.href}`}
                  onClick={onClose}
                  className="text-zinc-600 hover:text-[#016068] font-medium transition-colors"
                >
                  {toTitleCase(link.label)}
                </Link>
              ))}
            </div>
          )}
          <MegaMenuLegalFooter onClose={onClose} />
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
  onClose,
}: {
  scrolled: boolean;
  pathways: PathwayNavItem[];
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
      className={`hidden md:flex fixed left-0 right-0 z-50 flex-col overflow-hidden bg-white shadow-[0_12px_40px_-16px_rgba(0,0,0,0.18)] border-t border-zinc-200/90 ${
        scrolled ? "top-[4.5rem]" : "top-[4.25rem]"
      }`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-8px)",
        transition: "opacity 280ms ease, transform 280ms ease",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 md:py-6 w-full">
        {/* Top heading row */}
        <div
          className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-5 pb-4 border-b border-zinc-200/80"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 280ms ease 80ms",
          }}
        >
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-zinc-900 tracking-tight">
              Career Pathways
            </h3>
            <p className="text-sm text-zinc-500 mt-1 max-w-xl leading-relaxed">
              Choose your career journey — from complete beginner to fully
              qualified electrician
            </p>
          </div>
          <Link
            href="/pathways"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-[#016068] hover:text-[#014d54] transition-colors shrink-0"
          >
            View All Pathways
            <ArrowRight size={15} strokeWidth={2.25} />
          </Link>
        </div>

        {/* Pathway cards — compact tiles, flat borders */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
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
                className="group flex flex-col text-left rounded-lg border border-zinc-200/90 bg-white overflow-hidden transition-colors duration-200 hover:border-zinc-300 hover:bg-zinc-50/40"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(6px)",
                  transition: `opacity 280ms ease ${idx * 50 + 90}ms, transform 280ms ease ${idx * 50 + 90}ms, border-color 200ms, background-color 200ms`,
                }}
              >
                {pw.heroImage && (
                  <div className="relative w-full h-[5.25rem] overflow-hidden border-b border-zinc-100">
                    <Image
                      src={pw.heroImage}
                      alt={pw.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 22vw, 45vw"
                      unoptimized
                    />
                    {p.badge && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-zinc-900/85 text-white text-[10px] font-semibold rounded tracking-wide">
                        {p.badge}
                      </span>
                    )}
                  </div>
                )}

                <div className="p-3 flex flex-col flex-1 min-h-0">
                  <h4 className="text-[13px] font-semibold leading-snug mb-1 line-clamp-2 text-zinc-900 group-hover:text-[#016068] transition-colors">
                    {pw.title}
                  </h4>

                  {desc && (
                    <p className="text-[11px] text-zinc-500 line-clamp-2 leading-relaxed mb-2 flex-1">
                      {desc}
                    </p>
                  )}

                  <div className="flex items-end justify-between gap-2 mt-auto pt-1 border-t border-zinc-100">
                    {price > 0 && (
                      <span className="text-[13px] font-semibold text-[#016068] tabular-nums">
                        {formatPrice(price)}
                        <span className="text-[10px] font-normal text-zinc-400 ml-0.5">
                          inc VAT
                        </span>
                      </span>
                    )}
                    {pw.duration && (
                      <span className="flex items-center gap-1 text-[10px] text-zinc-400 shrink-0">
                        <Clock size={11} strokeWidth={2} />
                        {pw.duration}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div
          className="mt-5 pt-5 border-t border-zinc-200/80 shrink-0"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 280ms ease 220ms",
          }}
        >
          <MegaMenuLegalFooter onClose={onClose} />
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
      link.label.toLowerCase() !== "contact" &&
      !isExcludedHeaderNavLabel(link.label),
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
                className={`transition-transform duration-200 ease-out text-gray-500 ${
                  coursesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                coursesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="ml-2 mt-1 flex flex-col gap-0.5 min-h-0 overflow-hidden ">
                {data.megaMenuColumns.map((col, colIdx) => (
                  <div key={colIdx} className="">
                    <button
                      type="button"
                      aria-expanded={openColumn === colIdx}
                      aria-label={`${openColumn === colIdx ? "Collapse" : "Expand"} ${col.title}`}
                      onClick={() =>
                        setOpenColumn((p) => (p === colIdx ? null : colIdx))
                      }
                      className="w-full flex min-h-11  items-center justify-between gap-2 px-3 py-2 text-left text-sm font-semibold text-gray-800 hover:text-teal-700 active:bg-gray-50 rounded-lg transition-colors border-b border-gray-100"
                    >
                      <span
                        className="min-w-0 flex-1 md:capitalize"
                        style={{ textTransform: "capitalize" }}
                      >
                        {col.title.charAt(0).toUpperCase() +
                          col.title.slice(1).toLowerCase()}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`shrink-0 text-gray-500 transition-transform duration-200 ease-out ${
                          openColumn === colIdx ? "rotate-180" : ""
                        }`}
                        aria-hidden
                      />
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                        openColumn === colIdx
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
                                  className={`transition-transform duration-200 ease-out text-gray-400 ${
                                    isOpen ? "rotate-180" : ""
                                  }`}
                                />
                              </button>
                              <div
                                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
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
                  className={`transition-transform duration-200 ease-out text-gray-500 ${
                    pathwaysOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                  pathwaysOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
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
                                inc VAT
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

          {showLearnerLoginInHeader && (
            <Link
              href="/learn/login"
              onClick={onClose}
              className="mx-3 mt-2 flex items-center justify-center gap-2 rounded-xl border border-[#016068]/20 bg-[#016068]/5 px-4 py-3 text-sm font-semibold text-[#016068] hover:bg-[#016068]/10 transition-colors"
            >
              <GraduationCap size={16} strokeWidth={2.25} />
              Learner Login
            </Link>
          )}

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
  const isLearnerPortal = pathname.startsWith("/learn");
  const isAdminPortal = pathname.startsWith("/admin");

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
    pathwaysTimeout.current = setTimeout(() => setShowPathwaysMega(false), 80);
  };

  const navLinksWithoutPathways = data.navLinks.filter(
    (link) =>
      link.label.toLowerCase() !== "career pathways" &&
      link.label.toLowerCase() !== "contact" &&
      !isExcludedHeaderNavLabel(link.label),
  );

  const contactLink = data.navLinks.find(
    (link) => link.label.toLowerCase() === "contact",
  );

  if (isLearnerPortal || isAdminPortal) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center ${
        showMegaMenu ? "bg-white" : ""
      }`}
    >
      <div
        className={`w-full transition-[max-width,margin,padding,box-shadow,border-radius] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled && !showMegaMenu
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
            className={`flex items-center transition-[padding] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              scrolled ? "py-2 md:py-2.5" : "py-3 md:py-4"
            }`}
            onClick={closeAll}
          >
            <Image
              src={useWhiteStyle ? LearnTechniqueLogoWhite : LearnTechniqueLogo}
              alt="Learn Technique Logo"
              width={160}
              height={40}
              className={`transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] h-auto w-24 ${
                scrolled ? "md:w-28" : "md:w-38"
              }`}
            />

            <Image
              src={Elmlogo}
              alt="Elm Logo"
              width={160}
              height={40}
              className={`transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] h-auto w-24 ml-2 ${
                scrolled ? "md:w-28" : "md:w-38"
              }`}
            />
          </Link>

          {/* Desktop nav */}
          <nav
            className={`hidden md:flex items-center gap-8 transition-[padding] duration-300 ${
              scrolled ? "py-2" : "py-4"
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
                  className={`transition-transform duration-150 ease-out ${
                    showCoursesMega ? "rotate-180" : ""
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
                    className={`transition-transform duration-150 ease-out ${
                      showPathwaysMega ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {showPathwaysMega && (
                  <PathwaysMegaMenu
                    scrolled={scrolled}
                    pathways={pathwayNavItems}
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

            {showLearnerLoginInHeader && (
              <Link
                href="/learn/login"
                onClick={closeAll}
                className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                  useWhiteStyle
                    ? "text-white/90 hover:text-white"
                    : "text-[#016068] hover:text-[#014d54]"
                }`}
              >
                <GraduationCap size={15} strokeWidth={2.25} />
                <p>Learner Login</p>
              </Link>
            )}

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
