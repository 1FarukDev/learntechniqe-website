"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  ArrowLeft,
  Loader2,
  Package,
  Save,
  Upload,
} from "lucide-react";

type CoursePayload = {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  duration: string;
  entry_file: string;
  storage_prefix: string | null;
  package_updated_at: string | null;
  sort_order: number;
  assign_on_lead: boolean;
  is_catalog_teaser: boolean;
  is_open_to_all_learners: boolean;
  tag: string;
  accent_class: string;
  icon_path: string;
};

export function AdminCourseEditClient({ courseId }: { courseId: string }) {
  const router = useRouter();
  const idNum = Number(courseId);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [course, setCourse] = useState<CoursePayload | null>(null);

  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [duration, setDuration] = useState("");
  const [entryFile, setEntryFile] = useState("index.html");
  const [sortOrder, setSortOrder] = useState(0);
  const [assignOnLead, setAssignOnLead] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [openAll, setOpenAll] = useState(false);
  const [tag, setTag] = useState("");
  const [accentClass, setAccentClass] = useState("");
  const [iconPath, setIconPath] = useState("");

  const [zipFile, setZipFile] = useState<File | null>(null);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(
    null
  );
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    if (!Number.isFinite(idNum)) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/elearning/courses/${idNum}`);
      if (res.status === 401) {
        setUnauthorized(true);
        return;
      }
      const data = (await res.json()) as { course?: CoursePayload };
      if (data.course) {
        const c = data.course;
        setCourse(c);
        setSlug(c.slug);
        setTitle(c.title);
        setTagline(c.tagline);
        setDuration(c.duration);
        setEntryFile(c.entry_file || "index.html");
        setSortOrder(c.sort_order ?? 0);
        setAssignOnLead(c.assign_on_lead);
        setTeaser(c.is_catalog_teaser);
        setOpenAll(c.is_open_to_all_learners);
        setTag(c.tag);
        setAccentClass(c.accent_class);
        setIconPath(c.icon_path);
      }
    } finally {
      setLoading(false);
    }
  }, [idNum]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (unauthorized) {
      router.replace(
        `/admin/elearning/login?next=${encodeURIComponent(`/admin/elearning/courses/${courseId}/edit`)}`
      );
    }
  }, [unauthorized, router, courseId]);

  async function saveMeta() {
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/admin/elearning/courses/${idNum}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: slug.trim().toLowerCase(),
          title: title.trim(),
          tagline,
          duration,
          entry_file: entryFile,
          sort_order: sortOrder,
          assign_on_lead: assignOnLead,
          is_catalog_teaser: teaser,
          is_open_to_all_learners: openAll,
          tag,
          accent_class: accentClass,
          icon_path: iconPath,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Save failed");
      setMsg({ type: "ok", text: "Saved course." });
      await load();
    } catch (e) {
      setMsg({
        type: "err",
        text: e instanceof Error ? e.message : "Save failed",
      });
    } finally {
      setBusy(false);
    }
  }

  async function publishZip() {
    if (!zipFile) {
      setMsg({ type: "err", text: "Choose a SCORM zip file first." });
      return;
    }
    setBusy(true);
    setMsg(null);
    try {
      const signRes = await fetch("/api/admin/elearning/sign-upload", {
        method: "POST",
      });
      const signData = (await signRes.json()) as {
        signedUrl?: string;
        path?: string;
        error?: string;
      };
      if (!signRes.ok || !signData.signedUrl || !signData.path) {
        throw new Error(signData.error || "Could not start upload.");
      }

      const putRes = await fetch(signData.signedUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/zip" },
        body: zipFile,
      });
      if (!putRes.ok) {
        throw new Error(
          `Upload to storage failed (${putRes.status}). Check bucket policies.`
        );
      }

      const pubRes = await fetch("/api/admin/elearning/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: idNum,
          stagingZipPath: signData.path,
          title,
          tagline,
          duration,
          entryFile,
        }),
      });
      const pubData = (await pubRes.json()) as {
        error?: string;
        fileCount?: number;
      };
      if (!pubRes.ok) throw new Error(pubData.error || "Publish failed.");

      setMsg({
        type: "ok",
        text: `Published ${pubData.fileCount ?? "?"} files to storage prefix "${slug}".`,
      });
      setZipFile(null);
      await load();
    } catch (e) {
      setMsg({
        type: "err",
        text: e instanceof Error ? e.message : "Publish failed",
      });
    } finally {
      setBusy(false);
    }
  }

  if (!Number.isFinite(idNum)) {
    return (
      <p className="text-sm text-red-600">Invalid course id.</p>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center gap-2 text-zinc-500">
        <Loader2 className="animate-spin size-5" />
        Loading…
      </div>
    );
  }

  if (!course) {
    return <p className="text-sm text-zinc-500">Course not found.</p>;
  }

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/elearning/courses"
        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 hover:text-[#016068] mb-6"
      >
        <ArrowLeft size={13} strokeWidth={2.4} />
        Back to courses
      </Link>

      <h2 className="font-heading text-xl text-zinc-900">Edit course</h2>
      <p className="mt-1 text-sm text-zinc-500 mb-8">
        Slug <span className="font-mono">{slug}</span> — changing it after
        publishing may leave old files in storage; republish after renames.
      </p>

      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-zinc-100 px-6 py-4 bg-zinc-50/80">
          <h3 className="font-semibold text-zinc-900">Details</h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Shown on the learner dashboard and certificate.
          </p>
        </div>
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Slug
              </label>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-mono"
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
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">
              Duration (display text)
            </label>
            <input
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
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
              rows={4}
              className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm resize-y min-h-[100px]"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Tag (pill)
              </label>
              <input
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Accent (Tailwind gradient classes)
              </label>
              <input
                value={accentClass}
                onChange={(e) => setAccentClass(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-mono text-xs"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">
              Icon path (SVG path d)
            </label>
            <textarea
              value={iconPath}
              onChange={(e) => setIconPath(e.target.value)}
              rows={2}
              className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-mono text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">
              Launch file (inside the zip)
            </label>
            <input
              value={entryFile}
              onChange={(e) => setEntryFile(e.target.value)}
              placeholder="index.html"
              className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-mono text-xs"
            />
          </div>

          <div className="space-y-2 pt-2 border-t border-zinc-100">
            <label className="flex items-center gap-2 text-sm text-zinc-700">
              <input
                type="checkbox"
                checked={assignOnLead}
                onChange={(e) => setAssignOnLead(e.target.checked)}
              />
              Zapier / lead assignment course
            </label>
            <label className="flex items-center gap-2 text-sm text-zinc-700">
              <input
                type="checkbox"
                checked={openAll}
                onChange={(e) => setOpenAll(e.target.checked)}
              />
              Open to all signed-in learners
            </label>
            <label className="flex items-center gap-2 text-sm text-zinc-700">
              <input
                type="checkbox"
                checked={teaser}
                onChange={(e) => setTeaser(e.target.checked)}
              />
              Catalogue teaser only (locked)
            </label>
          </div>

          {course.package_updated_at && (
            <p className="text-xs text-zinc-500">
              Last package upload:{" "}
              {new Date(course.package_updated_at).toLocaleString("en-GB")}
              {course.storage_prefix ? ` · storage: ${course.storage_prefix}/` : ""}
            </p>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              disabled={busy}
              onClick={saveMeta}
              className="inline-flex items-center gap-2 rounded-xl bg-[#016068] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#014d54] disabled:opacity-60"
            >
              <Save size={16} />
              Save details
            </button>
          </div>
        </div>

        <div className="border-t border-zinc-100 px-6 py-4 bg-zinc-50/80">
          <h3 className="font-semibold text-zinc-900 flex items-center gap-2">
            <Package size={18} className="text-[#016068]" />
            SCORM package (.zip)
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Upload publishes to Supabase Storage under{" "}
            <code className="bg-white px-1 rounded border">{slug}/</code> and
            serves from{" "}
            <code className="bg-white px-1 rounded border">/elearning-scorm/…</code>.
          </p>
        </div>
        <div className="p-6 space-y-4">
          <input
            type="file"
            accept=".zip,application/zip"
            onChange={(e) => setZipFile(e.target.files?.[0] ?? null)}
            className="block w-full text-sm text-zinc-600 file:mr-4 file:rounded-lg file:border-0 file:bg-[#016068] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#014d54]"
          />
          <button
            type="button"
            disabled={busy || teaser}
            onClick={publishZip}
            className="inline-flex items-center gap-2 rounded-xl border border-[#016068] bg-[#016068]/5 px-4 py-2.5 text-sm font-semibold text-[#016068] hover:bg-[#016068]/10 disabled:opacity-60"
          >
            <Upload size={16} />
            Upload zip &amp; publish
          </button>
          {teaser && (
            <p className="text-xs text-amber-800">
              Teaser courses cannot host SCORM — turn off “teaser only” to publish a package.
            </p>
          )}
        </div>
      </div>

      {msg && (
        <div
          role="alert"
          className={`mt-6 rounded-xl border px-4 py-3 text-sm ${
            msg.type === "ok"
              ? "border-emerald-200 bg-emerald-50 text-emerald-900"
              : "border-red-200 bg-red-50 text-red-900"
          }`}
        >
          {msg.text}
        </div>
      )}

      {busy && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl px-6 py-4 shadow-xl flex items-center gap-3">
            <Loader2 className="animate-spin text-[#016068]" />
            <span className="text-sm font-medium">Working…</span>
          </div>
        </div>
      )}
    </div>
  );
}
