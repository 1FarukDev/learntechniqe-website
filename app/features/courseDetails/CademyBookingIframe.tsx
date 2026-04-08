"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

const HEIGHT_MIN = 260;
const HEIGHT_MAX = 4000;
/** Before we know real height: keep modest so the section does not reserve ~80vh empty space */
const HEIGHT_INITIAL = 380;

function isCademyOrigin(origin: string): boolean {
  try {
    const host = new URL(origin).hostname.toLowerCase();
    return host === "cademy.io" || host.endsWith(".cademy.io");
  } catch {
    return false;
  }
}

function parseMessageHeight(data: unknown): number | null {
  if (typeof data === "number" && Number.isFinite(data) && data > 0) {
    return data;
  }
  if (typeof data === "string") {
    const trimmed = data.trim();
    if (/^\d+(\.\d+)?$/.test(trimmed)) return parseFloat(trimmed);
    try {
      return parseMessageHeight(JSON.parse(trimmed));
    } catch {
      return null;
    }
  }
  if (data && typeof data === "object") {
    const o = data as Record<string, unknown>;
    const keys = [
      "height",
      "iframeHeight",
      "frameHeight",
      "scrollHeight",
      "newHeight",
      "value",
      "h",
    ];
    for (const k of keys) {
      const v = o[k];
      if (typeof v === "number" && v > 0) return v;
      if (typeof v === "string" && /^\d+(\.\d+)?$/.test(v.trim()))
        return parseFloat(v.trim());
    }
  }
  return null;
}

interface CademyBookingIframeProps {
  src: string;
  title: string;
}

export function CademyBookingIframe({ src, title }: CademyBookingIframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [heightPx, setHeightPx] = useState(HEIGHT_INITIAL);

  const applyHeight = useCallback((raw: number) => {
    const v = Math.min(HEIGHT_MAX, Math.max(HEIGHT_MIN, Math.round(raw)));
    setHeightPx(v);
  }, []);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (iframeRef.current?.contentWindow !== e.source) return;
      if (!isCademyOrigin(e.origin)) return;
      const h = parseMessageHeight(e.data);
      if (h != null) applyHeight(h);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [applyHeight]);

  const handleLoad = (e: React.SyntheticEvent<HTMLIFrameElement>) => {
    const iframe = e.currentTarget;
    try {
      const doc = iframe.contentWindow?.document;
      if (!doc?.body) return;
      const h = Math.max(
        doc.body.scrollHeight,
        doc.documentElement?.scrollHeight ?? 0,
        doc.body.offsetHeight,
        doc.documentElement?.offsetHeight ?? 0,
      );
      if (h > HEIGHT_MIN) applyHeight(h);
    } catch {}
  };

  return (
    <iframe
      ref={iframeRef}
      src={src}
      title={title}
      className="w-full border-0"
      style={{
        height: heightPx,
        display: "block",
        maxHeight: "min(100vh, 4000px)",
      }}
      onLoad={handleLoad}
      sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-forms allow-modals allow-pointer-lock allow-storage-access-by-user-activation allow-top-navigation allow-top-navigation-by-user-activation allow-top-navigation-to-custom-protocols allow-presentation"
    />
  );
}
