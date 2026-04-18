"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut, Mail, User } from "lucide-react";
import LearnTechniqueLogo from "@/app/assets/svg/learntechnique.png";

export function LearnerTopBar({
  learnerName,
  learnerEmail,
}: {
  learnerName: string;
  learnerEmail: string;
}) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, []);

  async function handleSignOut() {
    if (signingOut) return;
    setSigningOut(true);
    try {
      await fetch("/api/elearning/logout", { method: "POST" });
    } catch {
      // even if logout fails, send them back to login — server cookie is
      // cleared on next request anyway
    }
    router.replace("/learn/login");
    router.refresh();
  }

  const initials =
    learnerName
      .split(/\s+/)
      .filter(Boolean)
      .map((p) => p[0]?.toUpperCase())
      .slice(0, 2)
      .join("") || "L";

  return (
    <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-zinc-200/80">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
        <Link href="/learn/dashboard" className="flex items-center gap-3">
          <Image
            src={LearnTechniqueLogo}
            alt="Learn Technique"
            width={140}
            height={36}
            className="h-8 w-auto"
          />
          <span className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-zinc-400 border-l border-zinc-200 pl-3 ml-1">
            Learner Portal
          </span>
        </Link>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2.5 rounded-full border border-zinc-200 bg-white pl-1 pr-3 py-1 text-sm font-medium text-zinc-700 hover:border-zinc-300 transition"
          >
            <span className="flex size-7 items-center justify-center rounded-full bg-[#016068] text-[11px] font-bold text-white">
              {initials}
            </span>
            <span className="hidden sm:inline max-w-[10rem] truncate">
              {learnerName}
            </span>
            <ChevronDown
              size={14}
              strokeWidth={2.25}
              className={`text-zinc-400 transition-transform ${
                menuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-72 origin-top-right rounded-2xl border border-zinc-200 bg-white shadow-xl p-2 animate-in fade-in zoom-in-95"
            >
              <div className="px-3 py-3 border-b border-zinc-100">
                <p className="flex items-center gap-2 text-xs font-semibold text-zinc-500 uppercase tracking-wide">
                  <User size={12} strokeWidth={2.4} />
                  Signed in as
                </p>
                <p className="mt-1.5 text-sm font-semibold text-zinc-900 truncate">
                  {learnerName}
                </p>
                <p className="mt-0.5 text-xs text-zinc-500 inline-flex items-center gap-1.5 truncate max-w-full">
                  <Mail size={11} strokeWidth={2.4} className="shrink-0" />
                  <span className="truncate">{learnerEmail}</span>
                </p>
              </div>
              <div className="p-1">
                <Link
                  href="/learn/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                >
                  My dashboard
                </Link>
                <Link
                  href="/courses"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                >
                  Browse paid courses
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={signingOut}
                  className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-60"
                >
                  <LogOut size={14} strokeWidth={2.4} />
                  {signingOut ? "Signing out…" : "Sign out"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
