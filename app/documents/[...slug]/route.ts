import { getLegalDocumentPdf } from "@/lib/queries/legalDocuments";

function parseSlug(segments: string[] | undefined): string | null {
  if (!segments || segments.length !== 1) {
    return null;
  }

  const raw = segments[0]?.trim();
  if (!raw) {
    return null;
  }

  return raw.replace(/\.pdf$/i, "");
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  try {
    const { slug: segments } = await params;
    const slug = parseSlug(segments);

    if (!slug) {
      return new Response("PDF not found", { status: 404 });
    }

    const doc = await getLegalDocumentPdf(slug);
    if (!doc?.pdfUrl) {
      return new Response("PDF not found", { status: 404 });
    }

    const pdfResponse = await fetch(doc.pdfUrl);
    if (!pdfResponse.ok) {
      return new Response("PDF not found", { status: 404 });
    }

    const pdfBuffer = await pdfResponse.arrayBuffer();

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${slug}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error fetching legal document PDF:", error);
    return new Response("Error fetching PDF", { status: 500 });
  }
}
