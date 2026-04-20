import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ElearningFooter } from "@/components/elearning-footer";
import { AdminElearningShell } from "./AdminElearningShell";

export const metadata: Metadata = {
  title: "E-learning admin",
  robots: { index: false, follow: false },
};

export default function AdminElearningLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6f8] text-zinc-900 antialiased">
      <div className="flex-1">
        <AdminElearningShell>{children}</AdminElearningShell>
      </div>
      <ElearningFooter />
    </div>
  );
}
