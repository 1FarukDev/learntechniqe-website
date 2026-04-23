"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const CONSENT_KEY = "tls-cookie-consent";

type ConsentValue = "accepted" | "declined";

function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const existingConsent = window.localStorage.getItem(CONSENT_KEY);
    if (existingConsent !== "accepted" && existingConsent !== "declined") {
      setIsVisible(true);
    }
  }, []);

  const handleChoice = (value: ConsentValue) => {
    window.localStorage.setItem(CONSENT_KEY, value);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-120 px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="mx-auto animate-modal-panel-bottom rounded-xl border border-zinc-200 bg-white p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] sm:p-5">
        <p className="text-sm leading-relaxed text-zinc-700">
          We use cookies to improve your experience and analyse traffic. By
          clicking Accept, you agree to our use of cookies. Read our{" "}
          <Link
            href="/privacy-policy"
            className="font-semibold text-[#016068] underline underline-offset-2 hover:text-[#014d54]"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-start">
          <button
            type="button"
            onClick={() => handleChoice("declined")}
            className="h-10 rounded-md border border-zinc-300 px-4 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => handleChoice("accepted")}
            className="h-10 rounded-md bg-[#016068] px-4 text-sm font-semibold text-white transition hover:bg-[#014d54]"
          >
            Accept cookies
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieBanner;
