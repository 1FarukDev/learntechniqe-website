"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";

export function AdminCourseNewClient() {
  const router = useRouter();
  const [unauthorized, setUnauthorized] = useState(false);
  const [busy, setBusy] = useState(false);
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [duration, setDuration] = useState("Approx. 30 minutes");
  const [assignOnLead, setAssignOnLead] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [openAll, setOpenAll] = useState(true);
  const [sortOrder, setSortOrder] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetch("/api/admin/elearning/courses");
      if (!cancelled && res.status === 401) setUnauthorized(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (unauthorized) {
      router.replace("/admin/elearning/login?next=/admin/elearning/courses/new");
    }
  }, [unauthorized, router]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await fetch("/api/admin/elearning/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: slug.trim().toLowerCase(),
          title: title.trim(),
          tagline,
          duration,
          sort_order: sortOrder,
          assign_on_lead: assignOnLead,
          is_catalog_teaser: teaser,
          is_open_to_all_learners: openAll,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        course?: { id: number };
      };
      if (!res.ok) throw new Error(data.error || "Could not create");
      const id = data.course?.id;
      if (id != null) {
        router.replace(`/admin/elearning/courses/${id}/edit`);
        return;
      }
      router.replace("/admin/elearning/courses");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-xl">
      <Link
        href="/admin/elearning/courses"
        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 hover:text-[#016068] mb-6"
      >
        <ArrowLeft size={13} strokeWidth={2.4} />
        Back to courses
      </Link>

      <h2 className="font-heading text-xl text-zinc-900">New course</h2>
      <p className="mt-1 text-sm text-zinc-500 mb-6">
        Create metadata first. You can upload SCORM on the next screen.
      </p>

      <form onSubmit={submit} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm space-y-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-700 mb-1">
            URL slug
          </label>
          <input
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="electrical-safety-essentials"
            className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-mono"
          />
          <p className="mt-1 text-xs text-zinc-400">
            Lowercase letters, numbers, and hyphens. Used in URLs and storage paths.
          </p>
        </div>
        <div>
          <label className="block text-xs font-semibold text-zinc-700 mb-1">
            Title
          </label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-zinc-700 mb-1">
            Description
          </label>
          <textarea
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm resize-y"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-zinc-700 mb-1">
            Duration (display)
          </label>
          <input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-zinc-700 mb-1">
            Sort order
          </label>
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm"
          />
        </div>

        <div className="space-y-2 pt-2">
          <label className="flex items-center gap-2 text-sm text-zinc-700">
            <input
              type="checkbox"
              checked={assignOnLead}
              onChange={(e) => setAssignOnLead(e.target.checked)}
            />
            Assign new Zapier / lead learners to this course
          </label>
          <label className="flex items-center gap-2 text-sm text-zinc-700">
            <input
              type="checkbox"
              checked={openAll}
              onChange={(e) => setOpenAll(e.target.checked)}
            />
            Open to all signed-in learners (not only assigned slug)
          </label>
          <label className="flex items-center gap-2 text-sm text-zinc-700">
            <input
              type="checkbox"
              checked={teaser}
              onChange={(e) => setTeaser(e.target.checked)}
            />
            Catalogue teaser only (locked, no player)
          </label>
        </div>

        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center gap-2 rounded-xl bg-[#016068] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#014d54] disabled:opacity-60"
        >
          {busy ? <Loader2 className="animate-spin size-4" /> : null}
          Create and continue
        </button>
      </form>
    </div>
  );
}
