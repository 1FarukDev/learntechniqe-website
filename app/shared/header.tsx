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
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-in-out">
      <div
        className={`w-full transition-all duration-500 ease-in-out ${
          scrolled
            ? "max-w-7xl mt-3 mx-4 rounded-2xl bg-white/80 backdrop-blur-md shadow-lg px-6 py-2"
            : "max-w-full mt-0 mx-0 rounded-none  shadow-none px-8 py-0"
        }`}
      >
        <section className="flex justify-between items-center">
          <Link href={'/'} className="flex items-center py-4">
            <Image src={LearnTechniqueLogo} alt="Learn Technique Logo" />
            <div className="bg-[#000000] w-px h-9 mx-4" />
            <Image src={Elmlogo} alt="Elm Logo" />
          </Link>

          <nav className="flex items-center gap-8 py-4">
            <Link href={"/courses"}>
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