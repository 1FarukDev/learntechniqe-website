import { cmsFetch } from "@/lib/cms/fetch";
import { LEGAL_DOCUMENT_PDF_QUERY } from "./legal-document-pdf.query";

export { LEGAL_DOCUMENT_PDF_QUERY };

export async function getLegalDocumentPdf(
  slug: string,
): Promise<{ pdfUrl?: string | null } | null> {
  return cmsFetch<{ pdfUrl?: string | null } | null>(
    LEGAL_DOCUMENT_PDF_QUERY,
    { slug },
  );
}
