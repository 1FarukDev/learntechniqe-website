"use client";
import React, { useEffect, useState } from "react";
import LearnTechniqueLogo from "@/app/assets/svg/learntechnique.svg";
import LearnTechniqueLogoWhite from "@/app/assets/svg/learntechnique-white.png";
// import Elmlogo from "@/app/assets/svg/elm.svg";
import ElmlogoWhite from "@/app/assets/svg/elm.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isHomepage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // White text/logos only on non-homepage AND not yet scrolled
  const isDark = !isHomepage && !scrolled;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-in-out">
      <div
        className={`w-full transition-all duration-500 ease-in-out ${
          scrolled
            ? "max-w-7xl mt-3 mx-4 rounded-2xl bg-white/80 backdrop-blur-md shadow-lg px-6 py-2"
            : "max-w-full mt-0 mx-0 rounded-none shadow-none px-8 py-0"
        }`}
      >
        <section className="flex justify-between items-center">
          <Link href="/" className="flex items-center py-4">
            <Image
              src={isDark ? LearnTechniqueLogoWhite : LearnTechniqueLogo}
              alt="Learn Technique Logo"
              width={160}
              height={40}
            />
            <div
              className={`w-px h-9 mx-4 ${isDark ? "bg-white" : "bg-black"}`}
            />
            <Image src={isDark ? ElmlogoWhite : ElmlogoWhite} alt="Elm Logo" />
          </Link>

          <nav className="flex items-center gap-8 py-4">
            {[
              { label: "Courses", href: "/courses" },
              { label: "Am2 a Assessment", href: "#" },
              { label: "Resettlement", href: "#" },
              { label: "Contact", href: "#" },
              { label: "Blog", href: "#" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-300 hover:opacity-70 ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </section>
      </div>
    </header>
  );
}

export default Header;
