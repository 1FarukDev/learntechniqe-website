"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { CmsLocalModeSettings } from "./CmsLocalModeSettings";
import { CmsDataCacheSettings } from "./CmsDataCacheSettings";

export function AdminCmsEditorClient() {
  const router = useRouter();
  const [auth, setAuth] = useState<boolean | null>(null);
  const [jsonText, setJsonText] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const me = await fetch("/api/admin/cms/me");
      const meData = (await me.json()) as { authenticated?: boolean };
      if (!meData.authenticated) {
        setAuth(false);
        setLoading(false);
        return;
      }
      setAuth(true);
      const res = await fetch("/api/admin/cms/store");
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        setError(j.error || "Could not load store.");
        setJsonText("");
        setLoading(false);
        return;
      }
      const data = await res.json();
      setJsonText(JSON.stringify(data, null, 2));
    } catch {
      setError("Network error.");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (auth === false) {
      router.replace("/admin/cms/login?next=/admin/cms");
    }
  }, [auth, router]);

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const parsed = JSON.parse(jsonText) as unknown;
      const res = await fetch("/api/admin/cms/store", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        documentCount?: number;
      };
      if (!res.ok) {
        setError(data.error || "Save failed.");
        setSaving(false);
        return;
      }
      setMessage(
        typeof data.documentCount === "number"
          ? `Saved ${data.documentCount} documents.`
          : "Saved.",
      );
    } catch {
      setError("Invalid JSON or network error.");
    }
    setSaving(false);
  }

  async function handleLogout() {
    await fetch("/api/admin/cms/logout", { method: "POST" });
    window.location.href = "/admin/cms/login";
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center gap-2 text-zinc-500">
        <Loader2 className="animate-spin size-5" />
        Loading…
      </div>
    );
  }

  if (auth === false) {
    return (
      <div className="min-h-screen flex items-center justify-center text-zinc-500">
        Redirecting to sign in…
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900">
              Local CMS store
            </h1>
            <p className="text-sm text-zinc-600 mt-1">
              Full JSON mirror of Sanity documents. Use{" "}
              <strong>Content source</strong> below to point the public site at
              this file or at live Sanity.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => void load()}
              className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
            >
              Reload
            </button>
            <button
              type="button"
              onClick={() => void handleLogout()}
              className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
            >
              Sign out
            </button>
          </div>
        </div>

        {message && (
          <p className="text-sm text-green-800 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
            {message}
          </p>
        )}
        {error && (
          <p className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <CmsLocalModeSettings />
        <CmsDataCacheSettings />

        <textarea
          className="w-full min-h-[70vh] font-mono text-sm leading-relaxed rounded-xl border border-zinc-200 bg-white p-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#016068]/25"
          spellCheck={false}
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
        />

        <div className="flex flex-wrap gap-3 items-center">
          <button
            type="button"
            disabled={saving}
            onClick={() => void handleSave()}
            className="rounded-xl bg-[#016068] px-6 py-3 text-sm font-semibold text-white hover:bg-[#014d54] disabled:opacity-60 inline-flex items-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 className="animate-spin size-4" />
                Saving…
              </>
            ) : (
              "Save store"
            )}
          </button>
          <Link
            href="/"
            className="text-sm text-[#016068] font-medium hover:underline"
          >
            ← Website home
          </Link>
        </div>
      </div>
    </main>
  );
}
