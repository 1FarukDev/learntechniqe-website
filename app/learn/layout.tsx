import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Learner Portal",
  description:
    "Access your free Learn Technique e-learning course and continue your journey into the electrical and HVAC trades.",
  robots: { index: false, follow: false },
};

export default function LearnLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F6F8FA] text-zinc-900">{children}</div>
  );
}
