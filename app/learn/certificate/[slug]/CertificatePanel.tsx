"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";

interface CertificatePanelProps {
  fullName: string;
  courseTitle: string;
  completedDate: string;
  certificateId: string;
}

export function CertificatePanel({
  fullName,
  courseTitle,
  completedDate,
  certificateId,
}: CertificatePanelProps) {
  const [generating, setGenerating] = useState(false);

  async function handleDownload() {
    if (generating) return;
    setGenerating(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: "a4",
      });

      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();

      // Outer frame
      doc.setFillColor(246, 248, 250);
      doc.rect(0, 0, pageW, pageH, "F");

      // Inner card
      const margin = 28;
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(margin, margin, pageW - margin * 2, pageH - margin * 2, 14, 14, "F");

      // Decorative teal bar
      doc.setFillColor(1, 96, 104);
      doc.rect(margin, margin, pageW - margin * 2, 8, "F");

      // Accent gold bar
      doc.setFillColor(233, 158, 32);
      doc.rect(margin, margin + 8, 160, 4, "F");

      // Header
      doc.setTextColor(1, 96, 104);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("LEARN TECHNIQUE", pageW / 2, margin + 50, { align: "center" });
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(120, 120, 120);
      doc.text("TECHNIQUE LEARNING SOLUTIONS", pageW / 2, margin + 66, {
        align: "center",
      });

      // Title
      doc.setTextColor(20, 20, 20);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(34);
      doc.text("Certificate of Completion", pageW / 2, margin + 130, {
        align: "center",
      });

      // Sub
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(110, 110, 110);
      doc.text("This certifies that", pageW / 2, margin + 170, {
        align: "center",
      });

      // Learner name
      doc.setFont("helvetica", "bold");
      doc.setFontSize(32);
      doc.setTextColor(1, 96, 104);
      doc.text(fullName, pageW / 2, margin + 215, { align: "center" });

      // Underline
      const nameWidth = doc.getTextWidth(fullName);
      doc.setDrawColor(233, 158, 32);
      doc.setLineWidth(1.2);
      doc.line(
        (pageW - nameWidth) / 2,
        margin + 225,
        (pageW + nameWidth) / 2,
        margin + 225
      );

      // Body
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(90, 90, 90);
      doc.text("has successfully completed the course", pageW / 2, margin + 255, {
        align: "center",
      });

      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.setTextColor(20, 20, 20);
      doc.text(`"${courseTitle}"`, pageW / 2, margin + 290, { align: "center" });

      // Footer row: date + signature + id
      const footerY = pageH - margin - 70;
      doc.setLineWidth(0.5);
      doc.setDrawColor(220, 220, 220);
      doc.line(margin + 80, footerY, margin + 260, footerY);
      doc.line(pageW - margin - 260, footerY, pageW - margin - 80, footerY);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(40, 40, 40);
      doc.text(completedDate, margin + 170, footerY + 16, { align: "center" });
      doc.text("Mark Harvey", pageW - margin - 170, footerY + 16, {
        align: "center",
      });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text("Date of completion", margin + 170, footerY + 30, {
        align: "center",
      });
      doc.text("Managing Director", pageW - margin - 170, footerY + 30, {
        align: "center",
      });

      // Certificate ID
      doc.setFontSize(8);
      doc.setTextColor(170, 170, 170);
      doc.text(
        `Certificate ID: ${certificateId}  ·  Verify at learntechnique.com`,
        pageW / 2,
        pageH - margin - 22,
        { align: "center" }
      );

      const filename = `learn-technique-certificate-${fullName
        .replace(/[^a-z0-9]+/gi, "-")
        .toLowerCase()}.pdf`;
      doc.save(filename);
    } catch (err) {
      console.error("Certificate generation failed", err);
      alert("Sorry — we couldn't generate your certificate. Please try again.");
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="rounded-3xl overflow-hidden border border-zinc-200 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.15)] bg-white">
      {/* Visual certificate preview */}
      <div className="relative aspect-[1.414/1] w-full bg-[#F6F8FA]">
        <div className="absolute inset-4 md:inset-8 rounded-xl bg-white border border-zinc-100 overflow-hidden">
          <div className="h-2 bg-[#016068]" />
          <div className="h-1 w-40 bg-[#E99E20]" />
          <div className="px-6 md:px-14 py-8 md:py-12 flex flex-col items-center text-center h-full">
            <p className="text-[10px] md:text-xs font-bold tracking-[0.35em] text-[#016068]">
              LEARN TECHNIQUE
            </p>
            <p className="mt-1 text-[9px] md:text-[10px] tracking-[0.3em] text-zinc-400">
              TECHNIQUE LEARNING SOLUTIONS
            </p>

            <h2 className="mt-5 md:mt-8 font-heading text-2xl md:text-4xl tracking-tight text-zinc-900">
              Certificate of Completion
            </h2>
            <p className="mt-4 md:mt-6 text-[11px] md:text-sm text-zinc-500">
              This certifies that
            </p>
            <p className="mt-2 md:mt-3 font-heading text-xl md:text-3xl text-[#016068] tracking-tight px-4 border-b-2 border-[#E99E20] pb-1 max-w-full truncate">
              {fullName}
            </p>
            <p className="mt-4 md:mt-6 text-[11px] md:text-sm text-zinc-500 px-6">
              has successfully completed the course
            </p>
            <p className="mt-1.5 md:mt-2 font-semibold text-sm md:text-xl text-zinc-900 italic px-6 max-w-2xl">
              &ldquo;{courseTitle}&rdquo;
            </p>

            <div className="mt-auto pt-6 md:pt-10 flex w-full items-end justify-between text-[10px] md:text-xs text-zinc-500">
              <div className="flex-1 text-center">
                <p className="border-t border-zinc-200 pt-1.5 mx-4 md:mx-6 font-semibold text-zinc-800">
                  {completedDate}
                </p>
                <p className="text-[9px] md:text-[10px] text-zinc-400 mt-0.5">
                  Date of completion
                </p>
              </div>
              <div className="flex-1 text-center">
                <p className="border-t border-zinc-200 pt-1.5 mx-4 md:mx-6 font-semibold text-zinc-800">
                  Mark Harvey
                </p>
                <p className="text-[9px] md:text-[10px] text-zinc-400 mt-0.5">
                  Managing Director
                </p>
              </div>
            </div>

            <p className="mt-3 md:mt-5 text-[9px] md:text-[10px] text-zinc-400 tracking-wide">
              Certificate ID: {certificateId}
            </p>
          </div>
        </div>
      </div>

      {/* Download bar */}
      <div className="px-5 md:px-8 py-4 border-t border-zinc-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-zinc-50">
        <p className="text-xs text-zinc-500">
          A PDF copy is also on its way to your inbox.
        </p>
        <button
          type="button"
          onClick={handleDownload}
          disabled={generating}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#016068] px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#014d54] active:scale-[0.99] disabled:opacity-70 transition"
        >
          {generating ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              Preparing PDF…
            </>
          ) : (
            <>
              <Download size={15} strokeWidth={2.4} />
              Download PDF certificate
            </>
          )}
        </button>
      </div>
    </div>
  );
}
