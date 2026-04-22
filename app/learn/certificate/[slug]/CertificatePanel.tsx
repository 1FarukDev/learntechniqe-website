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

      // Outer background and border
      doc.setFillColor(232, 241, 247);
      doc.rect(0, 0, pageW, pageH, "F");
      doc.setDrawColor(123, 151, 171);
      doc.setLineWidth(8);
      doc.rect(12, 12, pageW - 24, pageH - 24, "S");

      // Inner card
      const margin = 34;
      doc.setFillColor(255, 255, 255);
      doc.rect(margin, margin, pageW - margin * 2, pageH - margin * 2, "F");
      doc.setDrawColor(123, 151, 171);
      doc.setLineWidth(1.2);
      doc.rect(margin + 6, margin + 6, pageW - margin * 2 - 12, pageH - margin * 2 - 12, "S");

      // Header
      doc.setTextColor(32, 32, 32);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(25);
      doc.text("TECHNIQUE", pageW / 2, margin + 48, { align: "center" });
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(70, 70, 70);
      doc.text("For ALL your engineering training needs", pageW / 2, margin + 62, {
        align: "center",
      });
      doc.setFontSize(7);
      doc.text(`Date of Attendance: ${completedDate}`, pageW - margin - 18, margin + 62, {
        align: "right",
      });

      // Title
      doc.setTextColor(93, 133, 150);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(34);
      doc.text("Certificate of Attendance", pageW / 2, margin + 122, {
        align: "center",
      });

      // Sub
      doc.setFont("helvetica", "normal");
      doc.setFontSize(13);
      doc.setTextColor(25, 25, 25);
      doc.text("This is to certify that", pageW / 2, margin + 160, {
        align: "center",
      });

      // Name boxed line
      const boxW = pageW * 0.58;
      const boxX = (pageW - boxW) / 2;
      doc.setDrawColor(198, 198, 198);
      doc.setLineWidth(0.8);
      doc.rect(boxX, margin + 176, boxW, 17, "S");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(78, 104, 119);
      doc.text(fullName, pageW / 2, margin + 190, { align: "center" });

      // Body
      doc.setFont("helvetica", "italic");
      doc.setFontSize(14);
      doc.setTextColor(35, 35, 35);
      doc.text("successfully completed the following training:", pageW / 2, margin + 227, {
        align: "center",
      });

      // Course boxed line
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.setTextColor(78, 104, 119);
      doc.rect(boxX, margin + 236, boxW, 17, "S");
      doc.text(courseTitle, pageW / 2, margin + 250, { align: "center" });

      // Trainer/course specific line
      doc.setDrawColor(198, 198, 198);
      doc.setLineWidth(0.8);
      doc.rect(margin + 38, pageH - margin - 95, pageW * 0.42, 17, "S");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(78, 104, 119);
      doc.text(courseTitle, margin + 42, pageH - margin - 82);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10.5);
      doc.setTextColor(20, 20, 20);
      doc.text("Company Trainer", margin + 38, pageH - margin - 62);

      // Signature block
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(60, 60, 60);
      doc.text("Mark Crook", pageW - margin - 120, pageH - margin - 100);
      doc.setFont("times", "italic");
      doc.setFontSize(35);
      doc.text("M. Crook", pageW - margin - 118, pageH - margin - 76);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.text("Company Director", pageW - margin - 120, pageH - margin - 60);

      // Footer
      doc.setFontSize(9);
      doc.setTextColor(52, 52, 52);
      doc.text("Technique Learning Solutions", pageW / 2, pageH - margin - 52, {
        align: "center",
      });
      doc.setFontSize(8);
      doc.text(
        "1-2 Technique Tower Business Park, High Street, Clay Cross, Chesterfield, Derbyshire S45 9EA",
        pageW / 2,
        pageH - margin - 41,
        { align: "center" }
      );
      doc.setFontSize(7.5);
      doc.setTextColor(130, 130, 130);
      doc.text(`Certificate Ref: ${certificateId}`, pageW - margin - 10, pageH - margin - 26, {
        align: "right",
      });

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
      <div className="relative aspect-[1.4/1] w-full bg-[#e8f1f7] p-2 sm:p-3">
        <div className="absolute inset-2 sm:inset-3 border-[6px] border-[#7b97ab]" />
        <div className="relative h-full w-full border-[10px] border-[#9ab0c0] bg-white p-4 sm:p-6 md:p-9 text-center">
          <div className="absolute inset-1 border border-[#8da7b7]" />

          <div className="relative z-10 h-full flex flex-col">
            <div className="flex items-start justify-between text-[8px] text-zinc-700">
              <p className="text-left">Under our training service and experience -</p>
              <p className="text-right">
                Date of Attendance: <span className="font-medium">{completedDate}</span>
              </p>
            </div>

            <div className="mt-1">
              <p className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-[0.08em] text-zinc-900">
                TECHNIQUE
              </p>
              <p className="text-[9px] sm:text-[10px] text-zinc-700">
                For ALL your engineering training needs
              </p>
            </div>

            <h2 className="mt-6 md:mt-8 text-3xl sm:text-4xl md:text-5xl font-medium text-[#5d8596]">
              Certificate of Attendance
            </h2>
            <p className="mt-4 text-sm md:text-xl text-zinc-900">This is to certify that</p>

            <div className="mt-2 mx-auto w-[76%] border border-zinc-300 px-3 py-1">
              <p className="text-lg sm:text-2xl md:text-4xl text-[#4e6877] font-medium truncate">
                {fullName}
              </p>
            </div>

            <p className="mt-3 text-base md:text-3xl italic text-zinc-900">
              successfully completed the following training:
            </p>

            <div className="mt-2 mx-auto w-[76%] border border-zinc-300 px-3 py-1">
              <p className="text-lg sm:text-2xl md:text-4xl text-[#4e6877] font-medium truncate">
                {courseTitle}
              </p>
            </div>

            <div className="mt-auto grid grid-cols-2 items-end gap-3 pb-4">
              <div className="text-left">
                <div className="w-[88%] border border-zinc-300 px-2 py-1">
                  <p className="text-sm md:text-lg text-[#4e6877] font-medium truncate">
                    {courseTitle}
                  </p>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-zinc-900">Company Trainer</p>
              </div>
              <div className="text-right pr-2">
                <p className="text-lg sm:text-2xl text-zinc-700">Mark Crook</p>
                <p className="text-3xl sm:text-4xl italic font-serif text-zinc-800 -mt-1">
                  M. Crook
                </p>
                <p className="text-xs sm:text-sm text-zinc-900">Company Director</p>
              </div>
            </div>

            <div className="text-center text-[10px] sm:text-xs text-zinc-700 leading-tight">
              <p>Technique Learning Solutions</p>
              <p>
                1-2 Technique Tower Business Park, High Street, Clay Cross,
                Chesterfield, Derbyshire S45 9EA
              </p>
            </div>
            <p className="mt-1 text-right text-[10px] text-zinc-500">
              Certificate Ref: {certificateId}
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
