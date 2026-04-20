"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Users,
} from "lucide-react";

export function AdminElearningShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const onLogin = pathname?.includes("/admin/elearning/login");

  async function logout() {
    await fetch("/api/admin/elearning/logout", { method: "POST" });
    router.replace("/admin/elearning/login");
    router.refresh();
  }

  if (onLogin) {
    return <>{children}</>;
  }

  const nav = [
    { href: "/admin/elearning", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/elearning/users", label: "Learners", icon: Users },
    { href: "/admin/elearning/courses", label: "Courses", icon: BookOpen },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 pt-6 pb-14 md:pb-16">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#016068]">
            Learn Technique
          </p>
          <h1 className="font-heading text-xl md:text-2xl tracking-tight text-zinc-900">
            E-learning admin
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <nav className="flex flex-wrap gap-1 rounded-xl border border-zinc-200 bg-white p-1">
            {nav.map(({ href, label, icon: Icon }) => {
              const active =
                href === "/admin/elearning"
                  ? pathname === href
                  : pathname?.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-[#016068] text-white"
                      : "text-zinc-600 hover:bg-zinc-50"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              );
            })}
          </nav>
          <Link
            href="/learn/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            Learner preview
            <ExternalLink size={14} />
          </Link>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      </header>
      {children}
    </div>
  );
}
