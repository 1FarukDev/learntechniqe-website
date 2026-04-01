import React from "react";
import FooterLogo from "@/app/assets/png/logo-white.png";
import PaymentMethodsImg from "@/app/assets/png/payment-methods.png";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-[#001431]">
      <div className="max-w-7xl mx-auto pt-10 sm:pt-16 pb-16 sm:pb-24 px-6 sm:px-8 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr_1fr_1fr] gap-8 sm:gap-12">
          <div className="max-w-md">
            <Image
              src={FooterLogo}
              alt="Technique Logo"
              className="mb-6 sm:mb-8 w-40 sm:w-50"
            />
            <p className="text-white text-xs sm:text-sm leading-relaxed">
              Elm Training Services is the Chesterfield approved AM2 Test <br />{" "}
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
              href="/pathways"
              className="text-white text-sm hover:text-white/80 transition-colors"
            >
              Career Pathways
            </Link>
            <Link
              href="#"
              className="text-white text-sm hover:text-white/80 transition-colors"
            >
              Qualifications
            </Link>
            <Link
              href="/terms-and-conditions"
              className="text-white text-sm hover:text-white/80 transition-colors"
            >
              Terms &amp; Conditions
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
              href="/privacy-policy"
              className="text-white text-sm hover:text-white/80 transition-colors"
            >
              Privacy Policy
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
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 py-4 sm:py-6">
          <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-white text-[11px] sm:text-xs text-center leading-relaxed max-w-4xl mx-auto text-white/90">
            <span className="shrink-0">Copyright ©</span>
            <Image
              src={PaymentMethodsImg}
              alt="Accepted payment methods: Visa, Mastercard, Apple Pay, Google Pay, Klarna, American Express"
              width={681}
              height={60}
              className="h-3 w-auto max-w-[88px] sm:h-3.5 sm:max-w-[100px] object-contain object-center opacity-95 shrink-0"
              sizes="100px"
            />
            <span>
              2026 Technique Learning Solutions | All Rights Reserved |{" "}
              <Link
                href="/terms-and-conditions"
                className="underline underline-offset-2 hover:text-white transition-colors font-semibold text-white"
              >
                Terms and Conditions
              </Link>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
