"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const PRESETS = [
  { label: "Default (5 min constant)", value: -1 as const },
  { label: "No cache (always live from Sanity)", value: 0 as const },
  { label: "1 minute", value: 60 },
  { label: "5 minutes", value: 300 },
  { label: "15 minutes", value: 900 },
  { label: "1 hour", value: 3600 },
  { label: "6 hours", value: 21_600 },
  { label: "24 hours", value: 86_400 },
] as const;

type GetPayload = {
  defaultSeconds: number;
  storedRaw: number;
  storage: "supabase" | "file" | "default";
  nextSeconds: number;
  effectiveSource: "env" | "persistence" | "default";
  envOverrides: boolean;
};

function describeSeconds(raw: number, defaultSec: number): string {
  if (raw === 0) return "No cache (every request hits Sanity for fresh GROQ)";
  if (raw < 0) return `App default (${defaultSec} seconds)`;
  if (raw < 60) return `${raw} seconds`;
  if (raw < 3600) return `${Math.round(raw / 60)} minutes`;
  if (raw < 86_400) return `${Math.round(raw / 3600)} hours`;
  return `${Math.round(raw / 86_400)} days`;
}

export function CmsDataCacheSettings() {
  const [data, setData] = useState<GetPayload | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [selectValue, setSelectValue] = useState<string>("-1");
  const [customSec, setCustomSec] = useState("300");

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await fetch("/api/admin/cms/cache-settings", {
        credentials: "same-origin",
      });
      if (!res.ok) {
        setLoadError("Could not load cache settings");
        setLoading(false);
        return;
      }
      const j = (await res.json()) as GetPayload;
      setData(j);
      if (!j.envOverrides) {
        const raw = j.storedRaw;
        const match = PRESETS.find((p) => p.value === raw);
        if (match) setSelectValue(String(raw));
        else {
          setSelectValue("custom");
          setCustomSec(String(Math.max(5, raw < 0 ? 300 : raw)));
        }
      } else {
        setSelectValue("-1");
      }
    } catch {
      setLoadError("Network error");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function save() {
    if (!data || data.envOverrides) return;
    setSaving(true);
    setMessage(null);
    setError(null);
    let n: number;
    if (selectValue === "custom") {
      n = Number.parseInt(customSec, 10);
      if (!Number.isFinite(n) || n < 5 || n > 604_800) {
        setError("Custom value must be between 5 and 604800 (seconds).");
        setSaving(false);
        return;
      }
    } else {
      n = Number.parseInt(selectValue, 10);
    }
    try {
      const res = await fetch("/api/admin/cms/cache-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ revalidateSeconds: n }),
      });
      const j = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(j.error || "Save failed");
        setSaving(false);
        return;
      }
      setMessage("Cache settings saved. New behaviour applies within a few seconds.");
      await load();
    } catch {
      setError("Network error");
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-white p-6 text-zinc-500 flex items-center gap-2">
        <Loader2 className="animate-spin size-4" />
        Loading cache settings…
      </div>
    );
  }

  if (loadError || !data) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        {loadError || "Not available (sign in required)."}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-zinc-900">Public site / Sanity data cache</h2>
        <p className="text-sm text-zinc-600 mt-1 max-w-2xl">
          Controls how long the web app reuses the same GROQ results in Next’s data cache.
          Shorter = fresher content, more work for Sanity. Longer = better performance under
          high traffic. “No cache” still uses live Sanity; it only turns off the shared
          next-cache layer.
        </p>
      </div>

      {data.envOverrides && (
        <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          <strong>Environment override:</strong>{" "}
          <code className="text-xs">CMS_DATA_CACHE_REVALIDATE_SECONDS</code> is set (current
          effective: <strong>{data.nextSeconds}</strong> s). Admin cannot change until that
          variable is removed on the host.
        </p>
      )}

      <div className="grid sm:grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-zinc-500">Live behaviour (this matches traffic now)</span>
          <p className="font-medium text-zinc-900">
            {describeSeconds(
              data.nextSeconds,
              data.defaultSeconds,
            )}
            <span className="text-zinc-500 font-normal"> (Next `revalidate`: {data.nextSeconds} s)</span>
          </p>
        </div>
        <div>
          <span className="text-zinc-500">Saved preference (when env does not override)</span>
          <p className="font-medium text-zinc-900">
            {data.envOverrides
              ? "— (env wins)"
              : describeSeconds(data.storedRaw, data.defaultSeconds)}
          </p>
        </div>
        <div className="sm:col-span-2">
          <span className="text-zinc-500">Where the preference is stored</span>
          <p className="font-medium text-zinc-900">
            {data.envOverrides
              ? "env (CMS_DATA_CACHE_REVALIDATE_SECONDS)"
              : data.storage === "supabase"
                ? "Supabase table cms_cache_settings"
                : data.storage === "file"
                  ? "Local file data/local-cms/cache-settings.json"
                  : "Default only (save once to create Supabase row or file)"}
          </p>
        </div>
      </div>

      {!data.envOverrides && (
        <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
          <label className="flex flex-col gap-1.5 min-w-0 sm:min-w-[220px]">
            <span className="text-xs font-medium text-zinc-500">Mode</span>
            <select
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm"
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
            >
              {PRESETS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
              <option value="custom">Custom (seconds)…</option>
            </select>
          </label>
          {selectValue === "custom" && (
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-zinc-500">Seconds (5 – 604800)</span>
              <input
                type="number"
                min={5}
                max={604800}
                className="w-full sm:w-36 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm"
                value={customSec}
                onChange={(e) => setCustomSec(e.target.value)}
              />
            </label>
          )}
          <button
            type="button"
            disabled={saving}
            onClick={() => void save()}
            className="rounded-lg bg-zinc-900 text-white px-4 py-2 text-sm font-medium hover:bg-zinc-800 disabled:opacity-50 inline-flex items-center gap-2 self-start"
          >
            {saving ? <Loader2 className="size-4 animate-spin" /> : null}
            Save cache setting
          </button>
        </div>
      )}

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
    </div>
  );
}
