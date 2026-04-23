"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { MarkNotFoundForHeader } from "@/app/shared/mark-not-found-header";

export default function PracticalAssessmentsLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/practical-assessments";

  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);

    try {
      const response = await fetch("/api/practical-assessments/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        setError(data.error || "Could not sign in.");
        setPending(false);
        return;
      }

      const safeNext = nextPath.startsWith("/")
        ? nextPath
        : "/practical-assessments";
      router.replace(safeNext);
      router.refresh();
    } catch {
      setError("Network error.");
      setPending(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10">
      <MarkNotFoundForHeader />
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-md">
        <h1 className="text-2xl font-semibold text-zinc-900">
          Practical Assessments
        </h1>
        <p className="mt-2 text-sm text-zinc-600">
          Enter the password to access this page.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-zinc-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-[#016068] focus:outline-none focus:ring-2 focus:ring-[#016068]/20"
            />
          </div>

          {error ? (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-[#016068] px-4 py-2 text-sm font-semibold text-white hover:bg-[#014d54] disabled:opacity-60"
          >
            {pending ? "Checking..." : "Enter"}
          </button>
        </form>
      </div>
    </main>
  );
}
