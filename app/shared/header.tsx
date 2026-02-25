"use client";
import React, { useEffect, useState } from "react";
import LearnTechniqueLogo from "@/app/assets/svg/learntechnique.svg";
import LearnTechniqueLogoWhite from "@/app/assets/svg/learntechnique-white.png";
// import Elmlogo from "@/app/assets/svg/elm.svg";
import ElmlogoWhite from "@/app/assets/svg/elm.svg";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/courses", label: "Courses" },
  { href: "#", label: "Am2 a Assessment" },
  { href: "#", label: "Resettlement" },
  { href: "#", label: "Contact" },
  { href: "#", label: "Blog" },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-in-out px-2 sm:px-4">
      <div
        className={`max-w-7xl w-full transition-all duration-500 ease-in-out ${scrolled
            ? "mt-3 rounded-2xl bg-white/80 backdrop-blur-md shadow-lg px-4 sm:px-6 py-2"
            : "mt-0 rounded-none shadow-none px-4 sm:px-6 py-0"
          }`}
      >
        <section className="flex justify-between items-center">
          <Link href={'/'} className="flex items-center py-3 sm:py-4">
            <Image src={LearnTechniqueLogo} alt="Learn Technique Logo" className="h-8 sm:h-auto w-auto" />
            <div className="bg-[#000000] w-px h-6 sm:h-9 mx-2 sm:mx-4" />
            <Image src={ElmlogoWhite} alt="Elm Logo" className="h-6 sm:h-auto w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex flex-wrap items-center justify-end gap-2 sm:gap-4 lg:gap-8 py-3 sm:py-4">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href}>
                <p className="text-base sm:text-[18px] font-heading">{link.label}</p>
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 -mr-2 rounded-lg hover:bg-black/5 transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </section>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 top-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu panel */}
      <div
        className={`md:hidden fixed top-0 right-0 z-50 h-full w-full max-w-[280px] bg-white shadow-xl transition-transform duration-300 ease-out ${mobileMenuOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none"
          }`}
      >
        <div className="flex flex-col pt-20 px-6 gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-4 text-[18px] font-medium font-heading text-black border-b border-gray-100 last:border-0 hover:text-[#01636B] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;
