"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Loader2, Trash2 } from "lucide-react";

type LearnerRow = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  courseSlug: string;
  completedAt: string | null;
  createdAt: string;
  lastLoginAt: string | null;
};

export function AdminLearnersClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [learners, setLearners] = useState<LearnerRow[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/elearning/learners");
      if (res.status === 401) {
        setUnauthorized(true);
        return;
      }
      const data = (await res.json()) as { learners?: LearnerRow[] };
      const raw = data.learners ?? [];
      setLearners(
        raw.map((l) => ({
          ...l,
          createdAt:
            typeof l.createdAt === "string"
              ? l.createdAt
              : new Date(l.createdAt as unknown as Date).toISOString(),
          completedAt: l.completedAt
            ? typeof l.completedAt === "string"
              ? l.completedAt
              : new Date(l.completedAt as unknown as Date).toISOString()
            : null,
          lastLoginAt: l.lastLoginAt
            ? typeof l.lastLoginAt === "string"
              ? l.lastLoginAt
              : new Date(l.lastLoginAt as unknown as Date).toISOString()
            : null,
        }))
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (unauthorized) {
      router.replace("/admin/elearning/login?next=/admin/elearning/users");
    }
  }, [unauthorized, router]);

  async function removeLearner(id: number) {
    if (!confirm("Delete this learner and their completion records?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(
        `/api/admin/elearning/learners?id=${encodeURIComponent(String(id))}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Delete failed");
      await load();
    } catch {
      alert("Could not delete learner.");
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center gap-2 text-zinc-500">
        <Loader2 className="animate-spin size-5" />
        Loading learners…
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-sm font-semibold text-zinc-900">Registered learners</h2>
      <p className="mt-1 text-sm text-zinc-500 mb-6">
        Accounts created via your lead funnel or intake API. Delete removes the
        row from Supabase (cannot be undone).
      </p>

      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-zinc-50 border-b border-zinc-100">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Assigned course</th>
              <th className="px-4 py-3">Completed</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3 w-24" />
            </tr>
          </thead>
          <tbody>
            {learners.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-zinc-500">
                  No learners yet.
                </td>
              </tr>
            ) : (
              learners.map((l) => (
                <tr key={l.id} className="border-t border-zinc-100">
                  <td className="px-4 py-3 font-medium text-zinc-900">{l.email}</td>
                  <td className="px-4 py-3 text-zinc-600">
                    {[l.firstName, l.lastName].filter(Boolean).join(" ") || "—"}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-zinc-600">
                    {l.courseSlug}
                  </td>
                  <td className="px-4 py-3 text-zinc-600">
                    {l.completedAt
                      ? new Date(l.completedAt).toLocaleDateString("en-GB")
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-zinc-500 whitespace-nowrap">
                    {new Date(l.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => removeLearner(l.id)}
                      disabled={deletingId === l.id}
                      className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-xs font-semibold text-red-800 hover:bg-red-100 disabled:opacity-50"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
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
