"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";

type CourseRow = {
  id: number;
  slug: string;
  title: string;
  assign_on_lead: boolean;
  is_catalog_teaser: boolean;
  is_open_to_all_learners: boolean;
  package_updated_at: string | null;
};

export function AdminCoursesClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [courses, setCourses] = useState<CourseRow[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/elearning/courses");
      if (res.status === 401) {
        setUnauthorized(true);
        return;
      }
      const data = (await res.json()) as { courses?: CourseRow[] };
      setCourses(data.courses ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (unauthorized) {
      router.replace("/admin/elearning/login?next=/admin/elearning/courses");
    }
  }, [unauthorized, router]);

  async function removeCourse(id: number) {
    if (!confirm("Delete this course row from the database? SCORM files in storage are not removed automatically.")) {
      return;
    }
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/elearning/courses/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      await load();
    } catch {
      alert("Could not delete course.");
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center gap-2 text-zinc-500">
        <Loader2 className="animate-spin size-5" />
        Loading courses…
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-sm font-semibold text-zinc-900">Courses</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Manage catalogue entries, Zapier lead assignment, and SCORM uploads.
          </p>
        </div>
        <Link
          href="/admin/elearning/courses/new"
          className="inline-flex items-center gap-2 rounded-xl bg-[#016068] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#014d54] shrink-0"
        >
          <Plus size={18} />
          Add course
        </Link>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-zinc-50 border-b border-zinc-100">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Flags</th>
              <th className="px-4 py-3">Package</th>
              <th className="px-4 py-3 w-36" />
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-zinc-500">
                  No courses yet. Run the SQL migration or add one above.
                </td>
              </tr>
            ) : (
              courses.map((c) => (
                <tr key={c.id} className="border-t border-zinc-100">
                  <td className="px-4 py-3 font-medium text-zinc-900">{c.title}</td>
                  <td className="px-4 py-3 font-mono text-xs text-zinc-600">{c.slug}</td>
                  <td className="px-4 py-3 text-xs text-zinc-600 space-y-1">
                    {c.assign_on_lead && (
                      <span className="inline-block rounded-md bg-amber-50 px-2 py-0.5 text-amber-900 border border-amber-100">
                        Lead / Zapier
                      </span>
                    )}
                    {c.is_catalog_teaser && (
                      <span className="inline-block rounded-md bg-zinc-100 px-2 py-0.5 ml-1">
                        Teaser
                      </span>
                    )}
                    {c.is_open_to_all_learners && (
                      <span className="inline-block rounded-md bg-emerald-50 px-2 py-0.5 text-emerald-900 border border-emerald-100 ml-1">
                        Open to all
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-zinc-500 whitespace-nowrap text-xs">
                    {c.package_updated_at
                      ? new Date(c.package_updated_at).toLocaleString("en-GB")
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/admin/elearning/courses/${c.id}/edit`}
                        className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 bg-white px-2 py-1 text-xs font-semibold text-zinc-800 hover:bg-zinc-50"
                      >
                        <Pencil size={14} />
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeCourse(c.id)}
                        disabled={deletingId === c.id}
                        className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-xs font-semibold text-red-800 hover:bg-red-100 disabled:opacity-50"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
