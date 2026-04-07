import React from "react";
import Image from "next/image";
import Link from "next/link";
import FooterLogo from "@/app/assets/png/logo-white.png";
import PaymentMethodsImg from "@/app/assets/png/payment-methods.png";
import { client } from "@/lib/sanity/client";
import { headerQuery } from "@/lib/queries/navigation";
import { PATHWAYS_QUERY } from "@/lib/queries/pathway";
import type { HeaderData } from "@/types/header";
import { FooterSocialIcons } from "./FooterSocialIcons";

interface CourseLink {
  label: string;
  href: string;
}

interface PathwayLink {
  title: string;
  slug: string;
}

async function getFooterData() {
  const [headerData, pathways] = await Promise.all([
    client.fetch<HeaderData>(headerQuery),
    client.fetch<PathwayLink[]>(PATHWAYS_QUERY),
  ]);
  return { headerData, pathways };
}

function FooterLinkRow({
  title,
  links,
}: {
  title: string;
  links: CourseLink[];
}) {
  if (!links.length) return null;
  return (
    <div className="min-w-0 w-full max-w-full">
      <h4 className="text-white font-semibold text-sm mb-3">{title}</h4>
      <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-2 leading-relaxed min-w-0" >
        {links.map((link, i) => (
          <React.Fragment key={link.href + i}>
            {i > 0 && (
              <span
                className="text-white/30 text-xs select-none shrink-0"
                aria-hidden
              >
                |
              </span>
            )}
            <Link
              href={link.href}
              className="text-white/70 text-xs hover:text-[#4DD9AC] transition-colors min-w-0 max-w-full break-words [overflow-wrap:anywhere]"
            >
              {link.label}
            </Link>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

async function Footer() {
  const { headerData, pathways } = await getFooterData();

  const socialLinks = headerData?.megaMenuFooter?.socialLinks ?? [];
  const megaMenuColumns = headerData?.megaMenuColumns ?? [];

  const coursesByCategory: { title: string; links: CourseLink[] }[] =
    megaMenuColumns.map((col) => ({
      title: col.title,
      links: col.subcategories
        .flatMap((sub) => sub.items)
        .filter((item) => item.href && item.href !== "#"),
    }));

  const pathwayLinks: CourseLink[] = (pathways ?? [])
    .filter((p) => p.slug)
    .map((p) => ({
      label: p.title,
      href: `/pathways/${p.slug}`,
    }));

  return (
    <footer className="bg-[#001431]">
      <div className="max-w-7xl mx-auto pt-12 sm:pt-16 pb-10 px-6 sm:px-8 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_1fr_1fr] gap-10 lg:gap-8">
          <div className="max-w-sm">
            <Image
              src={FooterLogo}
              alt="Technique Learning Solutions"
              className="mb-5 w-40 sm:w-48"
            />
            <p className="text-white/70 text-xs leading-relaxed mb-5">
              Industry-recognised electrical and trade training courses with
              world-class facilities. Helping you advance your career with
              accredited programmes and expert instructors.
            </p>


            <div className="mt-5 space-y-2 mb-6">
              <a
                href="tel:08001123310"
                className="flex items-center gap-2 text-white/80 text-sm hover:text-[#4DD9AC] transition-colors"
              >
                <svg
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                0800 112 3310
              </a>
              <a
                href="mailto:info@learntechnique.com"
                className="flex items-center gap-2 text-white/80 text-sm hover:text-[#4DD9AC] transition-colors"
              >
                <svg
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                info@learntechnique.com
              </a>
            </div>

            <FooterSocialIcons links={socialLinks} />

            <div className="mb-6 grid grid-cols-2 gap-x-6 gap-y-3 lg:hidden mt-5">
              <div className="flex flex-col gap-2">
                <h4 className="text-white font-semibold text-sm">Training</h4>
                <Link
                  href="/courses"
                  className="text-white/70 text-xs leading-relaxed hover:text-[#4DD9AC] transition-colors"
                >
                  All Courses
                </Link>
                <Link
                  href="/courses/electrical"
                  className="text-white/70 text-xs leading-relaxed hover:text-[#4DD9AC] transition-colors"
                >
                  Electrical Courses
                </Link>
                <Link
                  href="/courses/plc"
                  className="text-white/70 text-xs leading-relaxed hover:text-[#4DD9AC] transition-colors"
                >
                  PLC & Industrial
                </Link>
                <Link
                  href="/courses/aircon-refrigeration"
                  className="text-white/70 text-xs leading-relaxed hover:text-[#4DD9AC] transition-colors"
                >
                  Air Con & Refrigeration
                </Link>
                <Link
                  href="/pathways"
                  className="text-white/70 text-xs leading-relaxed hover:text-[#4DD9AC] transition-colors"
                >
                  Career Pathways
                </Link>
                <Link
                  href="/courses/am2-assessment"
                  className="text-white/70 text-xs leading-relaxed hover:text-[#4DD9AC] transition-colors"
                >
                  AM2 Assessment
                </Link>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-white font-semibold text-sm">Company</h4>
                <Link
                  href="/company"
                  className="text-white/70 text-xs leading-relaxed hover:text-[#4DD9AC] transition-colors"
                >
                  About Us
                </Link>
                <Link
                  href="/blog"
                  className="text-white/70 text-xs leading-relaxed hover:text-[#4DD9AC] transition-colors"
                >
                  Blog
                </Link>
                <Link
                  href="/contact"
                  className="text-white/70 text-xs leading-relaxed hover:text-[#4DD9AC] transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>



          </div>

          <div className="hidden lg:flex flex-col gap-3">
            <h4 className="text-white font-semibold text-sm mb-1">Training</h4>
            <Link
              href="/courses"
              className="text-white/70 text-xs leading-relaxed hover:text-[#4DD9AC] transition-colors"
            >
              All Courses
            </Link>
            <Link
              href="/courses/electrical"
              className="text-white/70 text-xs leading-relaxed hover:text-[#4DD9AC] transition-colors"
            >
              Electrical Courses
            </Link>
            <Link
              href="/courses/plc"
              className="text-white/70 text-xs leading-relaxed hover:text-[#4DD9AC] transition-colors"
            >
              PLC & Industrial
            </Link>
            <Link
              href="/courses/aircon-refrigeration"
              className="text-white/70 text-xs leading-relaxed hover:text-[#4DD9AC] transition-colors"
            >
              Air Con & Refrigeration
            </Link>
            <Link
              href="/pathways"
              className="text-white/70 text-xs leading-relaxed hover:text-[#4DD9AC] transition-colors"
            >
              Career Pathways
            </Link>
            <Link
              href="/courses/am2-assessment"
              className="text-white/70 text-xs leading-relaxed hover:text-[#4DD9AC] transition-colors"
            >
              AM2 Assessment
            </Link>
          </div>

          <div className="hidden lg:flex flex-col gap-3">
            <h4 className="text-white font-semibold text-sm mb-1">Company</h4>
            <Link
              href="/company"
              className="text-white/70 text-xs leading-relaxed hover:text-[#4DD9AC] transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/blog"
              className="text-white/70 text-xs leading-relaxed hover:text-[#4DD9AC] transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-white/70 text-xs leading-relaxed hover:text-[#4DD9AC] transition-colors"
            >
              Contact Us
            </Link>
          </div>

          <div className="hidden lg:flex flex-col gap-3">
            <h4 className="text-white font-semibold text-sm mb-1">Support</h4>
            <Link
              href="/terms-and-conditions"
              className="text-white/70 text-xs leading-relaxed hover:text-[#4DD9AC] transition-colors"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/privacy-policy"
              className="text-white/70 text-xs leading-relaxed hover:text-[#4DD9AC] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/contact"
              className="text-white/70 text-xs leading-relaxed hover:text-[#4DD9AC] transition-colors"
            >
              Help & Support
            </Link>
          </div>
        </div>
      </div>
{/* 
      <div className="border-t border-white/10 min-w-0">
        <div className="max-w-7xl mx-auto min-w-0 px-6 sm:px-8 md:px-10 py-8 space-y-5">
          {coursesByCategory.map(
            (category) =>
              category.links.length > 0 && (
                <FooterLinkRow
                  key={category.title}
                  title={category.title}
                  links={category.links}
                />
              ),
          )}

          {pathwayLinks.length > 0 && (
            <FooterLinkRow title="Career Pathways" links={pathwayLinks} />
          )}
        </div>
      </div> */}

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/60 text-[11px] sm:text-xs text-center sm:text-left">
              Copyright &copy; 2026 Technique Learning Solutions | All Rights
              Reserved
            </p>
            <div className="flex items-center gap-4">
              <Image
                src={PaymentMethodsImg}
                alt="Accepted payment methods: Visa, Mastercard, Apple Pay, Google Pay, Klarna, American Express"
                width={681}
                height={60}
                className="h-3.5 w-auto max-w-[110px] object-contain opacity-80"
                sizes="110px"
              />
              <Link
                href="/terms-and-conditions"
                className="text-white/60 text-[11px] sm:text-xs underline underline-offset-2 hover:text-white transition-colors"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/privacy-policy"
                className="text-white/60 text-[11px] sm:text-xs underline underline-offset-2 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
