"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Database, Loader2 } from "lucide-react";

export function AdminCmsLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/admin/cms";

  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/cms/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error || "Could not sign in.");
        setPending(false);
        return;
      }
      const safeNext =
        nextPath.startsWith("/admin/cms") ? nextPath : "/admin/cms";
      router.replace(safeNext);
      router.refresh();
    } catch {
      setError("Network error.");
      setPending(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-zinc-50">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-xl shadow-zinc-200/60">
          <div className="flex justify-center mb-6">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-[#016068] text-white">
              <Database size={28} strokeWidth={2} />
            </span>
          </div>
          <h1 className="text-center font-heading text-2xl tracking-tight text-zinc-900">
            Local content admin
          </h1>
          <p className="mt-2 text-center text-sm text-zinc-500">
            Edit the JSON store and choose local vs live Sanity in the admin.
            Password:{" "}
            <code className="text-xs bg-zinc-100 px-1 rounded">
              SANITY_CMS_ADMIN_PASSWORD
            </code>
            .
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label
                htmlFor="cms-pw"
                className="block text-xs font-semibold text-zinc-700 mb-1.5"
              >
                Password
              </label>
              <input
                id="cms-pw"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm shadow-sm focus:border-[#016068] focus:outline-none focus:ring-2 focus:ring-[#016068]/20"
              />
            </div>
            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-xl bg-[#016068] py-3 text-sm font-semibold text-white hover:bg-[#014d54] disabled:opacity-60 inline-flex items-center justify-center gap-2"
            >
              {pending ? (
                <>
                  <Loader2 className="animate-spin size-4" />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>
        <p className="mt-8 text-center text-xs text-zinc-500">
          <Link href="/" className="text-[#016068] font-medium hover:underline">
            ← Back to website
          </Link>
        </p>
      </div>
    </main>
  );
}
