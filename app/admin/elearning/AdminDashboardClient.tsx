"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, BookOpen, Loader2, Users } from "lucide-react";

export function AdminDashboardClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [stats, setStats] = useState<{ learnerCount: number; courseCount: number } | null>(
    null
  );

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/elearning/dashboard");
      if (res.status === 401) {
        setUnauthorized(true);
        return;
      }
      const data = (await res.json()) as {
        learnerCount?: number;
        courseCount?: number;
      };
      setStats({
        learnerCount: data.learnerCount ?? 0,
        courseCount: data.courseCount ?? 0,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (unauthorized) {
      router.replace("/admin/elearning/login?next=/admin/elearning");
    }
  }, [unauthorized, router]);

  if (loading || !stats) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center gap-2 text-zinc-500">
        <Loader2 className="animate-spin size-5" />
        Loading…
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-sm font-semibold text-zinc-900">Overview</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Registered learners and published courses in Supabase.
        </p>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/admin/elearning/users"
            className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm hover:border-zinc-300 transition"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-[#016068]/10 text-[#016068]">
                <Users size={22} />
              </div>
              <ArrowRight
                size={18}
                className="text-zinc-300 group-hover:text-[#016068] transition"
              />
            </div>
            <p className="mt-4 text-3xl font-heading tracking-tight text-zinc-900">
              {stats.learnerCount}
            </p>
            <p className="text-sm font-medium text-zinc-600">Registered learners</p>
          </Link>

          <Link
            href="/admin/elearning/courses"
            className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm hover:border-zinc-300 transition"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-[#016068]/10 text-[#016068]">
                <BookOpen size={22} />
              </div>
              <ArrowRight
                size={18}
                className="text-zinc-300 group-hover:text-[#016068] transition"
              />
            </div>
            <p className="mt-4 text-3xl font-heading tracking-tight text-zinc-900">
              {stats.courseCount}
            </p>
            <p className="text-sm font-medium text-zinc-600">Courses</p>
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h3 className="font-semibold text-zinc-900">Quick actions</h3>
        <ul className="mt-4 space-y-2 text-sm">
          <li>
            <Link
              href="/admin/elearning/courses/new"
              className="font-medium text-[#016068] hover:text-[#014d54]"
            >
              Add a new course →
            </Link>
          </li>
          <li>
            <Link
              href="/admin/elearning/users"
              className="font-medium text-[#016068] hover:text-[#014d54]"
            >
              View learner accounts →
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
