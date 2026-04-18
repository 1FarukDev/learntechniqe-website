"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  Clock,
  Loader2,
  Maximize2,
  Minimize2,
} from "lucide-react";

interface CoursePlayerProps {
  courseSlug: string;
  courseTitle: string;
  courseDuration: string;
  learnerFullName: string;
  learnerFirstName: string;
  alreadyCompleted: boolean;
  scormEntryUrl: string;
}

/**
 * We dynamically load `scorm-again` on the client and install both the SCORM
 * 1.2 (`API`) and SCORM 2004 (`API_1484_11`) interfaces on window so the
 * iframe's SCORM content can find them via its standard walk up the parent
 * chain. We don't persist any CMI data — this is a fire-and-forget harness
 * whose only job is to satisfy the SCORM content API contract and emit a
 * completion event.
 *
 * When completion is detected (lesson_status / completion_status) we POST to
 * /api/elearning/complete and surface the certificate CTA.
 */
export function CoursePlayer({
  courseSlug,
  courseTitle,
  courseDuration,
  learnerFullName,
  learnerFirstName,
  alreadyCompleted,
  scormEntryUrl,
}: CoursePlayerProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [runtimeReady, setRuntimeReady] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [completed, setCompleted] = useState(alreadyCompleted);
  const [savingCompletion, setSavingCompletion] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let scorm12: { on?: (ev: string, cb: () => void) => void } | null = null;
    let scorm2004: { on?: (ev: string, cb: () => void) => void } | null = null;

    async function install() {
      try {
        const mod = await import("scorm-again");
        if (cancelled) return;
        const ScormMod = mod as unknown as {
          Scorm12API?: new (cfg: Record<string, unknown>) => unknown;
          Scorm2004API?: new (cfg: Record<string, unknown>) => unknown;
        };

        const studentName = toScormName(learnerFullName);
        const studentId = `learner-${courseSlug}`;
        const commonCfg = {
          lmsCommitUrl: false,
          autocommit: false,
          logLevel: 4,
          selfReportSessionTime: true,
        } as const;

        if (ScormMod.Scorm12API) {
          scorm12 = new ScormMod.Scorm12API({
            ...commonCfg,
            cmi: {
              core: {
                student_id: studentId,
                student_name: studentName,
                lesson_status: alreadyCompleted ? "completed" : "incomplete",
              },
            },
          }) as typeof scorm12;
          (window as unknown as Record<string, unknown>).API = scorm12;
        }

        if (ScormMod.Scorm2004API) {
          scorm2004 = new ScormMod.Scorm2004API({
            ...commonCfg,
            cmi: {
              learner_id: studentId,
              learner_name: studentName,
              completion_status: alreadyCompleted ? "completed" : "incomplete",
            },
          }) as typeof scorm2004;
          (window as unknown as Record<string, unknown>).API_1484_11 =
            scorm2004;
        }

        const handleCompleted = () => {
          if (!cancelled) markCompleted();
        };

        scorm12?.on?.("LMSSetValue.cmi.core.lesson_status.completed", handleCompleted);
        scorm12?.on?.("LMSSetValue.cmi.core.lesson_status.passed", handleCompleted);
        scorm12?.on?.("LMSFinish", handleCompleted);
        scorm2004?.on?.("SetValue.cmi.completion_status.completed", handleCompleted);
        scorm2004?.on?.("SetValue.cmi.success_status.passed", handleCompleted);
        scorm2004?.on?.("Terminate", handleCompleted);

        setRuntimeReady(true);
      } catch (err) {
        console.error("Failed to load SCORM runtime", err);
        // Still allow the player to render — the content may be plain HTML.
        setRuntimeReady(true);
      }
    }

    install();
    return () => {
      cancelled = true;
      try {
        delete (window as unknown as Record<string, unknown>).API;
        delete (window as unknown as Record<string, unknown>).API_1484_11;
      } catch {
        // ignore
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSlug, alreadyCompleted, learnerFullName]);

  async function markCompleted() {
    if (savingCompletion) return;
    setSavingCompletion(true);
    try {
      await fetch("/api/elearning/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: courseSlug }),
      });
    } catch (err) {
      console.error("Completion save failed", err);
    }
    setCompleted(true);
    setSavingCompletion(false);
  }

  async function toggleFullscreen() {
    const el = wrapperRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      try {
        await el.requestFullscreen();
        setFullscreen(true);
      } catch {
        // ignore
      }
    } else {
      try {
        await document.exitFullscreen();
        setFullscreen(false);
      } catch {
        // ignore
      }
    }
  }

  useEffect(() => {
    function onFs() {
      setFullscreen(Boolean(document.fullscreenElement));
    }
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div>
          <Link
            href="/learn/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 hover:text-[#016068] transition"
          >
            <ArrowLeft size={13} strokeWidth={2.4} />
            Back to dashboard
          </Link>
          <h1 className="mt-3 font-heading text-2xl md:text-3xl tracking-tight text-zinc-900">
            {courseTitle}
          </h1>
          <p className="mt-1.5 text-sm text-zinc-500 inline-flex items-center gap-1.5">
            <Clock size={13} strokeWidth={2.4} />
            {courseDuration} · Hi {learnerFirstName}, take your time.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {completed && (
            <Link
              href={`/learn/certificate/${courseSlug}`}
              className="inline-flex items-center gap-2 rounded-xl bg-[#E99E20] px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#c98716] active:scale-[0.99] transition"
            >
              <Award size={15} strokeWidth={2.4} />
              View certificate
            </Link>
          )}
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm font-medium text-zinc-700 hover:border-zinc-300 transition"
          >
            {fullscreen ? (
              <>
                <Minimize2 size={14} strokeWidth={2.4} />
                <span className="hidden sm:inline">Exit fullscreen</span>
              </>
            ) : (
              <>
                <Maximize2 size={14} strokeWidth={2.4} />
                <span className="hidden sm:inline">Fullscreen</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div
        ref={wrapperRef}
        className="relative rounded-2xl overflow-hidden bg-zinc-900 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.3)] border border-zinc-200"
      >
        {!iframeLoaded && (
          <div className="absolute inset-0 flex items-center justify-center text-white/80 bg-zinc-900 z-10">
            <div className="flex items-center gap-3 text-sm">
              <Loader2 size={18} className="animate-spin" />
              Loading your course…
            </div>
          </div>
        )}
        <div className="aspect-[16/10] md:aspect-[16/9] w-full">
          {runtimeReady ? (
            <iframe
              ref={iframeRef}
              src={scormEntryUrl}
              title={courseTitle}
              allow="autoplay; fullscreen; encrypted-media"
              allowFullScreen
              className="w-full h-full bg-white"
              onLoad={() => setIframeLoaded(true)}
            />
          ) : null}
        </div>
      </div>

      <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-zinc-200 bg-white px-5 py-4">
        <div className="flex items-center gap-3 text-sm">
          {completed ? (
            <>
              <span className="flex size-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <CheckCircle2 size={18} strokeWidth={2.4} />
              </span>
              <div>
                <p className="font-semibold text-zinc-900">
                  Course completed. Well done, {learnerFirstName}!
                </p>
                <p className="text-xs text-zinc-500">
                  Your certificate is ready to download.
                </p>
              </div>
            </>
          ) : (
            <>
              <span className="flex size-9 items-center justify-center rounded-full bg-[#016068]/10 text-[#016068]">
                <Clock size={18} strokeWidth={2.4} />
              </span>
              <div>
                <p className="font-semibold text-zinc-900">
                  Playing: {courseTitle}
                </p>
                <p className="text-xs text-zinc-500">
                  Your certificate will unlock at the end of the course.
                </p>
              </div>
            </>
          )}
        </div>

        {!completed && (
          <button
            type="button"
            onClick={markCompleted}
            disabled={savingCompletion}
            className="text-xs font-semibold text-zinc-500 hover:text-[#016068] underline underline-offset-4 disabled:opacity-50"
          >
            {savingCompletion ? "Saving…" : "Having trouble? Mark as complete"}
          </button>
        )}
      </div>
    </main>
  );
}

function toScormName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length < 2) return fullName;
  const last = parts[parts.length - 1];
  const first = parts.slice(0, -1).join(" ");
  return `${last}, ${first}`;
}
