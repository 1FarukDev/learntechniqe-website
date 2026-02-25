"use client";
import React, { useEffect, useState } from "react";
import LearnTechniqueLogo from "@/app/assets/svg/learntechnique.svg";
import Elmlogo from "@/app/assets/svg/elm.svg";
import Image from "next/image";
import Link from "next/link";

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-in-out px-4">
      <div
        className={`max-w-7xl w-full transition-all duration-500 ease-in-out ${
          scrolled
            ? "mt-3 rounded-2xl bg-white/80 backdrop-blur-md shadow-lg px-6 py-2"
            : "mt-0 rounded-none shadow-none px-6 py-0"
        }`}
      >
        <section className="flex justify-between items-center">
          <div className="flex items-center py-4">
            <Image src={LearnTechniqueLogo} alt="Learn Technique Logo" />
            <div className="bg-[#000000] w-px h-9 mx-4" />
            <Image src={Elmlogo} alt="Elm Logo" />
          </div>

          <nav className="flex items-center gap-8 py-4">
            <Link href={"#"}>
              <p>Courses</p>
            </Link>
            <Link href={"#"}>
              <p>Am2 a Assessment</p>
            </Link>
            <Link href={"#"}>
              <p>Resettlement</p>
            </Link>
            <Link href={"#"}>
              <p>Contact</p>
            </Link>
            <Link href={"#"}>
              <p>Blog</p>
            </Link>
          </nav>
        </section>
      </div>
    </header>
  );
}

export default Header;