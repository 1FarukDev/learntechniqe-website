import React from "react";
import FooterLogo from "@/app/assets/png/logo-white.png";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import { Icon } from "@iconify/react";

function Footer() {
  return (
    <footer className="bg-[#001431]">
      <div className="max-w-7xl mx-auto pt-16 pb-24 px-6">
        <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr_1fr_1fr] gap-12">
          <div className="max-w-md">
            <Image
              src={FooterLogo}
              alt="Technique Logo"
              className="mb-8 w-50"
            />
            <p className="text-white text-sm leading-relaxed">
              Elm Training Services is the Nottingham approved AM2 Test <br />{" "}
              Centre providing the Achievement Measurement 2 practical <br />{" "}
              skills test.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Link
              href="#"
              className="text-white text-sm hover:text-white/80 transition-colors"
            >
              General Faq&apos;s
            </Link>
            <Link
              href="#"
              className="text-white text-sm hover:text-white/80 transition-colors"
            >
              Accreditation
            </Link>
            <Link
              href="#"
              className="text-white text-sm hover:text-white/80 transition-colors"
            >
              Careers Vacancies
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <Link
              href="#"
              className="text-white text-sm hover:text-white/80 transition-colors"
            >
              Qualifications
            </Link>
            <Link
              href="#"
              className="text-white text-sm hover:text-white/80 transition-colors"
            >
              Terms &amp; Condition
            </Link>
            <Link
              href="#"
              className="text-white text-sm hover:text-white/80 transition-colors"
            >
              Newsletter Sign Up
            </Link>
            <Link
              href="#"
              className="text-white text-sm hover:text-white/80 transition-colors"
            >
              Cookies on our Website
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <Link
              href="#"
              className="text-white text-sm hover:text-white/80 transition-colors"
            >
              Our Policies
            </Link>
            <Link
              href="#"
              className="text-white text-sm hover:text-white/80 transition-colors"
            >
              Private Policy
            </Link>
            <Link
              href="#"
              className="text-white text-sm hover:text-white/80 transition-colors"
            >
              Maximum Training
            </Link>
            <Link
              href="#"
              className="text-white text-sm hover:text-white/80 transition-colors"
            >
              Electrician Qualification
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center font-semibold justify-between gap-4">
          <p className="text-white text-sm">
            2026 Technique Learning Solutions | All Rights Reserved |{" "}
            <Link
              href="#"
              className="underline hover:text-white transition-colors"
            >
              Terms and Conditions
            </Link>{" "}
            |{" "}
            <Link
              href="#"
              className="underline hover:text-white transition-colors"
            >
              Sitemap
            </Link>
          </p>

          <div className="flex gap-4">
            <Link href="#" className="text-[#FFFFFF]">
              <Icon
                icon="ic:baseline-facebook"
                width="40"
                height="40"
                className="text-[#FFFFFF]"
              />
            </Link>
            <Link href="#" className="text-[#FFFFFF]">
              <Icon
                icon="mage:instagram-circle"
                width="40"
                height="40"
                className="text-[#FFFFFF]"
              />
            </Link>
            <Link href="#" className="text-[#FFFFFF]">
              <Icon
                icon="lineicons:youtube-music"
                width="40"
                height="40"
                className="text-[#FFFFFF]"
              />
            </Link>
            <Link href="#" className="text-[#FFFFFF]">
              <Icon
                icon="entypo-social:linkedin-with-circle"
                width="40"
                height="40"
                className="text-[#FFFFFF]"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
