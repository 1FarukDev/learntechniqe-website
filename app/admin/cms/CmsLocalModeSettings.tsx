"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

type Payload = {
  useLocalCms: boolean;
  source: "file" | "env" | "default";
  fileExists: boolean;
  storeFilePath: string;
  storeFileExists: boolean;
  modeFilePath: string;
};

export function CmsLocalModeSettings() {
  const [data, setData] = useState<Payload | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await fetch("/api/admin/cms/local-mode", {
        credentials: "same-origin",
      });
      if (!res.ok) {
        setLoadError("Could not load local CMS mode");
        setLoading(false);
        return;
      }
      const j = (await res.json()) as Payload;
      setData(j);
      setChecked(j.useLocalCms);
    } catch {
      setLoadError("Network error");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function save(next: boolean): Promise<boolean> {
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const res = await fetch("/api/admin/cms/local-mode", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ useLocalCms: next }),
      });
      const j = (await res.json().catch(() => ({}))) as {
        error?: string;
        useLocalCms?: boolean;
      };
      if (!res.ok) {
        setError(j.error || "Save failed");
        return false;
      }
      if (typeof j.useLocalCms === "boolean") {
        setChecked(j.useLocalCms);
        setData((d) => (d ? { ...d, useLocalCms: j.useLocalCms! } : d));
      }
      setMessage("Saved. The public site picks this up on the next request.");
      await load();
      return true;
    } catch {
      setError("Network error");
      return false;
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-white p-6 text-zinc-500 flex items-center gap-2">
        <Loader2 className="animate-spin size-4" />
        Loading data source…
      </div>
    );
  }

  if (loadError || !data) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        {loadError || "Not available."}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-zinc-900">
          Content source
        </h2>
        <p className="text-sm text-zinc-600 mt-1 max-w-2xl">
          Choose where the <strong>public site</strong> loads courses, blog,
          navigation, and other CMS data from. Turning on local mode stops
          Sanity GROQ API calls (helps with quota); the site then reads the JSON
          store. Run <code className="text-xs bg-zinc-100 px-1 rounded">npm run export:local-cms</code> first so the store is populated.
        </p>
      </div>

      {data.source === "env" && !data.fileExists && (
        <p className="text-sm text-amber-900 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          <strong>Env fallback:</strong> <code className="text-xs">USE_LOCAL_CMS</code>{" "}
          is set but no mode file exists yet. Saving the switch below creates{" "}
          <code className="text-xs break-all">{data.modeFilePath}</code> and
          the file becomes the control from then on.
        </p>
      )}

      {!data.storeFileExists && (
        <p className="text-sm text-red-800 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          <strong>Missing store file</strong> at{" "}
          <code className="text-xs break-all">{data.storeFilePath}</code>. Local
          mode will error until you run <code className="text-xs">npm run export:local-cms</code>.
        </p>
      )}

      <label className="flex items-start gap-3 cursor-pointer select-none">
        <input
          type="checkbox"
          className="mt-1 size-4 rounded border-zinc-300 text-[#016068] focus:ring-[#016068]/30"
          checked={checked}
          disabled={saving}
          onChange={async (e) => {
            const v = e.target.checked;
            setChecked(v);
            const ok = await save(v);
            if (!ok) setChecked(!v);
          }}
        />
        <span className="text-sm text-zinc-800">
          <span className="font-medium">Use local JSON store (no Sanity API for reads)</span>
          {saving && (
            <Loader2 className="inline size-3.5 animate-spin ml-2 align-middle" />
          )}
        </span>
      </label>

      <p className="text-xs text-zinc-500">
        Active:{" "}
        <strong>{data.useLocalCms ? "local store" : "Sanity (live API)"}</strong>
        {data.source === "file" && " · set by mode file"}
        {data.source === "env" && " · from env until you save a mode file"}
        {data.source === "default" && " · default (Sanity)"}
      </p>

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
